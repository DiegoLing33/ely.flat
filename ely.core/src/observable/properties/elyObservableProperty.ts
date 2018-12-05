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
 + Файл: elyObservableProperty.ts                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "../elyObservable";

type elyObservablePropertyHandler<T> = (oldValue: T, newValue: T) => void;

/**
 * Новый обработчик
 */
type elyObservablePropChangeHandler<T> = (value: T, oldVal: T | null) => void;

/**
 * Обрабатываемое значение
 */
export default class elyObservableProperty<T> extends elyObservable {

    /**
     * Простое автоматизированное свойство
     * @param context
     * @param value
     * @param prop
     */
    public static simplePropertyAccess(context: any, value: any, prop: elyObservableProperty<any>): any {
        if (value === undefined) return prop.get();
        prop.set(value);
        return context;
    }

    /**
     * Значение
     */
    protected value: T | null;

    /**
     * Флаг защиты от перезаписи
     * @ignore
     */
    protected isOverwriteProtected: boolean = false;

    /**
     * Конструктор
     * @param defaultValue
     */
    constructor(defaultValue: T | null = null) {
        super();
        this.value = defaultValue;
    }

    /**
     * Возвращает значение
     */
    public get(): T | null;

    /**
     * Возвращает значение или guard если значение null
     * @param guard
     */
    public get(guard: T): T;

    /**
     * Возвращает значение или guard если значение null
     * @param guard
     */
    public get(guard?: T): T | null {
        if ((this.value === undefined || this.value === null) && guard !== null)
            return guard!;
        return this.value;
    }

    /**
     * Устанавливает флаг защиты от перезаписи
     * @param flag
     */
    public overwrite(flag: boolean): elyObservableProperty<T>{
        this.isOverwriteProtected = flag;
        return this;
    }

    /**
     * Устанавливает значение
     * @param value
     */
    public set(value: T): elyObservableProperty<T> {
        if (this.isOverwriteProtected) return this;
        const old = this.value;
        this.value = value;
        this.notificate("change", [old, value]);
        return this;
    }

    /**
     * Возвращает true, если объект null
     */
    public isNull(): boolean {
        return this.value === null || this.value === undefined;
    }

    /**
     * Добавляет наблюдателя за изменением значения
     * @param observer
     * @deprecated
     */
    public addChangeObserver(observer: elyObservablePropertyHandler<T>): elyObservableProperty<T> {
        this.addObserver("change", observer);
        return this;
    }

    /**
     * Добавляет наблюдатель за изменением значения
     * @param observer - наблюдатель {@link elyObservablePropChangeHandler}
     *
     *
     *
     *     // Создание свойства
     *     let observableString = new elyObservableProperty<string>();
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
    public change(observer: elyObservablePropChangeHandler<T>): elyObservableProperty<T> {
        this.addObserver("change", (old: T, nw: T) => {
            observer(nw, old);
        });
        return this;
    }

    /**
     * Преобразует объект в строку
     */
    public toString(): string {
        return this.get() + "";
    }
}
