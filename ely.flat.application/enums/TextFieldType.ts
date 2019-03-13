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
 + Файл: fieldType.tss                                                      +
 + Файл изменен: 05.12.2018 23:47:11                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyEnum from "@enums/elyEnum";

/**
 * Типы ввода данных
 * @class TextFieldType
 * @augments {elyEnum<string>}
 */
export default class TextFieldType extends elyEnum<string> {

    /**
     * Текст
     */
    public static readonly text = new TextFieldType({value: "text"});

    /**
     * Пароль
     */
    public static readonly password = new TextFieldType({value: "password"});

    /**
     * Число
     */
    public static readonly number = new TextFieldType({value: "number"});

    /**
     * Почта
     */
    public static readonly mail = new TextFieldType({value: "mail"});

    /**
     * Тип по имени
     * @param value
     */
    public static byName(value: string | number): TextFieldType {
        if (typeof value === "number") value = value.toString() + "px";
        return new TextFieldType({value});
    }

    /**
     * Список
     */
    public static rawList() {
        return {
            mail: TextFieldType.mail.value,
            number: TextFieldType.number.value,
            password: TextFieldType.password.value,
            text: TextFieldType.text.value,
        };
    }

    /**
     * Конструктор
     * @ignore
     * @param {{value: string}} props
     */
    protected constructor(props: { value: string }) {
        super(props);
    }

    /**
     * Сериализует объект
     * @return {*}
     */
    public serialize(): any {
        return {_item: "TextFieldType", value: this.value};
    }
}
