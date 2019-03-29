/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 +                                                                            +
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: ListView.ts                                                          +
 + Файл изменен: 07.02.2019 23:53:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ObservableArray from "ely.core/dist/observable/properties/ObservableArray";
import View, {ViewOptions} from "../../core/controls/View";
import Control from "../action/Control";
import elyRebuildableViewProtocol from "../protocols/elyRebuildableViewProtocol";

/**
 * Опции {@link ListView}
 */
export interface ListViewOptions extends ViewOptions {
    items?: View[];
}

/**
 * Списко элементов
 * @class ListView
 * @augments {elyRebuildableViewProtocol}
 */
export default class ListView extends elyRebuildableViewProtocol {

    /**
     * Элементы списка
     * @protected
     * @ignore
     */
    protected readonly __items: ObservableArray<View>;

    /**
     * Конструктор
     * @param {ListViewOptions} options
     */
    public constructor(options: ListViewOptions = {}) {
        super({tag: "ul", ...options});
        this.__items = new ObservableArray<View>();
        this.__items.change(() => this.__rebuild());
        (options.items || []).forEach(value => this.addView(value));
    }

    /**
     * Возвращает элементы списка
     */
    public getItems(): ObservableArray<View> {
        return this.__items;
    }

    /**
     * Добавляет элемент отображения
     * @param view
     */
    public addView(view: View): ListView {
        this.__items.push(view);
        return this;
    }

    /**
     * Добавляет наблюдатель: элемент будет добавлен.
     *
     * Наблюдатель принимает два параметра: view и container.
     *
     * Элементы в ListView хранятся в контейнерах. Поэтому
     * при добавлении слушатель получает два View элемента.
     * Благодаря этому слушателю, Вы можете кастомизировать контейнер.
     *
     * Имя обсервера: itemWillAdd
     *
     * @param o - наблюдатель
     */
    public addItemWillAddObserver(o: (view: View, container: View) => void): ListView {
        this.addObserver("itemWillAdd", o);
        return this;
    }

    /**
     * Выполняет перестроение элемента
     *
     * Метод для переопределения реализации престроения
     * @private
     * @ignore
     */
    protected __rebuild(): elyRebuildableViewProtocol | any {
        this.removeViewContent();
        this.getItems().forEach(item => {
            const view = new Control({tag: "li", class: "--item"});
            view.addSubView(item);
            this.notificate("itemWillAdd", [item, view]);
            this.getDocument().append(view.getDocument());
        });
        return this;
    }
}

/**
 * @typedef {Object} ListViewOptions
 * @property {View[]} [items]
 */
