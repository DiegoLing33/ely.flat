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
 + Файл: elyUIExt.ts                                                          +
 + Файл изменен: 08.02.2019 02:41:23                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Button, {ButtonOptions} from "@controls/action/Button";
import ListView, {ListViewOptions} from "@controls/list/ListView";
import NotificationView from "@controls/notification/NotificationView";
import HeaderTextView, {HeaderTextViewOptions} from "@controls/text/HeaderTextView";
import IconView, {IconViewOptions} from "@controls/text/IconView";
import TextView, {TextViewOptions} from "@controls/text/TextView";
import View from "@core/controls/View";
import SendFileRequest from "@core/web/request/SendFileRequest";
import SendJsonRequest from "@core/web/request/SendJsonRequest";
import URLRequest, {URLRequestMethod} from "@core/web/request/URLRequest";

declare global {

    /**
     * Расширения элемента String
     */
    interface String {

        /**
         * Преобразует строку в TextView
         * @param {TextViewOptions} options - опции
         */
        textView(options?: TextViewOptions): TextView;

        /**
         * Преобразует строку в HeaderTextView
         * @param {HeaderTextViewOptions} options - опции
         */
        headerTextView(options?: HeaderTextViewOptions): HeaderTextView;

        /**
         * Преобразует строку в Button
         * @param {ButtonOptions} options - опции
         */
        button(options?: ButtonOptions): Button;

        /**
         * Преобразует строку в IconView
         * @param {IconViewOptions} options - опции
         */
        iconView(options?: IconViewOptions): IconView;

        /**
         * Преобразует строку в объект elyURL
         */
        url(): URL;
    }

    /**
     * Расширение массива
     */
    interface Array<T> {
        /**
         * Преобразует массив в список ListView
         * @param options
         */
        listView(options?: ListViewOptions): ListView;
    }

    interface Window {
        /**
         * Создает оповещение
         * @param {string} text - текст
         * @param {string?} title - заголовок
         * @param {string?} content - контент
         */
        notifi(text: string, title?: string, content?: string): void;
    }

    interface URL {
        /**
         * Создает URL запрос из данного URL
         * @param {{ data?: *, method?: URLRequestMethod, async?: boolean }} props - опции
         *
         * @return {URLRequest}
         */
        createUrlRequest(props?: { data?: any, method?: URLRequestMethod, async?: boolean }): URLRequest;

        /**
         * Создает SendJson запрос из данного URL
         * @param {*} object - объект для передачи
         * @param {{ async?: boolean }} props - опции
         *
         * @return {SendJsonRequest}
         */
        createSendJsonRequest(object: any, props?: { async?: boolean }): SendJsonRequest;

        /**
         * Создает SendJson запрос из данного URL
         * @param {File[]} files - файлы для передачи
         * @param {{ async?: boolean }} props - опции
         *
         * @return {SendFileRequest}
         */
        createSendFileRequest(files: File[], props?: { async?: boolean }): SendFileRequest;

        /**
         * Возвращает абсолютную строку URL
         * @return {string}
         */
        getAbsoluteString(): string;

        /**
         * Возвращает URL очищенный от запроса
         * @return {string}
         */
        getClear(): string;
    }
}

/**
 * Возвращает текущий URL
 * @return {URL}
 */
(URL as any).current = () => new URL(window.location.href);

/**
 * Возвращает абсолютную строку URL
 * @return {string}
 */
URL.prototype.getAbsoluteString = function() {
    return String(this);
};

/**
 * Возвращает URL очищенный от запроса
 * @return {string}
 */
URL.prototype.getClear = function() {
    return (new RegExp("(http[s]?:\\/\\/.+)\\?").exec(this.getAbsoluteString())! || [])[1] || "";
};

/**
 * Создает URL запрос из данного URL
 * @param {{ data?: *, method?: URLRequestMethod, async?: boolean }} props - опции
 *
 * @return {URLRequest}
 */
URL.prototype.createUrlRequest = function(props: { data?: any, method?: URLRequestMethod, async?: boolean } = {}):
    URLRequest {
    props = props || {};
    const data = props.data;
    const method = props.method;
    const async = props.async;
    return new URLRequest({url: this.getAbsoluteString(), data, method, async});
};

/**
 * Создает SendJson запрос из данного URL
 * @param {*} object - объект для передачи
 * @param {{ async?: boolean }} props - опции
 *
 * @return {SendJsonRequest}
 */
URL.prototype.createSendJsonRequest = function(object: any, props: { async?: boolean } = {}): SendJsonRequest {
    props = props || {};
    return new SendJsonRequest({url: this.getAbsoluteString(), object, ...props});
};

/**
 * Создает SendJson запрос из данного URL
 * @param {File[]} files - файлы для передачи
 * @param {{ async?: boolean }} props - опции
 *
 * @return {SendFileRequest}
 */
URL.prototype.createSendFileRequest = function(files: File[], props?: { async?: boolean }): SendFileRequest {
    props = props || {};
    return new SendFileRequest({url: this.getAbsoluteString(), files, ...props});
};

/**
 * Создает {@link TextView} элемент из строки
 * @param {TextViewOptions} options - опции {@link TextViewOptions}
 * @return {TextView}
 */
String.prototype.textView = function(options: TextViewOptions = {}) {
    return new TextView({text: this as string, ...options});
};

/**
 * Создает {@link HeaderTextView} элемент из строки
 * @param {HeaderTextViewOptions} options - опции {@link HeaderTextViewOptions}
 * @return {HeaderTextView}
 */
String.prototype.headerTextView = function(options: HeaderTextViewOptions = {headerLevel: 1}) {
    return new HeaderTextView({text: this as string, ...options});
};

/**
 * Создает {@link Button} из строки
 * @param {ButtonOptions} options - опции {@link ButtonOptions}
 * @return {Button}
 */
String.prototype.button = function(options?: ButtonOptions) {
    return new Button({text: this as string, ...options});
};

/**
 * Создает {@link IconView} из строки
 * @param {IconViewOptions} options - опции {@link IconViewOptions}
 * @return {IconView}
 */
String.prototype.iconView = function(options?: IconViewOptions) {
    return new IconView({iconName: this as string, ...options});
};

/**
 * Создает {@link URL} из строки
 * @return {URL}
 */
String.prototype.url = function() {
    return new URL(this as string);
};

/**
 * Содает {@link ListView} из массива строк или элементов
 * @param options - опции {@link ListViewOptions}
 * @return {ListView}
 */
Array.prototype.listView = function(options?: ListViewOptions) {
    return new ListView({items: this, ...options});
};

/**
 * Создает оповещение
 * @function
 * @param {string} text - текст оповещения
 * @param {string?} title - заголовок оповещения
 * @param {string?} content - контента
 */
Window.prototype.notifi = (text, title, content) => {
    new NotificationView({title, message: text, content}).present();
};
