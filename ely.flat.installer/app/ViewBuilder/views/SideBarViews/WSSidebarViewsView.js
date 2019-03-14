import {BoxView, GridLayoutView, TextView} from "../../../../build/ely.flat";
import WSViewsRegex from "../../ws/WSViewsRegex";
import WSManager from "../../ws/WSManager";
import WSUtils from "../../ws/WSUtils";

/**
 * Элемент боковой панели: список элементов
 */
export default class WSSidebarViewsView extends GridLayoutView {

    /**
     * Создаёт элемент отображегия в списке
     * @param {string} id
     * @param {View} view
     */
    static createViewRowForList(id, view) {
        const box = new BoxView({styleNoSelect: true, styleClickable: true});
        const name = WSUtils.getViewSignatureClassName(view).toUpperCase();

        const viewIdTextView = new TextView({text: id});
        viewIdTextView.getDocument().innerHTML += `<b style="float: right">${name[0]}</b>`;

        box.addClickObserver(() => {
            WSManager.default.selectView(view);
        });
        box.addMouseEnterObserver(() => {
            view.animateCss("flash");
        });
        box.getContainerView().add(viewIdTextView);
        return box;
    }

    /**
     * Конструктор
     */
    constructor() {
        super();

        WSViewsRegex.default.addViewRegisteredObserver(() => this.update());
        WSViewsRegex.default.addViewUnregisteredObserver(() => this.update());
    }

    /**
     * Обновление элементов
     */
    update() {
        this.denyRebuild(true);
        this.getRows().clear();
        Object.keys(WSViewsRegex.default.getRegisteredViews()).forEach(key => {
            if (WSViewsRegex.default.getRegisteredViews()[key]) {
                this.add(WSSidebarViewsView.createViewRowForList(key, WSViewsRegex.default.getRegisteredViews()[key]));
            }
        });
        this.denyRebuild(false);
        this.rebuild();
    }
}

/**
 * Стандартный список элементов боковой панели
 * @type {WSSidebarViewsView}
 */
WSSidebarViewsView.default = new WSSidebarViewsView();