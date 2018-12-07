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
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyFieldOptions from "@options/fields/elyFieldOptions";

/**
 * Протокол поля ввода данных
 * @class elyFieldProtocol
 */
export default abstract class elyFieldProtocol<T> extends elyView {
    /**
     * Переменная изменения значения
     */
    public editableProperty: elyObservableProperty<boolean>;

    /**
     * Значение
     */
    public valueProperty: elyObservableProperty<T>;

    /**
     * Конструктор
     */
    protected constructor(options: elyFieldOptions<T> = {}) {
        super(options);
        this.valueProperty = new elyObservableProperty<T>(this.defaultValue());
        this.editableProperty = new elyObservableProperty<boolean>(true);
    }

    /**
     * Возвращает значение
     */
    public value(): T;

    /**
     * Устанавливает значение
     * @param value
     */
    public value(value: T): elyFieldProtocol<T>;

    /**
     * Возвращает значение поля или устанавливает его
     * @param value
     */
    public value(value?: T): elyFieldProtocol<T> | T {
        return elyObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Вовращает значение доступности поля или устанавливает его
     * @param flag
     */
    public editable(flag?: boolean): elyFieldProtocol<T> | boolean {
        return elyObservableProperty.simplePropertyAccess(this, flag, this.editableProperty);
    }

    /**
     * Сравнивает значения.
     * Возвращает true, если значения одинаковые.
     *
     * @param {*} value - значения для сравнения
     * @return {boolean}
     */
    public compare(value: T): boolean {
        return this.value() === value;
    }

    /**
     * Очищает значение
     */
    public clearValue(): elyFieldProtocol<T> {
        return this.value(this.defaultValue());
    }

    /**
     * Возвращает true, если объект пустой.
     * @return boolean
     */
    public abstract isEmpty(): boolean;

    /**
     * Возвращает станлартное значение
     */
    public abstract defaultValue(): T;

    /**
     * Отмечает поле, как поле с ошибкой
     * @param flag
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
     *     field.addChangeValueObserver( (oldValue, newValue) => {
     *        if(field.isValueDefault(newValue) === false){
     *            // Теперь мы уверены, что значение было
     *            // изменено, а не сброшено.
     *        }
     *     });
     *
     *
     *
     * Метод {@link elyFieldProtocol.addChangeValueObserver} имеет параметр clearanceSafe.
     * Подробнее смотрите {@link elyFieldProtocol.addChangeValueObserver}.
     * @param value
     */
    public isValueDefault(value: T): boolean {
        return value === this.defaultValue();
    }

    /**
     * Добавляет слушатель изменения значения поля
     * @param observer
     * @param clearanceSafe - защита от сброса
     *
     * Из примера, указанного в методе {@link elyFieldProtocol.isValueDefault} известно,
     * что сброс значения активирует слушатель. Утсановите параметр clearanceSafe в true, тогда
     * добавленный наблюдатель observer будет немного модифицирован
     * (как описано в {@link elyFieldProtocol.isValueDefault}).
     */
    public addChangeValueObserver(observer: (oldValue: T, newValue: T) => void,
                                  clearanceSafe: boolean = false): elyFieldProtocol<T> {
        if (!clearanceSafe) this.valueProperty.addChangeObserver(observer);
        else this.valueProperty.addChangeObserver((oldValue, newValue) => {
            if (this.isValueDefault(newValue)) return;
            observer(oldValue, newValue);
        });
        return this;
    }

    /**
     * Устанавливает строку для преложения ввода
     * @param text
     */
    public placeholder(text?: string): string | null | elyView {
        if (text === undefined) return this.attribute("placeholder");
        return this.attribute("placeholder", text);
    }

    /**
     * Проверет валидность введенных данных
     */
    public abstract isValidData(): boolean;

    /**
     * Применяет стандартные опции протокола
     * @param options
     */
    protected applyProtocolOptions(options: elyFieldOptions<T> = {}) {
        if (options.value) this.value(options.value);
        if (options.placeholder) this.placeholder(options.placeholder);
        if (options.editable) this.editable(options.editable);
        if (options.hint) this.hint(options.hint);
    }
}
