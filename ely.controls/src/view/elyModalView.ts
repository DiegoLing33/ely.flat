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
 + Файл: elyModalView.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplication from "@app/app/elyFlatApplication";
import elyControl from "@controls/action/elyControl";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyStyle from "@enums/elyStyle";
import elyModalViewOptions from "@options/elyModalViewOptions";

/**w
 * Элемент отображения: Модальное окно
 * @version 1.0
 * @class elyModalView
 * @augments {elyView}
 */
@designable("modalTitle", elyDesignableFieldState.GETSET, "string")
@designable("modalContent", elyDesignableFieldState.GETSET, "string")
@designable("modalClosable", elyDesignableFieldState.GETSET, "boolean")
export default class elyModalView extends elyView {

    /**
     * Текущее окно
     * @type {elyModalView|null}
     */
    public static currentModal: elyModalView | null = null;

    /**
     * Очередь из объектов
     * @protected
     * @type {elyModalView[]}
     */
    protected static queue: elyModalView[] = [];

    /**
     * Открывает следующее модальное окно из стэка
     * @protected
     * @static
     */
    protected static next(): void {
        if (elyModalView.queue.length > 0 && elyModalView.currentModal === null) {
            elyModalView.currentModal = elyModalView.queue.pop()!;
            elyFlatApplication.default.applicationDocument.body.addSubView(elyModalView.currentModal);
            elyModalView.currentModal.fadeIn();
        }
    }

    /**
     * Элемент модального окна
     * @readonly
     * @type {elyControl}
     */
    public readonly modalContainerView: elyControl
        = new elyControl({class: "ef-modal-container"});

    /**
     * Элемент заголовка
     * @readonly
     * @type {elyTextView}
     */
    public readonly modalTitleView: elyTextView
        = new elyTextView({class: "title"});

    /**
     * Кнопка закрытия
     * @type {elyIconView}
     * @readonly
     */
    public readonly modalCloseButtonView: elyIconView
        = new elyIconView({iconName: "close", class: "close"});

    /**
     * Элемент контента
     * @type {elyView}
     * @readonly
     * @protected
     */
    protected readonly modalContentView: elyView
        = new elyControl({class: "content"});

    /**
     * Свойство: заголовок окна
     * @ignore
     * @protected
     * @type {elyObservableProperty<string>}
     * @readonly
     */
    protected readonly modalTitleProperty: elyObservableProperty<string>
        = new elyObservableProperty<string>();

    /**
     * Свойство: флаг возможности скрытия окна
     * @ignore
     * @protected
     * @type {elyObservableProperty<boolean>}
     * @readonly
     */
    protected readonly modalClosableProperty: elyObservableProperty<boolean>
        = new elyObservableProperty<boolean>(true);

    /**
     * Свойство: содержимое модального окна
     * @ignore
     * @protected
     * @type {elyObservableProperty<elyView>}
     * @readonly
     */
    protected readonly modalContentProperty: elyObservableProperty<elyView> =
        new elyObservableProperty<elyView>();

    /**
     * Свойство: стиль модального окна
     * @ignore
     * @protected
     * @type {elyObservableProperty<elyStyle>}
     * @readonly
     */
    protected readonly modalStyleProperty: elyObservableProperty<elyStyle>
        = new elyObservableProperty<elyStyle>();

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyModalViewOptions = {}) {
        super(options);
        this.addClass("ef-modal");

        // Observe
        this.modalTitleProperty.change((newValue) => this.modalTitleView.text(newValue));
        this.modalContentProperty.change((newValue) => {
            this.modalContentView.removeViewContent();
            this.modalContentView.getDocument().append(newValue.getDocument());
        });
        this.modalStyleProperty.change((newValue, oldValue) => {
            if (oldValue) this.modalTitleView.removeClass(`bg-${oldValue.value}`);
            this.modalTitleView.addClass(`bg-${newValue.value}`);
        });
        this.modalClosableProperty.change((newValue) =>
            this.modalCloseButtonView.hidden(!newValue));
        this.modalCloseButtonView.addObserver("click", () => this.dismiss());

        this.modalTitleView.getDocument().append(this.modalCloseButtonView.getDocument());
        this.modalContainerView.addSubView(this.modalTitleView);
        this.modalContainerView.addSubView(this.modalContentView);
        this.getDocument().append(this.modalContainerView.getDocument());

        // Set
        this.modalTitle(options.modalTitle || "Modal");
        this.modalContent(options.modalContent || elyControl.empty());
        this.modalStyle(options.modalStyle || elyStyle.primary);

        if (options.modalClosable === undefined) this.modalClosable(true);
        else this.modalClosable(options.modalClosable);
    }

    /**
     * Отображает модальное окно
     * @return
     */
    public present(): void {
        this.notificate("present", [this]);
        elyModalView.queue.push(this);
        elyModalView.next();
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
        if (this.modalClosable() || force) {
            this.notificate("dismiss", [this]);
            this.fadeOut(() => {
                elyFlatApplication.default.applicationDocument.body.removeSubView(this);
                elyModalView.currentModal = null;
                elyModalView.next();
            });
        }
    }

    /**
     * Возвращает заголовок окна
     * @return {string}
     */
    public modalTitle(): string;

    /**
     * Устанавливает заголовок окна
     * @param {string} value
     * @return {this}
     */
    public modalTitle(value: string): elyModalView;

    /**
     * Возвращает и устанавливает заголовок окна
     * @param {string} [value]
     * @return {this|string}
     */
    public modalTitle(value?: string): string | null | elyModalView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.modalTitleProperty);
    }

    /**
     * Возвращает содержимое модального окна
     */
    public modalContent(): elyView;

    /**
     * Устанавливает содержимое модального окна
     */
    public modalContent(value: elyView | string): elyModalView;

    /**
     * Возвращает и устанавливает содержимое модального окна
     * @param {elyView|string} [value]
     * @return {elyView|null|this}
     */
    public modalContent(value?: elyView | string): elyView | null | elyModalView {
        if (typeof value === "string") value = new elyTextView({text: value});
        return elyObservableProperty.simplePropertyAccess(this, value, this.modalContentProperty);
    }

    /**
     * Возвращает флаг возможности скрытия окна
     */
    public modalClosable(): boolean;

    /**
     * Устанавливает флаг возможности скрытия окна
     */
    public modalClosable(value: boolean): elyModalView;

    /**
     * Возвращает и устанавливает флаг возможности скрытия окна
     * @param {boolean} [value]
     * @return {boolean|this}
     */
    public modalClosable(value?: boolean): boolean | null | elyModalView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.modalClosableProperty);
    }

    /**
     * Возвращает стиль модального окна
     */
    public modalStyle(): elyStyle;

    /**
     * Устанавливает стиль модального окна
     */
    public modalStyle(value: elyStyle | string): elyModalView;

    /**
     * Возвращает и устанавливает стиль модального окна
     * @param {elyStyle|string} [value]
     * @return {this|elyStyle}
     */
    public modalStyle(value?: elyStyle | string): elyStyle | null | elyModalView {
        if (typeof value === "string") value = elyStyle.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.modalStyleProperty);
    }
}
