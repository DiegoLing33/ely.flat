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
 + Файл: PreloaderViews                                                   +
 + Файл изменен: 15.02.2019 01:13:20                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View, {ViewOptions} from "../../core/controls/View";
import Style from "../../enums/Style";
import Control from "../action/Control";
import IconView from "../text/IconView";
import TextView from "../text/TextView";

/**
 * Опции {@link PreloaderView}
 */
export interface PreloaderViewOptions extends ViewOptions {
    fixedPosition?: boolean;
    title?: string;
    preloaderStyle?: Style;
}

/**
 * Элемент отображения
 * @class PreloaderView
 * @augments {View}
 */
export default class PreloaderView extends View {

    /**
     * Панель объединения
     * @protected
     * @ignore
     */
    protected readonly __wrapperView: Control = new Control({class: "--wrapper"});

    /**
     * Иконка
     * @protected
     * @ignore
     */
    protected __iconView: IconView = new IconView({iconName: "refresh", spinning: true});

    /**
     * Элемент отображения текста
     * @protected
     * @ignore
     */
    protected __titleTextView: TextView = new TextView({class: "--title"});

    /**
     * Свойство: стиль загрузчика
     * @ignore
     * @protected
     */
    protected readonly __preloaderStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>(Style.primary).change((value, oldVal) => {
        if (oldVal) this.removeClass(`--${oldVal.value}`);
        this.addClass(`--${value.value}`);
    });

    /**
     * Конструктор
     * @param {PreloaderViewOptions} options - опции
     */
    public constructor(options: PreloaderViewOptions = {}) {
        super(options);
        if (!options.selector) {
            this.addClass("ef-loading");
            this.getDocument().append(this.getWrapperView().getDocument());
            this.getWrapperView()
                .addSubView(this.getIconView())
                .addSubView(this.getTitleTextView());
            this.title(options.title || "Пожалуйста, подождите...");

            Guard.variable<boolean>(options.fixedPosition, value => this.fixedPosition(value));
            Guard.variable<Style>(options.preloaderStyle, value => this.preloaderStyle(value));
        }
    }

    /**
     * Возвращает элемент объекдинения
     * @return {Control}
     */
    public getWrapperView(): Control {
        return this.__wrapperView;
    }

    /**
     * Возвращает элемент отображения иконки
     * @return {IconView}
     */
    public getIconView(): IconView {
        return this.__iconView;
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    public getTitleTextView(): TextView {
        return this.__titleTextView;
    }

    /**
     * Возвращает текст загрузки
     * @return {string}
     */
    public title(): string;

    /**
     * Устанавливает текст загрузки
     * @param {string} value - значение
     * @return {this}
     */
    public title(value: string): PreloaderView;

    /**
     * Возвращает и устанавливает текст загрузки
     * @param {string} [value] - значение
     * @returns {string|this}
     */
    public title(value?: string): string | PreloaderView {
        if (value === undefined) return this.getTitleTextView().text();
        this.getTitleTextView().text(value);
        return this;
    }

    /**
     * Возвращает стиль загрузчика
     * @returns {Style}
     */
    public preloaderStyle(): Style;

    /**
     * Устанавливает стиль загрузчика
     * @param {Style} value - значение
     * @returns {this}
     */
    public preloaderStyle(value: Style): PreloaderView;

    /**
     * Возвращает и устанавливает стиль загрузчика
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public preloaderStyle(value?: Style): Style | null | PreloaderView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__preloaderStyleProperty);
    }

    /**
     * Возвращает флаг фиксированной позиции
     * @return {boolean}
     */
    public fixedPosition(): boolean;

    /**
     * Устанавливает флаг фиксированной позиции
     * @param {boolean} value - значение
     * @return {this}
     */
    public fixedPosition(value: boolean): PreloaderView;

    /**
     * Возвращает и устанавливает флаг фиксированной позиции
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public fixedPosition(value?: boolean): boolean | null | PreloaderView {
        if (value === undefined) return this.hasClass("--fixed");
        if (value) this.addClass("--fixed");
        else this.removeClass("--fixed");
        return this;
    }

}

/**
 * @typedef {Object} PreloaderViewOptions
 * @property {boolean} [fixedPosition = false]
 * @property {string} [title = false]
 * @property {Style} [preloaderStyle]
 */
