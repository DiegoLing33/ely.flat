import {Observable} from "../../../build/ely.flat";
import WSUtils from "./WSUtils";

/**
 * Регистр элементов
 */
export default class WSViewsRegex extends Observable {

    constructor() {
        super();

        /**
         * Счетчик идентификаторов
         * @type {number}
         * @private
         */
        this.__idsCounter = 0;

        /**
         * Зарегистрированные элементы
         * @type {{}}
         * @private
         */
        this.__registeredViews = {};
    }

    /**
     * Возвращает список зарегистрированных элементов
     * @return {{}}
     */
    getRegisteredViews() {
        return this.__registeredViews;
    }

    /**
     * Регистрирует View
     * @param {View} view
     * @param {string?} prename
     * @param {string?} postname
     */
    registerView(view, prename, postname) {
        let id = `${WSUtils.getViewSignatureClassName(view)}`;
        if (prename) id = prename + id.substr(0, 1).toUpperCase() + id.substr(1);
        if (postname) id = postname + id.substr(0, 1).toUpperCase() + id.substr(1);
        id += `-${++this.__idsCounter}`;
        view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME, id);
        this.__registeredViews[id] = view;
        this.notificate("registered", [view, id])
    }

    /**
     * Отменет рестистрацию View
     * @param {View} view
     */
    unregisterView(view) {
        const id = view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME);
        if (id) {
            delete this.__registeredViews[id];
            this.notificate("unregistered", [view, id]);
        } else {
            throw Error(`Не удалось удалить элемент: ${JSON.stringify(view, null, 2)}`);
        }
    }

    /**
     * Возвращает зарегистрированный элемент или null
     *
     * @param {string} id
     * @return {View|null}
     */
    getView(id) {
        return this.__registeredViews[id] || null;
    }

    /**
     * Добавляет слушатель регистрации
     * @param {function(view: View, id: string)} o - наблюдатель
     */
    addViewRegisteredObserver(o) {
        this.addObserver("registered", o);
    }

    /**
     * Добавляет слушатель отмены регистрации
     * @param {function(view: View, id: string)} o - наблюдатель
     */
    addViewUnregisteredObserver(o) {
        this.addObserver("unregistered", o);
    }

}

WSViewsRegex.default = new WSViewsRegex();
WSViewsRegex.consts = {};

/**
 * Имя атрибута с идентификатором элемента
 * @type {string}
 */
WSViewsRegex.consts.BUILDER_ID_ATTR_NAME = "ws-id";