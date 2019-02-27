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
 + Файл: IconView.ts                                                      +
 + Файл изменен: 08.02.2019 00:19:40                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import View, {ViewOptions} from "@core/controls/View";
import {variableAndSet} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";
import Size from "@enums/Size";
import Style from "@enums/Style";
import Weight from "@enums/Weight";
import efSerializableProtocol from "@protocols/efSerializableProtocol";

/**
 * Опции отображения иконки {@link IconView}
 */
export interface IconViewOptions extends ViewOptions {
    iconName?: string;
    iconStyle?: Style;
    iconSize?: Size;
    iconWeight?: Weight;
    spinning?: boolean;
}

/**
 * Элемент отображения иконки
 * @class IconView
 * @augments {View}
 */
export default class IconView extends View implements efSerializableProtocol<IconView> {

    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {IconView}
     */
    public static deserialize<T>(raw: string): IconView | null {
        return new IconView(JSON.parse(raw));
    }

    /**
     * Свойство: размер иконки
     * @ignore
     * @protected
     */
    protected readonly __iconSizeProperty: ObservableProperty<Size>
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
     * Свойство: толщина иконки
     * @ignore
     * @protected
     */
    protected readonly __iconWeightProperty: ObservableProperty<Weight>
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
     * Свойство: стиль иконки
     * @ignore
     * @protected
     */
    protected readonly __iconStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>().change((value, oldVal) => {
        if (oldVal) this.removeClass(`--${oldVal.value}`);
        this.addClass(`--${value.value}`);
    });

    /**
     * Свойство: имя иконки
     * @ignore
     * @protected
     */
    protected readonly __iconNameProperty: ObservableProperty<string>
        = new ObservableProperty<string>().change((value, oldVal) => {
        if (oldVal) this.removeClass(`fa-${oldVal}`);
        this.addClass(`fa-${value}`);
    });

    /**
     * Конструткор
     * @param {IconViewOptions} options
     */
    public constructor(options: IconViewOptions) {
        super({tag: "span", ...options});
        this.addClass("ef-icon");
        this.addClass("fa");

        variableAndSet<string>(options.iconName, this.iconName, this, "refresh");
        variableAndSet<Size>(options.iconSize, this.iconSize, this);
        variableAndSet<Style>(options.iconStyle, this.iconStyle, this);
        variableAndSet<Weight>(options.iconWeight, this.iconWeight, this);
        variableAndSet<boolean>(options.spinning, this.spinning, this);
    }

    /**
     * Возвращает свойство: имя иконки
     * @return {ObservableProperty<string>}
     */
    public getIconNameProperty(): ObservableProperty<string> {
        return this.__iconNameProperty;
    }

    /**
     * Возвращает имя иконки
     * @returns {string}
     */
    public iconName(): string;

    /**
     * Устанавливает имя иконки
     * @param {string} value - значение
     * @returns {this}
     */
    public iconName(value: string): IconView;

    /**
     * Возвращает и устанавливает имя иконки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public iconName(value?: string): string | null | IconView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconNameProperty);
    }

    /**
     * Возвращает свойство: размер иконки
     * @return {ObservableProperty<Size>}
     */
    public getIconSizeProperty(): ObservableProperty<Size> {
        return this.__iconSizeProperty;
    }

    /**
     * Возвращает размер иконки
     * @returns {Size}
     */
    public iconSize(): Size;

    /**
     * Устанавливает размер иконки
     * @param {Size} value - значение
     * @returns {this}
     */
    public iconSize(value: Size): IconView;

    /**
     * Возвращает и устанавливает размер иконки
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    public iconSize(value?: Size): Size | null | IconView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconSizeProperty);
    }

    /**
     * Возвращает свойство: толщина иконки
     * @return {ObservableProperty<Weight>}
     */
    public getIconWeightProperty(): ObservableProperty<Weight> {
        return this.__iconWeightProperty;
    }

    /**
     * Возвращает толщину иконки
     * @returns {Weight}
     */
    public iconWeight(): Weight;

    /**
     * Устанавливает толщину иконки
     * @param {Weight} value - значение
     * @returns {this}
     */
    public iconWeight(value: Weight): IconView;

    /**
     * Возвращает и устанавливает толщина иконки
     * @param {Weight} [value] - значение
     * @returns {Weight|this|null}
     */
    public iconWeight(value?: Weight): Weight | null | IconView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconWeightProperty);
    }

    /**
     * Возвращает свойство: стиль иконки
     * @return {ObservableProperty<Style>}
     */
    public geticonStyleProperty(): ObservableProperty<Style> {
        return this.__iconStyleProperty;
    }

    /**
     * Возвращает стиль иконки
     * @returns {Style}
     */
    public iconStyle(): Style;

    /**
     * Устанавливает стиль иконки
     * @param {Style} value - значение
     * @returns {this}
     */
    public iconStyle(value: Style): IconView;

    /**
     * Возвращает и устанавливает стиль иконки
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public iconStyle(value?: Style): Style | null | IconView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconStyleProperty);
    }

    /**
     * Возвращает флаг анимации вращения элемента
     * @return {boolean}
     */
    public spinning(): boolean;

    /**
     * Устанавливает флаг анимации вращения элемента
     * @param {boolean} value - значение
     * @return {this}
     */
    public spinning(value: boolean): IconView;

    /**
     * Возвращает и устанавливает флаг анимации вращения элемента
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public spinning(value?: boolean): boolean | null | IconView {
        if (value === undefined) return this.hasClass("fa-spin");
        if (value) this.addClass("fa-spin");
        this.removeClass("fa-spin");
        return this;
    }

    /**
     * Сериализует объект
     */
    public serialize(): string {
        return JSON.stringify({
            iconName: this.iconName(),
            iconSize: this.iconSize().value,
            iconStyle: this.iconStyle().value,
            iconWeight: this.iconWeight().value,
        });
    }
}

/**
 * @typedef {Object} IconViewOptions
 * @property {string} [iconName]
 * @property {Size|string|number} [iconSize]
 * @property {Weight|string|number} [iconWeight]
 * @property {Style|string|number} [iconStyle]
 */
