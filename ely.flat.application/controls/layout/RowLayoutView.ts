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
 + Файл: RowLayoutViews                                                   +
 + Файл изменен: 09.02.2019 16:35:37                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Control from "@controls/action/Control";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import View, {ViewOptions} from "@core/controls/View";
import {variable} from "@core/Guard";
import ObservableArray from "@core/observable/properties/ObservableArray";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Опции {@link RowLayoutView}
 */
export interface RowLayoutViewOptions extends ViewOptions {
    rowLength?: number;
    rowItemsStaticSize?: boolean;
    items?: View[];
}

/**
 * Элемент отображение строка {@link GridLayoutView}
 * @class efGridLayoutRowView
 * @augments {View}
 */
export default class RowLayoutView extends elyRebuildableViewProtocol {

    /**
     * Элементы отображения
     * @ignore
     * @protected
     */
    protected __views: ObservableArray<View> = new ObservableArray<View>();

    /**
     * Свойство: количество элементов в динамической строке
     * @ignore
     * @protected
     */
    protected readonly __rowLengthProperty: ObservableProperty<number>
        = new ObservableProperty<number>(24);

    /**
     * Свойство: использование статичного размера элементов в строке
     * @ignore
     * @protected
     */
    protected readonly __rowItemsStaticSizeProperty: ObservableProperty<boolean> =
        new ObservableProperty<boolean>(false);

    /**
     * Контейнеры
     * @protected
     * @ignore
     */
    protected __containers: View[] = [];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: RowLayoutViewOptions = {}) {
        super(options);
        this.addClass("ef-row");

        this.__views.change(() => this.rebuild());
        this.__rowLengthProperty.change(() => this.rebuild());
        this.__rowItemsStaticSizeProperty.change(() => this.rebuild());

        this.denyRebuild(true);

        this.rowLength(24);
        this.rowItemsStaticSize(false);

        variable<number>(options.rowLength, () => this.rowLength(options.rowLength!));
        variable<number>(options.rowItemsStaticSize, () => this.rowItemsStaticSize(options.rowItemsStaticSize!));
        variable<View[]>(options.items, () => this.add(...options.items!));

        this.denyRebuild(false);
        this.rebuild();
    }

    /**
     * Возвращает количество элементов в динамической строке
     * @returns {number}
     */
    public rowLength(): number;

    /**
     * Устанавливает количество элементов в динамической строке
     * @param {number} value - значение
     * @returns {this}
     */
    public rowLength(value: number): RowLayoutView;

    /**
     * Возвращает и устанавливает количество элементов в динамической строке
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public rowLength(value?: number): number | null | RowLayoutView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowLengthProperty);
    }

    /**
     * Возвращает использование статичного размера элементов в строке
     * @returns {boolean}
     */
    public rowItemsStaticSize(): boolean;

    /**
     * Устанавливает использование статичного размера элементов в строке
     * @param {boolean} value - значение
     * @returns {this}
     */
    public rowItemsStaticSize(value: boolean): RowLayoutView;

    /**
     * Возвращает и устанавливает использование статичного размера элементов в строке
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public rowItemsStaticSize(value?: boolean): boolean | null | RowLayoutView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowItemsStaticSizeProperty);
    }

    /**
     * Возвращает массив элементов отображения
     * @return {ObservableArray<View>}
     */
    public getViews(): ObservableArray<View> {
        return this.__views;
    }

    /**
     * Добавляет элемент[ы] в строку
     * @param {...View} view
     */
    public add(...view: View[]): RowLayoutView {
        view.forEach(value => this.getViews().push(value));
        return this;
    }

    /**
     * Вставляет элементы в нужную позицию
     * @param index
     * @param view
     */
    public insert(index: number, ...view: View[]): RowLayoutView {
        this.getViews().insert(index, ...view);
        return this;
    }

    /**
     * Возвращает индекс элемента в строке
     * @param {View} view
     * @return {number}
     */
    public indexOf(view: View): number {
        return this.getViews().indexOf(view);
    }

    /**
     * Возвращает true, если в строке существует элемент
     * @param {View} view
     * @return {boolean}
     */
    public contains(view: View): boolean {
        return this.indexOf(view) > -1;
    }

    /**
     * Удаляет элемент
     * @param {View} view
     * @return {this}
     */
    public remove(view: View): RowLayoutView {
        return this.removeIndex(this.indexOf(view));
    }

    /**
     * Удаляет элемент по индексу
     * @param {number} index - индекс элемента в строке
     * @return {this}
     */
    public removeIndex(index: number): RowLayoutView {
        this.getViews().remove(index);
        return this;
    }

    /**
     * Добавляет наблюдатель: элемент будет добавлен, помещенный в контейнер.
     *
     * Аргументы:
     * - Первый аргумент - элемент;
     * - Второй аргумент - контейнер в который уже добавлен элемент.
     *
     * Имя обсервера: itemWillAdd
     *
     * @param o - наблюдатель
     */
    public addItemWillAddObserver(o: (item: View, container: View) => void): RowLayoutView {
        this.addObserver("itemWillAdd", o);
        return this;
    }

    /**
     * Возвращает элемент на сетке
     *
     * @param {number} index
     * @return {View}
     */
    public viewAt(index: number): View | null {
        if (this.getViews().hasIndex(index)) return this.getViews().item(index);
        return null;
    }

    /**
     * Возвращает колонку по индексу. Колонка - контейнер содержит элемент. Элемент
     * можно получить испльзуя метод `{@link RowLayoutView.viewAt}`
     *
     * @param {number} index
     * @return {View}
     */
    public columnAt(index: number): View | null {
        if (this.getViews().hasIndex(index)) return this.__containers[index];
        return null;
    }

    /**
     * Выполняет перестроение
     * @ignore
     * @private
     */
    protected __rebuild(): RowLayoutView {
        this.removeViewContent();
        this.__containers = [];
        this.getViews().forEach(item => {
            const container = new Control({class: "ef-col"});
            let containerSize = (1 / this.rowLength()) * 100;
            if (!this.rowItemsStaticSize())
                containerSize = 100 / (this.rowLength() / (this.rowLength() / this.getViews().length()));
            container.getStyle().width = containerSize + "%";
            container.addSubView(item);
            this.__containers.push(container);
            this.notificate("itemWillAdd", [item, container]);
            this.getDocument().append(container.getDocument());
        });
        return this;
    }

}

/**
 * @typedef {Object} RowLayoutViewOptions
 * @property {number} [rowLength = 24]
 * @property {boolean} [rowItemsStaticSize = false]
 * @property {View[]} [items]
 */
