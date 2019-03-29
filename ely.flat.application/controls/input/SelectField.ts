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
 + Файл: SelectField.ts                                                       +
 + Файл изменен: 14.03.2019 01:36:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableDictionary from "ely.core/dist/observable/properties/ObservableDictionary";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import BoxView from "../content/BoxView";
import ContainerView from "../layout/ContainerView";
import IconView from "../text/IconView";
import Field, {FieldOptions} from "./Field";

/**
 * Опции {@link SelectField}
 */
export interface SelectFieldOptions<T> extends FieldOptions<T> {
    items?: [{ key: string, value: T }] | T[];
    maxHintsCount?: number;
}

/**
 * Элемент подсказок
 */
export class SelectFieldHintView extends BoxView {

    /**
     * Поле
     * @ignore
     */
    protected readonly __field: SelectField<any>;

    /**
     * Конструктор
     * @param field
     */
    constructor(field: SelectField<any>) {
        super({boxHover: false, styleNoSelect: true});
        this.__field = field;

        this.addClass("--hint");
        this.hidden(true);

        this.getField().getAccessory().onfocus = () => this.addClass("--focus");
        this.getField().getAccessory().onblur = () => this.removeClass("--focus");
    }

    /**
     * Обновляет элемент
     * @param {string} q - введенное значение для фильтра подсказок
     * @return {string[]} - результаты поиска
     */
    public update(q: string): string[] {
        q = q || "";
        const results: string[] = [];
        this.width(this.getField().getRect().width - 2);
        this.getContainerView().getRows().clear();
        this.getField().forEachItem((key, value, index) => {
            if (index > this.getField().maxHintsCount()) return;
            if (key.toLowerCase().indexOf(q.toLowerCase()) === -1) return;
            const textView = key.textView();
            this.getContainerView().add(textView);
            this.getContainerView().getRows().last().addClickObserver(() => {
                this.getField().value(value);
            });
            results.push(key);
        });
        return results;
    }

    /**
     * Возвращает поле подсказки
     * @return {SelectField<*>}
     */
    public getField(): SelectField<any> {
        return this.__field;
    }
}

/**
 * Элемент отображения
 * @class SelectField
 * @template {T}
 * @augments {Field<T>}
 */
export default class SelectField<T> extends Field<T> {

    /**
     * Свойство: элементы выбора
     * @ignore
     * @protected
     */
    protected readonly __itemsProperty: ObservableDictionary<T>
        = new ObservableDictionary<T>();

    /**
     * Элемент подсказок
     * @ignore
     */
    protected readonly __hintView: SelectFieldHintView;

    /**
     * Элемент иконки
     * @ignore
     */
    protected readonly __iconContainer: ContainerView<IconView>
        = new ContainerView<IconView>(new IconView({iconName: "search"}));

    /**
     * Свойство: максимальное количество подсказок
     * @ignore
     * @protected
     */
    protected __maxHintsCount: number = 7;

    /**
     * Конструктор
     * @param {SelectFieldOptions} [options] - опции
     */
    public constructor(options: SelectFieldOptions<T> = {}) {
        super(options);

        this.addClass("ef-input", "ef-selection", "with-suffix");

        this.__hintView = new SelectFieldHintView(this);
        this.getIconViewContainer().addClass("ef-input-suffix");
        this.getIconViewContainer().styleClickable(true);
        this.getIconViewContainer().addClickObserver(() => {
            this.__editableLogic();
        });

        this.getHintView().addHiddenChangeObserver(hidden => {
            if (!hidden) this.addClass("--with-hint");
            else this.removeClass("--with-hint");
        });

        this.editable(false);
        this.getAccessory().ondblclick = () => {
            this.__editableLogic();
        };

        this.getAccessory().oninput = (e) => {
            this.search(this.getAccessory().value, true);
        };

        this.valueProperty.change((value, oldVal) => {
            const key = this.getKeyForValue(value);
            if (Guard.isSet(key)) {
                this.getAccessory().value = key!;
                this.__disableLogic();
            }
        });

        this.getDocument().append(this.getIconViewContainer().getDocument());
        this.getDocument().append(this.getHintView().getDocument());

        Guard.variable(options.value, () => this.value(options.value!));
        Guard.variableAndSet(options.items, this.items, this);
        Guard. variableAndSet(options.maxHintsCount, this.maxHintsCount, this, 7);
    }

    /**
     * Устанавливает элементы из массива
     * @param {T[]} arr
     */
    public setItemsByArray(arr: T[]): SelectField<T> {
        const obj: any = {};
        arr.forEach((value, index) => obj[value] = index);
        return this.items(obj);
    }

    /**
     * Возвращает максимальное количество подсказок
     * @return {number}
     */
    public maxHintsCount(): number;

    /**
     * Устанавливает максимальное количество подсказок
     * @param {number} value - значение
     * @return {this}
     */
    public maxHintsCount(value: number): SelectField<T>;

    /**
     * Возвращает и устанавливает максимальное количество подсказок
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public maxHintsCount(value?: number): number | null | SelectField<T> {
        if (value === undefined) return this.__maxHintsCount;
        this.__maxHintsCount = value;
        return this;
    }

    /**
     * Выполняет поиск
     *
     * @param {string} str
     * @param {boolean} [complete = true]
     * @return {SelectField<T>>}
     */
    public search(str: string, complete: boolean = true): SelectField<T> {
        this.getHintView().hidden(false);
        const results = this.getHintView().update(str);
        if (complete && results.length === 1) {
            this.trySelectByKey(results[0]);
        } else if (complete) {
            for (const resKey of results)
                if (str.toLowerCase() === resKey.toLowerCase())
                    this.trySelectByKey(resKey);
        }
        return this;
    }

    /**
     * Устанавливает элемент по его ключу и возвращает результат
     * @param {string} key
     * @return {boolean}
     */
    public trySelectByKey(key: string): boolean {
        const val = this.getValueForKey(key);
        if (Guard.isSet(val)) {
            this.value(val);
            return true;
        }
        return false;
    }

    /**
     * Возвращает элемент отображения подсказок
     * @return {SelectFieldHintView}
     */
    public getHintView(): SelectFieldHintView {
        return this.__hintView;
    }

    /**
     * Возвращает контейнер с иконки
     * @return {ContainerView<IconView>}
     */
    public getIconViewContainer(): ContainerView<IconView> {
        return this.__iconContainer;
    }

    /**
     * Возвращает свойство: элементы выбора
     * @return {ObservableDictionary<T>}
     */
    public getItemsProperty(): ObservableDictionary<T> {
        return this.__itemsProperty;
    }

    /**
     * Возвращает элементы выбора
     * @returns {{T}}
     */
    public items(): { [key: string]: T };

    /**
     * Устанавливает элементы выбора
     * @param {{T}} value - значение
     * @returns {this}
     */
    public items(value: { [key: string]: T } | T[]): SelectField<T>;

    /**
     * Возвращает и устанавливает элементы выбора
     * @param {T} [value] - значение
     * @returns {{T}}|this|null}
     */
    public items(value?: { [key: string]: T } | T[]): { [key: string]: T } | null | SelectField<T> {
        if (value && value instanceof Array) return this.setItemsByArray(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.__itemsProperty);
    }

    /**
     * Добавляет элемент
     * @param {string} key
     * @param {T} value
     * @return {SelectField<T>}
     */
    public addItem(key: string, value: T): SelectField<T> {
        this.getItemsProperty().add(key, value);
        return this;
    }

    /**
     * Цикл по элемента
     * @param {function(key: string, value: T, index: number)} closure
     * @return {SelectField<T>}
     */
    public forEachItem(closure: (key: string, value: T, index: number) => void): SelectField<T> {
        this.getItemsProperty().getSorted((a, b) => a[0] > b[0] ? 1 : -1).forEach(closure);
        return this;
    }

    /**
     * Возвращает ключ для значения
     * @param {T} value
     * @return {string|null}
     */
    public getKeyForValue(value: T): string | null {
        const key = this.getItemsProperty().keyOf(value);
        return Guard.isSet(key) ? key : null;
    }

    /**
     * Возвращает значение для ключа
     * @param {string} key
     * @return {T|null}
     */
    public getValueForKey(key: string): T | null {
        const val = this.getItemsProperty().item(key);
        return Guard.isSet(val) ? val : null;
    }

    /**
     * Логика отключения поля
     * @ignore
     * @private
     */
    protected __disableLogic() {
        this.editable(false);
        this.getHintView().hidden(true);
        this.getIconViewContainer().getView().iconName("search");
        if (Guard.isSet(this.value())) this.getAccessory().value = this.getKeyForValue(this.value()!)!;
        else this.getAccessory().value = "";
    }

    /**
     * Логика редактирования
     * @ignore
     * @private
     */
    protected __editableLogic() {
        if (this.getHintView().hidden()) {
            this.getAccessory().value = "";
            this.editable(true);
            this.getAccessory().focus();
            this.search(this.getAccessory().value);
            this.getIconViewContainer().getView().iconName("times");
        } else {
            this.__disableLogic();
        }
    }
}

/**
 * @typedef {FieldOptions} SelectFieldOptions
 * @template {T}
 * @property {T} [value]
 * @property {string} [placeholder]
 * @property {string} [selectedKey]
 * @property {number} [maxHintsCount]
 * @property {T[]|{{}}} [items]
 */
