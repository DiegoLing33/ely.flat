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
 + Файл: efRowLayoutView.ts                                                   +
 + Файл изменен: 09.02.2019 16:35:37                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

/**
 * Опции {@link efRowLayoutView}
 */
export interface efRowLayoutViewOptions extends elyViewOptions {
    rowLength?: number;
    rowItemsStaticSize?: boolean;
    items?: elyView[];
}

/**
 * Элемент отображение строка {@link efGridLayoutView}
 * @class efGridLayoutRowView
 * @augments {elyView}
 */
export class efRowLayoutView extends elyRebuildableViewProtocol {

    /**
     * Элементы отображения
     * @ignore
     * @protected
     */
    protected __views: elyObservableArray<elyView> = new elyObservableArray<elyView>();

    /**
     * Свойство: количество элементов в динамической строке
     * @ignore
     * @protected
     */
    protected readonly __rowLengthProperty: elyObservableProperty<number>
        = new elyObservableProperty<number>(24);

    /**
     * Свойство: использование статичного размера элементов в строке
     * @ignore
     * @protected
     */
    protected readonly __rowItemsStaticSizeProperty: elyObservableProperty<boolean> =
        new elyObservableProperty<boolean>(false);

    /**
     * Контейнеры
     * @protected
     * @ignore
     */
    protected __containers: elyView[] = [];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: efRowLayoutViewOptions = {}) {
        super(options);
        this.addClass("ef-row");

        this.__views.change(() => this.rebuild());
        this.__rowLengthProperty.change(() => this.rebuild());
        this.__rowItemsStaticSizeProperty.change(() => this.rebuild());

        this.denyRebuild(true);

        this.rowLength(24);
        this.rowItemsStaticSize(false);

        elyGuard.variable<number>(options.rowLength, () =>
            this.rowLength(options.rowLength!));
        elyGuard.variable<number>(options.rowItemsStaticSize, () =>
            this.rowItemsStaticSize(options.rowItemsStaticSize!));
        elyGuard.variable<elyView[]>(options.items, () =>
            this.add(...options.items!));

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
    public rowLength(value: number): efRowLayoutView;

    /**
     * Возвращает и устанавливает количество элементов в динамической строке
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public rowLength(value?: number): number | null | efRowLayoutView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__rowLengthProperty);
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
    public rowItemsStaticSize(value: boolean): efRowLayoutView;

    /**
     * Возвращает и устанавливает использование статичного размера элементов в строке
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public rowItemsStaticSize(value?: boolean): boolean | null | efRowLayoutView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.__rowItemsStaticSizeProperty);
    }

    /**
     * Возвращает массив элементов отображения
     * @return {elyObservableArray<elyView>}
     */
    public getViews(): elyObservableArray<elyView> {
        return this.__views;
    }

    /**
     * Добавляет элемент[ы] в строку
     * @param {...elyView} view
     */
    public add(...view: elyView[]): efRowLayoutView {
        view.forEach(value => this.getViews().push(value));
        return this;
    }

    /**
     * Вставляет элементы в нужную позицию
     * @param index
     * @param view
     */
    public insert(index: number, ...view: elyView[]): efRowLayoutView {
        this.getViews().insert(index, ...view);
        return this;
    }

    /**
     * Возвращает индекс элемента в строке
     * @param {elyView} view
     * @return {number}
     */
    public indexOf(view: elyView): number {
        return this.getViews().indexOf(view);
    }

    /**
     * Возвращает true, если в строке существует элемент
     * @param {elyView} view
     * @return {boolean}
     */
    public contains(view: elyView): boolean {
        return this.indexOf(view) > -1;
    }

    /**
     * Удаляет элемент
     * @param {elyView} view
     * @return {this}
     */
    public remove(view: elyView): efRowLayoutView {
        return this.removeIndex(this.indexOf(view));
    }

    /**
     * Удаляет элемент по индексу
     * @param {number} index - индекс элемента в строке
     * @return {this}
     */
    public removeIndex(index: number): efRowLayoutView {
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
    public addItemWillAddObserver(o: (item: elyView, container: elyView) => void): efRowLayoutView {
        this.addObserver("itemWillAdd", o);
        return this;
    }

    /**
     * Возвращает элемент на сетке
     *
     * @param {number} index
     * @return {elyView}
     */
    public viewAt(index: number): elyView | null {
        if (this.getViews().hasIndex(index)) return this.getViews().item(index);
        return null;
    }

    /**
     * Возвращает колонку по индексу. Колонка - контейнер содержит элемент. Элемент
     * можно получить испльзуя метод `{@link efRowLayoutView.viewAt}`
     *
     * @param {number} index
     * @return {elyView}
     */
    public columnAt(index: number): elyView | null {
        if (this.getViews().hasIndex(index)) return this.__containers[index];
        return null;
    }

    /**
     * Выполняет перестроение
     * @ignore
     * @private
     */
    protected __rebuild(): efRowLayoutView {
        this.removeViewContent();
        this.__containers = [];
        this.getViews().forEach(item => {
            const container = new elyControl({class: "ef-col"});
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
 * @typedef {Object} efRowLayoutViewOptions
 * @property {number} [rowLength = 24]
 * @property {boolean} [rowItemsStaticSize = false]
 * @property {elyView[]} [items]
 */
