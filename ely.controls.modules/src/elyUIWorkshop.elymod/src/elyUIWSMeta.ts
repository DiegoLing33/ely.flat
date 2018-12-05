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
 + Файл: elyUIWSMeta.ts                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {elyDesignableAutoFields} from "@core/elyDesignable";

/**
 * Мета данные жлемента
 */
export default class elyUIWSMeta {

    /**
     * Мета значения элементов
     */
    public static metas: { [name: string]: elyUIWSMeta } = {};

    /**
     * Замораживает всю мету
     */
    public static freezeAllMeta(): any {
        const obj: any = {};
        for (const viewName in elyUIWSMeta.metas) {
            if (elyUIWSMeta.metas.hasOwnProperty(viewName)) {
                obj[viewName] = elyUIWSMeta.metas[viewName].freeze();
            }
        }
        return obj;
    }

    /**
     * Автоматическая дата
     */
    public autoData: elyDesignableAutoFields | null = null;

    /**
     * Соединен по имени
     */
    public linkedByViewMethod: string | null = null;

    /**
     * Замораживает мета значение
     */
    public freeze(): any {
        return {};
    }
}
