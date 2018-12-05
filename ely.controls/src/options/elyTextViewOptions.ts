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
 + Файл: elyTextViewOptions.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elySize from "@enums/elySize";
import elyWeight from "@enums/elyWeight";
import elyControlOptions from "./elyControlOptions";

/**
 * Опции элемента отображения текста
 */
export default interface elyTextViewOptions extends elyControlOptions {

    /**
     * Текст
     */
    text?: string;

    /**
     * Имя иконки
     */
    iconName?: string;

    /**
     * Размер текста
     *
     * См. {@link elySize}
     */
    textSize?: string | number | elySize;

    /**
     * Толщина текста
     *
     * См. {@link elyWeight}
     */
    textWeight?: elyWeight | number;

    /**
     * Выравнивает текст по центру
     */
    textCenter?: boolean;
}
