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
 + Файл: ViewLayout.ts                                                        +
 + Файл изменен: 08.03.2019 21:20:52                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ObservableArray from "ely.core/dist/observable/properties/ObservableArray";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View, {ViewOptions} from "../../core/controls/View";
import elyRebuildableViewProtocol from "../protocols/elyRebuildableViewProtocol";

/**
 * Опции {@link ViewLayout}
 */
export interface ViewLayoutOptions extends ViewOptions {
    items?: View[];
    nobuild?: boolean;
}

/**
 * Элемент отображения
 * @class ViewLayout
 * @augments {View}
 */
export default class ViewLayout extends elyRebuildableViewProtocol {

    /**
     * Свойство: элементы отображения
     * @ignore
     * @protected
     */
    protected readonly __itemsProperty: ObservableArray<View>
        = new ObservableArray<View>().change(() => this.rebuild()) as ObservableArray<View>;

    /**
     * Конструктор
     * @param {ViewLayoutOptions} [options] - опции
     */
    public constructor(options: ViewLayoutOptions = {}) {
        super(options);
        this.denyRebuild(true);
        this.add(...(options.items || []));
        this.denyRebuild(false);
        if (!(options.nobuild)) this.rebuild();
    }

    /**
     * Возвращает свойство: элементы отображения
     * @return {ObservableProperty<View[]>}
     */
    public getItemsProperty(): ObservableArray<View> {
        return this.__itemsProperty;
    }

    /**
     * Возвращает элементы отображения
     * @returns {View[]}
     */
    public items(): View[];

    /**
     * Устанавливает элементы отображения
     * @param {View[]} value - значение
     * @returns {this}
     */
    public items(value: View[]): ViewLayout;

    /**
     * Возвращает и устанавливает элементы отображения
     * @param {View[]} [value] - значение
     * @returns {View[]|this|null}
     */
    public items(value?: View[]): View[] | null | ViewLayout {
        return ObservableProperty.simplePropertyAccess(this, value, this.__itemsProperty);
    }

    /**
     * Добавляет элементы
     * @param items
     */
    public add(...items: View[]): ViewLayout {
        items.forEach(value => this.getItemsProperty().push(value));
        return this;
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        return {
            ...super.serialize(),
            items: this.items().map(value => value.serialize()),
        };
    }

    /**
     * Выполняет перестроение
     * @private
     */
    protected __rebuild(): elyRebuildableViewProtocol | any {
        this.removeViewContent();
        this.getItemsProperty().forEach(item => {
            this.getDocument().append(item.getDocument());
        });
        return this;
    }
}

/**
 * @typedef {Object} ViewLayoutOptions
 * @property {View[]} [items]
 */
