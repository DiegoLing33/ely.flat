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
 + Файл: efField.ts                                                           +
 + Файл изменен: 09.02.2019 14:42:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyGuard from "@core/elyGuard";
import elyObservableBoolean from "@core/observable/properties/elyObservableBoolean";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import {efEditableProtocol} from "@protocols/efEditableProtocol";
import {efErrorDisplayProtocol} from "@protocols/efErrorDisplayProtocol";
import {efValidatableProtocol} from "@protocols/efValidatableProtocol";
import {efValueProtocol} from "@protocols/efValueProtocol";

/**
 * Опции {@link efField}
 */
export interface efFieldOptions<T> extends elyViewOptions {
    value?: T;
    editable?: boolean;
    placeholder?: string;
}

/**
 * Поле ввода
 * @class efField
 * @template T
 * @augments elyView
 */
export class efField<T> extends elyView implements efValueProtocol<T>, efEditableProtocol, efErrorDisplayProtocol,
    efValidatableProtocol {
    /**
     * Свойство: значение поля ввода
     * @type {elyObservableProperty<T>}
     */
    public readonly valueProperty: elyObservableProperty<T> = new elyObservableProperty<T>();

    /**
     * Свойство: флаг возможности редактирования
     * @type {elyObservableBoolean}
     */
    public readonly editableProperty: elyObservableBoolean = new elyObservableBoolean(true);

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
     * @param {efTextFieldOptions} options
     */
    public constructor(options: efFieldOptions<T> = {}) {
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

        if (elyGuard.isSet(options.editable)) this.editable(options.editable!);
        if (elyGuard.isSet(options.placeholder)) this.placeholder(options.placeholder!);
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
    public value(value: T | null): efField<T>;

    /**
     * Возвращает и устанавливает значение поля ввода
     * @param {string|null} [value] - значение
     * @returns {string|this|null}
     */
    public value(value?: T | null): T | null | efField<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Очищает значение
     * @return {this}
     */
    public clearValue(): efField<T> {
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
        return elyObservableProperty.simplePropertyAccess(this, value, this.editableProperty);
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
    public placeholder(value: string): efField<T>;

    /**
     * Возвращает и устанавливает текст подсказки ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public placeholder(value?: string): string | null | efField<T> {
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
    public change(o: (value: T, oldVal?: T) => void): efField<T> {
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
     * Фабрикует элемент доступа
     * @private
     * @ignore
     */
    protected __createAccessory(): HTMLInputElement {
        return new elyControl({tag: "input"}).getDocument() as HTMLInputElement;
    }
}

/**
 * @typedef {Object} efFieldOptions
 * @template T
 * @property {T} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 */
