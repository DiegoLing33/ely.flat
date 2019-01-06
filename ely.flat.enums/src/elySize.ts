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
 + Файл: elySize.ts                                                           +
 + Файл изменен: 05.12.2018 23:47:11                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ISize from "@controls/interfaces/ISize";
import elyEnum from "@enums/elyEnum";

/**
 * Размеры ely.flat
 * @class elySize
 * @augments {elyEnum<string>}
 */
export default class elySize extends elyEnum<string> {

    /**
     * Стандартный размер
     * @return elySize
     */
    public static readonly default = new elySize("default");

    /**
     * Основной размер, используемый в ely.flat
     */
    public static readonly regular = new elySize("regular");

    /**
     * Размер во весь блок
     */
    public static readonly fill = new elySize("fill");

    /**
     * Маленький размер
     */
    public static readonly small = new elySize("small");

    /**
     * Средний размер
     */
    public static readonly middle = new elySize("middle");

    /**
     * Большой размер
     */
    public static readonly large = new elySize("large");

    /**
     * Очень большой размер
     */
    public static readonly extraLarge = new elySize("extraLarge");

    /**
     * Очень маленький размер
     */
    public static readonly extraSmall = new elySize("extraSmall");

    /**
     * Свой размер
     * @param value
     */
    public static custom(value: string | number): elySize {
        if (typeof value === "number") value = value.toString() + "px";
        return new elySize(value, true);
    }

    /**
     * Возвращает размер по его названию
     * @param name
     */
    public static byName(name: string): elySize {
        return new elySize(name);
    }

    /**
     * Список
     */
    public static rawList(): ISize {
        return {
            default:    elySize.default.value,
            extraLarge: elySize.extraLarge.value,
            extraSmall: elySize.extraSmall.value,
            fill:       elySize.fill.value,
            large:      elySize.large.value,
            middle:     elySize.middle.value,
            regular:    elySize.regular.value,
            small:      elySize.small.value,
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
     * @param val
     * @param custom
     */
    protected constructor(val: string, custom: boolean = false) {
        super(val);
        this.custom = custom;
    }
}
