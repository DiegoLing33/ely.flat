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
 + Файл: efSize.ts                                                            +
 + Файл изменен: 28.12.2018 01:18:31                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Observable from "@core/observable/Observable";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Прослушиываемый размер
 */
export default class efSize extends Observable {

    /**
     * Возвращает нулевой размер
     * @return {efSize}
     */
    public static zero(): efSize {
        return new efSize({width: 0, height: 0});
    }

    /**
     * Свойство: ширина
     */
    public readonly widthProperty: ObservableProperty<number> = new ObservableProperty<number>(0);

    /**
     * Свойство: высота
     */
    public readonly heightProperty: ObservableProperty<number> = new ObservableProperty<number>(0);

    /**
     * Конструктор
     * @param {{width: number, height: number}} props
     */
    public constructor(props: { width?: number, height?: number, d?: number } = {width: 0, height: 0}) {
        super();
        if (props.d !== undefined) {
            this.width(props.d || 0);
            this.height(props.d || 0);
        } else {
            this.width(props.width || 0);
            this.height(props.height || 0);
        }

        this.widthProperty.change(value => this.notificate("changed", ["width", value, this.height()]));
        this.heightProperty.change(value => this.notificate("changed", ["height", this.width(), value]));
    }

    /**
     * Возвращает ширина
     * @returns {number}
     */
    public width(): number;

    /**
     * Устанавливает ширина
     * @param {number} value - значение
     * @returns {this}
     */
    public width(value: number): efSize;

    /**
     * Возвращает и устанавливает ширина
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public width(value?: number): number | null | efSize {
        return ObservableProperty.simplePropertyAccess(this, value, this.widthProperty);
    }

    /**
     * Возвращает высота
     * @returns {number}
     */
    public height(): number;

    /**
     * Устанавливает высота
     * @param {number} value - значение
     * @returns {this}
     */
    public height(value: number): efSize;

    /**
     * Возвращает и устанавливает высота
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public height(value?: number): number | null | efSize {
        return ObservableProperty.simplePropertyAccess(this, value, this.heightProperty);
    }

    /**
     * Пропорционально изменяет размер
     * @param s
     */
    public scale(s: number): efSize;

    /**
     * Изменяет размер
     *
     * @param {number} sW   - ширина или общее значение
     * @param {number} [sH] - высота
     * @return {this}
     */
    public scale(sW: number, sH?: number): efSize {
        if (sH === undefined) {
            this.width(this.width() * sW);
            this.height(this.height() * sW);
        } else {
            this.width(this.width() * sW);
            this.height(this.height() * (sH || 0));
        }
        return this;
    }

    /**
     * Добавляет наблюдатель: изменение размера
     *
     * Имя обсервера: changed
     *
     * @param o - наблюдатель
     */
    public addChangeObserver(o: (name: string, width: number, height: number) => void): efSize {
        this.addObserver("changed", o);
        return this;
    }

    /**
     * Преобразует объект в строку
     * @return {string}
     */
    public toString(): string {
        return `efSize{w: ${this.width()}, h: ${this.height()}}`;
    }

}
