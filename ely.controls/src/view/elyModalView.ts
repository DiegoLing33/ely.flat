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

import elyControl from "@controls/action/elyControl";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import elyBodyView from "@controls/view/elyBodyView";
import elyView from "@core/controls/elyView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyStyle from "@enums/elyStyle";
import elyModalViewOptions from "@options/elyModalViewOptions";

/**w
 * Элемент отображения: Модальное окно
 * @version 1.0
 */
@designable("modalTitle", elyDesignableFieldState.GETSET, "string")
@designable("modalContent", elyDesignableFieldState.GETSET, "string")
@designable("modalClosable", elyDesignableFieldState.GETSET, "boolean")
export default class elyModalView extends elyView {

    /**
     * Текущее окно
     */
    public static currentModal: elyModalView | null = null;

    /**
     * Очередь из объектов
     */
    protected static queue: elyModalView[] = [];

    /**
     * Открывает следующее модальное окно из стэка
     */
    protected static next(): void {
        if (elyModalView.queue.length > 0 && elyModalView.currentModal === null) {
            elyModalView.currentModal = elyModalView.queue.pop()!;
            elyBodyView.default.addSubView(elyModalView.currentModal);
            elyModalView.currentModal.fadeIn();
        }
    }

    /**
     * Элемент модального окна
     */
    public readonly modalContainerView: elyControl;

    /**
     * Элемент заголовка
     */
    public readonly modalTitleView: elyTextView;

    /**
     * Кнопка закрытия
     */
    public readonly modalCloseButtonView: elyIconView;

    /**
     * Элемент контента
     */
    protected readonly modalContentView: elyView;

    /**
     * Свойство: заголовок окна
     * @ignore
     */
    protected readonly modalTitleProperty: elyObservableProperty<string>;

    /**
     * Свойство: флаг возможности скрытия окна
     * @ignore
     */
    protected readonly modalClosableProperty: elyObservableProperty<boolean>;

    /**
     * Свойство: содержимое модального окна
     * @ignore
     */
    protected readonly modalContentProperty: elyObservableProperty<elyView>;

    /**
     * Свойство: стиль модального окна
     * @ignore
     */
    protected readonly modalStyleProperty: elyObservableProperty<elyStyle>;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyModalViewOptions = {}) {
        super(options);
        this.addClass("ef-modal");

        // Init
        this.modalTitleProperty = new elyObservableProperty<string>();
        this.modalClosableProperty = new elyObservableProperty<boolean>(true);
        this.modalContentProperty = new elyObservableProperty<elyView>();
        this.modalStyleProperty = new elyObservableProperty<elyStyle>();
        this.modalContainerView = new elyControl({class: "ef-modal-container"});
        this.modalTitleView = new elyTextView({class: "title"});
        this.modalContentView = new elyControl({class: "content"});
        this.modalCloseButtonView = new elyIconView({iconName: "close", class: "close"});

        // Observe
        this.modalTitleProperty.addChangeObserver((oldValue, newValue) => this.modalTitleView.text(newValue));
        this.modalContentProperty.addChangeObserver((oldValue, newValue) => {
            this.modalContentView.removeViewContent();
            this.modalContentView.getDocument().append(newValue.getDocument());
        });
        this.modalStyleProperty.addChangeObserver((oldValue, newValue) => {
            if (oldValue) this.modalTitleView.removeClass(`bg-${oldValue.value}`);
            this.modalTitleView.addClass(`bg-${newValue.value}`);
        });
        this.modalClosableProperty.addChangeObserver((oldValue, newValue) =>
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
     */
    public present(): void {
        this.notificate("present", [this]);
        elyModalView.queue.push(this);
        elyModalView.next();
    }

    /**
     * Скрывает модальное окно
     * @param force
     *
     * Модальное окно может быть "незакрываемым", тогда
     * удалить его можно только используя параметр `force`.
     *
     * @example
     * myModal.dismiss(true); // Force dismiss modal
     */
    public dismiss(force: boolean = false): void {
        if (this.modalClosable() || force) {
            this.notificate("dismiss", [this]);
            this.fadeOut(() => {
                elyBodyView.default.removeSubView(this);
                elyModalView.currentModal = null;
                elyModalView.next();
            });
        }
    }

    /**
     * Возвращает заголовок окна
     */
    public modalTitle(): string;

    /**
     * Устанавливает заголовок окна
     */
    public modalTitle(value: string): elyModalView;

    /**
     * Возвращает и устанавливает заголовок окна
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
     */
    public modalStyle(value?: elyStyle | string): elyStyle | null | elyModalView {
        if (typeof value === "string") value = elyStyle.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.modalStyleProperty);
    }
}
