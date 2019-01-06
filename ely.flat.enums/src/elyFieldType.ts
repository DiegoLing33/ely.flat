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
 + Файл: elyFieldType.ts                                                      +
 + Файл изменен: 05.12.2018 23:47:11                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import IFieldType from "@controls/interfaces/IFieldType";
import elyEnum from "@enums/elyEnum";

/**
 * Типы ввода данных
 * @class elyFieldType
 * @augments {elyEnum<string>}
 */
export default class elyFieldType extends elyEnum<string> {

    /**
     * Текст
     */
    public static readonly text = new elyFieldType("text");

    /**
     * Пароль
     */
    public static readonly password = new elyFieldType("password");

    /**
     * Число
     */
    public static readonly number = new elyFieldType("number");

    /**
     * Почта
     */
    public static readonly mail = new elyFieldType("mail");

    /**
     * Тип по имени
     * @param value
     */
    public static byName(value: string | number): elyFieldType {
        if (typeof value === "number") value = value.toString() + "px";
        return new elyFieldType(value);
    }

    /**
     * Список
     */
    public static rawList(): IFieldType {
        return {
            mail: elyFieldType.mail.value,
            number: elyFieldType.number.value,
            password: elyFieldType.password.value,
            text: elyFieldType.text.value,
        };
    }

    /**
     * Конструктор
     * @ignore
     * @param val
     */
    protected constructor(val: string) {
        super(val);
    }
}
