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
 + Файл: ef2DVectorValues.ts                                                  +
 + Файл изменен: 02.01.2019 04:41:50                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ef2DVector from "@cnv/objs/ef2DVector";

/**
 * Векторные константные значения
 * @class ef2DVectorValues
 */
export default class ef2DVectorValues {

    /**
     * Значение по оси X
     */
    public readonly x: number;

    /**
     * Значение по оси Y
     */
    public readonly y: number;

    /**
     * Конструктор
     * @param {{ point?: ef2DVector, x?: number, y?: number }} props
     */
    public constructor(props: { point?: ef2DVector, x?: number, y?: number }) {
        if (props.point) {
            this.x = props.point.x();
            this.y = props.point.y();
        } else {
            this.x = props.x || 0;
            this.y = props.y || 0;
        }
    }

    /**
     * Создает вектор из значений
     */
    public getVector(): ef2DVector {
        return new ef2DVector({values: this});
    }

    /**
     * Преобразует объект в строку
     */
    public toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    /**
     * Возвращает новые значения, умноженные на x,y или на xy
     * @param {{ x?: number, y?: number, xy?: number }} props
     * @return {ef2DVectorValues}
     */
    public getMultiplied(props: { x?: number, y?: number, xy?: number }): ef2DVectorValues {
        if (props.x && props.y) return new ef2DVectorValues({x: this.x * props.x, y: this.y * props.y});
        if (props.xy) return new ef2DVectorValues({x: this.x * props.xy, y: this.y * props.xy});
        return new ef2DVectorValues({x: this.x, y: this.y});
    }

    /**
     * Возвращает новые значения, сумированные с x,y или с xy
     * @param {{ x?: number, y?: number, xy?: number }} props
     * @return {ef2DVectorValues}
     */
    public getAdd(props: { x?: number, y?: number, xy?: number }): ef2DVectorValues {
        if (props.x && props.y) return new ef2DVectorValues({x: this.x + props.x, y: this.y + props.y});
        if (props.xy) return new ef2DVectorValues({x: this.x + props.xy, y: this.y + props.xy});
        return new ef2DVectorValues({x: this.x, y: this.y});
    }
}
