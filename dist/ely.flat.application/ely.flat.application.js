(function (exports) {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var elyViewCounter_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyViewCounter.ts                                                    +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Счетчик элементов
	 */
	class elyViewCounter {
	    /**
	     * Создает идентификатор для элемента
	     * @param view
	     */
	    static createIdentifierFor(view) {
	        elyViewCounter.__count++;
	        return "view-" + elyViewCounter.__count;
	    }
	}
	/**
	 * Счётчик элементов
	 */
	elyViewCounter.__count = 0;
	exports.default = elyViewCounter;
	});

	unwrapExports(elyViewCounter_1);

	var elyObservable_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyObservable.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Прослушиваемый протокол
	 * @class elyObservable
	 */
	class elyObservable {
	    constructor() {
	        /**
	         * @protected
	         */
	        this.observers = {};
	    }
	    /**
	     * Добавляет наблюдатель
	     * @param {String} event - событие
	     * @param {Function} observer - наблюдатель
	     */
	    addObserver(event, observer) {
	        if (!this.observers.hasOwnProperty(event))
	            this.observers[event] = [];
	        this.observers[event].push(observer);
	        return this;
	    }
	    /**
	     * Сообщает о событие всех наблюдателей
	     * @param {String} event
	     * @param {*} args
	     */
	    notificate(event, args) {
	        if (this.observers.hasOwnProperty(event)) {
	            for (const observer of this.observers[event])
	                observer.apply(this, args);
	        }
	    }
	}
	exports.default = elyObservable;
	});

	unwrapExports(elyObservable_1);

	var elyObject_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyObject.ts                                                         +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Объект
	 * @class elyObject
	 * @abstract
	 */
	class elyObject extends elyObservable_1.default {
	    constructor() {
	        super();
	    }
	    describe() {
	        return Object.getOwnPropertyNames(this).filter((value, index) => {
	            return !value.startsWith("__");
	        });
	    }
	    /**
	     * Проверяет объект на наличие обозреваемого свойства в стандарте EPS6.
	     * @param propName
	     */
	    hasObservablePropertyProtocol(propName) {
	        if (propName.indexOf("Property") > -1)
	            propName.replace("Property", "");
	        const desc = this.describe();
	        if (desc.indexOf(propName + "Property") === -1)
	            return false;
	        return typeof this[propName] === "function";
	    }
	}
	exports.default = elyObject;
	});

	unwrapExports(elyObject_1);

	var elyOneActionEval_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyOneActionEval.ts                                                  +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Выполнение синтаксиса elyOneAction
	 */
	class elyOneActionEval {
	    constructor() {
	        /**
	         * Правила обработки действий
	         */
	        this.actionsRules = {};
	    }
	    /**
	     * Исполняет действие
	     * @param action
	     */
	    go(action) {
	        const args = action.match(/\#([A-z0-9]+)\((.+)\)/);
	        if (args && args.length > 2) {
	            if (this.actionsRules.hasOwnProperty(args[1])) {
	                this.actionsRules[args[1]](args[2]);
	            }
	        }
	    }
	}
	/**
	 * Стандартный обработчик
	 */
	elyOneActionEval.default = new elyOneActionEval();
	exports.default = elyOneActionEval;
	});

	unwrapExports(elyOneActionEval_1);

	var elyUtils_1 = createCommonjsModule(function (module, exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Утилиты
	 */
	class elyUtils {
	    /**
	     * Возвращает true, если строка содержит число
	     * @param str
	     */
	    static isNumber(str) {
	        return /^(-?[0-9.]+)$/.test(str.toString());
	    }
	    /**
	     * Возвращает первый элемент объекта
	     * @param obj
	     */
	    static first(obj) {
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
	    static count(obj) {
	        let c = 0;
	        for (const index in obj)
	            c++;
	        return c;
	    }
	    /**
	     * Цикл по эелментам
	     * @param obj
	     * @param callable
	     */
	    static forEach(obj, callable) {
	        if (!obj)
	            return null;
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
	    static find(obj, filter) {
	        let i = 0;
	        for (const index in obj) {
	            if (!obj.hasOwnProperty(index))
	                continue;
	            if (filter(index, obj[index], i))
	                return { index, value: obj[index] };
	            i++;
	        }
	        return { index: null, value: null, empty: true };
	    }
	    /**
	     * Возвращает новый объект из фильтра
	     * @param obj
	     * @param filter
	     */
	    static filter(obj, filter) {
	        if (obj instanceof Array) {
	            const newArray = [];
	            let i = 0;
	            for (const index in obj) {
	                if (obj.hasOwnProperty(index)) {
	                    if (filter(index, obj[index], i))
	                        newArray.push(obj[index]);
	                    i++;
	                }
	            }
	            return newArray;
	        }
	        else {
	            const newObject = {};
	            let i = 0;
	            for (const index in obj) {
	                if (!obj.hasOwnProperty(index))
	                    continue;
	                if (filter(index, obj[index], i))
	                    newObject[index] = obj[index];
	                i++;
	            }
	            return newObject;
	        }
	    }
	    /**
	     * Сортирует объект по алфавиту
	     * @param obj
	     */
	    static sortAlphabetic(obj) {
	        const ordered = {};
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
	    static require(src, callback) {
	        const script = document.createElement("script");
	        script.src = src;
	        script.onload = callback;
	        document.getElementsByTagName("head")[0].appendChild(script);
	    }
	    /**
	     * Удаляет выделение
	     */
	    static removeSelection() {
	        if (window.getSelection) {
	            if (window.getSelection().empty) { // Chrome
	                window.getSelection().empty();
	            }
	            else if (window.getSelection().removeAllRanges) { // Firefox
	                window.getSelection().removeAllRanges();
	            }
	        }
	    }
	    /**
	     * Возвращает разные значения
	     * @param obj1
	     * @param obj2
	     */
	    static diffObj(obj1, obj2) {
	        const newItem = {};
	        for (const obj1Key in obj1) {
	            if (!obj1.hasOwnProperty(obj1Key))
	                continue;
	            if (!obj2.hasOwnProperty(obj1Key))
	                newItem[obj1Key] = obj1[obj1Key];
	        }
	        return newItem;
	    }
	    /**
	     * Возвращает true, если в матрице найдено значение
	     * @param matrix
	     * @param value
	     */
	    static matrixHas(matrix, value) {
	        return elyUtils.indexInMatrix(matrix, value) !== null;
	    }
	    /**
	     * Возвращает пару индексов элемента матрицы
	     * @param matrix
	     * @param value
	     */
	    static indexInMatrix(matrix, value) {
	        for (let i = 0; i < matrix.length; i++) {
	            for (let j = 0; j < matrix.length; j++) {
	                if (matrix[i][j] === value)
	                    return [i, j];
	            }
	        }
	        return null;
	    }
	    /**
	     * Удаляет элемент из матрицы
	     * @param matrix
	     * @param value
	     */
	    static removeFromMatrix(matrix, value) {
	        const indexes = elyUtils.indexInMatrix(matrix, value);
	        if (!indexes)
	            return false;
	        matrix[indexes[0]].splice(indexes[1], 1);
	        return true;
	    }
	    static cut(obj, len) {
	        const keys = Object.keys(obj);
	        const o = {};
	        keys.sort((a, b) => {
	            return a.length - b.length;
	        });
	        for (let i = 0; i < keys.length && i < len; i++) {
	            o[keys[i]] = obj[keys[i]];
	        }
	        return o;
	    }
	    static applySrc(source, key, o, prefix = "", checker) {
	        checker = checker || ((val) => val);
	        if (typeof key === "string") {
	            o[prefix + key] = checker(source[key]);
	        }
	        else {
	            key.forEach((value) => {
	                o[prefix + value] = checker(source[value]);
	            });
	        }
	    }
	    /**
	     * Simple object check.
	     * @param item
	     * @returns {boolean}
	     */
	    static isObject(item) {
	        return (item && typeof item === "object" && !Array.isArray(item));
	    }
	    /**
	     * Deep merge two objects.
	     * @param target
	     * @param sources
	     */
	    static mergeDeep(target, ...sources) {
	        if (!sources.length)
	            return target;
	        const source = sources.shift();
	        if (elyUtils.isObject(target) && elyUtils.isObject(source)) {
	            for (const key in source) {
	                if (!source.hasOwnProperty(key))
	                    continue;
	                if (elyUtils.isObject(source[key])) {
	                    if (!target[key])
	                        Object.assign(target, { [key]: {} });
	                    elyUtils.mergeDeep(target[key], source[key]);
	                }
	                else {
	                    Object.assign(target, { [key]: source[key] });
	                }
	            }
	        }
	        return elyUtils.mergeDeep(target, ...sources);
	    }
	}
	elyUtils.BREAK_FLAG = "ely_for_loop_break_312441edq2jhd78q2df67q";
	exports.default = elyUtils;
	});

	unwrapExports(elyUtils_1);

	var elyObservableProperty_1 = createCommonjsModule(function (module, exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Обрабатываемое значение
	 * @class elyObservableProperty
	 * @augments elyObservable
	 */
	class elyObservableProperty extends elyObservable_1.default {
	    /**
	     * Конструктор
	     * @param defaultValue
	     */
	    constructor(defaultValue = null) {
	        super();
	        /**
	         * Флаг защиты от перезаписи
	         * @ignore
	         * @protected
	         */
	        this.isOverwriteProtected = false;
	        this.value = defaultValue;
	    }
	    /**
	     * Простое автоматизированное свойство
	     * @param context
	     * @param value
	     * @param prop
	     */
	    static simplePropertyAccess(context, value, prop) {
	        if (value === undefined)
	            return prop.get();
	        prop.set(value);
	        return context;
	    }
	    /**
	     * Возвращает значение или guard если значение null
	     * @param guard
	     */
	    get(guard) {
	        if ((this.value === undefined || this.value === null) && guard !== null)
	            return guard;
	        return this.value;
	    }
	    /**
	     * Устанавливает флаг защиты от перезаписи
	     * @param flag
	     */
	    overwrite(flag) {
	        this.isOverwriteProtected = flag;
	        return this;
	    }
	    /**
	     * Устанавливает значение
	     * @param value
	     */
	    set(value) {
	        if (this.isOverwriteProtected)
	            return this;
	        const old = this.value;
	        this.value = value;
	        this.notificate("change", [old, value]);
	        return this;
	    }
	    /**
	     * Возвращает true, если объект null
	     */
	    isNull() {
	        return this.value === null || this.value === undefined;
	    }
	    /**
	     * Добавляет наблюдателя за изменением значения
	     * @param observer
	     * @deprecated
	     */
	    addChangeObserver(observer) {
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
	    change(observer) {
	        this.addObserver("change", (old, nw) => {
	            observer(nw, old);
	        });
	        return this;
	    }
	    /**
	     * Преобразует объект в строку
	     */
	    toString() {
	        return this.get() + "";
	    }
	}
	exports.default = elyObservableProperty;
	});

	unwrapExports(elyObservableProperty_1);

	var elyView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyView.ts                                                           +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Объект отображения
	 * @class elyView
	 * @abstract
	 */
	class elyView extends elyObject_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super();
	        /**
	         * Родитель элемента
	         */
	        this.superview = null;
	        /**
	         * Идентификатор
	         */
	        this.__id = null;
	        /**
	         * Строка действия
	         */
	        this.__actionString = "";
	        if (options.selector)
	            this.__view = document.querySelector(options.selector);
	        else if (options.element)
	            this.__view = options.element;
	        else
	            this.__view = document.createElement(options.tag || "div");
	        if (options.action)
	            this.actionString(options.action);
	        if (options.class)
	            this.addClass(...options.class.split(" "));
	        this.__view.onclick = (ev) => {
	            this.notificate("click", [ev]);
	        };
	        if (options.style)
	            this.css(options.style);
	        this.addObserver("click", () => {
	            if (this.__actionString !== "")
	                elyOneActionEval_1.default.default.go(this.__actionString);
	        });
	        this.hiddenProperty = new elyObservableProperty_1.default(false);
	        this.hiddenProperty.change(value => this.__view.hidden = value);
	        this.hidden(options.hidden || false);
	        if (options.opacity)
	            this.opacity(options.opacity);
	        if (options.disabled)
	            this.disabled(options.disabled);
	    }
	    /**
	     * Возвращает HTML элемент
	     */
	    getDocument() {
	        return this.__view;
	    }
	    /**
	     * Возвращает внутренний идентификатор элемента
	     */
	    identifier() {
	        if (!this.__id) {
	            this.__id = elyViewCounter_1.default.createIdentifierFor(this);
	            this.attribute("id", this.__id);
	        }
	        return this.__id;
	    }
	    /**
	     * Устанавливает или возвращает действие
	     * @param action
	     */
	    actionString(action) {
	        if (action === undefined)
	            return this.__actionString;
	        this.__actionString = action;
	        return this;
	    }
	    /**
	     * Устанавливает или возвращает атрибут.
	     *
	     * Для удаления атрибута, установите значение value как null.
	     *
	     * @param name
	     * @param value
	     */
	    attribute(name, value) {
	        if (value === null) {
	            this.getDocument().removeAttribute(name);
	            return this;
	        }
	        if (value === undefined) {
	            return this.getDocument().getAttribute(name);
	        }
	        this.getDocument().setAttribute(name, value);
	        return this;
	    }
	    /**
	     * Добавляет класс
	     * @param className - имя класса стилей или кортеж имен
	     *
	     *
	     *     let obj = new elyControl();
	     *     obj.addClass("animate");
	     *     obj.addClass("go");
	     *
	     *     // Или
	     *
	     *     obj.addClass("animate", "go");
	     *
	     *
	     */
	    addClass(...className) {
	        this.getDocument().classList.add(...className);
	        return this;
	    }
	    /**
	     * Возвращает true, если содержит класс
	     * @param className - имя класса стилей
	     */
	    hasClass(className) {
	        return this.getDocument().classList.contains(className);
	    }
	    /**
	     * Удаляет класс
	     * @param className - имя класса стилей
	     */
	    removeClass(className) {
	        this.getDocument().classList.remove(className);
	        return this;
	    }
	    /**
	     * Возвращает и устанавливает скрытие элемента
	     */
	    hidden(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.hiddenProperty);
	    }
	    /**
	     * Устанавливает css значение
	     * @param style
	     */
	    css(style) {
	        elyUtils_1.default.forEach(style, (k, v) => {
	            const pattern = /([+-]=)?(.+)(px|%|rem)/;
	            const res = pattern.exec(v.toString());
	            if (res && res[1]) {
	                if (res[1] === "+=") {
	                    v = parseFloat(/(.+)(px|%)/.exec(this.getDocument().style[k] || "0")[1])
	                        + parseFloat(res[2]) + res[3];
	                }
	                else if (res[1] === "-=") {
	                    v = parseFloat(/(.+)(px|%)/.exec(this.getDocument().style[k] || "0")[1])
	                        - parseFloat(res[2]) + res[3];
	                }
	            }
	            this.getDocument().style[k] = v;
	        });
	        return this;
	    }
	    /**
	     * Возвращает параметр стиля или все стили элемента,
	     * если значение  name не установлено.
	     * @param name
	     */
	    getStyle(name) {
	        if (name === undefined)
	            return this.getDocument().style;
	        return this.getStyle()[name];
	    }
	    /**
	     * Возвращает данные положения и размера объекта
	     */
	    getRect() {
	        return this.getDocument().getBoundingClientRect();
	    }
	    /**
	     * Устанавливает или возвращает высоту
	     * @param value
	     */
	    height(value) {
	        if (value === undefined) {
	            return this.getDocument().getBoundingClientRect().height;
	        }
	        if (typeof value === "number")
	            value = `${value}px`;
	        this.css({ height: value });
	        return this;
	    }
	    /**
	     * Устанавливает или возвращает ширину
	     * @param value
	     */
	    width(value) {
	        if (value === undefined) {
	            return this.getDocument().getBoundingClientRect().width;
	        }
	        if (typeof value === "number")
	            value = `${value}px`;
	        this.css({ width: value });
	        return this;
	    }
	    /**
	     * Устанавливает или возвращает прозрачность
	     * @param value
	     */
	    opacity(value) {
	        if (value === undefined)
	            return parseFloat(this.getStyle("opacity") || "1");
	        return this.css({ opacity: value.toString() });
	    }
	    /**
	     * Устанавливает фокус на объект
	     */
	    makeFirstResponder() {
	        this.getDocument().focus();
	        return this;
	    }
	    /**
	     * Размывает объект
	     */
	    blur() {
	        this.getDocument().blur();
	        return this;
	    }
	    /**
	     * Запускает анимацию css
	     * @param animationName
	     * @param completion
	     */
	    animateCss(animationName, completion) {
	        const animationEnd = ((el) => {
	            const animations = {
	                MozAnimation: "mozAnimationEnd",
	                OAnimation: "oAnimationEnd",
	                WebkitAnimation: "webkitAnimationEnd",
	                animation: "animationend",
	            };
	            for (const t in animations) {
	                if (el.style[t] !== undefined) {
	                    // @ts-ignore
	                    return animations[t];
	                }
	            }
	        })(document.createElement("div"));
	        this.addClass("animated", animationName);
	        const animationCallback = () => {
	            this.removeClass("animated");
	            this.removeClass(animationName);
	            // this is the main part of the fix
	            this.getDocument().removeEventListener(animationEnd, animationCallback);
	            if (completion)
	                completion();
	            this.notificate("animate-css-" + animationName);
	        }; // End fix
	        this.getDocument().addEventListener(animationEnd, animationCallback);
	        return this;
	    }
	    /**
	     * Анимация повяления
	     * @param completion - обработчик завершения анимации
	     */
	    fadeIn(completion) {
	        this.hidden(false);
	        this.animateCss("fadeIn", () => {
	            if (completion)
	                completion();
	            this.notificate("fadedIn", [this]);
	        });
	        return this;
	    }
	    /**
	     * Анимация исчезания
	     * @param completion - обработчик завершения анимации
	     */
	    fadeOut(completion) {
	        this.animateCss("fadeOut", () => {
	            this.hidden(true);
	            if (completion)
	                completion();
	            this.notificate("fadedOut", [this]);
	        });
	        return this;
	    }
	    /**
	     * Возвращает абсолютные размеры (без отступов)
	     * @return {{width: number, height: number}}
	     *
	     * @deprecated
	     */
	    offSize() {
	        return { width: this.getDocument().offsetWidth, height: this.getDocument().offsetHeight };
	    }
	    /**
	     * Удаляет содержимое view
	     */
	    removeViewContent() {
	        this.getDocument().innerHTML = "";
	        return this;
	    }
	    /**
	     * Удаляет все применененные стили
	     */
	    removeStyles() {
	        return this.attribute("style", null);
	    }
	    /**
	     * Удаляет все аттрибуты элемента
	     */
	    removeAttributes() {
	        for (const attr in this.getDocument().attributes) {
	            if (this.getDocument().getAttribute(attr))
	                this.getDocument().removeAttribute(attr);
	        }
	        return this;
	    }
	    /**
	     * Полностью очищает элемент view
	     *
	     * - {@link elyView.removeViewContent}
	     * - {@link elyView.removeStyles}
	     * - {@link elyView.removeAttributes}
	     */
	    clearView() {
	        this.removeViewContent();
	        this.removeStyles();
	        this.removeAttributes();
	        return this;
	    }
	    /**
	     * Утанавливает подсказку
	     * @param {String} hint - подсказка
	     * @return {elyView}
	     */
	    hint(hint) {
	        if (this.getDocument().querySelectorAll(".ef-hint").length > 0) {
	            this.getDocument().querySelector(".ef-hint").innerHTML = hint;
	        }
	        else {
	            const hintView = document.createElement("div");
	            hintView.classList.add("ef-hint");
	            hintView.innerText = hint;
	            this.getDocument().appendChild(hintView);
	        }
	        return this;
	    }
	    /**
	     * Устанавливает или возвращает доступность элемента
	     * @param bool
	     */
	    disabled(bool) {
	        if (bool === undefined)
	            return (this.attribute("disabled") || null) === "disabled";
	        return this.attribute("disabled", bool ? "disabled" : null);
	    }
	    /**
	     * Удаляет элемент
	     */
	    removeFromSuperview() {
	        if (this.getDocument().parentNode !== null)
	            this.getDocument().parentNode.removeChild(this.getDocument());
	        return this;
	    }
	    /**
	     * Добавляет слушатель изменения
	     * @param closure
	     */
	    resize(closure) {
	        const bd = window.document.body;
	        window.addEventListener("resize", () => {
	            closure(this, bd.clientWidth, bd.clientHeight);
	        });
	        closure(this, bd.clientWidth, bd.clientHeight);
	        return this;
	    }
	}
	exports.default = elyView;
	});

	unwrapExports(elyView_1);

	var elyDesignable = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyDesignable.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.elyDesignableAutoFieldsData = {};
	/**
	 * Состояния авто полян
	 */
	var elyDesignableFieldState;
	(function (elyDesignableFieldState) {
	    elyDesignableFieldState[elyDesignableFieldState["VIEW"] = 4] = "VIEW";
	    elyDesignableFieldState[elyDesignableFieldState["GETSET"] = 3] = "GETSET";
	    elyDesignableFieldState[elyDesignableFieldState["GET"] = 1] = "GET";
	    elyDesignableFieldState[elyDesignableFieldState["SET"] = 2] = "SET";
	    elyDesignableFieldState[elyDesignableFieldState["DENY"] = 0] = "DENY";
	})(elyDesignableFieldState = exports.elyDesignableFieldState || (exports.elyDesignableFieldState = {}));
	function createAutoFieldBase(target) {
	    if (!exports.elyDesignableAutoFieldsData.hasOwnProperty(target.name))
	        exports.elyDesignableAutoFieldsData[target.name] = {
	            fields: {},
	        };
	}
	/**
	 * Ядро Designable функционала
	 */
	class elyDesignableCore {
	    /**
	     * Замораживает элемент
	     * @param view
	     */
	    static freeze(view) {
	        const obj = {};
	        const name = view.constructor.name;
	        if (name && exports.elyDesignableAutoFieldsData.hasOwnProperty(name)) {
	            const fields = exports.elyDesignableAutoFieldsData[name].fields;
	            obj.item = name;
	            for (const fieldName in fields) {
	                if (!fields.hasOwnProperty(fieldName))
	                    continue;
	                const field = fields[fieldName];
	                if (field.state === elyDesignableFieldState.GET || field.state === elyDesignableFieldState.GETSET) {
	                    obj[field.name] = view[field.name]();
	                    if (field.values) {
	                        if (obj[field.name] && obj[field.name].value) {
	                            obj[field.name] = obj[field.name].value;
	                        }
	                    }
	                }
	            }
	        }
	        return obj;
	    }
	}
	exports.elyDesignableCore = elyDesignableCore;
	/**
	 * Декоратор автоматического поля для UI Builder
	 * @param name
	 * @param state
	 * @param type
	 * @param values
	 */
	function designable(name, state, type = "string", values = null) {
	    return (target) => {
	        if (state === elyDesignableFieldState.DENY) {
	            if (exports.elyDesignableAutoFieldsData[target.name]) {
	                delete exports.elyDesignableAutoFieldsData[target.name].fields[name];
	            }
	        }
	        createAutoFieldBase(target);
	        const superName = Object.getPrototypeOf(target).name;
	        if (superName && exports.elyDesignableAutoFieldsData[superName])
	            elyUtils_1.default.forEach(exports.elyDesignableAutoFieldsData[superName].fields, (index, value) => exports.elyDesignableAutoFieldsData[target.name].fields[index] = value);
	        exports.elyDesignableAutoFieldsData[target.name].fields[name] = {
	            name,
	            state,
	            type,
	            values
	        };
	    };
	}
	exports.designable = designable;
	});

	unwrapExports(elyDesignable);
	var elyDesignable_1 = elyDesignable.elyDesignableAutoFieldsData;
	var elyDesignable_2 = elyDesignable.elyDesignableFieldState;
	var elyDesignable_3 = elyDesignable.elyDesignableCore;
	var elyDesignable_4 = elyDesignable.designable;

	var elyControl_2 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyControl.ts                                                        +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var elyControl_1;



	/**
	 * Основная единица графического элемента
	 * @class elyControl
	 * @augments elyView
	 */
	let elyControl = elyControl_1 = class elyControl extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        this.__subviews = [];
	        if (options.subviews)
	            this.addSubView(...options.subviews);
	    }
	    /**
	     * Создает elyControl или объект elyControlObjectProtocol
	     * @param obj
	     */
	    static fromObject(obj) {
	        if (obj.line)
	            return elyControl_1.line();
	        const item = obj.item;
	        if (item && window.hasOwnProperty(item)) {
	            const inst = new window[item](elyUtils_1.default.filter(obj, (k) => {
	                return ["item"].indexOf(k) === -1;
	            }));
	            if (inst instanceof elyView_1.default || typeof inst.getView === "function")
	                return inst;
	        }
	        return elyControl_1.empty();
	    }
	    /**
	     * Создает elyControl или объект elyControlObjectProtocol из JSON строки
	     * @param json
	     */
	    static fromJSON(json) {
	        return elyControl_1.fromObject(JSON.parse(json));
	    }
	    /**
	     * Выполняет попытку мутировать obj в объект elyView.
	     * Иначе возвращает пустой элемент.
	     *
	     *
	     *     let obj = "Тест";
	     *     let view = elyControl.tryMutateToView(obj);
	     *
	     *     typeOf view; // elyTextView
	     *     view.text(); // "Тест"
	     *
	     *
	     *
	     * @param obj
	     */
	    static tryMutateToView(obj) {
	        try {
	            if (obj instanceof elyView_1.default)
	                return obj;
	            return String(obj).textView();
	        }
	        catch (e) {
	            return elyControl_1.empty();
	        }
	    }
	    /**
	     * Возвращает дочерние элементы
	     */
	    getSubViews() {
	        return this.__subviews;
	    }
	    /**
	     * Добавляет элемент в элемент
	     * @param views
	     */
	    addSubView(...views) {
	        views.forEach((view) => {
	            if (view instanceof elyView_1.default) {
	                this.__subviews.push(view);
	                view.superview = this;
	                this.notificate("addview", [view]);
	                this.getDocument().appendChild(view.getDocument());
	            }
	            else {
	                window.console.error(view);
	                throw new Error("В объект elyControl может быть добавлен только элемент " +
	                    "реализующий протокол elyContentProtocol!");
	            }
	        });
	        return this;
	    }
	    /**
	     * Удаляет дочений элемент
	     * @param view
	     */
	    removeSubView(view) {
	        const index = this.__subviews.indexOf(view);
	        if (index > -1) {
	            const sub = this.__subviews[index];
	            this.getDocument().removeChild(sub.getDocument());
	            this.__subviews.splice(this.__subviews.indexOf(view), 1);
	        }
	        return this;
	    }
	    /**
	     * Полностью очищает графический элемент
	     */
	    clearView() {
	        this.__subviews.splice(0, this.__subviews.length);
	        this.__view.innerHTML = "";
	        return this;
	    }
	};
	/**
	 * Горизонтальная линяя
	 */
	elyControl.line = () => new elyControl_1({ tag: "hr" });
	/**
	 * Пустой объект elyControl
	 */
	elyControl.empty = () => new elyControl_1();
	elyControl = elyControl_1 = __decorate([
	    elyDesignable.designable("actionString", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("hidden", elyDesignable.elyDesignableFieldState.GETSET, "boolean"),
	    elyDesignable.designable("opacity", elyDesignable.elyDesignableFieldState.GETSET, "number")
	], elyControl);
	exports.default = elyControl;
	});

	unwrapExports(elyControl_2);

	var elyFieldProtocol_1 = createCommonjsModule(function (module, exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Протокол поля ввода данных
	 * @class elyFieldProtocol
	 */
	class elyFieldProtocol extends elyView_1.default {
	    /**
	     * Конструктор
	     */
	    constructor(options = {}) {
	        super(options);
	        this.valueProperty = new elyObservableProperty_1.default(this.defaultValue());
	        this.editableProperty = new elyObservableProperty_1.default(true);
	    }
	    /**
	     * Возвращает значение поля или устанавливает его
	     * @param value
	     */
	    value(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.valueProperty);
	    }
	    /**
	     * Вовращает значение доступности поля или устанавливает его
	     * @param flag
	     */
	    editable(flag) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, flag, this.editableProperty);
	    }
	    /**
	     * Сравнивает значения.
	     * Возвращает true, если значения одинаковые.
	     *
	     * @param {*} value - значения для сравнения
	     * @return {boolean}
	     */
	    compare(value) {
	        return this.value() === value;
	    }
	    /**
	     * Очищает значение
	     */
	    clearValue() {
	        return this.value(this.defaultValue());
	    }
	    /**
	     * Отмечает поле, как поле с ошибкой
	     * @param flag
	     */
	    error(flag) {
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
	    isValueDefault(value) {
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
	    addChangeValueObserver(observer, clearanceSafe = false) {
	        if (!clearanceSafe)
	            this.valueProperty.addChangeObserver(observer);
	        else
	            this.valueProperty.addChangeObserver((oldValue, newValue) => {
	                if (this.isValueDefault(newValue))
	                    return;
	                observer(oldValue, newValue);
	            });
	        return this;
	    }
	    /**
	     * Устанавливает строку для преложения ввода
	     * @param text
	     */
	    placeholder(text) {
	        if (text === undefined)
	            return this.attribute("placeholder");
	        return this.attribute("placeholder", text);
	    }
	    /**
	     * Применяет стандартные опции протокола
	     * @param options
	     */
	    applyProtocolOptions(options = {}) {
	        if (options.value)
	            this.value(options.value);
	        if (options.placeholder)
	            this.placeholder(options.placeholder);
	        if (options.editable)
	            this.editable(options.editable);
	        if (options.hint)
	            this.hint(options.hint);
	    }
	}
	exports.default = elyFieldProtocol;
	});

	unwrapExports(elyFieldProtocol_1);

	var elyInput_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyInput.ts                                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Элемент: Элемент ввода текст
	 * @version 1.0
	 * @class elyInput
	 */
	class elyInput extends elyFieldProtocol_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(Object.assign({ tag: options.tag || "input", class: "ef-input" }, options));
	        this.valueProperty.addChangeObserver((oldValue, newValue) => this.getDocument().value = newValue);
	        this.getDocument().onchange = () => this.value(this.getDocument().value);
	        this.editableProperty.addChangeObserver((oldValue, newValue) => this.getDocument().disabled = !newValue);
	        if (options.type)
	            this.attribute("type", options.type.toString());
	        this.applyProtocolOptions(options);
	        this.getDocument().oninput = () => this.notificate("input", [this.getDocument().value]);
	    }
	    /**
	     * Возвращает исходной элемент
	     */
	    getDocument() {
	        return this.__view;
	    }
	    /**
	     * Возвращает значение по умолчанию
	     */
	    defaultValue() {
	        return "";
	    }
	    /**
	     * Возвращает true, если значение пустое
	     */
	    isEmpty() {
	        return this.value() === "";
	    }
	    /**
	     * Добавляет слушатель изменения поля
	     * @param observer
	     */
	    addInputObserver(observer) {
	        this.addObserver("input", observer);
	        return this;
	    }
	    isValidData() {
	        return true;
	    }
	}
	exports.default = elyInput;
	});

	unwrapExports(elyInput_1);

	var elySize_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elySize.ts                                                           +
	 + Файл изменен: 05.12.2018 23:47:11                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Размеры ely.flat
	 * @class elySize
	 */
	class elySize {
	    /**
	     * Конструктор
	     * @ignore
	     * @param val
	     * @param custom
	     */
	    constructor(val, custom = false) {
	        this.value = val;
	        this.custom = custom;
	    }
	    /**
	     * Свой размер
	     * @param value
	     */
	    static custom(value) {
	        if (typeof value === "number")
	            value = value.toString() + "px";
	        return new elySize(value, true);
	    }
	    /**
	     * Возвращает размер по его названию
	     * @param name
	     */
	    static byName(name) {
	        return new elySize(name);
	    }
	    /**
	     * Список
	     */
	    static rawList() {
	        return {
	            default: elySize.default.value,
	            extraLarge: elySize.extraLarge.value,
	            extraSmall: elySize.extraSmall.value,
	            fill: elySize.fill.value,
	            large: elySize.large.value,
	            middle: elySize.middle.value,
	            regular: elySize.regular.value,
	            small: elySize.small.value,
	        };
	    }
	    /**
	     * Преобразует в строку
	     */
	    toString() {
	        return this.value;
	    }
	}
	/**
	 * Стандартный размер
	 * @return elySize
	 */
	elySize.default = new elySize("default");
	/**
	 * Основной размер, используемый в ely.flat
	 */
	elySize.regular = new elySize("regular");
	/**
	 * Размер во весь блок
	 */
	elySize.fill = new elySize("fill");
	/**
	 * Маленький размер
	 */
	elySize.small = new elySize("small");
	/**
	 * Средний размер
	 */
	elySize.middle = new elySize("middle");
	/**
	 * Большой размер
	 */
	elySize.large = new elySize("large");
	/**
	 * Очень большой размер
	 */
	elySize.extraLarge = new elySize("extraLarge");
	/**
	 * Очень маленький размер
	 */
	elySize.extraSmall = new elySize("extraSmall");
	exports.default = elySize;
	});

	unwrapExports(elySize_1);

	var elyWeight_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWeight.ts                                                         +
	 + Файл изменен: 05.12.2018 23:47:11                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Толщина ely.flat
	 */
	class elyWeight {
	    /**
	     * Конструктор
	     * @ignore
	     * @param val
	     */
	    constructor(val) {
	        this.value = val;
	    }
	    /**
	     * Свой размер
	     * @param value
	     */
	    static custom(value) {
	        return new elyWeight(value);
	    }
	    /**
	     * Список
	     */
	    static rawList() {
	        return {
	            bold: elyWeight.bold.value,
	            fat: elyWeight.fat.value,
	            light: elyWeight.light.value,
	            normal: elyWeight.normal.value,
	            regular: elyWeight.regular.value,
	            thin: elyWeight.thin.value,
	        };
	    }
	    /**
	     * Преобразует в строку
	     */
	    toString() {
	        return this.value;
	    }
	}
	/**
	 * Стандартная толщина
	 */
	elyWeight.default = new elyWeight(300);
	/**
	 * Основная толщина, используемый в ely.flat
	 */
	elyWeight.regular = new elyWeight(300);
	/**
	 * Толщина, используемая общими стандартами
	 */
	elyWeight.normal = new elyWeight(400);
	/**
	 * Толщина выше нормальной
	 */
	elyWeight.bold = new elyWeight(700);
	/**
	 * Предельная толщина
	 */
	elyWeight.fat = new elyWeight(900);
	/**
	 * Толщина меньше стандартной
	 */
	elyWeight.light = new elyWeight(200);
	/**
	 * Предельно низкая толщина
	 */
	elyWeight.thin = new elyWeight(100);
	exports.default = elyWeight;
	});

	unwrapExports(elyWeight_1);

	var elyIconView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyIconView.ts                                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Элемент отображения: Иконка
	 * @version 1.0
	 * @class elyIconView
	 */
	let elyIconView = class elyIconView extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(Object.assign({ tag: "span" }, options));
	        this.addClass("fa");
	        this.iconNameProperty = new elyObservableProperty_1.default();
	        this.iconNameProperty.addChangeObserver((oldValue, newValue) => {
	            if (oldValue)
	                this.removeClass(`fa-${oldValue}`);
	            this.addClass(`fa-${newValue}`);
	        });
	        if (options.iconName)
	            this.iconName(options.iconName);
	        if (options.iconSize)
	            this.iconSize(options.iconSize);
	        if (options.iconSpinning)
	            this.iconSpinning(options.iconSpinning);
	    }
	    /**
	     * Устанавливает или возвращает имя иконки
	     * @param name
	     */
	    iconName(name) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, name, this.iconNameProperty);
	    }
	    /**
	     * Устанавливает размер иконки
	     * @param size
	     *
	     * Используемые константы: {@link elySize}
	     */
	    iconSize(size) {
	        if (typeof size === "number")
	            size = `${size}px`;
	        if (size instanceof elySize_1.default)
	            size = `${size.value}px`;
	        return this.css({ "font-size": size });
	    }
	    /**
	     * Устанавливает толщину иконки
	     * @param weight
	     *
	     * Используемые константы: {@link elyWeight}
	     */
	    iconWeight(weight) {
	        return this.css({ "font-weight": weight.toString() });
	    }
	    /**
	     * Вращение иконки
	     * @param bool
	     */
	    iconSpinning(bool = true) {
	        if (bool)
	            this.addClass("fa-spin");
	        else
	            this.removeClass("fa-spin");
	        return this;
	    }
	};
	elyIconView = __decorate([
	    elyDesignable.designable("iconName", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("iconSpinning", elyDesignable.elyDesignableFieldState.SET, "boolean"),
	    elyDesignable.designable("iconWeight", elyDesignable.elyDesignableFieldState.SET, "string|number", elyWeight_1.default.rawList()),
	    elyDesignable.designable("iconSize", elyDesignable.elyDesignableFieldState.SET, "string|number", elySize_1.default.rawList())
	], elyIconView);
	exports.default = elyIconView;
	});

	unwrapExports(elyIconView_1);

	var elyField_2 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyField.ts                                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var elyField_1;




	/**
	 * Элемент: Поле ввода <T>
	 *     @class elyField
	 *     @augments elyFieldProtocol
	 */
	let elyField = elyField_1 = class elyField extends elyFieldProtocol_1.default {
	    /**
	     * Конструктор
	     * @param options
	     * @param accessory
	     */
	    constructor(options = {}, accessory) {
	        super();
	        /**
	         * Таймер выделения
	         */
	        this.__markTimer = null;
	        this.addClass("ef-control", "ef-control-opacity");
	        this.fieldLineView = new elyControl_2.default({ class: "ef-input-group" });
	        this.accessoryView = accessory;
	        this.actionIconView = new elyIconView_1.default({ class: "ef-input-status" });
	        this.acceptDoubleClickActivation = true;
	        this.actionIconView.hidden(true);
	        if (options.actionIcon) {
	            this.actionIconView.iconName(options.actionIcon).hidden(false);
	        }
	        this.fieldLineView.addSubView(this.accessoryView);
	        this.fieldLineView.addSubView(this.actionIconView);
	        this.getDocument().appendChild(this.fieldLineView.getDocument());
	        this.actionIconView.getDocument().onclick = () => {
	            this.notificate("actionClick");
	            this.actionIconDidClick();
	        };
	        this.getDocument().ondblclick = () => {
	            if (this.acceptDoubleClickActivation)
	                this.actionIconDidClick();
	        };
	        if (options.hint)
	            this.hint(options.hint);
	    }
	    /**
	     * Возвращает true, если объект elyField
	     * @param view
	     */
	    static isField(view) {
	        return view instanceof elyField_1;
	    }
	    /**
	     * Стандартное значение
	     */
	    defaultValue() {
	        // @ts-ignore
	        return this.__defaultValue === undefined ? null : this.__defaultValue;
	    }
	    /**
	     * Устанавливает ручной обработчик
	     * @param closure
	     */
	    setManualValidation(closure) {
	        this.manualValidation = closure;
	        return this;
	    }
	    /**
	     * Помечает поле, как ошибочное.
	     *
	     * Отметка выполняется графически, применяя класс
	     * `error` к классу `ef-input-group`.
	     *
	     * @param flag
	     */
	    error(flag = true) {
	        if (this.__markTimer) {
	            clearTimeout(this.__markTimer);
	        }
	        if (flag) {
	            this.fieldLineView.addClass("error");
	            this.__markTimer = setTimeout(() => {
	                this.error(false);
	                this.__markTimer = null;
	            }, 1500);
	        }
	        else {
	            this.fieldLineView.removeClass("error");
	        }
	        return this;
	    }
	    /**
	     * Утанавливает подсказку
	     * @param {String} hint - подсказка
	     * @return {elyView}
	     */
	    hint(hint) {
	        const selector = this.getDocument().querySelector(".ef-hint");
	        if (selector) {
	            selector.innerHTML = hint;
	        }
	        else {
	            this.fieldLineView.css({ "margin-bottom": "15px" });
	            const hintView = document.createElement("div");
	            hintView.classList.add("ef-hint");
	            hintView.innerText = hint;
	            this.getDocument().appendChild(hintView);
	        }
	        return this;
	    }
	    /**
	     * Устанавливает подсказку для ввода
	     * @param text
	     */
	    placeholder(text) {
	        this.accessoryView.placeholder(text);
	        return this;
	    }
	    /**
	     * Проверяет валидость данных
	     */
	    isValidData() {
	        if (this.manualValidation)
	            return this.manualValidation(this.value());
	        return true;
	    }
	    /**
	     * Обработчик нажатия на иконку активации
	     */
	    actionIconDidClick() {
	        // Nothing is done
	    }
	};
	elyField = elyField_1 = __decorate([
	    elyDesignable.designable("editable", elyDesignable.elyDesignableFieldState.GETSET, "boolean"),
	    elyDesignable.designable("placeholder", elyDesignable.elyDesignableFieldState.SET, "string"),
	    elyDesignable.designable("hint", elyDesignable.elyDesignableFieldState.SET, "string"),
	    elyDesignable.designable("value", elyDesignable.elyDesignableFieldState.GETSET, "string")
	], elyField);
	exports.default = elyField;
	});

	unwrapExports(elyField_2);

	var elyFieldType_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFieldType.ts                                                      +
	 + Файл изменен: 05.12.2018 23:47:11                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Типы ввода данных
	 */
	class elyFieldType {
	    /**
	     * Конструктор
	     * @ignore
	     * @param val
	     */
	    constructor(val) {
	        this.value = val;
	    }
	    /**
	     * Тип по имени
	     * @param value
	     */
	    static byName(value) {
	        if (typeof value === "number")
	            value = value.toString() + "px";
	        return new elyFieldType(value);
	    }
	    /**
	     * Список
	     */
	    static rawList() {
	        return {
	            mail: elyFieldType.mail.value,
	            number: elyFieldType.number.value,
	            password: elyFieldType.password.value,
	            text: elyFieldType.text.value,
	        };
	    }
	    /**
	     * Преобразует в строку
	     */
	    toString() {
	        return this.value;
	    }
	}
	/**
	 * Текст
	 */
	elyFieldType.text = new elyFieldType("text");
	/**
	 * Пароль
	 */
	elyFieldType.password = new elyFieldType("password");
	/**
	 * Число
	 */
	elyFieldType.number = new elyFieldType("number");
	/**
	 * Почта
	 */
	elyFieldType.mail = new elyFieldType("mail");
	exports.default = elyFieldType;
	});

	unwrapExports(elyFieldType_1);

	var elyTextField_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyTextField.ts                                                      +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Поле: Ввод текста
	 * @version 1.0
	 * @class elyTextField
	 * @augments elyField
	 */
	let elyTextField = class elyTextField extends elyField_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options, new elyInput_1.default({ type: options.filedType }));
	        /**
	         * Флаг шифрования данных
	         *
	         * Данный флаг необходим для elyFormBuilder, при получении
	         * и отрпавки значений, поле шифруется ключем.
	         */
	        this.encrypted = false;
	        this.valueProperty = this.accessoryView.valueProperty;
	        this.editableProperty = this.accessoryView.editableProperty;
	        this.fieldTypeProperty = new elyObservableProperty_1.default(elyFieldType_1.default.text);
	        this.fieldTypeProperty.change((newValue) => {
	            this.accessoryView.attribute("type", newValue.value);
	        });
	        this.fieldType(options.filedType || elyFieldType_1.default.text.value);
	        if (options.fieldIcon)
	            this.setIcon(options.fieldIcon);
	        this.encrypted = options.encrypted || false;
	        this.accessoryView.addInputObserver((value) => this.notificate("input", [value]));
	        this.applyProtocolOptions(options);
	    }
	    /**
	     * Возвращает и устанавливает тип вводимых данных
	     */
	    fieldType(value) {
	        if (typeof value === "string")
	            value = elyFieldType_1.default.byName(value);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.fieldTypeProperty);
	    }
	    /**
	     * Возвращает стандартное значение
	     */
	    defaultValue() {
	        return super.defaultValue() || "";
	    }
	    /**
	     * Возвращает true, если поле пустое
	     */
	    isEmpty() {
	        return this.value() === "";
	    }
	    /**
	     * Добавляет слушатель изменения поля
	     * @param observer
	     */
	    addInputObserver(observer) {
	        this.addObserver("input", observer);
	        return this;
	    }
	    /**
	     * Возвращает true, если данные введены правильно
	     */
	    isValidData() {
	        if (this.manualValidation)
	            return this.manualValidation(this.value());
	        if (this.fieldType().value === elyFieldType_1.default.mail.value) {
	            return /^(.+)@(.+)\.(.+)/.test(this.value());
	        }
	        return true;
	    }
	    /**
	     * Устанавливает иконку
	     * @param iconName - имя иконки
	     */
	    setIcon(iconName) {
	        this.accessoryView.removeFromSuperview();
	        // Помещает иконку в левую часть
	        this.fieldLineView.getDocument().append(this.accessoryView.getDocument());
	        this.actionIconView.iconName(iconName);
	        this.actionIconView.hidden(false);
	        return this;
	    }
	};
	elyTextField = __decorate([
	    elyDesignable.designable("value", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("fieldType", elyDesignable.elyDesignableFieldState.GETSET, "string", elyFieldType_1.default.rawList())
	], elyTextField);
	exports.default = elyTextField;
	});

	unwrapExports(elyTextField_1);

	var elyTextViewEditable_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elyTextViewEditable.ts                                               +
	 + Файл изменен: 27.11.2018 23:47:26                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });




	/**
	 * Состояния объекта
	 * @enum elyTextViewEditableState
	 */
	var elyTextViewEditableState;
	(function (elyTextViewEditableState) {
	    /**
	     * Отображение значения
	     */
	    elyTextViewEditableState[elyTextViewEditableState["PRESENT"] = 0] = "PRESENT";
	    /**
	     * Редактирование
	     */
	    elyTextViewEditableState[elyTextViewEditableState["EDIT"] = 1] = "EDIT";
	})(elyTextViewEditableState || (elyTextViewEditableState = {}));
	/**
	 * Элемент отображения: Мутация elyTextView в редактируемый по клику элемент
	 * @class elyTextViewEditable
	 * @augments elyView
	 */
	class elyTextViewEditable extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param props
	     */
	    constructor(props) {
	        super(props);
	        /**
	         * Свойство: флаг режима редактирования
	         * @ignore
	         */
	        this.editmodeProperty = new elyObservableProperty_1.default(false);
	        /**
	         * Свойство: флаг - разрешение редактирования
	         * @ignore
	         */
	        this.editableProperty = new elyObservableProperty_1.default(true);
	        /**
	         * Свойство: значение
	         * @ignore
	         */
	        this.valueProperty = new elyObservableProperty_1.default("");
	        /**
	         * Поле редактирования текста
	         */
	        this.textEditField = new elyTextField_1.default({ actionIcon: "check" });
	        /**
	         * Делегат: проверка возможности сохранить значение
	         */
	        this.shouldSaveValueDelegate = ((val, res) => {
	            res(true);
	        });
	        /**
	         * Флаг того, что еще идет проверка
	         * @ignore
	         */
	        this.__isChecking = false;
	        this.textView = props.textView || new elyTextView_2.default({ text: "" });
	        this.textView.addClass("clickable");
	        this.textEditField.hidden(true);
	        // Изменение значения
	        this.valueProperty.change((value, oldVal) => {
	            this.textView.text(value);
	            this.textEditField.value(value).placeholder(value);
	            this.notificate("value", [value, oldVal]);
	        });
	        // Режим редактирования
	        this.editmodeProperty.change(editMode => {
	            if (!this.editable() || this.__isChecking)
	                return;
	            this.__isChecking = true;
	            // Изменяет состояния иконки
	            this.textEditField.actionIconView.iconName("refresh");
	            this.textEditField.actionIconView.iconSpinning(true);
	            /**
	             * Выполняет попытку сохранить результаты,
	             * проходя все необходимые проверки и делигаты.
	             */
	            const tryToSaveResults = (callback) => {
	                if (this.textView.text() === this.textEditField.value()) {
	                    this.value(this.textEditField.value());
	                    callback(true);
	                    this.setEditorViewState(elyTextViewEditableState.PRESENT);
	                }
	                else {
	                    this.shouldSaveValueDelegate(this.textEditField.value(), res => {
	                        if (res) {
	                            this.value(this.textEditField.value());
	                            callback(res);
	                            this.setEditorViewState(elyTextViewEditableState.PRESENT);
	                        }
	                        else {
	                            this.value(this.textView.text());
	                            this.textEditField.error(true);
	                            callback(false);
	                            this.setEditorViewState(elyTextViewEditableState.EDIT);
	                        }
	                    });
	                }
	            };
	            /**
	             * Выполняет попытку войти в режим редактирования
	             * @param callback
	             */
	            const tryToEnterEditMode = (callback) => {
	                this.setEditorViewState(elyTextViewEditableState.EDIT);
	                callback(true);
	            };
	            if (editMode)
	                tryToEnterEditMode(() => this.__isChecking = false);
	            else
	                tryToSaveResults(() => this.__isChecking = false);
	            if (props.editmode)
	                this.editemode(props.editmode);
	        });
	        this.textEditField.addObserver("actionClick", () => this.editemode(false));
	        this.textView.addObserver("click", () => this.editemode(true));
	        this.value(this.textView.text());
	        this.getDocument().append(this.textView.getDocument());
	        this.getDocument().append(this.textEditField.getDocument());
	    }
	    /**
	     * Устанавливает делигат проверки возможности сохранения значения
	     * @param delegate
	     */
	    textViewEditableShouldSaveValue(delegate) {
	        this.shouldSaveValueDelegate = delegate;
	        return this;
	    }
	    /**
	     * Возвращает и устанавливает значение
	     */
	    value(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.valueProperty);
	    }
	    /**
	     * Добавляет наблюдатель: изменение значения
	     *
	     * Имя обсервера: value
	     *
	     * @param o - наблюдатель
	     */
	    addChangeValueObserver(o) {
	        this.addObserver("value", o);
	        return this;
	    }
	    /**
	     * Возвращает и устанавливает флаг - разрешение редактирования
	     */
	    editable(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.editableProperty);
	    }
	    /**
	     * Возвращает и устанавливает флаг редактирования
	     */
	    editemode(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.editmodeProperty);
	    }
	    /**
	     * Модифицирует элемент отображения в зависимости от состояния
	     * @param state
	     */
	    setEditorViewState(state) {
	        this.textEditField.hidden(state === elyTextViewEditableState.PRESENT);
	        this.textView.hidden(state === elyTextViewEditableState.EDIT);
	        this.textEditField.actionIconView.iconName("check");
	        this.textEditField.actionIconView.iconSpinning(false);
	        return this;
	    }
	}
	exports.default = elyTextViewEditable;
	});

	unwrapExports(elyTextViewEditable_1);

	var elyTextView_2 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyTextView.ts                                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var elyTextView_1;







	/**
	 * Элемент отображения: Текст
	 *
	 * Объект соответствует стандарту: EPS4
	 * @class elyTextView
	 */
	let elyTextView = elyTextView_1 = class elyTextView extends elyControl_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        this.addClass("ef-text");
	        this.textContentView = new elyControl_2.default({ tag: "span", class: "content" });
	        this.iconView = new elyControl_2.default({ tag: "span" });
	        this.addSubView(this.iconView);
	        this.addSubView(this.textContentView);
	        this.iconView.hidden(true);
	        this.textProperty = new elyObservableProperty_1.default("").change((value) => this.textContentView.getDocument().innerHTML = elyTextView_1.filterString(value));
	        this.textSizeProperty = new elyObservableProperty_1.default().change((newValue, oldValue) => {
	            if (oldValue && !oldValue.custom)
	                this.removeClass(`ts-${oldValue.value}`);
	            if (oldValue && oldValue.custom)
	                this.css({ "font-size": null });
	            if (newValue.custom) {
	                this.css({ "font-size": newValue.value });
	            }
	            else {
	                this.addClass(`ts-${newValue.value}`);
	            }
	        });
	        this.textWeightProperty = new elyObservableProperty_1.default(elyWeight_1.default.default.value)
	            .change(value => {
	            return this.css({ "font-weight": value });
	        });
	        this.iconNameProperty = new elyObservableProperty_1.default("")
	            .change((value) => {
	            if (value) {
	                this.iconView.attribute("class", `fa fa-${value}`);
	                this.iconView.hidden(false);
	            }
	            else
	                this.iconView.hidden(true);
	        });
	        if (options.text)
	            this.text(options.text);
	        if (options.iconName)
	            this.iconName(options.iconName);
	        if (options.textSize)
	            this.textSize(options.textSize);
	        if (options.textWeight)
	            this.textWeight(options.textWeight);
	        if (options.textCenter)
	            this.textCenter(options.textCenter);
	    }
	    /**
	     * Возвращает интерактивный элемент
	     * @param textView
	     */
	    static editable(textView) {
	        return new elyTextViewEditable_1.default({ textView });
	    }
	    /**
	     * Выполняет попытку мутировать obj в объект elyTextView.
	     * Иначе возвращает пустой элемент.
	     *
	     *
	     *     let obj = "Тест";
	     *     let view = elyTextView.tryMutate(obj);
	     *
	     *     typeOf view; // elyTextView
	     *     view.text(); // "Тест"
	     *
	     *
	     *
	     * @param obj
	     */
	    static tryMutate(obj) {
	        try {
	            if (obj instanceof elyView_1.default) {
	                if (obj instanceof elyTextView_1)
	                    return obj;
	                return obj.getDocument().innerText.textView();
	            }
	            else
	                return String(obj).textView();
	        }
	        catch (e) {
	            return new elyTextView_1();
	        }
	    }
	    /**
	     * Фильтрует строку
	     * @param str
	     */
	    static filterString(str) {
	        return str.replace(/\*([^*]+)\*/g, "<b>$1</b>")
	            .replace(/\(link:([^)]+)\){([^}]+)}/g, "<a href='$1'>$2</a>")
	            .replace(/\(action:([^{]+)\){([^}]+)}/g, "<a href='#' onclick='ely.oneAction.go(\"$1\")'>$2</a>")
	            .replace(/{nl}/g, "<br>");
	    }
	    /**
	     * Устанавливает выравнивание текста по середине
	     */
	    textCenter(bool) {
	        if (bool === undefined)
	            return this.getStyle().textAlign === "center";
	        this.getStyle().textAlign = bool === true ? "center" : null;
	        return this;
	    }
	    /**
	     * Возвращает и устанавливает размер текста
	     */
	    textSize(value) {
	        if (value !== undefined) {
	            if (typeof value === "string") {
	                if (/^([A-z]+)$/.test(value))
	                    value = elySize_1.default.byName(value);
	                else {
	                    value = elySize_1.default.custom(value);
	                }
	            }
	            else if (typeof value === "number")
	                value = elySize_1.default.custom(value + "px");
	        }
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.textSizeProperty);
	    }
	    /**
	     * Устанавливает толщину текста
	     * @param weight
	     *
	     * Используемые константы: {@link elyWeight}
	     */
	    textWeight(weight) {
	        if (weight) {
	            // @ts-ignore
	            weight = weight.toString();
	        }
	        return elyObservableProperty_1.default.simplePropertyAccess(this, weight, this.textWeightProperty);
	    }
	    /**
	     * Устанавливает или возвращает текст
	     * @param value
	     */
	    text(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.textProperty);
	    }
	    /**
	     * Название иконки
	     * @param value
	     */
	    iconName(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.iconNameProperty);
	    }
	    /**
	     * Устанавливает положение икноки
	     * - {@link elyTextView.iconLeft}
	     * - {@link elyTextView.iconRight}
	     *
	     * @param position
	     */
	    setIconPosition(position) {
	        this.removeSubView(this.textContentView);
	        this.removeSubView(this.iconView);
	        if (position === elyTextView_1.iconRight) {
	            this.addSubView(this.textContentView);
	            this.addSubView(this.iconView);
	        }
	        else if (position === elyTextView_1.iconLeft) {
	            this.addSubView(this.iconView);
	            this.addSubView(this.textContentView);
	        }
	        else {
	            this.addSubView(this.iconView);
	            this.addSubView(this.textContentView);
	        }
	        return this;
	    }
	};
	/**
	 * Константа положения иконки: лево
	 */
	elyTextView.iconLeft = "left";
	/**
	 * Константа положения иконки: право
	 */
	elyTextView.iconRight = "right";
	elyTextView = elyTextView_1 = __decorate([
	    elyDesignable.designable("text", elyDesignable.elyDesignableFieldState.GETSET, "text"),
	    elyDesignable.designable("textCenter", elyDesignable.elyDesignableFieldState.GETSET, "boolean"),
	    elyDesignable.designable("textSize", elyDesignable.elyDesignableFieldState.GETSET, "number|string", elySize_1.default.rawList()),
	    elyDesignable.designable("textWeight", elyDesignable.elyDesignableFieldState.GETSET, "number|string", elyWeight_1.default.rawList()),
	    elyDesignable.designable("iconName", elyDesignable.elyDesignableFieldState.GETSET),
	    elyDesignable.designable("setIconPosition", elyDesignable.elyDesignableFieldState.SET, "string", {
	        left: elyTextView_1.iconLeft,
	        right: elyTextView_1.iconRight,
	    })
	], elyTextView);
	exports.default = elyTextView;
	});

	unwrapExports(elyTextView_2);

	var elyXLogger_1 = createCommonjsModule(function (module, exports) {
	/*
	 *
	 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 *
	 *   ,--. o                   |    o
	 *   |   |.,---.,---.,---.    |    .,---.,---.
	 *   |   |||---'|   ||   |    |    ||   ||   |
	 *   `--' ``---'`---|`---'    `---'``   '`---|
	 *              `---'                    `---'
	 *
	 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
	 * Mail: <diegoling33@gmail.com>
	 *
	 * Это программное обеспечение имеет лицензию, как это сказано в файле
	 * COPYING, который Вы должны были получить в рамках распространения ПО.
	 *
	 * Использование, изменение, копирование, распространение, обмен/продажа
	 * могут выполняться исключительно в согласии с условиями файла COPYING.
	 *
	 * Файл: elyXLogger* Файл создан: 04.12.2018 07:03:21
	 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 *
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * elyXLogger - логгер уровня X
	 */
	class elyXLogger {
	    /**
	     * Конструктор
	     * @param props
	     */
	    constructor(props = {}) {
	        /**
	         * Запись логов в файл
	         */
	        this.writeLogs = false;
	        /**
	         * Главный префикс
	         */
	        this.mainPrefix = "";
	        this.mainPrefix = props.mainPrefix || "ely";
	        this.writeLogs = props.writeLogs || false;
	    }
	    /**
	     * Filters the logger message
	     *
	     * @param {string} msg - the message
	     * @param {boolean} [clearfix = false] - if true: color tags will remove
	     *                                       else it will be evaluated
	     *
	     * @return {string} - evaluated of cleared message
	     * @private
	     */
	    static __loggerFilter(msg, clearfix = false) {
	        msg = msg.replace(/&rst/g, clearfix ? "" : elyXLogger.styles.reset);
	        msg = msg.replace(/&red/g, clearfix ? "" : elyXLogger.styles.fgRed);
	        msg = msg.replace(/&grn/g, clearfix ? "" : elyXLogger.styles.fgGreen);
	        msg = msg.replace(/&cyn/g, clearfix ? "" : elyXLogger.styles.fgCyan);
	        msg = msg.replace(/&gre/g, clearfix ? "" : elyXLogger.styles.fgGrey);
	        msg = msg.replace(/&blu/g, clearfix ? "" : elyXLogger.styles.fgBlue);
	        msg = msg.replace(/&ywl/g, clearfix ? "" : elyXLogger.styles.fgYellow);
	        msg = msg.replace(/&mgn/g, clearfix ? "" : elyXLogger.styles.fgMagenta);
	        msg = msg.replace(/&uns/g, clearfix ? "" : elyXLogger.styles.underscore);
	        return msg;
	    }
	    /**
	     * Отображает сообщение в консоль
	     * @param {String} msg
	     */
	    log(msg) {
	        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.LOG)
	            this._sendToConsole(msg, ["Log"]);
	    }
	    /**
	     * Отображает сообщение в консоль от имени модуля module
	     *
	     * @param {String} module - модуль
	     * @param {String} msg - сообщение
	     */
	    mod(module, msg) {
	        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.LOG)
	            this._sendToConsole(msg, ["Module", [elyXLogger.styles.fgMagenta, module]]);
	    }
	    /**
	     * Отображает сообщение об ошибке
	     * @param {String} msg
	     */
	    error(msg) {
	        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.DEBUG)
	            this._sendToConsole(msg, [[elyXLogger.styles.fgRed, "Error"]]);
	    }
	    /**
	     * Отображает предупреждение
	     * @param {String} msg
	     */
	    warning(msg) {
	        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.DEBUG)
	            this._sendToConsole(msg, [[elyXLogger.styles.fgMagenta, "Warning"]]);
	    }
	    /**
	     * Выводит LOG информацию
	     *
	     * @param {string} message  - the message
	     * @param {Array} prefixes - the array with the prefixes
	     *
	     * "prefixes" could be like:
	     *
	     *  1. [ "Log" ]                                - Simple
	     *  2. [ "Module", "Test" ]                     - Tree
	     *  3. [ "Module", [ "\x1b[32m", "Test" ] ]     - Tree with the color
	     *
	     *  @private
	     */
	    _sendToConsole(message, prefixes) {
	        if (this.mainPrefix !== "") {
	            const _temp = [[elyXLogger.styles.fgCyan, this.mainPrefix]];
	            for (const _prefix of prefixes)
	                _temp.push(_prefix);
	            prefixes = _temp;
	        }
	        const dateString = new Date().toISOString().replace(/T/, " "). // replace T with a space
	            replace(/\..+/, "");
	        let _prefixToDisplay = "";
	        let _clearPrefix = "";
	        for (let _prefix of prefixes) {
	            let _color = elyXLogger.styles.fgGreen;
	            if (_prefix instanceof Array) {
	                _color = _prefix[0];
	                _prefix = _prefix[1];
	            }
	            _prefixToDisplay += "[" + _color + _prefix + elyXLogger.styles.reset + "]";
	            _clearPrefix += "[" + _prefix + "]";
	        }
	        const str = "[" + dateString + "]" + _clearPrefix + ": " + elyXLogger.__loggerFilter(message, true);
	        const strToDisplay = "["
	            + elyXLogger.styles.fgGrey
	            + dateString
	            + elyXLogger.styles.reset
	            + "]"
	            + _prefixToDisplay
	            + elyXLogger.styles.reset
	            + ": " + elyXLogger.__loggerFilter(message) + elyXLogger.styles.reset;
	        this._saveLogString(str);
	        console.log(strToDisplay);
	    }
	    /**
	     * Записывает данные в файл
	     *
	     * @param {string} str
	     * @private
	     */
	    _saveLogString(str) {
	        // if (this.writeLogs)
	        //     require("fs").appendFile("./logs/logger0.log", str + "\n", () => { /* Nothing is done. */
	        //     });
	    }
	}
	/**
	 * Стандартный логгер
	 */
	elyXLogger.default = new elyXLogger({ mainPrefix: "Default" });
	/**
	 * Уровни логирования
	 */
	elyXLogger.loggerLevels = {
	    DEBUG: 2,
	    LOG: 1,
	    NONE: 0,
	};
	/**
	 * Текущий уровень логирования
	 */
	elyXLogger.loggerLevel = elyXLogger.loggerLevels.DEBUG;
	/**
	 * Стили
	 */
	elyXLogger.styles = {
	    /**
	     * Сбрасывает любой примененный эффект
	     * @type {string}
	     */
	    reset: "\x1b[0m",
	    /**
	     * Делает цвет ярче
	     * @type {string}
	     */
	    bright: "\x1b[1m",
	    dim: "\x1b[2m",
	    /**
	     * Подчернутый текст
	     * @type {string}
	     */
	    underscore: "\x1b[4m",
	    /**
	     * Мигающий текст
	     * @type {string}
	     */
	    blink: "\x1b[5m",
	    /**
	     * Скрытый текст
	     */
	    hidden: "\x1b[8m",
	    /**
	     * Развернутый текст
	     */
	    reverse: "\x1b[7m",
	    /**
	     * Font color: Black
	     * @type {string}
	     */
	    fgBlack: "\x1b[30m",
	    /**
	     * Font color: Red
	     * @type {string}
	     */
	    fgRed: "\x1b[31m",
	    /**
	     * Font color: Green
	     * @type {string}
	     */
	    fgGreen: "\x1b[32m",
	    /**
	     * Font color: Yellow
	     * @type {string}
	     */
	    fgYellow: "\x1b[33m",
	    /**
	     * Font color: Blue
	     * @type {string}
	     */
	    fgBlue: "\x1b[34m",
	    /**
	     * Font color: Magenta
	     * @type {string}
	     */
	    fgMagenta: "\x1b[35m",
	    /**
	     * Font color: Cyan
	     * @type {string}
	     */
	    fgCyan: "\x1b[36m",
	    /**
	     * Font color: White
	     * @type {string}
	     */
	    fgWhite: "\x1b[37m",
	    /**
	     * Font color: Grey
	     * @type {string}
	     */
	    fgGrey: "\x1b[37m",
	    /**
	     * Background color: Black
	     * @type {string}
	     */
	    bgBlack: "\x1b[40m",
	    /**
	     * Background color: Red
	     * @type {string}
	     */
	    bgRed: "\x1b[41m",
	    /**
	     * Background color: Green
	     * @type {string}
	     */
	    bgGreen: "\x1b[42m",
	    /**
	     * Background color: Yellow
	     * @type {string}
	     */
	    bgYellow: "\x1b[43m",
	    /**
	     * Background color: Blue
	     * @type {string}
	     */
	    bgBlue: "\x1b[44m",
	    /**
	     * Background color: Magenta
	     * @type {string}
	     */
	    bgMagenta: "\x1b[45m",
	    /**
	     * Background color: Cyan
	     * @type {string}
	     */
	    bgCyan: "\x1b[46m",
	    /**
	     * Background color: White
	     * @type {string}
	     */
	    bgWhite: "\x1b[47m",
	};
	exports.default = elyXLogger;
	});

	unwrapExports(elyXLogger_1);

	var elyFlatApplicationPreloader_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFlatApplicationPreloader.ts                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });



	class elyFlatApplicationPreloader extends elyView_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super({ selector: ".eld" });
	        this.iconLabel = new elyTextView_2.default({ selector: ".efm" });
	        const selector = document.querySelector(".elm");
	        if (selector) {
	            selector.innerHTML = "";
	            this.messageView = new elyTextView_2.default({ selector: ".elm" });
	            this.messageView.text("Пожалуйста, подождите...");
	        }
	        else {
	            this.messageView = new elyTextView_2.default({});
	            elyXLogger_1.default.default.warning("Ошибка обработки экрана загрузки...");
	        }
	    }
	    /**
	     * Отображает сообщение
	     * @param text
	     */
	    showScreen(text) {
	        this.messageView.text(text);
	        this.hidden(false);
	    }
	    /**
	     * Скрывает сообщение
	     */
	    hideScreen() {
	        this.hidden(true);
	    }
	}
	/**
	 * Стандартный загрузчик
	 */
	elyFlatApplicationPreloader.default = new elyFlatApplicationPreloader();
	exports.default = elyFlatApplicationPreloader;
	});

	unwrapExports(elyFlatApplicationPreloader_1);

	var elyLogger_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyLogger.ts                                                         +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	// import figlet from "figlet";
	/**
	 * Logger
	 * @deprecated
	 */
	class elyLogger {
	    /**
	     * Логирование отладки
	     * @param message
	     */
	    static debug(message) {
	        if (elyLogger.logLevel >= elyLogger.logLevels.debug)
	            if (console)
	                console.log("[{ " + "Debug" + " }]: " + message.toString());
	    }
	    /**
	     * Логирование предупрждений
	     * @param message
	     */
	    static warning(message) {
	        if (elyLogger.logLevel >= elyLogger.logLevels.warning)
	            if (console)
	                console.trace("@- [{ " + "Warning" + " }]: " + message.toString());
	    }
	    /**
	     * Логирование ошибок
	     * @param message
	     */
	    static error(message) {
	        if (elyLogger.logLevel >= elyLogger.logLevels.error)
	            if (console)
	                console.trace("!- [{ " + "ERROR" + " }]: " +
	                    message.toString());
	    }
	    /**
	     * Логирование отладки -- вывод объекта
	     * @param obj
	     */
	    static debugObject(obj) {
	        if (elyLogger.logLevel >= elyLogger.logLevels.debug)
	            if (console)
	                console.log(obj);
	    }
	    /**
	     * Выводит сообщение
	     * @param message
	     */
	    static print(message) {
	        if (console)
	            console.log("[{ " + "Log" + " }]: " + message.toString());
	    }
	    /**
	     * Выводит текстовое лого желтого цвета
	     * @param text
	     * @deprecated
	     */
	    static logoTextYellow(text) {
	        console.log(
	        // figlet.textSync(text, {horizontalLayout: "full"}),
	        );
	    }
	    /**
	     * Выводит текстовое лого цианового цвета
	     * @param text
	     * @deprecated
	     */
	    static logoTextCyan(text) {
	        console.log(
	        // figlet.textSync(text, {horizontalLayout: "full"}),
	        );
	    }
	    /**
	     * Очищает консоль
	     */
	    static clear() {
	        console.clear();
	    }
	}
	/**
	 * Уровни логирования
	 */
	elyLogger.logLevels = {
	    debug: 10,
	    error: 3,
	    no: 0,
	    warning: 2,
	};
	/**
	 * Уровень логирования
	 */
	elyLogger.logLevel = elyLogger.logLevels.debug;
	exports.default = elyLogger;
	});

	unwrapExports(elyLogger_1);

	var elyURLDelegate_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyURLDelegate.ts                                                    +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Делегат elyURL
	 */
	class elyURLDelegate {
	    /**
	     * Запрос был отправлен
	     *
	     * @param {elyURL} url - объект elyURL
	     * @param {*} status - статус ответа
	     * @param {*} response - ответ чистого формата (НЕ JSON)
	     */
	    elyURLDidSendRequest(url, status, response) {
	        // Nothing is done
	    }
	    /**
	     * Метод вызывается перед отправкой запроса, на вход передаются
	     * данные, которые будут отправлены.
	     *
	     * Возвращаемое значение - разрешение на совершение запроса.
	     *
	     * @param {elyURL} url - URL
	     * @param {*} data - данные запроса
	     *
	     * @return boolean - разрешение на отправку запроса
	     */
	    elyURLWillSendRequest(url, data) {
	        return true;
	    }
	    /**
	     * Запрос был отменен пользователем
	     *
	     * Данный метод вызывается при отмене запроса.
	     *
	     * @param {elyURL} url - объект elyURL
	     */
	    elyURLDidCanseled(url) {
	        // Nothing is done
	    }
	    /**
	     * Запрос выполнен с ошибкой
	     *
	     * @param {elyURL} url - объект elyURL
	     * @param {*} error - ошибка
	     */
	    elyURLRequestDidLose(url, error) {
	        // Nothing is done
	    }
	    /**
	     * Запрос выполняется и передается
	     *
	     * @param {elyURL} url - объект elyURL
	     * @param {number} loadedBytes - передано байт
	     * @param {number} totalBytes - всего байт
	     */
	    elyURLProgressChanged(url, loadedBytes, totalBytes) {
	        // Nothing is done
	    }
	}
	exports.default = elyURLDelegate;
	});

	unwrapExports(elyURLDelegate_1);

	var elyURL_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyURL.ts                                                            +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Класс ely.URL
	 *
	 * Класс, содержащий набор методов для работы с URL
	 */
	class elyURL {
	    /**
	     * Конструктор
	     *
	     * @param {string} url - URL строка
	     * @param {*} props - опции
	     */
	    constructor(url, props = []) {
	        /**
	         * Ответ обрабатывается как JSON
	         */
	        this.jsonResponse = true;
	        this.absoluteString = url;
	        this.delegate = new elyURLDelegate_1.default();
	    }
	    /**
	     * Возвращает текущий URL
	     */
	    static current() {
	        return new elyURL(window.location.href);
	    }
	    /**
	     * Возвращает очищенный URL
	     */
	    getClearURL() {
	        return new RegExp("(http[s]?:\\/\\/.+)\\/").exec(this.absoluteString)[1];
	    }
	    /**
	     * Возвращает очищенный URL от GET запроса
	     */
	    getClearOfRequestURL() {
	        return new RegExp("(http[s]?:\\/\\/.+)\\?").exec(this.absoluteString)[1];
	    }
	    /**
	     * Отправляет запрос на URL
	     *
	     * @param object - объект с данными запроса
	     * @param callback - обработчик результатов запроса
	     *
	     * Метод работает асинхронно!
	     * @async
	     * @deprecated
	     */
	    request(object, callback) {
	        const xhr = new XMLHttpRequest();
	        let fmd = object;
	        if (!(object instanceof FormData)) {
	            fmd = new FormData();
	            for (const index in object)
	                if (object.hasOwnProperty(index))
	                    fmd.append(index, object[index]);
	        }
	        xhr.onprogress = ((ev) => {
	            this.delegate.elyURLProgressChanged(this, ev.loaded, ev.total);
	        });
	        xhr.onerror = ((ev) => {
	            this.delegate.elyURLRequestDidLose(this, ev);
	        });
	        xhr.onabort = (() => {
	            this.delegate.elyURLDidCanseled(this);
	        });
	        xhr.onload = () => {
	            if (callback) {
	                let resp = xhr.response;
	                try {
	                    if (this.jsonResponse)
	                        resp = JSON.parse(resp);
	                }
	                catch (e) {
	                    elyLogger_1.default.warning("Ошибка возникла при обработке JSON в elyURL!");
	                    resp = null;
	                }
	                this.delegate.elyURLDidSendRequest(this, xhr.status, xhr.response);
	                callback(resp, xhr.status);
	            }
	        };
	        if (this.delegate.elyURLWillSendRequest(this, object)) {
	            xhr.open("POST", this.absoluteString);
	            xhr.send(fmd);
	        }
	        return this;
	    }
	}
	exports.default = elyURL;
	});

	unwrapExports(elyURL_1);

	var elyFlatApplicationLoader_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFlatApplicationLoader.ts                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });




	class elyFlatApplicationLoader extends elyObservable_1.default {
	    /**
	     * Создает элемент стандартной конфигурации
	     */
	    static defaultConfiguration() {
	        return {
	            app: {
	                mainScript: "app.js",
	                title: "ely.Flat{ }",
	                useContentController: true,
	            },
	            sidenavigation: {
	                allowMouseEvents: true,
	                enabled: false,
	            },
	            template: {
	                color: "#194d6d",
	                maxContainerWidth: 700,
	                footer: {
	                    subtitle: "My application",
	                    title: "Works with ely.Flat Application Engine",
	                },
	            },
	        };
	    }
	    /**
	     * Загружает конфигурацию приложения
	     * @param closure - обработчик конфигурации
	     */
	    static loadApplicationConfiguration(closure) {
	        elyXLogger_1.default.default.log("Получение файла конфигурации: " + elyFlatApplicationLoader.configurationPath);
	        new elyURL_1.default(elyFlatApplicationLoader.configurationPath).request({}, (response, status) => {
	            if (status === 200) {
	                elyXLogger_1.default.default.log("Файл конфигурации получен");
	                closure(elyUtils_1.default.mergeDeep(elyFlatApplicationLoader.defaultConfiguration(), (response || {})));
	            }
	            else {
	                elyXLogger_1.default.default.log("Использована стандартная конфигурация");
	                closure(elyFlatApplicationLoader.defaultConfiguration());
	            }
	        });
	    }
	}
	/**
	 * Путь до файла конфигуарции
	 * По умолчанию: app.config.json
	 */
	elyFlatApplicationLoader.configurationPath = "app.config.json";
	exports.default = elyFlatApplicationLoader;
	});

	unwrapExports(elyFlatApplicationLoader_1);

	var elyRebuildableViewProtocol_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyRebuildableViewProtocol.ts                                        +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Элемент, который может быть перестроен
	 */
	class elyRebuildableViewProtocol extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options) {
	        super(options);
	        this.__denyRebuild = false;
	    }
	    /**
	     * Запрещает или отменяет запрет перестроения
	     * @param deny
	     */
	    denyRebuild(deny) {
	        this.__denyRebuild = deny;
	        return this;
	    }
	    /**
	     * Выполняет перестроени элемента
	     */
	    rebuild() {
	        if (!this.__denyRebuild)
	            this.__rebuild();
	        return this;
	    }
	}
	exports.default = elyRebuildableViewProtocol;
	});

	unwrapExports(elyRebuildableViewProtocol_1);

	var elyObservableArray_1 = createCommonjsModule(function (module, exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Массив
	 */
	class elyObservableArray extends elyObservableProperty_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super([]);
	    }
	    /**
	     * Возвращает массив
	     */
	    get() {
	        return this.value || [];
	    }
	    /**
	     * Регистрирует слушатель добавления нового элемента в массив
	     * @param observer - слушатель
	     */
	    addNewItemObserver(observer) {
	        return this.addObserver("add", observer);
	    }
	    /**
	     * Регистрирует слушатель изменения элементов массива
	     * @param observer - слушатель
	     */
	    addChangeItemsObserver(observer) {
	        return this.addObserver("change", observer);
	    }
	    /**
	     * Регистрирует слушатель очищения массива
	     * @param observer - слушатель
	     */
	    addClearObserver(observer) {
	        return this.addObserver("clear", observer);
	    }
	    /**
	     * Регистрирует слушатель удаления элемента массива
	     * @param observer - слушатель
	     */
	    addRemoveObserver(observer) {
	        return this.addObserver("remove", observer);
	    }
	    /**
	     * Добавляет элемент в массив
	     * @param item
	     */
	    push(item) {
	        this.value.push(item);
	        this.notificate("change");
	        this.notificate("add", [item, this.value.length - 1]);
	        return this;
	    }
	    /**
	     * Добавляет элемент в массив по индексу
	     * @param index
	     * @param items
	     */
	    insert(index, ...items) {
	        this.value.splice(index, 0, ...items);
	        this.notificate("change");
	        this.notificate("add", [index, ...items]);
	        return this;
	    }
	    /**
	     * Добавляет элемент в массив
	     * @param index
	     */
	    remove(index) {
	        const item = this.item(index);
	        this.value = this.value.splice(index, 1);
	        this.notificate("change");
	        this.notificate("remove", [item]);
	        return this;
	    }
	    /**
	     * Возвращает элемент массива
	     * @param {number} index
	     */
	    item(index) {
	        return this.value[index];
	    }
	    /**
	     * Возвращает последний элемент
	     */
	    last() {
	        return this.value[this.value.length - 1];
	    }
	    /**
	     * Возвращает длину массива
	     */
	    length() {
	        return this.value.length;
	    }
	    /**
	     * Возвращает true, если существует индекс
	     * @param index
	     */
	    hasIndex(index) {
	        return !!this.value[index];
	    }
	    /**
	     * Возвращает индекс элемента в массиве или -1, если
	     * элемент не найден
	     */
	    indexOf(item) {
	        return this.value.indexOf(item);
	    }
	    /**
	     * Возвращает true, если массив содержит item
	     * @param item
	     */
	    hasItem(item) {
	        return this.indexOf(item) > -1;
	    }
	    /**
	     * Очищает массив
	     */
	    clear() {
	        this.value = [];
	        this.notificate("change");
	        this.notificate("clear", []);
	        return this;
	    }
	    items() {
	        return this.value;
	    }
	}
	exports.default = elyObservableArray;
	});

	unwrapExports(elyObservableArray_1);

	var elyListView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyListView.ts                                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });




	/**
	 * Элемент отображения: Список
	 */
	class elyListView extends elyRebuildableViewProtocol_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(Object.assign({ tag: "ul", class: "ely-list" }, options));
	        /**
	         * Дополнительный класс для элементов списка
	         * @ignore
	         */
	        this.__listClass = [];
	        this.items = new elyObservableArray_1.default();
	        this.items.addChangeItemsObserver(() => this.rebuild());
	        if (options.listItemsClass) {
	            if (typeof options.listItemsClass === "string")
	                this.__listClass = options.listItemsClass.split(" ");
	            else
	                this.__listClass = options.listItemsClass;
	        }
	        if (options.items)
	            for (const item of options.items)
	                this.add(item);
	    }
	    /**
	     * Добавляет элемент в список
	     * @param item
	     * @param index
	     */
	    add(item, index) {
	        if (typeof item === "string")
	            item = new elyTextView_2.default({ text: item });
	        if (index === undefined)
	            this.items.push(item);
	        else
	            this.items.insert(index, item);
	        return this;
	    }
	    /**
	     * Добавляет линюю
	     * @param index
	     */
	    addLine(index) {
	        if (index === undefined)
	            this.items.push(new elyControl_2.default({ tag: "hr" }));
	        else
	            this.items.insert(index, new elyControl_2.default({ tag: "hr" }));
	        return this;
	    }
	    /**
	     * Выполняет перестроение элементов
	     */
	    __rebuild() {
	        this.removeViewContent();
	        this.items.items().forEach((item) => {
	            const listElement = new elyControl_2.default({ tag: "li", class: "ely-list-item" });
	            if (this.__listClass)
	                listElement.addClass(...this.__listClass);
	            listElement.addSubView(item);
	            this.getDocument().appendChild(listElement.getDocument());
	        });
	        return this;
	    }
	}
	exports.default = elyListView;
	});

	unwrapExports(elyListView_1);

	var elyFlatSideNavigationView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFlatSideNavigationView.ts                                         +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * Боковая панель навигации
	 */
	class elyFlatSideNavigationView extends elyView_1.default {
	    constructor(options = {}) {
	        super(options);
	        this.addClass("ef-sidenav");
	        this.widthProperty = new elyObservableProperty_1.default(350);
	        this.widthProperty.change(value => {
	            this.width(value + "px");
	        });
	        this.listView = new elyListView_1.default();
	        this.titleView = new elyControl_2.default({ class: "ef-sidenav-title" });
	        // this.hidden(true);
	        this.dismiss();
	        const closeIcon = new elyIconView_1.default({ iconName: "close" });
	        this.titleView.getDocument().append(closeIcon.getDocument());
	        this.getDocument().append(this.titleView.getDocument());
	        this.getDocument().append(this.listView.getDocument());
	        this.titleView.addObserver("click", () => {
	            this.dismiss();
	        });
	        this.resize((view, maxWidth) => {
	            if (maxWidth > 1600) {
	                this.widthProperty.set(350);
	            }
	            else {
	                this.widthProperty.set(260);
	            }
	        });
	    }
	    /**
	     * Отображает навигацию
	     */
	    present() {
	        // this.hidden(false);
	        this.css({ left: `0px` });
	    }
	    /**
	     * Скрывает навигацию
	     */
	    dismiss() {
	        this.css({ left: `-${this.widthProperty.get()}px` });
	    }
	    /**
	     * Переключает отображение навигации
	     */
	    toggle() {
	        if (parseInt((this.getStyle().left || "0").replace("px", ""), 10) < 0) {
	            this.present();
	        }
	        else {
	            this.dismiss();
	        }
	    }
	    /**
	     * Применяет события мыши
	     */
	    applyMouseEvents() {
	        elyXLogger_1.default.default.log("События мыши активированы для боковой панели");
	        this.getDocument().onmouseleave = () => {
	            this.dismiss();
	        };
	    }
	    /**
	     * Добавляет панель навигации в приложение
	     */
	    apply() {
	        document.body.append(this.getDocument());
	    }
	}
	exports.default = elyFlatSideNavigationView;
	});

	unwrapExports(elyFlatSideNavigationView_1);

	var elyFooterView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFooterView.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Подвал приложения
	 */
	class elyFooterView extends elyControl_2.default {
	    /**s
	     * Констуктор
	     */
	    constructor() {
	        super({ class: "ef-footer" });
	        this.titleView = new elyTextView_2.default({ class: "title" });
	        this.subtitleView = new elyTextView_2.default({ class: "sub-title" });
	        this.addSubView(this.titleView);
	        this.addSubView(this.subtitleView);
	    }
	}
	exports.default = elyFooterView;
	});

	unwrapExports(elyFooterView_1);

	var elyObservableDictionary_1 = createCommonjsModule(function (module, exports) {
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
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Свойство словаря
	 */
	class elyObservableDictionary extends elyObservableProperty_1.default {
	    /**
	     * Конструктор
	     * @param defaultValue
	     */
	    constructor(defaultValue = {}) {
	        super(defaultValue);
	    }
	    /**
	     * Возвращакт словарь, как объекта
	     */
	    get() {
	        return super.get();
	    }
	    /**
	     * Слушатель добавления новго элемента в словаре
	     * @param observer
	     */
	    addNewItemObserver(observer) {
	        this.addObserver("newItem", observer);
	        return this;
	    }
	    getSorted(handler) {
	        const ordered = new elyObservableDictionary();
	        Object.keys(this.value).sort(handler).forEach((key) => {
	            ordered.add(key, this.value[key]);
	        });
	        return this;
	    }
	    /**
	     * Слушатель удаления элемента в словаре
	     * @param observer
	     */
	    addRemoveItemObserver(observer) {
	        this.addObserver("removeItem", observer);
	        return this;
	    }
	    /**
	     * Возвращает элемент словаря или NULL
	     * @param key
	     */
	    item(key) {
	        return (this.value || {})[key] || null;
	    }
	    /**
	     * Возвращает элемент по индексу
	     * @param index
	     */
	    itemByIndex(index) {
	        const key = Object.keys(this.value)[index];
	        return key ? { key, value: this.value[key] } : null;
	    }
	    /**
	     * Добавляет значение в словарь
	     * @param key   - ключ
	     * @param value - значение
	     */
	    add(key, value) {
	        this.value[key] = value;
	        this.notificate("change", [this.value]);
	        this.notificate("newItem", [key, value]);
	        return this;
	    }
	    /**
	     * Удаляет значение из словаря
	     * @param key
	     */
	    remove(key) {
	        if (this.value.hasOwnProperty(key)) {
	            const copy = this.value[key];
	            delete this.value[key];
	            this.notificate("change", [this.value]);
	            this.notificate("removeItem", [key, copy]);
	            return true;
	        }
	        return false;
	    }
	    /**
	     * Очищает словарь
	     */
	    clear() {
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
	    count() {
	        let count = 0;
	        elyUtils_1.default.forEach(this.value, () => count++);
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
	    forEach(iterator) {
	        elyUtils_1.default.forEach(this.value, iterator);
	        return this;
	    }
	    /**
	     * Возвращает true, если существует ключ
	     * @param key
	     */
	    contains(key) {
	        return this.value.hasOwnProperty(key);
	    }
	    /**
	     * Возвращает первый индекс значения или null, если значение не найдено.
	     *
	     * Данный метод можно использовать для проверки наличия значения.
	     *
	     * @param value
	     */
	    keyOf(value) {
	        let searched = null;
	        elyUtils_1.default.forEach(this.value, (index, value1) => {
	            if (value1 === value) {
	                searched = index;
	                return elyUtils_1.default.BREAK_FLAG;
	            }
	        });
	        return searched;
	    }
	}
	exports.default = elyObservableDictionary;
	});

	unwrapExports(elyObservableDictionary_1);

	var elyStylesheet_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyStylesheet.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/*
	 *
	 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 *
	 *   ,--. o                   |    o
	 *   |   |.,---.,---.,---.    |    .,---.,---.
	 *   |   |||---'|   ||   |    |    ||   ||   |
	 *   `--' ``---'`---|`---'    `---'``   '`---|
	 *              `---'                    `---'
	 *
	 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
	 * Mail: <diegoling33@gmail.com>
	 *
	 * Это программное обеспечение имеет лицензию, как это сказано в файле
	 * COPYING, который Вы должны были получить в рамках распространения ПО.
	 *
	 * Использование, изменение, копирование, распространение, обмен/продажа
	 * могут выполняться исключительно в согласии с условиями файла COPYING.
	 *
	 * Файл: elyStylesheet.ts
	 * Файл создан: 19.11.2018 20:56:39
	 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 *
	 *
	 */
	/**
	 * Типы стиля
	 */
	var elyStylesheetItemType;
	(function (elyStylesheetItemType) {
	    elyStylesheetItemType[elyStylesheetItemType["class"] = 0] = "class";
	    elyStylesheetItemType[elyStylesheetItemType["tag"] = 1] = "tag";
	    elyStylesheetItemType[elyStylesheetItemType["id"] = 2] = "id";
	})(elyStylesheetItemType || (elyStylesheetItemType = {}));
	/**
	 * Таблица стилей
	 *
	 */
	class elyStylesheet {
	    /**
	     * Конструктор
	     * @param sheet
	     *
	     */
	    constructor(sheet) {
	        this.__view = document.createElement("style");
	        this.stylesheet = sheet || (this.__view.sheet || {});
	        this.classes = new elyObservableDictionary_1.default();
	    }
	    /**
	     * Возвращает документ
	     */
	    getDocument() {
	        return this.__view;
	    }
	    addItem(name, type, style) {
	        if (this.classes.contains(name) && this.classes.item(name).type === type) {
	            this.classes.item(name).style = Object.assign({}, (this.classes.item(name).style || {}), style);
	        }
	        else {
	            this.classes.add(name, { name, type, style });
	        }
	        return this.rebuild();
	    }
	    /**
	     * Добавляет класс стилей
	     * @param className
	     * @param style
	     */
	    addClass(className, style) {
	        return this.addItem(className, elyStylesheetItemType.class, style);
	    }
	    /**
	     * Добавляет ID стилей
	     * @param id
	     * @param style
	     */
	    addID(id, style) {
	        return this.addItem(id, elyStylesheetItemType.id, style);
	    }
	    /**
	     * Добавляет стили
	     * @param name
	     * @param style
	     */
	    add(name, style) {
	        return this.addItem(name, elyStylesheetItemType.tag, style);
	    }
	    /**
	     * Перестроение таблицы стилей
	     */
	    rebuild() {
	        this.getDocument().innerHTML = "";
	        this.classes.forEach((key, value) => {
	            const tempNode = document.createElement("div");
	            for (const name in value.style)
	                if (value.style.hasOwnProperty(name))
	                    tempNode.style[name] = value.style[name];
	            let name = value.name;
	            switch (value.type) {
	                case elyStylesheetItemType.class:
	                    name = `.${name}`;
	                    break;
	                case elyStylesheetItemType.tag:
	                    name = `${name}`;
	                    break;
	                case elyStylesheetItemType.id:
	                    name = `#${name}`;
	                    break;
	            }
	            this.getDocument().appendChild(document.createTextNode(`${name}{${tempNode.getAttribute("style").replace(";", " !important;")}}`));
	        });
	        return this;
	    }
	}
	/**
	 * Глобавльные стили
	 */
	elyStylesheet.global = new elyStylesheet();
	exports.default = elyStylesheet;
	});

	unwrapExports(elyStylesheet_1);

	var elyHeaderView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyHeaderView.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Отображение заголовка
	 */
	class elyHeaderView extends elyView_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super({ element: document.head });
	        this.titleElement = document.getElementsByTagName("title")[0];
	        this.getDocument().append(this.titleElement);
	        this.getDocument().append(elyStylesheet_1.default.global.getDocument());
	    }
	    /**
	     * устанавливает заголовок
	     * @param value
	     */
	    title(value) {
	        if (value === undefined)
	            return this.titleElement.innerText;
	        this.titleElement.innerText = value;
	        return this;
	    }
	}
	exports.default = elyHeaderView;
	});

	unwrapExports(elyHeaderView_1);

	var elyLinkTextView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyLinkTextView.ts                                                   +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Элемент отображения: Текст ссылкой
	 * @version 1.0
	 * @class elyLinkTextView
	 */
	let elyLinkTextView = class elyLinkTextView extends elyTextView_2.default {
	    /**
	     * Конструктор
	     * @param {elyTextViewOptions|url:String} options
	     */
	    constructor(options = {}) {
	        super(Object.assign({ tag: "a" }, options));
	        this.urlProperty = new elyObservableProperty_1.default();
	        this.urlProperty.addChangeObserver((oldValue, newValue) => {
	            this.attribute("href", newValue);
	        });
	        if (options.url)
	            this.url(options.url);
	        else
	            this.url("#");
	    }
	    /**
	     * Устанавливает или возвращает URL
	     * @param value
	     */
	    url(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.urlProperty);
	    }
	};
	elyLinkTextView = __decorate([
	    elyDesignable.designable("url", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("text", elyDesignable.elyDesignableFieldState.GETSET)
	], elyLinkTextView);
	exports.default = elyLinkTextView;
	});

	unwrapExports(elyLinkTextView_1);

	var elyImageView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyImageView.ts                                                      +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Элемент отображения: Изображение
	 * @version 1.0
	 *
	 * Events:
	 * - loaded: Изображение загружено
	 */
	let elyImageView = class elyImageView extends elyView_1.default {
	    /**
	     * Конструтор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(Object.assign({ tag: "img" }, options));
	        this.urlProperty = new elyObservableProperty_1.default(null);
	        this.getDocument().onload = (e) => this.notificate("loaded", [e]);
	        this.urlProperty.addChangeObserver((oldValue, newValue) => {
	            this.getDocument().src = newValue;
	        });
	        if (options.url)
	            this.url(options.url);
	    }
	    /**
	     * Устанавливает или возвращает ссылку на изображение
	     * @param str
	     */
	    url(str) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, str, this.urlProperty);
	    }
	    /**
	     * Возвращает корневой элемент
	     */
	    getDocument() {
	        return this.__view;
	    }
	};
	elyImageView = __decorate([
	    elyDesignable.designable("url", elyDesignable.elyDesignableFieldState.GETSET, "string")
	], elyImageView);
	exports.default = elyImageView;
	});

	unwrapExports(elyImageView_1);

	var elyMath_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyMath.ts                                                           +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Библиотека математики
	 */
	class elyMath {
	    /**
	     * Преобразовывает значение переменной X из одного диапазона в другой.
	     *
	     * @param x
	     * @param inMin
	     * @param inMax
	     * @param outMin
	     * @param outMax
	     */
	    static map(x, inMin, inMax, outMin, outMax) {
	        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	    }
	}
	exports.default = elyMath;
	});

	unwrapExports(elyMath_1);

	var elyColor_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyColor.ts                                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Цвет
	 */
	class elyColor {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        /**
	         * 16 код цвета
	         */
	        this.hex = "000000";
	        if (options.hex)
	            this.hex = options.hex.indexOf("#") > -1 ? options.hex.substr(1) : options.hex;
	    }
	    /**
	     * Преобразует HSV цвет в RGB
	     * @param hue
	     * @param saturation
	     * @param value
	     */
	    static hsv2rgb(hue, saturation, value) {
	        if (typeof hue === "object") {
	            saturation = hue.saturation;
	            value = hue.value;
	            hue = hue.hue;
	        }
	        let rgb = { red: 0, green: 0, blue: 0 };
	        const i = Math.floor(hue * 6) || 0;
	        const f = hue * 6 - i;
	        const p = value * (1 - saturation);
	        const q = (value * (1 - f * saturation)) || 0;
	        const t = (value * (1 - (1 - f) * saturation)) || 0;
	        switch (i % 6) {
	            case 0:
	                rgb = { red: value, green: t, blue: p };
	                break;
	            case 1:
	                rgb = { red: q, green: value, blue: p };
	                break;
	            case 2:
	                rgb = { red: p, green: value, blue: t };
	                break;
	            case 3:
	                rgb = { red: p, green: q, blue: value };
	                break;
	            case 4:
	                rgb = { red: t, green: p, blue: value };
	                break;
	            case 5:
	                rgb = { red: value, green: p, blue: q };
	                break;
	        }
	        return {
	            blue: Math.round(rgb.blue * 255),
	            green: Math.round(rgb.green * 255),
	            red: Math.round(rgb.red * 255),
	        };
	    }
	    /**
	     * Преобразует RGB цвет в HSV
	     * @param red
	     * @param green
	     * @param blue
	     */
	    static rgb2hsv(red, green, blue) {
	        if (typeof red === "object") {
	            green = red.green;
	            blue = red.blue;
	            red = red.red;
	        }
	        const hsv = { hue: 0, saturation: 0, value: 0 };
	        const max = Math.max(red, green, blue);
	        const min = Math.min(red, green, blue);
	        const d = max - min;
	        hsv.saturation = (max === 0 ? 0 : d / max);
	        hsv.value = max / 255;
	        switch (max) {
	            case min:
	                hsv.hue = 0;
	                break;
	            case red:
	                hsv.hue = (green - blue) + d * (green < blue ? 6 : 0);
	                hsv.hue /= 6 * d;
	                break;
	            case green:
	                hsv.hue = (blue - red) + d * 2;
	                hsv.hue /= 6 * d;
	                break;
	            case blue:
	                hsv.hue = (red - green) + d * 4;
	                hsv.hue /= 6 * d;
	                break;
	        }
	        return hsv;
	    }
	    /**
	     * Преобразует HSV в hex
	     * @param hue
	     * @param saturation
	     * @param value
	     */
	    static hsv2hex(hue, saturation, value) {
	        return elyColor.rgb2hex(elyColor.hsv2rgb(hue, saturation, value));
	    }
	    /**
	     * Преобразует HEX в RGB
	     * @param hex
	     */
	    static hex2rgb(hex) {
	        if (hex.length === 3) {
	            hex = hex.replace(/./g, "$&$&");
	        }
	        return {
	            blue: parseInt(hex[4] + hex[5], 16),
	            green: parseInt(hex[2] + hex[3], 16),
	            red: parseInt(hex[0] + hex[1], 16),
	        };
	    }
	    /**
	     * Преобразует hex цвет в hsv
	     * @param hex
	     */
	    static hex2hsv(hex) {
	        return elyColor.rgb2hsv(elyColor.hex2rgb(hex));
	    }
	    /**
	     * Преобразует RGB в hex
	     * @param red
	     * @param green
	     * @param blue
	     */
	    static rgb2hex(red, green, blue) {
	        const rgbToHex = (rgb) => {
	            let hex = Number(rgb).toString(16);
	            if (hex.length < 2) {
	                hex = "0" + hex;
	            }
	            return hex;
	        };
	        if (typeof red === "object") {
	            blue = red.blue;
	            green = red.green;
	            red = red.red;
	        }
	        if (red > 255)
	            red = 255;
	        if (green > 255)
	            green = 255;
	        if (blue > 255)
	            blue = 255;
	        if (red < 0)
	            red = 0;
	        if (green < 0)
	            green = 0;
	        if (blue < 0)
	            blue = 0;
	        return rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
	    }
	    static getFadeStepHex(step, from, to) {
	        const f = from.getRGBBytes();
	        const t = to.getRGBBytes();
	        return new elyColor({
	            hex: elyColor.rgb2hex(Math.round(elyMath_1.default.map(step, 0, 255, f.red, t.red)), Math.round(elyMath_1.default.map(step, 0, 255, f.green, t.green)), Math.round(elyMath_1.default.map(step, 0, 255, f.blue, t.blue))),
	        });
	    }
	    /**
	     * Возвращает число цвета
	     */
	    getByte() {
	        return parseInt(this.hex, 16);
	    }
	    /**
	     * Возвращает true, если цвет темный
	     */
	    isDarker() {
	        return this.getByte() < (elyColor.whiteNumber / 1.8);
	    }
	    /**
	     * Возвращает байты цветов
	     */
	    getRGBBytes() {
	        return {
	            blue: parseInt(this.hex.substr(4, 2), 16),
	            green: parseInt(this.hex.substr(2, 2), 16),
	            red: parseInt(this.hex.substr(0, 2), 16),
	        };
	    }
	    /**
	     * Устанавливает RGB цвета
	     *
	     * @param red
	     * @param green
	     * @param blue
	     */
	    setRGBBytes(red, green, blue) {
	        if (typeof red === "object") {
	            green = red.green;
	            blue = red.blue;
	            red = red.red;
	        }
	        if (red > 255)
	            red = 255;
	        if (green > 255)
	            green = 255;
	        if (blue > 255)
	            blue = 255;
	        if (red < 0)
	            red = 0;
	        if (green < 0)
	            green = 0;
	        if (blue < 0)
	            blue = 0;
	        this.hex = red.toString(16) + green.toString(16) + blue.toString(16);
	    }
	    /**
	     * Возвращает цвет светлее
	     * @param percentage
	     */
	    getLighter(percentage) {
	        const rgb = this.getRGBBytes();
	        percentage = 1 - percentage;
	        const val = Math.round(255 - (255 * percentage));
	        rgb.red = Math.round(elyMath_1.default.map(val, 0, 255, rgb.red, 255));
	        rgb.green = Math.round(elyMath_1.default.map(val, 0, 255, rgb.green, 255));
	        rgb.blue = Math.round(elyMath_1.default.map(val, 0, 255, rgb.blue, 255));
	        return new elyColor({ hex: "#" + elyColor.rgb2hex(rgb) });
	    }
	    /**
	     * Возвращает цвет тмнее
	     * @param percentage
	     */
	    getDarker(percentage) {
	        const rgb = this.getRGBBytes();
	        percentage = 1 - percentage;
	        const val = Math.round(255 - (255 * percentage));
	        rgb.red = Math.round(elyMath_1.default.map(val, 0, 255, rgb.red, 0));
	        rgb.green = Math.round(elyMath_1.default.map(val, 0, 255, rgb.green, 0));
	        rgb.blue = Math.round(elyMath_1.default.map(val, 0, 255, rgb.blue, 0));
	        return new elyColor({ hex: "#" + elyColor.rgb2hex(rgb) });
	    }
	    /**
	     * Преобразует HEX в строку с #
	     */
	    toString() {
	        return `#${this.hex}`;
	    }
	}
	/**
	 * Код белого цвета
	 */
	elyColor.whiteNumber = 16777215;
	/**
	 * Код черного цвета
	 */
	elyColor.blackNumber = 0;
	exports.default = elyColor;
	});

	unwrapExports(elyColor_1);

	var elyNavigationView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyNavigationView.ts                                                 +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * Элемент верхней навигации
	 */
	class elyNavigationView extends elyControl_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        this.itemsView = new elyListView_1.default();
	        this.titleView = new elyLinkTextView_1.default({ text: "ely.Flat", url: "#", class: "title" });
	        this.imageView = new elyImageView_1.default();
	        this.navigationBarColorProperty = new elyObservableProperty_1.default();
	        this.addSubView(this.imageView);
	        this.addSubView(this.titleView);
	        this.addSubView(this.itemsView);
	        this.addClass("ely-navigation-view");
	        this.imageView.hidden(true);
	        this.navigationBarColorProperty.addChangeObserver((oldValue, newValue) => {
	            const backgroundColor = newValue.toString();
	            let borderColor = newValue.getLighter(0.3).toString();
	            if (!newValue.isDarker()) {
	                this.addClass("light");
	                borderColor = newValue.getDarker(0.05).toString();
	            }
	            else
	                this.removeClass("light");
	            this.css({ "background-color": backgroundColor, "border-bottom": "4px solid " + borderColor });
	        });
	    }
	    /**
	     * Устанавливает или возвращает цвет бара
	     * @param color
	     */
	    navigationBarColor(color) {
	        if (color && typeof color === "string")
	            color = new elyColor_1.default({ hex: color });
	        return elyObservableProperty_1.default.simplePropertyAccess(this, color, this.navigationBarColorProperty);
	    }
	    /**
	     * Устанавливает изображение
	     * @param image
	     */
	    navigationBarImage(image) {
	        this.imageView.hidden(false);
	        this.imageView.url(image);
	        this.imageView.height(34);
	        this.imageView.css({ "margin-top": "-12px" });
	        return this;
	    }
	}
	exports.default = elyNavigationView;
	});

	unwrapExports(elyNavigationView_1);

	var elyViewController_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elyViewController.ts                                                 +
	 + Файл изменен: 30.11.2018 00:25:05                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Контроллер элемента отображения
	 * @class elyViewController
	 * @augments elyObservable
	 */
	class elyViewController extends elyObservable_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        this.view = elyControl_2.default.empty();
	    }
	    /**
	     * Делегат окончания инициилизации объекта
	     * @param screen - экран
	     */
	    viewWillAppear(screen) {
	        // Nothing is done
	    }
	    /**
	     * Делегат окончания загрузки элемента
	     */
	    viewDidLoad() {
	        // Nothing is done
	    }
	    /**
	     * Делегат окончания отображения элемента
	     */
	    viewDidAppear() {
	        // Nothing is done
	    }
	}
	/**
	 * Текущий контроллер
	 * @ignore
	 */
	elyViewController.__thisControllers = [];
	exports.default = elyViewController;
	});

	unwrapExports(elyViewController_1);

	var elyGridRowView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyGridRowView.ts                                                    +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Элемент отображения: Flex Строка
	 */
	class elyGridRowView extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(Object.assign({ class: "ef-flex-box" }, options));
	        this.addClass("row");
	        this.__views = [];
	        this.__columns = [];
	    }
	    /**
	     * Добавляет элемент в строку
	     * @param view          - элемент
	     * @param percentage    - процентное значение элемента в строке (0 ... 1)
	     */
	    add(view, percentage = null) {
	        const column = new elyControl_2.default({ class: "item" });
	        if (percentage === null)
	            percentage = 1;
	        if (typeof percentage === "number" && percentage > 1)
	            percentage /= 100;
	        if (typeof percentage === "string")
	            column.css({ flex: `1 1 ${percentage}` });
	        else
	            column.css({ flex: `1 1 ${percentage * 100}%` });
	        column.addSubView(view);
	        this.__views.push(view);
	        this.__columns.push(column);
	        if (percentage === null) {
	            this.__columns.forEach((value) => {
	                value.css({ flex: `1 1 ${100 / this.__views.length}%` });
	            });
	        }
	        column.superview = this;
	        this.getDocument().append(column.getDocument());
	        return this;
	    }
	    /**
	     * Удаляет элемент из строки
	     * @param view
	     */
	    remove(view) {
	        const index = this.__views.indexOf(view);
	        if (index > -1 && this.__columns[index]) {
	            this.__views.splice(index, 1);
	            view.removeFromSuperview();
	            this.__columns[index].removeFromSuperview();
	            this.__columns.splice(index, 1);
	        }
	        return this;
	    }
	    /**
	     * Удаляет содержимое строки
	     */
	    removeViewContent() {
	        super.removeViewContent();
	        this.__views.splice(0, this.__views.length);
	        return this;
	    }
	    /**
	     * Возвращает индекс элемента в строке или -1
	     * @param view
	     */
	    viewIndex(view) {
	        return this.__views.indexOf(view);
	    }
	    /**
	     * Возвращает колонку по индексу
	     * @param index
	     */
	    viewAt(index) {
	        return this.__views[index];
	    }
	    /**
	     * Возвращает количество элементов
	     */
	    viewsCount() {
	        return this.__columns.length;
	    }
	}
	exports.default = elyGridRowView;
	});

	unwrapExports(elyGridRowView_1);

	var elyGridView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyGridView                                                  +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });




	/**
	 * Элемент отображения: Флекс сетка
	 */
	class elyGridView extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        this.__flexPercentage = options.flex || [];
	        this.__rows = [];
	        this.addClass(this.identifier());
	        this.setItemsMargin(options.margin || { top: 5, bottom: 5, left: 5, right: 5 });
	    }
	    /**
	     * Устанавливает внитринний отступ элементов сетки
	     * @param margin
	     */
	    setItemsMargin(margin) {
	        margin = Object.assign({ top: 0, bottom: 0, left: 0, right: 0 }, margin);
	        const styles = {};
	        elyUtils_1.default.applySrc(margin, ["top", "bottom", "left", "right"], styles, "margin-", (val) => {
	            return typeof val === "string" ? val : val + "px";
	        });
	        elyStylesheet_1.default.global.addClass(this.identifier() + " .item", styles);
	        return this;
	    }
	    /**
	     * Возвращает строки
	     */
	    getRows() {
	        return this.__rows;
	    }
	    /**
	     * Удаляет строку
	     * @param index
	     */
	    removeRow(index) {
	        this.__rows[index].removeFromSuperview();
	        return this;
	    }
	    /**
	     * Возвращает индекс строки, в которой находится элемент
	     * @param view
	     */
	    viewRowIndex(view) {
	        let i = 0;
	        for (const row of this.__rows) {
	            if (row.viewIndex(view) > -1)
	                return i;
	            i++;
	        }
	        return -1;
	    }
	    /**
	     * Возвращает полный адрес элемента: `{rowIndex: number, viewIndex: number}`
	     * @param view
	     */
	    viewIndex(view) {
	        for (let rowIndex = 0; rowIndex < this.__rows.length; rowIndex++) {
	            const vi = this.__rows[rowIndex].viewIndex(view);
	            if (vi > -1)
	                return { rowIndex, viewIndex: vi };
	        }
	        return { rowIndex: -1, viewIndex: -1 };
	    }
	    /**
	     * Возвращает строку по индексу
	     * @param index
	     */
	    rowAt(index) {
	        return this.__rows[index];
	    }
	    /**
	     * Удаляет элемент
	     * @param view
	     */
	    removeView(view) {
	        const index = this.viewRowIndex(view);
	        this.rowAt(index).remove(view);
	        return this;
	    }
	    /**
	     * Добавляет строку
	     * @param row
	     */
	    add(...row) {
	        return this.insert(null, ...row);
	    }
	    /**
	     * Вставляет строку по индексу
	     *
	     * @param index
	     * @param row
	     */
	    insert(index = null, ...row) {
	        const rowView = new elyGridRowView_1.default();
	        const rowIndex = this.__rows.length;
	        row.forEach((value, index) => {
	            let flexMap = [];
	            if (this.__flexPercentage.length > 0) {
	                if (typeof this.__flexPercentage[0] === "number")
	                    flexMap = this.__flexPercentage;
	                else
	                    flexMap = this.__flexPercentage[rowIndex] || this.__flexPercentage[0];
	            }
	            value.superview = rowView;
	            rowView.add(value, flexMap[index] || null);
	        });
	        if (index !== null) {
	            this.__rows.splice(index, 0, rowView);
	            const indexedRow = this.rowAt(index);
	            if (indexedRow) {
	                indexedRow.getDocument().before(rowView.getDocument());
	            }
	            else {
	                this.getDocument().append(rowView.getDocument());
	            }
	        }
	        else {
	            this.__rows.push(rowView);
	            this.getDocument().append(rowView.getDocument());
	        }
	        rowView.superview = this;
	        return this;
	    }
	    /**
	     * Удаляет содержимое сетки
	     */
	    removeViewContent() {
	        super.removeViewContent();
	        this.__rows.splice(0, this.__rows.length);
	        return this;
	    }
	    /**
	     * Возвращает количество строк
	     */
	    rowsCount() {
	        return this.__rows.length;
	    }
	}
	exports.default = elyGridView;
	});

	unwrapExports(elyGridView_1);

	var elyGridViewController_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elyGridViewController.ts                                             +
	 + Файл изменен: 30.11.2018 01:48:16                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Контроллер с сеткой в основании
	 * @class elyGridViewController
	 * @augments elyViewController
	 */
	class elyGridViewController extends elyViewController_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        this.view = new elyGridView_1.default();
	    }
	}
	exports.default = elyGridViewController;
	});

	unwrapExports(elyGridViewController_1);

	var elySimplePageViewController_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elySimplePageViewController.ts                                       +
	 + Файл изменен: 30.11.2018 01:52:55                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Контроллер с шаблоном макета приложения
	 * @class elySimplePageViewController
	 * @augments elyGridViewController
	 */
	class elySimplePageViewController extends elyGridViewController_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        /**
	         * Основной заголовок
	         */
	        this.titleView = new elyTextView_2.default({ class: "ef-title" });
	        /**
	         * Описание страницы
	         */
	        this.descriptionView = new elyTextView_2.default({ class: "ef-description" });
	        this.view.addClass("ef-simple-content");
	        const headerView = new elyControl_2.default({ class: "ef-content-head" });
	        this.titleView.textSize(elySize_1.default.large).textWeight(elyWeight_1.default.normal).textCenter(true);
	        this.descriptionView.textSize(elySize_1.default.middle).textCenter(true);
	        headerView.addSubView(this.titleView);
	        headerView.addSubView(this.descriptionView);
	        this.view.add(headerView);
	    }
	    /**
	     * Устанавливает или возвращает заголовок
	     * @param value
	     */
	    title(value) {
	        if (value === undefined)
	            return this.titleView.text();
	        this.titleView.text(value);
	    }
	    /**
	     * Устанавливает или возвращает описание контента
	     * @param value
	     */
	    description(value) {
	        if (value === undefined)
	            return this.descriptionView.text();
	        this.descriptionView.text(value);
	    }
	}
	exports.default = elySimplePageViewController;
	});

	unwrapExports(elySimplePageViewController_1);

	var elyScreenController_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elyScreenController.ts                                               +
	 + Файл изменен: 30.11.2018 00:19:28                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });






	class __elyScreenIndexViewController extends elySimplePageViewController_1.default {
	    /**
	     * После загрущки
	     *
	     * + В данном методе рекомендуется выполнять отрисовку, а также программную логику
	     *   контроллера элемента отображения.
	     */
	    viewDidLoad() {
	        super.viewDidLoad();
	        this.title("ely.Flat *{* Application *}*");
	        this.description("Приложение разработано на основе ely.flat framework");
	    }
	}
	/**
	 * Контроллер экрана
	 * @class elyScreenController
	 * @augments elyObservable
	 */
	class elyScreenController extends elyObservable_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        /**
	         * Контроллер
	         */
	        this.controller = new elyObservableProperty_1.default();
	        /**
	         * Элемент отображения
	         */
	        this.view = new elyControl_2.default({ class: "ef-screen" });
	        /**
	         * Элементы контента
	         */
	        this.items = {};
	        this.present(new __elyScreenIndexViewController());
	        this.elyScreenControllerDidInit();
	    }
	    /**
	     * Делегат завершения инициилизации контроллера
	     */
	    elyScreenControllerDidInit() {
	        this.notificate("didInit");
	    }
	    /**
	     * Отображает элемент
	     * @param controller
	     * @param completion
	     */
	    present(controller, completion) {
	        if (typeof controller === "string") {
	            if (this.items.hasOwnProperty(controller))
	                this.present(this.items[controller].controller, completion);
	        }
	        else {
	            this.view.fadeOut(() => {
	                this.controller.set(controller);
	                if (elyViewController_1.default.__thisControllers.indexOf(controller.constructor.name) === -1) {
	                    elyViewController_1.default.__thisControllers.push(controller.constructor.name);
	                    controller.viewDidLoad();
	                }
	                controller.viewWillAppear(this);
	                this.view.removeViewContent();
	                this.view.addSubView(controller.view);
	                this.view.addSubView(elyFlatApplication_1.default.default.footerView);
	                this.view.fadeIn(() => {
	                    controller.viewDidAppear();
	                    if (completion)
	                        completion();
	                });
	            });
	        }
	    }
	    /**
	     * Добавляет контроллер в навигацию
	     * @param name
	     * @param controller
	     * @param canOverwrite
	     */
	    addControllerName(name, controller, canOverwrite = false) {
	        if (this.items.hasOwnProperty(name)) {
	            if (!this.items[name].canOverwrite)
	                return;
	            this.items[name].controller = controller;
	            this.items[name].canOverwrite = canOverwrite;
	        }
	        this.items[name] = { controller, canOverwrite };
	    }
	}
	/**
	 * Стандартный контроллер экрана
	 */
	elyScreenController.default = new elyScreenController();
	exports.default = elyScreenController;
	});

	unwrapExports(elyScreenController_1);

	var elyFlatApplication_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFlatApplication.ts                                                +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
















	/**
	 * Приложение
	 */
	class elyFlatApplication extends elyObservable_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        this.readySignalsShouldBeReceived = 0;
	        this.applicationColorProperty = new elyObservableProperty_1.default();
	        this.bodyView = new elyControl_2.default({ element: document.body });
	        this.headerView = new elyHeaderView_1.default();
	        this.containerView = new elyControl_2.default({ class: "ef-cntr" });
	        this.wrapperView = new elyControl_2.default({ class: "ef-wrp" });
	        this.navigationView = new elyNavigationView_1.default();
	        this.footerView = new elyFooterView_1.default();
	        this.sideNavigationView = new elyFlatSideNavigationView_1.default();
	        this.preloader = elyFlatApplicationPreloader_1.default.default;
	        this.bodyView.addSubView(this.wrapperView);
	        this.containerView.css({ margin: "0 auto" });
	        this.containerView.css({ width: "100%" });
	        this.wrapperView.addSubView(this.containerView);
	        this.containerView.addSubView(elyScreenController_1.default.default.view);
	        this.applicationColorProperty.change(value => {
	            this.applyApplicationColor(value);
	        });
	        this.wrapperView.addObserver("click", () => {
	            if (this.config.sidenavigation.enabled) {
	                this.sideNavigationView.dismiss();
	            }
	        });
	        this.bodyView.getDocument().onmousemove = (e) => {
	            if (e.pageX <= 20) {
	                this.sideNavigationView.present();
	            }
	        };
	    }
	    /**
	     * Возвращает стандартный объект приложения
	     * @param closure
	     */
	    static loadApplication(closure) {
	        elyXLogger_1.default.default.log("Загрузка приложения...");
	        if (!elyFlatApplication.default.getConfig()) {
	            elyFlatApplicationLoader_1.default.loadApplicationConfiguration((config) => {
	                elyFlatApplication.default.init(config);
	            });
	        }
	    }
	    /**
	     * Возвращает конфигурацию приложения
	     */
	    getConfig() {
	        return this.config;
	    }
	    /**
	     * Добавляет слушатель окончания загрузки приложения
	     * @param observer
	     */
	    addReadyObserver(observer) {
	        this.readySignalsShouldBeReceived++;
	        this.addObserver("ready", observer);
	        return this;
	    }
	    /**
	     * Устанавливает или возвращает цвет приложения
	     * @param color
	     */
	    applicationColor(color) {
	        if (typeof color === "string")
	            color = new elyColor_1.default({ hex: color });
	        return elyObservableProperty_1.default.simplePropertyAccess(this, color, this.applicationColorProperty);
	    }
	    /**
	     * Изменяет цветовую гамму приложения
	     * @param color
	     */
	    applyApplicationColor(color) {
	        const darker = color.getDarker(0.1);
	        const lighter = color.getLighter(0.18);
	        elyStylesheet_1.default.global.addClass("bg-primary", {
	            backgroundColor: color.toString(),
	            color: color.isDarker() ? "white" : "black",
	        });
	        elyStylesheet_1.default.global.addClass("brd-primary", {
	            borderColor: color.toString(),
	        });
	        elyStylesheet_1.default.global.addClass("text-primary", {
	            color: color.toString(),
	        });
	        elyStylesheet_1.default.global.addClass("bg-info", {
	            backgroundColor: lighter.toString(),
	            color: lighter.isDarker() ? "white" : "black",
	        });
	        elyStylesheet_1.default.global.addClass("brd-info", {
	            borderColor: lighter.toString(),
	        });
	        elyStylesheet_1.default.global.addClass("text-info", {
	            color: lighter.toString(),
	        });
	        elyStylesheet_1.default.global.add("::-webkit-scrollbar-track", {
	            borderColor: "#c2c2c2",
	        });
	        elyStylesheet_1.default.global.add("::-webkit-scrollbar", {
	            borderColor: "#c2c2c2",
	            width: "5px",
	        });
	        elyStylesheet_1.default.global.add("::-webkit-scrollbar-thumb", {
	            backgroundColor: darker.toString(),
	        });
	        if (this.navigationView)
	            this.navigationView.navigationBarColor(color);
	        return this;
	    }
	    /**
	     * Инициилизирует приложение
	     * @param config
	     */
	    init(config) {
	        this.config = config;
	        elyLogger_1.default.debug("Конфигураци:");
	        elyLogger_1.default.debugObject(this.config);
	        this.applyConfiguration(config);
	        elyLogger_1.default.debug("---> Загрузка скрипта приложения: " + this.config.app.mainScript);
	        const script = document.createElement("script");
	        script.src = this.config.app.mainScript;
	        document.head.appendChild(script);
	        script.onload = () => {
	            elyLogger_1.default.debug("[OK] Скрипт загружен");
	            this.notificate("ready", [(flag, message) => {
	                    elyLogger_1.default.debug(`---> Запуск загрузчика ${this.readySignalsShouldBeReceived}`);
	                    elyLogger_1.default.debug(`[~~] Загрузчик передал флаг ${flag ? "true" : "false"} (${message})`);
	                    if (!flag) {
	                        this.preloader.iconLabel
	                            .removeClass("fa-refresh")
	                            .addClass("fa-times")
	                            .removeClass("fa-spin");
	                        this.preloader.messageView.text(message || "Загрузка была остановлена...");
	                        throw Error("Остановка приложения...");
	                        return;
	                    }
	                    this.readySignalsShouldBeReceived--;
	                    elyLogger_1.default.debug("[OK] Загрузчик обработан. Осталось: " + this.readySignalsShouldBeReceived);
	                    if (this.readySignalsShouldBeReceived === 0) {
	                        if (this.config.app.useContentController) {
	                            __applyElyOneActions(this);
	                        }
	                        elyScreenController_1.default.default.present("index");
	                        this.preloader.hidden(true);
	                    }
	                }]);
	        };
	    }
	    /**
	     * Применяет конфигурацию
	     * @param config
	     */
	    applyConfiguration(config) {
	        elyLogger_1.default.debug("~~~> Применение конфигурации");
	        if (this.config.app)
	            setUpAppConfig(this, this.config.app);
	        if (this.config.navigation)
	            setUpNavigationConfig(this, this.config.navigation);
	        if (this.config.template)
	            setUpTemplateConfig(this, this.config.template);
	        if (this.config.sidenavigation)
	            setUpSidebarConfig(this, this.config.sidenavigation);
	        /**
	         * Настраивает app секцию
	         * @param application
	         * @param app
	         */
	        function setUpAppConfig(application, app) {
	            if (app.title)
	                application.headerView.title(app.title);
	        }
	        /**
	         * Настраивает navigation секцию
	         * @param app
	         * @param navigation
	         */
	        function setUpNavigationConfig(app, navigation) {
	            app.navigationView.titleView.text(navigation.title).addObserver("click", () => {
	                elyScreenController_1.default.default.present("index");
	            });
	            app.bodyView.addSubView(app.navigationView);
	            if (navigation.items)
	                navigation.items.forEach((value) => {
	                    value.item = value.item || "elyLinkTextView";
	                    app.navigationView.itemsView.add(elyControl_2.default.fromObject(value));
	                });
	            if (navigation.imageUrl) {
	                app.navigationView.navigationBarImage(navigation.imageUrl);
	                app.navigationView.imageView.addObserver("click", () => {
	                    elyScreenController_1.default.default.present("index");
	                });
	            }
	        }
	        /**
	         * Настраивает template секцию
	         * @param app
	         * @param template
	         */
	        function setUpTemplateConfig(app, template) {
	            if (template.maxContainerWidth) {
	                app.containerView.getStyle().maxWidth = template.maxContainerWidth + "px";
	            }
	            if (template.color) {
	                app.applicationColor(new elyColor_1.default({ hex: template.color }));
	            }
	            if (template.footer)
	                setUpTemplateFooterConfig(app, template.footer);
	            /**
	             * Настраивает template.footer секцию
	             * @param app
	             * @param footer
	             */
	            function setUpTemplateFooterConfig(app, footer) {
	                if (footer.title)
	                    app.footerView.titleView.text(footer.title);
	                if (footer.subtitle)
	                    app.footerView.subtitleView.text(footer.subtitle);
	            }
	        }
	        /**
	         * Настраивает sidebar секцию
	         * @param app
	         * @param sidebar
	         */
	        function setUpSidebarConfig(app, sidebar) {
	            if (sidebar.enabled) {
	                if (app.navigationView) {
	                    const showButton = new elyControl_2.default({
	                        class: "ef-sidenav-toggle",
	                        subviews: [new elyIconView_1.default({ iconName: "bars" })],
	                    });
	                    showButton.addObserver("click", () => {
	                        app.sideNavigationView.toggle();
	                    });
	                    app.navigationView.addSubView(showButton);
	                }
	                app.sideNavigationView.apply();
	                if (sidebar.allowMouseEvents)
	                    app.sideNavigationView.applyMouseEvents();
	                if (sidebar.items) {
	                    for (const item of sidebar.items) {
	                        if (item.line) {
	                            app.sideNavigationView.listView.add(elyControl_2.default.line());
	                        }
	                        else {
	                            item.item = item.item || "elyLinkTextView";
	                            app.sideNavigationView.listView.add(elyControl_2.default.fromObject(item));
	                        }
	                    }
	                }
	            }
	        }
	    }
	}
	/**
	 * Паттерн синглтон
	 */
	elyFlatApplication.default = new elyFlatApplication();
	exports.default = elyFlatApplication;
	function __applyElyOneActions(app) {
	    elyOneActionEval_1.default.default.actionsRules.content = (arg) => {
	        switch (arg) {
	            case "back":
	                // cc.back();
	                break;
	            case "*index":
	                elyScreenController_1.default.default.present("index");
	                break;
	            default:
	                elyScreenController_1.default.default.present(arg);
	        }
	    };
	}
	});

	unwrapExports(elyFlatApplication_1);

	var elyStyle_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyStyle.ts                                                          +
	 + Файл изменен: 05.12.2018 23:47:11                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Стили ely.flat
	 */
	class elyStyle {
	    /**
	     * Конструктор
	     * @ignore
	     * @param val
	     */
	    constructor(val) {
	        this.value = val;
	    }
	    /**
	     * Список
	     */
	    static rawList() {
	        // tslint:disable-next-line:max-classes-per-file
	        return new class {
	            constructor() {
	                this.danger = elyStyle.danger.value;
	                this.default = elyStyle.default.value;
	                this.info = elyStyle.info.value;
	                this.muted = elyStyle.muted.value;
	                this.primary = elyStyle.primary.value;
	                this.secondary = elyStyle.secondary.value;
	                this.success = elyStyle.success.value;
	                this.warning = elyStyle.warning.value;
	            }
	        };
	    }
	    static list() {
	        return {
	            danger: elyStyle.default,
	            default: elyStyle.default,
	            info: elyStyle.info,
	            muted: elyStyle.muted,
	            primary: elyStyle.primary,
	            secondary: elyStyle.secondary,
	            success: elyStyle.success,
	            warning: elyStyle.warning,
	        };
	    }
	    /**
	     * Свой стиль
	     * @param name
	     */
	    static custom(name) {
	        return new elyStyle(name);
	    }
	    /**
	     * Возвраща стиль по имени
	     * @param name
	     */
	    static byName(name) {
	        return new elyStyle(name);
	    }
	    /**
	     * Преобразует в строку
	     */
	    toStirng() {
	        return this.value;
	    }
	}
	/**
	 * Стандартный стиль
	 *
	 * Элементарный сброс стиля
	 */
	elyStyle.default = new elyStyle("default");
	/**
	 * Главный стиль
	 *
	 * Основной стиль подходит для важных элементов.
	 */
	elyStyle.primary = new elyStyle("primary");
	/**
	 * Информативный стиль
	 *
	 * Основной стиль подходит для отображения информации, которая должна выделяться.
	 */
	elyStyle.info = new elyStyle("info");
	/**
	 * Вторичный стиль
	 *
	 * Стиль подходит для элементов, не требующих основное внимание.
	 */
	elyStyle.secondary = new elyStyle("secondary");
	/**
	 * Стиль предупреждения
	 *
	 * Стиль, особо концентрирующий внимание пользователя.
	 */
	elyStyle.warning = new elyStyle("warning");
	/**
	 * Успешный стиль
	 *
	 * Стиль, говорящий об успешном завершении действия.
	 */
	elyStyle.success = new elyStyle("success");
	/**
	 * Опасный стиль
	 *
	 * Стиль, ярко бросающийся в глаза. Подойдет для отметки ошибок.
	 */
	elyStyle.danger = new elyStyle("danger");
	/**
	 * Заглушенный стиль
	 *
	 * Стиль, говорящий о невозможности использовать элемент.
	 */
	elyStyle.muted = new elyStyle("muted");
	exports.default = elyStyle;
	});

	unwrapExports(elyStyle_1);

	var elyButton_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyButton.ts                                                         +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * Элемент управления: Кнопка
	 * @version 1.0
	 *
	 *
	 *     // Создание кнопки по ширине заполнения
	 *     let button = new ely.button({text: "Button", buttonSize: ely.size.fill});
	 *
	 *     button.click( () => {
	 *        // Обработка нажатия кнопки
	 *        console.log("Wow!");
	 *     });
	 *
	 * @class elyButton
	 * @augments elyControl
	 */
	let elyButton = class elyButton extends elyControl_2.default {
	    /**
	     * Инициилизирует объект
	     * @param {click:Function, buttonStyle: elyStyle, buttonSize: elySize, text: string, fill:Boolean|*} options - опции
	     */
	    constructor(options = {}) {
	        super(Object.assign({ tag: "button", class: "btn" }, options));
	        this.textView = new elyTextView_2.default({ tag: "span", text: options.text, iconName: options.iconName });
	        this.buttonSizeProperty = new elyObservableProperty_1.default(elySize_1.default.default);
	        this.buttonStyleProperty = new elyObservableProperty_1.default(elyStyle_1.default.default);
	        this.buttonStyleProperty.change((newValue, oldValue) => {
	            if (oldValue)
	                this.removeClass(`bg-${oldValue.value}`);
	            this.addClass(`bg-${newValue.value}`);
	        });
	        this.buttonSizeProperty.change((newValue, oldValue) => {
	            if (oldValue)
	                this.removeClass(`btn-${oldValue.value}`);
	            this.addClass(`btn-${newValue.value}`);
	        });
	        this.addSubView(this.textView);
	        this.buttonSize(options.buttonSize || elySize_1.default.regular);
	        this.buttonStyle(options.buttonStyle || elyStyle_1.default.primary);
	        if (options.click)
	            this.click(options.click);
	        if (options.fill)
	            this.fill();
	    }
	    /**
	     * Устанавливает текст на кнопку
	     * @param text
	     */
	    text(text) {
	        if (text === undefined)
	            return this.textView.text();
	        this.textView.text(text);
	        return this;
	    }
	    /**
	     * Возвращает или устанавливает размер кнопки
	     *
	     * См {@link elySize}
	     * @param sizeName - {@link elySize}
	     */
	    buttonSize(sizeName) {
	        if (typeof sizeName === "string")
	            sizeName = elySize_1.default.byName(sizeName);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, sizeName, this.buttonSizeProperty);
	    }
	    /**
	     * Возвращает или устанавливает стиль кнопки
	     *
	     * См {@link elyStyle}
	     * @param styleName
	     */
	    buttonStyle(styleName) {
	        if (typeof styleName === "string")
	            styleName = elyStyle_1.default.byName(styleName);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, styleName, this.buttonStyleProperty);
	    }
	    /**
	     * Устанавливает слушатель нажатия или нажимает на кнопку
	     *
	     * @param {Function} [callback = null]
	     * @return {elyButton}
	     */
	    click(callback) {
	        if (callback === undefined) {
	            this.getDocument().click();
	        }
	        else {
	            this.addObserver("click", callback);
	        }
	        return this;
	    }
	    /**
	     * Увеличивает размер кнопки до всего блока
	     */
	    fill() {
	        this.buttonSize(elySize_1.default.fill);
	        return this;
	    }
	};
	elyButton = __decorate([
	    elyDesignable.designable("text", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("buttonSize", elyDesignable.elyDesignableFieldState.GETSET, "string", elySize_1.default.rawList()),
	    elyDesignable.designable("buttonStyle", elyDesignable.elyDesignableFieldState.GETSET, "string", elyStyle_1.default.rawList())
	], elyButton);
	exports.default = elyButton;
	});

	unwrapExports(elyButton_1);

	var elyProgressView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyProgressView.ts                                                   +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Элемент управления: Прогресс бар
	 * @version 1.0
	 */
	let elyProgressView = class elyProgressView extends elyRebuildableViewProtocol_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        /**
	         * Уровень отображения данных
	         */
	        this.displayInfoLevel = 0;
	        this.displayInfoLevel = options.displayInfoLevel || 0;
	        this.maxProperty = new elyObservableProperty_1.default();
	        this.minProperty = new elyObservableProperty_1.default();
	        this.currentProperty = new elyObservableProperty_1.default();
	        this.barStyleProperty = new elyObservableProperty_1.default(elyStyle_1.default.default);
	        this.barStyleProperty.change((newValue, oldValue) => {
	            if (!oldValue)
	                oldValue = elyStyle_1.default.default;
	            this.barView.removeClass(`bg-${oldValue.value}`).addClass(`bg-${newValue.value}`);
	        });
	        this.currentProperty.change((newValue) => {
	            if (newValue < this.min()) {
	                this.current(this.min());
	                return;
	            }
	            else if (newValue > this.max()) {
	                this.current(this.max());
	                return;
	            }
	            this.rebuild();
	        });
	        this.maxProperty.change((newValue) => {
	            if (newValue < this.min()) {
	                this.max(this.min());
	                return;
	            }
	            else if (newValue < this.current()) {
	                this.current(newValue);
	                return;
	            }
	            this.rebuild();
	        });
	        this.minProperty.change((newValue) => {
	            if (newValue > this.max()) {
	                this.min(this.max());
	                return;
	            }
	            else if (newValue > this.current()) {
	                this.current(this.min());
	            }
	            this.rebuild();
	        });
	        this.addClass("ef-pb");
	        this.barView = new elyControl_2.default();
	        this.barView.addClass("bar");
	        this.getDocument().appendChild(this.barView.getDocument());
	        this.denyRebuild(true);
	        this.min(options.min || 0);
	        this.max(options.max || 100);
	        this.denyRebuild(false);
	        this.current(options.current || 0);
	        this.barStyle(elyStyle_1.default.primary);
	    }
	    /**
	     * Возвращает и устанавливает стиль полосы бара
	     */
	    barStyle(value) {
	        if (typeof value === "string")
	            value = elyStyle_1.default.byName(value);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.barStyleProperty);
	    }
	    /**
	     * Устанавливает текущее значение
	     * @param value
	     */
	    current(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.currentProperty);
	    }
	    /**
	     * Устанавливает текущее значение как минимальное
	     */
	    reset() {
	        this.current(this.min());
	        return this;
	    }
	    /**
	     * Устанавливает или возвращает максимальное значение
	     * @param value
	     */
	    max(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.maxProperty);
	    }
	    /**
	     * Устанавливает минимальное значение
	     * @param value
	     */
	    min(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.minProperty);
	    }
	    /**
	     * Вовзаращет процент заполненности
	     * @param {boolean} flex - сглаживание значения процента до
	     * digits значений после запятой
	     *
	     * @param {number} digits - количество значение после запятой
	     */
	    getPercentage(flex = false, digits = 2) {
	        let pc = (this.current() === 0 || this.current() < this.min()) ?
	            0 : this.current() / this.max();
	        pc *= 100;
	        if (flex) {
	            digits *= 10;
	            pc = Math.round(pc * digits) / digits;
	        }
	        return pc;
	    }
	    /**
	     * @ignore
	     * @private
	     */
	    __rebuild() {
	        this.barView.width(this.getPercentage() + "%");
	        if (this.displayInfoLevel === 1) {
	            this.hint(this.getPercentage(true) + "%");
	        }
	        else if (this.displayInfoLevel === 2) {
	            this.hint(`${this.current()} / ${this.max()} [ ${this.getPercentage(true)}% ]`);
	        }
	        return this;
	    }
	};
	elyProgressView = __decorate([
	    elyDesignable.designable("barStyle", elyDesignable.elyDesignableFieldState.GETSET, "string", elyStyle_1.default.list()),
	    elyDesignable.designable("current", elyDesignable.elyDesignableFieldState.GETSET)
	], elyProgressView);
	exports.default = elyProgressView;
	});

	unwrapExports(elyProgressView_1);

	var elyDataGridView_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elyDataGridView.ts                                                   +
	 + Файл изменен: 27.11.2018 22:06:16                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });





	let elyDataGridView = 
	/**
	 * Элемент отображения: Таблица элементов
	 *
	 * @author Diego Ling
	 */
	class elyDataGridView extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param props
	     */
	    constructor(props = {}) {
	        super(Object.assign({}, props, { tag: "table" }));
	        /**
	         * Запрещает обновление
	         */
	        this.denyUpdate = false;
	        /**
	         * Делегат
	         * @ignore
	         */
	        this.itemDelegateProperty = ((rowIndex, colIndex) => {
	            return (this.sourceData[rowIndex] || [])[colIndex] || "";
	        });
	        /**
	         * Делегат заголвков
	         * @ignore
	         */
	        this.headersDelegateProperty = (colIndex => {
	            return (this.headers || [])[colIndex] || "";
	        });
	        /**
	         * Исходные данные
	         * @ignore
	         */
	        this.sourceData = [];
	        /**
	         *  Заголовки
	         *  @ignore
	         */
	        this.headers = null;
	        /**
	         * Делегат запроса на разрешение редактировании ячейки
	         * @ignore
	         */
	        this.allowEditDelegateProperty = (() => false);
	        /**
	         * Делегат обработки сохранения значения
	         * @ignore
	         */
	        this.shouldSaveDelegateProperty = (() => true);
	        this.addClass("ef-dgv");
	        this.denyUpdate = true;
	        this.sourceData = props.sourceData || [];
	        this.headers = props.headers || null;
	        this.rowsCountProperty = new elyObservableProperty_1.default(props.rowsCount || 0);
	        this.colsCountProperty = new elyObservableProperty_1.default(props.colsCount || 0);
	        this.firstColumnIsHeaderProperty = new elyObservableProperty_1.default(props.firstColumnIsHeader || false);
	        this.borderedStyleProperty = new elyObservableProperty_1.default(false);
	        this.titleProperty = new elyObservableProperty_1.default("");
	        this.rowsCountProperty.change(() => this.update());
	        this.colsCountProperty.change(() => this.update());
	        this.firstColumnIsHeaderProperty.change(() => this.update());
	        this.titleProperty.change(() => this.update());
	        this.borderedStyleProperty.change(value => {
	            if (value)
	                this.addClass("bordered");
	            else
	                this.removeClass("bordered");
	        });
	        if (props.title)
	            this.title(props.title);
	        this.borderedStyle(props.borderedStyle || false);
	        this.dataGridViewAllowEdit(() => false);
	        this.dataGridShouldSave(() => true);
	        if (props.sourceData && (!props.rowsCount && !props.colsCount)) {
	            this.rowsCount(props.sourceData.length || 0);
	            this.colsCount((props.sourceData.length || 0) > 0 ? props.sourceData[0].length : 0);
	        }
	        this.denyUpdate = false;
	        this.update();
	    }
	    /**
	     * Возвращает и устанавливает заголовок таблицы
	     */
	    title(value) {
	        const val = elyObservableProperty_1.default.simplePropertyAccess(this, value, this.titleProperty);
	        return val instanceof elyView_1.default ? "" : val;
	    }
	    /**
	     * Возвращает и устанавливает флаг - рамка вокруг таблицы
	     */
	    borderedStyle(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.borderedStyleProperty);
	    }
	    /**
	     * Устанавливает данные
	     * @param sourceData
	     */
	    setData(sourceData) {
	        this.sourceData = sourceData;
	        return this.update();
	    }
	    /**
	     * Устанавливает заголовки
	     * @param headers
	     */
	    setHeaders(headers) {
	        this.headers = headers;
	        return this.update();
	    }
	    /**
	     * Возвращает и устанавливает флаг - первая колонка - колонка заголовков
	     */
	    firstColumnIsHeader(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.firstColumnIsHeaderProperty);
	    }
	    /**
	     * Возвращает и устанавливает количество колонок в таблице
	     */
	    colsCount(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.colsCountProperty);
	    }
	    /**
	     * Возвращает и устанавливает количество строк таблицы
	     */
	    rowsCount(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.rowsCountProperty);
	    }
	    /**
	     * Устанавливает делегат для установки элементов
	     * @param delegate
	     */
	    dataGridViewItem(delegate) {
	        this.itemDelegateProperty = delegate;
	        return this.update();
	    }
	    /**
	     * Устанавливает делегат для установки заголовков
	     * @param delegate
	     */
	    dataGridViewHeader(delegate) {
	        this.headersDelegateProperty = delegate;
	        return this.update();
	    }
	    /**
	     * Устанавливает делегат запроса на разрешение редактировании ячейки
	     * @param delegate
	     */
	    dataGridViewAllowEdit(delegate) {
	        this.allowEditDelegateProperty = delegate;
	        return this.update();
	    }
	    /**
	     * Устанавливает делегат обработки сохранения значения
	     * @param delegate
	     */
	    dataGridShouldSave(delegate) {
	        this.shouldSaveDelegateProperty = delegate;
	        return this.update();
	    }
	    /**
	     * Добавляет наблюдатель: отрисовка строки элемента
	     *
	     * Имя обсервера: rowDraw
	     * @param o
	     */
	    addRowDrawObserver(o) {
	        this.addObserver("rowDraw", o);
	        return this;
	    }
	    /**
	     * Добавляет наблюдатель: отрисовка элемента
	     *
	     * Имя обсервера: cellDraw
	     *
	     * @param o - наблюдатель
	     */
	    addCellDrawObserver(o) {
	        this.addObserver("cellDraw", o);
	        return this;
	    }
	    /**
	     * Добавляет наблюдатель: отрисовка строки заголовков таблицы
	     *
	     * Имя обсервера: headerRowDraw
	     *
	     * @param o - наблюдатель
	     */
	    addHeaderRowDrawObserver(o) {
	        this.addObserver("headerRowDraw", o);
	        return this;
	    }
	    /**
	     * Добавляет наблюдатель: отрисовка элемента заголовка
	     *
	     * Имя обсервера: headerCellDraw
	     *
	     * @param o - наблюдатель
	     */
	    addHeaderCellDrawObserver(o) {
	        this.addObserver("headerCellDraw", o);
	        return this;
	    }
	    /**
	     * Обновляет таблицу
	     */
	    update() {
	        if (this.denyUpdate)
	            return this;
	        this.removeViewContent();
	        //
	        // Отрисовка заголовка
	        //
	        if (this.titleProperty.get()) {
	            const cap = new elyControl_2.default({ tag: "caption" });
	            cap.addSubView(elyControl_2.default.tryMutateToView(this.titleProperty.get()));
	            this.getDocument().append(cap.getDocument());
	        }
	        //
	        // Отрисовка заголовков таблицы
	        //
	        if (this.headers) {
	            const row = new elyControl_2.default({ tag: "tr" });
	            this.notificate("headerRowDraw", [row]);
	            for (let j = 0; j < this.colsCount(); j++) {
	                const col = new elyControl_2.default({ tag: "th" });
	                const cell = elyControl_2.default.tryMutateToView(this.headersDelegateProperty(j));
	                this.notificate("headerCellDraw", [j, col, cell]);
	                col.addSubView(cell);
	                row.addSubView(col);
	            }
	            this.getDocument().append(row.getDocument());
	        }
	        //
	        //  Отрисовка элементов таблицы
	        //
	        for (let i = 0; i < this.rowsCount(); i++) {
	            const row = new elyControl_2.default({ tag: "tr" });
	            this.notificate("rowDraw", [i, row]);
	            for (let j = 0; j < this.colsCount(); j++) {
	                const col = new elyControl_2.default({ tag: (j === 0 && this.firstColumnIsHeader()) ? "th" : "td" });
	                let view = elyTextView_2.default.tryMutateToView(this.itemDelegateProperty(i, j));
	                if (this.allowEditDelegateProperty(i, j)) {
	                    if (view instanceof elyTextView_2.default) {
	                        view = elyTextView_2.default.editable(view);
	                        view.textViewEditableShouldSaveValue((value, res) => {
	                            this.shouldSaveDelegateProperty(i, j, value, shouldSave => {
	                                res(shouldSave);
	                            });
	                        });
	                    }
	                }
	                this.notificate("cellDraw", [i, j, col, view]);
	                col.addSubView(view);
	                row.addSubView(col);
	            }
	            this.getDocument().append(row.getDocument());
	        }
	        return this;
	    }
	};
	elyDataGridView = __decorate([
	    elyDesignable.designable("title", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("rowsCount", elyDesignable.elyDesignableFieldState.GETSET, "number"),
	    elyDesignable.designable("colsCount", elyDesignable.elyDesignableFieldState.GETSET, "number")
	    /**
	     * Элемент отображения: Таблица элементов
	     *
	     * @author Diego Ling
	     */
	], elyDataGridView);
	exports.default = elyDataGridView;
	});

	unwrapExports(elyDataGridView_1);

	var elyUIExt = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIExt.ts                                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * Создает {@link elyTextView} элемент из строки
	 * @param options - опции {@link elyTextViewOptions}
	 */
	String.prototype.textView = function (options) {
	    return new elyTextView_2.default(Object.assign({ text: this }, options));
	};
	/**
	 * Создает {@link elyButton} из строки
	 * @param options - опции {@link elyButtonOptions}
	 */
	String.prototype.button = function (options) {
	    return new elyButton_1.default(Object.assign({ text: this }, options));
	};
	/**
	 * Создает {@link elyIconView} из строки
	 * @param options - опции {@link elyIconViewOptions}
	 */
	String.prototype.iconView = function (options) {
	    return new elyIconView_1.default(Object.assign({ iconName: this }, options));
	};
	/**
	 * Преборазует массив в Flex сетку
	 */
	Array.prototype.flexGridView = function () {
	    const grid = new elyGridView_1.default();
	    if (this[0] instanceof elyView_1.default) {
	        grid.add(...this);
	    }
	    else {
	        for (const row of this) {
	            grid.add(...row);
	        }
	    }
	    return grid;
	};
	/**
	 * Содает {@link elyListView} из массива строк или элементов
	 * @param options - опции {@link elyListViewOptions}
	 */
	Array.prototype.listView = function (options) {
	    return new elyListView_1.default(Object.assign({ items: this }, options));
	};
	});

	unwrapExports(elyUIExt);

	var elyComboField_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyComboField.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });








	/**
	 * Элемент: Поле выбора значения
	 */
	class elyComboField extends elyField_2.default {
	    /**
	     * Инииилизирует объект
	     * @param {*} [options={}] - параметры
	     */
	    constructor(options = {}) {
	        super(options, new elyInput_1.default({ class: "ef-input" }));
	        this.tipsView = new elyControl_2.default({ class: "ef-tips-view" });
	        this.tipsBoxVisibility = new elyObservableProperty_1.default(false);
	        this.getDocument().append(this.tipsView.getDocument());
	        this.accessoryView.getDocument().oninput =
	            (e) => this.find(this.accessoryView.getDocument().value, e.inputType === "insertText");
	        this.tipsBoxVisibility.change((newValue, oldValue) => {
	            if (oldValue === newValue || !this.editable())
	                return;
	            if (newValue) {
	                this.removeClass("ef-control-opacity");
	                this.tipsView.hidden(false);
	                this.__updateTipsView();
	                this.accessoryView.clearValue();
	                this.accessoryView.getDocument().focus();
	                this.__lock(false);
	                this.__setCancelIcon();
	            }
	            else {
	                this.tipsView.hidden(true);
	                this.accessoryView.value(this.value().key);
	                this.addClass("ef-control-opacity");
	                this.__lock(true);
	                this.__setStaticIcon();
	            }
	        });
	        this.valueProperty.addChangeObserver((oldValue, newValue) => {
	            this.tipsBoxVisibility.set(false);
	            this.accessoryView.value(newValue.key);
	        });
	        this.editableProperty.addChangeObserver((oldValue, newValue) => {
	            if (newValue)
	                this.opacity(1);
	            else
	                this.opacity(0.74);
	        });
	        this.searchResults = new elyObservableDictionary_1.default();
	        this.searchResults.addChangeObserver(() => this.__updateTips());
	        this.items = new elyObservableDictionary_1.default();
	        this.items.change(() => this.clearValue());
	        elyUtils_1.default.forEach(options.items || {}, (index, value) => {
	            this.items.add(index, value);
	        });
	        /**
	         * Максимальное количество поисковых результатов
	         * @type {number}
	         */
	        this.maxSearchResultsCount = options.maxSearchResults || 5;
	        this.__setStaticIcon();
	        this.__lock(true);
	        this.applyProtocolOptions(options);
	        this.actionIconView.hidden(false);
	    }
	    /**
	     * Добавляет элемент
	     * @param title - Заголовок
	     * @param value - Значение
	     */
	    add(title, value) {
	        if (title instanceof Array) {
	            for (const item of title) {
	                this.add(item);
	            }
	            return this;
	        }
	        this.items.add(title, value === undefined ? this.items.count().toString() : value.toString());
	        return this;
	    }
	    /**
	     * Удаляет элементы
	     * @param title
	     */
	    removeItem(title) {
	        this.items.remove(title);
	        return this;
	    }
	    defaultValue() {
	        return { key: "", value: "" };
	    }
	    isEmpty() {
	        return this.value() === null || this.value().value === null;
	    }
	    isValueDefault(value) {
	        const def = this.defaultValue();
	        return value.value === def.value && value.key === def.key;
	    }
	    tryToSetValue(value) {
	        elyUtils_1.default.forEach(this.items.get(), (index, value1, it) => {
	            if (value1 === value) {
	                this.valueProperty.set(this.items.itemByIndex(it));
	                return elyUtils_1.default.BREAK_FLAG;
	            }
	        });
	    }
	    /**
	     * Очищает значение
	     * @return {elyComboField}
	     */
	    clearValue() {
	        this.value(this.defaultValue());
	        this.searchResults.clear();
	        return this;
	    }
	    find(str = "", completion = false) {
	        this.searchResults.clear();
	        this.items.forEach((title, value) => {
	            if (title.toLowerCase().indexOf(str.toLowerCase()) > -1)
	                this.searchResults.add(title, value);
	        });
	        if (this.searchResults.count() === 1 && completion) {
	            this.valueProperty.set(this.searchResults.itemByIndex(0));
	        }
	        else {
	            this.tipsBoxVisibility.set(true);
	            this.__setCancelIcon();
	            this.__updateTips();
	        }
	        return this;
	    }
	    __lock(bool) {
	        this.accessoryView.editable(!bool);
	    }
	    /**
	     * Обновляет положение и размер формы подсказок
	     * @private
	     */
	    __updateTipsView() {
	        const offsetTop = (this.getDocument().offsetTop + this.accessoryView.offSize().height) + "px";
	        const width = (this.offSize().width + 2) + "px";
	        this.tipsView.css({ "top": offsetTop, "width": width, "margin-left": "-1px" });
	    }
	    /**
	     * Обновляет элементы подсказок
	     */
	    __updateTips() {
	        const list = new elyListView_1.default();
	        const results = elyUtils_1.default.cut(this.searchResults.get(), this.maxSearchResultsCount);
	        elyUtils_1.default.forEach(results, (key, value) => {
	            const listItem = new elyTextView_2.default({ text: key });
	            listItem.getDocument().onclick = () => {
	                this.valueProperty.set({ key, value });
	            };
	            list.add(listItem);
	        });
	        this.tipsView.removeViewContent();
	        this.tipsView.addSubView(list);
	    }
	    __setStaticIcon() {
	        this.actionIconView.iconName("search");
	        return this;
	    }
	    /**
	     * Устанавливает иконку при ошибке или отмене
	     * @return {elyTextView}
	     * @protected
	     */
	    __setCancelIcon() {
	        this.actionIconView.iconName("times");
	        return this;
	    }
	    actionIconDidClick() {
	        super.actionIconDidClick();
	        if (!this.editable())
	            return;
	        if (!this.tipsBoxVisibility.get()) {
	            this.find("");
	        }
	        else {
	            this.tipsBoxVisibility.set(false);
	        }
	    }
	}
	exports.default = elyComboField;
	});

	unwrapExports(elyComboField_1);

	var elyFileChooseField_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyFileChooseField.ts                                                +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });










	/**
	 * Поле выбора файла
	 *
	 * @version 1.0
	 */
	let elyFileChooseField = class elyFileChooseField extends elyField_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super({}, new elyInput_1.default({ type: "file" }));
	        this.titleProperty = new elyObservableProperty_1.default("Выбрать файл");
	        this.titleProperty.addChangeObserver((oldValue, newValue) => {
	            this.titleView.text(newValue);
	        });
	        this.titleView = new elyTextView_2.default({ class: "title", text: this.titleProperty.get("") });
	        this.acceptExtensionsProperty = new elyObservableArray_1.default();
	        this.acceptExtensionsProperty.addChangeItemsObserver(() => {
	            const items = this.acceptExtensionsProperty.items();
	            if (items.length > 0)
	                this.accessoryView.attribute("accept", items.join(","));
	            else
	                this.accessoryView.removeAttribute("accept");
	        });
	        this.multiplyFilesProperty = new elyObservableProperty_1.default(true);
	        this.multiplyFilesProperty.addChangeObserver((oldValue, newValue) => {
	            if (newValue)
	                this.accessoryView.attribute("multiple", "multiple");
	            else
	                this.accessoryView.attribute("multiple", null);
	        });
	        this.multiplyFiles(true);
	        this.maxFilesCountValue = 10;
	        this.addClass("ef-file-choose");
	        this.fileChooseView = new elyControl_2.default({ class: "choose-place" });
	        this.fieldLineView.addSubView(this.fileChooseView);
	        if (options.placeholder)
	            this.title(options.placeholder);
	        if (options.title)
	            this.title(options.title);
	        this.fileChooseView.addObserver("click", () => {
	            this.accessoryView.getDocument().click();
	        });
	        this.filesGridView = new elyGridView_1.default({ class: "ef-files-grid", rowMargin: 5 });
	        this.filesGridView.hidden(true);
	        this.fieldLineView.addSubView(this.filesGridView);
	        this.clearValue();
	        // Файлы были выбраны
	        this.accessoryView.getDocument().onchange = () => {
	            const files = this.accessoryView.getDocument().files;
	            if (files.length > 0) {
	                if (!this.multiplyFiles())
	                    this.clearValue();
	                elyUtils_1.default.forEach(files, (k, file) => {
	                    if (this.valueProperty.get([]).length < this.maxFilesCountValue) {
	                        if (elyUtils_1.default.find(this.valueProperty.get(), ((index, value) => value === file)).value === null) {
	                            this.valueProperty.get([]).push(file);
	                        }
	                    }
	                });
	                this.rebuild();
	            }
	        };
	    }
	    /**
	     * Возвращает или устанавливает заголовок
	     * Заголвок - он же placeholder
	     * @param text
	     */
	    title(text) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, text, this.titleProperty);
	    }
	    /**
	     * Разрешает/запрещает загрузку нескольких файлов или возвращает разрешение
	     * @param bool
	     */
	    multiplyFiles(bool) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, bool, this.multiplyFilesProperty);
	    }
	    /**
	     * Устанавливает или возвращает макисмальное количество файлов
	     * @param value
	     */
	    maxFilesCount(value) {
	        if (value === undefined)
	            return this.maxFilesCountValue;
	        this.maxFilesCountValue = value;
	        return this;
	    }
	    /**
	     * Добавляет расширение в фильтр
	     * @param extension
	     */
	    addAcceptExtension(extension) {
	        this.acceptExtensionsProperty.push(extension);
	        return this;
	    }
	    /**
	     * Очищает значение поля и возвращает его в стандартный вид
	     */
	    clearValue() {
	        super.clearValue();
	        this.filesGridView.clearView();
	        this.filesGridView.hidden(true);
	        this.fileChooseView.clearView();
	        this.fileChooseView.addSubView(this.titleView);
	        this.fileChooseView.addSubView(new elyTextView_2.default({
	            class: "description",
	            text: "Нажмите для выбора файла",
	        }));
	        return this;
	    }
	    /**
	     * Стандартное значение
	     */
	    defaultValue() {
	        return [];
	    }
	    /**
	     * Добавляет слушатель события перегрузки количества файлов
	     * @param observer
	     */
	    addOverflowObserver(observer) {
	        this.addObserver("overflow", observer);
	        return this;
	    }
	    /**
	     * Перестроение блока
	     */
	    rebuild() {
	        this.filesGridView.clearView();
	        if (this.filesGridView.hidden() && this.value().length > 0) {
	            this.filesGridView.fadeIn();
	        }
	        if (this.value().length === 0)
	            this.filesGridView.hidden(true);
	        elyUtils_1.default.forEach(this.valueProperty.get(), (k, file) => {
	            const itemView = new elyControl_2.default({ class: "ef-file-item" });
	            const fileIcon = new elyIconView_1.default({ iconName: "file" });
	            const name = new elyTextView_2.default({ class: "title", text: file.name });
	            const remove = new elyTextView_2.default({ class: "remove" });
	            remove.getDocument().innerHTML = "&times;";
	            remove.addObserver("click", () => {
	                const newFiles = [];
	                this.valueProperty.get([]).forEach((value) => {
	                    if (value !== file)
	                        newFiles.push(value);
	                });
	                this.value(newFiles);
	                this.rebuild();
	            });
	            itemView.addSubView(fileIcon);
	            itemView.addSubView(name);
	            itemView.addSubView(remove);
	            this.filesGridView.add(itemView);
	        });
	        const bool = this.valueProperty.get([]).length >= this.maxFilesCountValue;
	        this.accessoryView.editable(!bool);
	        if (bool) {
	            this.fileChooseView.addClass("deny");
	            this.notificate("overflow");
	        }
	        else
	            this.fileChooseView.removeClass("deny");
	        return this;
	    }
	    /**
	     * Возвращает true, если поле пустое
	     */
	    isEmpty() {
	        return this.valueProperty.get([]).length === 0;
	    }
	};
	elyFileChooseField = __decorate([
	    elyDesignable.designable("title", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("maxFilesCount", elyDesignable.elyDesignableFieldState.GETSET, "string|number"),
	    elyDesignable.designable("multiplyFiles", elyDesignable.elyDesignableFieldState.GETSET, "boolean")
	], elyFileChooseField);
	exports.default = elyFileChooseField;
	});

	unwrapExports(elyFileChooseField_1);

	var elySwitchField_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elySwitchField.ts                                                    +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * Поле: Переключатель
	 * @version 1.0
	 */
	let elySwitchField = class elySwitchField extends elyField_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options, new elyInput_1.default({ type: "checkbox" }));
	        this.valueProperty = new elyObservableProperty_1.default(false);
	        this.editableProperty.addChangeObserver((oldValue, newValue) => {
	            this.accessoryView.editable(newValue);
	        });
	        this.valueProperty.addChangeObserver((oldValue, newValue) => {
	            this.accessoryView.getDocument().checked = newValue;
	        });
	        this.accessoryView.valueProperty.addChangeObserver(() => this.valueProperty.set(this.accessoryView.getDocument().checked || false));
	        this.switcherView = new elyControl_2.default({ class: "switcher" });
	        this.switcherBox = new elyControl_2.default({ tag: "label", class: "ef-switch" });
	        this.titleView = new elyTextView_2.default({ class: "title" });
	        this.titleProperty = new elyObservableProperty_1.default();
	        this.addClass("ef-input-switch");
	        this.removeViewContent();
	        this.switcherBox.addSubView(this.accessoryView);
	        this.switcherBox.addSubView(this.switcherView);
	        this.fieldLineView.addSubView(this.switcherBox);
	        this.fieldLineView.addSubView(this.titleView);
	        this.accessoryView.attribute("type", "checkbox");
	        this.getDocument().appendChild(this.fieldLineView.getDocument());
	        this.titleProperty.addChangeObserver((oldValue, newValue) => {
	            this.titleView.text(newValue);
	        });
	        this.editableProperty.addChangeObserver((oldValue, newValue) => this.accessoryView.getDocument().disabled = !newValue);
	        if (options.title)
	            this.titleProperty.set(options.title);
	        this.applyProtocolOptions(options);
	    }
	    /**
	     * Стандартное значение
	     */
	    defaultValue() {
	        return false;
	    }
	    /**
	     * Проверка на пустоту значения elySwitchField, которое всегда отрицательно.
	     * Иными словами, поле {@link elySwitchField} не может быть пустым!
	     */
	    isEmpty() {
	        return false;
	    }
	    /**
	     * @ignore
	     * @param flag
	     */
	    error(flag) {
	        return this;
	    }
	    /**
	     * Устаналивает или возращает заголовок
	     * @param title
	     */
	    title(title) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, title, this.titleProperty);
	    }
	};
	elySwitchField = __decorate([
	    elyDesignable.designable("value", elyDesignable.elyDesignableFieldState.GETSET, "boolean"),
	    elyDesignable.designable("title", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("placeholder", elyDesignable.elyDesignableFieldState.DENY)
	], elySwitchField);
	exports.default = elySwitchField;
	});

	unwrapExports(elySwitchField_1);

	var elyTextAreaField_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyTextAreaField.ts                                                  +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Поле ввода: Многострочный ввод текста
	 */
	class elyTextAreaField extends elyField_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options, new elyInput_1.default({ tag: "textarea" }));
	        this.rowsNumberProperty = new elyObservableProperty_1.default();
	        this.rowsNumberProperty.addChangeObserver((oldValue, newValue) => {
	            this.accessoryView.getDocument().rows = newValue;
	        });
	        this.valueProperty = this.accessoryView.valueProperty;
	        this.applyProtocolOptions(options);
	        this.rowsNumber(options.rowsNumber || 4);
	        this.accessoryView.addInputObserver((value) => this.notificate("input", [value]));
	    }
	    /**
	     * Добавляет слушатель изменения поля
	     * @param observer
	     */
	    addInputObserver(observer) {
	        this.addObserver("input", observer);
	        return this;
	    }
	    /**
	     * Возвращает и устанавливает количество строк
	     */
	    rowsNumber(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.rowsNumberProperty);
	    }
	    /**
	     * Стандартное значение
	     */
	    defaultValue() {
	        return "";
	    }
	    /**
	     * Возвращает true, если поле пустое
	     */
	    isEmpty() {
	        return this.accessoryView.isEmpty();
	    }
	}
	exports.default = elyTextAreaField;
	});

	unwrapExports(elyTextAreaField_1);

	var elyStaticGridView_2 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyStaticGridView.ts                                                 +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var elyStaticGridView_1;







	/**
	 * Элемент отображения: статичная сетка
	 *
	 * Обсерверы:
	 * - col (colView, location, view)
	 */
	let elyStaticGridView = elyStaticGridView_1 = class elyStaticGridView extends elyRebuildableViewProtocol_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        /**
	         * Флекс карта
	         * @ignore
	         */
	        this.flexMapProperty = [];
	        this.denyRebuild(true);
	        this.flexContentView = new elyControl_2.default();
	        this.getDocument().append(this.flexContentView.getDocument());
	        this.views = new elyObservableArray_1.default();
	        this.views.change(() => this.rebuild());
	        this.rowsCountProperty = new elyObservableProperty_1.default(3);
	        this.rowsCountProperty.change(() => this.rebuild());
	        this.colsCountProperty = new elyObservableProperty_1.default(3);
	        this.colsCountProperty.change(() => this.rebuild());
	        this.rowsCount(options.rowsCount || 3);
	        this.colsCount(options.colsCount || 3);
	        this.addClass(this.identifier());
	        if (options.flexMapValues)
	            this.flexMap(...options.flexMapValues);
	        if (options.flexMap)
	            this.flexMap(...options.flexMap);
	        this.setItemsMargin(options.margin || { top: 5, bottom: 5, left: 5, right: 5 });
	        this.denyRebuild(false);
	        this.rebuild();
	    }
	    /**
	     * Возвращает позицию элемента
	     * @param index
	     * @param rowsCount
	     * @param colsCount
	     */
	    static indexIn(index, rowsCount, colsCount) {
	        if (index > -1) {
	            const rowIndex = Math.floor(index / rowsCount);
	            const colIndex = index - (rowIndex * colsCount);
	            return { row: rowIndex, col: colIndex, index };
	        }
	        return { row: -1, col: -1, index: -1 };
	    }
	    /**
	     * Устанавливает внитринний отступ элементов сетки
	     * @param margin
	     */
	    setItemsMargin(margin) {
	        margin = Object.assign({ top: 0, bottom: 0, left: 0, right: 0 }, margin);
	        const styles = {};
	        elyUtils_1.default.applySrc(margin, ["top", "bottom", "left", "right"], styles, "margin-", (val) => {
	            return typeof val === "string" ? val : val + "px";
	        });
	        elyStylesheet_1.default.global.addClass(this.identifier() + " .item", styles);
	        return this;
	    }
	    /**
	     * Возвращает количество flexMap значений
	     */
	    flexMapValuesCount() {
	        return this.colsCount();
	    }
	    /**
	     * Устанавливает или возвращает элементы flexMap
	     * @param index
	     * @param value
	     */
	    flexMapValues(index, value) {
	        if (index === undefined && value === undefined)
	            return this.flexMapProperty;
	        if (index !== undefined && index !== null) {
	            if (value === undefined)
	                return this.flexMapProperty[index] || "auto";
	            if (typeof value === "string") {
	                value = value.trim();
	                if (/-?([0-9.])(px|%|rem)/.test(value)) {
	                    this.flexMapProperty[index] = value;
	                }
	                else {
	                    this.flexMapProperty[index] = value + "%";
	                }
	            }
	            else if (typeof value === "number") {
	                this.flexMapProperty[index] = `${value}%`;
	            }
	            else {
	                this.flexMapProperty[index] = "auto";
	            }
	            this.rebuild();
	        }
	        return this;
	    }
	    /**
	     * Устанавливает флекс карту
	     * @param data
	     */
	    flexMap(...data) {
	        if (data !== undefined && data && data.length > 0) {
	            data.forEach((value, index) => {
	                if (typeof value === "string") {
	                    value = value.trim();
	                    if (/-?([0-9.])(px|%|rem)/.test(value)) {
	                        this.flexMapProperty[index] = value;
	                    }
	                    else {
	                        this.flexMapProperty[index] = value + "%";
	                    }
	                }
	                else if (typeof value === "number") {
	                    this.flexMapProperty[index] = `${value}%`;
	                }
	                else {
	                    this.flexMapProperty[index] = "auto";
	                }
	            });
	            this.rebuild();
	            return this;
	        }
	        return this.flexMapProperty;
	    }
	    /**
	     * Возвращает и устанавливает количество строк
	     */
	    rowsCount(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.rowsCountProperty);
	    }
	    /**
	     * Возвращает и устанавливает количество колонок в строке
	     */
	    colsCount(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.colsCountProperty);
	    }
	    /**
	     * Добавляет элементы
	     * @param views
	     */
	    add(...views) {
	        views.forEach(value => this.views.push(value));
	    }
	    /**
	     * Возвращает позицию элемента
	     * @param view
	     */
	    viewLocation(view) {
	        const index = this.views.indexOf(view);
	        return elyStaticGridView_1.indexIn(index, this.rowsCount(), this.colsCount());
	    }
	    __rebuild() {
	        this.removeViewContent();
	        for (let i = 0; i < this.rowsCount(); i++) {
	            const rowView = new elyControl_2.default();
	            rowView.addClass("ef-flex-box", "row");
	            for (let j = 0; j < this.colsCount(); j++) {
	                const index = i * (this.colsCount()) + j;
	                const colView = new elyControl_2.default({ class: "item" });
	                const flexSize = this.flexMapProperty[j] || `${100 / this.colsCount()}%`;
	                colView.getStyle().flex = `1 1 ${flexSize}`;
	                this[`contentView${index}`] = colView;
	                const view = this.views.item(index);
	                if (view) {
	                    colView.addSubView(this.views.item(index));
	                }
	                rowView.addSubView(colView);
	                this.notificate("col", [colView, { col: j, row: i, index },
	                    view]);
	            }
	            this.getDocument().append(rowView.getDocument());
	        }
	        this.notificate("rebuild", []);
	        return this;
	    }
	};
	elyStaticGridView = elyStaticGridView_1 = __decorate([
	    elyDesignable.designable("rowsCount", elyDesignable.elyDesignableFieldState.GETSET, "number"),
	    elyDesignable.designable("colsCount", elyDesignable.elyDesignableFieldState.GETSET, "number"),
	    elyDesignable.designable("flexMapValues", elyDesignable.elyDesignableFieldState.GETSET, "[string]")
	], elyStaticGridView);
	exports.default = elyStaticGridView;
	});

	unwrapExports(elyStaticGridView_2);

	var elyBodyView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyBodyView.ts                                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/*
	 *
	 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 *
	 *   ,--. o                   |    o
	 *   |   |.,---.,---.,---.    |    .,---.,---.
	 *   |   |||---'|   ||   |    |    ||   ||   |
	 *   `--' ``---'`---|`---'    `---'``   '`---|
	 *              `---'                    `---'
	 *
	 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
	 * Mail: <diegoling33@gmail.com>
	 *
	 * Это программное обеспечение имеет лицензию, как это сказано в файле
	 * COPYING, который Вы должны были получить в рамках распространения ПО.
	 *
	 * Использование, изменение, копирование, распространение, обмен/продажа
	 * могут выполняться исключительно в согласии с условиями файла COPYING.
	 *
	 * Файл: elyBodyView.ts
	 * Файл создан: 19.11.2018 20:52:55
	 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 *
	 *
	 */
	/**
	 * Тело документа
	 */
	class elyBodyView extends elyControl_2.default {
	    /**
	     * Конструктор
	     * @ignore
	     */
	    constructor() {
	        super({ element: document.body });
	    }
	}
	/**
	 * Основной объект тела документа
	 */
	elyBodyView.default = new elyBodyView();
	exports.default = elyBodyView;
	});

	unwrapExports(elyBodyView_1);

	var elyNotificationView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyNotificationView.ts                                               +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Оповещения
	 *
	 * elyNotification (TypeScript)
	 * version 0.1
	 */
	class elyNotificationView extends elyControl_2.default {
	    /**
	     * Конструктор
	     * @param props
	     */
	    constructor(props = elyNotificationView.defaults) {
	        super(props);
	        this.notificationHeight = 0;
	        /**
	         * Флаг нотифицирования
	         */
	        this._isNotified = false;
	        this._isClosable = true;
	        this.options = elyNotificationView.defaults;
	        for (const index in props)
	            this.options[index] = props[index];
	        const scsize = window.outerWidth;
	        if (this.options.width > scsize)
	            this.options.width = scsize - 20;
	        const absoluteWidth = (this.options.width) - 37;
	        // this.identifier("notification_" + Math.floor(Math.random() * (999999 - 1000 + 1) + 1000));
	        this.addClass("ely-notification-panel");
	        this.css({ "background-color": this.options.backgroundColor, "width": this.options.width });
	        const obj = {};
	        obj[this.getDisplayPositions()[0]] = 10 + "px";
	        obj[this.getDisplayPositions()[1]] = 10 + "px";
	        this.css(obj);
	        //
	        //  Close button
	        //
	        this.closeButton = new elyControl_2.default({ tag: "b", class: "ely-notification-close-button" });
	        this.closeButton.css({ color: this.options.titleColor });
	        this.closeButton.getDocument().innerHTML = "&times;";
	        //
	        //  Title
	        //
	        this.titleView = new elyControl_2.default({ class: "ely-notification-title-label" });
	        this.titleView.css({ width: absoluteWidth + "px", color: this.options.titleColor });
	        this.titleView.getDocument().innerHTML = this.options.title || "";
	        //
	        //  Message
	        //
	        this.messageView = new elyControl_2.default({ class: "ely-notification-message-label" });
	        this.messageView.css({ width: absoluteWidth + "px", color: this.options.messageColor });
	        this.messageView.getDocument().innerHTML = this.options.message || "";
	        this.contentView = new elyControl_2.default({ class: "ely-notification-content" });
	        this.contentView.css({
	            "border-top": "1px solid " + this.options.sepColor,
	            "color": this.options.contentColor,
	            "width": this.options.width + "px",
	        });
	        if (this.options.content)
	            this.contentView.addSubView(new elyTextView_2.default({ text: this.options.content }));
	        this.hide();
	        this.closable(this.options.closable);
	    }
	    /**
	     * Закрывает все уведомения, кроме последнего
	     */
	    static closeAllNotificationsToLast() {
	        if (elyNotificationView.defaults.notificationsData.length > 0) {
	            for (let i = 0; i < elyNotificationView.defaults.notificationsData.length - 1; i++)
	                elyNotificationView.defaults.notificationsData[i].dismiss();
	        }
	    }
	    /**
	     * Возвращает позиции оповещения
	     */
	    getDisplayPositions() {
	        return this.options.displayPosition.split("/");
	    }
	    /**
	     * Оторбражает оповещение
	     */
	    present() {
	        if (this._isNotified)
	            return this;
	        //
	        // Set-up
	        //
	        if (this.closable())
	            this.addSubView(this.closeButton);
	        if (this.options.title || this.titleView.getDocument().innerHTML !== "")
	            this.addSubView(this.titleView);
	        this.addSubView(this.messageView);
	        if (this.options.content || this.contentView.getDocument().innerHTML !== "")
	            this.addSubView(this.contentView);
	        this._isNotified = true;
	        elyBodyView_1.default.default.addSubView(this);
	        this.show();
	        this.notificationHeight = this.offSize().height;
	        this.hide();
	        const notifications = elyNotificationView.defaults.notificationsData;
	        const margin = elyNotificationView.defaults.notificationsMargin + this.notificationHeight;
	        const displayPositions = this.getDisplayPositions();
	        this.notificate("show");
	        if (notifications.length > 0) { // In case if notifications are on the screen
	            switch (displayPositions[0]) { // Moves all notifications in true direction
	                case "bottom":
	                    for (const item of notifications)
	                        item.css({ bottom: "+=" + margin + "px" });
	                    break;
	                default:
	                    for (const item of notifications)
	                        item.css({ top: "+=" + margin + "px" });
	                    break;
	            }
	        }
	        notifications.push(this); // Adds notification to list
	        // In case if notifications is too much, clear all to last
	        if (notifications.length > elyNotificationView.defaults.limit)
	            elyNotificationView.closeAllNotificationsToLast();
	        // Fading and moving the notification
	        if (notifications.length > 0)
	            setTimeout(() => {
	                this.fadeIn();
	            }, this.options.moveTime);
	        else
	            this.fadeIn();
	        this.closeButton.addObserver("click", () => {
	            this.dismiss();
	        });
	        if (this.isNotified() && this.closable())
	            setTimeout(() => {
	                this.dismiss();
	            }, this.options.fadeTime + this.options.delay);
	        return this;
	    }
	    /**
	     * Удаляет оповещение с экрана
	     *
	     * @param force - принудительное удаление объкта с экранаx
	     */
	    dismiss(force = false) {
	        if (this.closable() || force) {
	            this.notificate("close");
	            this._isNotified = false;
	            this.fadeOut();
	            const noties = elyNotificationView.defaults.notificationsData;
	            setTimeout(() => {
	                if (noties.length > 0)
	                    if (this.options.displayPosition.split("/")[0] === "top")
	                        for (let j = noties.indexOf(this); j >= 0; j--)
	                            noties[j].css({
	                                top: "-=" + (this.notificationHeight + this.options.notificationsMargin) + "px",
	                            });
	                    else
	                        for (let j = noties.indexOf(this); j >= 0; j--)
	                            noties[j].css({
	                                bottom: "-=" + (this.notificationHeight + this.options.notificationsMargin) + "px",
	                            });
	                const cache = [];
	                for (const item of noties)
	                    if (item !== this)
	                        cache.push(item);
	                elyNotificationView.defaults.notificationsData = cache;
	                try {
	                    this.getDocument().parentNode.removeChild(this.getDocument());
	                }
	                catch (e) {
	                    // Nothing is done
	                }
	            }, this.options.fadeTime);
	        }
	    }
	    /**
	     * Состояние закрывающегося оповещения
	     * @param value
	     */
	    closable(value) {
	        if (value === undefined) {
	            return this._isClosable;
	        }
	        this._isClosable = value;
	        return this;
	    }
	    /**
	     * Возвращает состояние оповещения
	     */
	    isNotified() {
	        return this._isNotified;
	    }
	    hide() {
	        this.hidden(true);
	    }
	    show() {
	        this.hidden(false);
	    }
	}
	/**
	 * Стандартные параметры
	 */
	elyNotificationView.defaults = {
	    animateDuration: 60000,
	    animateSpeed: 700,
	    animation: false,
	    backgroundColor: "#FFFFFF",
	    closable: true,
	    contentColor: "#595959",
	    delay: 5000,
	    displayPosition: "top/right",
	    fadeTime: 500,
	    limit: 15,
	    messageColor: "#595959",
	    moveTime: 500,
	    notificationsData: [],
	    notificationsMargin: 10,
	    sepColor: "#EEEEEE",
	    titleColor: "#595959",
	    width: 400,
	};
	exports.default = elyNotificationView;
	});

	unwrapExports(elyNotificationView_1);

	var elyProgressNotificationView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyProgressNotificationView.ts                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });




	/**
	 * Шаблон прогресса
	 */
	class elyProgressNotificationView extends elyNotificationView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        /**
	         * Индексация строки
	         * @ignore
	         */
	        this.__currentStringIndex = 1;
	        if (!options.strings || options.strings.length === 0)
	            options.strings = ["Пожалуйста, полождите..."];
	        this.iconView = new elyIconView_1.default({ iconName: "refresh", iconSize: 60, iconSpinning: true });
	        this.progressTitleView = new elyTextView_2.default({
	            text: options.progressTitle || "Загрузка...", textSize: elySize_1.default.middle,
	        });
	        this.textView = new elyTextView_2.default({ text: options.strings[0] });
	        const timer = setInterval(() => {
	            if (this.__currentStringIndex === options.strings.length) {
	                clearInterval(timer);
	                return;
	            }
	            this.textView.fadeOut(() => {
	                this.textView.text(options.strings[this.__currentStringIndex]);
	                this.textView.fadeIn();
	                this.__currentStringIndex++;
	            });
	        }, elyProgressNotificationView.STRINGS_TIME * this.__currentStringIndex);
	        this.closable(false);
	        this.contentView.getStyle().textAlign = "center";
	        this.contentView.addSubView(this.iconView);
	        this.contentView.addSubView(this.progressTitleView);
	        this.contentView.addSubView(this.textView);
	    }
	    /**
	     * Устанавливает заголовок загрузки
	     * @param text
	     */
	    progressTitle(text) {
	        this.progressTitleView.text(text);
	        return this;
	    }
	}
	/**
	 * Коэффициент времени, необходимы для переключения строки
	 */
	elyProgressNotificationView.STRINGS_TIME = 3000;
	exports.default = elyProgressNotificationView;
	});

	unwrapExports(elyProgressNotificationView_1);

	var elyModalView_2 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyModalView.ts                                                      +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var elyModalView_1;








	/**w
	 * Элемент отображения: Модальное окно
	 * @version 1.0
	 */
	let elyModalView = elyModalView_1 = class elyModalView extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super(options);
	        this.addClass("ef-modal");
	        // Init
	        this.modalTitleProperty = new elyObservableProperty_1.default();
	        this.modalClosableProperty = new elyObservableProperty_1.default(true);
	        this.modalContentProperty = new elyObservableProperty_1.default();
	        this.modalStyleProperty = new elyObservableProperty_1.default();
	        this.modalContainerView = new elyControl_2.default({ class: "ef-modal-container" });
	        this.modalTitleView = new elyTextView_2.default({ class: "title" });
	        this.modalContentView = new elyControl_2.default({ class: "content" });
	        this.modalCloseButtonView = new elyIconView_1.default({ iconName: "close", class: "close" });
	        // Observe
	        this.modalTitleProperty.addChangeObserver((oldValue, newValue) => this.modalTitleView.text(newValue));
	        this.modalContentProperty.addChangeObserver((oldValue, newValue) => {
	            this.modalContentView.removeViewContent();
	            this.modalContentView.getDocument().append(newValue.getDocument());
	        });
	        this.modalStyleProperty.addChangeObserver((oldValue, newValue) => {
	            if (oldValue)
	                this.modalTitleView.removeClass(`bg-${oldValue.value}`);
	            this.modalTitleView.addClass(`bg-${newValue.value}`);
	        });
	        this.modalClosableProperty.addChangeObserver((oldValue, newValue) => this.modalCloseButtonView.hidden(!newValue));
	        this.modalCloseButtonView.addObserver("click", () => this.dismiss());
	        this.modalTitleView.getDocument().append(this.modalCloseButtonView.getDocument());
	        this.modalContainerView.addSubView(this.modalTitleView);
	        this.modalContainerView.addSubView(this.modalContentView);
	        this.getDocument().append(this.modalContainerView.getDocument());
	        // Set
	        this.modalTitle(options.modalTitle || "Modal");
	        this.modalContent(options.modalContent || elyControl_2.default.empty());
	        this.modalStyle(options.modalStyle || elyStyle_1.default.primary);
	        if (options.modalClosable === undefined)
	            this.modalClosable(true);
	        else
	            this.modalClosable(options.modalClosable);
	    }
	    /**
	     * Открывает следующее модальное окно из стэка
	     */
	    static next() {
	        if (elyModalView_1.queue.length > 0 && elyModalView_1.currentModal === null) {
	            elyModalView_1.currentModal = elyModalView_1.queue.pop();
	            elyBodyView_1.default.default.addSubView(elyModalView_1.currentModal);
	            elyModalView_1.currentModal.fadeIn();
	        }
	    }
	    /**
	     * Отображает модальное окно
	     */
	    present() {
	        this.notificate("present", [this]);
	        elyModalView_1.queue.push(this);
	        elyModalView_1.next();
	    }
	    /**
	     * Скрывает модальное окно
	     * @param force
	     *
	     * Модальное окно может быть "незакрываемым", тогда
	     * удалить его можно только используя параметр `force`.
	     *
	     * @example
	     * myModal.dismiss(true); // Force dismiss modal
	     */
	    dismiss(force = false) {
	        if (this.modalClosable() || force) {
	            this.notificate("dismiss", [this]);
	            this.fadeOut(() => {
	                elyBodyView_1.default.default.removeSubView(this);
	                elyModalView_1.currentModal = null;
	                elyModalView_1.next();
	            });
	        }
	    }
	    /**
	     * Возвращает и устанавливает заголовок окна
	     */
	    modalTitle(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.modalTitleProperty);
	    }
	    /**
	     * Возвращает и устанавливает содержимое модального окна
	     */
	    modalContent(value) {
	        if (typeof value === "string")
	            value = new elyTextView_2.default({ text: value });
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.modalContentProperty);
	    }
	    /**
	     * Возвращает и устанавливает флаг возможности скрытия окна
	     */
	    modalClosable(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.modalClosableProperty);
	    }
	    /**
	     * Возвращает и устанавливает стиль модального окна
	     */
	    modalStyle(value) {
	        if (typeof value === "string")
	            value = elyStyle_1.default.byName(value);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.modalStyleProperty);
	    }
	};
	/**
	 * Текущее окно
	 */
	elyModalView.currentModal = null;
	/**
	 * Очередь из объектов
	 */
	elyModalView.queue = [];
	elyModalView = elyModalView_1 = __decorate([
	    elyDesignable.designable("modalTitle", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("modalContent", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("modalClosable", elyDesignable.elyDesignableFieldState.GETSET, "boolean")
	], elyModalView);
	exports.default = elyModalView;
	});

	unwrapExports(elyModalView_2);

	var elyPanelView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyPanelView.ts                                                      +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	var __decorate = (commonjsGlobal && commonjsGlobal.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });





	/**
	 * Элемент отображения: Панель
	 */
	let elyPanelView = class elyPanelView extends elyControl_2.default {
	    /**
	     * Инициилизирует объект
	     * @param options
	     */
	    constructor(options = {}) {
	        let subviews = [];
	        if (options.subviews) {
	            subviews = options.subviews;
	            options.subviews = [];
	        }
	        super(Object.assign({ class: "ef-panel" }, options));
	        this.titleView = new elyTextView_2.default({ class: "ef-panel-title", text: options.title || "Panel" });
	        this.contentView = new elyControl_2.default({ class: "ef-panel-content", subviews });
	        this.descriptionView = new elyControl_2.default({ class: "ef-panel-description" });
	        this.panelStyleProperty = new elyObservableProperty_1.default();
	        this.panelStyleProperty.addChangeObserver((oldValue, newValue) => {
	            if (oldValue) {
	                this.titleView.removeClass(`bg-${oldValue.value}`);
	                this.removeClass(`brd-${oldValue.value}`);
	            }
	            this.titleView.addClass(`bg-${newValue.value}`);
	            this.addClass(`brd-${newValue.value}`);
	        });
	        this.panelStyle(options.panelStyle || elyStyle_1.default.default);
	        this.addSubView(this.titleView);
	        this.addSubView(this.contentView);
	        this.addSubView(this.descriptionView);
	        this.titleView.textCenter(true);
	    }
	    /**
	     * Возвращает или устанавливает заголвок
	     * @param value
	     */
	    title(value) {
	        if (value === undefined)
	            return this.titleView.text();
	        this.titleView.text(value);
	        return this;
	    }
	    /**
	     * Возвращает и устанавливает стиль панели
	     */
	    panelStyle(value) {
	        if (typeof value === "string")
	            value = elyStyle_1.default.byName(value);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.panelStyleProperty);
	    }
	};
	elyPanelView = __decorate([
	    elyDesignable.designable("title", elyDesignable.elyDesignableFieldState.GETSET, "string"),
	    elyDesignable.designable("panelStyle", elyDesignable.elyDesignableFieldState.GETSET, "string", elyStyle_1.default.rawList()),
	    elyDesignable.designable("contentView", elyDesignable.elyDesignableFieldState.VIEW),
	    elyDesignable.designable("descriptionView", elyDesignable.elyDesignableFieldState.VIEW)
	], elyPanelView);
	exports.default = elyPanelView;
	});

	unwrapExports(elyPanelView_1);

	var elyScrollView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyScrollView.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * Элемент с прокруткой
	 */
	class elyScrollView extends elyControl_2.default {
	    /**
	     * Конструктор
	     * @param option
	     */
	    constructor(option = {}) {
	        super({ class: "ef-scroll-view" });
	        this.scrollHorizontalProperty = new elyObservableProperty_1.default();
	        this.scrollVerticalProperty = new elyObservableProperty_1.default();
	        this.scrollSnapCenterProperty = new elyObservableProperty_1.default();
	        this.scrollHorizontalProperty.change((newValue) => {
	            if (newValue)
	                this.addClass("horizontal");
	            else
	                this.removeClass("horizontal");
	        });
	        this.scrollVerticalProperty.change((newValue) => {
	            if (newValue)
	                this.addClass("vertical");
	            else
	                this.removeClass("vertical");
	        });
	        this.scrollSnapCenterProperty.change((newValue) => {
	            if (newValue)
	                this.addClass("mnd-center");
	            else
	                this.removeClass("mnd-center");
	        });
	        this.scrollHorizontal(option.scrollHorizontal || false);
	        this.scrollVertical(option.scrollVertical || false);
	        this.scrollSnapCenter(option.scrollSnapCenter || false);
	    }
	    /**
	     * Возвращает и устанавливает скроллинг по вертикали
	     */
	    scrollVertical(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.scrollVerticalProperty);
	    }
	    /**
	     * Возвращает и устанавливает скроллинг по горизонтали
	     */
	    scrollHorizontal(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.scrollHorizontalProperty);
	    }
	    /**
	     * Возвращает и устанавливает флаг фиксации элементов прокрутки в центре блока
	     */
	    scrollSnapCenter(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.scrollSnapCenterProperty);
	    }
	    /**
	     * Прокручивает объект элементы
	     * @param h
	     * @param v
	     */
	    scrollBy(h, v = 0) {
	        this.getDocument().scrollBy({ top: h, left: v, behavior: "smooth" });
	        return this;
	    }
	    /**
	     * Прокручивает объект горизонтально
	     * @param value
	     */
	    scrollHorizontalBy(value) {
	        return this.scrollBy(value, 0);
	    }
	    /**
	     * Прокручивает объект вертикально
	     * @param value
	     */
	    scrollVerticalBy(value) {
	        return this.scrollBy(value, 0);
	    }
	}
	exports.default = elyScrollView;
	});

	unwrapExports(elyScrollView_1);

	var elyCookie_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyCookie.ts                                                         +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Печеньки
	 */
	class elyCookie {
	    /**
	     * Возвращает данные cookie
	     * @param name
	     */
	    static get(name) {
	        const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
	        const val = matches ? decodeURIComponent(matches[1]) : null;
	        if (val && (val === "undefined" || val === "null"))
	            return null;
	        return val;
	    }
	    /**
	     * Устанавливает cookie
	     * @param name
	     * @param value
	     * @param options
	     */
	    static set(name, value, options) {
	        options = options || {};
	        let expires = options.expires;
	        if (typeof expires === "number" && expires) {
	            const d = new Date();
	            d.setTime(d.getTime() + expires * 1000);
	            expires = options.expires = d;
	        }
	        if (expires && expires.toUTCString) {
	            options.expires = expires.toUTCString();
	        }
	        value = encodeURIComponent(value);
	        let updatedCookie = name + "=" + value;
	        for (const propName in options) {
	            if (!options.hasOwnProperty(propName))
	                continue;
	            updatedCookie += "; " + propName;
	            const propValue = options[propName];
	            if (propValue !== true) {
	                updatedCookie += "=" + propValue;
	            }
	        }
	        document.cookie = updatedCookie;
	    }
	}
	exports.default = elyCookie;
	});

	unwrapExports(elyCookie_1);

	var elyTime_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyTime.ts                                                           +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Модуль elyFlat для работы со временем
	 */
	class elyTime {
	    /**
	     * Конструткор
	     * @param {*} options - опции
	     */
	    constructor(options = { date: new Date() }) {
	        this.date = options.date;
	    }
	    /**
	     * Создает объект времени по дате
	     * @param {number} day - день
	     * @param {number} month - месяц
	     * @param {number} year - год
	     * @param {number} hour - час
	     * @param {number} minute - минута
	     * @param {number} second - секунда
	     */
	    static byDate(day = 0, month = 0, year = 0, hour = 0, minute = 0, second = 0) {
	        return new elyTime({ date: new Date(year, month - 1, day, hour, minute, second) });
	    }
	    /**
	     * Созвращает объект текущего времени
	     */
	    static now() {
	        return new elyTime({ date: new Date() });
	    }
	    /**
	     * Возвращает количество часов со склонением
	     * @param {number} value - значение
	     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
	     * величины закловной
	     */
	    static hoursString(value, isUpperFirstChar = false) {
	        return elyTime.__stringByLastNumber(value, [
	            "часов",
	            "час",
	            "часа",
	        ], isUpperFirstChar);
	    }
	    /**
	     * Возвращает количество минут со склонением
	     * @param {number} value - значение
	     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
	     * величины закловной
	     */
	    static minutesString(value, isUpperFirstChar = false) {
	        return elyTime.__stringByLastNumber(value, [
	            "минут",
	            "минута",
	            "минуты",
	        ], isUpperFirstChar);
	    }
	    /**
	     * Возвращает количество секунд со склонением
	     * @param {number} value - значение
	     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
	     * величины закловной
	     */
	    static secondsString(value, isUpperFirstChar = false) {
	        return elyTime.__stringByLastNumber(value, [
	            "секунд",
	            "секунда",
	            "секунды",
	        ], isUpperFirstChar);
	    }
	    /**
	     * Возвращает количество дней со склонением
	     * @param {number} value - значение
	     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
	     * величины закловной
	     */
	    static daysString(value, isUpperFirstChar = false) {
	        return elyTime.__stringByLastNumber(value, [
	            "дней",
	            "день",
	            "дня",
	        ], isUpperFirstChar);
	    }
	    /**
	     * Возвращает количество месяцев со склонением
	     * @param {number} value - значение
	     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
	     * величины закловной
	     */
	    static monthsString(value, isUpperFirstChar = false) {
	        return elyTime.__stringByLastNumber(value, [
	            "месяцев",
	            "месяц",
	            "месяца",
	        ], isUpperFirstChar);
	    }
	    /**
	     * Возвращает количество лет со склонением
	     * @param {number} value - значение
	     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
	     * величины закловной
	     */
	    static yearsString(value, isUpperFirstChar = false) {
	        return elyTime.__stringByLastNumber(value, [
	            "лет",
	            "год",
	            "года",
	        ], isUpperFirstChar);
	    }
	    /**
	     * Преобразует временной код в части: дни, часы, минуты, секунды.
	     * Такая технология может быть полезна для создания таймеров.
	     *
	     * Использование:
	     * - Сначала необходимо получить разницу веремни, например, используя вычитание;
	     * - Полученное значение может быть трансформировано через этот метод.
	     *
	     * @param {number }timeCode - врменной код
	     * @return elyTimeDifferences
	     */
	    static timeCodeToVars(timeCode) {
	        const source = timeCode;
	        timeCode /= 1000;
	        const _days = Math.floor(timeCode / 86400);
	        timeCode -= _days * 86400;
	        const _hours = Math.floor(timeCode / 3600) % 24;
	        timeCode -= _hours * 3600;
	        const _minutes = Math.floor(timeCode / 60) % 60;
	        timeCode -= _minutes * 60;
	        const _seconds = Math.floor(timeCode % 60);
	        return { days: _days, hours: _hours, minutes: _minutes, seconds: _seconds, source };
	    }
	    static __stringByLastNumber(num, list, isUpperFirstChar) {
	        const str = list[elyTime.__lastNumberChar(num)];
	        return num + " " + (isUpperFirstChar ? (str[0].toUpperCase() + str.substr(1)) : str);
	    }
	    static __lastNumberChar(num) {
	        const d100 = num % 100;
	        if (d100 > 10 && d100 < 15)
	            return 0;
	        const d10 = num % 10;
	        if (d10 === 0 || d10 > 4)
	            return 0;
	        if (d10 === 1)
	            return 1;
	        if (d10 > 1 && d10 < 5)
	            return 2;
	        return 0;
	    }
	    /**
	     * Возвращает timestamp
	     */
	    getTime() {
	        return this.date.getTime();
	    }
	    /**
	     * Возвращает количество дней в месяце для
	     * даты, указанной в elyTime.
	     */
	    getDaysInMonth() {
	        return 32 - new Date(this.date.getFullYear(), this.date.getMonth(), 32).getDate();
	    }
	    /**
	     * Возвращает разницу времени
	     * @param {elyTime} time - время сравнения
	     */
	    getDifference(time) {
	        return elyTime.timeCodeToVars(Math.abs(this.getTime() - time.getTime()));
	    }
	    /**
	     * Возвращает разницу времени
	     */
	    getDifferenceNow() {
	        return this.getDifference(elyTime.now());
	    }
	    /**
	     * Возвращает true, елси текущее время позже, чем время,
	     * указанное в аршументе.
	     * @param {elyTime} time - время сравнения
	     */
	    isLaterThen(time) {
	        return this.getDifference(time).source > 0;
	    }
	    /**
	     * Возвращает строку времени
	     * @param {boolean} withTime - если установлено true, в строке будет отображено
	     * время в формате HH:MM:SS
	     */
	    getString(withTime = false) {
	        const dateString = this.formatZero(this.date.getDate()) + "." +
	            this.formatZero(this.date.getMonth() + 1) + "." + this.date.getFullYear();
	        if (!withTime)
	            return dateString;
	        const timeString = this.formatZero(this.date.getHours()) + ":" +
	            this.formatZero(this.date.getMinutes()) + ":" + this.formatZero(this.date.getSeconds());
	        return `${dateString} ${timeString}`;
	    }
	    /**
	     * Возвращает строку времени
	     * @param withSeconds - флаг секунд. Добавляет или убирает SS из формата.
	     */
	    getTimeString(withSeconds = true) {
	        let ts = this.formatZero(this.date.getHours()) + ":" +
	            this.formatZero(this.date.getMinutes());
	        if (withSeconds)
	            ts += ":" + this.formatZero(this.date.getSeconds());
	        return ts;
	    }
	    /**
	     * Возвращает дату
	     */
	    getDate() {
	        return { date: this.date.getDate(), month: this.date.getMonth() + 1, year: this.date.getFullYear() };
	    }
	    /**
	     * Возвращает время
	     */
	    getDateTime() {
	        return {
	            hours: this.date.getHours(),
	            milliseconds: this.date.getMilliseconds(),
	            minutes: this.date.getMinutes(),
	            seconds: this.date.getSeconds(),
	        };
	    }
	    /**
	     * Возвращает индекс дня недели
	     */
	    getWeekDayIndex() {
	        switch (this.date.getDay()) {
	            case 0:
	                return 6;
	            case 1:
	                return 0;
	            case 2:
	                return 1;
	            case 3:
	                return 2;
	            case 4:
	                return 3;
	            case 5:
	                return 4;
	            case 6:
	                return 5;
	            default:
	                return 0;
	        }
	    }
	    /**
	     * Возвращает название дня недели
	     * @param isShort
	     */
	    getWeekDayName(isShort = false) {
	        return isShort ? elyTime.weekDaysShortList[this.getWeekDayIndex()] :
	            elyTime.weekDaysList[this.getWeekDayIndex()];
	    }
	    /**
	     * Возвращает строку времени
	     */
	    toString() {
	        return this.getString(true);
	    }
	    formatZero(str) {
	        if (str % 10 === str) {
	            return "0" + str;
	        }
	        return String(str);
	    }
	}
	/**
	 * Список дней ндели
	 */
	elyTime.weekDaysList = [
	    "Понедельник", "Вторник", "Среда",
	    "Четверг", "Пятница", "Суббота", "Воскресение",
	];
	/**
	 * Список коротких названий дней недели
	 */
	elyTime.weekDaysShortList = [
	    "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",
	];
	/**
	 * Список названий мясяцев
	 */
	elyTime.monthsList = [
	    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
	    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
	];
	/**
	 * Список названий коротких названий мясяцев
	 */
	elyTime.monthsShortList = [
	    "Янв", "Фев", "Мрт", "Апр", "Май", "Июн",
	    "Июл", "Авг", "Сен", "Окт", "Ноб", "Дек",
	];
	exports.default = elyTime;
	});

	unwrapExports(elyTime_1);

	var elyGetRequest_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyGetRequest.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });



	/**
	 * Выполняет GET запрос
	 */
	class elyGetRequest extends elyObservable_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options) {
	        super();
	        /**
	         * Парсинг запроса
	         */
	        this.useJson = true;
	        if (typeof options === "string")
	            options = { url: options };
	        if (typeof options.url === "string")
	            options.url = new elyURL_1.default(options.url);
	        this.url = options.url;
	        this.xhr = new XMLHttpRequest();
	        this.applyListeners(this.xhr);
	    }
	    /**
	     * Отправляет запрос
	     * @param data
	     * @param callback
	     */
	    send(data, callback) {
	        const params = typeof data === "string" ? data : Object.keys(data).map(k => encodeURIComponent(k) + "="
	            + encodeURIComponent(data[k])).join("&");
	        this.xhr.open("GET", this.url.absoluteString + "?" + params);
	        this.xhr.onreadystatechange = () => {
	            if (this.xhr.readyState === XMLHttpRequest.DONE) {
	                let resp = this.xhr.response;
	                try {
	                    if (this.useJson)
	                        resp = JSON.parse(resp);
	                }
	                catch (e) {
	                    elyLogger_1.default.warning("Ошибка возникла при обработке JSON в elyGetRequest! " + this.url.absoluteString);
	                    elyLogger_1.default.debugObject(this);
	                    resp = null;
	                }
	                if (callback)
	                    callback(resp, this.xhr.status);
	            }
	        };
	        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        this.xhr.send();
	    }
	    /**
	     * Добавляет слушатель изменения прогресса
	     * @param observer
	     */
	    addProgressChangedObserver(observer) {
	        this.addObserver("progressChanged", observer);
	        return this;
	    }
	    /**
	     * Добавляет слушатель ошибки
	     * @param observer
	     */
	    addErrorObserver(observer) {
	        this.addObserver("error", observer);
	        return this;
	    }
	    /**
	     * Добавляет слушатель прерывания запроса
	     * @param observer
	     */
	    addAbortObserver(observer) {
	        this.addObserver("abort", observer);
	        return this;
	    }
	    /**
	     * Добавляет слушатели
	     * @ignore
	     */
	    applyListeners(xhr) {
	        xhr.onerror = ev => this.notificate("error", [ev]);
	        xhr.onprogress = ev => this.notificate("progressChanged", [ev.loaded, ev.total]);
	        xhr.onabort = () => this.notificate("abort", []);
	    }
	}
	exports.default = elyGetRequest;
	});

	unwrapExports(elyGetRequest_1);

	var elyPostRequest_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyPostRequest.ts                                                    +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });


	/**
	 * POST запрос
	 */
	class elyPostRequest extends elyGetRequest_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options) {
	        super(options);
	    }
	    /**
	     * Отправляет данные
	     * @param data
	     * @param callback
	     */
	    send(data, callback) {
	        let fmd = data;
	        if (!(data instanceof FormData)) {
	            fmd = new FormData();
	            for (const index in data) {
	                if (data.hasOwnProperty(index)) {
	                    if (data[index] instanceof Array) {
	                        for (const it of data[index])
	                            fmd.append(index, it);
	                    }
	                    else {
	                        fmd.set(index, data[index]);
	                    }
	                }
	            }
	        }
	        this.xhr.open("POST", this.url.absoluteString);
	        this.xhr.onreadystatechange = () => {
	            if (this.xhr.readyState === XMLHttpRequest.DONE) {
	                let resp = this.xhr.response;
	                try {
	                    if (this.useJson)
	                        resp = JSON.parse(resp);
	                }
	                catch (e) {
	                    elyLogger_1.default.warning("Ошибка возникла при обработке JSON в elyGetRequest! " + this.url.absoluteString);
	                    elyLogger_1.default.debugObject(this);
	                    resp = null;
	                }
	                if (callback)
	                    callback(resp, this.xhr.status);
	            }
	        };
	        // this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        this.xhr.send(fmd);
	    }
	}
	exports.default = elyPostRequest;
	});

	unwrapExports(elyPostRequest_1);

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
	 + Файл: color.picker.ts                                                      +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	/* tslint:disable */
	(function (win, doc, NS) {
	    var instance = '__instance__', first = 'firstChild', delay = setTimeout;
	    function is_set(x) {
	        return typeof x !== "undefined";
	    }
	    function is_string(x) {
	        return typeof x === "string";
	    }
	    function is_object(x) {
	        return typeof x === "object";
	    }
	    function object_length(x) {
	        return Object.keys(x).length;
	    }
	    function edge(a, b, c) {
	        if (a < b)
	            return b;
	        if (a > c)
	            return c;
	        return a;
	    }
	    function num(i, j) {
	        return parseInt(i, j || 10);
	    }
	    function round(i) {
	        return Math.round(i);
	    }
	    // OK
	    // [h, s, v] ... 0 <= h, s, v <= 1
	    // @ts-ignore
	    function HSV2RGB(a) {
	        var h = +a[0], s = +a[1], v = +a[2], r, g, b, i, f, p, q, t;
	        i = Math.floor(h * 6);
	        f = h * 6 - i;
	        p = v * (1 - s);
	        q = v * (1 - f * s);
	        t = v * (1 - (1 - f) * s);
	        i = i || 0;
	        q = q || 0;
	        t = t || 0;
	        switch (i % 6) {
	            case 0:
	                r = v, g = t, b = p;
	                break;
	            case 1:
	                r = q, g = v, b = p;
	                break;
	            case 2:
	                r = p, g = v, b = t;
	                break;
	            case 3:
	                r = p, g = q, b = v;
	                break;
	            case 4:
	                r = t, g = p, b = v;
	                break;
	            case 5:
	                r = v, g = p, b = q;
	                break;
	        }
	        // @ts-ignore
	        return [round(r * 255), round(g * 255), round(b * 255)];
	    }
	    // OK
	    // @ts-ignore
	    function HSV2HEX(a) {
	        return RGB2HEX(HSV2RGB(a));
	    }
	    // OK
	    // [r, g, b] ... 0 <= r, g, b <= 255
	    // @ts-ignore
	    function RGB2HSV(a) {
	        var r = +a[0], g = +a[1], b = +a[2], max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, h, s = (max === 0 ? 0 : d / max), v = max / 255;
	        switch (max) {
	            case min:
	                h = 0;
	                break;
	            case r:
	                h = (g - b) + d * (g < b ? 6 : 0);
	                h /= 6 * d;
	                break;
	            case g:
	                h = (b - r) + d * 2;
	                h /= 6 * d;
	                break;
	            case b:
	                h = (r - g) + d * 4;
	                h /= 6 * d;
	                break;
	        }
	        return [h, s, v];
	    }
	    // OK
	    function RGB2HEX(a) {
	        var s = +a[2] | (+a[1] << 8) | (+a[0] << 16);
	        // @ts-ignore
	        s = '000000' + s.toString(16);
	        // @ts-ignore
	        return s.slice(-6);
	    }
	    // rrggbb or rgb //ok
	    // @ts-ignore
	    function HEX2HSV(s) {
	        return RGB2HSV(HEX2RGB(s));
	    }
	    //OK
	    function HEX2RGB(s) {
	        if (s.length === 3) {
	            s = s.replace(/./g, '$&$&');
	        }
	        return [num(s[0] + s[1], 16), num(s[2] + s[3], 16), num(s[4] + s[5], 16)];
	    }
	    // convert range from `0` to `360` and `0` to `100` in color into range from `0` to `1`
	    function _2HSV_pri(a) {
	        return [+a[0] / 360, +a[1] / 100, +a[2] / 100];
	    }
	    // convert range from `0` to `1` into `0` to `360` and `0` to `100` in color
	    function _2HSV_pub(a) {
	        return [round(+a[0] * 360), round(+a[1] * 100), round(+a[2] * 100)];
	    }
	    // convert range from `0` to `255` in color into range from `0` to `1`
	    function _2RGB_pri(a) {
	        return [+a[0] / 255, +a[1] / 255, +a[2] / 255];
	    }
	    // *
	    function parse(x) {
	        if (is_object(x))
	            return x;
	        var rgb = /\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i.exec(x), hsv = /\s*hsv\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)\s*$/i.exec(x), hex = x[0] === '#' && x.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
	        if (hex) {
	            return HEX2HSV(x.slice(1));
	        }
	        else if (hsv) {
	            return _2HSV_pri([+hsv[1], +hsv[2], +hsv[3]]);
	        }
	        else if (rgb) {
	            return RGB2HSV([+rgb[1], +rgb[2], +rgb[3]]);
	        }
	        return [0, 1, 1]; // default is red
	    }
	    (function ($) {
	        // plugin version
	        // @ts-ignore
	        $.version = '1.4.0';
	        // collect all instance(s)
	        // @ts-ignore
	        $[instance] = {};
	        // plug to all instance(s)
	        // @ts-ignore
	        $.each = function (fn, t) {
	            return delay(function () {
	                // @ts-ignore
	                var ins = $[instance], i;
	                for (i in ins) {
	                    fn.call(ins[i], i, ins);
	                }
	            }, t === 0 ? 0 : (t || 1)), $;
	        };
	        // static method(s)
	        // @ts-ignore
	        $.parse = parse;
	        // @ts-ignore
	        $._HSV2RGB = HSV2RGB;
	        // @ts-ignore
	        $._HSV2HEX = HSV2HEX;
	        // @ts-ignore
	        $._RGB2HSV = RGB2HSV;
	        // @ts-ignore
	        $._HEX2HSV = HEX2HSV;
	        // @ts-ignore
	        $._HEX2RGB = function (a) {
	            return _2RGB_pri(HEX2RGB(a));
	        };
	        // @ts-ignore
	        $.HSV2RGB = function (a) {
	            return HSV2RGB(_2HSV_pri(a));
	        };
	        // @ts-ignore
	        $.HSV2HEX = function (a) {
	            return HSV2HEX(_2HSV_pri(a));
	        };
	        // @ts-ignore
	        $.RGB2HSV = function (a) {
	            return _2HSV_pub(RGB2HSV(a));
	        };
	        // @ts-ignore
	        $.RGB2HEX = RGB2HEX;
	        // @ts-ignore
	        $.HEX2HSV = function (s) {
	            return _2HSV_pub(HEX2HSV(s));
	        };
	        // @ts-ignore
	        $.HEX2RGB = HEX2RGB;
	        // @ts-ignore
	    })(win[NS] = function (source, events, parent) {
	        var b = doc.body, h = doc.documentElement, $ = this, 
	        // @ts-ignore
	        $$ = win[NS], _ = false, hooks = {}, self = doc.createElement('div'), on_down = "touchstart mousedown", on_move = "touchmove mousemove", on_up = "touchend mouseup", on_resize = "orientationchange resize";
	        // return a new instance if `CP` was called without the `new` operator
	        if (!($ instanceof $$)) {
	            return new $$(source, events);
	        }
	        // store color picker instance to `CP.__instance__`
	        $$[instance][source.id || source.name || object_length($$[instance])] = $;
	        // trigger color picker panel on click by default
	        if (!is_set(events) || events === true) {
	            events = on_down;
	        }
	        // add event
	        function on(ev, el, fn) {
	            ev = ev.split(/\s+/);
	            for (var i = 0, ien = ev.length; i < ien; ++i) {
	                el.addEventListener(ev[i], fn, false);
	            }
	        }
	        // remove event
	        function off(ev, el, fn) {
	            ev = ev.split(/\s+/);
	            for (var i = 0, ien = ev.length; i < ien; ++i) {
	                el.removeEventListener(ev[i], fn);
	            }
	        }
	        // get mouse/finger coordinate
	        function point(el, e) {
	            var T = 'touches', X = 'clientX', Y = 'clientY', x = !!e[T] ? e[T][0][X] : e[X], y = !!e[T] ? e[T][0][Y] : e[Y], o = offset(el);
	            return {
	                x: x - o.l,
	                y: y - o.t
	            };
	        }
	        // get position
	        function offset(el) {
	            var left, top, rect;
	            if (el === win) {
	                // @ts-ignore
	                left = win.pageXOffset || h.scrollLeft;
	                // @ts-ignore
	                top = win.pageYOffset || h.scrollTop;
	            }
	            else {
	                rect = el.getBoundingClientRect();
	                left = rect.left;
	                top = rect.top;
	            }
	            return {
	                l: left,
	                t: top
	            };
	        }
	        // get closest parent
	        function closest(a, b) {
	            while ((a = a.parentElement) && a !== b)
	                ;
	            return a;
	        }
	        // prevent default
	        function prevent(e) {
	            if (e)
	                e.preventDefault();
	        }
	        // get dimension
	        function size(el) {
	            return el === win ? {
	                w: win.innerWidth,
	                h: win.innerHeight
	            } : {
	                w: el.offsetWidth,
	                h: el.offsetHeight
	            };
	        }
	        // get color data
	        function get_data(a) {
	            return _ || (is_set(a) ? a : false);
	        }
	        // set color data
	        function set_data(a) {
	            _ = a;
	        }
	        // add hook
	        function add(ev, fn, id) {
	            if (!is_set(ev))
	                return hooks;
	            // @ts-ignore
	            if (!is_set(fn))
	                return hooks[ev];
	            // @ts-ignore
	            if (!is_set(hooks[ev]))
	                hooks[ev] = {};
	            // @ts-ignore
	            if (!is_set(id))
	                id = object_length(hooks[ev]);
	            // @ts-ignore
	            return hooks[ev][id] = fn, $;
	        }
	        // remove hook
	        function remove(ev, id) {
	            if (!is_set(ev))
	                return hooks = {}, $;
	            // @ts-ignore
	            if (!is_set(id))
	                return hooks[ev] = {}, $;
	            // @ts-ignore
	            return delete hooks[ev][id], $;
	        }
	        // trigger hook
	        function trigger(ev, a, id) {
	            // @ts-ignore
	            if (!is_set(hooks[ev]))
	                return $;
	            if (!is_set(id)) {
	                // @ts-ignore
	                for (var i in hooks[ev]) {
	                    // @ts-ignore
	                    hooks[ev][i].apply($, a);
	                }
	            }
	            else {
	                // @ts-ignore
	                if (is_set(hooks[ev][id])) {
	                    // @ts-ignore
	                    hooks[ev][id].apply($, a);
	                }
	            }
	            return $;
	        }
	        // initialize data ...
	        set_data($$.parse(source.getAttribute('data-color') || source.value || [0, 1, 1]));
	        // generate color picker pane ...
	        self.className = 'color-picker';
	        self.innerHTML = '<div class="color-picker-container"><span class="color-picker-h"><i></i></span><span class="color-picker-sv"><i></i></span></div>';
	        // @ts-ignore
	        var c = self[first].children, HSV = get_data([0, 1, 1]), // default is red
	        H = c[0], SV = c[1], H_point = H[first], SV_point = SV[first], start_H = 0, start_SV = 0, drag_H = 0, drag_SV = 0, left = 0, top = 0, P_W = 0, P_H = 0, v = HSV2HEX(HSV), 
	        // @ts-ignore
	        set;
	        // on update ...
	        function trigger_(k, x) {
	            if (!k || k === "h") {
	                // @ts-ignore
	                trigger("change:h", x);
	            }
	            if (!k || k === "sv") {
	                // @ts-ignore
	                trigger("change:sv", x);
	            }
	            // @ts-ignore
	            trigger("change", x);
	        }
	        // is visible?
	        function visible() {
	            return self.parentNode;
	        }
	        // create
	        function create(first, bucket) {
	            if (!first) {
	                // @ts-ignore
	                (parent || bucket || b).appendChild(self), $.visible = true;
	            }
	            function click(e) {
	                const t = e.target, is_source = t === source || closest(t, source) === source;
	                if (is_source) {
	                    // @ts-ignore
	                    create();
	                }
	                else {
	                    // @ts-ignore
	                    $.exit();
	                }
	                // @ts-ignore
	                trigger(is_source ? "enter" : "exit", [$]);
	            }
	            P_W = size(self).w;
	            P_H = size(self).h;
	            var SV_size = size(SV), SV_point_size = size(SV_point), H_H = size(H).h, SV_W = SV_size.w, SV_H = SV_size.h, H_point_H = size(H_point).h, SV_point_W = SV_point_size.w, SV_point_H = SV_point_size.h;
	            if (first) {
	                self.style.left = self.style.top = '-9999px';
	                if (events !== false) {
	                    on(events, source, click);
	                }
	                // @ts-ignore
	                $.create = function () {
	                    // @ts-ignore
	                    return create(1), trigger("create", [$]), $;
	                };
	                // @ts-ignore
	                $.destroy = function () {
	                    if (events !== false) {
	                        off(events, source, click);
	                    }
	                    // @ts-ignore
	                    $.exit(), set_data(false);
	                    // @ts-ignore
	                    return trigger("destroy", [$]), $;
	                };
	            }
	            else {
	                fit();
	            }
	            set = function () {
	                // @ts-ignore
	                HSV = get_data(HSV), color();
	                H_point.style.top = (H_H - (H_point_H / 2) - (H_H * +HSV[0])) + 'px';
	                SV_point.style.right = (SV_W - (SV_point_W / 2) - (SV_W * +HSV[1])) + 'px';
	                SV_point.style.top = (SV_H - (SV_point_H / 2) - (SV_H * +HSV[2])) + 'px';
	            };
	            // @ts-ignore
	            $.exit = function (e) {
	                if (visible()) {
	                    // @ts-ignore
	                    visible().removeChild(self);
	                    // @ts-ignore
	                    $.visible = false;
	                }
	                off(on_down, H, down_H);
	                off(on_down, SV, down_SV);
	                off(on_move, doc, move);
	                off(on_up, doc, stop);
	                off(on_resize, win, fit);
	                return $;
	            };
	            function color(e) {
	                var a = HSV2RGB(HSV), b = HSV2RGB([HSV[0], 1, 1]);
	                SV.style.backgroundColor = 'rgb(' + b.join(',') + ')';
	                set_data(HSV);
	                prevent(e);
	            }
	            set();
	            function do_H(e) {
	                var y = edge(point(H, e).y, 0, H_H);
	                HSV[0] = (H_H - y) / H_H;
	                H_point.style.top = (y - (H_point_H / 2)) + 'px';
	                color(e);
	            }
	            function do_SV(e) {
	                var o = point(SV, e), x = edge(o.x, 0, SV_W), y = edge(o.y, 0, SV_H);
	                HSV[1] = 1 - ((SV_W - x) / SV_W);
	                HSV[2] = (SV_H - y) / SV_H;
	                SV_point.style.right = (SV_W - x - (SV_point_W / 2)) + 'px';
	                SV_point.style.top = (y - (SV_point_H / 2)) + 'px';
	                color(e);
	            }
	            function move(e) {
	                if (drag_H) {
	                    do_H(e), v = HSV2HEX(HSV);
	                    if (!start_H) {
	                        // @ts-ignore
	                        trigger("drag:h", [v, $]);
	                        // @ts-ignore
	                        trigger("drag", [v, $]);
	                        trigger_("h", [v, $]);
	                    }
	                }
	                if (drag_SV) {
	                    do_SV(e), v = HSV2HEX(HSV);
	                    if (!start_SV) {
	                        // @ts-ignore
	                        trigger("drag:sv", [v, $]);
	                        // @ts-ignore
	                        trigger("drag", [v, $]);
	                        trigger_("sv", [v, $]);
	                    }
	                }
	                start_H = 0,
	                    start_SV = 0;
	            }
	            // @ts-ignore
	            function stop(e) {
	                var t = e.target, k = drag_H ? "h" : "sv", a = [HSV2HEX(HSV), $], is_source = t === source || closest(t, source) === source, is_self = t === self || closest(t, self) === self;
	                if (!is_source && !is_self) {
	                    // click outside the source or picker element to exit
	                    // @ts-ignore
	                    if (visible() && events !== false)
	                        $.exit(), trigger("exit", [$]), trigger_(0, a);
	                }
	                else {
	                    if (is_self) {
	                        // @ts-ignore
	                        trigger("stop:" + k, a);
	                        // @ts-ignore
	                        trigger("stop", a);
	                        trigger_(k, a);
	                    }
	                }
	                drag_H = 0,
	                    drag_SV = 0;
	            }
	            // @ts-ignore
	            function down_H(e) {
	                start_H = 1,
	                    drag_H = 1,
	                    move(e), prevent(e);
	                // @ts-ignore
	                trigger("start:h", [v, $]);
	                // @ts-ignore
	                trigger("start", [v, $]);
	                trigger_("h", [v, $]);
	            }
	            // @ts-ignore
	            function down_SV(e) {
	                start_SV = 1,
	                    drag_SV = 1,
	                    move(e), prevent(e);
	                // @ts-ignore
	                trigger("start:sv", [v, $]);
	                // @ts-ignore
	                trigger("start", [v, $]);
	                trigger_("sv", [v, $]);
	            }
	            if (!first) {
	                on(on_down, H, down_H);
	                on(on_down, SV, down_SV);
	                on(on_move, doc, move);
	                on(on_up, doc, stop);
	                on(on_resize, win, fit);
	            }
	            // @ts-ignore
	        }
	        create(1);
	        delay(function () {
	            var a = [HSV2HEX(HSV), $];
	            // @ts-ignore
	            trigger("create", a);
	            trigger_(0, a);
	        }, 0);
	        // fit to window
	        // @ts-ignore
	        $.fit = function (o) {
	            var w = size(win), y = size(h), screen_w = w.w - y.w, // vertical scroll bar
	            // @ts-ignore
	            screen_h = w.h - h.clientHeight, // horizontal scroll bar
	            ww = offset(win), to = offset(source);
	            left = to.l + ww.l;
	            top = to.t + ww.t + size(source).h; // drop!
	            if (is_object(o)) {
	                is_set(o[0]) && (left = o[0]);
	                is_set(o[1]) && (top = o[1]);
	            }
	            else {
	                var min_x = ww.l, min_y = ww.t, max_x = ww.l + w.w - P_W - screen_w, max_y = ww.t + w.h - P_H - screen_h;
	                left = edge(left, min_x, max_x) >> 0;
	                top = edge(top, min_y, max_y) >> 0;
	            }
	            self.style.left = left + 'px';
	            self.style.top = top + 'px';
	            // @ts-ignore
	            return trigger("fit", [$]), $;
	        };
	        // for event listener ID
	        function fit() {
	            // @ts-ignore
	            return $.fit();
	        }
	        // set hidden color picker data
	        // @ts-ignore
	        $.set = function (a) {
	            // @ts-ignore
	            if (!is_set(a))
	                return get_data();
	            if (is_string(a)) {
	                a = $$.parse(a);
	            }
	            // @ts-ignore
	            return set_data(a), set(), $;
	        };
	        // alias for `$.set()`
	        // @ts-ignore
	        $.get = function (a) {
	            return get_data(a);
	        };
	        // register to global ...
	        // @ts-ignore
	        $.source = source;
	        // @ts-ignore
	        $.self = self;
	        // @ts-ignore
	        $.visible = false;
	        // @ts-ignore
	        $.on = add;
	        // @ts-ignore
	        $.off = remove;
	        // @ts-ignore
	        $.fire = trigger;
	        // @ts-ignore
	        $.hooks = hooks;
	        // @ts-ignore
	        $.enter = function (bucket) {
	            return create(0, bucket);
	        };
	        // return the global object
	        return $;
	    });
	})(window, document, 'CP');

	var elyColorPickerField_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyColorPickerField.ts                                               +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	// import "../../../ely.flat";





	/**
	 * Поле выблора цвета
	 *
	 *
	 *     // Создаём объект выбора цвета
	 *     let pickerField = new ely.colorPickerField();
	 *
	 *     pickerField.addChangeValueObserver( oldValue, newValue => {
	 *         console.log("Выбран цвет: " + newValue.toString());
	 *     });
	 *
	 *
	 */
	// @autField("value", elyDesignableFieldState.GETSET, "string")
	class elyColorPickerField extends elyField_2.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options = {}) {
	        super({}, new elyInput_1.default(Object.assign({ class: "ef-input", tag: "input" })));
	        this.colorThumbnail = new elyControl_2.default();
	        this.colorThumbnail.addClass("bg-primary");
	        this.colorView = new elyControl_2.default({ class: "ef-color-pict" });
	        this.colorView.addSubView(this.colorThumbnail);
	        this.actionIconView.getDocument().append(this.colorThumbnail.getDocument());
	        this.actionIconView.removeClass("fa").addClass("ef-color-pict");
	        this.colorThumbnail.getDocument().innerHTML = "&nbsp";
	        this.valueProperty.change(value => {
	            this.picker.set(value.toString());
	            this.accessoryView.value(value.toString());
	            this.colorThumbnail.css({ "background-color": value.getDarker(0.2).toString() });
	            this.accessoryView.css({ color: value.getDarker(0.14).toString() });
	        });
	        this.editableProperty.addChangeObserver((oldValue, newValue) => {
	            this.accessoryView.getDocument().disabled = !newValue;
	            if (newValue)
	                this.picker.create();
	            else
	                this.picker.destroy();
	        });
	        // @ts-ignore
	        this.picker = new CP(this.accessoryView.getDocument());
	        this.picker.on("exit", () => {
	            if (this.editable()) {
	                const ec = new elyColor_1.default({ hex: this.accessoryView.value() });
	                this.value(ec);
	            }
	        });
	        // (this.accessoryView as elyInput).addInputObserver(value => {
	        //    const color = new elyColor({hex: value});
	        //    this.value(color);
	        // });
	        this.picker.on("change", (color) => {
	            if ("#" + color === this.value().toString())
	                return;
	            const ec = new elyColor_1.default({ hex: color });
	            this.accessoryView.value(ec.toString());
	            this.colorThumbnail.css({ "background-color": ec.getDarker(0.2).toString() });
	            this.accessoryView.css({ color: ec.getDarker(0.14).toString() });
	        });
	        this.placeholder("#______");
	        this.editable(false);
	        this.applyProtocolOptions(options);
	        this.actionIconView.hidden(false);
	    }
	    defaultValue() {
	        return new elyColor_1.default({ hex: "#000000" });
	    }
	    isEmpty() {
	        return this.accessoryView.isEmpty();
	    }
	    actionIconDidClick() {
	        super.actionIconDidClick();
	        if (!this.editable()) {
	            this.editable(true);
	        }
	        else {
	            this.editable(false);
	        }
	    }
	}
	exports.default = elyColorPickerField;
	});

	unwrapExports(elyColorPickerField_1);

	var ely_module = createCommonjsModule(function (module, exports) {
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
	 + Файл: ely.module.ts                                                        +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	window.elyColorPickerField = elyColorPickerField_1.default;
	});

	unwrapExports(ely_module);

	var elySimpleJSONParser_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elySimpleJSONParser.ts                                               +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Упрощенный парсер JSON без использованию исплюченй
	 */
	class elySimpleJSONParser {
	    /**
	     * JSON парсер, не выкидывающий исключений. В случае неудачного парсинга
	     * аргумент возвратной функции будет принимать значение null.
	     * Ошибка парсинга JSON будет выведена в консоль с уровнем error (3).
	     *
	     * @param str
	     * @param callback
	     */
	    static parse(str, callback) {
	        try {
	            const val = JSON.parse(str);
	            callback(val);
	        }
	        catch (e) {
	            elyLogger_1.default.error("JSON Parsing error: " + e.message);
	            callback(null);
	        }
	    }
	}
	exports.default = elySimpleJSONParser;
	});

	unwrapExports(elySimpleJSONParser_1);

	var elyGuard_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyGuard.ts                                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Безопасность значений
	 */
	class elyGuard {
	    /**
	     * Функция
	     * @param func
	     * @param args
	     * @param callback
	     * @param context
	     */
	    static func(func, args, callback, context) {
	        const result = func.apply(context, args);
	        if (result !== undefined && result !== null)
	            callback(result);
	    }
	    /**
	     * Значение
	     * @param variable
	     * @param callback
	     */
	    static variable(variable, callback) {
	        if (variable !== undefined && variable !== null)
	            callback(variable);
	    }
	}
	exports.default = elyGuard;
	});

	unwrapExports(elyGuard_1);

	var elyUIWSMeta_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIWSMeta.ts                                                       +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Мета данные жлемента
	 */
	class elyUIWSMeta {
	    constructor() {
	        /**
	         * Автоматическая дата
	         */
	        this.autoData = null;
	        /**
	         * Соединен по имени
	         */
	        this.linkedByViewMethod = null;
	    }
	    /**
	     * Замораживает всю мету
	     */
	    static freezeAllMeta() {
	        const obj = {};
	        for (const viewName in elyUIWSMeta.metas) {
	            if (elyUIWSMeta.metas.hasOwnProperty(viewName)) {
	                obj[viewName] = elyUIWSMeta.metas[viewName].freeze();
	            }
	        }
	        return obj;
	    }
	    /**
	     * Замораживает мета значение
	     */
	    freeze() {
	        return {};
	    }
	}
	/**
	 * Мета значения элементов
	 */
	elyUIWSMeta.metas = {};
	exports.default = elyUIWSMeta;
	});

	unwrapExports(elyUIWSMeta_1);

	var elyWSRegex_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSRegex.ts                                                        +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * elyUIWorkshop реестер элементов
	 */
	class elyWSRegex extends elyObservable_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        /**
	         * Зарегистрированные элементы
	         */
	        this.views = new elyObservableDictionary_1.default();
	        /**
	         * Зависимости элементов
	         */
	        this.dependencies = {};
	    }
	    /**
	     * Замораживает элементы
	     */
	    freezeViews() {
	        const freeze = {};
	        this.views.forEach((key, value) => freeze[key] = elyDesignable.elyDesignableCore.freeze(value));
	        return freeze;
	    }
	    /**
	     * Регистрирует элемент, назначает ему имя и щаписывает его
	     * в аттрибут ely-ws-view-name.
	     * @param view
	     * @param forceName - принудительное имя
	     */
	    regView(view, forceName) {
	        const id = view.identifier();
	        const viewName = forceName || view.constructor.name + "-" + id;
	        view.attribute("ely-ws-view-name", viewName);
	        this.views.add(viewName, view);
	        this.notificate("reg", [viewName, view]);
	        return viewName;
	    }
	    /**
	     * Удаляет элемент
	     * @param viewName
	     */
	    unregView(viewName) {
	        if (viewName === "workspace" || !this.views.remove(viewName))
	            return false;
	        // Удаляет регистрацию зависимостей
	        for (const vn in this.dependencies)
	            if (this.dependencies.hasOwnProperty(vn)) {
	                for (const pn in this.dependencies[vn]) {
	                    if (this.dependencies[vn][pn] && this.dependencies[vn][pn] === viewName)
	                        this.dependencies[vn][pn] = null;
	                }
	            }
	        elyGuard_1.default.variable(this.dependencies[viewName], deps => {
	            for (const pn in deps)
	                if (deps.hasOwnProperty(pn))
	                    elyGuard_1.default.variable(this.dependencies[viewName][pn], value => elyUIWorkshop_1.default.remove(value));
	        });
	        if (elyUIWSMeta_1.default.metas[viewName])
	            delete elyUIWSMeta_1.default.metas[viewName];
	        this.notificate("unreg", [true, viewName]);
	        return true;
	    }
	    /**
	     * Добавляет слушатель регистрации
	     * @param o
	     */
	    addRegObserver(o) {
	        this.addObserver("reg", o);
	    }
	    /**
	     * Добавляет слушатель окончания регистрации
	     * @param o
	     */
	    addUnregObserver(o) {
	        this.addObserver("unreg", o);
	    }
	}
	/**
	 * Главный элемент
	 */
	elyWSRegex.main = new elyWSRegex();
	exports.default = elyWSRegex;
	});

	unwrapExports(elyWSRegex_1);

	var elyWSUtils_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSUtils.ts                                                        +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	class elyWSUtils {
	    /**
	     * Возвращает WS имя элемента
	     * @param view
	     */
	    static getWSName(view) {
	        return view.attribute(elyWSUtils.WS_NAME_ATTRIBUTE);
	    }
	    /**
	     * Возвращает элемент по имени
	     * @param name
	     */
	    static getWSViewByName(name) {
	        return elyWSRegex_1.default.main.views.item(name);
	    }
	}
	elyWSUtils.WS_NAME_ATTRIBUTE = "ely-ws-view-name";
	exports.default = elyWSUtils;
	});

	unwrapExports(elyWSUtils_1);

	var elyTabBarView_1 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: elyTabBarView.ts                                                     +
	 + Файл изменен: 23.11.2018 23:52:08                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });






	/**
	 * Элемент отображения: Панель с табами
	 *
	 * @version 1.0
	 */
	class elyTabBarView extends elyRebuildableViewProtocol_1.default {
	    /**
	     * Конструктор
	     * @param props
	     */
	    constructor(props = {}) {
	        super(props);
	        this.addClass("ef-tabs");
	        this.tabsProperty = new elyObservableDictionary_1.default();
	        this.contentView = new elyPanelView_1.default({ hidden: true });
	        this.tabsProperty.change(() => this.rebuild());
	        this.tabBarStyleProperty = new elyObservableProperty_1.default(elyStyle_1.default.default);
	        this.tabBarStyleProperty.change((newValue, oldValue) => {
	            if (oldValue)
	                this.removeClass(`bg-${oldValue.value}`);
	            this.addClass(`bg-${newValue.value}`);
	        });
	        this.tabBarCurrentTabNameProperty = new elyObservableProperty_1.default("");
	        this.tabBarCurrentTabNameProperty.change((value, old) => {
	            this.contentView.hidden(true);
	            this.tabsProperty.forEach((key, tab) => {
	                tab.selected = key === value;
	                if (tab.selected) {
	                    this.contentView.titleView.text(tab.text);
	                    this.contentView.titleView.iconName(tab.iconName);
	                    this.contentView.hidden(false);
	                    if (tab.content) {
	                        this.contentView.contentView.removeViewContent();
	                        this.contentView.contentView.addSubView(tab.content);
	                    }
	                }
	            });
	            this.rebuild();
	        });
	        this.tabBarStyle(props.tabBarStyle || elyStyle_1.default.primary);
	        if (props.tabBarSticky)
	            this.addClass("sticky");
	        this.contentView.descriptionView.removeFromSuperview();
	        this.contentView.titleView.getStyle().border = "none";
	        this.contentView.contentView.getStyle().margin = "-10px";
	        this.contentView.getStyle().position = "fixed";
	        this.contentView.getStyle().width = "340px";
	        this.contentView.getStyle().backgroundColor = "#29353E";
	        this.contentView.getStyle().right = "0";
	        this.contentView.getStyle().zIndex = (parseInt(this.getStyle().zIndex || "1000", 10) - 10).toString();
	    }
	    /**
	     * Возвращает и устанавливает значение текущей вкладки
	     */
	    tabBarCurrentTabName(value) {
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.tabBarCurrentTabNameProperty);
	    }
	    /**
	     * Возвращает и устанавливает стиль бара
	     */
	    tabBarStyle(value) {
	        if (typeof value === "string")
	            value = elyStyle_1.default.byName(value);
	        return elyObservableProperty_1.default.simplePropertyAccess(this, value, this.tabBarStyleProperty);
	    }
	    /**
	     * Добавляет объект
	     * @param name - системное имя
	     * @param tab - сущность
	     */
	    add(name, tab) {
	        this.tabsProperty.add(name, tab);
	        return this;
	    }
	    /**
	     * Выполняет перестроение
	     * @private
	     */
	    __rebuild() {
	        this.removeViewContent();
	        this.getDocument().append(this.contentView.getDocument());
	        this.tabsProperty.forEach((key, value) => {
	            const view = new elyTextView_2.default({ text: value.text, iconName: value.iconName });
	            if (value.selected)
	                view.addClass("active");
	            view.addClass("ef-tabs-item");
	            view.addObserver("click", () => {
	                if (this.tabBarCurrentTabName() === key)
	                    this.tabBarCurrentTabName("");
	                else
	                    this.tabBarCurrentTabName(key);
	            });
	            this.getDocument().append(view.getDocument());
	        });
	        this.contentView.getStyle().top = this.getRect().top + "px";
	        this.contentView.getStyle().right = this.width() + "px";
	        this.contentView.getStyle().height = (window.innerHeight - this.getRect().top) + "px";
	        this.contentView.panelStyle(this.tabBarStyle());
	        return this;
	    }
	}
	exports.default = elyTabBarView;
	});

	unwrapExports(elyTabBarView_1);

	var elyUIWorkshopElementsPanel_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIWorkshopElementsPanel.ts                                        +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });











	/**
	 * Панель созданных элементов
	 */
	class elyUIWorkshopElementsPanel extends elyPanelView_1.default {
	    constructor() {
	        super({ title: "Обзор" });
	        /**
	         * Список элементов
	         */
	        this.gridView = new elyGridView_1.default({ flex: [[15, 70, 15]] });
	        this.scrollView = new elyScrollView_1.default({
	            scrollHorizontal: false,
	            scrollSnapCenter: true,
	            scrollVertical: true,
	        }).height("100%");
	        this.contentView.addSubView(this.scrollView);
	        this.scrollView.addSubView(this.gridView);
	        elyStylesheet_1.default.global.addClass("builderRowItem", {
	            cursor: "pointer",
	            opacity: "0.6",
	        });
	        elyStylesheet_1.default.global.addClass("builderRowItem:hover", {
	            cursor: "pointer",
	            opacity: "1",
	        });
	        this.titleView.hidden(true);
	        this.descriptionView.hidden(true);
	    }
	    /**
	     * Обновляет панель элементов
	     */
	    update() {
	        this.gridView.removeViewContent();
	        let num = 0;
	        elyWSRegex_1.default.main.views.forEach((key, value) => {
	            num++;
	            const nameTextView = key.textView({
	                textWeight: elyWeight_1.default.normal,
	            });
	            const typeNameView = String(value.constructor.name).textView({
	                opacity: 0.7,
	                textSize: elySize_1.default.small,
	                textWeight: elyWeight_1.default.thin,
	            });
	            const nameView = new elyControl_2.default({ subviews: [nameTextView, typeNameView] });
	            nameView.addClass("clickable").addObserver("click", () => {
	                elyUIWorkshop_1.default.selectedViewName.set(key);
	            });
	            const removeButton = new elyTextView_2.default({ iconName: "remove" });
	            removeButton.addClass("clickable");
	            removeButton.getStyle().textAlign = "right";
	            removeButton.getStyle().color = "#aa0000";
	            removeButton.addObserver("click", () => {
	                if (key === "workspace") {
	                    new elyNotificationView_1.default({
	                        message: "Вы не можете удалить корневой элемент!",
	                        title: "Ошибка",
	                    }).present();
	                    return;
	                }
	                elyUIWorkshop_1.default.remove(key);
	            });
	            const numTextView = String(num).textView({ opacity: 0.7 });
	            this.gridView.add(numTextView, nameView, removeButton);
	        });
	    }
	}
	elyUIWorkshopElementsPanel.main = new elyUIWorkshopElementsPanel();
	exports.default = elyUIWorkshopElementsPanel;
	});

	unwrapExports(elyUIWorkshopElementsPanel_1);

	var elyWSOpenProjectWindow_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSOpenProjectWindow.ts                                            +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });







	/**
	 * Окно выбора файла
	 */
	class elyWSOpenProjectWindow {
	    /**
	     * Открывает окно
	     * @param cb
	     */
	    static present(cb) {
	        const modalView = new elyModalView_2.default({ modalTitle: "Открыть проект" });
	        const grid = new elyGridView_1.default();
	        const file = new elyFileChooseField_1.default({ title: "Файл проекта (.elyws)" });
	        file.addAcceptExtension(".elyws");
	        file.maxFilesCount(1);
	        grid.add(file);
	        grid.add(new elyButton_1.default({ text: "Открыть", fill: true }).click(() => {
	            modalView.dismiss(true);
	            elyFlatApplicationPreloader_1.default.default.showScreen("Загрузка проекта...{nl}Пожалуйста подождите!");
	            const reader = new FileReader();
	            reader.onload = () => {
	                try {
	                    if (reader.result) {
	                        const obj = JSON.parse(String(reader.result));
	                        elyUIWorkshop_1.default.restoreSessionFromObject(obj, () => {
	                            elyFlatApplicationPreloader_1.default.default.hideScreen();
	                        });
	                    }
	                    else {
	                        throw Error("Не удалось прочитать файл...");
	                    }
	                }
	                catch (e) {
	                    elyFlatApplicationPreloader_1.default.default.hideScreen();
	                    new elyNotificationView_1.default({ title: "Ошибка открытия проекта", message: e.message }).present();
	                }
	            };
	            reader.readAsText(file.value()[0]);
	        }));
	        modalView.modalContent(grid);
	        modalView.present();
	    }
	}
	exports.default = elyWSOpenProjectWindow;
	});

	unwrapExports(elyWSOpenProjectWindow_1);

	var elyWSSettingsPanel_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSSettingsPanel.ts                                                +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });









	/**
	 * Панель инструментов
	 */
	class elyWSSettingsPanel extends elyPanelView_1.default {
	    constructor() {
	        super({ title: "Инструменты" });
	        const grid = new elyGridView_1.default();
	        this.contentView.addSubView(grid);
	        grid.add(new elySwitchField_1.default({
	            hint: "Скрывает все view-холдеры (empty элементы) из workshop.",
	            title: "скрыть view-холдеры",
	        }).addChangeValueObserver((oldValue, newValue) => {
	            elyStylesheet_1.default.global.addClass("elyuiws-placeolder-item", { display: newValue ? "none" : "block" });
	        }));
	        grid.add(elyControl_2.default.line());
	        const button = new elyButton_1.default({
	            buttonStyle: elyStyle_1.default.secondary,
	            iconName: "download",
	            text: "Сохранить проект",
	        }).fill();
	        button.click(() => {
	            elyUIWorkshop_1.default.saveSessionToObject(sessionObject => {
	                const item = document.createElement("a");
	                const json = JSON.stringify(sessionObject);
	                item.setAttribute("download", "project.elyws");
	                item.setAttribute("href", `data:application/json;charset=utf-8,${json}`);
	                document.body.append(item);
	                item.click();
	                document.body.removeChild(item);
	            });
	        });
	        grid.add(button);
	        const open = new elyButton_1.default({
	            buttonStyle: elyStyle_1.default.secondary,
	            iconName: "upload",
	            text: "Открыть проект",
	        }).fill().click(() => {
	            elyWSOpenProjectWindow_1.default.present(obj => {
	            });
	        });
	        grid.add(open);
	        this.titleView.hidden(true);
	        this.descriptionView.hidden(true);
	    }
	}
	/**
	 * Стандартная панель
	 */
	elyWSSettingsPanel.main = new elyWSSettingsPanel();
	exports.default = elyWSSettingsPanel;
	});

	unwrapExports(elyWSSettingsPanel_1);

	var elyWSRus_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSRus.ts                                                          +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class elyWSRus {
	}
	/**
	 * Параметры
	 */
	elyWSRus.props = {
	    actionString: "Action",
	    buttonSize: "Размер",
	    buttonStyle: "Стиль",
	    colsCount: "Количество колонок",
	    flexMapValues: "Значения флекс карты",
	    rowsCount: "Количество строк",
	    iconName: "Имя иконки",
	    hidden: "Скрытый",
	    hint: "Подсказка",
	    opacity: "Непрозрачность",
	    panelStyle: "Стиль",
	    placeholder: "Placeholder",
	    text: "Текст",
	    textSize: "Размер текста",
	    textWeight: "Толщина текста",
	    title: "Заголовок",
	    value: "Значение",
	};
	exports.default = elyWSRus;
	});

	unwrapExports(elyWSRus_1);

	var elyWSViewPropsPanel_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSViewPropsPanel.ts                                               +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });



















	/**
	 * Панеь настройки элемента
	 */
	class elyWSViewPropsPanel extends elyPanelView_1.default {
	    constructor() {
	        super({ title: "Элемент", hidden: true });
	        /**
	         * Текущее имя в редакторе
	         */
	        this.currentName = null;
	        this.gridView = new elyGridView_1.default({ margin: { bottom: 10 } });
	        this.contentView.addSubView(this.gridView);
	        this.descriptionView.addSubView(new elyButton_1.default({ text: "Код" }).fill().click(() => {
	            if (this.currentName) {
	                const text = JSON.stringify(elyDesignable.elyDesignableCore.freeze(elyWSRegex_1.default.main.views.item(this.currentName)), null, 4);
	                new elyModalView_2.default({ modalTitle: "Код элемента" })
	                    .modalContent(new elyTextAreaField_1.default({ rowsNumber: 12 }).value(text))
	                    .present();
	            }
	        }));
	        this.titleView.hidden(true);
	    }
	    /**
	     * Применяет панель настроек
	     * @param name
	     */
	    applySettingsPanel(name) {
	        elyUIWorkshop_1.default.tabBar.tabBarCurrentTabName("props");
	        const view = elyWSRegex_1.default.main.views.item(name);
	        if (!view)
	            return;
	        this.currentName = name;
	        this.title(name);
	        this.hidden(false);
	        this.gridView.removeViewContent();
	        const v = new elyControl_2.default();
	        v.addSubView("Элемент".textView().textSize(elySize_1.default.small).opacity(0.7));
	        v.addSubView(name.textView());
	        this.gridView.add(v);
	        const data = elyUIWSMeta_1.default.metas[name].autoData;
	        if (!data || !data.fields)
	            return;
	        const autofields = elyUtils_1.default.sortAlphabetic(data.fields);
	        elyUtils_1.default.forEach(autofields, (index, value) => {
	            const ims = this.__create(view, value);
	            if (ims) {
	                const view = new elyControl_2.default();
	                view.addSubView(ims[0].textSize(elySize_1.default.small).opacity(0.7));
	                view.addSubView(ims[1]);
	                this.gridView.add(view);
	            }
	        });
	    }
	    __create(view, afItem) {
	        const titleTextView = new elyTextView_2.default({ text: (elyWSRus_1.default.props[afItem.name] || afItem.name) + ":" });
	        let field = null;
	        if (afItem.state === elyDesignable.elyDesignableFieldState.GETSET || afItem.state === elyDesignable.elyDesignableFieldState.SET) {
	            if (afItem.values && typeof afItem.values === "object") {
	                field = new elyComboField_1.default({ placeholder: afItem.name });
	                elyUtils_1.default.forEach(afItem.values, (index, value) => {
	                    field.add(index, value);
	                });
	                const preVal = typeof view[afItem.name] === "function" ? view[afItem.name]() : null;
	                if (preVal) {
	                    if (preVal.value) {
	                        field.tryToSetValue(preVal.value);
	                    }
	                    else {
	                        field.tryToSetValue(preVal);
	                    }
	                }
	                field.addChangeValueObserver((oldValue, newValue) => {
	                    view[afItem.name](newValue.value);
	                    // this.data.add(afItem.name, newValue.key);
	                });
	            }
	            else if (afItem.values === null && (afItem.type === "string" || afItem.type === "number")) {
	                field = new elyTextField_1.default({
	                    filedType: afItem.type === "string" ? elyFieldType_1.default.text : elyFieldType_1.default.number,
	                    placeholder: afItem.name,
	                });
	                field.addInputObserver((value) => {
	                    view[afItem.name](value);
	                    // this.data.add(afItem.name, value);
	                });
	            }
	            else if (afItem.values === null && afItem.type === "text") {
	                field = new elyTextAreaField_1.default({
	                    placeholder: afItem.name,
	                });
	                field.addInputObserver((value) => {
	                    view[afItem.name](value);
	                    // this.data.add(afItem.name, value);
	                });
	            }
	            else if (afItem.values === null && afItem.type === "boolean") {
	                field = new elySwitchField_1.default();
	                field.addChangeValueObserver((oldValue, newValue) => {
	                    view[afItem.name](newValue);
	                    // this.data.add(afItem.name, newValue);
	                });
	            }
	            else if (afItem.values === null && afItem.type === "[string]") {
	                field = new elyGridRowView_1.default();
	                const count = view[afItem.name + "Count"]();
	                for (let i = 0; i < count; i++) {
	                    const tv = new elyTextField_1.default({ placeholder: afItem.name });
	                    field.add(tv);
	                    tv.addInputObserver((value) => {
	                        view[afItem.name](i, value);
	                    });
	                    if (i > 0)
	                        tv.getStyle().paddingLeft = "5px";
	                    const testValue = view[afItem.name](i);
	                    if (testValue) {
	                        tv.value(testValue);
	                    }
	                }
	            }
	        }
	        if ([elyDesignable.elyDesignableFieldState.GET, elyDesignable.elyDesignableFieldState.GETSET].indexOf(afItem.state) > -1 && field) {
	            const testValue = view[afItem.name]();
	            if (testValue) {
	                if (field instanceof elyComboField_1.default) {
	                    field.tryToSetValue(testValue.value);
	                }
	                else {
	                    if (typeof field.value === "function")
	                        field.value(testValue);
	                }
	            }
	        }
	        if (field) {
	            return [titleTextView, field];
	        }
	        return null;
	    }
	}
	elyWSViewPropsPanel.main = new elyWSViewPropsPanel();
	exports.default = elyWSViewPropsPanel;
	});

	unwrapExports(elyWSViewPropsPanel_1);

	var elyUIWSContextMenu_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIWSContextMenu.ts                                                +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });









	class elyUIWSContextMenu extends elyPanelView_1.default {
	    constructor() {
	        super();
	        this.flexGrid = new elyGridView_1.default({ margin: { left: 0, right: 0, top: 0, bottom: 5 } });
	        this.title("");
	        this.descriptionView.hidden(true);
	        this.getStyle().position = "absolute";
	        this.getStyle().width = "220px";
	        this.hidden(true);
	        document.body.append(this.getDocument());
	        document.body.onclick = () => {
	            this.hidden(true);
	        };
	        this.contentView.addSubView(this.flexGrid);
	    }
	    /**
	     * Обновляет позицию
	     * @param view
	     * @param point
	     */
	    update(view, point) {
	        this.flexGrid.removeViewContent();
	        this.hidden(false);
	        if (point) {
	            this.getStyle().top = point.y + "px";
	            this.getStyle().left = point.x + "px";
	        }
	        else {
	            this.getStyle().top = (view.getDocument().offsetTop || 0) /*+ (view.getRect().height || 0)*/ + "px";
	            this.getStyle().left = (view.getDocument().offsetLeft || 0) + 10 + (view.getRect().width || 0) + "px";
	        }
	        elyGuard_1.default.func(elyWSUtils_1.default.getWSName, [view], name => {
	            this.titleView.textSize(elySize_1.default.small);
	            this.title(name);
	            this.flexGrid.add(new elyButton_1.default({ text: "Свойства", iconName: "cogs" }).click(() => {
	                elyWSViewPropsPanel_1.default.main.applySettingsPanel(name);
	            }).fill().buttonStyle(elyStyle_1.default.primary));
	            this.flexGrid.add(new elyButton_1.default({ text: "Удалить", iconName: "remove" }).click(() => {
	                elyUIWorkshop_1.default.remove(name);
	            }).fill().buttonStyle(elyStyle_1.default.danger));
	        });
	    }
	}
	elyUIWSContextMenu.main = new elyUIWSContextMenu();
	exports.default = elyUIWSContextMenu;
	});

	unwrapExports(elyUIWSContextMenu_1);

	var elyWSCreateViewWindow_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSCreateViewWindow.ts                                             +
	 + Файл изменен: 30.11.2018 03:59:08                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });











	/**
	 * Окно создания элемента
	 */
	class elyWSCreateViewWindow {
	    /**
	     * Отображает окно создания элемента
	     * @param callback
	     */
	    static present(callback) {
	        const modalView = new elyModalView_2.default({ modalTitle: "Создание элемента" });
	        modalView.modalTitleView.iconName("cogs");
	        const flexView = new elyGridView_1.default({ margin: { left: 10, right: 10, top: 0, bottom: 0 } });
	        const textarea = new elyTextAreaField_1.default({ placeholder: "...view code", rowsNumber: 10 });
	        flexView.add(elyWSCreateViewWindow.createSelectView(view => {
	            textarea.value(JSON.stringify(elyDesignable.elyDesignableCore.freeze(view), null, 4));
	        }), textarea);
	        flexView.add(elyControl_2.default.line());
	        flexView.add(new elyButton_1.default({ text: "Создать" })
	            .fill().buttonStyle(elyStyle_1.default.primary).click(() => {
	            try {
	                const obj = JSON.parse(textarea.value());
	                const view = elyControl_2.default.fromObject(obj);
	                if (!view)
	                    throw Error("Не получилось создать жлемент... " +
	                        "Проверьте правильность парамтеров.");
	                modalView.dismiss(true);
	                callback(view);
	            }
	            catch (e) {
	                new elyNotificationView_1.default({
	                    message: e.message,
	                    title: "Ошибка создания элемента",
	                }).present();
	                textarea.error(true);
	            }
	        }));
	        modalView.modalContent(flexView);
	        modalView.present();
	    }
	    /**
	     * Элмент выбора элементов
	     */
	    static createSelectView(cb) {
	        const gridView = new elyGridView_1.default({ margin: { top: 0, left: 0, right: 0, bottom: 10 } });
	        const objs = { views: [], fields: [], actions: [] };
	        const builder = new elyControl_2.default();
	        const result = new elyControl_2.default();
	        elyUtils_1.default.forEach(window, (index, value) => {
	            if (index.endsWith("View"))
	                objs.views.push(index);
	            else if (index.endsWith("Field"))
	                objs.fields.push(index);
	            else
	                objs.actions.push(index);
	        });
	        const catSelection = new elyComboField_1.default({ placeholder: "Выберите категорию" });
	        const viewSelection = new elyComboField_1.default({ placeholder: "Выберите элемент" });
	        viewSelection.editable(false);
	        catSelection.add("Элементы отображения", "views");
	        catSelection.add("Элементы управления", "actions");
	        catSelection.add("Поля ввода данных", "fields");
	        catSelection.addChangeValueObserver((oldValue, newValue) => {
	            viewSelection.clearValue();
	            viewSelection.items.clear();
	            objs[newValue.value].forEach((value, index) => {
	                const str = String(value);
	                if (elyDesignable.elyDesignableAutoFieldsData[str])
	                    viewSelection.add(__fmt(String(value)), value);
	            });
	            viewSelection.editable(true);
	        }, true);
	        viewSelection.addChangeValueObserver((oldValue, newValue) => {
	            builder.removeViewContent();
	            result.removeViewContent();
	            // @ts-ignore
	            const element = new window[newValue.value]();
	            if (typeof element.text === "function")
	                element.text(newValue.value);
	            cb(element);
	            // builder.addSubView(new elyFlatUIViewBuilder(element, newValue.value.toString()));
	            catSelection.clearValue();
	            viewSelection.clearValue();
	            viewSelection.editable(false);
	        }, true);
	        gridView.add(catSelection);
	        gridView.add(viewSelection);
	        gridView.add(elyControl_2.default.line());
	        gridView.add(new elyButton_1.default({
	            buttonStyle: elyStyle_1.default.secondary,
	            iconName: "plus",
	            text: "Сетка элементов",
	        }).fill().click(() => {
	            cb(new elyStaticGridView_2.default());
	        }));
	        return gridView;
	    }
	}
	exports.default = elyWSCreateViewWindow;
	/**
	 * Форматирует строку
	 * @param ins
	 * @private
	 */
	function __fmt(ins) {
	    const s = ins.replace("ely", "").replace(/([A-z][a-z]+)/g, " $1").trim();
	    return s.substr(0, 1).toUpperCase() + s.substr(1);
	}
	});

	unwrapExports(elyWSCreateViewWindow_1);

	var elyWSPlaceholderView_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyWSPlaceholderView.ts                                              +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });







	/**
	 * Элемент для замены его другим элементом
	 */
	class elyWSPlaceholderView extends elyView_1.default {
	    /**
	     * Конструктор
	     * @param options
	     */
	    constructor(options) {
	        super(options);
	        this.__placeViewName = options.placeViewName;
	        this.__autoViewName = options.autoViewName;
	        this.getDocument().append(this.createPlaceHolderItemView().getDocument());
	    }
	    /**
	     * Создает элемент для ввода элемента
	     */
	    createPlaceHolderItemView() {
	        const view = new elyControl_2.default().addClass("elyuiws-placeolder-item");
	        view.addSubView(new elyTextView_2.default({ text: "Empty" }));
	        view.addSubView(new elyTextView_2.default({ text: this.__autoViewName }));
	        view.addClass("clickable");
	        view.addObserver("click", () => {
	            elyWSCreateViewWindow_1.default.present(createdView => {
	                elyUIWSWorkspace_1.default.main.canUpdate = false;
	                elyWSRegex_1.default.main.dependencies[this.__placeViewName][this.__autoViewName]
	                    = elyUIWorkshop_1.default.add(createdView);
	                elyUIWSWorkspace_1.default.main.canUpdate = true;
	                elyUIWSWorkspace_1.default.main.update();
	            });
	        });
	        return view;
	    }
	}
	exports.default = elyWSPlaceholderView;
	});

	unwrapExports(elyWSPlaceholderView_1);

	var elyUIWSWorkspace_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIWSWorkspace.ts                                                  +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });




	/**
	 * Рабочая область
	 */
	class elyUIWSWorkspace extends elyView_1.default {
	    /**
	     * Конструктор
	     */
	    constructor() {
	        super();
	        this.canUpdate = true;
	        this.content = new elyControl_2.default();
	        this.getDocument().append(this.content.getDocument());
	        elyWSRegex_1.default.main.regView(this, "workspace");
	        elyWSRegex_1.default.main.dependencies.workspace = { content: null };
	        this.update();
	    }
	    /**
	     * Обновляет рабочую область
	     */
	    update() {
	        if (!this.canUpdate)
	            return;
	        this.content.removeViewContent();
	        if (elyWSRegex_1.default.main.dependencies.workspace.content)
	            this.content.getDocument()
	                .append(elyWSRegex_1.default.main.views.item(elyWSRegex_1.default.main.dependencies.workspace.content).getDocument());
	        else
	            this.applyPlaceHolder(this.content, "workspace", "content");
	        for (const viewName in elyWSRegex_1.default.main.dependencies) {
	            if (!elyWSRegex_1.default.main.dependencies.hasOwnProperty(viewName))
	                continue;
	            const view = elyWSRegex_1.default.main.views.item(viewName);
	            if (!view)
	                continue;
	            if (typeof elyWSRegex_1.default.main.dependencies[viewName] === "object") {
	                for (const placerName in elyWSRegex_1.default.main.dependencies[viewName]) {
	                    if (!elyWSRegex_1.default.main.dependencies[viewName].hasOwnProperty(placerName))
	                        continue;
	                    const placer = elyWSRegex_1.default.main.dependencies[viewName][placerName];
	                    const placerView = view[placerName];
	                    if (!placerView)
	                        continue;
	                    placerView.removeViewContent();
	                    if (placer === null) {
	                        this.applyPlaceHolder(placerView, viewName, placerName);
	                    }
	                    else {
	                        const subView = elyWSRegex_1.default.main.views.item(placer);
	                        if (subView)
	                            placerView.getDocument().append(subView.getDocument());
	                    }
	                }
	            }
	        }
	    }
	    /**
	     * Создает и применяет холдер
	     * @param view
	     * @param placeViewName
	     * @param autoViewName
	     */
	    applyPlaceHolder(view, placeViewName, autoViewName) {
	        const holder = new elyWSPlaceholderView_1.default({ placeViewName, autoViewName });
	        view.getDocument().append(holder.getDocument());
	        return holder;
	    }
	}
	/**
	 * Главная рабочая область
	 */
	elyUIWSWorkspace.main = new elyUIWSWorkspace();
	exports.default = elyUIWSWorkspace;
	});

	unwrapExports(elyUIWSWorkspace_1);

	var elyUIWSViewsFactory_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIWSViewsFactory.ts                                               +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });









	/**
	 * Фабрика элементов
	 */
	class elyUIWSViewsFactory {
	    /**
	     * Создаёт элемент из объекта
	     * @param obj
	     */
	    static custom(obj) {
	        let view = null;
	        try {
	            if (typeof obj === "string")
	                obj = JSON.parse(obj);
	            view = elyControl_2.default.fromObject(obj);
	            if (!view) {
	                throw Error("Не верный код объекта");
	            }
	        }
	        catch (e) {
	            const noti = new elyNotificationView_1.default({
	                message: "Ошибка создания элемента",
	                title: "Создание элемента",
	            });
	            noti.contentView.addSubView(String(e.message || "").textView());
	            noti.present();
	        }
	        return view;
	    }
	    /**
	     * Применяет мета значения
	     * @param viewName
	     * @param view
	     */
	    static applyMeta(viewName, view) {
	        elyUIWSMeta_1.default.metas[viewName] = new elyUIWSMeta_1.default();
	        elyWSRegex_1.default.main.dependencies[viewName] = {};
	        elyUIWSMeta_1.default.metas[viewName].autoData = elyDesignable.elyDesignableAutoFieldsData[view.constructor.name];
	        if (elyUIWSMeta_1.default.metas[viewName].autoData)
	            for (const fieldName in elyUIWSMeta_1.default.metas[viewName].autoData.fields) {
	                if (!elyUIWSMeta_1.default.metas[viewName].autoData.fields.hasOwnProperty(fieldName))
	                    continue;
	                const field = elyUIWSMeta_1.default.metas[viewName].autoData.fields[fieldName];
	                // View field
	                if (field && field.state === elyDesignable.elyDesignableFieldState.VIEW) {
	                    elyWSRegex_1.default.main.dependencies[viewName][fieldName] = null;
	                }
	            }
	        if (view instanceof elyStaticGridView_2.default) {
	            view.addObserver("rebuild", () => {
	                elyUtils_1.default.forEach(elyWSRegex_1.default.main.dependencies[viewName], (index, value) => {
	                    const num = parseInt(String(index).replace("contentView", ""), 10);
	                    if (num >= view.colsCount() * view.rowsCount()) {
	                        delete elyWSRegex_1.default.main.dependencies[viewName][index];
	                        if (value)
	                            elyUIWorkshop_1.default.remove(value);
	                    }
	                });
	                for (let i = 0; i < view.rowsCount() * view.colsCount(); i++) {
	                    if (!elyWSRegex_1.default.main.dependencies[viewName]["contentView" + i])
	                        elyWSRegex_1.default.main.dependencies[viewName]["contentView" + i] = null;
	                }
	                elyUIWSWorkspace_1.default.main.update();
	            });
	            view.rebuild();
	        }
	    }
	}
	exports.default = elyUIWSViewsFactory;
	});

	unwrapExports(elyUIWSViewsFactory_1);

	var elyUIWorkshop_1 = createCommonjsModule(function (module, exports) {
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
	 + Файл: elyUIWorkshop.ts                                                     +
	 + Файл создан: 23.11.2018 23:03:37                                           +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });





















	class elyUIWorkshop {
	    /**
	     * Удаляет элемент
	     * @param viewName
	     */
	    static remove(viewName) {
	        if (viewName === "workspace")
	            return false;
	        if (elyWSRegex_1.default.main.unregView(viewName)) {
	            return true;
	        }
	        else {
	            new elyNotificationView_1.default({
	                message: `Не удалось удалить элемент ${viewName}!`,
	                title: "Удаление элемента",
	            }).present();
	            return false;
	        }
	    }
	    /**
	     * добавляет элемент
	     * @param view
	     * @param forceName - принудительное имя
	     */
	    static add(view, forceName) {
	        const viewName = elyWSRegex_1.default.main.regView(view, forceName);
	        elyUIWSViewsFactory_1.default.applyMeta(viewName, view);
	        return viewName;
	    }
	    /**
	     * Создает фрейм
	     */
	    static create(root) {
	        elyUIWorkshop.superView = root;
	        if (elyUIWorkshop.view)
	            return;
	        const workshopRow = new elyGridRowView_1.default();
	        const workshopProps = new elyGridView_1.default({ margin: { top: 0, bottom: 10, left: 0, right: 0 } });
	        elyFlatApplicationPreloader_1.default.default.messageView.text("Загрузка данных...");
	        elyFlatApplicationPreloader_1.default.default.hidden(false);
	        setTimeout(() => {
	            elyUIWorkshop.restoreSessionFromCookies(undefined, () => elyFlatApplicationPreloader_1.default.default.hidden(true));
	        }, 500);
	        elyUIWorkshop.addContextMenuAuto();
	        workshopRow.add(elyUIWSWorkspace_1.default.main);
	        elyWSRegex_1.default.main.addRegObserver(() => {
	            elyUIWSWorkspace_1.default.main.update();
	            elyUIWorkshopElementsPanel_1.default.main.update();
	        });
	        elyWSRegex_1.default.main.addUnregObserver(() => {
	            elyUIWSWorkspace_1.default.main.update();
	            elyUIWorkshopElementsPanel_1.default.main.update();
	        });
	        // elyWSViewPropsPanel.main.applySettingsPanel("workspace");
	        elyUIWorkshop.view = workshopRow;
	        //
	        // tabs
	        //
	        elyUIWorkshop.tabBar.getStyle().marginTop = elyFlatApplication_1.default.default.navigationView.height() + "px";
	        elyUIWorkshop.tabBar.add("props", { text: "Свойства", iconName: "cogs", content: elyWSViewPropsPanel_1.default.main });
	        elyUIWorkshop.tabBar.add("overview", {
	            content: elyUIWorkshopElementsPanel_1.default.main,
	            iconName: "list",
	            text: "Обзор",
	        });
	        elyUIWorkshop.tabBar.add("settings", {
	            content: elyWSSettingsPanel_1.default.main,
	            iconName: "support",
	            text: "Инструменты",
	        });
	        if (elyUIWorkshop.superView) {
	            elyUIWorkshop.superView.getDocument().append(elyUIWorkshop.tabBar.getDocument());
	            elyUIWorkshop.superView.getDocument().append(elyUIWorkshop.view.getDocument());
	        }
	    }
	    /**
	     * Добавляет автоматическое контекстное мению
	     */
	    static addContextMenuAuto() {
	        document.addEventListener("contextmenu", (e) => {
	            let element = e.target;
	            while (element != null) {
	                if (element.hasAttribute(elyWSUtils_1.default.WS_NAME_ATTRIBUTE))
	                    break;
	                element = element.parentElement;
	            }
	            const dataWSName = element ? element.getAttribute(elyWSUtils_1.default.WS_NAME_ATTRIBUTE) : null;
	            if (dataWSName) {
	                const view = elyWSRegex_1.default.main.views.item(dataWSName);
	                if (view) {
	                    elyUIWSContextMenu_1.default.main.update(view, { x: e.pageX, y: e.pageY });
	                    e.preventDefault();
	                }
	            }
	        }, false);
	        document.addEventListener("click", (e) => {
	            if (!e.metaKey)
	                return;
	            let element = e.target;
	            while (element != null) {
	                if (element.hasAttribute(elyWSUtils_1.default.WS_NAME_ATTRIBUTE))
	                    break;
	                element = element.parentElement;
	            }
	            const dataWSName = element ? element.getAttribute(elyWSUtils_1.default.WS_NAME_ATTRIBUTE) : null;
	            if (dataWSName) {
	                elyWSViewPropsPanel_1.default.main.applySettingsPanel(dataWSName);
	            }
	        });
	    }
	    /**
	     * Запускает автосохранение сессии
	     */
	    static startAutoSaver() {
	        setInterval(() => {
	            elyUIWorkshop.saveSessionToCookies();
	        }, 2000);
	    }
	    /**
	     * Восстанавливает сессию из cookie
	     * @param name
	     * @param callback
	     */
	    static restoreSessionFromCookies(name, callback) {
	        const sessionObject = {};
	        elySimpleJSONParser_1.default.parse(elyCookie_1.default.get(`ws-${name || "workshop"}-views`) || "{}", obj => {
	            sessionObject.views = obj || {};
	            elySimpleJSONParser_1.default.parse(elyCookie_1.default.get(`ws-${name || "workshop"}-meta`) || "{}", meta => {
	                sessionObject.meta = meta || {};
	                elySimpleJSONParser_1.default.parse(elyCookie_1.default.get(`ws-${name || "workshop"}-svs`) || "{}", svs => {
	                    sessionObject.svs = svs || {};
	                    elyUIWorkshop.restoreSessionFromObject(sessionObject, callback);
	                });
	            });
	        });
	    }
	    /**
	     * Очищает проект
	     */
	    static cleanProject() {
	        elyUIWSWorkspace_1.default.main.canUpdate = false;
	        elyWSRegex_1.default.main.views.forEach((key) => elyUIWorkshop.remove(key));
	        elyUIWSMeta_1.default.metas = {};
	        elyUIWSWorkspace_1.default.main.canUpdate = true;
	        elyUIWSWorkspace_1.default.main.update();
	    }
	    /**
	     * Восстанавливает сессию из объекта
	     * @param obj
	     * @param callback
	     */
	    static restoreSessionFromObject(obj, callback) {
	        elyUIWorkshop.cleanProject();
	        elyUIWSWorkspace_1.default.main.canUpdate = false;
	        elyUtils_1.default.forEach(obj.views, (index, value) => {
	            const view = elyUIWSViewsFactory_1.default.custom(value);
	            if (view) {
	                elyUIWorkshop.add(view, index);
	            }
	            else {
	                new elyNotificationView_1.default({
	                    message: `Не удалось создать элемент ${index}!`,
	                    title: "Ошибка создания элемента",
	                }).present();
	            }
	        });
	        elyUtils_1.default.forEach(obj.meta, (index, value) => {
	            if (elyUIWSMeta_1.default.metas.hasOwnProperty(index)) {
	                elyUtils_1.default.forEach(value, (name, val) => {
	                    elyUIWSMeta_1.default.metas[index][name] = val;
	                });
	            }
	            else {
	                new elyNotificationView_1.default({
	                    message: `Не удалось восстановить мета данные элемента ${index}!`,
	                    title: "Ошибка создания элемента",
	                }).present();
	            }
	        });
	        elyUtils_1.default.forEach(obj.svs, (index, value) => {
	            if (elyWSRegex_1.default.main.dependencies[index]) {
	                elyWSRegex_1.default.main.dependencies[index] = Object.assign({}, elyWSRegex_1.default.main.dependencies[index], value);
	            }
	            else {
	                elyWSRegex_1.default.main.dependencies[index] = value;
	            }
	        });
	        elyUIWSWorkspace_1.default.main.canUpdate = true;
	        elyUIWSWorkspace_1.default.main.update();
	        elyLogger_1.default.debug("Загрузка сессии WS...");
	        elyLogger_1.default.debugObject(obj);
	        if (callback)
	            callback();
	    }
	    /**
	     * Сохраняет сессию в объект
	     * @param callback
	     */
	    static saveSessionToObject(callback) {
	        const sessionData = {};
	        const views = {};
	        elyWSRegex_1.default.main.views.forEach((key, value) => views[key] = elyDesignable.elyDesignableCore.freeze(value));
	        sessionData.views = views;
	        sessionData.meta = elyUIWSMeta_1.default.freezeAllMeta();
	        sessionData.svs = elyWSRegex_1.default.main.dependencies;
	        callback(sessionData);
	    }
	    /**
	     * Сохраняет сессиию в cookies с именем name
	     * @param name
	     * @param callback
	     */
	    static saveSessionToCookies(name = "workshop", callback) {
	        elyUIWorkshop.saveSessionToObject(sessionObject => {
	            elyCookie_1.default.set("ws-" + name + "-svs", JSON.stringify(sessionObject.svs || {}));
	            elyCookie_1.default.set("ws-" + name + "-views", JSON.stringify(sessionObject.views || {}));
	            elyCookie_1.default.set("ws-" + name + "-meta", JSON.stringify(sessionObject.meta || {}));
	            if (callback)
	                callback(sessionObject);
	        });
	    }
	}
	/**
	 * Выбранный элемент
	 */
	elyUIWorkshop.selectedViewName = new elyObservableProperty_1.default().change(value => {
	    elyWSViewPropsPanel_1.default.main.applySettingsPanel(value);
	});
	elyUIWorkshop.superView = null;
	/**
	 * Бар
	 */
	elyUIWorkshop.tabBar = new elyTabBarView_1.default({ tabBarSticky: true });
	exports.default = elyUIWorkshop;
	});

	unwrapExports(elyUIWorkshop_1);

	var ely_module$2 = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: ely.module.ts                                                        +
	 + Файл изменен: 30.11.2018 03:45:40                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });

	window.elyWorkshop = elyUIWorkshop_1.default;
	});

	unwrapExports(ely_module$2);

	var ely_flat_application = createCommonjsModule(function (module, exports) {
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
	 + Проект: ely.flat.application                                               +
	 +                                                                            +
	 + Файл: ely.flat.application.ts                                              +
	 + Файл изменен: 30.11.2018 00:35:09                                          +
	 +                                                                            +
	 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	Object.defineProperty(exports, "__esModule", { value: true });















































	/**
	 * @type {elyFlatApplication}
	 */
	window.elyApplication = elyFlatApplication_1.default.default;
	window.elyFlatApplication = elyFlatApplication_1.default;
	window.elyStylesheet = elyStylesheet_1.default;
	window.elyScreen = elyScreenController_1.default.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyViewController.constructor
	 */
	window.elyViewController = elyViewController_1.default;
	/**
	 * @alias elyGridViewController.constructor
	 */
	window.elyGridViewController = elyGridViewController_1.default;
	/**
	 * @alias elySimplePageViewController.constructor
	 */
	window.elySimplePageViewController = elySimplePageViewController_1.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyView.constructor
	 */
	window.elyView = elyView_1.default;
	/**
	 * @alias elyControl.constructor
	 */
	window.elyControl = elyControl_2.default;
	/**
	 * @alias elyButton.constructor
	 */
	window.elyButton = elyButton_1.default;
	/**
	 * @alias elyTextView.constructor
	 */
	window.elyTextView = elyTextView_2.default;
	/**
	 * @alias elyLinkTextView.constructor
	 */
	window.elyLinkTextView = elyLinkTextView_1.default;
	/**
	 * @alias elyIconView.constructor
	 */
	window.elyIconView = elyIconView_1.default;
	/**
	 * @alias elyTextViewEditable.constructor
	 */
	window.elyTextViewEditable = elyTextViewEditable_1.default;
	/**
	 * @type {elyBodyView}
	 */
	window.elyBodyView = elyBodyView_1.default.default;
	/**
	 * @alias elyImageView.constructor
	 */
	window.elyImageView = elyImageView_1.default;
	/**
	 * @alias elyListView.constructor
	 */
	window.elyListView = elyListView_1.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyPanelView.constructor
	 */
	window.elyPanelView = elyPanelView_1.default;
	/**
	 * @alias elyModalView.constructor
	 */
	window.elyModalView = elyModalView_2.default;
	/**
	 * @alias elyGridView.constructor
	 */
	window.elyGridView = elyGridView_1.default;
	/**
	 * @alias elyGridRowView.constructor
	 */
	window.elyGridRowView = elyGridRowView_1.default;
	/**
	 * @alias elyDataGridView.constructor
	 */
	window.elyDataGridView = elyDataGridView_1.default;
	/**
	 * @alias elyStaticGridView.constructor
	 */
	window.elyStaticGridView = elyStaticGridView_2.default;
	/**
	 * @alias elyProgressView.constructor
	 */
	window.elyProgressView = elyProgressView_1.default;
	/**
	 * @alias elyScrollView.constructor
	 */
	window.elyScrollView = elyScrollView_1.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyField.constructor
	 */
	window.elyField = elyField_2.default;
	/**
	 * @alias elyTextField.constructor
	 */
	window.elyTextField = elyTextField_1.default;
	/**
	 * @alias elyComboField.constructor
	 */
	window.elyComboField = elyComboField_1.default;
	/**
	 * @alias elySwitchField.constructor
	 */
	window.elySwitchField = elySwitchField_1.default;
	/**
	 * @alias elyTextAreaField.constructor
	 */
	window.elyTextAreaField = elyTextAreaField_1.default;
	/**
	 * @alias elyFileChooseField.constructor
	 */
	window.elyFileChooseField = elyFileChooseField_1.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyNotificationView.constructor
	 */
	window.elyNotificationView = elyNotificationView_1.default;
	/**
	 * @alias elyProgressNotificationView.constructor
	 */
	window.elyProgressNotificationView = elyProgressNotificationView_1.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyWeight.constructor
	 */
	window.elyWeight = elyWeight_1.default;
	/**
	 * @alias elySize.constructor
	 */
	window.elySize = elySize_1.default;
	/**
	 * @alias elyStyle.constructor
	 */
	window.elyStyle = elyStyle_1.default;
	/**
	 * @alias elyFieldType.constructor
	 */
	window.elyFieldType = elyFieldType_1.default;
	//
	//
	// ----------------------------------------------------------------
	//
	//
	/**
	 * @alias elyColor.constructor
	 */
	window.elyColor = elyColor_1.default;
	/**
	 * @alias elyCookie.constructor
	 */
	window.elyCookie = elyCookie_1.default;
	/**
	 * @alias elyMath.constructor
	 */
	window.elyMath = elyMath_1.default;
	/**
	 * @alias elyTime.constructor
	 */
	window.elyTime = elyTime_1.default;
	/**
	 * @alias elyUtils.constructor
	 */
	window.elyUtils = elyUtils_1.default;
	/**
	 * @alias elyURL.constructor
	 */
	window.elyURL = elyURL_1.default;
	/**
	 * @alias elyGetRequest.constructor
	 */
	window.elyGetRequest = elyGetRequest_1.default;
	/**
	 * @alias elyPostRequest.constructor
	 */
	window.elyPostRequest = elyPostRequest_1.default;
	window.present = (viewController, completion) => {
	    elyScreenController_1.default.default.present(viewController, completion);
	};
	window.elyOnReady = (result) => {
	    elyFlatApplication_1.default.default.addReadyObserver(result);
	};
	window.addController = (name, viewController, canOverwrite = true) => {
	    elyScreenController_1.default.default.addControllerName(name, viewController, canOverwrite);
	};
	window.onload = () => {
	    elyFlatApplication_1.default.loadApplication(() => {
	        //
	    });
	};
	});

	var ely_flat_application$1 = unwrapExports(ely_flat_application);

	return ely_flat_application$1;

}((this.ely = this.ely || {})));
