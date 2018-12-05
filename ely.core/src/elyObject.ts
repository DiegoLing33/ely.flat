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
 + Файл: elyObject.ts                                                         +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "./observable/elyObservable";

/**
 * Объект
 */
export default abstract class elyObject extends elyObservable {
    protected constructor() {
        super();
    }

    public describe(): string[] {
        return Object.getOwnPropertyNames(this).filter((value, index) => {
            return !value.startsWith("__");
        });
    }

    /**
     * Проверяет объект на наличие обозреваемого свойства в стандарте EPS6.
     * @param propName
     */
    public hasObservablePropertyProtocol(propName: string): boolean {
        if (propName.indexOf("Property") > -1) propName.replace("Property", "");
        const desc = this.describe();
        if (desc.indexOf(propName + "Property") === -1) return false;
        return typeof (this as any)[propName] === "function";

    }
}
