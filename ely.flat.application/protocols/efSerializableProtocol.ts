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
 + Файл: efSerializableProtocol.ts                                            +
 + Файл изменен: 07.01.2019 23:56:45                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efProtocol} from "@protocols/efProtocol";

/**
 * Протокол сериализации
 * @class efSerializableProtocol
 * @template <T>
 */
export default class efSerializableProtocol<T> extends efProtocol {

    /**
     * Десериализует объект
     * @template <T>
     * @param {string} raw - сериализованный объект
     * @return {T}
     */
    public static deserialize<T>(raw: string): T | null {
        return null;
    }

    /**
     * Сериализует объект
     * @return {string}
     */
    public serialize(): string {
        return "";
    }
}