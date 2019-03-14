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
 + Файл: Weight.ts                                                            +
 + Файл изменен: 08.02.2019 02:06:22                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyEnum from "@enums/elyEnum";

/**
 * Толщина ely.flat.application
 * @class Weight
 * @augments {elyEnum<number>}
 */
export default class Weight extends elyEnum<string> {

    /**
     * Стандартная толщина ely.flat.application
     * @type {Weight}
     */
    public static readonly default = new Weight({value: "regular"});

    /**
     * Толщина, используемая общими стандартами
     * @type {Weight}
     */
    public static readonly normal = new Weight({value: "standard"});

    /**
     * Высокая толщина
     * @type {Weight}
     */
    public static readonly fat = new Weight({value: "fat"});

    /**
     * Толщина меньше стандартной
     * @type {Weight}
     */
    public static readonly light = new Weight({value: "light"});

    /**
     * Предельно низкая толщина
     * @type {Weight}
     */
    public static readonly thin = new Weight({value: "thin"});

    /**
     * Свой размер
     * @param value
     * @return {Weight}
     */
    public static custom(value: number): Weight {
        return new Weight({value, custom: true});
    }

    /**
     * Возвращает размер по названию
     * @param {String} value
     * @return {Weight}
     */
    public static byName(value: string): Weight {
        return new Weight({value});
    }

    /**
     * Список
     */
    public static rawList() {
        return {
            default: Weight.default.value,
            fat: Weight.fat.value,
            light: Weight.light.value,
            normal: Weight.normal.value,
            thin: Weight.thin.value,
        };
    }

    /**
     * Список
     */
    public static list() {
        return {
            default: Weight.default,
            fat: Weight.fat,
            light: Weight.light,
            normal: Weight.normal,
            thin: Weight.thin,
        };
    }

    /**
     * Флаг кастомного значения
     */
    public custom: boolean;

    /**
     * Конструктор
     * @ignore
     * @param {value: string | number, custom: boolean} props
     */
    protected constructor(props: { value: string | number, custom?: boolean }) {
        super({value: String(props.value)});
        this.custom = props.custom || false;
    }

    /**
     * Сериализует объект
     * @return {*}
     */
    public serialize(): any {
        return {_item: "Weight", value: this.value, custom: this.custom};
    }
}
