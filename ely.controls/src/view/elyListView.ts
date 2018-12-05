/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyListView.ts                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyListViewOptions from "@options/elyListViewOptions";

/**
 * Элемент отображения: Список
 */
export default class elyListView extends elyRebuildableViewProtocol {

    /**
     * Элементы списка
     */
    public readonly items: elyObservableArray<elyView>;

    /**
     * Дополнительный класс для элементов списка
     * @ignore
     */
    private readonly __listClass: string[] = [];

    /**
     * Конструктор
     * @param options
     */
    constructor(options: elyListViewOptions = {}) {
        super({tag: "ul", class: "ely-list", ...options});
        this.items = new elyObservableArray<elyView>();
        this.items.addChangeItemsObserver(() => this.rebuild());
        if (options.listItemsClass) {
            if (typeof options.listItemsClass === "string")
                this.__listClass = options.listItemsClass.split(" ");
            else this.__listClass = options.listItemsClass;
        }
        if (options.items) for (const item of options.items) this.add(item);
    }

    /**
     * Добавляет элемент в список
     * @param item
     * @param index
     */
    public add(item: string | elyView, index?: number): elyListView {
        if (typeof item === "string") item = new elyTextView({text: item});
        if (index === undefined) this.items.push(item);
        else this.items.insert(index, item);
        return this;
    }

    /**
     * Добавляет линюю
     * @param index
     */
    public addLine(index?: number): elyListView {
        if (index === undefined) this.items.push(new elyControl({tag: "hr"}));
        else this.items.insert(index, new elyControl({tag: "hr"}));
        return this;
    }

    /**
     * Выполняет перестроение элементов
     */
    public __rebuild(): elyListView {
        this.removeViewContent();
        this.items.items().forEach((item: elyView) => {
            const listElement = new elyControl({tag: "li", class: "ely-list-item"});
            if (this.__listClass) listElement.addClass(...this.__listClass);
            listElement.addSubView(item);
            this.getDocument().appendChild(listElement.getDocument());
        });
        return this;
    }
}
