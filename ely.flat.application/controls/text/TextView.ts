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
 + Файл: TextView.ts                                                      +
 + Файл изменен: 08.02.2019 00:09:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import View, {ViewOptions} from "@core/controls/View";
import {variable} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";
import Size from "@enums/Size";
import Style from "@enums/Style";
import Weight from "@enums/Weight";
import efSerializableProtocol from "@protocols/efSerializableProtocol";

/**
 * Опции {@link TextView}
 */
export interface TextViewOptions extends ViewOptions {
    text?: string;
    textStyle?: Style;
    textSize?: Size;
    textWeight?: Weight;
    textCenter?: boolean;
}

/**
 * Элемент отображения текста
 * @class TextView
 * @augments {View}
 *
 * Мета коды строк:
 *
 * - \*Text\* - Толстый текст.
 * - (link: http://dlgs.ru){Some text} - Добавляет контекстную ссылку.
 * - (action: content(index)){Some text} - Добавляет контекстный elyOneAction.
 * - {nl} - Перенос строки
 */
export default class TextView extends View implements efSerializableProtocol<TextView> {

    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {TextView}
     */
    public static deserialize<T>(raw: string): TextView | null {
        return new TextView(JSON.parse(raw));
    }

    /**
     * Фильтрует строку
     * @param {string} str
     * @return {string}
     */
    public static filterString(str: string): string {
        return str.replace(/\*([^*]+)\*/g, "<b>$1</b>")
            .replace(/\(link:([^)]+)\){([^}]+)}/g, "<a href='$1'>$2</a>")
            .replace(/\(action:([^{]+)\){([^}]+)}/g, "<a href='#' onclick='ely.oneAction.go(\"$1\")'>$2</a>")
            .replace(/{nl}/g, "<br>");
    }

    /**
     * Свойство: стиль текста
     * @ignore
     * @protected
     */
    protected readonly __textStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>().change((value, oldVal) => {
        if (oldVal) this.removeClass(`--${oldVal.value}`);
        this.addClass(`--${value.value}`);
    });

    /**
     * Свойство: размер текста
     * @ignore
     * @protected
     */
    protected readonly __textSizeProperty: ObservableProperty<Size>
        = new ObservableProperty<Size>().change((value, oldVal) => {
        this.getStyle().fontSize = null;
        if (oldVal && !oldVal.custom) this.removeClass(`--${oldVal.value}`);
        if (value.custom) {
            this.getStyle().fontSize = value.value;
        } else {
            this.addClass(`--${value.value}`);
        }
    });

    /**
     * Свойство: толщина текста
     * @ignore
     * @protected
     */
    protected readonly __textWeightProperty: ObservableProperty<Weight>
        = new ObservableProperty<Weight>().change((value, oldVal) => {
        this.getStyle().fontWeight = null;
        if (oldVal && !oldVal.custom) this.removeClass(`--${oldVal.value}`);
        if (value.custom) {
            this.getStyle().fontSize = value.value;
        } else {
            this.addClass(`--${value.value}`);
        }
    });

    /**
     * Свойство: текст элемента
     * @ignore
     * @protected
     */
    protected readonly __textProperty: ObservableProperty<string>
        = new ObservableProperty<string>().change(value => {
        this.getDocument().innerHTML = TextView.filterString(value);
    });

    /**
     * Конструктор
     * @param {TextViewOptions} options - опции
     */
    public constructor(options: TextViewOptions = {}) {
        super({tag: "span", ...options});
        this.addClass("ef-text");
        this.text(options.text || "");
        variable<Size>(options.textSize, value => this.textSize(value));
        variable<Style>(options.textStyle, value => this.textStyle(value));
        variable<Weight>(options.textWeight, value => this.textWeight(value));
        variable<boolean>(options.textCenter, value => this.textCenter(value));
    }

    /**
     * Возвращает свойство: стиль текста
     * @return {ObservableProperty<Style>}
     */
    public getTextStyleProperty(): ObservableProperty<Style> {
        return this.__textStyleProperty;
    }

    /**
     * Возвращает стиль текста
     * @returns {Style}
     */
    public textStyle(): Style;

    /**
     * Устанавливает стиль текста
     * @param {Style} value - значение
     * @returns {this}
     */
    public textStyle(value: Style): TextView;

    /**
     * Возвращает и устанавливает стиль текста
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public textStyle(value?: Style): Style | null | TextView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textStyleProperty);
    }

    /**
     * Возвращает свойство: размер текста
     * @return {ObservableProperty<Size>}
     */
    public getTextSizeProperty(): ObservableProperty<Size> {
        return this.__textSizeProperty;
    }

    /**
     * Возвращает размер текста
     * @returns {Size}
     */
    public textSize(): Size;

    /**
     * Устанавливает размер текста
     * @param {Size} value - значение
     * @returns {this}
     */
    public textSize(value: Size): TextView;

    /**
     * Возвращает и устанавливает размер текста
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    public textSize(value?: Size): Size | null | TextView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textSizeProperty);
    }

    /**
     * Возвращает свойство: текст элемента
     * @return {ObservableProperty<string>}
     */
    public getTextProperty(): ObservableProperty<string> {
        return this.__textProperty;
    }

    /**
     * Возвращает текст элемента
     * @returns {string}
     */
    public text(): string;

    /**
     * Устанавливает текст элемента
     * @param {string} value - значение
     * @returns {this}
     */
    public text(value: string): TextView;

    /**
     * Возвращает и устанавливает текст элемента
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public text(value?: string): string | null | TextView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textProperty);
    }

    /**
     * Возвращает флаг выравнивания текста по центру
     * @return {boolean}
     */
    public textCenter(): boolean;

    /**
     * Устанавливает флаг выравнивания текста по центру
     * @param {boolean} value - значение
     * @return {this}
     */
    public textCenter(value: boolean): TextView;

    /**
     * Возвращает и устанавливает флаг выравнивания текста по центру
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public textCenter(value?: boolean): boolean | null | TextView {
        if (value === undefined) return this.hasClass("--centered");
        if (value) this.addClass("--centered");
        else this.removeClass("--centered");
        return this;
    }

    /**
     * Возвращает свойство: толщина текста
     * @return {ObservableProperty<Weight>}
     */
    public getTextWeightProperty(): ObservableProperty<Weight> {
        return this.__textWeightProperty;
    }

    /**
     * Возвращает толщина текста
     * @returns {Weight}
     */
    public textWeight(): Weight;

    /**
     * Устанавливает толщина текста
     * @param {Weight} value - значение
     * @returns {this}
     */
    public textWeight(value: Weight): TextView;

    /**
     * Возвращает и устанавливает толщина текста
     * @param {Weight} [value] - значение
     * @returns {Weight|this|null}
     */
    public textWeight(value?: Weight): Weight | null | TextView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textWeightProperty);
    }

    /**
     * Выравнивает текст по середине.
     * Можно считать алиасом выражения `TextView.textCenter(true)`.
     * @return {this}
     */
    public centered(): TextView {
        this.textCenter(true);
        return this;
    }

    /**
     * Сериализует объект
     * @return {string}
     */
    public serialize(): string {
        return JSON.stringify({
            text: this.text(),
            textCenter: this.textCenter(),
            textSize: this.textSize().value,
            textStyle: this.textStyle().value,
            textWeight: this.textWeight().value,
        });
    }

}

/**
 * @typedef {Object} TextViewOptions
 * @property {string} [text = ""]
 * @property {boolean} [textCenter = false]
 * @property {Style|string} [textStyle]
 * @property {Size} [textSize]
 * @property {Weight} [textWeight]
 */
