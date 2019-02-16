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
 + Файл: efPreloaderView.ts                                                   +
 + Файл изменен: 15.02.2019 01:13:20                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {efIconView} from "@controls/text/efIconView";
import {efTextView} from "@controls/text/efTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import Style from "@enums/Style";

/**
 * Опции {@link efPreloaderView}
 */
export interface efPreloaderViewOptions extends elyViewOptions {
    fixedPosition?: boolean;
    title?: string;
    preloaderStyle?: Style;
}

/**
 * Элемент отображения
 * @class efPreloaderView
 * @augments {elyView}
 */
export class efPreloaderView extends elyView {

    /**
     * Панель объединения
     * @protected
     * @ignore
     */
    protected readonly __wrapperView: elyControl = new elyControl({class: "--wrapper"});

    /**
     * Иконка
     * @protected
     * @ignore
     */
    protected __iconView: efIconView = new efIconView({iconName: "refresh", spinning: true});

    /**
     * Элемент отображения текста
     * @protected
     * @ignore
     */
    protected __titleTextView: efTextView = new efTextView({class: "--title"});

    /**
     * Свойство: стиль загрузчика
     * @ignore
     * @protected
     */
    protected readonly __preloaderStyleProperty: elyObservableProperty<Style>
        = new elyObservableProperty<Style>(Style.primary).change((value, oldVal) => {
        if (oldVal) this.removeClass(`--${oldVal.value}`);
        this.addClass(`--${value.value}`);
    });

    /**
     * Конструктор
     * @param {efPreloaderViewOptions} options - опции
     */
    public constructor(options: efPreloaderViewOptions = {}) {
        super(options);
        if (!options.selector) {
            this.addClass("ef-loading");
            this.getDocument().append(this.getWrapperView().getDocument());
            this.getWrapperView()
                .addSubView(this.getIconView())
                .addSubView(this.getTitleTextView());
            this.title(options.title || "Пожалуйста, подождите...");

            elyGuard.variable<boolean>(options.fixedPosition, value => this.fixedPosition(value));
            elyGuard.variable<Style>(options.preloaderStyle, value => this.preloaderStyle(value));
        }
    }

    /**
     * Возвращает элемент объекдинения
     * @return {elyControl}
     */
    public getWrapperView(): elyControl {
        return this.__wrapperView;
    }

    /**
     * Возвращает элемент отображения иконки
     * @return {efIconView}
     */
    public getIconView(): efIconView {
        return this.__iconView;
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {efTextView}
     */
    public getTitleTextView(): efTextView {
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
    public title(value: string): efPreloaderView;

    /**
     * Возвращает и устанавливает текст загрузки
     * @param {string} [value] - значение
     * @returns {string|this}
     */
    public title(value?: string): string | efPreloaderView {
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
    public preloaderStyle(value: Style): efPreloaderView;

    /**
     * Возвращает и устанавливает стиль загрузчика
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public preloaderStyle(value?: Style): Style | null | efPreloaderView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__preloaderStyleProperty);
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
    public fixedPosition(value: boolean): efPreloaderView;

    /**
     * Возвращает и устанавливает флаг фиксированной позиции
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public fixedPosition(value?: boolean): boolean | null | efPreloaderView {
        if (value === undefined) return this.hasClass("--fixed");
        if (value) this.addClass("--fixed");
        else this.removeClass("--fixed");
        return this;
    }

}

/**
 * @typedef {Object} efPreloaderViewOptions
 * @property {boolean} [fixedPosition = false]
 * @property {string} [title = false]
 * @property {Style} [preloaderStyle]
 */
