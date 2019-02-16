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
 + Файл: efPanelView.ts                                                       +
 + Файл изменен: 09.02.2019 16:11:48                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efGridLayoutView} from "@controls/layout/efGridLayoutView";
import {efTextViewContainer} from "@controls/text/efTextViewContainer";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";

/**
 * Опции {@link efPanelView}
 */
export interface efPanelViewOptions extends elyViewOptions {
    panelTitle?: string;
    panelActionText?: string;
    panelHover?: boolean;
    panelContent?: elyView;
    panelActionClick?: () => void;
}

/**
 * Элемент отображения панель
 */
export class efPanelView extends elyView {

    /**
     * Элемен отображения заголовка
     * @protected
     * @ignore
     */
    protected readonly __headerView: efTextViewContainer = new efTextViewContainer({class: "--header"});

    /**
     * Элемен отображения контента
     * @protected
     * @ignore
     */
    protected readonly __contentView: efGridLayoutView = new efGridLayoutView({class: "--content"});

    /**
     * Элемен отображения подвала
     * @protected
     * @ignore
     */
    protected readonly __footerView: efTextViewContainer = new efTextViewContainer({class: "--footer"});

    /**
     * Конструктор
     * @param {efPanelViewOptions} options
     */
    public constructor(options: efPanelViewOptions = {}) {
        super(options);
        this.addClass("ef-panel");

        this.panelHover(true);
        elyGuard.variable<string>(options.panelTitle, (v) => this.panelTitle(v));
        elyGuard.variable<boolean>(options.panelHover, (v) => this.panelHover(v));
        elyGuard.variable<string>(options.panelActionText, (v) => this.panelActionText(v));
        elyGuard.variable<() => void>(options.panelActionClick, (v) => this.panelActionClick(v));
        elyGuard.variable<elyView>(options.panelContent, (v) => this.getContentView().add(v));
        this.rebuild();
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {efTextViewContainer}
     */
    public getHeaderView(): efTextViewContainer {
        return this.__headerView;
    }

    /**
     * Возвращает элемент отображения подвала
     * @return {efTextViewContainer}
     */
    public getFooterView(): efTextViewContainer {
        return this.__footerView;
    }

    /**
     * Возвращает элемент отображения контента
     * @return {efGridLayoutView}
     */
    public getContentView(): efGridLayoutView {
        return this.__contentView;
    }

    /**
     * Возвращает флаг изменения палени при наведении на неё
     * @return {boolean}
     */
    public panelHover(): boolean;

    /**
     * Устанавливает флаг изменения палени при наведении на неё
     * @param {boolean} value - значение
     * @return {this}
     */
    public panelHover(value: boolean): efPanelView;

    /**
     * Возвращает и устанавливает флаг изменения палени при наведении на неё
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public panelHover(value?: boolean): boolean | null | efPanelView {
        if (value === undefined) return this.hasClass("--hover");
        if (value) this.addClass("--hover");
        else this.removeClass("--hover");
        return this;
    }

    /**
     * Возвращает текст активации
     * @return {string}
     */
    public panelActionText(): string;

    /**
     * Устанавливает текст активации
     * @param {string} value - значение
     * @return {this}
     */
    public panelActionText(value: string): efPanelView;

    /**
     * Возвращает и устанавливает текст активации
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public panelActionText(value?: string): string | null | efPanelView {
        if (value === undefined) return this.getFooterView().getTextView().text();
        this.getFooterView().getTextView().text(value);
        this.rebuild();
        return this;
    }

    /**
     * Возвращает текст заголовка панели
     * @return {string}
     */
    public panelTitle(): string;

    /**
     * Устанавливает текст заголовка панели
     * @param {string} value - значение
     * @return {this}
     */
    public panelTitle(value: string): efPanelView;

    /**
     * Возвращает и устанавливает текст заголовка панели
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public panelTitle(value?: string): string | null | efPanelView {
        if (value === undefined) return this.getHeaderView().getTextView().text();
        this.getHeaderView().getTextView().text(value);
        this.rebuild();
        return this;
    }

    /**
     * Выполняет перестроение панели
     */
    public rebuild(): efPanelView {
        this.removeViewContent();
        if (this.panelTitle() !== "")
            this.getDocument().append(this.getHeaderView().getDocument());
        this.getDocument().append(this.getContentView().getDocument());
        if (this.panelActionText() !== "")
            this.getDocument().append(this.getFooterView().getDocument());
        return this;
    }

    /**
     * Добавляет слушатель нажатия на функциональную клавишу
     * @param {function()} callbackfn
     */
    public panelActionClick(callbackfn: () => void): efPanelView {
        this.getFooterView().addObserver("click", callbackfn);
        return this;
    }

}

/**
 * @typedef {Object} efPanelViewOptions - Опции панели
 * @property {string} [panelTitle]
 * @property {string} [panelActionText]
 * @property {boolean} [panelHover = true]
 * @property {elyView} [panelContent]
 * @property {function()} [panelActionClick]
 */
