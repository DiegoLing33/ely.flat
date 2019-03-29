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
 + Файл: Field.ts                                                         +
 + Файл изменен: 09.02.2019 14:42:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableBoolean from "ely.core/dist/observable/properties/ObservableBoolean";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View, {ViewOptions} from "../../core/controls/View";
import {efEditableProtocol} from "../../protocols/efEditableProtocol";
import {efErrorDisplayProtocol} from "../../protocols/efErrorDisplayProtocol";
import {efValidatableProtocol} from "../../protocols/efValidatableProtocol";
import {efValueProtocol} from "../../protocols/efValueProtocol";
import Control from "../action/Control";

/**
 * Опции {@link Field}
 */
export interface FieldOptions<T> extends ViewOptions {
    value?: T;
    editable?: boolean;
    placeholder?: string;
}

/**
 * Поле ввода
 * @class Field
 * @template T
 * @augments View
 */
export default class Field<T> extends View implements efValueProtocol<T>, efEditableProtocol, efErrorDisplayProtocol,
    efValidatableProtocol {
    /**
     * Свойство: значение поля ввода
     * @type {ObservableProperty<T>}
     */
    public readonly valueProperty: ObservableProperty<T> = new ObservableProperty<T>();

    /**
     * Свойство: флаг возможности редактирования
     * @type {ObservableBoolean}
     */
    public readonly editableProperty: ObservableBoolean = new ObservableBoolean(true);

    /**
     * Элемент доступа
     * @protected
     * @ignore
     * @readonly
     */
    protected readonly __accessoryView: HTMLInputElement = this.__createAccessory();

    /**
     * Таймер выделения
     * @protected
     * @ignore
     */
    private __markTimer: any | null = null;

    /**
     * Конструктор
     * @param {TextFieldOptions} options
     */
    public constructor(options: FieldOptions<T> = {}) {
        super(options);
        this.getDocument().append(this.getAccessory());

        this.editableProperty.change(value => {
            if (value) {
                this.removeClass("--disabled");
            } else {
                this.addClass("--disabled");
            }
            this.getAccessory().disabled = !value;
        });

        Guard.variableAndSet(options.editable, this.editable, this);
        Guard.variableAndSet(options.placeholder, this.placeholder, this);
    }

    /**
     * Возвращает элемент доступа
     * @return {HTMLInputElement}
     */
    public getAccessory(): HTMLInputElement {
        return this.__accessoryView;
    }

    /**
     * Возвращает значение поля ввода
     * @returns {T}
     */
    public value(): T | null;

    /**
     * Устанавливает значение поля ввода
     * @param {T} value - значение
     * @returns {this}
     */
    public value(value: T | null): Field<T>;

    /**
     * Возвращает и устанавливает значение поля ввода
     * @param {string|null} [value] - значение
     * @returns {string|this|null}
     */
    public value(value?: T | null): T | null | Field<T> {
        return ObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Очищает значение
     * @return {this}
     */
    public clearValue(): Field<T> {
        this.value(null);
        return this;
    }

    /**
     * Возвращает флаг возможности редактирования
     * @returns {boolean}
     */
    public editable(): boolean;

    /**
     * Устанавливает флаг возможности редактирования
     * @param {boolean} value - значение
     * @returns {this}
     */
    public editable(value: boolean): efEditableProtocol;

    /**
     * Возвращает и устанавливает флаг возможности редактирования
     * @param {boolean} [value] - значение
     * @returns {boolean|this}
     */
    public editable(value?: boolean): boolean | efEditableProtocol {
        return ObservableProperty.simplePropertyAccess(this, value, this.editableProperty);
    }

    /**
     * Возвращает текст подсказки ввода
     * @return {string}
     */
    public placeholder(): string;

    /**
     * Устанавливает текст подсказки ввода
     * @param {string} value - значение
     * @return {this}
     */
    public placeholder(value: string): Field<T>;

    /**
     * Возвращает и устанавливает текст подсказки ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public placeholder(value?: string): string | null | Field<T> {
        if (value === undefined) return this.getAccessory().placeholder;
        this.getAccessory().placeholder = value;
        return this;
    }

    /**
     * Добавляет наблюдатель: изменения значения
     *
     * Имя обсервера: change
     *
     * @param {function(value: T, oldVal: T)} o - наблюдатель
     */
    public change(o: (value: T, oldVal?: T) => void): Field<T> {
        this.valueProperty.change(o);
        return this;
    }

    /**
     * Помечает объект как неисправный
     * @param {boolean} flag
     * @return {this}
     */
    public error(flag: boolean): efErrorDisplayProtocol {
        if (this.__markTimer) {
            clearTimeout(this.__markTimer);
        }
        if (flag) {
            this.addClass("error");
            this.__markTimer = setTimeout(() => {
                this.error(false);
                this.__markTimer = null;
            }, 1500);
        } else {
            this.removeClass("error");
        }
        return this;
    }

    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    public isValid(): boolean {
        return this.isEmpty() === false;
    }

    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return this.value() === null;
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        const obj: any = {};
        if (this.placeholder()) obj.placeholder = this.placeholder();
        if (this.value()) obj.value = this.value();
        return {
            ...super.serialize(),
            ...obj,
            editable: this.editable(),
        };
    }

    /**
     * Фабрикует элемент доступа
     * @private
     * @ignore
     */
    protected __createAccessory(): HTMLInputElement {
        return new Control({tag: "input"}).getDocument() as HTMLInputElement;
    }
}

/**
 * @typedef {Object} FieldOptions
 * @template T
 * @property {T} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 */
