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
 + Файл: efContextImage.ts                                                    +
 + Файл изменен: 04.01.2019 22:07:06                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efContextElement from "@cnv/context/efContextElement";
import ef2DRect from "@math/ef2DRect";

/**
 * Изображение `ef.cnv`
 */
export default class efContextImage extends efContextElement {

    /**
     * Изображение
     */
    public image: CanvasImageSource;

    /**
     * Картинка в картинке
     * @type {ef2DRect}
     */
    public subImage?: ef2DRect;

    /**
     * Конструктор
     * @param {{ rect: ef2DRect, image: CanvasImageSource, subImage?:
     * ef2DRect, angle?: number, filter?: string}} props - параметры
     */
    public constructor(props: {
        rect: ef2DRect,
        image: CanvasImageSource,
        angle?: number,
        filter?: string,
        subImage?: ef2DRect,
    }) {
        super(props);
        this.image = props.image;
        this.subImage = props.subImage || undefined;
    }
}
