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
 + Файл: efErrorDisplayProtocolcol.ts                                         +
 + Файл изменен: 08.01.2019 00:50:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efProtocol} from "@protocols/efProtocol";

/**
 * Протокол объекта, который может быть помечен, как "объект с ошибкой"
 * @class efErrorDisplayProtocol
 */
export class efErrorDisplayProtocol extends efProtocol {
    /**
     * Помечает объект как неисправный
     * @param {boolean} flag
     * @return {this}
     */
    public error(flag: boolean): efErrorDisplayProtocol {
        throw Error(`Method isValid is not implemented in class ${this}!`);
    }

}
