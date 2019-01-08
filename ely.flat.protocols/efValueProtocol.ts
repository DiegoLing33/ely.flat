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
 + Файл: efValueProtocol.ts                                                   +
 + Файл изменен: 07.01.2019 23:36:33                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import {efProtocol} from "@protocols/efProtocol";

/**
 * Протокол элемента ввода
 * @class efValueProtocol
 * @template T
 */
export class efValueProtocol<T> extends efProtocol {

    /**
     * Свойство: значение поля ввода
     * @type {elyObservableProperty<T>}
     */
    public readonly valueProperty: elyObservableProperty<T> = new elyObservableProperty<T>();

    /**
     * Возвращает значение поля ввода
     * @returns {T}
     */
    public value(): T | null;

    /**
     * Устанавливает значение поля ввода
     * @param {T} value - значение
     * @returns {this}
     */
    public value(value: T | null): efValueProtocol<T>;

    /**
     * Возвращает и устанавливает значение поля ввода
     * @param {T|null} [value] - значение
     * @returns {T|this|null}
     */
    public value(value?: T | null): T | null | efValueProtocol<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Очищает значение
     * @return {this}
     */
    public clearValue(): efValueProtocol<T> {
        this.value(null);
        return this;
    }

}
