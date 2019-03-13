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
 + Файл: SwitchFields                                                     +
 + Файл изменен: 09.02.2019 15:38:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Control from "@controls/action/Control";
import Field, {FieldOptions} from "@controls/input/Field";
import TextView from "@controls/text/TextView";
import View from "@core/controls/View";
import {variable} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";
import Style from "@enums/Style";
import {text} from "figlet";

/**
 * Опции {@link SwitchField}
 */
export interface SwitchFieldOptions extends FieldOptions<boolean> {
    title?: string | View;
    leftLabel?: string | View;
    rightLabel?: string | View;
    switchStyle?: string | Style;
}

/**
 * Поле ввода переключатель
 * @class SwitchField
 * @augments {Field<boolean>}
 */
export default class SwitchField extends Field<boolean> {

    /**
     * Левый лейбл
     * @type {ObservableProperty<View>}
     * @protected
     * @ignore
     */
    protected readonly __leftLabel: ObservableProperty<View> = new ObservableProperty<View>();

    /**
     * Правый лейбл
     * @type {ObservableProperty<View>}
     * @protected
     * @ignore
     */
    protected readonly __rightLabel: ObservableProperty<View> = new ObservableProperty<View>();

    /**
     * Элемент переключателя
     * @protected
     * @ignore
     */
    protected __core: Control = new Control({class: "--core", tag: "span"});

    /**
     * Свойство: стиль переключателя
     * @ignore
     */
    protected readonly switchStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>(null);

    /**
     * Конструктор
     * @param {SwitchFieldOptions} options
     */
    public constructor(options: SwitchFieldOptions = {}) {
        super({tag: "label", ...options});
        this.addClass("ef-switch");
        this.getDocument().append(this.getToggleView().getDocument());
        this.getAccessory().type = "checkbox";
        this.getAccessory().onchange = () => this.value(this.getAccessory().checked);

        this.__leftLabel.change(() => this.rebuild());
        this.__rightLabel.change(() => this.rebuild());

        this.switchStyleProperty.change((value, oldVal) => {
            if (oldVal) this.removeClass(`--${oldVal}`);
            this.addClass(`--${value}`);
        });

        this.valueProperty.change(value => this.getAccessory().checked = value);

        variable(options.leftLabel, () => this.setLeftLabel(options.leftLabel!));
        variable(options.rightLabel, () => this.setRightLabel(options.rightLabel!));
        variable(options.title, () => this.setLeftLabel(options.title!));
        variable(options.value, () => this.value(options.value!));
        variable(options.switchStyle, () => this.switchStyle(options.switchStyle!));
    }

    /**
     * Очищает значение
     * @return {this}
     */
    public clearValue(): SwitchField {
        this.value(false);
        return this;
    }

    /**
     * Устанавливает лейбл слева
     * @param {string|View} view
     * @return {this}
     */
    public setLeftLabel(view: View | string): SwitchField {
        return this.__setLabel(this.__leftLabel, view);
    }

    /**
     * Устанавливает лейбл справа
     * @param {string|View} view
     * @return {this}
     */
    public setRightLabel(view: View | string): SwitchField {
        return this.__setLabel(this.__rightLabel, view);
    }

    /**
     * Возвращает левый лейбл
     * @return {View|null}
     */
    public getLeftLabel(): View | null {
        return this.__leftLabel.get();
    }

    /**
     * Возвращает правый лейбл
     * @return {View|null}
     */
    public getRightLabel(): View | null {
        return this.__rightLabel.get();
    }

    /**
     * Возвращает элемент переключателя
     * @return {View}
     */
    public getToggleView(): View {
        return this.__core;
    }

    /**
     * Возвращает левый заголовок
     * @return {string}
     */
    public leftLabel(): string;

    /**
     * Устанавливает левый заголовок
     * @param {string} value - значение
     * @return {this}
     */
    public leftLabel(value: string): SwitchField;

    /**
     * Возвращает и устанавливает левый заголовок
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public leftLabel(value?: string): string | null | SwitchField {
        if (value === undefined) {
            if (this.getLeftLabel())
                return this.getLeftLabel()!.getDocument().innerText;
            return null;
        }
        this.setLeftLabel(value);
        return this;
    }

    /**
     * Возвращает правый заголовок
     * @return {string}
     */
    public rightLabel(): string;

    /**
     * Устанавливает правый заголовок
     * @param {string} value - значение
     * @return {this}
     */
    public rightLabel(value: string): SwitchField;

    /**
     * Возвращает и устанавливает правый заголовок
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public rightLabel(value?: string): string | null | SwitchField {
        if (value === undefined) {
            if (this.getRightLabel())
                return this.getRightLabel()!.getDocument().innerText;
            return null;
        }
        this.setRightLabel(value);
        return this;
    }

    /**
     * Выполняет перестроение элемента
     * @return {this}
     */
    public rebuild(): SwitchField {
        this.removeViewContent();
        this.getDocument().append(this.getAccessory());
        if (!this.__leftLabel.isNull()) this.getDocument().append(this.__leftLabel.get()!.getDocument());
        this.getDocument().append(this.getToggleView().getDocument());
        if (!this.__rightLabel.isNull()) this.getDocument().append(this.__rightLabel.get()!.getDocument());
        return this;
    }

    /**
     * Возвращает стиль переключателя
     * @returns {Style}
     */
    public switchStyle(): Style;

    /**
     * Устанавливает стиль переключателя
     * @param {Style|string} value - значение
     * @returns {this}
     */
    public switchStyle(value: Style | string): SwitchField;

    /**
     * Возвращает и устанавливает стиль переключателя
     * @param {Style|string} [value] - значение
     * @returns {Style|this|null}
     */
    public switchStyle(value?: Style | string): Style | null | SwitchField {
        if (typeof value === "string") value = Style.byName(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.switchStyleProperty);
    }

    public serialize(): any {
        const obj: any = {};
        if (this.leftLabel()) obj.leftLabel = this.leftLabel();
        if (this.rightLabel()) obj.rightLabel = this.rightLabel();
        if (this.switchStyle()) obj.switchStyle = this.switchStyle();
        return {
            ...super.serialize(),
            ...obj,
        };
    }

    /**
     * Устанавливает заголовок переключателья
     * @param label
     * @param value
     * @private
     */
    protected __setLabel(label: ObservableProperty<View>, value: any) {
        if (typeof value === "string") {
            if (value === "") label.set(null as any);
            else {
                value = new TextView({text: value});
                label.set(value);
            }
        } else {
            label.set(value);
        }
        return this;
    }
}

/**
 * @typedef {Object} SwitchFieldOptions
 * @property {string|View} [title]
 * @property {string|View} [leftLabel]
 * @property {string|View} [rightLabel]
 * @property {string|Style} [switchStyle]
 * @property {boolean} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 */
