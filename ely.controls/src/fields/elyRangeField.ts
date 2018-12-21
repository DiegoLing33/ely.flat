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
 + Файл: elyRangeField.ts                                                     +
 + Файл изменен: 20.12.2018 23:22:12                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyStyle from "@enums/elyStyle";
import elyRangeFieldOptions from "@options/fields/elyRangeFieldOptions";
import elyListView from "@controls/view/elyListView";

/**
 * @typedef {object} elyRangeFieldOptions
 * @property {number} [max] - Максимальное значение
 * @property {number} [min] - Минимальное значение
 * @property {number} [step] - Шаг
 * @property {number} [value] - Значение
 */

/**
 * Поле ввода: Выбор значения
 * @class elyRangeField
 * @augments elyField
 */
@designable("step", elyDesignableFieldState.GETSET, "number")
@designable("max", elyDesignableFieldState.GETSET, "number")
@designable("min", elyDesignableFieldState.GETSET, "number")
@designable("value", elyDesignableFieldState.GETSET, "number")
export default class elyRangeField extends elyField<number> {

    /**
     * Элементы
     */
    public readonly listView: elyListView = new elyListView({class: "range-labels"});

    /**
     * Свойство: стиль трека
     * @protected
     * @ignore
     * @protected
     */
    protected readonly rangeStyleProperty: elyObservableProperty<elyStyle>
        = new elyObservableProperty<elyStyle>(elyStyle.default);

    /**
     * Свойство: шаг
     * @ignore
     * @protected
     */
    protected readonly stepProperty: elyObservableProperty<number>
        = new elyObservableProperty<number>(1);

    /**
     * Свойство: минимальное значение
     * @ignore
     * @protected
     */
    protected readonly minProperty: elyObservableProperty<number>
        = new elyObservableProperty<number>(0);

    /**
     * Свойство: максимальное значение
     * @ignore
     * @protected
     */
    protected readonly maxProperty: elyObservableProperty<number>
        = new elyObservableProperty<number>(10);

    /**
     * Конструктор
     * @param {elyRangeFieldOptions} options - опции
     */
    constructor(options: elyRangeFieldOptions = {}) {
        super(options, new elyInput({type: "range", noObservers: true}));

        this.addClass("ef-range-field");
        this.maxProperty.change(value => {
            this.accessoryView.attribute("max", String(value));
            this.listView.items.clear();
            for (let i = 0; i <= this.max() - this.min(); i += this.step()) {
                this.listView.add(String(i + this.min()));
            }
            this.listView.rebuild();
        });
        this.minProperty.change(value => {
            this.accessoryView.attribute("min", String(value));
            this.listView.items.clear();
            for (let i = 0; i <= this.max() - this.min(); i += this.step()) {
                this.listView.add(String(i + this.min()));
            }
            this.listView.rebuild();
        });
        this.stepProperty.change(value => {
            this.accessoryView.attribute("step", String(value));
            this.listView.items.clear();
            for (let i = 0; i <= this.max() - this.min(); i += this.step()) {
                this.listView.add(String(i + this.min()));
            }
            this.listView.rebuild();
        });
        this.valueProperty.change(value => {
            this.accessoryView.getDocument().value = value;
            this.listView.rebuild();
        });
        this.accessoryView.valueProperty.removeAllObservers();

        const accessoryDoc = this.accessoryView.getDocument() as HTMLInputElement;

        accessoryDoc.onchange = () => {
            this.value(accessoryDoc.valueAsNumber);
        };
        (this.accessoryView as elyInput).valueProperty.change(value => this.value(parseInt(value, 10)));

        this.getDocument().append(this.listView.getDocument());
        this.listView.addItemWillDrawObserver((i, listItemView) => {
            const w = this.accessoryView.getRect().width;
            let count = (this.max() + Math.abs(this.min() - this.step()));
            count *= Math.abs((count * 0.016) - (1.83));

            //  n * x = n
            //  4 * x = 3 // x = 0.75
            //  6 * x = 4 // x = 0.66666667
            //  8 * x = 5 // x = 0.625
            // 10 * x = 6 // x = 0.6
            // 12 * x = 7 // x = 0,58333333

            //  2 : 2
            //  4 : 3
            //  6 : 4
            //  8 : 5
            // 10 : 6
            // 12 : 7
            // 14 : 8
            // 16 : 9
            // 18 : 10
            // 20 : 11
            // 22 : 12 = 1,83
            const index = this.value() - this.min();
            const oneW = w / count;
            // 11.5
            if (i * this.step() === index) listItemView.addClass("active");
            this.listView.getStyle().marginLeft = (-oneW / 2) + "px";
            listItemView.css({width: oneW + "px", left: (oneW * i) + "px"});
            listItemView.addObserver("click", () => {
                this.value(i + this.min());
            });
        });
        this.resize(() => {
            this.listView.rebuild();
        });

        this.listView.denyRebuild(true);
        this.min(options.min || 0);
        this.step(options.step || 1);
        this.max(options.max || 4);
        this.listView.denyRebuild(false);

        this.value(this.min());
        this.applyProtocolOptions(options);
    }

    /**
     * Возвращает стиль трека
     * @returns {elyStyle}
     */
    public rangeStyle(): elyStyle;

    /**
     * Устанавливает стиль трека
     * @param {elyStyle} value - значение
     * @returns {elyRangeField}
     */
    public rangeStyle(value: elyStyle | string): elyRangeField;

    /**
     * Возвращает и устанавливает стиль трека
     * @param {elyStyle} [value] - значение
     * @returns {elyStyle|elyRangeField|null}
     */
    public rangeStyle(value?: elyStyle | string): elyStyle | null | elyRangeField {
        if (typeof value === "string") value = elyStyle.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.rangeStyleProperty);
    }

    /**
     * Возвращает шаг
     * @returns {number}
     */
    public step(): number;

    /**
     * Устанавливает шаг
     * @param {number} value - значение
     * @returns {elyRangeField}
     */
    public step(value: number): elyRangeField;
    /**
     * Возвращает и устанавливает шаг
     * @param {number} [value] - значение
     * @returns {number|elyRangeField|null}
     */
    public step(value?: number): number | null | elyRangeField {
        return elyObservableProperty.simplePropertyAccess(this, value, this.stepProperty);
    }

    /**
     * Возвращает максимальное значение
     * @returns {number}
     */
    public max(): number;

    /**
     * Устанавливает максимальное значение
     * @param {number} value - значение
     * @returns {elyRangeField}
     */
    public max(value: number): elyRangeField;

    /**
     * Возвращает и устанавливает максимальное значение
     * @param {number} [value] - значение
     * @returns {number|elyRangeField|null}
     */
    public max(value?: number): number | null | elyRangeField {
        return elyObservableProperty.simplePropertyAccess(this, value, this.maxProperty);
    }

    /**
     * Возвращает минимальное значение
     * @returns {number}
     */
    public min(): number;

    /**
     * Устанавливает минимальное значение
     * @param {number} value - значение
     * @returns {elyRangeField}
     */
    public min(value: number): elyRangeField;

    /**
     * Возвращает и устанавливает минимальное значение
     * @param {number} [value] - значение
     * @returns {number|elyRangeField|null}
     */
    public min(value?: number): number | null | elyRangeField {
        return elyObservableProperty.simplePropertyAccess(this, value, this.minProperty);
    }

    /**
     * Возвращает стандартное значение
     * @returns {number}
     */
    public defaultValue(): number {
        return this.min();
    }

    /**
     * Данный метод всегда возвращает false
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return false;
    }

}
