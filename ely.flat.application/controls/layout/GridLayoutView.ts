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
 + Файл: gridLayoutViews                                                  +
 + Файл изменен: 09.02.2019 16:34:32                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableArray from "ely.core/dist/observable/properties/ObservableArray";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View, {ViewOptions} from "../../core/controls/View";
import elyRebuildableViewProtocol from "../protocols/elyRebuildableViewProtocol";
import RowLayoutView from "./RowLayoutView";

export interface TGridSize {
    columns: number;
    rows: number;
}

/**
 * Опции {@link GridLayoutView}
 */
export interface GridLayoutViewOptions extends ViewOptions {
    rowsLength?: number;
    items?: View[][] | RowLayoutView[];
}

/**
 * Элемент отображения динамической сетки
 * @class GridLayoutView
 * @augments {View}
 */
export default class GridLayoutView extends elyRebuildableViewProtocol {

    /**
     * Свойство: количество элементов в строках
     * @ignore
     * @protected
     */
    protected readonly __rowsLengthProperty: ObservableProperty<number>
        = new ObservableProperty<number>(24);

    /**
     * Строки
     * @ignore
     * @protected
     */
    protected readonly __rows: ObservableArray<RowLayoutView>
        = new ObservableArray<RowLayoutView>();

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: GridLayoutViewOptions = {}) {
        super(options);

        this.__rowsLengthProperty.change((val) => this.getRows().forEach(item => item.rowLength(val)));
        this.__rows.change(() => this.rebuild());
        this.denyRebuild(true);

        Guard.variable<View[][] | RowLayoutView[]>(options.items, (value) => {
            if (value[0] && value[0] instanceof RowLayoutView)
                for (const row of value as RowLayoutView[])
                    this.getRows().push(row);
            else
                for (const items of value as View[][])
                    this.add(...items);
        });
        this.rowsLength(24);
        Guard.variableAndSet<number>(options.rowsLength, this.rowsLength, this);
        this.denyRebuild(false);
        this.rebuild();
    }

    /**
     * Возвращает количество элементов в строках
     * @returns {number}
     */
    public rowsLength(): number;

    /**
     * Устанавливает количество элементов в строках
     * @param {number} value - значение
     * @returns {this}
     */
    public rowsLength(value: number): GridLayoutView;

    /**
     * Возвращает и устанавливает количество элементов в строках
     * @param {number} [value] - значение
     * @returns {number|this|null}
     *
     * Внимание! После установки данного значения, значения во всех строках будут изменены!
     */
    public rowsLength(value?: number): number | null | GridLayoutView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowsLengthProperty);
    }

    /**
     * Возвращает строки сетки
     * @return {ObservableArray<RowLayoutView>}
     */
    public getRows(): ObservableArray<RowLayoutView> {
        return this.__rows;
    }

    /**
     * Возвращает строку по индексу
     * @param {number} index
     * @return {RowLayoutView}
     */
    public rowAt(index: number): RowLayoutView | null {
        if (this.getRows().hasIndex(index)) return this.getRows().item(index);
        return null;
    }

    /**
     * Добавляет элемент[ы] на сетку
     * @param view
     */
    public add(...view: View[]): GridLayoutView {
        const row = new RowLayoutView({rowLength: this.rowsLength()});
        this.getRows().push(row);
        row.add(...view);
        this.rebuild();
        return this;
    }

    /**
     * Возвращает индекс строки элемента
     * @param {View} view
     */
    public rowIndex(view: View): number {
        let i = 0;
        for (const row of this.getRows().get()) {
            if (row.contains(view)) return i;
            i++;
        }
        return -1;
    }

    /**
     * Воззвращает координаты элемента на сетке
     * @param {View} view
     * @return {{ rowIndex: number, colIndex: number }}
     */
    public colRowIndex(view: View): { rowIndex: number, colIndex: number } {
        const rowIndex = this.rowIndex(view);
        if (rowIndex === -1) return {rowIndex: -1, colIndex: -1};
        const row = this.rowAt(rowIndex);
        const colIndex = row ? row.indexOf(view) : -1;
        if (colIndex > -1) return {rowIndex, colIndex};
        return {rowIndex: -1, colIndex: -1};
    }

    /**
     * Серализует объект
     */
    public serialize(): any {
        const _items: any[] = [];
        this.getRows().forEach(row => {
            _items.push(row.serialize());
        });
        return {
            ...super.serialize(),
            items: _items,
        };
    }

    /**
     * Перестроение
     * @ignore
     * @private
     */
    protected __rebuild(): GridLayoutView {
        this.removeViewContent();
        this.getRows().forEach(item => {
            this.getDocument().append(item.getDocument());
        });
        return this;
    }

}

/**
 * @typedef {Object} GridLayoutViewOptions
 * @property {number} [rowsLength = 24]
 * @property {boolean} [staticGrid = false]
 * @property {View[][] | RowLayoutView[]} [items]
 */

/**
 * @typedef {Object} TGridSize
 * @property {number} columns
 * @property {number} rows
 */
