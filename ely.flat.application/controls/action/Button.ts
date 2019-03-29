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
 + Файл: Button.ts                                                        +
 + Файл изменен: 08.02.2019 02:22:02                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View, {ViewOptions} from "../../core/controls/View";
import Size from "../../enums/Size";
import Style from "../../enums/Style";
import efSerializableProtocol from "../../protocols/efSerializableProtocol";
import TextView from "../text/TextView";

/**
 * Опции для {@link Button}
 */
export interface ButtonOptions extends ViewOptions {
    text?: string;
    buttonStyle?: Style;
    buttonSize?: Size;
    buttonRounded?: boolean;
    click?: () => void;
    fill?: boolean;
}

/**
 * Элемент отображения кнопка
 * @class Button
 * @augments {Button}
 */
export default class Button extends View implements efSerializableProtocol<Button> {

    public static willBeDeserialized(obj: any) {
        if (typeof obj.buttonSize === "string") obj.buttonSize = Size.byName(obj.buttonSize);
        if (typeof obj.buttonStyle === "string") obj.buttonStyle = Style.byName(obj.buttonStyle);
    }

    /**
     * Свойство: текст на кнопке
     * @ignore
     */
    protected readonly textProperty: ObservableProperty<string>
        = new ObservableProperty<string>("");

    /**
     * Свойство: стиль кнопки
     * @ignore
     */
    protected readonly buttonStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>(Style.primary);

    /**
     * Свойство: размер кнопки
     * @ignore
     */
    protected readonly buttonSizeProperty: ObservableProperty<Size>
        = new ObservableProperty<Size>(Size.default);

    /**
     * Конструктор
     * @param {ButtonOptions} options
     */
    public constructor(options: ButtonOptions = {}) {
        super(options);
        this.addClass("button");

        this.textProperty.change(value => {
            this.getDocument().innerHTML = TextView.filterString(value);
        });
        this.text(options.text || "");
        this.buttonSizeProperty.change((value, oldVal) => {
            this.getStyle().fontSize = null;
            if (oldVal && !oldVal.custom) this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });

        this.buttonStyleProperty.change((value, oldVal) => {
            if (oldVal) this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });

        Guard.variableAndSet<Size>(options.buttonSize, this.buttonSize, this);
        Guard.variableAndSet<Style>(options.buttonStyle, this.buttonStyle, this, Style.primary);
        Guard.variableAndSet<boolean>(options.buttonRounded, this.buttonRounded, this);
        if (Guard.isSet(options.click)) this.click(() => {
            options.click!();
        });
        if (options.fill) this.fill();
    }

    /**
     * Возвращает размер кнопки
     * @returns {Size}
     */
    public buttonSize(): Size;

    /**
     * Устанавливает размер кнопки
     * @param {Size} value - значение
     * @returns {this}
     */
    public buttonSize(value: Size | string): Button;

    /**
     * Возвращает и устанавливает размер кнопки
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    public buttonSize(value?: Size | string): Size | null | Button {
        if (value !== undefined && typeof value === "string") value = Size.byName(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.buttonSizeProperty);
    }

    /**
     * Устанавливает размер кнопки во весь блок.
     * Алиас выражения `Button.buttonSize(Size.fill)`.
     * @return {this}
     */
    public fill(): Button {
        return this.buttonSize(Size.fill);
    }

    /**
     * Возвращает стиль кнопки
     * @returns {Style}
     */
    public buttonStyle(): Style;

    /**
     * Устанавливает стиль кнопки
     * @param {Style|string} value - значение
     * @returns {this}
     */
    public buttonStyle(value: Style | string): Button;

    /**
     * Возвращает и устанавливает стиль кнопки
     * @param {Style|string} [value] - значение
     * @returns {Style|this|null}
     */
    public buttonStyle(value?: Style | string): Style | null | Button {
        if (value !== undefined && typeof value === "string") value = Style.byName(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.buttonStyleProperty);
    }

    /**
     * Возвращает текст на кнопке
     * @returns {string}
     */
    public text(): string;

    /**
     * Устанавливает текст на кнопке
     * @param {string} value - значение
     * @returns {this}
     */
    public text(value: string): Button;

    /**
     * Возвращает и устанавливает текст на кнопке
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public text(value?: string): string | null | Button {
        return ObservableProperty.simplePropertyAccess(this, value, this.textProperty);
    }

    /**
     * Устанавливает слушатель нажатия или нажимает на кнопку
     *
     * @param {Function} [callback = null]
     * @returns {Button}
     */
    public click(callback?: () => void): Button {
        if (callback === undefined) {
            this.getDocument().click();
        } else {
            this.addObserver("click", callback);
        }
        return this;
    }

    /**
     * Возвращает флаг закругления углов кнопки
     * @return {boolean}
     */
    public buttonRounded(): boolean;

    /**
     * Устанавливает флаг закругления углов кнопки
     * @param {boolean} value - значение
     * @return {this}
     */
    public buttonRounded(value: boolean): Button;

    /**
     * Возвращает и устанавливает флаг закругления углов кнопки
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public buttonRounded(value?: boolean): boolean | null | Button {
        if (value === undefined) return this.hasClass("--rounded");
        if (value) this.addClass("--rounded");
        else this.removeClass("--rounded");
        return this;
    }

    /**
     * Сериализует объект
     * @return {string}
     */
    public serialize(): string {
        return {
            ...super.serialize(),
            buttonRounded: this.buttonRounded(),
            buttonSize: this.buttonSize().serialize(),
            buttonStyle: this.buttonStyle().serialize(),
            text: this.text(),
        };
    }
}

/**
 * @typedef {Object} ButtonOptions
 * @property {String} [text = ""]
 * @property {Size} [buttonSize]
 * @property {Style} [buttonStyle]
 * @property {boolean} [buttonRounded = false]
 * @property {boolean} [fill = false]
 * @property {function()} [click]
 */
