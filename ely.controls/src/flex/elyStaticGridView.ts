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
 + Файл: elyStaticGridView.ts                                                 +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyView from "@core/controls/elyView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyStaticGridViewOptions from "@options/elyStaticGridViewOptions";
import IPosition from "@controls/interfaces/IPosition";
import elyUtils from "@core/elyUtils";
import elyStylesheet from "@controls/elyStylesheet";

/**
 * Позиция на сетке
 */
interface elyStaticGridViewLocation {

    /**
     * Строка
     */
    row: number;

    /**
     * Столбец
     */
    col: number;

    /**
     * Индекс
     */
    index: number;
}

/**
 * Элемент отображения: статичная сетка
 *
 * Обсерверы:
 * - col (colView, location, view)
 * @class elyStaticGridView
 * @augments elyRebuildableViewProtocol
 */
@designable("rowsCount", elyDesignableFieldState.GETSET, "number")
@designable("colsCount", elyDesignableFieldState.GETSET, "number")
@designable("flexMapValues", elyDesignableFieldState.GETSET, "[string]")
export default class elyStaticGridView extends elyRebuildableViewProtocol {

    [contentView: string]: any;

    /**
     * Возвращает позицию элемента
     * @param index
     * @param rowsCount
     * @param colsCount
     */
    public static indexIn(index: number, rowsCount: number, colsCount: number): elyStaticGridViewLocation {
        if (index > -1) {
            const rowIndex = Math.floor(index / rowsCount);
            const colIndex = index - (rowIndex * colsCount);
            return {row: rowIndex, col: colIndex, index};
        }
        return {row: -1, col: -1, index: -1};
    }

    /**
     * Свойство: количество строк
     * @ignore
     */
    public readonly rowsCountProperty: elyObservableProperty<number>;

    /**
     * Свойство: количество колонок в строке
     * @ignore
     */
    public readonly colsCountProperty: elyObservableProperty<number>;

    /**
     * Элементы
     */
    protected readonly views: elyObservableArray<elyView>;

    /**
     * Флекс карта
     * @ignore
     */
    protected readonly flexMapProperty: string[] = [];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyStaticGridViewOptions = {}) {
        super(options);
        this.denyRebuild(true);

        this.flexContentView = new elyControl();
        this.getDocument().append(this.flexContentView.getDocument());

        this.views = new elyObservableArray<elyView>();
        this.views.change(() => this.rebuild());

        this.rowsCountProperty = new elyObservableProperty<number>(3);
        this.rowsCountProperty.change(() => this.rebuild());

        this.colsCountProperty = new elyObservableProperty<number>(3);
        this.colsCountProperty.change(() => this.rebuild());

        this.rowsCount(options.rowsCount || 3);
        this.colsCount(options.colsCount || 3);

        this.addClass(this.identifier());

        if (options.flexMapValues) this.flexMap(...options.flexMapValues);
        if (options.flexMap) this.flexMap(...options.flexMap);
        this.setItemsMargin(options.margin || {top: 5, bottom: 5, left: 5, right: 5});

        this.denyRebuild(false);
        this.rebuild();
    }

    /**
     * Устанавливает внитринний отступ элементов сетки
     * @param margin
     */
    public setItemsMargin(margin: IPosition): elyStaticGridView {
        margin       = {...{top: 0, bottom: 0, left: 0, right: 0}, ...margin};
        const styles = {};
        elyUtils.applySrc(margin, ["top", "bottom", "left", "right"], styles, "margin-", (val) => {
            return typeof val === "string" ? val : val + "px";
        });
        elyStylesheet.global.addClass(this.identifier() + " .item", styles);
        return this;
    }

    /**
     * Возвращает количество flexMap значений
     */
    public flexMapValuesCount(): number {
        return this.colsCount();
    }

    /**
     * Устанавливает или возвращает элементы flexMap
     * @param index
     * @param value
     */
    public flexMapValues(index?: number, value?: any): string | elyStaticGridView | string[] {
        if (index === undefined && value === undefined) return this.flexMapProperty;
        if (index !== undefined && index !== null) {
            if (value === undefined) return this.flexMapProperty[index] || "auto";
            if (typeof value === "string") {
                value = value.trim();
                if (/-?([0-9.])(px|%|rem)/.test(value)) {
                    this.flexMapProperty[index] = value;
                } else {
                    this.flexMapProperty[index] = value + "%";
                }
            } else if (typeof value === "number") {
                this.flexMapProperty[index] = `${value}%`;
            } else {
                this.flexMapProperty[index] = "auto";
            }
            this.rebuild();
        }
        return this;
    }

    /**
     * Устанавливает флекс карту
     * @param data
     */
    public flexMap(...data: any[]): elyStaticGridView;

    /**
     * Удаляет флекс карту
     */
    public flexMap(): string[];

    /**
     * Устанавливает флекс карту
     * @param data
     */
    public flexMap(...data: any[]): string[] | elyStaticGridView {
        if (data !== undefined && data && data.length > 0) {
            data.forEach((value, index) => {
                if (typeof value === "string") {
                    value = value.trim();
                    if (/-?([0-9.])(px|%|rem)/.test(value)) {
                        this.flexMapProperty[index] = value;
                    } else {
                        this.flexMapProperty[index] = value + "%";
                    }
                } else if (typeof value === "number") {
                    this.flexMapProperty[index] = `${value}%`;
                } else {
                    this.flexMapProperty[index] = "auto";
                }
            });
            this.rebuild();
            return this;
        }
        return this.flexMapProperty;
    }

    /**
     * Возвращает количество строк
     */
    public rowsCount(): number;

    /**
     * Устанавливает количество строк
     */
    public rowsCount(value: number): elyStaticGridView;

    /**
     * Возвращает и устанавливает количество строк
     */
    public rowsCount(value?: number): number | null | elyStaticGridView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.rowsCountProperty);
    }

    /**
     * Возвращает количество колонок в строке
     */
    public colsCount(): number;

    /**
     * Устанавливает количество колонок в строке
     */
    public colsCount(value: number): elyStaticGridView;

    /**
     * Возвращает и устанавливает количество колонок в строке
     */
    public colsCount(value?: number): number | null | elyStaticGridView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.colsCountProperty);
    }

    /**
     * Добавляет элементы
     * @param views
     */
    public add(...views: elyView[]): void {
        views.forEach(value => this.views.push(value));
    }

    /**
     * Возвращает позицию элемента
     * @param view
     */
    public viewLocation(view: elyView): elyStaticGridViewLocation {
        const index = this.views.indexOf(view);
        return elyStaticGridView.indexIn(index, this.rowsCount(), this.colsCount());
    }

    protected __rebuild(): elyRebuildableViewProtocol {
        this.removeViewContent();
        for (let i = 0; i < this.rowsCount(); i++) {
            const rowView = new elyControl();
            rowView.addClass("ef-flex-box", "row");
            for (let j = 0; j < this.colsCount(); j++) {
                const index = i * (this.colsCount()) + j;
                const colView = new elyControl({class: "item"});
                const flexSize = this.flexMapProperty[j] || `${100 / this.colsCount()}%`;
                colView.getStyle().flex = `1 1 ${flexSize}`;
                this[`contentView${index}`] = colView;
                const view = this.views.item(index);
                if (view) {
                    colView.addSubView(this.views.item(index));
                }
                rowView.addSubView(colView);
                this.notificate("col", [colView, {col: j, row: i, index} as elyStaticGridViewLocation,
                    view]);
            }
            this.getDocument().append(rowView.getDocument());
        }
        this.notificate("rebuild", []);
        return this;
    }

}
