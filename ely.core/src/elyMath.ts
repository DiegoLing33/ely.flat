/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyMath.ts                                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ef2DVector from "@cnv/objs/ef2DVector";
import efSize from "@cnv/objs/efSize";

/**
 * Библиотека математики
 */
export default class elyMath {

    /**
     * Преобразовывает значение переменной X из одного диапазона в другой.
     *
     * @param x
     * @param inMin
     * @param inMax
     * @param outMin
     * @param outMax
     */
    public static map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    /**
     * Find point after rotation around another point by X degrees
     *
     * @param {Array} point The point to be rotated [X,Y]
     * @param {Array} rotationCenterPoint The point that should be rotated around [X,Y]
     * @param {Number} degrees The degrees to rotate the point
     * @return {Array} Returns point after rotation [X,Y]
     */
    public static rotatePoint(point: number[], rotationCenterPoint: number[], degrees: number): ef2DVector {
        // Using radians for this formula
        const radians = degrees * Math.PI / 180;

        // Translate the plane on which rotation is occurring.
        // We want to rotate around 0,0. We'll add these back later.
        point[0] -= rotationCenterPoint[0];
        point[1] -= rotationCenterPoint[1];

        // Perform the rotation
        const newPoint = [];
        newPoint[0] = point[0] * Math.cos(radians) - point[1] * Math.sin(radians);
        newPoint[1] = point[0] * Math.sin(radians) + point[1] * Math.cos(radians);

        // Translate the plane back to where it was.
        newPoint[0] += rotationCenterPoint[0];
        newPoint[1] += rotationCenterPoint[1];

        return new ef2DVector({x: newPoint[0], y: newPoint[1]});
    }

    /**
     * Find the vertices of a rotating rectangle
     *
     * @param {Array} position From left, top [X,Y]
     * @param {Array} size Lengths [X,Y]
     * @param {Number} degrees Degrees rotated around center
     * @return {Object} Arrays LT, RT, RB, LB [X,Y]
     */
    public static findRectVertices(position: ef2DVector, size: efSize, degrees: number) {
        const left = position.x();
        const right = position.x() + size.width();
        const top = position.y();
        const bottom = position.y() + size.height();

        const center = [right - left, bottom - top];
        const LT = [left, top];
        const RT = [right, top];
        const RB = [right, bottom];
        const LB = [left, bottom];

        return {
            LB: elyMath.rotatePoint(LB, center, degrees),
            LT: elyMath.rotatePoint(LT, center, degrees),
            RB: elyMath.rotatePoint(RB, center, degrees),
            RT: elyMath.rotatePoint(RT, center, degrees),
        };
    }

    /**
     * Distance formula
     *
     * @param {Array} p1 First point [X,Y]
     * @param {Array} p2 Second point [X,Y]
     * @return {Number} Returns distance between points
     */
    public static distance(p1: ef2DVector, p2: ef2DVector): number {
        return Math.sqrt(Math.pow(p1.x() - p2.x(), 2) + Math.pow(p1.y() - p2.y(), 2));
    }

    /**
     * Heron's formula (triangle area)
     *
     * @param {Number} d1 Distance, side 1
     * @param {Number} d2 Distance, side 2
     * @param {Number} d3 Distance, side 3
     * @return {Number} Returns area of triangle
     */
    public static triangleArea(d1: number, d2: number, d3: number): number {
        // See https://en.wikipedia.org/wiki/Heron's_formula
        const s = (d1 + d2 + d3) / 2;
        return Math.sqrt(s * (s - d1) * (s - d2) * (s - d3));
    }

    /**
     * Determine if a click hit a rotated rectangle
     *
     * @param {Array} check Click position [X,Y]
     * @param {Array} position Rect from left, top [X,Y]
     * @param {Array} size Rect size as lengths [X,Y]
     * @param {Number} degrees Degrees rotated around center
     * @return {Boolean} Returns true if hit, false if miss
     */
    public static checkPointInRect(check: ef2DVector, position: ef2DVector, size: efSize, degrees: number) {
        // Find the area of the rectangle
        // Round to avoid small JS math differences
        const rectArea = Math.round(size.width() * size.height());

        // Find the vertices
        const vertices = elyMath.findRectVertices(position, size, degrees);

        // Create an array of the areas of the four triangles
        let triArea: number[]|number = [
            // Click, LT, RT
            elyMath.triangleArea(
                elyMath.distance(check, vertices.LT),
                elyMath.distance(vertices.LT, vertices.RT),
                elyMath.distance(vertices.RT, check),
            ),
            // Click, RT, RB
            elyMath.triangleArea(
                elyMath.distance(check, vertices.RT),
                elyMath.distance(vertices.RT, vertices.RB),
                elyMath.distance(vertices.RB, check),
            ),
            // Click, RB, LB
            elyMath.triangleArea(
                elyMath.distance(check, vertices.RB),
                elyMath.distance(vertices.RB, vertices.LB),
                elyMath.distance(vertices.LB, check),
            ),
            // Click, LB, LT
            elyMath.triangleArea(
                elyMath.distance(check, vertices.LB),
                elyMath.distance(vertices.LB, vertices.LT),
                elyMath.distance(vertices.LT, check),
            ),
        ];

        // Reduce this array with a sum function
        // Round to avoid small JS math differences
        triArea = Math.round(triArea.reduce((a: number, b: number) => {
            return a + b;
        }, 0));

        // Finally do that simple thing we visualized earlier
        return triArea > rectArea;

    }
}
