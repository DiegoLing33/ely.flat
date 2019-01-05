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
 + Файл: efOffset.ts                                                          +
 + Файл изменен: 28.12.2018 00:40:39                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "@core/observable/elyObservable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import efDirectionName from "@enums/efDirectionName";

/**
 * Пзиция отступа
 */
export default class efOffset extends elyObservable {

    /**
     * Свойство: положение сверху
     */
    public readonly topProperty: elyObservableProperty<number> = new elyObservableProperty<number>(0);

    /**
     * Свойство: положение снизу
     */
    public readonly bottomProperty: elyObservableProperty<number> = new elyObservableProperty<number>(0);

    /**
     * Свойство: положение слева
     */
    public readonly leftProperty: elyObservableProperty<number> = new elyObservableProperty<number>(0);

    /**
     * Свойство: положение справа
     */
    public readonly rightProperty: elyObservableProperty<number> = new elyObservableProperty<number>(0);

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { top: number, bottom: number, left: number, right: number } = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    }) {
        super();
        this.top(props.top);
        this.left(props.left);
        this.right(props.right);
        this.bottom(props.bottom);
        this.topProperty.change(value =>
            this.notificate("changed", [efDirectionName.top, value, this.bottom(), this.left(), this.right()]));
        this.bottomProperty.change(value =>
            this.notificate("changed", [efDirectionName.bottom, this.top(), value, this.left(), this.right()]));
        this.leftProperty.change(value =>
            this.notificate("changed", [efDirectionName.left, this.top(), this.bottom(), value, this.right()]));
        this.rightProperty.change(value =>
            this.notificate("changed", [efDirectionName.right, this.top(), this.bottom(), this.left(), value]));
    }

    /**
     * Возвращает положение сверху
     * @returns {number}
     */
    public top(): number;

    /**
     * Устанавливает положение сверху
     * @param {number} value - значение
     * @returns {this}
     */
    public top(value: number): efOffset;

    /**
     * Возвращает и устанавливает положение сверху
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public top(value?: number): number | null | efOffset {
        return elyObservableProperty.simplePropertyAccess(this, value, this.topProperty);
    }

    /**
     * Возвращает положение снизу
     * @returns {number}
     */
    public bottom(): number;

    /**
     * Устанавливает положение снизу
     * @param {number} value - значение
     * @returns {this}
     */
    public bottom(value: number): efOffset;

    /**
     * Возвращает и устанавливает положение снизу
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public bottom(value?: number): number | null | efOffset {
        return elyObservableProperty.simplePropertyAccess(this, value, this.bottomProperty);
    }

    /**
     * Возвращает положение слева
     * @returns {number}
     */
    public left(): number;

    /**
     * Устанавливает положение слева
     * @param {number} value - значение
     * @returns {this}
     */
    public left(value: number): efOffset;

    /**
     * Возвращает и устанавливает положение слева
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public left(value?: number): number | null | efOffset {
        return elyObservableProperty.simplePropertyAccess(this, value, this.leftProperty);
    }

    /**
     * Возвращает положение справа
     * @returns {number}
     */
    public right(): number;

    /**
     * Устанавливает положение справа
     * @param {number} value - значение
     * @returns {this}
     */
    public right(value: number): efOffset;

    /**
     * Возвращает и устанавливает положение справа
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public right(value?: number): number | null | efOffset {
        return elyObservableProperty.simplePropertyAccess(this, value, this.rightProperty);
    }

    /**
     * Добавляет наблюдатель: изменение отступа
     *
     * Имя обсервера: changed
     *
     * @param o - наблюдатель
     *
     *
     *     vc.addChangeObserver( (dir, nTop, nBottom, nLeft, nRight) => {
     *        if( dir === efDirectionName.top){
     *          // Изменился top
     *        } // ...
     *     });
     *
     *
     */
    public addChangeObserver(o: (dir: string, nTop: number, nBottom: number,
                                 nLeft: number, nRight: number) => void): efOffset {
        this.addObserver("changed", o);
        return this;
    }
}
