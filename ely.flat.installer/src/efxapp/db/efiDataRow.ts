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
 + Файл: efiDataRoww.ts                                                         +
 + Файл изменен: 25.02.2019 22:53:30                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyUtils from "../../core/elyUtils";
import {TErrorCallback} from "../../efiTypes";

/**
 * Строка данных
 */
export class efiDataRow {

    public constructor(data: any) {
        elyUtils.mergeDeep(this, data);
    }

    /**
     * Сохраняет строку
     * @param callback
     */
    public save(callback?: TErrorCallback): efiDataRow {
        return this;
    }

    /**
     * Удаляет строку
     * @param callback
     */
    public remove(callback?: TErrorCallback): void {
        return;
    }
}
