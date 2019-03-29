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
 + Файл: ModalViews                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import Application from "../../app/app/Application";
import View, {ViewOptions} from "../../core/controls/View";
import Style from "../../enums/Style";
import Control from "../action/Control";
import IconView from "../text/IconView";
import TextViewContainer from "../text/TextViewContainer";

/**
 * Опции {@link ModalView}
 */
export interface ModalViewOptions extends ViewOptions {

    /**
     * Заголовок модального окна
     */
    title?: string;

    /**
     * Содержимое
     */
    content?: View;

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
 * @class ModalView
 * @augments {View}
 */
export default class ModalView extends View {

    /**
     * Текущее окно
     * @type {ModalView|null}
     */
    public static currentModal: ModalView | null = null;

    /**
     * Очередь из объектов
     * @protected
     * @type {ModalView[]}
     */
    protected static queue: ModalView[] = [];

    /**
     * Открывает следующее модальное окно из стэка
     * @protected
     * @static
     */
    protected static next(): void {
        if (ModalView.queue.length > 0 && ModalView.currentModal === null) {
            ModalView.currentModal = ModalView.queue.pop()!;
            Application.default.getApplicationDocument().getBody().addSubView(ModalView.currentModal);
            ModalView.currentModal.fadeIn();
        }
    }

    /**
     * Элемент модального окна
     * @readonly
     * @type {Control}
     */
    protected readonly __containerView: Control
        = new Control({class: "ef-modal-container"});

    /**
     * Кнопка закрытия
     * @type {IconView}
     * @readonly
     */
    protected readonly __closeButtonView: IconView
        = new IconView({iconName: "close", class: "close"});

    /**
     * Элемент заголовка
     * @readonly
     * @type {TextViewContainer}
     */
    protected readonly __titleTextContainerView: TextViewContainer
        = new TextViewContainer({class: "title"});

    /**
     * Элемент контента
     * @type {View}
     * @readonly
     * @protected
     */
    protected readonly __modalContentView: View
        = new Control({class: "content"});

    /**
     * Свойство: стиль модального окна
     * @ignore
     * @protected
     */
    protected readonly __modalStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>(Style.primary).change((value, oldVal) => {
        if (oldVal) this.getTitleTextContainerView().removeClass(`bg-${oldVal.value}`);
        this.getTitleTextContainerView().addClass(`bg-${value.value}`);
    });

    /**
     * Свойство: флаг возможности закрытия окна
     * @ignore
     * @protected
     */
    protected readonly __modalClosableProperty: ObservableProperty<boolean>
        = new ObservableProperty<boolean>(true).change(value => {
        this.getCloseButtonView().hidden(!value);
    });

    /**
     * Свойство: элемент - содержимое модального окна
     * @ignore
     * @protected
     */
    protected readonly __modalContentProperty: ObservableProperty<View>
        = new ObservableProperty<View>(Control.empty()).change((newValue) => {
        this.getContentView().removeViewContent();
        this.getContentView().getDocument().append(newValue.getDocument());
    });

    /**
     * Конструктор
     * @param {ModalViewOptions} options - опции
     */
    public constructor(options: ModalViewOptions = {}) {
        super(options);
        this.addClass("ef-modal");

        this.getCloseButtonView().addObserver("click", () => this.dismiss());

        this.getTitleTextContainerView().getDocument().append(this.getCloseButtonView().getDocument());
        this.getContainerView().addSubView(this.getTitleTextContainerView());
        this.getContainerView().addSubView(this.getContentView());
        this.getDocument().append(this.getContainerView().getDocument());

        // Set
        Guard.variable<View>(options.content, value => this.content(value), Control.empty());
        Guard.variable<string>(options.title, value => this.title(value), "Modal");
        Guard.variable<boolean>(options.closable, value => this.closable(value), true);
        Guard.variable<Style>(options.modalStyle, value => this.modalStyle(value), Style.byName("default"));
    }

    /**
     * Отображает модальное окно
     * @return
     */
    public present(): void {
        this.notificate("present", [this]);
        ModalView.queue.push(this);
        ModalView.next();
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
                Application.default.getApplicationDocument().getBody().removeSubView(this);
                ModalView.currentModal = null;
                ModalView.next();
            });
        }
    }

    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    public getTitleTextContainerView(): TextViewContainer {
        return this.__titleTextContainerView;
    }

    /**
     * Возвращает элемент отображения содержимого модального окна
     * @return {View}
     */
    public getContentView(): View {
        return this.__modalContentView;
    }

    /**
     * Возвращает элемент отображения - контейнер модального окна
     * @return {Control}
     */
    public getContainerView(): Control {
        return this.__containerView;
    }

    /**
     * Возвращает элемент отображения иконки закрытия модального окна
     * @return {IconView}
     */
    public getCloseButtonView(): IconView {
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
    public title(value: string): ModalView;

    /**
     * Возвращает и устанавливает заголовок модального окна
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public title(value?: string): string | null | ModalView {
        if (value === undefined) return this.getTitleTextContainerView().getTextView().text();
        this.getTitleTextContainerView().getTextView().text(value);
        return this;
    }

    /**
     * Возвращает свойство: элемент - содержимое модального окна
     * @return {ObservableProperty<View>}
     */
    public getModalContentProperty(): ObservableProperty<View> {
        return this.__modalContentProperty;
    }

    /**
     * Возвращает элемент - содержимое модального окна
     * @returns {View}
     */
    public content(): View;

    /**
     * Устанавливает элемент - содержимое модального окна
     * @param {View} value - значение
     * @returns {this}
     */
    public content(value: View): ModalView;

    /**
     * Возвращает и устанавливает элемент - содержимое модального окна
     * @param {View} [value] - значение
     * @returns {View|this|null}
     */
    public content(value?: View): View | null | ModalView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__modalContentProperty);
    }

    /**
     * Возвращает свойство: флаг возможности закрытия окна
     * @return {ObservableProperty<boolean>}
     */
    public getModalClosableProperty(): ObservableProperty<boolean> {
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
    public closable(value: boolean): ModalView;

    /**
     * Возвращает и устанавливает флаг возможности закрытия окна
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public closable(value?: boolean): boolean | null | ModalView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__modalClosableProperty);
    }

    /**
     * Возвращает свойство: стиль модального окна
     * @return {ObservableProperty<Style>}
     */
    public getModalStyleProperty(): ObservableProperty<Style> {
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
    public modalStyle(value: Style): ModalView;

    /**
     * Возвращает и устанавливает стиль модального окна
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public modalStyle(value?: Style): Style | null | ModalView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__modalStyleProperty);
    }
}

/**
 * @typedef {Object} ModalViewOptions
 * @property {string} [title]
 * @property {View} [content]
 * @property {boolean} [closable = true]
 * @property {Style} [modalStyle]
 */
