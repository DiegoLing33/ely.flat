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
 + Файл: elyFormView.ts                                                       +
 + Файл изменен: 06.01.2019 20:14:49                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyGridView from "@controls/flex/elyGridView";
import elyFieldProtocol from "@controls/protocols/elyFieldProtocol";
import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";
import elyFlexGridViewOptions from "@options/elyFlexGridViewOptions";
import {efErrorDisplayProtocol} from "@protocols/efErrorDisplayProtocol";
import {hasProtocol} from "@protocols/efProtocol";
import {efValidatableProtocol} from "@protocols/efValidatableProtocol";
import {efValueProtocol} from "@protocols/efValueProtocol";

/**
 * Опции
 * @type {elyFlexGridViewOptions}
 */
export interface elyFromViewOptions extends elyFlexGridViewOptions {
    checkEmpty?: boolean;
    checkValidation?: boolean;
    detectSubmitButton?: boolean;
}

/**
 * Форма
 * @class elyFormView
 * @augments {elyGridView}
 */
export class elyFormView extends elyView {

    /**
     * Элементы формы
     * @type {elyObservableDictionary<elyView>}
     */
    public readonly accessories: elyObservableDictionary<elyView> = new elyObservableDictionary<elyView>();

    /**
     * Свойство: флаг проверки полей на пустоту
     * @ignore
     * @protected
     */
    protected __checkEmpty: boolean = true;

    /**
     * Сетка
     * @protected
     * @readonly
     * @type {elyGridView}
     */
    protected readonly __gridView: elyGridView;

    /**
     * Свойство: флаг автоматического определения кнопки submit
     * @ignore
     * @protected
     */
    protected __detectSubmitButton: boolean = true;

    /**
     * Форма в процессе
     * @type {boolean}
     * @protected
     */
    protected __inProgress: boolean = false;

    /**
     * Свойство: флаг проверки валидации
     * @ignore
     * @protected
     */
    protected __checkValidation: boolean = true;

    /**
     * Конструктор
     * @param {elyFlexGridViewOptions} props - параметры
     */
    public constructor(props: elyFromViewOptions = {}) {
        super({});
        this.__gridView = new elyGridView(props);
        this.__checkEmpty = props.checkEmpty === undefined ? true : props.checkEmpty;
        this.__checkValidation = props.checkValidation === undefined ? true : props.checkValidation;
        this.__detectSubmitButton = props.detectSubmitButton === undefined ? true : props.detectSubmitButton;

        this.addClass("ef-form");
        this.getDocument().append(this.__gridView.getDocument());
    }

    /**
     * Добавляет элементы
     * @param {*} items
     */
    public add(items: { [name: string]: elyView }): elyFormView {
        elyUtils.forEach(items, (index, value) => {
            this.accessories.add(index, value);
            if (index === "submit" && value instanceof elyButton)
                value.click(() => this.submit());
        });
        this.__gridView.add(...elyUtils.values(items));
        return this;
    }

    /**
     * Подтвержает форму
     * @param callback
     */
    public submit(callback?: (
        values: { [name: string]: any } | null,
        error: { name: string, field: efValueProtocol<any>, message: string } | null,
    ) => void): elyFormView {
        if (this.__inProgress) return this;
        this.__inProgress = true;
        const values: { [name: string]: any } = {};
        let error = null;
        this.forEachAccessoryField((name, field) => {
            let val = null;
            if (hasProtocol<efValidatableProtocol>(field, efValidatableProtocol)) {
                if (this.checkEmpty() && field.isEmpty()) {
                    error = {name, field, message: "empty"};
                    if (hasProtocol<efErrorDisplayProtocol>(field, efErrorDisplayProtocol)) field.error(true);
                } else if (this.checkValidation() && !field.isValid()) {
                    error = {name, field, message: "invalid"};
                    if (hasProtocol<efErrorDisplayProtocol>(field, efErrorDisplayProtocol)) field.error(true);
                } else {
                    val = field.value();
                }
            } else {
                val = field.value();
            }
            values[name] = val;
        });
        this.__inProgress = false;
        this.notificate("submit", [error ? null : values, error]);
        if (callback) callback(error ? null : values, error);
        return this;
    }

    /**
     * Добавляет наблюдатель: подтверждение формы
     *
     * Имя обсервера: submit
     *
     * @param {{function(values: *, error: {name: string, field: elyFieldProtocol<*>, message: string})}} o
     */
    public addSubmitObserver(o: (
        values: { [name: string]: any },
        error: { name: string, field: elyFieldProtocol<any>, message: string } | null,
    ) => void)
        : elyFormView {
        this.addObserver("submit", o);
        return this;
    }

    /**
     * Возвращает флаг автоматического определения кнопки submit
     * @return {boolean}
     */
    public detectSubmitButton(): boolean;

    /**
     * Устанавливает флаг автоматического определения кнопки submit
     * @param {boolean} value - значение
     * @return {this}
     */
    public detectSubmitButton(value: boolean): elyFormView;

    /**
     * Возвращает и устанавливает флаг автоматического определения кнопки submit
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public detectSubmitButton(value?: boolean): boolean | null | elyFormView {
        if (value === undefined) return this.__detectSubmitButton;
        this.__detectSubmitButton = value;
        return this;
    }

    /**
     * Возвращает флаг проверки полей на пустоту
     * @return {boolean}
     */
    public checkEmpty(): boolean;

    /**
     * Устанавливает флаг проверки полей на пустоту
     * @param {boolean} value - значение
     * @return {this}
     */
    public checkEmpty(value: boolean): elyFormView;

    /**
     * Возвращает и устанавливает флаг проверки полей на пустоту
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public checkEmpty(value?: boolean): boolean | null | elyFormView {
        if (value === undefined) return this.__checkEmpty;
        this.__checkEmpty = value;
        return this;
    }

    /**
     * Цикл по всем элементам формы
     * @param {{function(name: string, view: elyView)}} callback
     */
    public forEachAccessory(callback: (name: string, view: elyView) => void) {
        this.accessories.forEach((key, value) => {
            callback(key, value);
        });
    }

    /**
     * Цикл по всем полям формы
     * @param {{function(name: string, field: efValueProtocol<*>)}} callback
     */
    public forEachAccessoryField(callback: (name: string, field: efValueProtocol<any>) => void) {
        this.forEachAccessory((name, view) => {
            if (hasProtocol<efValueProtocol<any>>(view, efValueProtocol)) {
                callback(name, view);
            }
        });
    }

    /**
     * Возвращает флаг проверки валидации
     * @return {boolean}
     */
    public checkValidation(): boolean;

    /**
     * Устанавливает флаг проверки валидации
     * @param {boolean} value - значение
     * @return {this}
     */
    public checkValidation(value: boolean): elyFormView;

    /**
     * Возвращает и устанавливает флаг проверки валидации
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public checkValidation(value?: boolean): boolean | null | elyFormView {
        if (value === undefined) return this.__checkValidation;
        this.__checkValidation = value;
        return this;
    }

}
