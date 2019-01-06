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
 + Файл: ef2DGridButch.ts                                                     +
 + Файл изменен: 02.01.2019 04:56:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efSize from "@cnv/objs/efSize";
import ef2DVectorValues from "@math/ef2DVectorValues";

/**
 * Объект сетки
 */
interface ef2DGridButchItem {
    id: number;
}

/**
 * Сетка
 * @class ef2DGridButch
 * @template {T} - содержимое корзины на координатах
 */
export default class ef2DGridButch<T extends ef2DGridButchItem> {

    /**
     * Замер сетки
     */
    public readonly size: efSize;

    /**
     * Данные сетки
     * @ignore
     */
    protected __grid: Array<Array<{ [id: number]: (T | null) }>>;

    /**
     * Констурктор
     * @param props
     */
    public constructor(props: { size: efSize }) {
        this.size = props.size;
        this.__grid = [];
        for (let i = 0; i < this.size.height(); i++) {
            this.__grid[i] = [];
            for (let j = 0; j < this.size.width(); j++) {
                this.__grid[i][j] = {};
            }
        }
    }

    /**
     * Возвращает корзину на сетке
     * @param {ef2DVectorValues} point
     */
    public get(point: ef2DVectorValues): { [id: number]: (T | null) } {
        if (!this.isOutOfGrid(point)) {
            return (this.__grid[point.y] || [])[point.x] || {};
        }
        return {};
    }

    /**
     * Добавляет объект в корзину на сетку
     * @param {ef2DVectorValues} point
     * @param {T} item
     */
    public add(point: ef2DVectorValues, item: T): void {
        if (!this.isOutOfGrid(point)) {
            this.__grid[point.y][point.x][item.id] = item;
        }
    }

    /**
     * Удаляет элемент из корзины на координатах
     * @param {ef2DVectorValues} point
     * @param {T} item
     */
    public remove(point: ef2DVectorValues, item: T): void {
        if (!this.isOutOfGrid(point)) {
            delete this.__grid[point.y][point.x][item.id];
        }
    }

    /**
     * Удаляет элемент из корзины на координатах
     * @param {T} item
     */
    public removeByItem(item: T): void {
        const vec = this.getItemVector(item);
        if (vec) {
            this.remove(vec, item);
        }
    }

    /**
     * Возвращает вектор объекта
     * @param {T} item
     */
    public getItemVector(item: T): ef2DVectorValues | null {
        for (let i = 0; i < this.size.height(); i++) {
            for (let j = 0; j < this.size.width(); j++) {
                for (const id in this.__grid[i][j]) {
                    if (id && typeof id === "number" && id === item.id) {
                        return new ef2DVectorValues({x: j, y: i});
                    }
                }
            }
        }
        return null;
    }

    /**
     * Возвращает true, если точка за пределами сетки
     * @param point
     */
    public isOutOfGrid(point: ef2DVectorValues): boolean {
        const maxX = this.size.width();
        const maxY = this.size.height();
        const pX = point.x;
        const pY = point.y;

        return !(0 <= pX && pX <= 0 + maxX && 0 <= pY && pY <= 0 + maxY);
    }

}
