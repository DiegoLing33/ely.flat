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
 + Файл: efGameCanvas.ts                                                      +
 + Файл изменен: 28.12.2018 01:59:15                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efCanvas from "@cnv/efCanvas";
import efCanvasLayer from "@cnv/efCanvasLayer";
import efSize from "@cnv/objs/efSize";

/**
 * Игровой холст
 */
export default class efGameCanvas extends efCanvas {

    /**
     * Слой фона
     * @type {efCanvasLayer}
     */
    public readonly backgroundLayer: efCanvasLayer;

    /**
     * Слой объектов
     * @type {efCanvasLayer}
     */
    public readonly entityLayer: efCanvasLayer;

    /**
     * Слой эффектов
     * @type {efCanvasLayer}
     */
    public readonly foregroundLayer: efCanvasLayer;

    /**
     * Конструктор
     * @param {{size: efSize}} props - параметры
     */
    public constructor(props: { size: efSize }) {
        super({size: props.size});

        this.backgroundLayer = new efCanvasLayer();
        this.entityLayer = new efCanvasLayer();
        this.foregroundLayer = new efCanvasLayer();

        this.layers.push(this.backgroundLayer);
        this.layers.push(this.entityLayer);
        this.layers.push(this.foregroundLayer);
    }

}
