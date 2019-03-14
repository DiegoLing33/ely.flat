import {Control, TabsPanelView, View} from "../../../build/ely.flat";
import BuilderViewEditorPanel from "./BuilderViewEditorPanel";
import BuilderViewsFactory from "../factory/BuilderViewsFactory";
import WSSidebarBuilderView from "./SideBarViews/WSSidebarBuilderView";
import WSSidebarViewsView from "./SideBarViews/WSSidebarViewsView";

/**
 * Боковая панель навигации
 */
export default class BuilderSideNavigationView extends TabsPanelView {

    /**
     * Конструктор
     */
    constructor() {
        super({tabs: ["Элементы", "Объект", "Builder"]});
        this.addClass("--vertical");
        this.removeClass("--hover");

        this.removeViewContent();
        this.getContainerView().getStyle().padding = "0";
        this.getDocument().append(this.getContainerView().getDocument());
        this.getDocument().append(this.getHeaderView().getDocument());

        this.css({
            width: "100%",
            height: "100%",
        });
        this.disableObjectTab();
    }

    /**
     * Выполняет перестроение элемента
     * @private
     */
    __rebuild() {
        super.__rebuild();
        const ch = this.getHeaderView().getScrollView().getWrapperView().getDocument()
            .getElementsByClassName("--item");
        for (let i = 0; i < this.tabs().length; i++) {
            ch.item(i).style["margin-top"] = "-14px";
            ch.item(i).style["margin-left"] = "-56px";
            ch.item(i).style["padding"] = "12px";
        }


    }

    /**
     * Скрывает панель объектов
     */
    disableObjectTab() {
        if (this.tabs().indexOf("Объект") > -1) {
            this.tabs(["Элементы", "Builder"]);
            this.setTabIndexBody(1, null);

            this.setTabIndexBody(0,
                BuilderViewsFactory.createSidebarScrollBox("Элементы", WSSidebarViewsView.default));
            this.setTabIndexBody(1,
                BuilderViewsFactory.createSidebarScrollBox("Builder", WSSidebarBuilderView.default));
        }
    }

    /**
     * Отображает панель объектов
     */
    enableObjectTab() {
        if (this.tabs().indexOf("Объект") === -1) {
            this.tabs(["Элементы", "Объект", "Builder"]);
            const objectContainer = BuilderViewsFactory.createSidebarScrollBox("Объект", BuilderViewEditorPanel.default);
            BuilderViewEditorPanel.default.innerBox = objectContainer;
            this.setTabIndexBody(1, objectContainer);

            this.setTabIndexBody(0,
                BuilderViewsFactory.createSidebarScrollBox("Элементы", WSSidebarViewsView.default));
            this.setTabIndexBody(2,
                BuilderViewsFactory.createSidebarScrollBox("Builder", WSSidebarBuilderView.default));
        }
    }

}

/**
 * Стандартный сайдбар
 * @type {BuilderSideNavigationView}
 */
BuilderSideNavigationView.default = new BuilderSideNavigationView();