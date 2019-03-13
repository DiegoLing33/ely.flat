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
 + Файл: elyEnum.ts                                                           +
 + Файл изменен: 06.01.2019 04:55:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Перечисление
 * @class elyEnum
 * @template T
 * @abstract
 */
export default abstract class elyEnum<T> {

    /**
     * Значение
     * @type {T}
     */
    public value: T;

    /**
     * Конструктор
     * @param {{value: T}} props
     */
    protected constructor(props: { value: T }) {
        this.value = props.value;
    }

    /**
     * Преобразование в строку
     * @return {string}
     */
    public toString(): string {
        return String(this.value);
    }

    /**
     * Возвращает true, если объекты одинаковые
     * @param {elyEnum} obj
     * @return {boolean}
     */
    public equals(obj: elyEnum<T>): boolean {
        return this.value === obj.value;
    }
}
