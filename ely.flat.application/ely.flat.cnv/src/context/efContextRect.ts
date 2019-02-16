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
 + Файл: efContextRect.ts                                                     +
 + Файл изменен: 04.01.2019 21:53:18                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efContextElement from "@cnv/context/efContextElement";
import elyColor from "@core/elyColor";
import ef2DRect from "@math/ef2DRect";

/**
 * Прямоугольник `ef.cnv`
 */
export default class efContextRect extends efContextElement {

    /**
     * Цвет заливки
     * @type {elyColor?}
     */
    public fillColor?: elyColor;

    /**
     * Цвет заливки обводки
     * @type {elyColor?}
     */
    public strokeColor?: elyColor;

    /**
     * Толщина линии обводки
     * @type {number}
     */
    public strokeWidth: number = 1;

    /**
     * Конструктор
     * @param {{rect: ef2DRect, fillColor?: elyColor,
     * strokeColor?: elyColor, strokeWidth?: number, angle?: number}} props - параметры
     */
    public constructor(props: {
        rect: ef2DRect,
        fillColor?: elyColor,
        strokeColor?: elyColor,
        strokeWidth?: number,
        angle?: number,
    }) {
        super(props);
        this.strokeColor = props.strokeColor || undefined;
        this.fillColor = props.fillColor || undefined;
        this.strokeWidth = props.strokeWidth === undefined ? 1 : props.strokeWidth;
    }
}
