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
 + Файл: efiTypes.ts                                                          +
 + Файл изменен: 25.02.2019 23:30:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efiDataCellType} from "./efxapp/db/efiDataCellType";
import {efiDataRow} from "./efxapp/db/efiDataRow";

/**
 * Обработчик, который может возвращать ошибку
 */
export type TErrorCallback = (err?: string) => void;

/**
 * Обработчик элементов фильтрацией через лямбду
 */
export type TDataRowFilterClosure = (row: TDataRow) => boolean;

/**
 * Обработчик результата
 */
export type TResultCallback<T> = (result: T) => void;

/**
 * Обработчик ответа API метода
 */
export type TResponseApiCallback = (status: boolean, response: any) => void;

/**
 * Метод efi API сервера
 */
export interface TEfiServerApiMethod {
    /**
     * Аргументы
     */
    args: string[];

    /**
     * Метод
     * @param args
     */
    method: (args: { [name: string]: any }) => void;
}

/**
 * Ячейки данных
 */
export interface TDataCells {
    [name: string]: TDataTableCell;
}

export type TDataRow = efiDataRow & {
    [name: string]: any;
};

export type TDataRows = TDataRow[];

/**
 * Характеристики ячейки строки
 */
export interface TDataTableCell {
    /**
     * Тип
     * @default
     */
    type?: string | efiDataCellType;

    /**
     * Значение по умолчанию
     */
    default?: any;

    /**
     * Устанавливает возможность нулевого состояния
     */
    nullable?: boolean;
}

/**
 * Фильтр по ячейке
 */
export interface TDataCellFilter {
    [cell: string]: any;
}
