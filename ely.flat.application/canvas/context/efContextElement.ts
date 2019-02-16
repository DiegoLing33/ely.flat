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
 + Файл: efContextElement.ts                                                  +
 + Файл изменен: 04.01.2019 21:55:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ef2DRect from "@math/ef2DRect";

/**
 * Элемент контекста `ef.cnv`
 */
export default class efContextElement {

    /**
     * Угол поворота
     */
    public angle?: number;

    /**
     * Прямоугольник
     */
    public rect: ef2DRect;

    /**
     * Фильтр
     */
    public filter?: string;

    /**
     * Конструктор
     * @param {{ rect: ef2DRect, angle?: number, filter?: string }} props - параметры
     */
    public constructor(props: { rect: ef2DRect, angle?: number, filter?: string }) {
        this.rect = props.rect;
        this.angle = props.angle || undefined;
        this.filter = props.filter || undefined;
    }

}
