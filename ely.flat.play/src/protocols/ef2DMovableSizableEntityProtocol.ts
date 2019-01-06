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
 + Файл: ef2DMovableSizableEntityProtocol.ts                                  +
 + Файл изменен: 06.01.2019 05:57:36                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efSize from "@cnv/objs/efSize";
import ef2DRect from "@math/ef2DRect";
import efGameSettings from "@play/efGameSettings";
import ef2DMovableEntityProtocol from "@play/protocols/ef2DMovableEntityProtocol";

/**
 * Протокол перемещаемого существа с размером
 * @class ef2DMovableSizableEntityProtocol
 * @augments {ef2DMovableEntityProtocol}
 */
export default class ef2DMovableSizableEntityProtocol extends ef2DMovableEntityProtocol {

    /**
     * Размер
     */
    public readonly size: efSize = efSize.zero();

    /**
     * Возвращает прямоугольник камеры
     * @return {ef2DRect}
     */
    public getAbsoluteRect(): ef2DRect {
        return new ef2DRect({
            position: this.getAbsolutePosition(),
            size: new efSize({
                height: this.size.height() * efGameSettings.tileSize,
                width: this.size.width() * efGameSettings.tileSize,
            }),
        });
    }

    /**
     * Возвращает прямоугольник камеры
     * @return {ef2DRect}
     */
    public getGridRect(): ef2DRect {
        return new ef2DRect({
            position: this.getGridPosition(),
            size: new efSize({
                height: this.size.height(),
                width: this.size.width(),
            }),
        });
    }

}
