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
 + Файл: elyFieldView.ts                                                      +
 + Файл изменен: 08.01.2019 02:43:40                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyTimer from "@core/elyTimer";
import elyObservableBoolean from "@core/observable/properties/elyObservableBoolean";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import {efEditableProtocol} from "@protocols/efEditableProtocol";
import {efErrorDisplayProtocol} from "@protocols/efErrorDisplayProtocol";
import {efValidatableProtocol} from "@protocols/efValidatableProtocol";
import {efValueProtocol} from "@protocols/efValueProtocol";
import elyControl from "@controls/action/elyControl";
import elyCookie from "@core/elyCookie";
import elyUtils from "@core/elyUtils";
import elyColor from "@core/elyColor";
import elyGuard from "@core/elyGuard";

/**
 * Опции {@link elyFieldView}
 * @class elyFieldViewOptions
 * @template T
 */
export interface elyFieldViewOptions<T> {
    /**
     * Значение
     */
    value?: T;

    /**
     * Плейсхолдер для ввода
     */
    placeholder?: string;

    /**
     * Подсказка
     */
    hint?: string;
}

/**
 * Поле ввоода
 * @class elyFieldView
 * @template T
 * @augments {efEditableProtocol}
 * @augments {efValueProtocol<T>}
 * @augments {efErrorDisplayProtocol}
 * @augments {efValidatableProtocol}
 */
export abstract class elyFieldView<T> extends elyView implements efEditableProtocol, efValueProtocol<T>,
    efValidatableProtocol, efErrorDisplayProtocol {

    /**
     * Свойство: значение поля ввода
     * @type {elyObservableProperty<T>}
     */
    public readonly valueProperty: elyObservableProperty<T> = new elyObservableProperty<T>();

    /**
     * Свойство: флаг возможности редактирования
     * @type {elyObservableBoolean}
     */
    public readonly editableProperty: elyObservableBoolean
        = new elyObservableBoolean(true);

    /**
     * Элемент управления
     */
    public readonly accessoryView: elyView;

    /**
     * Свойство: делегает валидации
     * @ignore
     * @protected
     */
    protected __isValidDelegate?: (data: T | null) => boolean;

    /**
     * Таймер
     * @protected
     * @type {elyTimer}
     */
    protected __errorDisplayTimer: elyTimer = new elyTimer({duration: 1500});

    /**
     * Конструктор
     * @param props
     */
    protected constructor(props: elyFieldViewOptions<T> & { accessory: elyView }) {
        super(props);
        this.addClass("ef-field");
        this.__errorDisplayTimer.addEndObserver(() => {
            this.removeClass("error");
        });
        this.__errorDisplayTimer.addStartObserver(() => {
            this.addClass("error");
        });
        this.accessoryView = props.accessory;
        this.getDocument().append(this.accessoryView.getDocument());
        if (props.hint) this.hint(props.hint);
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
    public value(value: T | null): elyFieldView<T>;

    /**
     * Возвращает и устанавливает значение поля ввода
     * @param {T|null} [value] - значение
     * @returns {T|this|null}
     */
    public value(value?: T | null): T | null | elyFieldView<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Очищает значение
     * @return {this}
     */
    public clearValue(): efValueProtocol<T> {
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
    public editable(value: boolean): elyFieldView<T>;

    /**
     * Возвращает и устанавливает флаг возможности редактирования
     * @param {boolean} [value] - значение
     * @returns {boolean|this}
     */
    public editable(value?: boolean): boolean | elyFieldView<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.editableProperty);
    }

    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    public isValid(): boolean {
        if (this.__isValidDelegate) return this.__isValidDelegate(this.value());
        return true;
    }

    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return this.valueProperty.isNull();
    }

    /**
     * Помечает объект как неисправный
     * @param {boolean} flag
     * @return {this}
     */
    public error(flag: boolean): efErrorDisplayProtocol {
        if (flag) this.__errorDisplayTimer.restart();
        else this.__errorDisplayTimer.stop();
        return this;
    }

    /**
     * Возвращает и устанавливает делегает валидации
     * @param {(data: T | null) => boolean} [value] - значение
     * @returns {this}
     */
    public setIsValidDelegate(value: (data: T | null) => boolean): elyFieldView<T> {
        this.__isValidDelegate = value;
        return this;
    }

    /**
     * Возвращает плейслхолдер для ввода
     * @return {string}
     */
    public placeholder(): string;

    /**
     * Устанавливает плейслхолдер для ввода
     * @param {string} value - значение
     * @return {this}
     */
    public placeholder(value: string): elyFieldView<T>;

    /**
     * Возвращает и устанавливает плейслхолдер для ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public placeholder(value?: string): string | null | elyFieldView<T> {
        throw Error(`Method placeholder is not implemented in class ${this}!`);
    }

    /**
     * Добавляет слушатель изменения значения поля
     *
     * @param {function(value: T, oldVal: T | null)} o
     * @param {boolean} clearanceSafe - защита от сброса
     * @return {this}
     */
    public change(o: (value: T, oldVal: T | null) => void, clearanceSafe: boolean = false): elyFieldView<T> {
        if (!clearanceSafe) this.valueProperty.change(o);
        else this.valueProperty.change((nv, ov) => {
            o(nv, ov);
        });
        return this;
    }

    /**
     * Утанавливает подсказку
     * @param {String} hint - подсказка
     * @return {elyView}
     */
    public hint(hint?: string): elyFieldView<T> | string {
        if (hint === undefined) return "";
        const hintView = new elyControl({class: "ef-hint"});
        hintView.getDocument().innerHTML = hint;
        this.elyViewWillDraw(() => {
            this.getDocument().after(hintView.getDocument());
        });
        return this;
    }

    /**
     * Experimental
     *
     * @param name
     */
    public tempData(name: string): void {
        this.change(value => {
            elyCookie.set(`tfd-${name}`, `${value.constructor.name},${value}`, {expires: 5 * 60});
        });
        this.elyViewWillDraw(() => {
            let val = elyCookie.get(`tfd-${name}`) as any;
            if (elyGuard.isNone(val)) return;
            const arr = val.split(",");
            const cns = arr.shift();
            if (cns) {
                if (cns === "elyColor") {
                    val = new elyColor({hex: arr.join(",")});
                } else if (cns === "Number") {
                    val = parseInt(arr.join(","), 10);
                } else {
                    val = arr.join(",");
                }
            }
            this.value(val);
        });
    }
}
