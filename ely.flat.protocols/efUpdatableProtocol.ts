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
 + Файл: efUpdatableProtocol.ts                                               +
 + Файл изменен: 08.01.2019 00:24:23                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservableBoolean from "@core/observable/properties/elyObservableBoolean";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import {efProtocol} from "@protocols/efProtocol";

/**
 * Протокол обновления
 * @class efUpdatableProtocol
 */
export class efUpdatableProtocol extends efProtocol {

    /**
     * Свойство: флаг разрешения обновления объекта
     * @type {elyObservableBoolean}
     */
    public readonly canUpdateProperty: elyObservableBoolean
        = new elyObservableBoolean(true);

    /**
     * Возвращает флаг разрешения обновления объекта
     * @returns {boolean}
     */
    public canUpdate(): boolean;

    /**
     * Устанавливает флаг разрешения обновления объекта
     * @param {boolean} value - значение
     * @returns {this}
     */
    public canUpdate(value: boolean): efUpdatableProtocol;

    /**
     * Возвращает и устанавливает флаг разрешения обновления объекта
     * @param {boolean} [value] - значение
     * @returns {boolean|this}
     */
    public canUpdate(value?: boolean): boolean | efUpdatableProtocol {
        return elyObservableProperty.simplePropertyAccess(this, value, this.canUpdateProperty);
    }

    /**
     * Обновляет объект
     * @return {this}
     */
    public update(): efUpdatableProtocol {
        if (this.canUpdate())
            this.__updateObject();
        return this;
    }

    /**
     * Обновляет объект
     * @protected
     */
    protected __updateObject(): void {
        throw Error(`Method _updateObject is not implemented in class ${this}!`);
    }

}
