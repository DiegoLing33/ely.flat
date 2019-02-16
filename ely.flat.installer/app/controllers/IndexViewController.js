import {
    efIconView,
    efPanelView,
    elyScreenController,
    elySimplePageViewController,
    Size,
    Style,
    elyControl, efButton,
} from "../../build/ely.flat";
import {workingDirectoryField} from "../utils/utils";
import {buildApplicationCommand, initApplicationCommand, setWorkingDirectoryCommand} from "../utils/commands";

/**
 * Контроллер отображения: Главный экран
 */
export class IndexViewController extends elySimplePageViewController {

    /**
     * Данный метод выполняется после загрузки экрана
     *
     * + В данном методе рекомендуется выполнять элементарную отрисовку,
     *   а также программную логику контроллера элемента отображения.
     * + Данный метод выполняется один раз.
     *
     * Внимание! Рекомендуется изучить делегат elyViewWillDraw для полного
     * понимания отрисовки элементов elyView.
     */
    viewDidLoad() {
        // Вызов рдительского метода
        super.viewDidLoad();


        // Установка заголовка и описания
        // для контроллера типа elySimplePageViewController
        this.title("ely.flat *{* Installer *}*");
        this.description("Приложение для сборки и запуска приложения ely.flat.application");


        let serverRunGrid = this.gridCell("refresh", "Live update server",
            "Запускает сервер для отладки и разработки, " +
            "который обновляется при изменении файлов приложения.", () => {
                elyScreenController.default.present("server");
            });

        let buildGrid = this.gridCell("gavel", "Build the app",
            "Выполняет сборку приложения.", (panel) => {
                panel.opacity(0.4);
                buildApplicationCommand(() => panel.opacity(1));
            });


        let appInitGrid = this.gridCell("terminal", "Init the app",
            "Инициилизирует новое приложение.", (panel) => {
                panel.opacity(0.4);
                initApplicationCommand(() => panel.opacity(1));
            });


        let configGrid = this.gridCell("cog", "Configuration",
            "Настройки приложения.", () => {
                elyScreenController.default.present("config");
            });

        let efiSettingsPanel = new efPanelView({
            panelTitle: "Настройки efi",
            panelActionText: "Изменить",
            panelActionClick: () => {
                efiSettingsPanel.opacity(0.4);
                setWorkingDirectoryCommand(workingDirectoryField.value(), () => efiSettingsPanel.opacity(1));
            }
        });

        efiSettingsPanel.getContentView().add("Рабочая директория".textView());
        efiSettingsPanel.getContentView().add(workingDirectoryField);

        this.view.add(appInitGrid, configGrid, buildGrid);
        this.view.add(serverRunGrid);
        this.view.add(efiSettingsPanel);

    }

    gridCell(icon, title, desc, action) {
        title = title.toUpperCase();

        let panelView = new efPanelView();
        panelView.getStyle().height = "250px";

        let iconView = new efIconView({
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
            action(panelView);
        });

        return panelView;
    }
}