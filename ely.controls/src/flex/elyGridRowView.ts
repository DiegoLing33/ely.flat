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
 + Файл: elyGridRowView.ts                                                    +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * Элемент отображения: Flex Строка
 */
export default class elyGridRowView extends elyView {

    /**
     * Колонки
     * @ignore
     */
    protected readonly __views: elyView[];
    protected readonly __columns: elyView[];

    /**
     * Конструктор
     * @param options
     */
    constructor(options: elyViewOptions = {}) {
        super({class: "ef-flex-box", ...options});
        this.addClass("row");

        this.__views   = [];
        this.__columns = [];
    }

    /**
     * Добавляет элемент в строку
     * @param view          - элемент
     * @param percentage    - процентное значение элемента в строке (0 ... 1)
     */
    public add(view: elyView, percentage: string | number | null = null): elyGridRowView {
        const column = new elyControl({class: "item"});
        if (percentage === null) percentage = 1;
        if (typeof percentage === "number" && percentage > 1) percentage /= 100;
        if (typeof percentage === "string") column.css({flex: `1 1 ${percentage}`});
        else column.css({flex: `1 1 ${percentage * 100}%`});
        column.addSubView(view);
        this.__views.push(view);
        this.__columns.push(column);
        if (percentage === null) {
            this.__columns.forEach((value) => {
                value.css({flex: `1 1 ${100 / this.__views.length}%`});
            });
        }
        column.superview = this;
        this.getDocument().append(column.getDocument());
        return this;
    }

    /**
     * Удаляет элемент из строки
     * @param view
     */
    public remove(view: elyView): elyGridRowView {
        const index    = this.__views.indexOf(view);
        if (index > -1 && this.__columns[index]) {
            this.__views.splice(index, 1);
            view.removeFromSuperview();
            this.__columns[index].removeFromSuperview();
            this.__columns.splice(index, 1);
        }
        return this;
    }

    /**
     * Удаляет содержимое строки
     */
    public removeViewContent(): elyGridRowView {
        super.removeViewContent();
        this.__views.splice(0, this.__views.length);
        return this;
    }

    /**
     * Возвращает индекс элемента в строке или -1
     * @param view
     */
    public viewIndex(view: elyView): number {
        return this.__views.indexOf(view);
    }

    /**
     * Возвращает колонку по индексу
     * @param index
     */
    public viewAt(index: number): elyView {
        return this.__views[index];
    }

    /**
     * Возвращает количество элементов
     */
    public viewsCount(): number {
        return this.__columns.length;
    }
}
