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
 + Файл: elyGridView                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyStylesheet from "@controls/elyStylesheet";
import elyGridRowView from "@controls/flex/elyGridRowView";
import IPosition from "@controls/interfaces/IPosition";
import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyFlexGridViewOptions from "@options/elyFlexGridViewOptions";

/**
 * Элемент отображения: Флекс сетка
 */
export default class elyGridView extends elyView {

    /**
     * Процентное соотношение частей
     * @ignore
     */
    protected readonly __flexPercentage: number[][];

    /**
     * Строки сетки
     * @ignore
     */
    protected readonly __rows: elyGridRowView[];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyFlexGridViewOptions = {}) {
        super(options);
        this.__flexPercentage = options.flex || [];
        this.__rows           = [];
        this.addClass(this.identifier());
        this.setItemsMargin(options.margin || {top: 5, bottom: 5, left: 5, right: 5});
    }

    /**
     * Устанавливает внитринний отступ элементов сетки
     * @param margin
     */
    public setItemsMargin(margin: IPosition): elyGridView {
        margin       = {...{top: 0, bottom: 0, left: 0, right: 0}, ...margin};
        const styles = {};
        elyUtils.applySrc(margin, ["top", "bottom", "left", "right"], styles, "margin-", (val) => {
            return typeof val === "string" ? val : val + "px";
        });
        elyStylesheet.global.addClass(this.identifier() + " .item", styles);
        return this;
    }

    /**
     * Возвращает строки
     */
    public getRows(): elyGridRowView[] {
        return this.__rows;
    }

    /**
     * Удаляет строку
     * @param index
     */
    public removeRow(index: number): elyGridView {
        this.__rows[index].removeFromSuperview();
        return this;
    }

    /**
     * Возвращает индекс строки, в которой находится элемент
     * @param view
     */
    public viewRowIndex(view: elyView): number {
        let i = 0;
        for (const row of this.__rows) {
            if (row.viewIndex(view) > -1) return i;
            i++;
        }
        return -1;
    }

    /**
     * Возвращает полный адрес элемента: `{rowIndex: number, viewIndex: number}`
     * @param view
     */
    public viewIndex(view: elyView): { rowIndex: number, viewIndex: number } {
        for (let rowIndex = 0; rowIndex < this.__rows.length; rowIndex++) {
            const vi = this.__rows[rowIndex].viewIndex(view);
            if (vi > -1) return {rowIndex, viewIndex: vi};
        }
        return {rowIndex: -1, viewIndex: -1};
    }

    /**
     * Возвращает строку по индексу
     * @param index
     */
    public rowAt(index: number): elyGridRowView | null {
        return this.__rows[index];
    }

    /**
     * Удаляет элемент
     * @param view
     */
    public removeView(view: elyView): elyGridView {
        const index = this.viewRowIndex(view);
        this.rowAt(index)!.remove(view);
        return this;
    }

    /**
     * Добавляет строку
     * @param row
     */
    public add(...row: elyView[]): elyGridView {
        return this.insert(null, ...row);
    }

    /**
     * Вставляет строку по индексу
     *
     * @param index
     * @param row
     */
    public insert(index: number | null = null, ...row: elyView[]): elyGridView {
        const rowView  = new elyGridRowView();
        const rowIndex = this.__rows.length;
        row.forEach((value, index) => {
            let flexMap: any = [];
            if (this.__flexPercentage.length > 0) {
                if (typeof this.__flexPercentage[0] === "number") flexMap = this.__flexPercentage;
                else flexMap = this.__flexPercentage[rowIndex] || this.__flexPercentage[0];
            }
            value.superview = rowView;
            rowView.add(value, flexMap[index] || null);
        });
        if (index !== null) {
            this.__rows.splice(index, 0, rowView);
            const indexedRow = this.rowAt(index);
            if (indexedRow) {
                indexedRow.getDocument().before(rowView.getDocument());
            } else {
                this.getDocument().append(rowView.getDocument());
            }
        } else {
            this.__rows.push(rowView);
            this.getDocument().append(rowView.getDocument());
        }
        rowView.superview = this;

        return this;
    }

    /**
     * Удаляет содержимое сетки
     */
    public removeViewContent(): elyGridView {
        super.removeViewContent();
        this.__rows.splice(0, this.__rows.length);
        return this;
    }

    /**
     * Возвращает количество строк
     */
    public rowsCount(): number {
        return this.__rows.length;
    }

}
