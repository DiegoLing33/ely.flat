import {
    Button,
    GridLayoutView,
    TabsPanelView,
    Size,
    BoxView,
    TextAreaField, View, PanelView
} from "../../../build/ely.flat";
import {BuilderViewElements} from "../BuilderViewElements";
import BuilderViewFactory from "../BuilderViewFactory";
import WSViewsRegex from "../ws/WSViewsRegex";

/**
 * Отображение создания элемента
 */
export default class BuilderCreatorView extends GridLayoutView {

    /**
     * Конструктор
     */
    constructor() {
        super();

        this.createTabsBar();
        this.createPrimaryButton();

        this.__createTabsBarElementsTab();
        this.__createTabsBarEJVCodeTab();
        this.tabsBar.selectedTabIndex(0);
    }

    /**
     * Создает навигацию в строителе
     */
    createTabsBar() {
        /**
         * Разделы создания
         * @type {TabsPanelView}
         */
        this.tabsBar = new TabsPanelView({tabs: ["Элементы", "EJV Code"]});
        this.add(this.tabsBar);
    }

    /**
     * Создает список элементов
     * @private
     */
    __createTabsBarElementsTab() {
        const grid = new GridLayoutView();
        grid.addClass("--scrollView");
        grid.getStyle().height = "500px";

        const data = this.__getAllTheViewsData();
        const types = this.__getAllTheTypesFromTheViewsData(data);

        types.forEach(value => {
            const panel = new PanelView({panelTitle: value, panelHover: false});
            data.forEach(obj => {
                if (obj.type === value)
                    panel.getContentView().add(this.__createElementCreatorView(obj));
            });
            grid.add(panel);
        });
        this.tabsBar.setTabIndexBody(0, grid);
    }

    /**
     * Возвращает все типы из данных
     * @param viewsData
     * @return {Array}
     * @private
     */
    __getAllTheTypesFromTheViewsData(viewsData) {
        const types = [];
        viewsData.forEach(value => {
            if (types.indexOf(value.type) === -1) types.push(value.type);
        });
        return types.sort((a, b) => a > b ? 1 : -1);
    }

    /**
     * Возвращает данные о всех элементах
     * @return {{name: T, description: *, type: *}[]}
     * @private
     */
    __getAllTheViewsData() {
        const keys = Object.keys(BuilderViewElements);
        return keys
            .filter(value => BuilderViewElements[value].type)
            .map((value) => {
                return {
                    name: value,
                    type: BuilderViewElements[value].type,
                    description: BuilderViewElements[value].description
                };
            });
    }

    /**
     * Создаёт элемент отображения в создании
     * @param value
     * @return {BoxView}
     * @private
     */
    __createElementCreatorView(value) {
        const box = new BoxView();
        box.styleNoSelect(true);
        box.styleClickable(true);
        box.getContainerView().add(value.name.textView());
        box.getContainerView().add(value.description.textView({opacity: 0.4, textSize: Size.custom(12)}));
        box.addClickObserver(() => {
            this.selectedOpts = BuilderViewElements[value.name];
            const view = BuilderViewFactory.createPoorView(value.name);
            if (view) {
                this.tabsBar.selectedTabIndex(1);
                this.ejvCodeField.value(JSON.stringify(view.serialize(), null, 2));
            }
        });
        return box;
    }

    /**
     * Создает EJV раздел в строке текста
     * @private
     */
    __createTabsBarEJVCodeTab() {
        this.ejvCodeField = new TextAreaField({rowsCount: 17});
        this.tabsBar.setTabIndexBody(1, this.ejvCodeField);
    }

    /**
     * Создает кнопку создания элемента
     */
    createPrimaryButton() {
        this.primaryButton = new Button({text: "Создать"});
        this.primaryButton.fill();
        this.add(this.primaryButton);
        this.primaryButton.click(() => {
            const view = View.fromString(this.ejvCodeField.value());
            if (view) {
                WSViewsRegex.default.registerView(view);
                this.notificate("created", [view, this.selectedOpts]);
            } else {
                this.tabsBar.selectedTabIndex(1);
                this.ejvCodeField.error(true);
                notifi("Ошибка при создании элемента!");
            }
        });
    }
}