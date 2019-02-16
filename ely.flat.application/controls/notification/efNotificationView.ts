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
 + Файл: efNotificationView.ts                                              +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efApplication from "@app/app/efApplication";
import elyControl from "@controls/action/elyControl";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * Опции: {@link efNotificationView}
 */
export interface efNotificationViewOptions extends elyViewOptions {

    /**
     * Заголовок оповещения
     */
    title?: string;

    /**
     * Сообщение
     */
    message?: string;

    /**
     * Содержимое оповещения
     */
    content?: string;

    /**
     * Время задержки до смерти оповещения (милисекунды)
     * Если принимает значение false, оповещение бессмертно
     */
    delay?: number;

    /** Ширина блока оповещения */
    width?: number;

    /** Время появляения блока оповещения (милисекунды) */
    fadeTime?: number;

    /** Время перемещения оповещений вверх/вниз */
    moveTime?: number;

    /** Отступ между оповещениями */
    notificationsMargin?: number;

    /*
       ========= Кастомизация стиля =========
     */

    /** Цвет фона оповещения */
    backgroundColor?: string;

    /** Цвет отделителя подсказки */
    sepColor?: string;

    /** Цвет текста заголовка */
    titleColor?: string;

    /** Цвет текста сообщения */
    messageColor?: string;

    /** Цвет текста подсказки */
    contentColor?: string;

    /**
     * Отступ оповщений от края экрана
     */
    marginFromScreenEdge?: number;

    /**
     * Положение на экране (вертикально/горизонтально)
     * Символ "/" обязательно
     *
     * top/left
     * top/right
     * bottom/left
     * bottom/right
     */
    displayPosition?: string;

    /** Лимит оповещений на экране */
    limit?: number;

    /** Использование анимаций */
    animation?: boolean;

    /** Скорость анимации */
    animateSpeed?: number;

    /** Время, через которое анимация повторится */
    animateDuration?: number;

    /** Данные оповещений */
    notificationsData?: efNotificationView[];

    /**
     * Флаг закрытия
     */
    closable?: boolean;
}

/**
 * Оповещения
 *
 * elyNotification (TypeScript)
 * version 0.1
 */
export class efNotificationView extends elyControl {

    /**
     * Стандартные параметры
     */
    public static defaults: efNotificationViewOptions = {
        animateDuration: 60000,
        animateSpeed: 700,
        animation: false,
        backgroundColor: "#FFFFFF",
        closable: true,
        contentColor: "#595959",
        delay: 5000,
        displayPosition: "top/right",
        fadeTime: 500,
        limit: 15,
        marginFromScreenEdge: 0,
        messageColor: "#595959",
        moveTime: 500,
        notificationsData: [],
        notificationsMargin: 10,
        sepColor: "#EEEEEE",
        titleColor: "#595959",
        width: 400,
    };

    /**
     * Закрывает все уведомения, кроме последнего
     */
    public static closeAllNotificationsToLast() {
        if (efNotificationView.defaults.notificationsData!.length > 0) {
            for (let i = 0; i < efNotificationView.defaults.notificationsData!.length - 1; i++)
                efNotificationView.defaults.notificationsData![i].dismiss();
        }
    }

    /**
     * Заголовок
     */
    public titleView: elyControl;

    /**
     * Содержимое сообщения
     */
    public messageView: elyControl;

    /**
     * Содержимое контента
     */
    public contentView: elyControl;

    /**
     * Кнопка закрытия
     */
    public closeButton: elyView;

    /**
     * Опции
     */
    public options: efNotificationViewOptions;

    public notificationHeight: number = 0;

    /**
     * Флаг нотифицирования
     */
    private _isNotified: boolean = false;
    private _isClosable: boolean = true;

    /**
     * Конструктор
     * @param props
     */
    constructor(props: efNotificationViewOptions = efNotificationView.defaults) {
        super(props);
        this.options = efNotificationView.defaults;
        for (const index in props) this.options[index] = props[index];
        const scsize = window.outerWidth;
        if (this.options.width! > scsize) this.options.width = scsize - 20;
        const absoluteWidth = (this.options.width!) - 37;

        // this.identifier("notification_" + Math.floor(Math.random() * (999999 - 1000 + 1) + 1000));
        this.addClass("ely-notification-panel");

        this.css({"background-color": this.options.backgroundColor, "width": this.options.width});

        const obj: { [name: string]: string } = {};
        obj[this.getDisplayPositions()[0]] = 10 + "px";
        obj[this.getDisplayPositions()[1]] = 10 + "px";
        this.css(obj);

        //
        //  Close button
        //
        this.closeButton = new elyControl({tag: "b", class: "ely-notification-close-button"});
        this.closeButton.css({color: this.options.titleColor});
        this.closeButton.getDocument().innerHTML = "&times;";

        //
        //  Title
        //
        this.titleView = new elyControl({class: "ely-notification-title-label"});
        this.titleView.css({width: absoluteWidth + "px", color: this.options.titleColor});
        this.titleView.getDocument().innerHTML = this.options.title || "";

        //
        //  Message
        //
        this.messageView = new elyControl({class: "ely-notification-message-label"});
        this.messageView.css({width: absoluteWidth + "px", color: this.options.messageColor});
        this.messageView.getDocument().innerHTML = this.options.message || "";

        this.contentView = new elyControl({class: "ely-notification-content"});
        this.contentView.css({
            "border-top": "1px solid " + this.options.sepColor,
            "color": this.options.contentColor,
            "width": this.options.width + "px",
        });
        if (this.options.content) this.contentView.addSubView(new elyTextView({text: this.options.content}));

        this.hide();
        this.closable(this.options.closable);
    }

    /**
     * Возвращает позиции оповещения
     */
    public getDisplayPositions(): string[] {
        return this.options.displayPosition!.split("/");
    }

    /**
     * Оторбражает оповещение
     */
    public present(): efNotificationView {
        if (this._isNotified) return this;

        //
        // Set-up
        //
        if (this.closable()) this.addSubView(this.closeButton);
        if (this.options.title || this.titleView.getDocument().innerHTML !== "") this.addSubView(this.titleView);
        this.addSubView(this.messageView);
        if (this.options.content || this.contentView.getDocument().innerHTML !== "") this.addSubView(this.contentView);

        this._isNotified = true;

        efApplication.default.getApplicationDocument().getBody().addSubView(this);

        this.show();
        this.notificationHeight = this.offSize().height;
        this.hide();

        const notifications = efNotificationView.defaults.notificationsData!;
        const margin = efNotificationView.defaults.notificationsMargin! + this.notificationHeight;
        const displayPositions = this.getDisplayPositions();

        switch (displayPositions[0]) {
            case "bottom":
                this.css({bottom: "+=" + (this.options.marginFromScreenEdge || 0) + "px"});
                break;
            default:
                this.css({top: "+=" + (this.options.marginFromScreenEdge || 0) + "px"});
                break;
        }

        this.notificate("show");

        if (notifications.length > 0) { // In case if notifications are on the screen
            switch (displayPositions[0]) { // Moves all notifications in true direction
                case "bottom":
                    for (const item of notifications) item.css({bottom: "+=" + margin + "px"});
                    break;
                default:
                    for (const item of notifications) item.css({top: "+=" + margin + "px"});
                    break;
            }
        }

        notifications.push(this); // Adds notification to list

        // In case if notifications is too much, clear all to last
        if (notifications.length > efNotificationView.defaults.limit!)
            efNotificationView.closeAllNotificationsToLast();

        // Fading and moving the notification
        if (notifications.length > 0)
            setTimeout(() => {
                this.fadeIn();
            }, this.options.moveTime);
        else this.fadeIn();

        this.closeButton.addObserver("click", () => {
            this.dismiss();
        });

        if (this.isNotified() && this.closable()) setTimeout(() => {
            this.dismiss();
        }, this.options.fadeTime! + this.options.delay!);

        return this;
    }

    /**
     * Удаляет оповещение с экрана
     *
     * @param force - принудительное удаление объкта с экранаx
     */
    public dismiss(force: boolean = false) {
        if (this.closable() || force) {
            this.notificate("close");
            this._isNotified = false;

            this.fadeOut();
            const noties = efNotificationView.defaults.notificationsData!;
            setTimeout(() => {
                if (noties.length > 0)
                    if (this.options.displayPosition!.split("/")[0] === "top")
                        for (let j = noties.indexOf(this); j >= 0; j--)
                            noties[j].css({
                                top: "-=" + (this.notificationHeight + this.options.notificationsMargin!) + "px",
                            });
                    else
                        for (let j = noties.indexOf(this); j >= 0; j--)
                            noties[j].css({
                                bottom: "-=" + (this.notificationHeight + this.options.notificationsMargin!) + "px",
                            });
                const cache = [];
                for (const item of noties)
                    if (item !== this) cache.push(item);
                efNotificationView.defaults.notificationsData = cache;
                try {
                    this.getDocument().parentNode!.removeChild(this.getDocument());
                } catch (e) {
                    // Nothing is done
                }
            }, this.options.fadeTime);
        }
    }

    /**
     * Состояние закрывающегося оповещения
     * @param value
     */
    public closable(value?: boolean): boolean | any {
        if (value === undefined) {
            return this._isClosable;
        }
        this._isClosable = value;
        return this;
    }

    /**
     * Возвращает состояние оповещения
     */
    public isNotified(): boolean {
        return this._isNotified;
    }

    protected hide() {
        this.hidden(true);
    }

    protected show() {
        this.hidden(false);
    }
}
