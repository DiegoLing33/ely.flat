import WSManager from "../ws/WSManager";
import BuilderContextMenuView from "../views/BuilderContextMenuView";
import WSViewsRegex from "../ws/WSViewsRegex";

/**
 * Менеджер контекстного меню efiWorkShop
 * @class
 */
export default class WSContextMenu {

    /**
     * Отображает контекстное меню
     * @param {MouseEvent} ev
     */
    static displayContextMenu(ev) {
        if (WSManager.showContextMenu) {
            ev.preventDefault();
            let view = ev.target;
            while (view != null) {
                if (view.hasAttribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME)) break;
                view = view.parentElement;
            }
            if (view) {
                const item = WSViewsRegex.default.getView(view.getAttribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME));
                BuilderContextMenuView.presentDefaultContextMenuForView(item, ev.pageX, ev.pageY);
            } else {
                BuilderContextMenuView.default.hidden(true);
            }
        }
    }

    /**
     * Скрывает контекстное меню
     */
    static hideContextMenu() {
        BuilderContextMenuView.default.hidden(true);
    }

    /**
     * Применяет обработчик контекстного меню
     */
    static applyContextMenuHandler() {
        window.oncontextmenu = ev => WSContextMenu.displayContextMenu(ev);
        window.onclick = ev => {
            let view = ev.target;
            while (view != null) {
                if (view.classList.contains("vb-context")) return;
                view = view.parentElement;
            }
            WSContextMenu.hideContextMenu();
        }
    }
}
