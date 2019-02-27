import {
    IconView,
    PanelView,
    screenController,
    SimplePageViewController,
    Size,
    Style,
    Weight,
    TextView,
} from "../../build/ely.flat";
import {workingDirectoryField} from "../utils/utils";
import {
    buildApplicationCommand,
    getWorkingDirectoryCommand,
    initApplicationCommand,
    setWorkingDirectoryCommand
} from "../utils/commands";

/**
 * Контроллер отображения: Главный экран
 */
export class IndexViewController extends SimplePageViewController {

    /**
     * Данный метод выполняется после загрузки экрана
     *
     * + В данном методе рекомендуется выполнять элементарную отрисовку,
     *   а также программную логику контроллера элемента отображения.
     * + Данный метод выполняется один раз.
     *
     * Внимание! Рекомендуется изучить делегат elyViewWillDraw для полного
     * понимания отрисовки элементов View.
     */
    viewDidLoad() {
        // Вызов рдительского метода
        super.viewDidLoad();

        this.cells = {};


        // Установка заголовка и описания
        // для контроллера типа SimplePageViewController
        this.title("ely.flat *{* Installer *}*");
        this.description("Приложение для сборки и запуска приложения ely.flat.application");


        let serverRunGrid = this.factoryGridCell("server", "refresh", "Live update server",
            "Запускает сервер живого обновления для отладки и разработки, " +
            "который обновляется при изменении файлов приложения.", () => {
                screenController().present("server");
            });

        let buildGrid = this.factoryGridCell("build", "gavel", "Build the app",
            "Выполняет компиляцию основных файлов приложения.", (panel) => {
                panel.opacity(0.4);
                buildApplicationCommand(() => panel.opacity(1));
            });


        let appInitGrid = this.factoryGridCell("init", "terminal", "Init the app",
            "Инициилизирует новое приложение и выполняет первую сборку.", (panel) => {
                panel.opacity(0.4);
                initApplicationCommand(() => {
                    panel.opacity(1);
                    setTimeout(() => {
                        this.update();
                    }, 1000);
                });
            });


        let configGrid = this.factoryGridCell("config", "cog", "Configuration",
            "Настройки приложения.", () => {
                screenController().present("config");
            });

        let efiSettingsPanel = new PanelView({
            panelTitle: "Настройки efi",
            panelActionText: "Изменить",
            panelActionClick: () => {
                efiSettingsPanel.opacity(0.4);
                setWorkingDirectoryCommand(workingDirectoryField.value(), (res, data) => {
                    efiSettingsPanel.opacity(1);
                    if (data.efHere) {
                        notifi("В установленной директории найдена система *ely.flat*!", "Информация");
                    }
                    setTimeout(() => {
                        this.update();
                    }, 1000);
                });
            }
        });

        efiSettingsPanel.getContentView().add("Рабочая директория".textView());
        efiSettingsPanel.getContentView().add(workingDirectoryField);

        let efXAppInit = this.factoryGridCell("efxapp_init", "cube", "efx-app init",
            "efX-app позволяет создать самое простое и одновременно полноценное REST приложение с небольшой " +
            "базой данных и запросами.", () => {
            });
        let efXDB = this.factoryGridCell("efxapp_db", "server", "Database view",
            "База данных Вашего efX-app приложения", () => {
                elyScreenController.default.present("dbview");
            });
        let efXMethods = this.factoryGridCell("efxapp_methods", "gears", "REST Methods",
            "REST функции Вашего приложения", () => {

            });

        this.efiVersion = new TextView({textSize: Size.large, textWeight: Weight.thin, text: "version: 0"});
        this.efiVersion.centered().opacity(0.14);

        this.view.add(appInitGrid, configGrid, buildGrid);
        this.view.add(serverRunGrid);
        this.view.add(efiSettingsPanel);
        this.view.add("efX-app".headerTextView({
            headerLevel: 1,
            textSize: Size.xxlarge,
            textCenter: true,
            textWeight: Weight.thin
        }));
        this.view.add("Создайте своё простое приложение...".textView({
            opacity: 0.3,
            textCenter: true,
            style: {paddingBottom: "40px"}
        }));
        this.view.add(efXAppInit);
        this.view.add(efXDB, efXMethods);
        this.view.add(this.efiVersion);

    }

    /**
     * Создает ячейку
     * @param name
     * @param icon
     * @param title
     * @param desc
     * @param action
     * @return {PanelView}
     */
    factoryGridCell(name, icon, title, desc, action) {
        title = title.toUpperCase();

        let panelView = new PanelView();
        panelView.getStyle().height = "250px";

        let iconView = new IconView({
            iconName: icon,
            iconStyle: Style.primary,
            iconSize: Size.xlarge,
        });
        let titleView = String(title).textView({textCenter: true, textSize: Size.normal});
        let descView = String(desc).textView({textSize: Size.normal, opacity: 0.5});

        panelView.getContentView().add(iconView);
        panelView.getContentView().add(titleView);
        panelView.getContentView().add(descView);

        panelView.getContentView().rowAt(0).getStyle().textAlign = "center";
        panelView.addObserver("click", () => {
            if (!this.cells[name].lock) action(panelView);
        });

        this.cells[name] = panelView;
        this.lockCell(name, true);
        return panelView;
    }

    viewDidAppear() {
        this.update();
    }

    /**
     * Обновляет контроллер и состояние элементов на нем
     */
    update() {
        Object.keys(this.cells).forEach(value => this.lockCell(value));
        getWorkingDirectoryCommand((res, data) => {
            if (res) {
                workingDirectoryField.value(data.directory);
                this.lockCell("init", data.efHere);
                this.lockCell("config", !data.efHere);
                this.lockCell("build", !data.efHere);
                this.lockCell("server", !data.efHere);
                this.efiVersion.text(`efi ${data.version}`);
            }
        });

        this.lockCell("efxapp_methods", true);
        this.lockCell("efxapp_init", true);
    }

    /**
     * Брокирует ячейки
     * @param name
     * @param willLock
     */
    lockCell(name, willLock) {
        let cell = this.cells[name];
        this.cells[name].lock = willLock;
        if (willLock) {
            cell.opacity(0.4);
        } else {
            cell.opacity(1);
        }
    }

}