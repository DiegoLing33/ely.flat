import {Observable, ObservableProperty} from "../../../build/ely.flat";
import WSViewsRegex from "./WSViewsRegex";

/**
 * Менеджер efiWorkShop
 */
export default class WSManager extends Observable {

    /**
     * Возвращает идентификатор элемента
     *
     * @param {View|null} view
     * @return {string|null}
     */
    static getViewIdentifier(view) {
        if (!view) return null;
        const attribute = view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME);
        return attribute || null;
    }

    /**
     * Конструктор
     */
    constructor() {
        super();
        this.__selectedView = new ObservableProperty();
        this.__selectedView.change(value => this.notificate("selectionChanged", [value]))
    }

    /**
     * Выделяет элемент
     * @param {View|null} view
     */
    selectView(view) {
        this.__selectedView.set(view);
    }

    /**
     * Возвращает выбранный элемент
     * @return {View|null}
     */
    getSelectedView() {
        return this.__selectedView.get();
    }

    /**
     * Удаляет элемент
     * @param {View|*} view
     */
    removeView(view) {
        if (view && view.__runRemover) {
            if (this.getSelectedView() === view) this.selectView(null);
            WSViewsRegex.default.unregisterView(view);
            view.__runRemover();
            this.notificate("removedView", [view]);
        } else {
            throw Error("Не удалось удалить элемент. Remover не установлен!");
        }
    }

    /**
     * Добавляет слушатель изменения выбранного элемента
     * @param {function(view: View)} o
     */
    addSelectionChangeObserver(o) {
        this.addObserver("selectionChanged", o);
    }

    /**
     * Добавляет слушатель удаления элемента
     * @param {function(view: View)} o
     */
    addRemovedViewObserver(o) {
        this.addObserver("removedView", o);
    }
}

/**
 * Стандартный менеджер efiWorkShop
 * @type {WSManager}
 */
WSManager.default = new WSManager();

/**
 * Отображение контекстного меню
 * @type {boolean}
 */
WSManager.showContextMenu = true;