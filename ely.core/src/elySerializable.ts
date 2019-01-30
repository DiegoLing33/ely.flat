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
 + Файл: elySerializable.ts                                                   +
 + Файл изменен: 31.01.2019 02:07:39                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efSerializableProtocol from "@protocols/efSerializableProtocol";

/**
 * Декоратор сериализации
 */
export function serializable(): ClassDecorator {
    return (target: any) => {
        target.isSerializable = true;
        if (!(target.prototype.hasOwnProperty("serialize") && target.hasOwnProperty("deserialize"))) {
            console.log(target);
            throw Error(`Класс ${target.prototype.constructor.name} ` +
                `не соответствует протоколу efSerializableProtocol!`);
        }
    };
}

/**
 * Возвращает true, если объект может быть сериализован
 * @param obj
 */
export function isSerializable(obj: any): obj is efSerializableProtocol<any> {
    return Object.getOwnPropertyNames(obj.constructor).indexOf("isSerializable") > -1 &&
        obj.constructor.isSerializable;
}
