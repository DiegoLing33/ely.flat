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
 + Файл: elyObservableArray.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

type elyObservableArrayAddHandler<T> = (newItem: T, index: number) => void;
type elyObservableArrayRemoveHandler<T> = (remove: T) => void;
type elyObservableArrayClearHandler<T> = () => void;

import elyObservableProperty from "./elyObservableProperty";

/**
 * Массив
 */
export default class elyObservableArray<T> extends elyObservableProperty<T[]> {

    /**
     * Конструктор
     */
    constructor() {
        super([]);
    }

    /**
     * Возвращает массив
     */
    public get(): T[] {
        return this.value || [];
    }

    /**
     * Регистрирует слушатель добавления нового элемента в массив
     * @param observer - слушатель
     */
    public addNewItemObserver(observer: elyObservableArrayAddHandler<T>): elyObservableArray<T> {
        return this.addObserver("add", observer) as elyObservableArray<T>;
    }

    /**
     * Регистрирует слушатель изменения элементов массива
     * @param observer - слушатель
     */
    public addChangeItemsObserver(observer: () => void): elyObservableArray<T> {
        return this.addObserver("change", observer) as elyObservableArray<T>;
    }

    /**
     * Регистрирует слушатель очищения массива
     * @param observer - слушатель
     */
    public addClearObserver(observer: elyObservableArrayClearHandler<T>): elyObservableArray<T> {
        return this.addObserver("clear", observer) as elyObservableArray<T>;
    }

    /**
     * Регистрирует слушатель удаления элемента массива
     * @param observer - слушатель
     */
    public addRemoveObserver(observer: elyObservableArrayRemoveHandler<T>): elyObservableArray<T> {
        return this.addObserver("remove", observer) as elyObservableArray<T>;
    }

    /**
     * Добавляет элемент в массив
     * @param item
     */
    public push(item: T): elyObservableArray<T> {
        this.value!.push(item);
        this.notificate("change");
        this.notificate("add", [item, this.value!.length - 1]);
        return this;
    }

    /**
     * Добавляет элемент в массив по индексу
     * @param index
     * @param items
     */
    public insert(index: number, ...items: T[]) {
    this.value!.splice(index, 0, ...items);
        this.notificate("change");
        this.notificate("add", [index, ...items]);
        return this;
    }

    /**
     * Добавляет элемент в массив
     * @param index
     */
    public remove(index: number): elyObservableArray<T> {
        const item = this.item(index);
        this.value = this.value!.splice(index, 1);
        this.notificate("change");
        this.notificate("remove", [item]);
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
     */
    public last(): T{
        return this.value![this.value!.length-1];
    }

    /**
     * Возвращает длину массива
     */
    public length(): number {
        return this.value!.length;
    }

    /**
     * Возвращает true, если существует индекс
     * @param index
     */
    public hasIndex(index: number): boolean{
        return !!this.value![index];
    }

    /**
     * Возвращает индекс элемента в массиве или -1, если
     * элемент не найден
     */
    public indexOf(item: T): number {
        return this.value!.indexOf(item);
    }

    /**
     * Возвращает true, если массив содержит item
     * @param item
     */
    public hasItem(item: T): boolean {
        return this.indexOf(item) > -1;
    }

    /**
     * Очищает массив
     */
    public clear(): elyObservableArray<T> {
        this.value = [];
        this.notificate("change");
        this.notificate("clear", []);
        return this;
    }

    public items(): T[] {
        return this.value!;
    }
}
