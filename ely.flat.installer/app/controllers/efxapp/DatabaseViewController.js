import {
    efButton,
    efLinkTextView,
    efPanelView,
    efTextView,
    Style,
    elyControl,
    elySimplePageViewController, elyDataGridView, efGridLayoutView, efPreloaderView, app, efTextField, Weight
} from "../../../build/ely.flat";
import {addHomeButton, workingDirectoryField} from "../../utils/utils";
import {getDBDItemsCommand, getTableItemsCommand, setDBDItemValueCommand} from "../../utils/commands";

/**
 * Контроллер отображения: Просмотр баз данных
 */
export class DatabaseViewController extends elySimplePageViewController {

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
        this.title("efX-app");
        this.description("Просмотр баз данных");

        this.data = {};
        this.currentTable = null;

        addHomeButton(this.view);
        this.view.add(new elyControl({tag: "br"}));

        let info = new efPanelView({
            panelActionText: "Хорошо, понятно.",
            panelActionClick: () => {
                info.fadeOut();
            }
        });
        info.getContentView().add(
            ("*Внимание!* База данных не предусмотрена для больших нагрузок. {nl}Система efX-app разработана для личного ипользования. " +
                "Например, если Вы разрабатываете приложение для умного дома, то здесь может быть записано состояние Ваших умных устройств." +
                "{nl}{nl}Здесь Вы можете посмотреть записанные в **efX-app database** данные, удалить или изменить их.")
                .textView({textWeight: Weight.light})
        );
        this.view.add(info);

        this.dbsView = new efGridLayoutView();

        this.contentDbView = new efPanelView({});
        this.contentDbView.getContentView().add("Нет данных для отображения.".textView({opacity: 0.3}));

        this.view.add(this.dbsView, this.contentDbView);

        this.view.rowAt(4).columnAt(0).getStyle().width = "20%";
        this.view.rowAt(4).columnAt(1).getStyle().width = "80%";

        app().getApplicationLoaderView().hidden(false);
    }

    viewWillAppear(screen) {
        this.currentTable = null;
        app().getApplicationLoaderView().hidden(false);
        if (this.contentDbView) {
            this.contentDbView.getContentView().getRows().clear();
            this.contentDbView.panelActionText("");
            this.contentDbView.getContentView().add("Нет данных для отображения.".textView({opacity: 0.3}));
        }
    }

    viewDidAppear() {
        this.update();
    }


    /**
     * Обновляет контроллер и состояние элементов на нем
     */
    update() {
        getDBDItemsCommand((result, data) => {
            this.dbsView.getRows().clear();
            this.contentDbView.getContentView().getRows().clear();
            this.contentDbView.panelTitle("");
            this.contentDbView.getContentView().add("Нет данных для отображения.".textView({opacity: 0.3}));

            const items = data.items;
            for (let key in items) {
                let item = new efButton({text: key, fill: true});
                item.click(() => {
                    showDB(key, data);
                });
                this.dbsView.add(item);
            }

            app().getApplicationLoaderView().hidden(true);
            if (this.currentTable) showDB(this.currentTable, data);
        });

        const showDB = (name, data) => {
            this.currentTable = name;
            this.contentDbView.getContentView().getRows().clear();
            const dv = new elyDataGridView({
                sourceData: data.db[name],
                headers: data.items[name].items,
                borderedStyle: true,
            });
            dv.addCellDrawObserver((rowIndex, colIndex, cell, view) => {
                cell.addObserver("click", () => {
                    if (cell.inEdit) return;
                    cell.inEdit = true;
                    const colName = data.items[name].items[colIndex];
                    const val = data.db[name][rowIndex];
                    if (colName !== "id") {
                        let tf = new efTextField({value: val[colIndex]});
                        tf.setRightIcon("save");
                        tf.getRightIconView().addClass("button");
                        tf.getRightIconView().css({padding: "0", backgroundColor: "transparent", border: "none"});
                        tf.getRightIconView().addObserver("click", () => {
                            tf.editable(false);
                            setDBDItemValueCommand(name, rowIndex, colName, tf.value(), (result) => {
                                tf.editable(true);
                                const tv = new efTextView({text: result ? tf.value() : val});
                                cell.clearView();
                                cell.getDocument().append(tv.getDocument());
                            });
                        });
                        cell.clearView();
                        cell.getDocument().append(tf.getDocument());
                    }
                });
            });
            dv.update();
            this.contentDbView.getContentView().add(dv);
            this.contentDbView.panelTitle(`База данных: ${name}`);
            this.contentDbView.panelActionText("Обновить");
            this.contentDbView.panelActionClick(() => {
                this.update();
            });
        };
    }
}