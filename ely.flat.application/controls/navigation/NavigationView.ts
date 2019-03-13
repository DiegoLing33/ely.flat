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
 + Файл: NavigationView.ts                                                    +
 + Файл изменен: 07.02.2019 23:43:35                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Control from "@controls/action/Control";
import ListView, {ListViewOptions} from "@controls/list/ListView";
import NavigationViewProgressBar from "@controls/navigation/NavigationViewProgressBar";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import IconView from "@controls/text/IconView";
import TextView from "@controls/text/TextView";
import ImageView from "@controls/view/ImageView";

/**
 * Опции {@link NavigationView}
 */
export interface NavigationViewOptions extends ListViewOptions {

    /**
     * Горизонтальное расположение меню
     */
    horizontal: boolean;

    /**
     * Фиксированное расположение
     */
    fixed: boolean;
}

/**
 * Элемент отображения - панель навигации
 * @class NavigationView
 * @augments {elyRebuildableViewProtocol}
 */
export default class NavigationView extends ListView {

    /**
     * Изображение
     * @protected
     * @ignore
     */
    protected __imageView: ImageView | null = null;

    /**
     * Элемент отображения заголовка
     * @protected
     * @ignore
     */
    protected readonly __titleTextView: TextView = new TextView({tag: "li"});

    /**
     * Элемент отображения иконки-переключателя
     * @protected
     * @ignore
     */
    protected readonly __toggleIconView: IconView = new IconView({tag: "li", iconName: "navicon"});

    /**
     * Элемент загрузки
     * @protected
     * @ignore
     */
    protected readonly __progressView: NavigationViewProgressBar
        = new NavigationViewProgressBar();

    /**
     * Конструктор
     * @param {NavigationViewOptions} options
     */
    public constructor(options: NavigationViewOptions = {horizontal: true, fixed: false}) {
        super(options);
        this.__denyRebuild = false;
        this.addClass("ef-navigation");

        this.fixed(options.fixed || false);
        this.horizontal(options.horizontal);

        this.getTitleView().addClass("--item", "logo");
        this.getToggleIconView().addClass("--toggle");

        this.getToggleIconView().addObserver("click", () => {
            if (this.hasClass("--open")) this.removeClass("--open");
            else this.addClass("--open");
        });

        this.rebuild();
    }

    /**
     * Изображение
     * @return {ImageView}
     */
    public getImageView(): ImageView | null {
        return this.__imageView;
    }

    /**
     * Возвращает путь до изображения в навигации
     * @return {string}
     */
    public imageUrl(): string;

    /**
     * Устанавливает путь до изображения в навигации
     * @param {string} value - значение
     * @return {this}
     */
    public imageUrl(value: string): NavigationView;

    /**
     * Возвращает и устанавливает путь до изображения в навигации
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public imageUrl(value?: string): string | null | NavigationView {
        if (value === undefined) {
            return this.getImageView() ? this.getImageView()!.url() : null;
        }
        if (value) {
            this.__imageView = new ImageView({url: value});
        } else {
            this.__imageView = null;
        }
        return this.rebuild();
    }

    /**
     * Возвращает панель прогресса в панели навигации
     * @return {NavigationViewProgressBar|ProgressBarView}
     */
    public getProgressView(): NavigationViewProgressBar {
        return this.__progressView;
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    public getTitleView(): TextView {
        return this.__titleTextView;
    }

    /**
     * Возвращает иконку-переключатель
     */
    public getToggleIconView(): IconView {
        return this.__toggleIconView;
    }

    /**
     * Возвращает фиксирование меню
     * @return {boolean}
     */
    public fixed(): boolean;

    /**
     * Устанавливает фиксирование меню
     * @param {boolean} value - значение
     * @return {this}
     */
    public fixed(value: boolean): NavigationView;

    /**
     * Возвращает и устанавливает
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public fixed(value?: boolean): boolean | null | NavigationView {
        if (value === undefined) return this.hasClass("--fixed");
        if (value) this.addClass("--fixed");
        else this.removeClass("--fixed");
        return this;
    }

    /**
     * Возвращает горизонтальное расположение
     * @return {boolean}
     */
    public horizontal(): boolean;

    /**
     * Устанавливает горизонтальное расположение
     * @param {boolean} value - значение
     * @return {this}
     */
    public horizontal(value: boolean): NavigationView;

    /**
     * Возвращает и устанавливает горизонтальное расположение
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public horizontal(value?: boolean): boolean | null | NavigationView {
        if (value === undefined) return this.hasClass("--horizontal");
        if (value) this.addClass("--horizontal");
        else this.removeClass("--horizontal");
        return this;
    }

    /**
     * Выполняет перестроение элемента
     *
     * Метод для переопределения реализации престроения
     * @private
     * @ignore
     */
    protected __rebuild(): NavigationView {
        this.removeViewContent();
        this.getDocument().append(this.getToggleIconView().getDocument());
        if (this.getImageView()) {
            const view = new Control({tag: "li", class: "--item"});
            view.addClass("--image");
            view.getDocument().append(this.getImageView()!.getDocument());
            this.getDocument().append(view.getDocument());
        }
        this.getDocument().append(this.getTitleView().getDocument());
        this.getItems().forEach(item => {
            const view = new Control({tag: "li", class: "--item"});
            view.addSubView(item);
            this.notificate("itemWillAdd", [item, view]);
            this.getDocument().append(view.getDocument());
        });
        this.getDocument().append(this.getProgressView().getDocument());

        return this;
    }

}

/**
 * @typedef {Object} NavigationViewOptions
 * @property {boolean} [horizontal = true]
 * @property {boolean} [fixed = false]
 */
