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
 + Файл: efContextText.ts                                                     +
 + Файл изменен: 04.01.2019 22:16:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efContextElement from "@cnv/context/efContextElement";
import efSize from "@cnv/objs/efSize";
import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";

/**
 * Текст `ef.cnv`
 */
export default class efContextText extends efContextElement {

    /**
     * Текст
     */
    public text: string;

    /**
     * Шрифт
     */
    public font: { size: number, fontName: string } = {size: 14, fontName: "Arial"};

    /**
     * Цвет заливки текста
     */
    public fillColor?: string;

    /**
     * Цвет обводки текста
     */
    public strokeColor?: string;

    /**
     * Толщина линии обводки текста
     */
    public strokeWidth?: number = 1;

    /**
     * Вырванивание по центру
     */
    public alignCenter?: boolean = false;

    /**
     * Максимальная ширина
     */
    public maxWidth?: number;

    /**
     * Расстояние между линиями
     */
    public lineSpacing: number = 5;

    /**
     * Конструктор
     * @param {{ text: string, vector: ef2DVectorValues, font?: { size: number, fontName: string }, fillColor?: string,
     * strokeColor?: string, strokeWidth?: number, alignCenter?: number, maxWidth?: number,
     * lineSpacing?: number }} props
     */
    public constructor(props: {
        text: string, vector: ef2DVectorValues, font?: { size: number, fontName: string },
        fillColor?: string, strokeColor?: string, strokeWidth?: number, alignCenter?: boolean, maxWidth?: number,
        lineSpacing?: number,
    }) {
        super({...props, size: efSize.zero()});
        this.text = props.text;
        this.fillColor = props.fillColor || undefined;
        this.strokeColor = props.strokeColor || undefined;
        this.strokeWidth = props.strokeWidth === undefined ? 1 : props.strokeWidth;
        this.alignCenter = props.alignCenter || false;
        this.maxWidth = props.maxWidth || undefined;
        this.lineSpacing = props.lineSpacing === undefined ? 5 : props.lineSpacing;
    }
}
