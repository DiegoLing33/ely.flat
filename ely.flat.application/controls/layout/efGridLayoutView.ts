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
 + Файл: efGridLayoutView.ts                                                  +
 + Файл изменен: 09.02.2019 16:34:32                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efRowLayoutView} from "@controls/layout/efRowLayoutView";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

/**
 * Опции {@link efGridLayoutView}
 */
export interface efGridLayoutViewOptions extends elyViewOptions {
    rowsLength?: number;
    staticGrid?: boolean;
    items?: elyView[][] | efRowLayoutView[];
}

/**
 * Элемент отображения динамической сетки
 * @class efGridLayoutView
 * @augments {elyView}
 */
export class efGridLayoutView extends elyRebuildableViewProtocol {

    /**
     * Свойство: количество элементов в строках
     * @ignore
     * @protected
     */
    protected readonly __rowsLengthProperty: elyObservableProperty<number>
        = new elyObservableProperty<number>(24);

    /**
     * Строки
     * @ignore
     * @protected
     */
    protected readonly __rows: elyObservableArray<efRowLayoutView>
        = new elyObservableArray<efRowLayoutView>();

    /**
     * Свойство: использование статистических размеров элементов
     * @ignore
     * @protected
     */
    protected readonly __staticGridProperty: elyObservableProperty<boolean>
        = new elyObservableProperty<boolean>(false);

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: efGridLayoutViewOptions = {}) {
        super(options);

        this.__rowsLengthProperty.change((val) => this.getRows().forEach(item => item.rowLength(val)));
        this.__staticGridProperty.change(value => this.getRows().forEach(item => item.rowItemsStaticSize(value)));
        this.__rows.change(() => this.rebuild());
        this.denyRebuild(true);

        elyGuard.variable<elyView[][] | efRowLayoutView[]>(options.items, () => {
            if (options.items![0] && options.items![0] instanceof efRowLayoutView)
                for (const row of options.items! as efRowLayoutView[])
                    this.getRows().push(row);
            else
                for (const items of options.items! as elyView[][])
                    this.add(...items);
        });
        this.rowsLength(24);
        this.staticGrid(false);
        elyGuard.variable<number>(options.rowsLength, () => this.rowsLength(options.rowsLength!));
        elyGuard.variable<number>(options.staticGrid, () => this.staticGrid(options.staticGrid!));
        this.denyRebuild(false);
        this.rebuild();
    }

    /**
     * Возвращает использование статистических размеров элементов
     * @returns {boolean}
     */
    public staticGrid(): boolean;

    /**
     * Устанавливает использование статистических размеров элементов
     * @param {boolean} value - значение
     * @returns {this}
     */
    public staticGrid(value: boolean): efGridLayoutView;

    /**
     * Возвращает и устанавливает использование статистических размеров элементов
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     *
     * Внимание! После установки данного значения, значения во всех строках будут изменены!
     */
    public staticGrid(value?: boolean): boolean | null | efGridLayoutView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__staticGridProperty);
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
    public rowsLength(value: number): efGridLayoutView;

    /**
     * Возвращает и устанавливает количество элементов в строках
     * @param {number} [value] - значение
     * @returns {number|this|null}
     *
     * Внимание! После установки данного значения, значения во всех строках будут изменены!
     */
    public rowsLength(value?: number): number | null | efGridLayoutView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__rowsLengthProperty);
    }

    /**
     * Возвращает строки сетки
     * @return {elyObservableArray<efRowLayoutView>}
     */
    public getRows(): elyObservableArray<efRowLayoutView> {
        return this.__rows;
    }

    /**
     * Возвращает строку по индексу
     * @param {number} index
     * @return {efRowLayoutView}
     */
    public rowAt(index: number): efRowLayoutView | null {
        if (this.getRows().hasIndex(index)) return this.getRows().item(index);
        return null;
    }

    /**
     * Добавляет элемент[ы] на сетку
     * @param view
     */
    public add(...view: elyView[]): efGridLayoutView {
        const row = new efRowLayoutView({rowLength: this.rowsLength()});
        this.getRows().push(row);
        row.add(...view);
        this.rebuild();
        return this;
    }

    /**
     * Возвращает индекс строки элемента
     * @param {elyView} view
     */
    public rowIndex(view: elyView): number {
        let i = 0;
        for (const row of this.getRows().get()) {
            if (row.contains(view)) return i;
            i++;
        }
        return -1;
    }

    /**
     * Воззвращает координаты элемента на сетке
     * @param {elyView} view
     * @return {{ rowIndex: number, colIndex: number }}
     */
    public colRowIndex(view: elyView): { rowIndex: number, colIndex: number } {
        const rowIndex = this.rowIndex(view);
        if (rowIndex === -1) return {rowIndex: -1, colIndex: -1};
        const row = this.rowAt(rowIndex);
        const colIndex = row ? row.indexOf(view) : -1;
        if (colIndex > -1) return {rowIndex, colIndex};
        return {rowIndex: -1, colIndex: -1};
    }

    /**
     * Перестроение
     * @ignore
     * @private
     */
    protected __rebuild(): efGridLayoutView {
        this.removeViewContent();
        this.getRows().forEach(item => {
            this.getDocument().append(item.getDocument());
        });
        return this;
    }

}

/**
 * @typedef {Object} efGridLayoutViewOptions
 * @property {number} [rowsLength = 24]
 * @property {boolean} [staticGrid = false]
 * @property {elyView[][] | efRowLayoutView[]} [items]
 */
