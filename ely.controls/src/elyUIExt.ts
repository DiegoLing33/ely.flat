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
 + Файл: elyUIExt.ts                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyGridView from "@controls/flex/elyGridView";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import elyListView from "@controls/view/elyListView";
import elyView from "@core/controls/elyView";
import elyButtonOptions from "@options/elyButtonOptions";
import elyIconViewOptions from "@options/elyIconViewOptions";
import elyListViewOptions from "@options/elyListViewOptions";
import elyTextViewOptions from "@options/elyTextViewOptions";

declare global {

    /**
     * Расширения элемента String
     */
    interface String {

        /**
         * Преобразует строку в elyTextView
         * @param options - опции
         */
        textView(options?: elyTextViewOptions): elyTextView;

        /**
         * Преобразует строку в elyButton
         * @param options - опции
         */
        button(options?: elyButtonOptions): elyButton;

        /**
         * Преобразует строку в elyIconView
         * @param options - опции
         */
        iconView(options?: elyIconViewOptions): elyIconView;
    }

    /**
     * Расширение массива
     */
    interface Array<T> {
        flexGridView(): elyGridView;

        /**
         * Преобразует массив в список elyListView
         * @param options
         */
        listView(options?: elyListViewOptions): elyListView;
    }
}

/**
 * Создает {@link elyTextView} элемент из строки
 * @param options - опции {@link elyTextViewOptions}
 */
String.prototype.textView = function(options?: elyTextViewOptions) {
    return new elyTextView({text: this as string, ...options});
};

/**
 * Создает {@link elyButton} из строки
 * @param options - опции {@link elyButtonOptions}
 */
String.prototype.button = function(options?: elyButtonOptions) {
    return new elyButton({text: this as string, ...options});
};

/**
 * Создает {@link elyIconView} из строки
 * @param options - опции {@link elyIconViewOptions}
 */
String.prototype.iconView = function(options?: elyIconViewOptions) {
    return new elyIconView({iconName: this as string, ...options});
};

/**
 * Преборазует массив в Flex сетку
 */
Array.prototype.flexGridView = function() {
    const grid = new elyGridView();
    if (this[0] instanceof elyView) {
        grid.add(...this);
    } else {
        for (const row of this) {
            grid.add(...row);
        }
    }
    return grid;
};

/**
 * Содает {@link elyListView} из массива строк или элементов
 * @param options - опции {@link elyListViewOptions}
 */
Array.prototype.listView = function(options?: elyListViewOptions) {
    return new elyListView({items: this, ...options});
};
