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
 + Проект: ely.flat.application                                               +
 +                                                                            +
 + Файл: elyDataGridViewOptions.ts                                            +
 + Файл изменен: 27.11.2018 22:11:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * Опции для {@link elyDataGridViewOptions}
 */
export default interface elyDataGridViewOptions extends elyViewOptions {

    /**
     * Количество строк
     */
    rowsCount?: number;

    /**
     * Количество столбцов
     */
    colsCount?: number;

    /**
     * Отмечает первую колонку как заголовок
     */
    firstColumnIsHeader?: boolean;

    /**
     * Матрица исходных данных
     */
    sourceData?: any[][];

    /**
     * Заголовки
     */
    headers?: Array<string | any>;

    /**
     * Флаг - таблица вокруг рамки
     */
    borderedStyle?: boolean;

    /**
     * Заголовок таблицы
     */
    title?: string | elyView;
}
