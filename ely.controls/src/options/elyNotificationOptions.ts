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
 + Файл: elyNotificationOptions.ts                                            +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewOptions from "@core/controls/elyViewOptions";
import elyNotificationView from "../notification/elyNotificationView";

/**
 * Опции: {@link elyNotificationView}
 */
export default interface elyNotificationOptions extends elyViewOptions {

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
    notificationsData?: elyNotificationView[];

    /**
     * Флаг закрытия
     */
    closable?: boolean;
}
