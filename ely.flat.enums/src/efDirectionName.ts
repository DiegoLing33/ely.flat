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
 + Файл: efDirectionName.ts                                                   +
 + Файл изменен: 28.12.2018 01:05:58                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Перечисление направлений
 */
export default class efDirectionName {

    /**
     * Наверх
     */
    public static readonly up = new efDirectionName("top");

    /**
     * Наверх
     */
    public static readonly down = new efDirectionName("bottom");

    /**
     * Наверх
     */
    public static readonly top = new efDirectionName("top");

    /**
     * Вниз
     */
    public static readonly bottom = new efDirectionName("bottom");

    /**
     * Налево
     */
    public static readonly left = new efDirectionName("left");

    /**
     * Направо
     */
    public static readonly right = new efDirectionName("right");

    /**
     * Список
     */
    public static rawList() {
        return {
            bottom: efDirectionName.bottom.value,
            left: efDirectionName.left.value,
            right: efDirectionName.right.value,
            top: efDirectionName.top.value,
        };
    }

    /**
     * Список
     */
    public static list() {
        return {
            bottom: efDirectionName.bottom,
            left: efDirectionName.left,
            right: efDirectionName.right,
            top: efDirectionName.top,
        };
    }

    /**
     * Значение
     * @ignore
     */
    public readonly value: string;

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
    public toString() {
        return this.value;
    }
}
