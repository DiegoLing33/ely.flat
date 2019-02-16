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
 + Файл: efListView.ts                                                        +
 + Файл изменен: 07.02.2019 23:53:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyObservableArray from "@core/observable/properties/elyObservableArray";

/**
 * Опции {@link efListView}
 */
export interface efListViewOptions extends elyViewOptions {
    items?: elyView[];
}

/**
 * Списко элементов
 * @class efListView
 * @augments {elyRebuildableViewProtocol}
 */
export class efListView extends elyRebuildableViewProtocol {

    /**
     * Элементы списка
     * @protected
     * @ignore
     */
    protected readonly __items: elyObservableArray<elyView>;

    /**
     * Конструктор
     * @param {efListViewOptions} options
     */
    public constructor(options: efListViewOptions = {}) {
        super({tag: "ul", ...options});
        this.__items = new elyObservableArray<elyView>();
        this.__items.change(() => this.__rebuild());
        (options.items || []).forEach(value => this.addView(value));
    }

    /**
     * Возвращает элементы списка
     */
    public getItems(): elyObservableArray<elyView> {
        return this.__items;
    }

    /**
     * Добавляет элемент отображения
     * @param view
     */
    public addView(view: elyView): efListView {
        this.__items.push(view);
        return this;
    }

    /**
     * Добавляет наблюдатель: элемент будет добавлен.
     *
     * Наблюдатель принимает два параметра: view и container.
     *
     * Элементы в efListView хранятся в контейнерах. Поэтому
     * при добавлении слушатель получает два elyView элемента.
     * Благодаря этому слушателю, Вы можете кастомизировать контейнер.
     *
     * Имя обсервера: itemWillAdd
     *
     * @param o - наблюдатель
     */
    public addItemWillAddObserver(o: (view: elyView, container: elyView) => void): efListView {
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
            const view = new elyControl({tag: "li", class: "--item"});
            view.addSubView(item);
            this.notificate("itemWillAdd", [item, view]);
            this.getDocument().append(view.getDocument());
        });
        return this;
    }
}

/**
 * @typedef {Object} efListViewOptions
 * @property {elyView[]} [items]
 */
