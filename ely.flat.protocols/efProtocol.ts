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
 + Файл: efProtocol.ts                                                        +
 + Файл изменен: 08.01.2019 00:55:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

export class efProtocol {
    // empty
}

/**
 * Возвращает true, если объект obj подчиняется протоколу protocol
 * @param {*} obj
 * @param protocol
 */
export function hasProtocol<T extends efProtocol>(obj: any, protocol: typeof efProtocol): obj is T {
    for (const name of Object.getOwnPropertyNames(protocol.prototype)) {
        if (name === "constructor") continue;
        if (obj[name] === undefined) return false;
    }
    return true;
}
