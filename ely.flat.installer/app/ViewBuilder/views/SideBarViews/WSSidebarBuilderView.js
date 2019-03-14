import {GridLayoutView} from "../../../../build/ely.flat";
import BuilderViewsFactory from "../../factory/BuilderViewsFactory";
import WSManager from "../../ws/WSManager";
import WSFieldsFactory from "../../factory/WSFieldsFactory";

export default class WSSidebarBuilderView extends GridLayoutView {

    constructor() {
        super({});

        this.add(WSSidebarBuilderView.createMainTools());
    }

    /**
     * Создает основные инструменты
     * @return {BoxHeaderView}
     */
    static createMainTools() {
        /**
         * Переключатель контекстного меню
         * @return {GridLayoutView}
         */
        function createSwitchContextMenuItem() {
            const field = WSFieldsFactory.createBooleanField("Display context menu", true);
            field.change(value => WSManager.showContextMenu = value);
            return BuilderViewsFactory.createGridViewWithTitleAndView("Контекстное меню", field);
        }

        const box = BuilderViewsFactory.createEditorViewSectionBox("Основное");
        box.getContainerView().add(createSwitchContextMenuItem());
        return box;
    }

}

/**
 * Стандартный элемент
 * @type {WSSidebarBuilderView}
 */
WSSidebarBuilderView.default = new WSSidebarBuilderView();