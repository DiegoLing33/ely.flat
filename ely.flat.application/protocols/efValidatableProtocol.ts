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
 + Файл: efValidatableProtocol.ts                                             +
 + Файл изменен: 08.01.2019 00:36:49                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efProtocol} from "./efProtocol";

/**
 * Протокол валидации данных
 * @class {efValidatableProtocol}
 */
export class efValidatableProtocol extends efProtocol {

    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    public isValid(): boolean {
        throw Error(`Method isValid is not implemented in class ${this}!`);
    }

    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    public isEmpty(): boolean {
        throw Error(`Method isValid is not implemented in class ${this}!`);
    }

}
