"use strict";
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
 + Файл: Utils.ts                                                       +
 + Файл изменен: 25.02.2019 22:54:25                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
/**
 * Утилиты
 */
var elyUtils = /** @class */ (function () {
    function elyUtils() {
    }
    /**
     * Возвращает true, если строка содержит число
     * @param str
     */
    elyUtils.isNumber = function (str) {
        return /^(-?[0-9.]+)$/.test(str.toString());
    };
    /**
     * Возвращает первый элемент объекта
     * @param obj
     */
    elyUtils.first = function (obj) {
        for (var index in obj) {
            if (obj.hasOwnProperty(index)) {
                return obj[index];
            }
        }
        return null;
    };
    /**
     * Возвращает массив значений
     * @param obj
     */
    elyUtils.values = function (obj) {
        var values = [];
        elyUtils.forEach(obj, function (index, value) { return values.push(value); });
        return values;
    };
    /**
     * Возвращает количество элементов в объекте
     * @param obj
     */
    elyUtils.count = function (obj) {
        return Object.keys(obj).length;
    };
    /**
     * Цикл по эелментам
     * @param obj
     * @param callable
     */
    elyUtils.forEach = function (obj, callable) {
        if (!obj)
            return null;
        var i = 0;
        for (var index in obj) {
            if (!obj.hasOwnProperty(index)) {
                continue;
            }
            var res = callable(index, obj[index], i);
            if (res === this.BREAK_FLAG) {
                return 1;
            }
            i++;
        }
        return 1;
    };
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
    elyUtils.find = function (obj, filter) {
        var i = 0;
        for (var index in obj) {
            if (!obj.hasOwnProperty(index))
                continue;
            if (filter(index, obj[index], i))
                return { index: index, value: obj[index] };
            i++;
        }
        return { index: null, value: null, empty: true };
    };
    /**
     * Возвращает новый объект из фильтра
     * @param obj
     * @param filter
     */
    elyUtils.filter = function (obj, filter) {
        if (obj instanceof Array) {
            var newArray = [];
            var i = 0;
            for (var index in obj) {
                if (obj.hasOwnProperty(index)) {
                    if (filter(index, obj[index], i))
                        newArray.push(obj[index]);
                    i++;
                }
            }
            return newArray;
        }
        else {
            var newObject = {};
            var i = 0;
            for (var index in obj) {
                if (!obj.hasOwnProperty(index))
                    continue;
                if (filter(index, obj[index], i))
                    newObject[index] = obj[index];
                i++;
            }
            return newObject;
        }
    };
    elyUtils.filterObject = function (obj, filter) {
        var keys = Object.keys(obj).filter(function (value) { return filter(value, obj[value]); });
        var o = {};
        keys.forEach(function (key) { return o[key] = obj[key]; });
        return o;
    };
    /**
     * Сортирует объект по алфавиту
     * @param obj
     */
    elyUtils.sortAlphabetic = function (obj) {
        var ordered = {};
        Object.keys(obj).sort().forEach(function (key) {
            ordered[key] = obj[key];
        });
        return ordered;
    };
    /**
     * Подключение скрипта в шапку страницы
     * @param src
     * @param callback
     */
    elyUtils.require = function (src, callback) {
        var script = document.createElement("script");
        script.src = src;
        script.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    /**
     * Удаляет выделение
     */
    elyUtils.removeSelection = function () {
        if (window.getSelection) {
            if (window.getSelection().empty) { // Chrome
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) { // Firefox
                window.getSelection().removeAllRanges();
            }
        }
    };
    /**
     * Возвращает разные значения
     * @param obj1
     * @param obj2
     */
    elyUtils.diffObj = function (obj1, obj2) {
        var newItem = {};
        for (var obj1Key in obj1) {
            if (!obj1.hasOwnProperty(obj1Key))
                continue;
            if (!obj2.hasOwnProperty(obj1Key))
                newItem[obj1Key] = obj1[obj1Key];
        }
        return newItem;
    };
    /**
     * Возвращает true, если в матрице найдено значение
     * @param matrix
     * @param value
     */
    elyUtils.matrixHas = function (matrix, value) {
        return elyUtils.indexInMatrix(matrix, value) !== null;
    };
    /**
     * Возвращает пару индексов элемента матрицы
     * @param matrix
     * @param value
     */
    elyUtils.indexInMatrix = function (matrix, value) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix.length; j++) {
                if (matrix[i][j] === value)
                    return [i, j];
            }
        }
        return null;
    };
    /**
     * Удаляет элемент из матрицы
     * @param matrix
     * @param value
     */
    elyUtils.removeFromMatrix = function (matrix, value) {
        var indexes = elyUtils.indexInMatrix(matrix, value);
        if (!indexes)
            return false;
        matrix[indexes[0]].splice(indexes[1], 1);
        return true;
    };
    elyUtils.cut = function (obj, len) {
        var keys = Object.keys(obj);
        var o = {};
        keys.sort(function (a, b) {
            return a.length - b.length;
        });
        for (var i = 0; i < keys.length && i < len; i++) {
            o[keys[i]] = obj[keys[i]];
        }
        return o;
    };
    elyUtils.applySrc = function (source, key, o, prefix, checker) {
        if (prefix === void 0) { prefix = ""; }
        checker = checker || (function (val) { return val; });
        if (typeof key === "string") {
            o[prefix + key] = checker(source[key]);
        }
        else {
            key.forEach(function (value) {
                o[prefix + value] = checker(source[value]);
            });
        }
    };
    /**
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    elyUtils.isObject = function (item) {
        return (item && typeof item === "object" && !Array.isArray(item));
    };
    /**
     * Deep merge two objects.
     * @param target
     * @param sources
     */
    elyUtils.mergeDeep = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        var _a, _b;
        if (!sources.length)
            return target;
        var source = sources.shift();
        if (elyUtils.isObject(target) && elyUtils.isObject(source)) {
            for (var key in source) {
                if (!source.hasOwnProperty(key))
                    continue;
                if (elyUtils.isObject(source[key])) {
                    if (!target[key])
                        Object.assign(target, (_a = {}, _a[key] = {}, _a));
                    elyUtils.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, (_b = {}, _b[key] = source[key], _b));
                }
            }
        }
        return elyUtils.mergeDeep.apply(elyUtils, [target].concat(sources));
    };
    elyUtils.BREAK_FLAG = "ely_for_loop_break_312441edq2jhd78q2df67q";
    return elyUtils;
}());
exports["default"] = elyUtils;
