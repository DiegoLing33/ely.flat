/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyFieldProtocol.ts                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyObservableBoolean from "@core/observable/properties/elyObservableBoolean";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyFieldOptions from "@options/fields/elyFieldOptions";

/**
 * Протокол поля ввода данных
 * @class elyFieldProtocol
 * @template T
 * @augments elyView
 * @version 1.2
 *
 * #Лог важных изменений:
 */
export default abstract class elyFieldProtocol<T> extends elyView {
    /**
     * Переменная изменения значения
     * @type {elyObservableProperty<boolean>}
     */
    public editableProperty: elyObservableBoolean = new elyObservableBoolean(true);

    /**
     * Значение
     * @type {elyObservableProperty<{T}>}
     */
    public valueProperty: elyObservableProperty<T> = new elyObservableProperty<T>();

    /**
     * Конструктор
     */
    protected constructor(options: elyFieldOptions<T> = {}) {
        super(options);
    }

    /**
     * Возвращает значение
     * @return {T}
     */
    public value(): T;

    /**
     * Устанавливает значение
     * @param {T} value - значение
     * @return {this}
     */
    public value(value: T): elyFieldProtocol<T>;

    /**
     * Возвращает значение поля или устанавливает его
     * @param {T} [value] - значение
     * @return {this}
     */
    public value(value?: T): elyFieldProtocol<T> | T {
        return elyObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Вовращает значение доступности поля или устанавливает его
     * @param {boolean} [flag] - флаг доступности редактирования
     * @return {elyFieldProtocol|boolean}
     */
    public editable(flag?: boolean): elyFieldProtocol<T> | boolean {
        return elyObservableProperty.simplePropertyAccess(this, flag, this.editableProperty);
    }

    /**
     * Сравнивает значения.
     * Возвращает true, если значения одинаковые.
     *
     * @param {T} value - значения для сравнения
     * @return {boolean}
     */
    public compare(value: T): boolean {
        return this.value() === value;
    }

    /**
     * Очищает значение
     * @return {elyFieldProtocol}
     */
    public clearValue(): elyFieldProtocol<T> {
        return this.value(this.defaultValue());
    }

    /**
     * Возвращает true, если объект пустой.
     * @return {boolean}
     * @abstract
     */
    public abstract isEmpty(): boolean;

    /**
     * Возвращает станлартное значение
     * @abstract
     * @return {T}
     */
    public abstract defaultValue(): T;

    /**
     * Отмечает поле, как поле с ошибкой
     * @param flag
     * @return {this}
     */
    public error(flag: boolean): elyFieldProtocol<T> | any {
        // Nothing is done.
        return this;
    }

    /**
     * Возвращает true, если value идентично стандартному значению.
     *
     * Такой метод необходим в проверке изменения значения, ведь, когда вызывается метод
     * elyField.clearValue(), он активирует изменения valueProperty поля.
     *
     *
     *     let field = new ely.textField();
     *     field.change( (value) => {
     *        if(field.isValueDefault(value) === false){
     *            // Теперь мы уверены, что значение было
     *            // изменено, а не сброшено.
     *        }
     *     });
     *
     *
     *
     * Метод {@link elyFieldProtocol.change} имеет параметр clearanceSafe.
     * Подробнее смотрите {@link elyFieldProtocol.change}.
     * @param {T} value
     * @return {boolean}
     */
    public isValueDefault(value: T): boolean {
        return value === this.defaultValue();
    }

    /**
     * Добавляет слушатель изменения значения поля
     * @param {function(val: T, oldVal: T | null)} o
     * @param {boolean} clearanceSafe - защита от сброса
     *
     * Из примера, указанного в методе {@link elyFieldProtocol.isValueDefault} известно,
     * что сброс значения активирует слушатель. Утсановите параметр clearanceSafe в true, тогда
     * добавленный наблюдатель observer будет немного модифицирован
     * (как описано в {@link elyFieldProtocol.isValueDefault}).
     */
    public change(o: (val: T, oldVal: T | null) => void, clearanceSafe: boolean = false): elyFieldProtocol<T> {
        if (!clearanceSafe) this.valueProperty.change(o);
        else this.valueProperty.change((nv, ov) => {
            if (this.isValueDefault(nv)) return;
            o(nv, ov);
        });
        return this;
    }

    /**
     * Устанавливает строку для преложения ввода
     * @param {string} [text]
     * @return {this|string}
     */
    public placeholder(text?: string): string | null | elyView {
        if (text === undefined) return this.attribute("placeholder");
        return this.attribute("placeholder", text);
    }

    /**
     * Проверет валидность введенных данных
     * @return {boolean}
     * @abstract
     */
    public abstract isValidData(): boolean;

    /**
     * Применяет стандартные опции протокола
     * @param options
     * @protected
     */
    protected applyProtocolOptions(options: elyFieldOptions<T> = {}) {
        this.value((options.value === undefined || options.value === null) ? this.defaultValue() : options.value);
        if (options.placeholder) this.placeholder(options.placeholder);
        if (options.editable) this.editable(options.editable);
        if (options.hint) this.hint(options.hint);
    }
}
