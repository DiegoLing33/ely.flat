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
 + Файл: Style.ts                                                             +
 + Файл изменен: 08.02.2019 01:22:49                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyEnum from "@enums/elyEnum";

/**
 * Стили ely.flat.application
 * @class Style
 * @augments {elyEnum}
 */
export default class Style extends elyEnum<string> {

    /**
     * Стандартный стиль
     *
     * Элементарный сброс стиля
     */
    public static readonly default = new Style("default");

    /**
     * Главный стиль
     *
     * Основной стиль подходит для важных элементов.
     */
    public static readonly primary = new Style("primary");

    /**
     * Информативный стиль
     *
     * Основной стиль подходит для отображения информации, которая должна выделяться.
     */
    public static readonly info = new Style("info");

    /**
     * Стиль предупреждения
     *
     * Стиль, особо концентрирующий внимание пользователя.
     */
    public static readonly warning = new Style("warning");

    /**
     * Успешный стиль
     *
     * Стиль, говорящий об успешном завершении действия.
     */
    public static readonly success = new Style("success");

    /**
     * Опасный стиль
     *
     * Стиль, ярко бросающийся в глаза. Подойдет для отметки ошибок.
     */
    public static readonly danger = new Style("danger");

    /**
     * Список
     */
    public static rawList() {
        return {
            danger: Style.danger.value,
            default: Style.default.value,
            info: Style.info.value,
            primary: Style.primary.value,
            success: Style.success.value,
            warning: Style.warning.value,
        };
    }

    /**
     * Свой стиль
     * @param name
     */
    public static custom(name: string): Style {
        return new Style(name);
    }

    /**
     * Возвраща стиль по имени
     * @param name
     */
    public static byName(name: string): Style {
        return new Style(name);
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
