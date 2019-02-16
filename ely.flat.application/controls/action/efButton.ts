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
 + Файл: efButton.ts                                                          +
 + Файл изменен: 08.02.2019 02:22:02                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efTextView} from "@controls/text/efTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import Size from "@enums/Size";
import Style from "@enums/Style";
import efSerializableProtocol from "@protocols/efSerializableProtocol";

/**
 * Опции для {@link efButton}
 */
export interface efButtonOptions extends elyViewOptions {
    text?: string;
    buttonStyle?: Style | string;
    buttonSize?: Size | string;
    buttonRounded?: boolean;
    click?: () => void;
    fill?: boolean;
}

/**
 * Элемент отображения кнопка
 * @class efButton
 * @augments {efButton}
 */
export class efButton extends elyView implements efSerializableProtocol<efButton> {
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {efTextView}
     */
    public static deserialize<T>(raw: string): efButton | null {
        return new efButton(JSON.parse(raw));
    }

    /**
     * Свойство: текст на кнопке
     * @ignore
     */
    protected readonly textProperty: elyObservableProperty<string>
        = new elyObservableProperty<string>("");

    /**
     * Свойство: стиль кнопки
     * @ignore
     */
    protected readonly buttonStyleProperty: elyObservableProperty<Style>
        = new elyObservableProperty<Style>(Style.primary);

    /**
     * Свойство: размер кнопки
     * @ignore
     */
    protected readonly buttonSizeProperty: elyObservableProperty<Size>
        = new elyObservableProperty<Size>(Size.default);

    /**
     * Конструктор
     * @param {efButtonOptions} options
     */
    public constructor(options: efButtonOptions = {}) {
        super(options);
        this.addClass("button");

        this.textProperty.change(value => {
            this.getDocument().innerHTML = efTextView.filterString(value);
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

        this.buttonStyle(Style.primary);

        if (elyGuard.isSet(options.buttonSize)) this.buttonSize(options.buttonSize!);
        if (elyGuard.isSet(options.buttonStyle)) this.buttonStyle(options.buttonStyle!);
        if (elyGuard.isSet(options.buttonRounded)) this.buttonRounded(options.buttonRounded!);
        if (elyGuard.isSet(options.click)) this.click(() => {
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
    public buttonSize(value: Size | string): efButton;

    /**
     * Возвращает и устанавливает размер кнопки
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    public buttonSize(value?: Size | string): Size | null | efButton {
        if (value !== undefined && typeof value === "string") value = Size.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.buttonSizeProperty);
    }

    /**
     * Устанавливает размер кнопки во весь блок.
     * Алиас выражения `efButton.buttonSize(Size.fill)`.
     * @return {this}
     */
    public fill(): efButton {
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
    public buttonStyle(value: Style | string): efButton;

    /**
     * Возвращает и устанавливает стиль кнопки
     * @param {Style|string} [value] - значение
     * @returns {Style|this|null}
     */
    public buttonStyle(value?: Style | string): Style | null | efButton {
        if (value !== undefined && typeof value === "string") value = Style.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.buttonStyleProperty);
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
    public text(value: string): efButton;

    /**
     * Возвращает и устанавливает текст на кнопке
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public text(value?: string): string | null | efButton {
        return elyObservableProperty.simplePropertyAccess(this, value, this.textProperty);
    }

    /**
     * Устанавливает слушатель нажатия или нажимает на кнопку
     *
     * @param {Function} [callback = null]
     * @returns {efButton}
     */
    public click(callback?: () => void): efButton {
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
    public buttonRounded(value: boolean): efButton;

    /**
     * Возвращает и устанавливает флаг закругления углов кнопки
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public buttonRounded(value?: boolean): boolean | null | efButton {
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
        return JSON.stringify({
            buttonRounded: this.buttonRounded(),
            buttonSize: this.buttonSize().value,
            buttonStyle: this.buttonStyle().value,
            text: this.text(),
        });
    }
}

/**
 * @typedef {Object} efButtonOptions
 * @property {String} [text = ""]
 * @property {Size|String} [buttonSize]
 * @property {Style|String} [buttonStyle]
 * @property {boolean} [buttonRounded = false]
 * @property {boolean} [fill = false]
 * @property {function()} [click]
 */
