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
import ViewLayout, {ViewLayoutOptions} from "@controls/layout/ViewLayout";
import View from "@core/controls/View";
import {variable} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Опции {@link RowLayoutView}
 */
export interface RowLayoutViewOptions extends ViewLayoutOptions {
    rowLength?: number;
    rowItemsStaticSize?: boolean;
}

/**
 * Элемент отображение строка {@link GridLayoutView}
 * @class efGridLayoutRowView
 * @augments {View}
 */
export default class RowLayoutView extends ViewLayout {

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
        super({...options, nobuild: true});
        this.addClass("ef-row");

        this.__rowLengthProperty.change(() => this.rebuild());
        this.__rowItemsStaticSizeProperty.change(() => this.rebuild());

        this.denyRebuild(true);

        this.rowLength(24);
        this.rowItemsStaticSize(false);

        variable<number>(options.rowLength, () => this.rowLength(options.rowLength!));
        variable<number>(options.rowItemsStaticSize, () => this.rowItemsStaticSize(options.rowItemsStaticSize!));

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
     * Вставляет элементы в нужную позицию
     * @param index
     * @param view
     */
    public insert(index: number, ...view: View[]): RowLayoutView {
        this.getItemsProperty().insert(index, ...view);
        return this;
    }

    /**
     * Возвращает индекс элемента в строке
     * @param {View} view
     * @return {number}
     */
    public indexOf(view: View): number {
        return this.getItemsProperty().indexOf(view);
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
        this.getItemsProperty().remove(index);
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
        if (this.getItemsProperty().hasIndex(index)) return this.getItemsProperty().item(index);
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
        if (this.getItemsProperty().hasIndex(index)) return this.__containers[index];
        return null;
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        const _items: any[] = [];
        this.getItemsProperty().forEach(view => _items.push(view.serialize()));
        return {...super.serialize(), items: _items};
    }

    /**
     * Выполняет перестроение
     * @ignore
     * @private
     */
    protected __rebuild(): RowLayoutView {
        this.removeViewContent();
        this.__containers = [];
        this.getItemsProperty().forEach(item => {
            const container = new Control({class: "ef-col"});
            let containerSize = (1 / this.rowLength()) * 100;
            if (!this.rowItemsStaticSize())
                containerSize = 100 / (this.rowLength() / (this.rowLength() / this.getItemsProperty().length()));
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
 * @typedef {ViewLayoutOptions} RowLayoutViewOptions
 * @property {number} [rowLength = 24]
 * @property {boolean} [rowItemsStaticSize = false]
 */
