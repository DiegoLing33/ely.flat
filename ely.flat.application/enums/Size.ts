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
 + Файл: Size.ts                                                              +
 + Файл изменен: 08.02.2019 01:19:15                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyEnum from "@enums/elyEnum";

/**
 * Размеры ely.flat.application
 * @class Size
 * @augments {elyEnum<string>}
 */
export default class Size extends elyEnum<string> {

    /**
     * Стандартный размер
     * @type {Size}
     */
    public static readonly default = new Size("normal");

    /**
     * Основной размер, используемый в ely.flat
     * @type {Size}
     */
    public static readonly normal = new Size("regular");

    /**
     * Размер во весь блок
     * @type {Size}
     */
    public static readonly fill = new Size("fill");

    /**
     * Маленький размер
     * @type {Size}
     */
    public static readonly small = new Size("small");

    /**
     * Очень маленький размер
     * @type {Size}
     */
    public static readonly xsmall = new Size("xsmall");

    /**
     * Большой размер
     * @type {Size}
     */
    public static readonly large = new Size("large");

    /**
     * Очень большой размер
     * @type {Size}
     */
    public static readonly xlarge = new Size("xlarge");

    /**
     * Огромный размер
     * @type {Size}
     */
    public static readonly xxlarge = new Size("xxlarge");

    /**
     * Свой размер
     * @param {string|number} value
     * @type {Size}
     */
    public static custom(value: string | number): Size {
        if (typeof value === "number") value = value.toString() + "px";
        return new Size(value, true);
    }

    /**
     * Возвращает размер по его названию
     * @param {string} name
     * @return {Size}
     */
    public static byName(name: string): Size {
        return new Size(name);
    }

    /**
     * Список
     * @return {*}
     */
    public static rawList() {
        return {
            default: Size.default.value,
            fill: Size.fill.value,
            large: Size.large.value,
            normal: Size.normal.value,
            small: Size.small.value,
            xlarge: Size.xlarge.value,
            xsmall: Size.xsmall.value,
            xxlarge: Size.xxlarge.value,
        };
    }

    /**
     * Кастомный размер
     * @ignore
     */
    public custom: boolean;

    /**
     * Конструктор
     * @ignore
     * @param {string} val
     * @param {boolean} custom
     */
    protected constructor(val: string, custom: boolean = false) {
        super(val);
        this.custom = custom;
    }
}
