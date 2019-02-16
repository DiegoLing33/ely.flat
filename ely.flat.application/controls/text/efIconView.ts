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
 + Файл: efIconView.ts                                                        +
 + Файл изменен: 08.02.2019 00:19:40                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import Size from "@enums/Size";
import Style from "@enums/Style";
import Weight from "@enums/Weight";
import efSerializableProtocol from "@protocols/efSerializableProtocol";

/**
 * Опции отображения иконки {@link efIconView}
 */
export interface efIconViewOptions extends elyViewOptions {
    iconName?: string;
    iconStyle?: Style;
    iconSize?: Size;
    iconWeight?: Weight;
    spinning?: boolean;
}

/**
 * Элемент отображения иконки
 * @class efIconView
 * @augments {elyView}
 */
export class efIconView extends elyView implements efSerializableProtocol<efIconView> {

    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {efIconView}
     */
    public static deserialize<T>(raw: string): efIconView | null {
        return new efIconView(JSON.parse(raw));
    }

    /**
     * Свойство: размер иконки
     * @ignore
     * @protected
     */
    protected readonly __iconSizeProperty: elyObservableProperty<Size>
        = new elyObservableProperty<Size>().change((value, oldVal) => {
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
    protected readonly __iconWeightProperty: elyObservableProperty<Weight>
        = new elyObservableProperty<Weight>().change((value, oldVal) => {
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
    protected readonly __iconStyleProperty: elyObservableProperty<Style>
        = new elyObservableProperty<Style>().change((value, oldVal) => {
        if (oldVal) this.removeClass(`--${oldVal.value}`);
        this.addClass(`--${value.value}`);
    });

    /**
     * Свойство: имя иконки
     * @ignore
     * @protected
     */
    protected readonly __iconNameProperty: elyObservableProperty<string>
        = new elyObservableProperty<string>().change((value, oldVal) => {
        if (oldVal) this.removeClass(`fa-${oldVal}`);
        this.addClass(`fa-${value}`);
    });

    /**
     * Конструткор
     * @param {efIconViewOptions} options
     */
    public constructor(options: efIconViewOptions) {
        super({tag: "span", ...options});
        this.addClass("ef-icon");
        this.addClass("fa");
        this.iconName(options.iconName || "refresh");
        if (elyGuard.isSet(options.iconSize)) this.iconSize(options.iconSize!);
        if (elyGuard.isSet(options.iconStyle)) this.iconStyle(options.iconStyle!);
        if (elyGuard.isSet(options.iconWeight)) this.iconWeight(options.iconWeight!);
        if (elyGuard.isSet(options.spinning)) this.spinning(options.spinning!);
    }

    /**
     * Возвращает свойство: имя иконки
     * @return {elyObservableProperty<string>}
     */
    public getIconNameProperty(): elyObservableProperty<string> {
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
    public iconName(value: string): efIconView;

    /**
     * Возвращает и устанавливает имя иконки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public iconName(value?: string): string | null | efIconView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__iconNameProperty);
    }

    /**
     * Возвращает свойство: размер иконки
     * @return {elyObservableProperty<Size>}
     */
    public getIconSizeProperty(): elyObservableProperty<Size> {
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
    public iconSize(value: Size): efIconView;

    /**
     * Возвращает и устанавливает размер иконки
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    public iconSize(value?: Size): Size | null | efIconView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__iconSizeProperty);
    }

    /**
     * Возвращает свойство: толщина иконки
     * @return {elyObservableProperty<Weight>}
     */
    public getIconWeightProperty(): elyObservableProperty<Weight> {
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
    public iconWeight(value: Weight): efIconView;

    /**
     * Возвращает и устанавливает толщина иконки
     * @param {Weight} [value] - значение
     * @returns {Weight|this|null}
     */
    public iconWeight(value?: Weight): Weight | null | efIconView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__iconWeightProperty);
    }

    /**
     * Возвращает свойство: стиль иконки
     * @return {elyObservableProperty<Style>}
     */
    public geticonStyleProperty(): elyObservableProperty<Style> {
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
    public iconStyle(value: Style): efIconView;

    /**
     * Возвращает и устанавливает стиль иконки
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public iconStyle(value?: Style): Style | null | efIconView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__iconStyleProperty);
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
    public spinning(value: boolean): efIconView;

    /**
     * Возвращает и устанавливает флаг анимации вращения элемента
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public spinning(value?: boolean): boolean | null | efIconView {
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
 * @typedef {Object} efIconViewOptions
 * @property {string} [iconName]
 * @property {Size|string|number} [iconSize]
 * @property {Weight|string|number} [iconWeight]
 * @property {Style|string|number} [iconStyle]
 */
