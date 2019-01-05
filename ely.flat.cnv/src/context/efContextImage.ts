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
import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";
import efSize from "@cnv/objs/efSize";

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
     * @type {{ vector: ef2DVectorValues, size: efSize }}
     */
    public subImage?: { vector: ef2DVectorValues, size: efSize };

    /**
     * Конструктор
     * @param {{ vector: ef2DVectorValues, size: efSize, image: CanvasImageSource,
     * subImage?: { vector: ef2DVectorValues, size: efSize, angle?: number, filter?: string }}} props - параметры
     */
    public constructor(props: {
        vector: ef2DVectorValues,
        size: efSize,
        image: CanvasImageSource,
        angle?: number,
        filter?: string,
        subImage?: { vector: ef2DVectorValues, size: efSize },
    }) {
        super(props);
        this.image = props.image;
        this.subImage = props.subImage || undefined;
    }
}
