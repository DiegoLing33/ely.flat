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
 + Файл: PanelView.ts                                                         +
 + Файл изменен: 09.02.2019 16:11:48                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import GridLayoutView from "@controls/layout/GridLayoutView";
import TextViewContainer from "@controls/text/TextViewContainer";
import View, {ViewOptions} from "@core/controls/View";
import {variable} from "@core/Guard";

/**
 * Опции {@link PanelView}
 */
export interface PanelViewOptions extends ViewOptions {
    panelTitle?: string;
    panelActionText?: string;
    panelHover?: boolean;
    panelActionClick?: () => void;
    panelContainer?: GridLayoutView;
}

/**
 * Элемент отображения панель
 */
export default class PanelView extends View {

    /**
     * Элемен отображения заголовка
     * @protected
     * @ignore
     */
    protected readonly __headerView: TextViewContainer = new TextViewContainer({class: "--header"});

    /**
     * Элемен отображения контента
     * @protected
     * @ignore
     */
    protected __contentView: GridLayoutView = new GridLayoutView({class: "--content"});

    /**
     * Элемен отображения подвала
     * @protected
     * @ignore
     */
    protected readonly __footerView: TextViewContainer = new TextViewContainer({class: "--footer"});

    /**
     * Конструктор
     * @param {PanelViewOptions} options
     */
    public constructor(options: PanelViewOptions = {}) {
        super(options);
        this.addClass("ef-panel");

        if (options.panelContainer)
            this.__contentView = options.panelContainer.addClass("--content") as any;

        this.panelHover(true);
        variable<string>(options.panelTitle, (v) => this.panelTitle(v));
        variable<boolean>(options.panelHover, (v) => this.panelHover(v));
        variable<string>(options.panelActionText, (v) => this.panelActionText(v));
        variable<() => void>(options.panelActionClick, (v) => this.panelActionClick(v));
        this.rebuild();
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {TextViewContainer}
     */
    public getHeaderView(): TextViewContainer {
        return this.__headerView;
    }

    /**
     * Возвращает элемент отображения подвала
     * @return {TextViewContainer}
     */
    public getFooterView(): TextViewContainer {
        return this.__footerView;
    }

    /**
     * Возвращает элемент отображения контента
     * @return {GridLayoutView}
     */
    public getContentView(): GridLayoutView {
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
    public panelHover(value: boolean): PanelView;

    /**
     * Возвращает и устанавливает флаг изменения палени при наведении на неё
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public panelHover(value?: boolean): boolean | null | PanelView {
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
    public panelActionText(value: string): PanelView;

    /**
     * Возвращает и устанавливает текст активации
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public panelActionText(value?: string): string | null | PanelView {
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
    public panelTitle(value: string): PanelView;

    /**
     * Возвращает и устанавливает текст заголовка панели
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public panelTitle(value?: string): string | null | PanelView {
        if (value === undefined) return this.getHeaderView().getTextView().text();
        this.getHeaderView().getTextView().text(value);
        this.rebuild();
        return this;
    }

    /**
     * Выполняет перестроение панели
     */
    public rebuild(): PanelView {
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
    public panelActionClick(callbackfn: () => void): PanelView {
        this.getFooterView().addObserver("click", callbackfn);
        return this;
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        return {
            ...super.serialize(),
            panelActionText: this.panelActionText(),
            panelContainer: this.getContentView().serialize(),
            panelHover: this.panelHover(),
            panelTitle: this.panelTitle(),
        };
    }
}

/**
 * @typedef {Object} PanelViewOptions - Опции панели
 * @property {string} [panelTitle]
 * @property {string} [panelActionText]
 * @property {boolean} [panelHover = true]
 * @property {function()} [panelActionClick]
 */
