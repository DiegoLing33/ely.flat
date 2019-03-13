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
 + Файл: BoxView.ts                                                           +
 + Файл изменен: 08.03.2019 20:11:59                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import GridLayoutView from "@controls/layout/GridLayoutView";
import View, {ViewOptions} from "@core/controls/View";
import {variableAndSet} from "@core/Guard";

/**
 * Опции {@link BoxView}
 */
export interface BoxViewOptions extends ViewOptions {
    containerView?: GridLayoutView;
    boxHover?: boolean;
}

/**
 * Элемент отображения
 * @class BoxView
 * @augments {View}
 */
export default class BoxView extends View {

    /**
     * Контейнер
     * @ignore
     */
    protected __containerView: GridLayoutView;

    /**
     * Конструктор
     * @param {BoxViewOptions} options - опции
     */
    public constructor(options: BoxViewOptions = {}) {
        super(options);
        this.addClass("box");
        this.__containerView = options.containerView ?
            options.containerView : new GridLayoutView();

        this.getContainerView().addClass("--container");
        this.getDocument().append(this.getContainerView().getDocument());
        variableAndSet(options.boxHover, this.boxHover, this, true);
    }

    /**
     * Возвращает флаг анимации при наведении
     * @return {boolean}
     */
    public boxHover(): boolean;

    /**
     * Устанавливает флаг анимации при наведении
     * @param {boolean} value - значение
     * @return {this}
     */
    public boxHover(value: boolean): BoxView;

    /**
     * Возвращает и устанавливает флаг анимации при наведении
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public boxHover(value?: boolean): boolean | null | BoxView {
        if (value === undefined) return this.hasClass("--hover");
        if (value) this.addClass("--hover");
        else this.removeClass("--hover");
        return this;
    }

    /**
     * Возвращает контейнер элемента
     * @return {GridLayoutView}
     */
    public getContainerView(): GridLayoutView {
        return this.__containerView;
    }

    /**
     * Сериализует элемент
     */
    public serialize(): any {
        return {
            ...super.serialize(),
            containerView: this.getContainerView().serialize(),
        };
    }

}

/**
 * @typedef {Object} BoxViewOptions
 * @property {GridLayoutView} [container] - контейнер
 * @property {boolean} [boxHover] - анимация тени при наведении
 */
