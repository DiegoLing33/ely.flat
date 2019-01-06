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
 + Файл: ef2DRect.ts                                                          +
 + Файл изменен: 06.01.2019 05:09:28                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efSize from "@cnv/objs/efSize";
import ef2DVector from "@math/ef2DVector";
import ef2DVectorValues from "@math/ef2DVectorValues";

/**
 * Прямоугольник
 */
export default class ef2DRect {

    /**
     * Размер прямоугольника
     * @type {efSize}
     * @readonly
     */
    public readonly size: efSize;

    /**
     * Положение прямоугольника
     * @type {ef2DVector}
     * @readonly
     */
    public readonly position: ef2DVector;

    /**
     * Конструктор
     * @param {{ position: ef2DVector | ef2DVectorValues, size: efSize }} props
     */
    public constructor(props: { position: ef2DVector | ef2DVectorValues, size: efSize }) {
        this.size = props.size;
        this.position = props.position instanceof ef2DVectorValues ? props.position.getVector() : props.position;
    }

    /**
     * Возвращает вторую точку прямоугольника
     * @return {ef2DVectorValues}
     */
    public getSecondPosition(): ef2DVectorValues {
        return new ef2DVectorValues({
            x: this.position.x() + this.size.width(),
            y: this.position.y() + this.size.height(),
        });
    }

    /**
     * Возвращает центральную позицию прямоугольника
     * @return {ef2DVectorValues}
     */
    public getCenterPosition(): ef2DVectorValues {
        return new ef2DVectorValues({
            x: this.position.x() + (this.size.width() / 2),
            y: this.position.y() + (this.size.height() / 2),
        });
    }

}
