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
 + Файл: ef2DVector.ts                                                        +
 + Файл изменен: 06.01.2019 05:03:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "@core/observable/elyObservable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyAxis from "@enums/elyAxis";
import ef2DVectorValues from "@math/ef2DVectorValues";

/**
 * Прослушиваемый вектор.
 *
 * Используйте метод {@link ef2DVector::addChangeObserver} для прослушивания изменений вектора.
 * @class ef2DVector
 * @augments {elyObservable}
 */
export default class ef2DVector extends elyObservable {

    /**
     * Нулевой вектор
     * @return {ef2DVector}
     */
    public static zero(): ef2DVector {
        return new ef2DVector();
    }

    /**
     * Свойство: ось x
     */
    public readonly xProperty: elyObservableProperty<number> = new elyObservableProperty<number>(0);
    /**
     * Свойство: ось y
     */
    public readonly yProperty: elyObservableProperty<number> = new elyObservableProperty<number>(0);

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { x?: number, y?: number, values?: ef2DVectorValues } = {x: 0, y: 0}) {
        super();
        if (props.values) {
            this.x(props.values.x);
            this.y(props.values.y);
        } else {
            this.x(props.x || 0);
            this.y(props.y || 0);
        }
        this.xProperty.change(value =>
            this.notificate("changed", [elyAxis.x, value, this.y()]));
        this.yProperty.change(value =>
            this.notificate("changed", [elyAxis.y, this.x(), value]));
    }

    /**
     * Возвращает ось x
     * @returns {number}
     */
    public x(): number;

    /**
     * Устанавливает ось x
     * @param {number} value - значение
     * @returns {this}
     */
    public x(value: number): ef2DVector;

    /**
     * Возвращает и устанавливает ось x
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public x(value?: number): number | null | ef2DVector {
        return elyObservableProperty.simplePropertyAccess(this, value, this.xProperty);
    }

    /**
     * Возвращает ось y
     * @returns {number}
     */
    public y(): number;

    /**
     * Устанавливает ось y
     * @param {number} value - значение
     * @returns {this}
     */
    public y(value: number): ef2DVector;

    /**
     * Возвращает и устанавливает ось y
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public y(value?: number): number | null | ef2DVector {
        return elyObservableProperty.simplePropertyAccess(this, value, this.yProperty);
    }

    /**
     * Добавляет наблюдатель: изменение координат
     *
     * Имя обсервера: changed
     *
     * @param o - наблюдатель
     *
     *
     *     vc.addChangeObserver( (dir, nX, nY) => {
     *        if( dir === elyAxis.x){
     *          // Изменился X
     *        } else {
     *          // Изменился Y
     *        }
     *     });
     *
     *
     */
    public addChangeObserver(o: (dir: string, nX: number, nY: number) => void): ef2DVector {
        this.addObserver("changed", o);
        return this;
    }

    /**
     * Преобразует объект в строку
     * @return {string}
     */
    public toString(): string {
        return `ef2DVector{x: ${this.x()}, y: ${this.y()}}`;
    }

    /**
     * Возвращает true, если векторы идентичны
     * @param vector
     */
    public equals(vector: ef2DVector): boolean {
        return this.x() === vector.x() && this.y() === vector.y();
    }

    /**
     * Возвращает константные значения вектора
     */
    public getValues(): ef2DVectorValues {
        return new ef2DVectorValues({point: this});
    }

}
