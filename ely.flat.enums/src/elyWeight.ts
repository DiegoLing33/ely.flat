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
 + Файл: elyWeight.ts                                                         +
 + Файл изменен: 05.12.2018 23:47:11                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import IWeight from "@controls/interfaces/IWeight";

/**
 * Толщина ely.flat
 */
export default class elyWeight {

    /**
     * Стандартная толщина
     */
    public static readonly default = new elyWeight(300);

    /**
     * Основная толщина, используемый в ely.flat
     */
    public static readonly regular = new elyWeight(300);

    /**
     * Толщина, используемая общими стандартами
     */
    public static readonly normal = new elyWeight(400);

    /**
     * Толщина выше нормальной
     */
    public static readonly bold = new elyWeight(700);

    /**
     * Предельная толщина
     */
    public static readonly fat = new elyWeight(900);

    /**
     * Толщина меньше стандартной
     */
    public static readonly light = new elyWeight(200);

    /**
     * Предельно низкая толщина
     */
    public static readonly thin = new elyWeight(100);

    /**
     * Свой размер
     * @param value
     */
    public static custom(value: number): elyWeight {
        return new elyWeight(value);
    }

    /**
     * Список
     */
    public static rawList(): IWeight {
        return {
            bold: elyWeight.bold.value,
            fat: elyWeight.fat.value,
            light: elyWeight.light.value,
            normal: elyWeight.normal.value,
            regular: elyWeight.regular.value,
            thin: elyWeight.thin.value,
        };
    }

    /**
     * Значение
     * @ignore
     */
    public value: number;

    /**
     * Конструктор
     * @ignore
     * @param val
     */
    protected constructor(val: number) {
        this.value = val;
    }

    /**
     * Преобразует в строку
     */
    public toString() {
        return this.value;
    }
}
