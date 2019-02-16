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
 + Файл: efSwitchField.ts                                                     +
 + Файл изменен: 09.02.2019 15:38:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {efField, efFieldOptions} from "@controls/input/efField";
import {efTextView} from "@controls/text/efTextView";
import elyView from "@core/controls/elyView";
import elyGuard from "@core/elyGuard";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import Style from "@enums/Style";

/**
 * Опции {@link efSwitchField}
 */
export interface efSwitchFieldOptions extends efFieldOptions<boolean> {
    title?: string | elyView;
    leftLabel?: string | elyView;
    rightLabel?: string | elyView;
    switchStyle?: string | Style;
}

/**
 * Поле ввода переключатель
 * @class efSwitchField
 * @augments {efField<boolean>}
 */
export class efSwitchField extends efField<boolean> {

    /**
     * Левый лейбл
     * @type {elyObservableProperty<elyView>}
     * @protected
     * @ignore
     */
    protected readonly __leftLabel: elyObservableProperty<elyView> = new elyObservableProperty<elyView>();

    /**
     * Правый лейбл
     * @type {elyObservableProperty<elyView>}
     * @protected
     * @ignore
     */
    protected readonly __rightLabel: elyObservableProperty<elyView> = new elyObservableProperty<elyView>();

    /**
     * Элемент переключателя
     * @protected
     * @ignore
     */
    protected __core: elyControl = new elyControl({class: "--core", tag: "span"});

    /**
     * Свойство: стиль переключателя
     * @ignore
     */
    protected readonly switchStyleProperty: elyObservableProperty<Style>
        = new elyObservableProperty<Style>(null);

    /**
     * Конструктор
     * @param {efSwitchFieldOptions} options
     */
    public constructor(options: efSwitchFieldOptions = {}) {
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

        elyGuard.variable(options.leftLabel, () => this.setLeftLabel(options.leftLabel!));
        elyGuard.variable(options.rightLabel, () => this.setRightLabel(options.rightLabel!));
        elyGuard.variable(options.title, () => this.setLeftLabel(options.title!));
        elyGuard.variable(options.value, () => this.value(options.value!));
        elyGuard.variable(options.switchStyle, () => this.switchStyle(options.switchStyle!));
    }

    /**
     * Очищает значение
     * @return {this}
     */
    public clearValue(): efSwitchField {
        this.value(false);
        return this;
    }

    /**
     * Устанавливает лейбл слева
     * @param {string|elyView} view
     * @return {this}
     */
    public setLeftLabel(view: elyView | string): efSwitchField {
        if (typeof view === "string") view = new efTextView({text: view});
        this.__leftLabel.set(view);
        return this;
    }

    /**
     * Устанавливает лейбл справа
     * @param {string|elyView} view
     * @return {this}
     */
    public setRightLabel(view: elyView | string): efSwitchField {
        if (typeof view === "string") view = new efTextView({text: view});
        this.__rightLabel.set(view);
        return this;
    }

    /**
     * Возвращает левый лейбл
     * @return {elyView|null}
     */
    public getLeftLabel(): elyView | null {
        return this.__leftLabel.get();
    }

    /**
     * Возвращает правый лейбл
     * @return {elyView|null}
     */
    public getRightLabel(): elyView | null {
        return this.__rightLabel.get();
    }

    /**
     * Возвращает элемент переключателя
     * @return {elyView}
     */
    public getToggleView(): elyView {
        return this.__core;
    }

    /**
     * Выполняет перестроение элемента
     * @return {this}
     */
    public rebuild(): efSwitchField {
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
    public switchStyle(value: Style | string): efSwitchField;

    /**
     * Возвращает и устанавливает стиль переключателя
     * @param {Style|string} [value] - значение
     * @returns {Style|this|null}
     */
    public switchStyle(value?: Style | string): Style | null | efSwitchField {
        if (typeof value === "string") value = Style.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.switchStyleProperty);
    }
}

/**
 * @typedef {Object} efSwitchFieldOptions
 * @property {string|elyView} [title]
 * @property {string|elyView} [leftLabel]
 * @property {string|elyView} [rightLabel]
 * @property {string|Style} [switchStyle]
 * @property {boolean} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 */
