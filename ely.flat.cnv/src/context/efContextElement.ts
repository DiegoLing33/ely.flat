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

import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";
import efSize from "@cnv/objs/efSize";

/**
 * Элемент контекста `ef.cnv`
 */
export default class efContextElement {

    /**
     * Угол поворота
     */
    public angle?: number;

    /**
     * Вектор положения
     */
    public vector: ef2DVectorValues;

    /**
     * Размер элемента
     */
    public size: efSize;

    /**
     * Фильтр
     */
    public filter?: string;

    /**
     * Конструктор
     * @param {{ vector: ef2DVectorValues, size: efSize, angle?: number, filter?: string }} props - параметры
     */
    public constructor(props: { vector: ef2DVectorValues, size: efSize, angle?: number, filter?: string }) {
        this.vector = props.vector;
        this.size = props.size;
        this.angle = props.angle || undefined;
        this.filter = props.filter || undefined;
    }

}
