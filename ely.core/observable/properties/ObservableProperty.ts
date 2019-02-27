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
 + Файл: ObservableProperty                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {isNone, isSet} from "../../Guard";
import Observable from "../Observable";

/**
 * Новый обработчик
 */
type ObservablePropChangeHandler<T> = (value: T, oldVal?: T) => void;

/**
 * Обрабатываемое значение
 * @class ObservableProperty
 * @template T
 * @augments Observable
 */
export default class ObservableProperty<T> extends Observable {

    /**
     * Простое автоматизированное свойство
     * @param context
     * @param value
     * @param prop
     */
    public static simplePropertyAccess(context: any, value: any, prop: ObservableProperty<any>): any {
        if (!isSet(value)) return prop.get(null);
        prop.set(value);
        return context;
    }

    /**
     * Значение
     * @protected
     * @type {T}
     */
    protected value: T | null;

    /**
     * Флаг защиты от перезаписи
     * @ignore
     * @protected
     * @type {boolean}
     */
    protected isOverwriteProtected: boolean = false;

    /**
     * Конструктор
     * @param {T|null} defaultValue
     */
    constructor(defaultValue: T | null = null) {
        super();
        /**
         * @protected
         * @type {T}
         */
        this.value = defaultValue || null;
    }

    /**
     * Возвращает значение
     * @return {T|null}
     * @deprecated не рекомендовано использовать метод `get()` без
     * `guard` значения!
     *
     * Внимание. Пометка deprecated к данному методу не говорит о его ближайшем
     * сокращении. Только лишь о безопасности.
     */
    public get(): T | null;

    /**
     * Возвращает значение или guard если значение null
     * @param {T} guard
     * @return {T}
     */
    public get(guard: T): T;

    /**
     * Возвращает значение или guard если значение null.
     *
     * Данный метод никогда не возвращает значение null. В случае, если значение
     * прослушиваемого параметра null или undefined, возвращает `guard` значение.
     *
     * @param {T} [guard]
     * @return {T}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get( "test" ) ); // test
     *
     *
     */
    public get(guard?: T): T | null {
        if (this.isNull() && guard !== null) return guard!;
        else if (this.isNull()) return null;

        return this.value;
    }

    /**
     * Устанавливает флаг защиты от перезаписи.
     *
     * @param {boolean} flag
     * @return {this}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *     prop.set( "Tom" );
     *
     *     // Запрещаем перезапись
     *     prop.overwrite(false);
     *
     *     prop.set( "John" );
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get() ); // Tom
     *
     *
     */
    public overwrite(flag: boolean): ObservableProperty<T> {
        this.isOverwriteProtected = flag;
        return this;
    }

    /**
     * Устанавливает значение и вызывает оповещение `change`, прослушиваемое
     * методом {@link ObservableProperty.change}.
     *
     * @param {T} value
     * @return {this}
     *
     *
     *     // Создаем прослушиваемый параметр
     *     let prop = new ObservableProperty<string>();
     *     prop.set( "Tom" );
     *
     *     // Отображаем в консоль "защищенное" значение (с флагом guard)
     *     console.log( prop.get() ); // Tom
     *
     *
     */
    public set(value: T): ObservableProperty<T> {
        if (this.isOverwriteProtected) return this;
        const old = this.value;
        /**
         * @type {T}
         * @protected
         */
        this.value = value;
        this.notificate("change", [old, value]);
        return this;
    }

    /**
     * Возвращает true, если объект null или undefined.
     * @return {boolean}
     */
    public isNull(): boolean {
        return isNone(this.value);
    }

    /**
     * Добавляет наблюдатель за изменением значения
     * @param {{function(value:T, oldValue:T?)}} observer - наблюдатель
     *
     *
     *
     *     // Создание свойства
     *     let observableString = new ObservableProperty<string>();
     *
     *     observableString.change( value => {
     *          console.log("Set to: " + value);
     *     });
     *
     *     observableString.set("123");
     *     observableString.set("abc");
     *
     *     // Вывод:
     *     // Set to: 123
     *     // Set to: abc
     *
     *
     *
     */
    public change(observer: ObservablePropChangeHandler<T>): ObservableProperty<T> {
        this.addObserver("change", (old: T, nw: T) => {
            observer(nw, old);
        });
        return this;
    }

    /**
     * Преобразует объект в строку
     * @return {string}
     */
    public toString(): string {
        return this.get() + "";
    }
}
