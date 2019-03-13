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
 + Файл: TabsPanelView.ts                                                     +
 + Файл изменен: 08.03.2019 00:42:13                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Control from "@controls/action/Control";
import WrapperView from "@controls/layout/WrapperView";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import View, {ViewOptions} from "@core/controls/View";
import {isSet, variableAndSet} from "@core/Guard";
import ObservableArray from "@core/observable/properties/ObservableArray";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Опции {@link TabsPanelView}
 */
export interface TabsPanelViewOptions extends ViewOptions {
    tabs?: string[];
    selectedTabIndex?: number;
    panelHover?: boolean;
}

/**
 * Разделитель панели с горизонтальными разделами
 * @class TabsPanelWrapperView
 * @augments {WrapperView}
 */
class TabsPanelWrapperView extends WrapperView {
    /**
     * Конструктор
     */
    public constructor() {
        super();
    }
}

/**
 * Скролл панель панели с горизонтальными разделами
 * @class TabsPanelWrapperView
 * @augments {View}
 */
class TabsPanelScrollView extends View {

    /**
     * Разделитель
     * @ignore
     */
    protected __wrapperView: TabsPanelWrapperView = new TabsPanelWrapperView();

    /**
     * Конструктор
     */
    public constructor() {
        super({class: "--scroll"});
        this.getDocument().append(this.getWrapperView().getDocument());
    }

    /**
     * Возвращает разделитель
     * @return {TabsPanelWrapperView}
     */
    public getWrapperView(): WrapperView {
        return this.__wrapperView;
    }
}

/**
 * Заголовок панели с горизонтальными разделами
 * @class
 * @augments {View}
 */
class TabsPanelHeaderView extends View {

    /**
     * Контейнер
     * @ignore
     */
    protected __scrollView: TabsPanelScrollView = new TabsPanelScrollView();

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.addClass("box-header", "--tabs");
        this.getDocument().append(this.getScrollView().getDocument());
    }

    /**
     * Возвращает scroll контейнер
     * @return {TabsPanelScrollView}
     */
    public getScrollView(): TabsPanelScrollView {
        return this.__scrollView;
    }
}

/**
 * Элемент отображения панели с горизонтальными разделами
 * @class TabsPanelView
 * @augments {View}
 */
export default class TabsPanelView extends elyRebuildableViewProtocol {

    /**
     * Свойство: названия разделов
     * @ignore
     * @protected
     */
    protected readonly __tabsProperty: ObservableArray<string>
        = new ObservableArray<string>().change(() => this.rebuild()) as ObservableArray<string>;

    /**
     * Свойство: индекс выбранного раздела
     * @ignore
     * @protected
     */
    protected readonly __selectedTabIndexProperty: ObservableProperty<number>
        = new ObservableProperty<number>().change(() => this.rebuild());

    /**
     * Свойство: содержимое табов
     * @ignore
     * @protected
     */
    protected readonly __tabsBodyViews: ObservableArray<View>
        = new ObservableArray<View>().change(() => this.rebuild()) as ObservableArray<View>;

    /**
     * Заголовок
     * @ignore
     */
    protected __headerView: TabsPanelHeaderView = new TabsPanelHeaderView();

    /**
     * Контейнер
     * @ignore
     */
    protected __containerView: View = new Control({class: "--container"});

    /**
     * Конструктор
     * @param {TabsPanelViewOptions} options - опции
     */
    public constructor(options: TabsPanelViewOptions = {}) {
        super(options);
        this.addClass("box");
        this.denyRebuild(true);
        variableAndSet(options.tabs, this.tabs, this);
        variableAndSet(options.selectedTabIndex, this.selectedTabIndex, this);
        variableAndSet(options.panelHover, this.panelHover, this, true);

        this.getDocument().append(this.getHeaderView().getDocument());
        this.getDocument().append(this.getContainerView().getDocument());
        this.denyRebuild(false);
        this.rebuild();
    }

    /**
     * Возвращает элемент заголовка
     * @return {TabsPanelHeaderView}
     */
    public getHeaderView(): TabsPanelHeaderView {
        return this.__headerView;
    }

    /**
     * Возвращает контейнер
     * @return {View}
     */
    public getContainerView(): View {
        return this.__containerView;
    }

    /**
     * Возвращает свойство содержимого разделов
     * @return {ObservableArray<View>}
     */
    public getTabsBodyViewsProperty(): ObservableArray<View> {
        return this.__tabsBodyViews;
    }

    /**
     * Устанавливает содержимое раздела по индексу
     * @param {number} index
     * @param {View} body
     */
    public setTabIndexBody(index: number, body: View): TabsPanelView {
        this.getTabsBodyViewsProperty().setItemAtIndex(body, index);
        return this;
    }

    /**
     * Возвращает свойство: названия разделов
     * @return {ObservableProperty<string>}
     */
    public getTabsProperty(): ObservableArray<string> {
        return this.__tabsProperty;
    }

    /**
     * Возвращает свойство: индекс выбранного раздела
     * @return {ObservableProperty<number>}
     */
    public getSelectedTabIndexProperty(): ObservableProperty<number> {
        return this.__selectedTabIndexProperty;
    }

    /**
     * Возвращает индекс выбранного раздела
     * @returns {number}
     */
    public selectedTabIndex(): number;

    /**
     * Устанавливает индекс выбранного раздела
     * @param {number} value - значение
     * @returns {this}
     */
    public selectedTabIndex(value: number): TabsPanelView;

    /**
     * Возвращает и устанавливает индекс выбранного раздела
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public selectedTabIndex(value?: number): number | null | TabsPanelView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__selectedTabIndexProperty);
    }

    /**
     * Возвращает названия разделов
     * @returns {string[]}
     */
    public tabs(): string[];

    /**
     * Устанавливает названия разделов
     * @param {string[]} value - значение
     * @returns {this}
     */
    public tabs(value: string[]): TabsPanelView;

    /**
     * Возвращает и устанавливает названия разделов
     * @param {string[]} [value] - значение
     * @returns {string[]|this|null}
     */
    public tabs(value?: string[]): string[] | null | TabsPanelView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__tabsProperty);
    }

    /**
     * Добавляет наблюдатель: выборе окна
     *
     * Имя обсервера: selected
     *
     * @param {function(index: number, title: string)} o - наблюдатель
     */
    public addSelectedObserver(o: (index: number, title: string) => void): TabsPanelView {
        this.addObserver("selected", o);
        return this;
    }

    /**
     * Возвращает флаг изменения палени при наведении на неё
     * @return {boolean}
     */
    public panelHover(): boolean;

    /**
     * Устанавливает флаг изменения палени при наведении на неё
     * @param {boolean} value - значение
     * @return {this}
     */
    public panelHover(value: boolean): TabsPanelView;

    /**
     * Возвращает и устанавливает флаг изменения палени при наведении на неё
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public panelHover(value?: boolean): boolean | null | TabsPanelView {
        if (value === undefined) return this.hasClass("--hover");
        if (value) this.addClass("--hover");
        else this.removeClass("--hover");
        return this;
    }

    /**
     * Сериализует объект
     * @return {*}
     */
    public serialize(): any {
        return {
            ...super.serialize(),
            tabs: this.tabs(),
        };
    }

    /**
     * Выполняет перестроение
     * @private
     */
    protected __rebuild(): elyRebuildableViewProtocol | any {
        this.getContainerView().removeViewContent();
        const wrapper = this.getHeaderView().getScrollView().getWrapperView();
        wrapper.removeViewContent();
        this.tabs().forEach((tabName, index) => {
            const view = tabName.textView().addClass("--item");
            if (this.selectedTabIndex() === index) {
                view.addClass("--active");
                this.notificate("selected", [index, tabName]);
            } else {
                view.addClickObserver(() => {
                    this.selectedTabIndex(index);
                });
            }
            wrapper.getDocument().append(view.getDocument());
        });
        if (isSet(this.selectedTabIndex())) {
            if (this.getTabsBodyViewsProperty().hasIndex(this.selectedTabIndex())) {
                this.getContainerView().getDocument()
                    .append(this.getTabsBodyViewsProperty().item(this.selectedTabIndex()).getDocument());
            }
        }
        return this;
    }
}

/**
 * @typedef {Object} TabsPanelViewOptions
 * @property {string[]} [tabs]
 * @property {number} [selectedTabIndex]
 * @property {boolean} [panelHover = true]
 */
