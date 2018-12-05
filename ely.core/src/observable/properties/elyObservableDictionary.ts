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
 + Файл: elyObservableDictionary.ts                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyUtils from "../../elyUtils";
import elyObservableProperty from "./elyObservableProperty";

/**
 * Элемент свойства словаря
 */
interface elyObservableDictionaryItem<T> {
    [key: string]: T;
}

/**
 * Свойство словаря
 */
export default class elyObservableDictionary<T> extends elyObservableProperty<elyObservableDictionaryItem<T>> {

    /**
     * Конструктор
     * @param defaultValue
     */
    constructor(defaultValue: elyObservableDictionaryItem<T> = {}) {
        super(defaultValue);
    }

    /**
     * Возвращакт словарь, как объекта
     */
    public get(): elyObservableDictionaryItem<T> {
        return super.get()!;
    }

    /**
     * Слушатель добавления новго элемента в словаре
     * @param observer
     */
    public addNewItemObserver(observer: (key: string, value: T) => void): elyObservableDictionary<T> {
        this.addObserver("newItem", observer);
        return this;
    }

    public getSorted(handler?: (a: string, b: string) => number): elyObservableDictionary<T> {
        const ordered = new elyObservableDictionary<T>();
        Object.keys(this.value!).sort(handler).forEach((key: string) => {
            ordered.add(key, this.value![key]);
        });
        return this;
    }

    /**
     * Слушатель удаления элемента в словаре
     * @param observer
     */
    public addRemoveItemObserver(observer: (key: string, value: T) => void): elyObservableDictionary<T> {
        this.addObserver("removeItem", observer);
        return this;
    }

    /**
     * Возвращает элемент словаря или NULL
     * @param key
     */
    public item(key: string): T | null {
        return (this.value || {})[key] || null;
    }

    /**
     * Возвращает элемент по индексу
     * @param index
     */
    public itemByIndex(index: number): { key: string, value: T } | null {
        const key = Object.keys(this.value!)[index];
        return key ? {key, value: this.value![key]} : null;
    }

    /**
     * Добавляет значение в словарь
     * @param key   - ключ
     * @param value - значение
     */
    public add(key: string, value: T): elyObservableDictionary<T> {
        this.value![key] = value;
        this.notificate("change", [this.value]);
        this.notificate("newItem", [key, value]);
        return this;
    }

    /**
     * Удаляет значение из словаря
     * @param key
     */
    public remove(key: string): boolean {
        if (this.value!.hasOwnProperty(key)) {
            const copy = this.value![key];
            delete this.value![key];
            this.notificate("change", [this.value]);
            this.notificate("removeItem", [key, copy]);
            return true;
        }
        return false;
    }

    /**
     * Очищает словарь
     */
    public clear(): elyObservableDictionary<T> {
        this.set({});
        return this;
    }

    /**
     * Возвращает количество элементов в словаре
     *
     *
     *     // Создаём словарь
     *     let dictionary = new ely.observable.dictionary();
     *
     *     // Заполняем его элементами
     *     dictionary.add("a", 100);
     *     dictionary.add("b", 200);
     *     dictionary.add("c", 300);
     *
     *     console.log( dictionary.count() );
     *
     *     //3
     *
     *
     */
    public count() {
        let count = 0;
        elyUtils.forEach(this.value, () => count++);
        return count;
    }

    /**
     * Цикл по всем элементам словаря
     * @param iterator
     *
     *
     *     // Создаём словарь
     *     let dictionary = new ely.observable.dictionary();
     *
     *     // Заполняем его элементами
     *     dictionary.add("a", 100);
     *     dictionary.add("b", 200);
     *     dictionary.add("c", 300);
     *
     *     dictionary.forEach( (key, value) => {
     *        console.log(key + " " + value);
     *     });
     *
     *     //a 100
     *     //b 200
     *     //c 300
     *
     *
     */
    public forEach(iterator: (key: string, value: T, iteration?: number) => void): elyObservableDictionary<T> {
        elyUtils.forEach(this.value, iterator);
        return this;
    }

    /**
     * Возвращает true, если существует ключ
     * @param key
     */
    public contains(key: string): boolean {
        return this.value!.hasOwnProperty(key);
    }

    /**
     * Возвращает первый индекс значения или null, если значение не найдено.
     *
     * Данный метод можно использовать для проверки наличия значения.
     *
     * @param value
     */
    public keyOf(value: T): string | null {
        let searched = null;
        elyUtils.forEach(this.value, (index, value1) => {
            if (value1 === value) {
                searched = index;
                return elyUtils.BREAK_FLAG;
            }
        });
        return searched;
    }

}
