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

import {efButton, efButtonOptions} from "@controls/action/efButton";
import {efListView, efListViewOptions} from "@controls/list/efListView";
import {efNotificationView} from "@controls/notification/efNotificationView";
import {efHeaderTextView, efHeaderTextViewOptions} from "@controls/text/efHeaderTextView";
import {efIconView, efIconViewOptions} from "@controls/text/efIconView";
import {efTextView, efTextViewOptions} from "@controls/text/efTextView";

declare global {

    /**
     * Расширения элемента String
     */
    interface String {

        /**
         * Преобразует строку в efTextView
         * @param {efTextViewOptions} options - опции
         */
        textView(options?: efTextViewOptions): efTextView;

        /**
         * Преобразует строку в efHeaderTextView
         * @param {efHeaderTextViewOptions} options - опции
         */
        headerTextView(options?: efHeaderTextViewOptions): efHeaderTextView;

        /**
         * Преобразует строку в efButton
         * @param {efButtonOptions} options - опции
         */
        button(options?: efButtonOptions): efButton;

        /**
         * Преобразует строку в efIconView
         * @param {efIconViewOptions} options - опции
         */
        iconView(options?: efIconViewOptions): efIconView;
    }

    /**
     * Расширение массива
     */
    interface Array<T> {
        /**
         * Преобразует массив в список efListView
         * @param options
         */
        listView(options?: efListViewOptions): efListView;
    }

    interface Window {
        /**
         * Создает оповещение
         * @param {string} text - текст
         * @param {string?} title - заголовок
         * @param {string?} content - контент
         */
        notifi: (text: string, title?: string, content?: string) => void;
    }
}

/**
 * Создает {@link efTextView} элемент из строки
 * @param {efTextViewOptions} options - опции {@link efTextViewOptions}
 */
String.prototype.textView = function(options: efTextViewOptions = {}) {
    return new efTextView({text: this as string, ...options});
};

/**
 * Создает {@link efHeaderTextView} элемент из строки
 * @param {efHeaderTextViewOptions} options - опции {@link efHeaderTextViewOptions}
 */
String.prototype.headerTextView = function(options: efHeaderTextViewOptions = {headerLevel: 1}) {
    return new efHeaderTextView({text: this as string, ...options});
};

/**
 * Создает {@link efButton} из строки
 * @param {efButtonOptions} options - опции {@link efButtonOptions}
 */
String.prototype.button = function(options?: efButtonOptions) {
    return new efButton({text: this as string, ...options});
};

/**
 * Создает {@link efIconView} из строки
 * @param {efIconViewOptions} options - опции {@link efIconViewOptions}
 */
String.prototype.iconView = function(options?: efIconViewOptions) {
    return new efIconView({iconName: this as string, ...options});
};

/**
 * Содает {@link efListView} из массива строк или элементов
 * @param options - опции {@link efListViewOptions}
 * @return {efListView}
 */
Array.prototype.listView = function(options?: efListViewOptions) {
    return new efListView({items: this, ...options});
};

/**
 * Создает оповещение
 * @function
 * @param {string} text - текст оповещения
 * @param {string?} title - заголовок оповещения
 * @param {string?} content - контента
 */
Window.prototype.notifi = (text, title, content) => {
    new efNotificationView({title, message: text, content}).present();
};
