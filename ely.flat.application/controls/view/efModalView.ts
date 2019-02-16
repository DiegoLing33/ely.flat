/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: efModalView.ts                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efApplication from "@app/app/efApplication";
import elyControl from "@controls/action/elyControl";
import {efIconView} from "@controls/text/efIconView";
import {efTextView} from "@controls/text/efTextView";
import {efTextViewContainer} from "@controls/text/efTextViewContainer";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import Style from "@enums/Style";

/**
 * Опции {@link efModalView}
 */
export interface efModalViewOptions extends elyViewOptions {

    /**
     * Заголовок модального окна
     */
    title?: string;

    /**
     * Содержимое
     */
    content?: elyView;

    /**
     * Возможность скрытия
     */
    closable?: boolean;

    /**
     * Стиль модального окна
     */
    modalStyle?: Style;
}

/**w
 * Элемент отображения: Модальное окно
 * @version 1.0
 * @class efModalView
 * @augments {elyView}
 */
export class efModalView extends elyView {

    /**
     * Текущее окно
     * @type {efModalView|null}
     */
    public static currentModal: efModalView | null = null;

    /**
     * Очередь из объектов
     * @protected
     * @type {efModalView[]}
     */
    protected static queue: efModalView[] = [];

    /**
     * Открывает следующее модальное окно из стэка
     * @protected
     * @static
     */
    protected static next(): void {
        if (efModalView.queue.length > 0 && efModalView.currentModal === null) {
            efModalView.currentModal = efModalView.queue.pop()!;
            efApplication.default.getApplicationDocument().getBody().addSubView(efModalView.currentModal);
            efModalView.currentModal.fadeIn();
        }
    }

    /**
     * Элемент модального окна
     * @readonly
     * @type {elyControl}
     */
    protected readonly __containerView: elyControl
        = new elyControl({class: "ef-modal-container"});

    /**
     * Кнопка закрытия
     * @type {efIconView}
     * @readonly
     */
    protected readonly __closeButtonView: efIconView
        = new efIconView({iconName: "close", class: "close"});

    /**
     * Элемент заголовка
     * @readonly
     * @type {efTextViewContainer}
     */
    protected readonly __titleTextContainerView: efTextViewContainer
        = new efTextViewContainer({class: "title"});

    /**
     * Элемент контента
     * @type {elyView}
     * @readonly
     * @protected
     */
    protected readonly __modalContentView: elyView
        = new elyControl({class: "content"});

    /**
     * Свойство: стиль модального окна
     * @ignore
     * @protected
     */
    protected readonly __modalStyleProperty: elyObservableProperty<Style>
        = new elyObservableProperty<Style>(Style.primary).change((value, oldVal) => {
        if (oldVal) this.getTitleTextContainerView().removeClass(`bg-${oldVal.value}`);
        this.getTitleTextContainerView().addClass(`bg-${value.value}`);
    });

    /**
     * Свойство: флаг возможности закрытия окна
     * @ignore
     * @protected
     */
    protected readonly __modalClosableProperty: elyObservableProperty<boolean>
        = new elyObservableProperty<boolean>(true).change(value => {
        this.getCloseButtonView().hidden(!value);
    });

    /**
     * Свойство: элемент - содержимое модального окна
     * @ignore
     * @protected
     */
    protected readonly __modalContentProperty: elyObservableProperty<elyView>
        = new elyObservableProperty<elyView>(elyControl.empty()).change((newValue) => {
        this.getContentView().removeViewContent();
        this.getContentView().getDocument().append(newValue.getDocument());
    });

    /**
     * Конструктор
     * @param {efModalViewOptions} options - опции
     */
    public constructor(options: efModalViewOptions = {}) {
        super(options);
        this.addClass("ef-modal");

        this.getCloseButtonView().addObserver("click", () => this.dismiss());

        this.getTitleTextContainerView().getDocument().append(this.getCloseButtonView().getDocument());
        this.getContainerView().addSubView(this.getTitleTextContainerView());
        this.getContainerView().addSubView(this.getContentView());
        this.getDocument().append(this.getContainerView().getDocument());

        // Set
        this.title(options.title || "Modal");
        this.content(options.content || elyControl.empty());

        this.modalStyle(Style.byName("default"));
        this.closable(true);

        elyGuard.variable<boolean>(options.closable, value => this.closable(value));
        elyGuard.variable<Style>(options.modalStyle, value => this.modalStyle(value));
    }

    /**
     * Отображает модальное окно
     * @return
     */
    public present(): void {
        this.notificate("present", [this]);
        efModalView.queue.push(this);
        efModalView.next();
    }

    /**
     * Скрывает модальное окно
     * @param {boolean} [force = false]
     * @return
     *
     * Модальное окно может быть "незакрываемым", тогда
     * удалить его можно только используя параметр `force`.
     *
     *
     *     myModal.dismiss(true); // Force dismiss modal
     *
     *
     */
    public dismiss(force: boolean = false): void {
        if (this.closable() || force) {
            this.notificate("dismiss", [this]);
            this.fadeOut(() => {
                efApplication.default.getApplicationDocument().getBody().removeSubView(this);
                efModalView.currentModal = null;
                efModalView.next();
            });
        }
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {efTextView}
     */
    public getTitleTextContainerView(): efTextViewContainer {
        return this.__titleTextContainerView;
    }

    /**
     * Возвращает элемент отображения содержимого модального окна
     * @return {elyView}
     */
    public getContentView(): elyView {
        return this.__modalContentView;
    }

    /**
     * Возвращает элемент отображения - контейнер модального окна
     * @return {elyControl}
     */
    public getContainerView(): elyControl {
        return this.__containerView;
    }

    /**
     * Возвращает элемент отображения иконки закрытия модального окна
     * @return {efIconView}
     */
    public getCloseButtonView(): efIconView {
        return this.__closeButtonView;
    }

    /**
     * Возвращает заголовок модального окна
     * @return {string}
     */
    public title(): string;

    /**
     * Устанавливает заголовок модального окна
     * @param {string} value - значение
     * @return {this}
     */
    public title(value: string): efModalView;

    /**
     * Возвращает и устанавливает заголовок модального окна
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public title(value?: string): string | null | efModalView {
        if (value === undefined) return this.getTitleTextContainerView().getTextView().text();
        this.getTitleTextContainerView().getTextView().text(value);
        return this;
    }

    /**
     * Возвращает свойство: элемент - содержимое модального окна
     * @return {elyObservableProperty<elyView>}
     */
    public getModalContentProperty(): elyObservableProperty<elyView> {
        return this.__modalContentProperty;
    }

    /**
     * Возвращает элемент - содержимое модального окна
     * @returns {elyView}
     */
    public content(): elyView;

    /**
     * Устанавливает элемент - содержимое модального окна
     * @param {elyView} value - значение
     * @returns {this}
     */
    public content(value: elyView): efModalView;

    /**
     * Возвращает и устанавливает элемент - содержимое модального окна
     * @param {elyView} [value] - значение
     * @returns {elyView|this|null}
     */
    public content(value?: elyView): elyView | null | efModalView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__modalContentProperty);
    }

    /**
     * Возвращает свойство: флаг возможности закрытия окна
     * @return {elyObservableProperty<boolean>}
     */
    public getModalClosableProperty(): elyObservableProperty<boolean> {
        return this.__modalClosableProperty;
    }

    /**
     * Возвращает флаг возможности закрытия окна
     * @returns {boolean}
     */
    public closable(): boolean;

    /**
     * Устанавливает флаг возможности закрытия окна
     * @param {boolean} value - значение
     * @returns {this}
     */
    public closable(value: boolean): efModalView;

    /**
     * Возвращает и устанавливает флаг возможности закрытия окна
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public closable(value?: boolean): boolean | null | efModalView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__modalClosableProperty);
    }

    /**
     * Возвращает свойство: стиль модального окна
     * @return {elyObservableProperty<Style>}
     */
    public getModalStyleProperty(): elyObservableProperty<Style> {
        return this.__modalStyleProperty;
    }

    /**
     * Возвращает стиль модального окна
     * @returns {Style}
     */
    public modalStyle(): Style;

    /**
     * Устанавливает стиль модального окна
     * @param {Style} value - значение
     * @returns {this}
     */
    public modalStyle(value: Style): efModalView;

    /**
     * Возвращает и устанавливает стиль модального окна
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public modalStyle(value?: Style): Style | null | efModalView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__modalStyleProperty);
    }
}

/**
 * @typedef {Object} efModalViewOptions
 * @property {string} [title]
 * @property {elyView} [content]
 * @property {boolean} [closable = true]
 * @property {Style} [modalStyle]
 */
