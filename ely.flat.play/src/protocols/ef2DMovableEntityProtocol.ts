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
 + Файл: ef2DMovableEntityProtocol.ts                                         +
 + Файл изменен: 02.01.2019 04:33:32                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "@core/observable/elyObservable";
import ef2DVector from "@math/ef2DVector";
import ef2DVectorValues from "@math/ef2DVectorValues";
import efGameSettings from "@play/efGameSettings";

/**å
 * Протокол перемещаемых объектов в 2D Tiled
 * @class ef2DMovableEntityProtocol
 * @augments {elyObservable}
 */
export default class ef2DMovableEntityProtocol extends elyObservable {
    /**
     * Абсолютная позиция
     * @protected
     * @ignore
     */
    protected __absolutePosition: ef2DVector = ef2DVector.zero();

    /**
     * Позиция на сетке
     * @protected
     * @ignore
     */
    protected __gridPosition: ef2DVector = ef2DVector.zero();

    public constructor() {
        super();
    }

    /**
     * Устанавливает абсолютную позицию
     * @param point
     */
    public setAbsolutePosition(point: ef2DVectorValues | ef2DVector): void {
        if (point instanceof ef2DVector) point = point.getValues();
        this.__absolutePosition.x(point.x);
        this.__absolutePosition.y(point.y);

        this.__gridPosition.x(Math.floor(point.x / efGameSettings.tileSize));
        this.__gridPosition.y(Math.floor(point.y / efGameSettings.tileSize));
        this.notificate("positionChanged", [this.__absolutePosition, this.__gridPosition]);
    }

    /**
     * Устанавливает позицию по сетке
     * @param point
     */
    public setGridPosition(point: ef2DVectorValues | ef2DVector): void {
        if (point instanceof ef2DVector) point = point.getValues();
        this.__gridPosition.x(point.x);
        this.__gridPosition.y(point.y);

        this.__absolutePosition.x(point.x * efGameSettings.tileSize);
        this.__absolutePosition.y(point.y * efGameSettings.tileSize);
        this.notificate("positionChanged", [this.__absolutePosition, this.__gridPosition]);
    }

    /**
     * Возвращает абсолютную позицию
     */
    public getAbsolutePosition(): ef2DVectorValues {
        return this.__absolutePosition.getValues();
    }

    /**
     * Возвращает позицию по сетке
     */
    public getGridPosition(): ef2DVectorValues {
        return this.__gridPosition.getValues();
    }

    /**
     * Добавляет наблюдатель: изменение позиции объекта
     *
     * Имя обсервера: positionChanged
     *
     * @param o - наблюдатель
     */
    public addPositionChangedObserver(o: (abs: ef2DVector, grid: ef2DVector) => void): ef2DMovableEntityProtocol {
        this.addObserver("positionChanged", o);
        return this;
    }
}
