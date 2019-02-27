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
 + Файл: ObservableArray.ts                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


import ObservableProperty from "./ObservableProperty";

type ObservableArrayAddHandler<T> = (newItem: T, index: number) => void;
type ObservableArrayRemoveHandler<T> = (remove: T) => void;
type ObservableArrayClearHandler<T> = () => void;

/**
 * Массив
 * @template T
 * @class ObservableArray
 * @augments ObservableProperty.<T[]>
 */
export default class ObservableArray<T> extends ObservableProperty<T[]> {

    /**
     * Конструктор
     */
    constructor() {
        super([]);
    }

    /**
     * Возвращает массив
     * @return {T[]}
     */
    public get(): T[] {
        return this.value || [];
    }

    /**
     * Регистрирует слушатель добавления нового элемента в массив
     * @param {function(newItem: {T}, index: number)} observer - слушатель
     */
    public addNewItemObserver(observer: ObservableArrayAddHandler<T>): ObservableArray<T> {
        return this.addObserver("add", observer) as ObservableArray<T>;
    }

    /**
     * Регистрирует слушатель изменения элементов массива
     * @param observer - слушатель
     */
    public addChangeItemsObserver(observer: () => void): ObservableArray<T> {
        return this.addObserver("change", observer) as ObservableArray<T>;
    }

    /**
     * Регистрирует слушатель очищения массива
     * @param observer - слушатель
     */
    public addClearObserver(observer: ObservableArrayClearHandler<T>): ObservableArray<T> {
        return this.addObserver("clear", observer) as ObservableArray<T>;
    }

    /**
     * Регистрирует слушатель удаления элемента массива
     * @param observer - слушатель
     */
    public addRemoveObserver(observer: ObservableArrayRemoveHandler<T>): ObservableArray<T> {
        return this.addObserver("remove", observer) as ObservableArray<T>;
    }

    /**
     * Добавляет элемент в массив
     * @param item
     */
    public push(item: T): ObservableArray<T> {
        this.value!.push(item);
        this.notificate("change", [this.get()]);
        this.notificate("add", [item, this.value!.length - 1]);
        return this;
    }

    /**
     * Добавляет элемент в массив по индексу
     * @param {number} index
     * @param {...T} items
     */
    public insert(index: number, ...items: T[]) {
        this.value!.splice(index, 0, ...items);
        this.notificate("change", [this.get()]);
        this.notificate("add", [index, ...items]);
        return this;
    }

    /**
     * Добавляет элемент в массив
     * @param {number} index
     * @return {this}
     */
    public remove(index: number): ObservableArray<T> {
        const item = this.item(index);
        this.value = this.value!.splice(index, 1);
        this.notificate("change", [this.get()]);
        this.notificate("remove", [item]);
        return this;
    }

    /**
     * Удаляет элемент из массива
     * @param {T} item - элемент массива
     * @return {this}
     */
    public removeItem(item: T): ObservableArray<T> {
        const index = this.indexOf(item);
        this.remove(index);
        return this;
    }

    /**
     * Возвращает элемент массива
     * @param {number} index
     */
    public item(index: number): T {
        return this.value![index];
    }

    /**
     * Возвращает последний элемент
     * @return {T}
     */
    public last(): T {
        return this.value![this.value!.length - 1];
    }

    /**
     * Возвращает последний элемент и удаляет его из массива
     * @return {T}
     */
    public pop(): T | null {
        const val = this.items().pop();
        return val === undefined ? null : val;
    }

    /**
     * Возвращает длину массива
     * @return {number}
     */
    public length(): number {
        return this.value!.length;
    }

    /**
     * Возвращает true, если существует индекс
     * @param {number} index
     */
    public hasIndex(index: number): boolean {
        return !!this.value![index];
    }

    /**
     * Возвращает индекс элемента в массиве или -1, если
     * элемент не найден
     * @param {T} item
     */
    public indexOf(item: T): number {
        return this.value!.indexOf(item);
    }

    /**
     * Возвращает true, если массив содержит item
     * @param {T} item
     */
    public hasItem(item: T): boolean {
        return this.indexOf(item) > -1;
    }

    /**
     * Очищает массив
     * @return {this}
     */
    public clear(): ObservableArray<T> {
        this.value = [];
        this.notificate("change", [this.get()]);
        this.notificate("clear", []);
        return this;
    }

    /**
     * Возвращает true, если массив пустой
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return this.length() === 0;
    }

    /**
     * Элементы
     * @return {T[]}
     */
    public items(): T[] {
        return this.value!;
    }

    /**
     * Цикл по элементам массива
     * @param {function(item: T, index: number, items: T[])} callbackfn - обработчик
     */
    public forEach(callbackfn: (item: T, index: number, items: T[]) => void): ObservableArray<T> {
        this.items().forEach((value, index, array) => callbackfn(value, index, array));
        return this;
    }
}
