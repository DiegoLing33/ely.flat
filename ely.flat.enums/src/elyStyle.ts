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
 + Файл: elyStyle.ts                                                          +
 + Файл изменен: 05.12.2018 23:47:11                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import IStyleType from "@controls/interfaces/IStyleType";

/**
 * Стили ely.flat
 */
export default class elyStyle {

    /**
     * Стандартный стиль
     *
     * Элементарный сброс стиля
     */
    public static readonly default = new elyStyle("default");

    /**
     * Главный стиль
     *
     * Основной стиль подходит для важных элементов.
     */
    public static readonly primary = new elyStyle("primary");

    /**
     * Информативный стиль
     *
     * Основной стиль подходит для отображения информации, которая должна выделяться.
     */
    public static readonly info = new elyStyle("info");

    /**
     * Вторичный стиль
     *
     * Стиль подходит для элементов, не требующих основное внимание.
     */
    public static readonly secondary = new elyStyle("secondary");

    /**
     * Стиль предупреждения
     *
     * Стиль, особо концентрирующий внимание пользователя.
     */
    public static readonly warning = new elyStyle("warning");

    /**
     * Успешный стиль
     *
     * Стиль, говорящий об успешном завершении действия.
     */
    public static readonly success = new elyStyle("success");

    /**
     * Опасный стиль
     *
     * Стиль, ярко бросающийся в глаза. Подойдет для отметки ошибок.
     */
    public static readonly danger = new elyStyle("danger");

    /**
     * Заглушенный стиль
     *
     * Стиль, говорящий о невозможности использовать элемент.
     */
    public static readonly muted = new elyStyle("muted");

    /**
     * Список
     */
    public static rawList(): IStyleType {
        // tslint:disable-next-line:max-classes-per-file
        return new class implements IStyleType {
            public danger: string = elyStyle.danger.value;
            public default: string = elyStyle.default.value;
            public info: string = elyStyle.info.value;
            public muted: string = elyStyle.muted.value;
            public primary: string = elyStyle.primary.value;
            public secondary: string = elyStyle.secondary.value;
            public success: string = elyStyle.success.value;
            public warning: string = elyStyle.warning.value;
        };
    }

    public static list(): any {
        return {
            danger: elyStyle.default,
            default: elyStyle.default,
            info: elyStyle.info,
            muted: elyStyle.muted,
            primary: elyStyle.primary,
            secondary: elyStyle.secondary,
            success: elyStyle.success,
            warning: elyStyle.warning,
        };
    }

    /**
     * Свой стиль
     * @param name
     */
    public static custom(name: string): elyStyle {
        return new elyStyle(name);
    }

    /**
     * Возвраща стиль по имени
     * @param name
     */
    public static byName(name: string): elyStyle {
        return new elyStyle(name);
    }

    /**
     * Значение
     * @ignore
     */
    public value: string;

    /**
     * Конструктор
     * @ignore
     * @param val
     */
    protected constructor(val: string) {
        this.value = val;
    }

    /**
     * Преобразует в строку
     */
    public toStirng() {
        return this.value;
    }
}
