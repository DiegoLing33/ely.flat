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
 + Файл: ProgressBarView.ts                                                   +
 + Файл изменен: 02.03.2019 02:19:54                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Control from "@controls/action/Control";
import ContainerView from "@controls/layout/ContainerView";
import View, {ViewOptions} from "@core/controls/View";
import elyMath from "@core/elyMath";
import {variableAndSet} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";
import Style from "@enums/Style";

/**
 * Опции {@link ProgressBarView}
 */
export interface ProgressBarViewOptions extends ViewOptions {
    progressBarStyle?: Style;
    maxValue?: number;
    minValue?: number;
    value?: number;
}

/**
 * Элемент отображения
 * @class ProgressBarView
 * @augments {View}
 */
export default class ProgressBarView extends View {

    /**
     * Основной элемент
     * @ignore
     * @protected
     */
    protected __bodyView: View = new Control({class: "ef-progress-bar"});

    /**
     * Контейнер
     * @ignore
     * @protected
     */
    protected __progressLineContainer: ContainerView<View> | View
        = new ContainerView<View>(new Control({class: "ef-progress-line"}),
        {class: "ef-progress-container"});

    /**
     * Свойство: стиль полосы бара
     * @ignore
     * @protected
     */
    protected readonly __progressBarStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>()
        .change((value, oldVal) => {
            if (this.getLineViewContainer() instanceof ContainerView) {
                if (oldVal) (this.getLineViewContainer() as ContainerView<any>)
                    .getView().removeClass(`bg-${oldVal.value}`);
                (this.getLineViewContainer() as ContainerView<any>)
                    .getView().addClass(`bg-${value.value}`);
            }
        });

    /**
     * Свойство: максимальное значение
     * @ignore
     * @protected
     */
    protected readonly __maxValueProperty: ObservableProperty<number>
        = new ObservableProperty<number>(100).change(value => {
        if (value < this.minValue()) this.maxValue(this.minValue());
        this.__update();
    });

    /**
     * Свойство: минимальное значение
     * @ignore
     * @protected
     */
    protected readonly __minValueProperty: ObservableProperty<number>
        = new ObservableProperty<number>(0).change(value => {
        if (value > this.minValue()) this.minValue(this.maxValue());
        if (this.value() < value) this.value(this.minValue());
        this.__update();
    });

    /**
     * Свойство: значение шкалы прогресса
     * @ignore
     * @protected
     */
    protected readonly __valueProperty: ObservableProperty<number>
        = new ObservableProperty<number>(0).change(value => {
        if (value > this.maxValue()) this.value(this.maxValue());
        if (value < this.minValue()) this.value(this.minValue());
        this.__update();
    });

    /**
     * Конструктор
     * @param {ProgressBarViewOptions} options - опции
     */
    public constructor(options: ProgressBarViewOptions = {}) {
        super(options);
        this.addClass("ef-progress");
        this.getDocument().append(this.getBodyView().getDocument());
        this.getBodyView().getDocument().append(this.getLineViewContainer().getDocument());
        variableAndSet(options.minValue, this.minValue, this, 0);
        variableAndSet(options.maxValue, this.maxValue, this, 100);
        variableAndSet(options.value, this.value, this, 0);
    }

    /**
     * Возвращает основной элемент, содержащий прогресс баг
     * @return {View}
     */
    public getBodyView(): View {
        return this.__bodyView;
    }

    /**
     * Возвращает контейнер с элементом отображения
     * @return {ContainerView<View>}
     */
    public getLineViewContainer(): ContainerView<View> | View {
        return this.__progressLineContainer;
    }

    /**
     * Возвращает свойство: стиль полосы бара
     * @return {ObservableProperty<Style>}
     */
    public getProgressBarStyleProperty(): ObservableProperty<Style> {
        return this.__progressBarStyleProperty;
    }

    /**
     * Возвращает стиль полосы бара
     * @returns {Style}
     */
    public progressBarStyle(): Style;

    /**
     * Устанавливает стиль полосы бара
     * @param {Style} value - значение
     * @returns {this}
     */
    public progressBarStyle(value: Style): ProgressBarView;

    /**
     * Возвращает и устанавливает стиль полосы бара
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    public progressBarStyle(value?: Style): Style | null | ProgressBarView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__progressBarStyleProperty);
    }

    /**
     * Возвращает свойство: максимальное значение
     * @return {ObservableProperty<number>}
     */
    public getMaxValueProperty(): ObservableProperty<number> {
        return this.__maxValueProperty;
    }

    /**
     * Возвращает максимальное значение
     * @returns {number}
     */
    public maxValue(): number;

    /**
     * Устанавливает максимальное значение
     * @param {number} value - значение
     * @returns {this}
     */
    public maxValue(value: number): ProgressBarView;

    /**
     * Возвращает и устанавливает максимальное значение
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public maxValue(value?: number): number | null | ProgressBarView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__maxValueProperty);
    }

    /**
     * Возвращает свойство: минимальное значение
     * @return {ObservableProperty<number>}
     */
    public getMinValueProperty(): ObservableProperty<number> {
        return this.__minValueProperty;
    }

    /**
     * Возвращает минимальное значение
     * @returns {number}
     */
    public minValue(): number;

    /**
     * Устанавливает минимальное значение
     * @param {number} value - значение
     * @returns {this}
     */
    public minValue(value: number): ProgressBarView;

    /**
     * Возвращает и устанавливает минимальное значение
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public minValue(value?: number): number | null | ProgressBarView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__minValueProperty);
    }

    /**
     * Возвращает свойство: значение шкалы прогресса
     * @return {ObservableProperty<number>}
     */
    public getValueProperty(): ObservableProperty<number> {
        return this.__valueProperty;
    }

    /**
     * Возвращает значение шкалы прогресса
     * @returns {number}
     */
    public value(): number;

    /**
     * Устанавливает значение шкалы прогресса
     * @param {number} value - значение
     * @returns {this}
     */
    public value(value: number): ProgressBarView;

    /**
     * Возвращает и устанавливает значение шкалы прогресса
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public value(value?: number): number | null | ProgressBarView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__valueProperty);
    }

    /**
     * Возвращает процентное соотношение значений
     * @return {number}
     */
    public getPercentage(): number {
        return elyMath.map(this.value(), this.minValue(), this.maxValue(), 0, 100);
    }

    /**
     * Добавляет наблюдатель: при изменении значений прогресс бара
     *
     * Имя обсервера: changed
     *
     * @param {function(value: number, maxValue: number, minValue: number)} o - наблюдатель
     */
    public addChangedObserver(o: (value: number, maxValue: number, minValue: number) => void): ProgressBarView {
        this.addObserver("changed", o);
        return this;
    }

    public serialize(): any {
        return {
            ...super.serialize(),
            maxValue: this.maxValue(),
            minValue: this.minValue(),
            value: this.value(),
        };
    }

    /**
     * Обновляет бар
     * @ignore
     * @private
     */
    protected __update(): void {
        this.notificate("changed", [this.value(), this.maxValue(), this.minValue()]);
        if (this.getLineViewContainer() instanceof ContainerView) {
            (this.getLineViewContainer() as ContainerView<any>).getView().getStyle().width =
                this.getPercentage() + "%";
        }
    }
}

/**
 * @typedef {Object} ProgressBarViewOptions
 * @property {Style} [progressBarStyle]
 * @property {number} [maxValue]
 * @property {number} [minValue]
 * @property {number} [value]
 */
