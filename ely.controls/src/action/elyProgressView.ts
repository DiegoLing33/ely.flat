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
 + Файл: elyProgressView.ts                                                   +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "ely.core/src/controls/elyView";
import elyViewOptions from "ely.core/src/controls/elyViewOptions";
import {designable, elyDesignableFieldState} from "ely.core/src/elyDesignable";
import elyObservableProperty from "ely.core/src/observable/properties/elyObservableProperty";
import elyStyle from "../enums/elyStyle";
import elyRebuildableViewProtocol from "../protocols/elyRebuildableViewProtocol";
import elyControl from "./elyControl";

/**
 * Опции: {@link elyProgressView}
 */
interface elyProgressViewOptions extends elyViewOptions {
    displayInfoLevel?: number;
    max?: number;
    min?: number;
    current?: number;
}

/**
 * Элемент управления: Прогресс бар
 * @version 1.0
 */
@designable("barStyle", elyDesignableFieldState.GETSET, "string", elyStyle.list())
@designable("current", elyDesignableFieldState.GETSET)
export default class elyProgressView extends elyRebuildableViewProtocol {

    /**
     * Бар
     */
    public readonly barView: elyControl;

    /**
     * Уровень отображения данных
     */
    public displayInfoLevel: number = 0;

    /**
     * Свойство: Максимальное значение
     * @ignore
     */
    protected readonly maxProperty: elyObservableProperty<number>;

    /**
     * Свойство: Минимальное значение
     * @ignore
     */
    protected readonly minProperty: elyObservableProperty<number>;

    /**
     * Свойство: Текущее значение
     * @ignore
     */
    protected readonly currentProperty: elyObservableProperty<number>;

    /**
     * Свойство: стиль полосы бара
     * @ignore
     */
    protected readonly barStyleProperty: elyObservableProperty<elyStyle>;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyProgressViewOptions = {}) {
        super(options);
        this.displayInfoLevel = options.displayInfoLevel || 0;
        this.maxProperty      = new elyObservableProperty<number>();
        this.minProperty      = new elyObservableProperty<number>();
        this.currentProperty  = new elyObservableProperty<number>();
        this.barStyleProperty = new elyObservableProperty<elyStyle>(elyStyle.default);

        this.barStyleProperty.change((newValue, oldValue) => {
            if (!oldValue) oldValue = elyStyle.default;
            this.barView.removeClass(`bg-${oldValue.value}`).addClass(`bg-${newValue.value}`);
        });

        this.currentProperty.change((newValue) => {
            if (newValue < this.min()) {
                this.current(this.min());
                return;
            } else if (newValue > this.max()) {
                this.current(this.max());
                return;
            }
            this.rebuild();
        });
        this.maxProperty.change((newValue) => {
            if (newValue < this.min()) {
                this.max(this.min() as number);
                return;
            } else if (newValue < this.current()) {
                this.current(newValue);
                return;
            }
            this.rebuild();
        });
        this.minProperty.change((newValue) => {
            if (newValue > this.max()) {
                this.min(this.max());
                return;
            } else if (newValue > this.current()) {
                this.current(this.min());
            }
            this.rebuild();
        });

        this.addClass("ef-pb");

        this.barView = new elyControl();
        this.barView.addClass("bar");
        this.getDocument().appendChild(this.barView.getDocument());

        this.denyRebuild(true);
        this.min(options.min || 0);
        this.max(options.max || 100);
        this.denyRebuild(false);
        this.current(options.current || 0);
        this.barStyle(elyStyle.primary);
    }

    /**
     * Возвращает стиль полосы бара
     */
    public barStyle(): elyStyle;

    /**
     * Устанавливает стиль полосы бара
     */
    public barStyle(value: elyStyle | string): elyProgressView;

    /**
     * Возвращает и устанавливает стиль полосы бара
     */
    public barStyle(value?: elyStyle | string): elyStyle | null | elyProgressView {
        if (typeof value === "string") value = elyStyle.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.barStyleProperty);
    }

    /**
     * Возвращает текущее значение
     */
    public current(): number;

    /**
     * Устанавливает текущее значение
     * @param value
     */
    public current(value: number): elyProgressView;

    /**
     * Устанавливает текущее значение
     * @param value
     */
    public current(value?: number): number | elyProgressView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.currentProperty);
    }

    /**
     * Устанавливает текущее значение как минимальное
     */
    public reset(): elyView {
        this.current(this.min());
        return this;
    }

    /**
     * Возвращает максимальное значение
     */
    public max(): number;

    /**
     * Устанавливает максимальное значение
     * @param value
     */
    public max(value: number): elyProgressView;

    /**
     * Устанавливает или возвращает максимальное значение
     * @param value
     */
    public max(value?: number): number | elyProgressView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.maxProperty);
    }

    /**
     * Возвращает минимальное значение
     */
    public min(): number;

    /**
     * Устанавливает минимальное значение
     * @param value
     */
    public min(value: number): elyProgressView;

    /**
     * Устанавливает минимальное значение
     * @param value
     */
    public min(value?: number): number | elyProgressView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.minProperty);
    }

    /**
     * Вовзаращет процент заполненности
     * @param {boolean} flex - сглаживание значения процента до
     * digits значений после запятой
     *
     * @param {number} digits - количество значение после запятой
     */
    public getPercentage(flex: boolean = false, digits: number = 2) {
        let pc = (this.current() === 0 || this.current() < this.min()) ?
            0 : this.current() / this.max();
        pc *= 100;
        if (flex) {
            digits *= 10;
            pc = Math.round(pc * digits) / digits;
        }
        return pc;
    }

    /**
     * @ignore
     * @private
     */
    protected __rebuild(): elyProgressView {
        this.barView.width(this.getPercentage() + "%");
        if (this.displayInfoLevel === 1) {
            this.hint(this.getPercentage(true) + "%");
        } else if (this.displayInfoLevel === 2) {
            this.hint(`${this.current()} / ${this.max()} [ ${this.getPercentage(true)}% ]`);
        }
        return this;
    }
}
