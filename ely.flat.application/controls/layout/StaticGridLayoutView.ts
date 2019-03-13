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
 + Файл: StaticGridLayoutView.ts                                              +
 + Файл изменен: 07.03.2019 22:56:32                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import RowLayoutView from "@controls/layout/RowLayoutView";
import ViewLayout, {ViewLayoutOptions} from "@controls/layout/ViewLayout";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import View, {ViewOptions} from "@core/controls/View";
import {variableAndSet} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Опции {@link StaticGridLayoutView}
 */
export interface StaticGridLayoutViewOptions extends ViewLayoutOptions {
    columns: number;
    rows: number;
}

/**
 * Элемент отображения
 * @class StaticGridLayoutView
 * @augments {View}
 */
export default class StaticGridLayoutView extends ViewLayout {

    /**
     * Свойство: количество колонок
     * @ignore
     * @protected
     */
    protected readonly __columnsProperty: ObservableProperty<number>
        = new ObservableProperty<number>(1).change(() => this.rebuild());

    /**
     * Свойство: количество строк
     * @ignore
     * @protected
     */
    protected readonly __rowsProperty: ObservableProperty<number>
        = new ObservableProperty<number>(1).change(() => this.rebuild());

    /**
     * Конструктор
     * @param {StaticGridLayoutViewOptions} options - опции
     */
    public constructor(options: StaticGridLayoutViewOptions) {
        super({...options, nobuild: true});
        this.denyRebuild(true);
        this.rows(options.rows);
        this.columns(options.columns);

        variableAndSet(options.items, this.items, this, []);
        this.denyRebuild(false);
        this.rebuild();
    }

    /**
     * Возвращает свойство: количество колонок
     * @return {ObservableProperty<number>}
     */
    public getColumnsProperty(): ObservableProperty<number> {
        return this.__columnsProperty;
    }

    /**
     * Возвращает количество колонок
     * @returns {number}
     */
    public columns(): number;

    /**
     * Устанавливает количество колонок
     * @param {number} value - значение
     * @returns {this}
     */
    public columns(value: number): StaticGridLayoutView;

    /**
     * Возвращает и устанавливает количество колонок
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public columns(value?: number): number | null | StaticGridLayoutView {
        return ObservableProperty.simplePropertyAccess(this, value, this.getColumnsProperty());
    }

    /**
     * Возвращает свойство: количество строк
     * @return {ObservableProperty<number>}
     */
    public getRowsProperty(): ObservableProperty<number> {
        return this.__rowsProperty;
    }

    /**
     * Возвращает количество строк
     * @returns {number}
     */
    public rows(): number;

    /**
     * Устанавливает количество строк
     * @param {number} value - значение
     * @returns {this}
     */
    public rows(value: number): StaticGridLayoutView;

    /**
     * Возвращает и устанавливает количество строк
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public rows(value?: number): number | null | StaticGridLayoutView {
        return ObservableProperty.simplePropertyAccess(this, value, this.getRowsProperty());
    }

    public serialize(): any {
        return {
            ...super.serialize(),
            columns: this.columns(),
            items: this.items().map(value => value.serialize()),
            rows: this.rows(),
        };
    }

    /**
     * Устанавливает элемент отображения на координатах
     * @param {View} view
     * @param {number} row
     * @param {number} column
     * @return {this}
     */
    public setViewAt(view: View, row: number, column: number): StaticGridLayoutView {
        this.getItemsProperty().setItemAtIndex(view, row * this.columns() + column);
        return this;
    }

    /**
     * Выполняет перестроение
     * @private
     */
    protected __rebuild(): elyRebuildableViewProtocol | any {
        this.removeViewContent();
        for (let i = 0; i < this.rows(); i++) {
            const row = new RowLayoutView();
            for (let j = 0; j < this.columns(); j++) {
                const item = this.items()[i * this.columns() + j];
                row.add(item ? item : View.empty());
            }
            this.getDocument().append(row.getDocument());
        }
        return this;
    }
}

/**
 * @typedef {ViewLayoutOptions} StaticGridLayoutViewOptions
 * @property {number} rows
 * @property {number} columns
 */
