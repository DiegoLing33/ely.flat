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
 + Файл: elyDirection.ts                                                +
 + Файл изменен: 28.12.2018 01:05:58                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyEnum from "@enums/elyEnum";

/**
 * Перечисление направлений
 * @class elyDirection
 * @augments {elyEnum<string>}
 */
export default class elyDirection extends elyEnum<string> {

    /**
     * Наверх
     */
    public static readonly up = new elyDirection("top");

    /**
     * Наверх
     */
    public static readonly down = new elyDirection("bottom");

    /**
     * Наверх
     */
    public static readonly top = new elyDirection("top");

    /**
     * Вниз
     */
    public static readonly bottom = new elyDirection("bottom");

    /**
     * Налево
     */
    public static readonly left = new elyDirection("left");

    /**
     * Направо
     */
    public static readonly right = new elyDirection("right");

    /**
     * Список
     */
    public static rawList() {
        return {
            bottom: elyDirection.bottom.value,
            left: elyDirection.left.value,
            right: elyDirection.right.value,
            top: elyDirection.top.value,
        };
    }

    /**
     * Список
     */
    public static list() {
        return {
            bottom: elyDirection.bottom,
            left: elyDirection.left,
            right: elyDirection.right,
            top: elyDirection.top,
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
