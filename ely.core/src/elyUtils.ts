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
 + Файл: elyUtils.ts                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


type elyIterateClosure = (index: any, value: any, iteration: number) => boolean | any | void;

/**
 * Утилиты
 */
export default class elyUtils {

    public static BREAK_FLAG: string = "ely_for_loop_break_312441edq2jhd78q2df67q";

    /**
     * Возвращает true, если строка содержит число
     * @param str
     */
    public static isNumber(str: string): boolean {
        return /^(-?[0-9.]+)$/.test(str.toString());
    }

    /**
     * Возвращает первый элемент объекта
     * @param obj
     */
    public static first(obj: any): any {
        for (const index in obj) {
            if (obj.hasOwnProperty(index)) {
                return obj[index];
            }
        }
        return null;
    }

    /**
     * Возвращает количество элементов в объекте
     * @param obj
     */
    public static count(obj: object): number {
        let c = 0;
        for (const index in obj) c++;
        return c;
    }

    /**
     * Цикл по эелментам
     * @param obj
     * @param callable
     */
    public static forEach(obj: any, callable: elyIterateClosure) {
        if (!obj) return null;
        let i = 0;
        for (const index in obj) {
            if (!obj.hasOwnProperty(index)) {
                continue;
            }
            const res = callable(index, obj[index], i);
            if (res === this.BREAK_FLAG) {
                return 1;
            }
            i++;
        }
        return 1;
    }

    /**
     * Выполняет поиск элемента по объекту с критерием filter
     * @param {*} obj - объект
     * @param {elyIterateClosure} filter - фильтр
     *
     * Фильтр принемает на вход 2 значения: index, value.
     * Если фильтр возвращает true, значение будет возвращено методом.
     *
     * @return {*}
     */
    public static find(obj: any, filter: elyIterateClosure) {
        let i = 0;
        for (const index in obj) {
            if (!obj.hasOwnProperty(index)) continue;
            if (filter(index, obj[index], i)) return {index, value: obj[index]};
            i++;
        }
        return {index: null, value: null, empty: true};
    }

    /**
     * Возвращает новый объект из фильтра
     * @param obj
     * @param filter
     */
    public static filter(obj: any | any[], filter: elyIterateClosure): {} | any[] | any {
        if (obj instanceof Array) {
            const newArray = [];
            let i = 0;
            for (const index in obj) {
                if (obj.hasOwnProperty(index)) {
                    if (filter(index, obj[index], i)) newArray.push(obj[index]);
                    i++;
                }
            }
            return newArray;
        } else {
            const newObject: any = {};

            let i = 0;
            for (const index in obj) {
                if (!obj.hasOwnProperty(index)) continue;
                if (filter(index, obj[index], i)) newObject[index] = obj[index];
                i++;
            }
            return newObject;
        }
    }

    /**
     * Сортирует объект по алфавиту
     * @param obj
     */
    public static sortAlphabetic(obj: any): any {
        const ordered: any = {};
        Object.keys(obj).sort().forEach(function (key) {
            ordered[key] = obj[key];
        });
        return ordered;
    }

    /**
     * Подключение скрипта в шапку страницы
     * @param src
     * @param callback
     */
    public static require(src: string, callback: () => void): void {
        const script = document.createElement("script") as HTMLScriptElement;
        script.src = src;
        script.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    /**
     * Удаляет выделение
     */
    public static removeSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        }
    }

    /**
     * Возвращает разные значения
     * @param obj1
     * @param obj2
     */
    public static diffObj(obj1: any, obj2: any): {} {
        const newItem: any = {};
        for (const obj1Key in obj1) {
            if (!obj1.hasOwnProperty(obj1Key)) continue;
            if (!obj2.hasOwnProperty(obj1Key)) newItem[obj1Key] = obj1[obj1Key];
        }
        return newItem;
    }

    /**
     * Возвращает true, если в матрице найдено значение
     * @param matrix
     * @param value
     */
    public static matrixHas(matrix: any[][], value: any): boolean {
        return elyUtils.indexInMatrix(matrix, value) !== null;
    }

    /**
     * Возвращает пару индексов элемента матрицы
     * @param matrix
     * @param value
     */
    public static indexInMatrix(matrix: any[][], value: any): [number, number] | null {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === value) return [i, j];
            }
        }
        return null;
    }

    /**
     * Удаляет элемент из матрицы
     * @param matrix
     * @param value
     */
    public static removeFromMatrix(matrix: any[][], value: any): boolean {
        const indexes = elyUtils.indexInMatrix(matrix, value);
        if (!indexes) return false;
        matrix[indexes[0]].splice(indexes[1], 1);
        return true;
    }

    public static cut(obj: any, len: number): {} {
        const keys = Object.keys(obj);
        const o: any = {};
        keys.sort((a, b) => {
            return a.length - b.length;
        });
        for (let i = 0; i < keys.length && i < len; i++) {
            o[keys[i]] = obj[keys[i]];
        }
        return o;
    }

    public static applySrc(source: { [name: string]: any }, key: string | string[], o: { [name: string]: any },
                           prefix: string = "", checker?: (s: string) => string) {
        checker = checker || ((val) => val);
        if (typeof key === "string") {
            o[prefix + key] = checker(source[key]);
        } else {
            key.forEach((value) => {
                o[prefix + value] = checker!(source[value]);
            });
        }
    }

    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    public static isObject(item: any) {
        return (item && typeof item === "object" && !Array.isArray(item));
    }

    /**
     * Deep merge two objects.
     * @param target
     * @param sources
     */
    public static mergeDeep(target: any, ...sources: any[]): any {
        if (!sources.length) return target;
        const source = sources.shift();

        if (elyUtils.isObject(target) && elyUtils.isObject(source)) {
            for (const key in source) {
                if (!source.hasOwnProperty(key)) continue;
                if (elyUtils.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, {[key]: {}});
                    elyUtils.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }

        return elyUtils.mergeDeep(target, ...sources);
    }
}
