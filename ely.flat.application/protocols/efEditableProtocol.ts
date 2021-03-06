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
 + Файл: efEditableProtocol.ts                                                +
 + Файл изменен: 08.01.2019 00:22:10                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ObservableBoolean from "ely.core/dist/observable/properties/ObservableBoolean";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import {efProtocol} from "./efProtocol";

/**
 * Протокол редактируемого объекта
 * @class efEditableProtocol
 */
export class efEditableProtocol extends efProtocol {
    /**
     * Свойство: флаг возможности редактирования
     * @type {ObservableBoolean}
     */
    public readonly editableProperty: ObservableBoolean = new ObservableBoolean(true);

    /**
     * Возвращает флаг возможности редактирования
     * @returns {boolean}
     */
    public editable(): boolean;

    /**
     * Устанавливает флаг возможности редактирования
     * @param {boolean} value - значение
     * @returns {this}
     */
    public editable(value: boolean): efEditableProtocol;

    /**
     * Возвращает и устанавливает флаг возможности редактирования
     * @param {boolean} [value] - значение
     * @returns {boolean|this}
     */
    public editable(value?: boolean): boolean | efEditableProtocol {
        return ObservableProperty.simplePropertyAccess(this, value, this.editableProperty);
    }
}
