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
 + Файл: Guard.ts                                                             +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Безопасная операция над переменной
 *
 * @template T - Тип данных переменной
 * @param {T|*} variable - Проверяемая переменная
 * @param {function(value: T)} callback - Обработчик с переменной
 * @param {T} [opt] - Опциональное значение, если переменная null или undefined
 *
 *
 *     const a = 123;
 *     const b = null;
 *
 *     variable(b, value => a = value, 100);
 *     variable(a, value => b = value);
 *
 *     // a = 100
 *     // b = 100
 *
 *
 */
function variable(variable, callback, opt) {
    if (variable !== undefined && variable !== null)
        callback(variable);
    else if (isSet(opt))
        callback(opt);
}
/**
 * Безопасная операция над переменной и выполнение операции через объект и контекст
 *
 * @template T - Тип данных переменной
 * @param {T|*} variable - Проверяемая переменная
 * @param {function(value: T)} callback - Обработчик с переменной
 * @param {*} [context] - Контекст
 * @param {T} [opt] - Опциональное значение, если переменная null или undefined
 *
 *
 *     const a = 123;
 *     const b = null;
 *
 *     class MyClass{
 *
 *         public constructor(options = {}){
 *             this.a = null;
 *             this.b = null;
 *
 *             variableAndSet(options.a, this.setA, this, "theA");
 *             variableAndSet(options.b, this.setB, this, "theB");
 *
 *             // Альтернатива:
 *             // variable(options.a, value => this.setA(value), "theA");
 *             // variable(options.b, value => this.setB(value), "theB");
 *         }
 *
 *         setA(value){
 *             this.a = value;
 *         }
 *
 *         setB(value){
 *             this.b = value;
 *         }
 *
 *     }
 *
 *     const mc = new MyClass({a: 123});
 *     // mc.a = 123
 *     // mc.b = "theB"
 *
 *
 */
function variableAndSet(variable, callback, context, opt) {
    variable(variable, (value) => {
        callback.call(context, value);
    }, opt);
}
/**
 * Возвращает true, если obj не undefined
 * @param {*} obj
 * @return {boolean}
 */
function isSet(obj) {
    return obj !== undefined;
}
/**
 * Возвращает true, если obj undefined или null.
 * @param {*} obj
 * @return {boolean}
 */
function isNone(obj) {
    return obj === undefined || obj === null;
}
/**
 * Парсинг JSON без try/catch конструкции
 *
 * @param {string} jsonString - строка JSON
 * @param {*} [opt = {}] - значение в случае неудачи
 *
 * @return {*}
 *
 *
 *     const a = safeJsonParse("a");
 *     const b = safeJsonParse("{\"a\": 1}");
 *
 *     // a = {}
 *     // b = {a: 1};
 *
 *
 */
function safeJsonParse(jsonString, opt = {}) {
    try {
        return JSON.parse(jsonString);
    }
    catch (e) {
        return opt;
    }
}

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
 + Файл: Utils                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Утилиты
 */
class Utils {
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
     * Возвращает массив значений
     * @param obj
     */
    static values(obj) {
        const values = [];
        Utils.forEach(obj, (index, value) => values.push(value));
        return values;
    }
    /**
     * Возвращает количество элементов в объекте
     * @param obj
     */
    static count(obj) {
        return Object.keys(obj).length;
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
        return Utils.indexInMatrix(matrix, value) !== null;
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
        const indexes = Utils.indexInMatrix(matrix, value);
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
        if (Utils.isObject(target) && Utils.isObject(source)) {
            for (const key in source) {
                if (!source.hasOwnProperty(key))
                    continue;
                if (Utils.isObject(source[key])) {
                    if (!target[key])
                        Object.assign(target, { [key]: {} });
                    Utils.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return Utils.mergeDeep(target, ...sources);
    }
}
Utils.BREAK_FLAG = "ely_for_loop_break_312441edq2jhd78q2df67q";

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
 + Файл: Observable.ts                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Прослушиваемый протокол
 * @class Observable
 */
class Observable {
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
     * Удаляет обработчик
     * @param event
     * @param observer
     */
    removeObserver(event, observer) {
        if (this.observers.hasOwnProperty(event)) {
            this.observers[event].splice(this.observers[event].indexOf(observer), 1);
        }
        return this;
    }
    /**
     * Удаляет все обработчики события или событий
     * @param {String} [event] - Событие
     */
    removeAllObservers(event) {
        if (event !== undefined) {
            if (this.observers.hasOwnProperty(event)) {
                this.observers[event] = [];
            }
        }
        else {
            this.observers = {};
        }
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
/**
 * Обрабатываемое значение
 * @class ObservableProperty
 * @template T
 * @augments Observable
 */
class ObservableProperty extends Observable {
    /**
     * Конструктор
     * @param {T|null} defaultValue
     */
    constructor(defaultValue = null) {
        super();
        /**
         * Флаг защиты от перезаписи
         * @ignore
         * @protected
         * @type {boolean}
         */
        this.isOverwriteProtected = false;
        /**
         * @protected
         * @type {T}
         */
        this.value = defaultValue || null;
    }
    /**
     * Простое автоматизированное свойство
     * @param context
     * @param value
     * @param prop
     */
    static simplePropertyAccess(context, value, prop) {
        if (!isSet(value))
            return prop.get(null);
        prop.set(value);
        return context;
    }
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
    get(guard) {
        if (this.isNull() && guard !== null)
            return guard;
        else if (this.isNull())
            return null;
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
    overwrite(flag) {
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
    set(value) {
        if (this.isOverwriteProtected)
            return this;
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
    isNull() {
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
    change(observer) {
        this.addObserver("change", (old, nw) => {
            observer(nw, old);
        });
        return this;
    }
    /**
     * Преобразует объект в строку
     * @return {string}
     */
    toString() {
        return this.get() + "";
    }
}

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
 + Файл: ObservableDictionary                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Свойство словаря
 * @class ObservableDictionary
 * @template T
 */
class ObservableDictionary extends ObservableProperty {
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
        const ordered = new ObservableDictionary();
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
        const val = (this.value || {})[key];
        return isNone(val) ? null : val;
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
        Utils.forEach(this.value, () => count++);
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
        Utils.forEach(this.value, iterator);
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
        Utils.forEach(this.value, (index, value1) => {
            if (value1 === value) {
                searched = index;
                return Utils.BREAK_FLAG;
            }
        });
        return searched;
    }
}

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
 + Файл: AppStylesheet.ts                                                     +
 + Файл изменен: 27.02.2019 01:47:53                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
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
 * Файл: AppStylesheet.ts
 * Файл создан: 19.11.2018 20:56:39
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *
 */
/**
 * Типы стиля
 */
var StylesheetItemType;
(function (StylesheetItemType) {
    StylesheetItemType[StylesheetItemType["class"] = 0] = "class";
    StylesheetItemType[StylesheetItemType["tag"] = 1] = "tag";
    StylesheetItemType[StylesheetItemType["id"] = 2] = "id";
})(StylesheetItemType || (StylesheetItemType = {}));
/**
 * Таблица стилей
 *
 */
class AppStylesheet {
    /**
     * Конструктор
     * @param sheet
     *
     */
    constructor(sheet) {
        this.__view = document.createElement("style");
        this.stylesheet = sheet || (this.__view.sheet || {});
        this.classes = new ObservableDictionary();
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
        return this.addItem(className, StylesheetItemType.class, style);
    }
    /**
     * Добавляет ID стилей
     * @param id
     * @param style
     */
    addID(id, style) {
        return this.addItem(id, StylesheetItemType.id, style);
    }
    /**
     * Добавляет стили
     * @param name
     * @param style
     */
    add(name, style) {
        return this.addItem(name, StylesheetItemType.tag, style);
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
                case StylesheetItemType.class:
                    name = `.${name}`;
                    break;
                case StylesheetItemType.tag:
                    name = `${name}`;
                    break;
                case StylesheetItemType.id:
                    name = `#${name}`;
                    break;
            }
            this.getDocument().appendChild(document.createTextNode(`${name}{${tempNode.getAttribute("style").replace(/;/g, " !important;")}}`));
        });
        return this;
    }
}
/**
 * Глобавльные стили
 */
AppStylesheet.global = new AppStylesheet();

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
 + Файл: ColorUtils.ts                                                        +
 + Файл изменен: 06.01.2019 05:32:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Утилиты для работы с цветом
 */
class ColorUtils {
    /**
     * Преобразует HSV цвет в RGB
     * @param color
     */
    static hsv2rgb(color) {
        let red = 0;
        let green = 0;
        let blue = 0;
        const i = Math.floor(color.hue * 6);
        const f = color.hue * 6 - i;
        const p = color.value * (1 - color.saturation);
        const q = color.value * (1 - f * color.saturation);
        const t = color.value * (1 - (1 - f) * color.saturation);
        switch (i % 6) {
            case 0:
                red = color.value;
                green = t;
                blue = p;
                break;
            case 1:
                red = q;
                green = color.value;
                blue = p;
                break;
            case 2:
                red = p;
                green = color.value;
                blue = t;
                break;
            case 3:
                red = p;
                green = q;
                blue = color.value;
                break;
            case 4:
                red = t;
                green = p;
                blue = color.value;
                break;
            case 5:
                red = color.value;
                green = p;
                blue = q;
                break;
        }
        return { red, green, blue };
    }
    /**
     * Преобразует RGB цвет в HSV
     * @param color
     */
    static rgb2hsv(color) {
        const max = Math.max(color.red, color.green, color.blue);
        const min = Math.min(color.red, color.green, color.blue);
        const d = max - min;
        let hue = 0;
        const saturation = (max === 0 ? 0 : d / max);
        const value = max / 255;
        switch (max) {
            case min:
                hue = 0;
                break;
            case color.red:
                hue = (color.green - color.blue) + d * (color.green < color.blue ? 6 : 0);
                hue /= 6 * d;
                break;
            case color.green:
                hue = (color.blue - color.red) + d * 2;
                hue /= 6 * d;
                break;
            case color.blue:
                hue = (color.red - color.green) + d * 4;
                hue /= 6 * d;
                break;
        }
        return { hue, saturation, value };
    }
    /**
     * Преобразует HSV в __hex
     * @param color
     */
    static hsv2hex(color) {
        return ColorUtils.rgb2hex(ColorUtils.hsv2rgb(color));
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
     * Преобразует __hex цвет в hsv
     * @param hex
     */
    static hex2hsv(hex) {
        return ColorUtils.rgb2hsv(ColorUtils.hex2rgb(hex));
    }
    /**
     * Преобразует RGB в HEX
     * @param color
     */
    static rgb2hex(color) {
        const rgbToHex = (rgb) => {
            let hex = Number(rgb).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };
        return (rgbToHex(color.red) + rgbToHex(color.green) + rgbToHex(color.blue)).toUpperCase();
    }
}
/**
 * Код белого цвета
 */
ColorUtils.whiteNumber = 16777215;
/**
 * Код черного цвета
 */
ColorUtils.blackNumber = 0;

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
 + Файл: Color.ts                                                       +
 + Файл изменен: 31.01.2019 02:40:23                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Цвет
 * @class Color
 */
class Color {
    /**
     * Конструктор
     * @param {{ __hex?: string, rgb?: ColorRGB, hsv?: ColorHSV }} props - параметры
     */
    constructor(props = {}) {
        /**
         * 16 код цвета
         * @protected
         * @type {string}
         */
        this.__hex = "000000";
        if (props.hex)
            this.__hex = String(props.hex).startsWith("#") ? props.hex.substr(1) : props.hex;
        else if (props.rgb)
            this.__hex = ColorUtils.rgb2hex(props.rgb);
        else if (props.hsv)
            this.__hex = ColorUtils.hsv2hex(props.hsv);
        else
            this.__hex = Color.black().getHexString().substr(1);
    }
    /**
     * Возвращает черный цвет
     * @return {Color}
     */
    static black() {
        return new Color({ hex: "#000000" });
    }
    /**
     * Возвращает белый цвет
     * @return {Color}
     */
    static white() {
        return new Color({ hex: "#ffffff" });
    }
    /**
     * Возвращает красный цвет
     * @return {Color}
     */
    static red() {
        return new Color({ hex: "#ff0000" });
    }
    /**
     * Возвращает зеленый цвет
     * @return {Color}
     */
    static green() {
        return new Color({ hex: "#00ff00" });
    }
    /**
     * Возвращает синий цвет
     * @return {Color}
     */
    static blue() {
        return new Color({ hex: "#0000ff" });
    }
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {Color}
     */
    static deserialize(raw) {
        return new Color({ hex: raw });
    }
    /**
     * Возвращает число цвета
     * @return {number}
     */
    getByte() {
        return parseInt(this.__hex, 16);
    }
    /**
     * Возвращает true, если цвет темный
     * @return {boolean}
     */
    isDarker() {
        return this.getByte() < (ColorUtils.whiteNumber / 1.8);
    }
    /**
     * Возвращает байты цветов
     * @return {ColorRGB}
     */
    getRGBBytes() {
        return {
            blue: parseInt(this.__hex.substr(4, 2), 16),
            green: parseInt(this.__hex.substr(2, 2), 16),
            red: parseInt(this.__hex.substr(0, 2), 16),
        };
    }
    /**
     * Устанавливает RGB цвета
     *
     * @param {{ColorRGB}} props
     */
    setRGBBytes(props) {
        if (props.rgb.red > 255)
            props.rgb.red = 255;
        if (props.rgb.green > 255)
            props.rgb.green = 255;
        if (props.rgb.blue > 255)
            props.rgb.blue = 255;
        if (props.rgb.red < 0)
            props.rgb.red = 0;
        if (props.rgb.green < 0)
            props.rgb.green = 0;
        if (props.rgb.blue < 0)
            props.rgb.blue = 0;
        this.__hex = props.rgb.red.toString(16) +
            props.rgb.green.toString(16) +
            props.rgb.blue.toString(16);
    }
    /**
     * Возвращает цвет светлее
     * @param {number} percentage
     * @return {Color}
     */
    getLighterColor(percentage) {
        const rgb = this.getRGBBytes();
        percentage = 1 - percentage;
        const val = Math.round(255 - (255 * percentage));
        rgb.red = Math.round(elyMath.map(val, 0, 255, rgb.red, 255));
        rgb.green = Math.round(elyMath.map(val, 0, 255, rgb.green, 255));
        rgb.blue = Math.round(elyMath.map(val, 0, 255, rgb.blue, 255));
        return new Color({ hex: "#" + ColorUtils.rgb2hex(rgb) });
    }
    /**
     * Возвращает цвет тмнее
     * @param {number} percentage
     * @return {Color}
     */
    getDarkerColor(percentage) {
        const rgb = this.getRGBBytes();
        percentage = 1 - percentage;
        const val = Math.round(255 - (255 * percentage));
        rgb.red = Math.round(elyMath.map(val, 0, 255, rgb.red, 0));
        rgb.green = Math.round(elyMath.map(val, 0, 255, rgb.green, 0));
        rgb.blue = Math.round(elyMath.map(val, 0, 255, rgb.blue, 0));
        return new Color({ hex: "#" + ColorUtils.rgb2hex(rgb) });
    }
    /**
     * Возвращает HEX с символом # в начале
     * @return {string}
     */
    getHexString() {
        return `#${this.__hex}`;
    }
    /**
     * Возвращает HEX с символом # в начале
     * @return {string}
     */
    toString() {
        return this.getHexString();
    }
}

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
 + Файл: AppColorManagers                                                 +
 + Файл изменен: 30.01.2019 01:44:27                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Менеджер цветов приложения
 * @class AppColorManager
 */
class AppColorManager {
    /**
     * Конструктор
     * @param props
     */
    constructor(props) {
        /**
         * Цвет приложения
         * @protected
         * @ignore
         */
        this.__appColor = Color.black();
        /**
         * Цвет навигации
         * @protected
         * @ignore
         */
        this.__navigationBarColor = Color.black();
        this.__app = props.app;
    }
    /**
     * Изменяет цветовую гамму приложения
     * @param color
     */
    applyApplicationColor(color) {
        const darker = color.getDarkerColor(0.1);
        const lighter = color.getLighterColor(0.18);
        // AppStylesheet.global.addClass("bg-primary", {
        //     backgroundColor: color.toString(),
        //     color: color.isDarker() ? "white" : "black",
        // });
        // AppStylesheet.global.addClass("brd-primary", {
        //     borderColor: color.toString(),
        // });
        //
        // AppStylesheet.global.addClass("text-primary", {
        //     color: color.toString(),
        // });
        //
        // AppStylesheet.global.addClass("bg-info", {
        //     backgroundColor: lighter.toString(),
        //     color: lighter.isDarker() ? "white" : "black",
        // });
        // AppStylesheet.global.addClass("brd-info", {
        //     borderColor: lighter.toString(),
        // });
        //
        // AppStylesheet.global.addClass("text-info", {
        //     color: lighter.toString(),
        // });
        AppStylesheet.global.add("::-webkit-scrollbar-track", {
            borderColor: "#c2c2c2",
        });
        AppStylesheet.global.add("::-webkit-scrollbar", {
            borderColor: "#c2c2c2",
            width: "5px",
        });
        AppStylesheet.global.add("::-webkit-scrollbar-thumb", {
            backgroundColor: darker.toString(),
        });
        this.__appColor = color;
    }
    /**
     * Изменяет цвет панели нацигации
     * @param color
     */
    applyNavigationBarColor(color) {
        const isDarkerColor = color.isDarker();
        const borderColor = isDarkerColor ? color.getLighterColor(0.3) : color.getDarkerColor(0.05);
        const textColor = isDarkerColor ? Color.white() : new Color({ hex: "#555555" });
        AppStylesheet.global.addClass("ef-navigation", {
            backgroundColor: color.toString(),
            borderBottomColor: borderColor.toString(),
        });
        AppStylesheet.global.addClass("ef-navigation li", {
            color: textColor.toString(),
        });
        this.__navigationBarColor = color;
    }
    /**
     * Возвращает текущий цвет приложения
     * @return {Color}
     */
    getApplicationColor() {
        return this.__appColor;
    }
    /**
     * Возвращает текущий цвет панели навигации
     * @return {Color}
     */
    getNavigatonBarColor() {
        return this.__navigationBarColor;
    }
}

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
/**
 * Объект
 * @class elyObject
 * @abstract
 */
class elyObject extends Observable {
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
 * Файл: ObservableBoolean
 * Файл создан: 28.11.2018 01:03:35
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
/**
 * Прослушиваемый булевый тип
 * @class ObservableBoolean
 * @augments {ObservableProperty<boolean>}
 */
class ObservableBoolean extends ObservableProperty {
    /**
     * Конструктор
     * @param {boolean} [defaultValue = false]
     */
    constructor(defaultValue = false) {
        super(defaultValue);
    }
    /**
     * Переключает значение
     * @return {ObservableBoolean}
     */
    toggle() {
        this.set(!this.value);
        return this;
    }
}

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
 + Файл: ViewCounter                                                    +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Счетчик элементов
 */
class ViewCounter {
    /**
     * Создает идентификатор для элемента
     */
    static createIdentifierFor() {
        ViewCounter.__count++;
        return "view-" + ViewCounter.__count;
    }
}
/**
 * Счётчик элементов
 */
ViewCounter.__count = 0;

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
 + Файл: View.ts                                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Объект отображения
 * @class View
 * @abstract
 */
class View extends elyObject {
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
        this.__view.onclick = (ev) => this.notificate("click", [ev]);
        this.__view.onmouseenter = (ev) => this.notificate("mouseEnter", [ev]);
        this.__view.onmouseleave = (ev) => this.notificate("mouseLeave", [ev]);
        if (options.style)
            this.css(options.style);
        this.addObserver("click", () => {
            if (this.__actionString !== "")
                elyOneActionEval.default.go(this.__actionString);
        });
        this.hiddenProperty = new ObservableBoolean(false);
        this.hiddenProperty.change(value => {
            if (this.getStyle().display && this.getStyle().display !== "none") {
                this.getDocument().hidden = value;
            }
            else {
                this.getStyle().display = value ? "none" : null;
            }
        });
        this.hidden(options.hidden || false);
        if (options.opacity)
            this.opacity(options.opacity);
        if (options.disabled)
            this.disabled(options.disabled);
        const wait = setInterval(() => {
            if (this.getRect().width) {
                clearInterval(wait);
                this.notificate("viewWillDraw", [this]);
            }
        }, 10);
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
            this.__id = ViewCounter.createIdentifierFor();
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
     *     let obj = new Control();
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
     * Удаляет или добавляет класс
     * @param {string} className
     * @return {this}
     */
    toggleClass(className) {
        if (this.hasClass(className))
            this.removeClass(className);
        else
            this.addClass(className);
        return this;
    }
    /**
     * Возвращает и устанавливает скрытие элемента
     */
    hidden(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.hiddenProperty);
    }
    /**
     * Устанавливает css значение
     * @param style
     */
    css(style) {
        Utils.forEach(style, (k, v) => {
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
     * - {@link View.removeViewContent}
     * - {@link View.removeStyles}
     * - {@link View.removeAttributes}
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
     * @return {View}
     */
    hint(hint) {
        const selector = this.getDocument().querySelector(".ef-hint");
        if (typeof hint === "string") {
            if (selector) {
                selector.innerHTML = hint;
            }
            else {
                const hintView = document.createElement("div");
                hintView.classList.add("ef-hint");
                hintView.innerText = hint;
                this.getDocument().appendChild(hintView);
            }
            return this;
        }
        else {
            if (selector)
                return selector.innerHTML;
            return "";
        }
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
        if (this.getDocument().parentNode !== null) {
            this.getDocument().parentNode.removeChild(this.getDocument());
        }
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
    /**
     * Добавляет наблюдатель: нажатие на объект
     *
     * Имя обсервера: click
     *
     * @param {function(e: MouseEvent)} o - наблюдатель
     */
    addClickObserver(o) {
        this.addObserver("click", o);
        return this;
    }
    /**
     * Добавляет наблюдатель: мыш наведена на объект
     *
     * Имя обсервера: mouseEnter
     *
     * @param {function(e: MouseEvent)} o - наблюдатель
     */
    addMouseEnterObserver(o) {
        this.addObserver("mouseEnter", o);
        return this;
    }
    /**
     * Добавляет наблюдатель: мыш наведена на объект
     *
     * Имя обсервера: mouseLeave
     *
     * @param {function(e: MouseEvent)} o - наблюдатель
     */
    addMouseLeaveObserver(o) {
        this.addObserver("mouseLeave", o);
        return this;
    }
    elyViewWillDraw(o) {
        this.addObserver("viewWillDraw", o);
    }
}
/**
 * @typedef {Object} ViewOptions
 * @typedef {string} [class]
 * @typedef {string} [display]
 * @typedef {boolean} [hidden]
 * @typedef {boolean} [disabled]
 * @typedef {number} [opacity]
 */

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
 * Файл: XLogger* Файл создан: 04.12.2018 07:03:21
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
/**
 * XLogger - логгер уровня X
 */
class XLogger {
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
        this.clear = props.clear || false;
    }
    /**
     * Формирует строку `[ OK ]` или `[ NO ]` в зависимости от условия
     * @param {boolean} condition
     * @return {string}
     */
    static getOkNoString(condition) {
        if (condition) {
            return "[ OK ]";
        }
        else {
            return "[ NO ]";
        }
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
        msg = msg.replace(/&rst/g, clearfix ? "" : XLogger.styles.reset);
        msg = msg.replace(/&red/g, clearfix ? "" : XLogger.styles.fgRed);
        msg = msg.replace(/&grn/g, clearfix ? "" : XLogger.styles.fgGreen);
        msg = msg.replace(/&cyn/g, clearfix ? "" : XLogger.styles.fgCyan);
        msg = msg.replace(/&gre/g, clearfix ? "" : XLogger.styles.fgGrey);
        msg = msg.replace(/&blu/g, clearfix ? "" : XLogger.styles.fgBlue);
        msg = msg.replace(/&ywl/g, clearfix ? "" : XLogger.styles.fgYellow);
        msg = msg.replace(/&mgn/g, clearfix ? "" : XLogger.styles.fgMagenta);
        msg = msg.replace(/&uns/g, clearfix ? "" : XLogger.styles.underscore);
        return msg;
    }
    static __log(...obj) {
        if (window && window.elyflatobjects && window.elyflatobjects.efAppDevelopConsole
            && window.elyflatobjects.efAppDevelopConsole.shared && XLogger.autoLogger) {
            window.elyflatobjects.efAppDevelopConsole.shared.print(...obj);
        }
        else {
            console.log(...obj);
        }
    }
    static __error(...obj) {
        if (window && window.elyflatobjects && window.elyflatobjects.efAppDevelopConsole
            && window.elyflatobjects.efAppDevelopConsole.shared && XLogger.autoLogger) {
            window.elyflatobjects.efAppDevelopConsole.shared.error(...obj);
        }
        else {
            console.error(...obj);
        }
    }
    /**
     * Отображает сообщение в консоль
     * @param {String} msg
     */
    log(msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Log"]);
    }
    /**
     * Отображает сообщение в консоль от имени модуля module
     *
     * @param {String} module - модуль
     * @param {String} msg - сообщение
     */
    mod(module, msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Module", [XLogger.styles.fgMagenta, module]]);
    }
    /**
     * Отображает сообщение об ошибке
     * @param {String} msg
     */
    error(msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[XLogger.styles.fgRed, "Error"]], true);
    }
    /**
     * Отображает предупреждение
     * @param {String} msg
     */
    warning(msg) {
        if (XLogger.loggerLevel >= XLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[XLogger.styles.fgMagenta, "Warning"]]);
    }
    /**
     * Выводит LOG информацию
     *
     * @param {string} message  - the message
     * @param {Array} prefixes - the array with the prefixes
     * @param {boolean} error - the error flag
     *
     * "prefixes" could be like:
     *
     *  1. [ "Log" ]                                - Simple
     *  2. [ "Module", "Test" ]                     - Tree
     *  3. [ "Module", [ "\x1b[32m", "Test" ] ]     - Tree with the color
     *
     *  @private
     */
    _sendToConsole(message, prefixes, error = false) {
        if (this.mainPrefix !== "") {
            const _temp = [[XLogger.styles.fgCyan, this.mainPrefix]];
            for (const _prefix of prefixes)
                _temp.push(_prefix);
            prefixes = _temp;
        }
        const dateString = new Date().toISOString().replace(/T/, " "). // replace T with a space
            replace(/\..+/, "");
        let _prefixToDisplay = "";
        let _clearPrefix = "";
        for (let _prefix of prefixes) {
            let _color = this.clear ? "" : XLogger.styles.fgGreen;
            if (_prefix instanceof Array) {
                _color = _prefix[0];
                _prefix = _prefix[1];
            }
            _prefixToDisplay += "[" + (!this.clear ? _color : "") + _prefix +
                (!this.clear ? XLogger.styles.reset : "") + "]";
            _clearPrefix += "[" + _prefix + "]";
        }
        const str = "[" + dateString + "]" + _clearPrefix + ": " + XLogger.__loggerFilter(message, true);
        const strToDisplay = "["
            + (!this.clear ? XLogger.styles.fgGrey : "")
            + dateString
            + (!this.clear ? XLogger.styles.reset : "")
            + "]"
            + _prefixToDisplay
            + (!this.clear ? XLogger.styles.reset : "")
            + ": " + XLogger.__loggerFilter(message) + (this.clear ? "" : XLogger.styles.reset);
        this._saveLogString(str);
        if (this.clear) {
            if (!error)
                XLogger.__log(XLogger.__loggerFilter(strToDisplay, true));
            else
                XLogger.__error(XLogger.__loggerFilter(strToDisplay, true));
        }
        else if (!error)
            XLogger.__log(strToDisplay);
        else
            XLogger.__error(strToDisplay);
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
XLogger.default = new XLogger({ mainPrefix: "Default" });
/**
 * Уровни логирования
 */
XLogger.loggerLevels = {
    DEBUG: 2,
    LOG: 1,
    NONE: 0,
};
/**
 * Текущий уровень логирования
 */
XLogger.loggerLevel = XLogger.loggerLevels.DEBUG;
/**
 * Стили
 */
XLogger.styles = {
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
/**
 * Определение логирования косоль ely.flat/window
 */
XLogger.autoLogger = false;

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
 + Файл: Control.ts                                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Основная единица графического элемента
 * @class Control
 * @augments View
 */
class Control extends View {
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
     * Создает Control или объект elyControlObjectProtocol
     * @param obj
     */
    static fromObject(obj) {
        if (obj.line)
            return Control.line();
        const item = obj.item;
        if (item && window.elyflatobjects.hasOwnProperty(item)) {
            const opts = Utils.filter(obj, (k) => {
                return ["item"].indexOf(k) === -1;
            });
            const inst = new window.elyflatobjects[item](opts);
            if (inst instanceof View || typeof inst.getView === "function")
                return inst;
        }
        return Control.empty();
    }
    /**
     * Создает Control или объект elyControlObjectProtocol из JSON строки
     * @param json
     */
    static fromJSON(json) {
        return Control.fromObject(JSON.parse(json));
    }
    /**
     * Выполняет попытку мутировать obj в объект View.
     * Иначе возвращает пустой элемент.
     *
     *
     *     let obj = "Тест";
     *     let view = Control.tryMutateToView(obj);
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
            if (obj instanceof View)
                return obj;
            return String(obj).textView();
        }
        catch (e) {
            return Control.empty();
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
            if (view instanceof View) {
                this.__subviews.push(view);
                view.superview = this;
                this.notificate("addview", [view]);
                this.getDocument().appendChild(view.getDocument());
            }
            else {
                XLogger.default.error("В объект Control может быть добавлен только элемент " +
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
    removeViewContent() {
        this.__subviews.splice(0, this.__subviews.length);
        return super.removeViewContent();
    }
}
/**
 * Горизонтальная линяя
 */
Control.line = () => new Control({ tag: "hr" });
/**
 * Пустой объект Control
 */
Control.empty = () => new Control();

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
 + Файл: IconView.ts                                                      +
 + Файл изменен: 08.02.2019 00:19:40                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения иконки
 * @class IconView
 * @augments {View}
 */
class IconView extends View {
    /**
     * Конструткор
     * @param {IconViewOptions} options
     */
    constructor(options) {
        super(Object.assign({ tag: "span" }, options));
        /**
         * Свойство: размер иконки
         * @ignore
         * @protected
         */
        this.__iconSizeProperty = new ObservableProperty().change((value, oldVal) => {
            this.getStyle().fontSize = null;
            if (oldVal && !oldVal.custom)
                this.removeClass(`--${oldVal.value}`);
            if (value.custom) {
                this.getStyle().fontSize = value.value;
            }
            else {
                this.addClass(`--${value.value}`);
            }
        });
        /**
         * Свойство: толщина иконки
         * @ignore
         * @protected
         */
        this.__iconWeightProperty = new ObservableProperty().change((value, oldVal) => {
            this.getStyle().fontWeight = null;
            if (oldVal && !oldVal.custom)
                this.removeClass(`--${oldVal.value}`);
            if (value.custom) {
                this.getStyle().fontSize = value.value;
            }
            else {
                this.addClass(`--${value.value}`);
            }
        });
        /**
         * Свойство: стиль иконки
         * @ignore
         * @protected
         */
        this.__iconStyleProperty = new ObservableProperty().change((value, oldVal) => {
            if (oldVal)
                this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });
        /**
         * Свойство: имя иконки
         * @ignore
         * @protected
         */
        this.__iconNameProperty = new ObservableProperty().change((value, oldVal) => {
            if (oldVal)
                this.removeClass(`fa-${oldVal}`);
            this.addClass(`fa-${value}`);
        });
        this.addClass("ef-icon");
        this.addClass("fa");
        variableAndSet(options.iconName, this.iconName, "refresh");
        variableAndSet(options.iconSize, this.iconSize, this);
        variableAndSet(options.iconStyle, this.iconStyle, this);
        variableAndSet(options.iconWeight, this.iconWeight, this);
        variableAndSet(options.spinning, this.spinning, this);
    }
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {IconView}
     */
    static deserialize(raw) {
        return new IconView(JSON.parse(raw));
    }
    /**
     * Возвращает свойство: имя иконки
     * @return {ObservableProperty<string>}
     */
    getIconNameProperty() {
        return this.__iconNameProperty;
    }
    /**
     * Возвращает и устанавливает имя иконки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    iconName(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconNameProperty);
    }
    /**
     * Возвращает свойство: размер иконки
     * @return {ObservableProperty<Size>}
     */
    getIconSizeProperty() {
        return this.__iconSizeProperty;
    }
    /**
     * Возвращает и устанавливает размер иконки
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    iconSize(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconSizeProperty);
    }
    /**
     * Возвращает свойство: толщина иконки
     * @return {ObservableProperty<Weight>}
     */
    getIconWeightProperty() {
        return this.__iconWeightProperty;
    }
    /**
     * Возвращает и устанавливает толщина иконки
     * @param {Weight} [value] - значение
     * @returns {Weight|this|null}
     */
    iconWeight(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconWeightProperty);
    }
    /**
     * Возвращает свойство: стиль иконки
     * @return {ObservableProperty<Style>}
     */
    geticonStyleProperty() {
        return this.__iconStyleProperty;
    }
    /**
     * Возвращает и устанавливает стиль иконки
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    iconStyle(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__iconStyleProperty);
    }
    /**
     * Возвращает и устанавливает флаг анимации вращения элемента
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    spinning(value) {
        if (value === undefined)
            return this.hasClass("fa-spin");
        if (value)
            this.addClass("fa-spin");
        this.removeClass("fa-spin");
        return this;
    }
    /**
     * Сериализует объект
     */
    serialize() {
        return JSON.stringify({
            iconName: this.iconName(),
            iconSize: this.iconSize().value,
            iconStyle: this.iconStyle().value,
            iconWeight: this.iconWeight().value,
        });
    }
}
/**
 * @typedef {Object} IconViewOptions
 * @property {string} [iconName]
 * @property {Size|string|number} [iconSize]
 * @property {Weight|string|number} [iconWeight]
 * @property {Style|string|number} [iconStyle]
 */

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
 + Файл: TextView.ts                                                      +
 + Файл изменен: 08.02.2019 00:09:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения текста
 * @class TextView
 * @augments {View}
 *
 * Мета коды строк:
 *
 * - \*Text\* - Толстый текст.
 * - (link: http://dlgs.ru){Some text} - Добавляет контекстную ссылку.
 * - (action: content(index)){Some text} - Добавляет контекстный elyOneAction.
 * - {nl} - Перенос строки
 */
class TextView extends View {
    /**
     * Конструктор
     * @param {TextViewOptions} options - опции
     */
    constructor(options = {}) {
        super(Object.assign({ tag: "span" }, options));
        /**
         * Свойство: стиль текста
         * @ignore
         * @protected
         */
        this.__textStyleProperty = new ObservableProperty().change((value, oldVal) => {
            if (oldVal)
                this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });
        /**
         * Свойство: размер текста
         * @ignore
         * @protected
         */
        this.__textSizeProperty = new ObservableProperty().change((value, oldVal) => {
            this.getStyle().fontSize = null;
            if (oldVal && !oldVal.custom)
                this.removeClass(`--${oldVal.value}`);
            if (value.custom) {
                this.getStyle().fontSize = value.value;
            }
            else {
                this.addClass(`--${value.value}`);
            }
        });
        /**
         * Свойство: толщина текста
         * @ignore
         * @protected
         */
        this.__textWeightProperty = new ObservableProperty().change((value, oldVal) => {
            this.getStyle().fontWeight = null;
            if (oldVal && !oldVal.custom)
                this.removeClass(`--${oldVal.value}`);
            if (value.custom) {
                this.getStyle().fontSize = value.value;
            }
            else {
                this.addClass(`--${value.value}`);
            }
        });
        /**
         * Свойство: текст элемента
         * @ignore
         * @protected
         */
        this.__textProperty = new ObservableProperty().change(value => {
            this.getDocument().innerHTML = TextView.filterString(value);
        });
        this.addClass("ef-text");
        this.text(options.text || "");
        variable(options.textSize, value => this.textSize(value));
        variable(options.textStyle, value => this.textStyle(value));
        variable(options.textWeight, value => this.textWeight(value));
        variable(options.textCenter, value => this.textCenter(value));
    }
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {TextView}
     */
    static deserialize(raw) {
        return new TextView(JSON.parse(raw));
    }
    /**
     * Фильтрует строку
     * @param {string} str
     * @return {string}
     */
    static filterString(str) {
        return str.replace(/\*([^*]+)\*/g, "<b>$1</b>")
            .replace(/\(link:([^)]+)\){([^}]+)}/g, "<a href='$1'>$2</a>")
            .replace(/\(action:([^{]+)\){([^}]+)}/g, "<a href='#' onclick='ely.oneAction.go(\"$1\")'>$2</a>")
            .replace(/{nl}/g, "<br>");
    }
    /**
     * Возвращает свойство: стиль текста
     * @return {ObservableProperty<Style>}
     */
    getTextStyleProperty() {
        return this.__textStyleProperty;
    }
    /**
     * Возвращает и устанавливает стиль текста
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    textStyle(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textStyleProperty);
    }
    /**
     * Возвращает свойство: размер текста
     * @return {ObservableProperty<Size>}
     */
    getTextSizeProperty() {
        return this.__textSizeProperty;
    }
    /**
     * Возвращает и устанавливает размер текста
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    textSize(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textSizeProperty);
    }
    /**
     * Возвращает свойство: текст элемента
     * @return {ObservableProperty<string>}
     */
    getTextProperty() {
        return this.__textProperty;
    }
    /**
     * Возвращает и устанавливает текст элемента
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    text(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textProperty);
    }
    /**
     * Возвращает и устанавливает флаг выравнивания текста по центру
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    textCenter(value) {
        if (value === undefined)
            return this.hasClass("--centered");
        if (value)
            this.addClass("--centered");
        else
            this.removeClass("--centered");
        return this;
    }
    /**
     * Возвращает свойство: толщина текста
     * @return {ObservableProperty<Weight>}
     */
    getTextWeightProperty() {
        return this.__textWeightProperty;
    }
    /**
     * Возвращает и устанавливает толщина текста
     * @param {Weight} [value] - значение
     * @returns {Weight|this|null}
     */
    textWeight(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__textWeightProperty);
    }
    /**
     * Выравнивает текст по середине.
     * Можно считать алиасом выражения `TextView.textCenter(true)`.
     * @return {this}
     */
    centered() {
        this.textCenter(true);
        return this;
    }
    /**
     * Сериализует объект
     * @return {string}
     */
    serialize() {
        return JSON.stringify({
            text: this.text(),
            textCenter: this.textCenter(),
            textSize: this.textSize().value,
            textStyle: this.textStyle().value,
            textWeight: this.textWeight().value,
        });
    }
}
/**
 * @typedef {Object} TextViewOptions
 * @property {string} [text = ""]
 * @property {boolean} [textCenter = false]
 * @property {Style|string} [textStyle]
 * @property {Size} [textSize]
 * @property {Weight} [textWeight]
 */

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
 + Файл: AppFileWatcher.ts                                                    +
 + Файл изменен: 23.11.2018 23:19:03                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Отслеживание изменения файла
 */
class AppFileWatcher extends Observable {
    /**
     * Конструктор
     * @param options
     */
    constructor(options) {
        super();
        /**
         * Последний размер файла
         */
        this.lastFileSize = -1;
        /**
         * Стартовое значение на первой итерации
         */
        this.startValue = null;
        /**
         * Поток
         */
        this.thread = null;
        this.filePath = options.filePath;
        const view = new Control();
        view.getStyle().backgroundColor = "rgb(110, 136, 73)";
        view.getStyle().textAlign = "center";
        view.getStyle().position = "fixed";
        view.getStyle().bottom = "0";
        view.getStyle().left = "0";
        view.getStyle().right = "0";
        view.getStyle().zIndex = "1000";
        view.getStyle().padding = "15px";
        const iconView = new IconView({ iconName: "refresh" });
        iconView.spinning(true);
        iconView.getStyle().marginLeft = "15px";
        const textView = new TextView({ text: "Develop file watching" });
        textView.getStyle().display = "inline-block";
        view.addSubView(textView);
        view.addSubView(iconView);
        document.body.append(view.getDocument());
        this.addListener((size) => {
            textView.text(`Develop file watching. Size: *${size}* bytes`);
        });
    }
    /**
     * Добавляет слушатель изменения файла
     * @param observer
     */
    addListener(observer) {
        this.addObserver("changed", observer);
        return this;
    }
    /**
     * Добавляет слушатель изменения файла по отношению к первоначальной стадии
     * @param observer
     */
    addUpdateListener(observer) {
        this.addObserver("updated", observer);
        return this;
    }
    /**
     * Запускает систему прослушивания
     */
    start() {
        this.thread = setInterval(() => {
            const xhr = new XMLHttpRequest();
            xhr.open("HEAD", this.filePath, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === xhr.DONE) {
                    const size = Math.round(parseInt(xhr.getResponseHeader("Content-Length") || "0", 10)
                        / (1024) * 100) / 100;
                    if (this.lastFileSize === -1)
                        this.lastFileSize = size;
                    if (size !== this.lastFileSize)
                        this.notificate("changed", [size]);
                    this.lastFileSize = size;
                    if (this.startValue === null)
                        this.startValue = size;
                    if (this.startValue !== size)
                        this.notificate("updated", [size]);
                }
            };
            xhr.send();
        }, 1000);
        return this;
    }
    stop() {
        if (this.thread)
            clearInterval(this.thread);
        return this;
    }
}

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
 + Файл: elyEnum.ts                                                           +
 + Файл изменен: 06.01.2019 04:55:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Перечисление
 * @class elyEnum
 * @template T
 * @abstract
 */
class elyEnum {
    /**
     * Конструктор
     * @param {T} value
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Преобразование в строку
     * @return {string}
     */
    toString() {
        return String(this.value);
    }
    /**
     * Возвращает true, если объекты одинаковые
     * @param {elyEnum} obj
     * @return {boolean}
     */
    equals(obj) {
        return this.value === obj.value;
    }
}

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
 + Файл: Style.ts                                                             +
 + Файл изменен: 08.02.2019 01:22:49                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Стили ely.flat.application
 * @class Style
 * @augments {elyEnum}
 */
class Style extends elyEnum {
    /**
     * Конструктор
     * @ignore
     * @param val
     */
    constructor(val) {
        super(val);
    }
    /**
     * Список
     */
    static rawList() {
        return {
            danger: Style.danger.value,
            default: Style.default.value,
            info: Style.info.value,
            primary: Style.primary.value,
            success: Style.success.value,
            warning: Style.warning.value,
        };
    }
    /**
     * Свой стиль
     * @param name
     */
    static custom(name) {
        return new Style(name);
    }
    /**
     * Возвраща стиль по имени
     * @param name
     */
    static byName(name) {
        return new Style(name);
    }
}
/**
 * Стандартный стиль
 *
 * Элементарный сброс стиля
 */
Style.default = new Style("default");
/**
 * Главный стиль
 *
 * Основной стиль подходит для важных элементов.
 */
Style.primary = new Style("primary");
/**
 * Информативный стиль
 *
 * Основной стиль подходит для отображения информации, которая должна выделяться.
 */
Style.info = new Style("info");
/**
 * Стиль предупреждения
 *
 * Стиль, особо концентрирующий внимание пользователя.
 */
Style.warning = new Style("warning");
/**
 * Успешный стиль
 *
 * Стиль, говорящий об успешном завершении действия.
 */
Style.success = new Style("success");
/**
 * Опасный стиль
 *
 * Стиль, ярко бросающийся в глаза. Подойдет для отметки ошибок.
 */
Style.danger = new Style("danger");

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
 + Файл: PreloaderViews                                                   +
 + Файл изменен: 15.02.2019 01:13:20                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения
 * @class PreloaderView
 * @augments {View}
 */
class PreloaderView extends View {
    /**
     * Конструктор
     * @param {PreloaderViewOptions} options - опции
     */
    constructor(options = {}) {
        super(options);
        /**
         * Панель объединения
         * @protected
         * @ignore
         */
        this.__wrapperView = new Control({ class: "--wrapper" });
        /**
         * Иконка
         * @protected
         * @ignore
         */
        this.__iconView = new IconView({ iconName: "refresh", spinning: true });
        /**
         * Элемент отображения текста
         * @protected
         * @ignore
         */
        this.__titleTextView = new TextView({ class: "--title" });
        /**
         * Свойство: стиль загрузчика
         * @ignore
         * @protected
         */
        this.__preloaderStyleProperty = new ObservableProperty(Style.primary).change((value, oldVal) => {
            if (oldVal)
                this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });
        if (!options.selector) {
            this.addClass("ef-loading");
            this.getDocument().append(this.getWrapperView().getDocument());
            this.getWrapperView()
                .addSubView(this.getIconView())
                .addSubView(this.getTitleTextView());
            this.title(options.title || "Пожалуйста, подождите...");
            variable(options.fixedPosition, value => this.fixedPosition(value));
            variable(options.preloaderStyle, value => this.preloaderStyle(value));
        }
    }
    /**
     * Возвращает элемент объекдинения
     * @return {Control}
     */
    getWrapperView() {
        return this.__wrapperView;
    }
    /**
     * Возвращает элемент отображения иконки
     * @return {IconView}
     */
    getIconView() {
        return this.__iconView;
    }
    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    getTitleTextView() {
        return this.__titleTextView;
    }
    /**
     * Возвращает и устанавливает текст загрузки
     * @param {string} [value] - значение
     * @returns {string|this}
     */
    title(value) {
        if (value === undefined)
            return this.getTitleTextView().text();
        this.getTitleTextView().text(value);
        return this;
    }
    /**
     * Возвращает и устанавливает стиль загрузчика
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    preloaderStyle(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__preloaderStyleProperty);
    }
    /**
     * Возвращает и устанавливает флаг фиксированной позиции
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    fixedPosition(value) {
        if (value === undefined)
            return this.hasClass("--fixed");
        if (value)
            this.addClass("--fixed");
        else
            this.removeClass("--fixed");
        return this;
    }
}
/**
 * @typedef {Object} PreloaderViewOptions
 * @property {boolean} [fixedPosition = false]
 * @property {string} [title = false]
 * @property {Style} [preloaderStyle]
 */

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
 + Файл: AppPreloaderViews                                                +
 + Файл изменен: 15.02.2019 01:31:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения - экран загрузки приложения
 * @class AppPreloaderView
 * @augments {PreloaderView}
 */
class AppPreloaderView extends PreloaderView {
    /**
     * Конструктор
     */
    constructor() {
        super({ selector: "#preloader" });
        /**
         * Панель объединения
         * @protected
         * @ignore
         */
        this.__wrapperView = new Control({
            element: document.getElementById("preloader")
                .getElementsByClassName("--wrapper")[0],
        });
        /**
         * Иконка
         * @protected
         * @ignore
         */
        this.__iconView = new IconView({
            element: document.getElementById("preloader")
                .getElementsByClassName("--wrapper")[0]
                .getElementsByClassName("ef-icon")[0],
        });
        /**
         * Элемент отображения текста
         * @protected
         * @ignore
         */
        this.__titleTextView = new TextView({
            element: document.getElementById("preloader")
                .getElementsByClassName("--wrapper")[0]
                .getElementsByClassName("--title")[0],
        });
        this.title("Пожалуйста, подождите...");
        this.fixedPosition(true);
        this.getIconView().iconName("refresh");
    }
}

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
/**
 * Подвал приложения
 * @deprecated
 */
class elyFooterView extends Control {
    /**s
     * Констуктор
     */
    constructor() {
        super({ class: "ef-footer" });
        this.titleView = new TextView({ class: "--title" });
        this.subtitleView = new TextView({ class: "--sub-title" });
        this.addSubView(this.titleView);
        this.addSubView(this.subtitleView);
    }
}

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
 + Файл: URLRequest.ts                                                  +
 + Файл изменен: 26.02.2019 03:39:55                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Методы передачи параметров
 * @enum
 */
var URLRequestMethod;
(function (URLRequestMethod) {
    URLRequestMethod["GET"] = "GET";
    URLRequestMethod["POST"] = "POST";
})(URLRequestMethod || (URLRequestMethod = {}));
/**
 * Названия заголовков запроса
 * @enum
 */
var URLRequestHeaderName;
(function (URLRequestHeaderName) {
    URLRequestHeaderName["contentType"] = "Content-type";
})(URLRequestHeaderName || (URLRequestHeaderName = {}));
/**
 * URL запрос
 * @class URLRequest
 * @augments {Observable}
 */
class URLRequest extends Observable {
    /**
     * Конструктор
     * @param options
     */
    constructor(options) {
        super();
        /**
         * @ignore
         */
        this.__async = true;
        this.__url = options.url;
        this.__xhr = new XMLHttpRequest();
        this.__method = options.method || URLRequestMethod.GET;
        this.__data = options.data || {};
        variable(options.async, value => this.__async = value, true);
    }
    /**
     * Отправляет GET запрос
     *
     * @param {string} url
     * @param {* | TURLCallback} data
     * @param {TURLCallback} callback
     */
    static sendGET(url, data, callback) {
        if (typeof data === "function")
            new URLRequest({ url }).send(data);
        else
            new URLRequest({ url, data }).send(callback);
    }
    /**
     * Возвращает URL запроса
     * @return {string}
     */
    getURL() {
        return this.__url;
    }
    /**
     * Возвращает данные запроса
     * @return {*}
     */
    getData() {
        return this.__data;
    }
    /**
     * Возвращает true, если запрос асинхронный
     * @return {boolean}
     */
    isAsync() {
        return this.__async;
    }
    /**
     * Возвращает метод
     * @return URLRequestMethod
     */
    getMethod() {
        return this.__method;
    }
    /**
     * Устанавливает данные
     * @param name
     * @param value
     */
    setData(name, value) {
        this.__data[name] = value;
        return this;
    }
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     * @return URLRequest
     */
    send(callback) {
        this.__prepareXMLHttpRequestCore(callback);
        this.getXMLHttpRequest().send();
    }
    /**
     * Устанавливает заголовок
     *
     * @param {string|URLRequestHeaderName} name - имя заголовка
     * @param {string} value - значение заголовка
     * @return {this}
     */
    setHeader(name, value) {
        this.getXMLHttpRequest().setRequestHeader(name, value);
        return this;
    }
    /**
     * Возвращает ядро запроса
     * @return {XMLHttpRequest}
     */
    getXMLHttpRequest() {
        return this.__xhr;
    }
    /**
     * Добавляет наблюдатель: изменение прогресса
     *
     * Имя обсервера: progressChanged
     *
     * @param o - наблюдатель
     */
    addProgressChangedObserver(o) {
        this.addObserver("progressChanged", o);
        return this;
    }
    /**
     * Добавляет наблюдатель: завершения выполнения запроса
     *
     * Имя обсервера: ready
     *
     * @param o - наблюдатель
     */
    addReadyObserver(o) {
        this.addObserver("ready", o);
        return this;
    }
    /**
     * Возвращает строку параметров
     * @private
     */
    __getParametersString() {
        return Object
            .keys(this.getData())
            .map((key) => {
            return key + "=" + encodeURIComponent(this.getData()[key]);
        })
            .join("&");
    }
    __prepareXMLHttpRequestCore(callback) {
        this.getXMLHttpRequest().open(this.getMethod(), this.getURL() + "?" +
            this.__getParametersString(), this.isAsync());
        this.getXMLHttpRequest().onprogress = ev => {
            this.notificate("progressChanged", [ev.loaded, ev.total]);
        };
        this.getXMLHttpRequest().onreadystatechange = () => {
            if (this.getXMLHttpRequest().readyState === 4 && this.getXMLHttpRequest().status === 200) {
                if (callback)
                    callback(this.getXMLHttpRequest().responseText, true);
                this.notificate("ready", [this.getXMLHttpRequest().responseText, true]);
            }
            else {
                if (callback)
                    callback(null, false);
                this.notificate("ready", [null, false]);
            }
        };
    }
}
/**
 * @typedef {Object} URLRequestOptions
 * @property {string} url
 * @property {URLRequestMethod} [method]
 * @property {boolean} [async]
 * @property {*} data
 */
/**
 * Прогресс изменен
 * @callback TURLProgressChangedCallback
 * @param {number} loadedBytes - отпарвлено
 * @param {number} totalBytes - необходимо отправить
 */
/**
 * Ответ запроса
 * @callback TURLCallback
 * @param {*} response - ответ
 * @param {boolean} status - статус ответа
 */

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
 + Файл: AppConfig.ts                                                     +
 + Файл изменен: 30.01.2019 00:57:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Конфигурация приложения
 * @class AppConfig
 * @augments {Observable}
 * @augments {AppConfigInterface}
 */
class AppConfig extends Observable {
    constructor() {
        super();
        /**
         * Секция: приложение
         * {@link ConfigSection_app}
         */
        this.app = {
            author: null,
            title: "my.App",
        };
        /**
         * Секция: разработка
         * {@link ConfigSection_develop}
         */
        this.develop = {
            appFile: "js/index.js",
        };
        /**
         * Секция: манифест
         * {@link ConfigSection_manifest}
         */
        this.manifest = {
            allowStandaloneMode: true,
            useApplicationIcon: true,
            useContentController: true,
            useContentRouter: true,
            useDevelopMode: false,
            useIPhoneXStandaloneFix: true,
            useMeta: true,
            useNavigationBar: true,
            useViewPort: true,
        };
        /**
         * Секция: контроллер контента
         * {@link ConfigSection_contentController}
         */
        this.contentController = {
            defaultContentId: "index",
            errorContentId: "error",
        };
        /**
         * Секция: панель навигации
         * {@link ConfigSection_navigationBar}
         */
        this.navigationBar = {
            color: "#2b2b2b",
            extendedStyle: false,
            imageUrl: null,
            items: [],
            subtitle: null,
            title: "my.App{ }",
        };
        /**
         * Секция: боковая панель навигации
         * {@link ConfigSection_sideNavigationBar}
         */
        this.sideNavigationBar = {
            allowMouseEvents: true,
            items: [],
        };
        /**
         * Секция: шаблон
         * {@link ConfigSection_template}
         */
        this.template = {
            color: "#194d6d",
            footer: {
                subtitle: "My application",
                title: "Works with *ely.Flat* Application Engine",
            },
            maxContainerWidth: 700,
        };
        /**
         * Секция: мета данные
         * {@link ConfigSection_meta}
         */
        this.meta = {
            appleMobile: {
                statusBarStyle: "black-translucent",
            },
            charset: "UTF-8",
            iconPath: "resources/icon",
            viewport: {
                fit: "cover",
                initialScale: 1.0,
                maximumScale: 1.0,
                userScale: "no",
                width: "device-width",
            },
        };
    }
    /**
     * Загружает конфигурацию
     * @param {{file?: string, data?: *}} props
     */
    load(props) {
        if (isSet(props.file)) {
            URLRequest.sendGET(props.file, (response) => {
                if (response) {
                    Utils.mergeDeep(this, safeJsonParse(response));
                    this.notificate("loaded", [true, this]);
                }
                else {
                    this.notificate("loaded", [false, this]);
                }
            });
        }
        else {
            if (props.data) {
                Utils.mergeDeep(this, props.data);
                this.notificate("loaded", [true, this]);
            }
        }
    }
    /**
     * Добавляет наблюдатель: загрузка конфигурации завершена
     *
     * Имя обсервера: loaded
     *
     * @param {function(result: boolean, cfg: AppConfig)} o - наблюдатель
     */
    addLoadedObserver(o) {
        this.addObserver("loaded", o);
        return this;
    }
    /**
     * Возвращает заголовок приложения
     * @return {string}
     */
    getAppTitle() {
        return this.app.title;
    }
    /**
     * Возвращает строку цвета приложения
     * @return {string}
     */
    getAppColorString() {
        return this.template.color;
    }
    /**
     * Возвращает цвет панели навигации
     * @return {string}
     */
    getNavigationBarColorString() {
        return this.navigationBar.color || this.template.color;
    }
    /**
     * Возвращает цвет панели навигации
     */
    getNavigationBarColor() {
        return new Color({ hex: this.getNavigationBarColorString() });
    }
    /**
     * Возвращает основной цвет приложения
     * @return {Color}
     */
    getAppColor() {
        return new Color({ hex: this.getAppColorString() });
    }
    /**
     * Возвращает true, если используется панель навигации
     */
    isNavigationBarUsed() {
        return this.manifest.useNavigationBar;
    }
    /**
     * Возвращает true, если используется боковая панель навигации
     */
    isSideNavigationBarUsed() {
        return this.manifest.useSideNavigationBar;
    }
}
/**
 * Путь до файла конфигурации
 * @type {string}
 */
AppConfig.appConfigPath = "app.config.json";
/**
 * Стандратная конфигурация
 * @type {AppConfig}
 */
AppConfig.default = new AppConfig();

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
 + Файл: Field.ts                                                         +
 + Файл изменен: 09.02.2019 14:42:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Поле ввода
 * @class Field
 * @template T
 * @augments View
 */
class Field extends View {
    /**
     * Конструктор
     * @param {TextFieldOptions} options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Свойство: значение поля ввода
         * @type {ObservableProperty<T>}
         */
        this.valueProperty = new ObservableProperty();
        /**
         * Свойство: флаг возможности редактирования
         * @type {ObservableBoolean}
         */
        this.editableProperty = new ObservableBoolean(true);
        /**
         * Элемент доступа
         * @protected
         * @ignore
         * @readonly
         */
        this.__accessoryView = this.__createAccessory();
        /**
         * Таймер выделения
         * @protected
         * @ignore
         */
        this.__markTimer = null;
        this.getDocument().append(this.getAccessory());
        this.editableProperty.change(value => {
            if (value) {
                this.removeClass("--disabled");
            }
            else {
                this.addClass("--disabled");
            }
            this.getAccessory().disabled = !value;
        });
        variableAndSet(options.editable, this.editable, this);
        variableAndSet(options.placeholder, this.placeholder, this);
    }
    /**
     * Возвращает элемент доступа
     * @return {HTMLInputElement}
     */
    getAccessory() {
        return this.__accessoryView;
    }
    /**
     * Возвращает и устанавливает значение поля ввода
     * @param {string|null} [value] - значение
     * @returns {string|this|null}
     */
    value(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }
    /**
     * Очищает значение
     * @return {this}
     */
    clearValue() {
        this.value(null);
        return this;
    }
    /**
     * Возвращает и устанавливает флаг возможности редактирования
     * @param {boolean} [value] - значение
     * @returns {boolean|this}
     */
    editable(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.editableProperty);
    }
    /**
     * Возвращает и устанавливает текст подсказки ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    placeholder(value) {
        if (value === undefined)
            return this.getAccessory().placeholder;
        this.getAccessory().placeholder = value;
        return this;
    }
    /**
     * Добавляет наблюдатель: изменения значения
     *
     * Имя обсервера: change
     *
     * @param {function(value: T, oldVal: T)} o - наблюдатель
     */
    change(o) {
        this.valueProperty.change(o);
        return this;
    }
    /**
     * Помечает объект как неисправный
     * @param {boolean} flag
     * @return {this}
     */
    error(flag) {
        if (this.__markTimer) {
            clearTimeout(this.__markTimer);
        }
        if (flag) {
            this.addClass("error");
            this.__markTimer = setTimeout(() => {
                this.error(false);
                this.__markTimer = null;
            }, 1500);
        }
        else {
            this.removeClass("error");
        }
        return this;
    }
    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    isValid() {
        return this.isEmpty() === false;
    }
    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    isEmpty() {
        return this.value() === null;
    }
    /**
     * Фабрикует элемент доступа
     * @private
     * @ignore
     */
    __createAccessory() {
        return new Control({ tag: "input" }).getDocument();
    }
}
/**
 * @typedef {Object} FieldOptions
 * @template T
 * @property {T} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 */

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
 + Файл: TextArea.ts                                                      +
 + Файл изменен: 09.02.2019 21:45:17                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Поле воода многострочного текста
 * @class TextArea
 * @augments {TextField}
 */
class TextArea extends Field {
    /**
     * Конструктор
     * @param {TextAreaOptions} options - опции
     */
    constructor(options = {}) {
        super(options);
        this.addClass("ef-textarea");
        this.getAccessory().onchange = () => this.value(this.getAccessory().value);
        this.getAccessory().oninput = (e) => this.notificate("input", [this.getAccessory().value, e]);
        this.valueProperty.change((value) => this.getAccessory().value = value);
        this.rowsCount(5);
        variable(options.value, (v) => this.value(v));
        variable(options.rowsCount, (v) => this.rowsCount(v));
        variable(options.readonly, (v) => this.readonly(v));
    }
    /**
     * Возвращает элемент доступа
     */
    getAccessory() {
        return this.__accessoryView;
    }
    /**
     * Возвращает и устанавливает количество строк
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    rowsCount(value) {
        if (value === undefined)
            return this.getAccessory().rows;
        this.getAccessory().rows = value;
        return this;
    }
    /**
     * Возвращает и устанавливает флаг разрешающий только чтение
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    readonly(value) {
        if (value === undefined)
            return this.getAccessory().readOnly;
        this.getAccessory().readOnly = value;
        return this;
    }
    /**
     * Добавляет наблюдатель: ввод текста
     *
     * Имя обсервера: input
     *
     * @param {function(value: string, e: Event)} o - наблюдатель
     */
    addInputObserver(o) {
        this.addObserver("input", o);
        return this;
    }
    /**
     * Пролистывает поле ввода многострочного текста до конца
     * @return {this}
     */
    scrollToBottom() {
        this.getAccessory().scrollTop = this.getAccessory().scrollHeight;
        return this;
    }
    /**
     * Фабрикует элемент доступа
     * @private
     * @ignore
     */
    __createAccessory() {
        return new Control({ tag: "textarea" }).getDocument();
    }
}
/**
 * @typedef {TextFieldOptions} TextAreaOptions
 * @property {number} [rowsCount = 5]
 * @property {string} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 * @property {boolean} [readonly = false]
 */

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
 + Файл: HeaderTextView.ts                                                +
 + Файл изменен: 09.02.2019 15:19:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения заголовка
 */
class HeaderTextView extends TextView {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = { headerLevel: 1 }) {
        super(Object.assign({ tag: `h${options.headerLevel}` }, options));
    }
}
/**
 * @typedef {TextViewOptions} HeaderTextViewOptions
 * @property {number} [headerLevel = 1]
 */

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
 + Файл: AppDevelopConsole.ts                                             +
 + Файл изменен: 10.02.2019 18:49:26                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения - консоль
 * @class AppDevelopConsole
 * @augments {View}
 */
class AppDevelopConsole extends View {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Кол-во строк
         */
        this.saveRowsLimit = 100;
        /**
         * Строки
         */
        this.__rows = [];
        /**
         * Текст
         */
        this.__textArea = new TextArea({ readonly: true });
        /**
         * Перекрывает консоль
         */
        this.__lockConsole = false;
        this.addClass("ef-app-develop-console");
        this.getDocument().append(new HeaderTextView({ headerLevel: 3, text: "ely.flat Application Develop Console" }).getDocument());
        this.getDocument().append(this.__textArea.getDocument());
    }
    /**
     * Отображает данные в консоли
     * @param data
     */
    print(...data) {
        if (this.__lockConsole)
            return this;
        const strs = data.map(value => String(value));
        this.__rows.push(strs.join(" "));
        if (this.__rows.length > this.saveRowsLimit) {
            this.__rows.splice(0, Math.abs(this.__rows.length - this.saveRowsLimit));
        }
        this.__textArea.value(this.__rows.join("\n"));
        this.__textArea.scrollToBottom();
        return this;
    }
    /**
     * Отображает ошибку в консоли
     * @param data
     */
    error(...data) {
        if (this.hidden())
            this.hidden(false);
        const arr = ["<b>"];
        data.forEach(value => arr.push(value));
        arr.push("</b>");
        this.print(...arr);
        this.__lockConsole = true;
        return this;
    }
}
/**
 * Общий объект консоли
 * @type {AppDevelopConsole}
 */
AppDevelopConsole.shared = new AppDevelopConsole();

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
 + Файл: AppDocumentBody.ts                                               +
 + Файл изменен: 30.01.2019 01:55:32                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Документ: Тело
 * @class AppDocumentHead
 * @augments {View}
 */
class AppDocumentBody extends Control {
    /**
     * Конструктор
     */
    constructor() {
        super({ element: document.body });
    }
}

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
 + Файл: AppDocumentHead.ts                                               +
 + Файл изменен: 30.01.2019 01:54:59                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Документ: Заголовок
 * @class appDocumentHead
 * @augments {View}
 */
class appDocumentHead extends View {
    /**
     * Конструктор
     */
    constructor() {
        super({ element: document.head });
        /**
         * Мета значения
         * @ignore
         * @protected
         */
        this.__metaValues = [];
        this.__titleElement = document.getElementsByTagName("title")[0];
        this.getDocument().append(this.__titleElement);
        this.getDocument().append(AppStylesheet.global.getDocument());
    }
    /**
     * Возвращает и устанавливает заголовок
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    title(value) {
        if (value === undefined)
            return this.__titleElement.innerText;
        this.__titleElement.innerText = value;
        document.title = value;
        return this;
    }
    /**
     * Возвращает мета значения
     * @return {*}
     */
    getMetaValues() {
        return this.__metaValues;
    }
    /**
     * Добавляет мета значение
     * @param {{ name: string, content: string }} props
     * @return {appDocumentHead}
     */
    addMetaValue(props) {
        const metaElement = document.createElement("meta");
        metaElement.content = props.content;
        metaElement.name = props.name;
        this.getDocument().append(metaElement);
        return this;
    }
    /**
     * Добавляет viewport
     * @param {{fit?: string, initialScale?: number, maximumScale?: number,
     * userScalable?: string, width?: string}} props
     * @return {appDocumentHead}
     */
    addViewPort(props) {
        const a = [];
        if (props.fit)
            a.push(`viewport-fit=${props.fit}`);
        if (props.width)
            a.push(`width=${props.width}`);
        if (props.initialScale)
            a.push(`initial-scale=${props.initialScale}`);
        if (props.maximumScale)
            a.push(`maximum-scale=${props.maximumScale}`);
        if (props.userScalable)
            a.push(`user-scalable=${props.userScalable}`);
        return this.addMetaValue({ name: "viewport", content: a.join(", ") });
    }
    /**
     * Устанавливает кодировку
     * @param {string} charset
     * @return {appDocumentHead}
     */
    setCharset(charset) {
        const metaElement = document.createElement("meta");
        metaElement.setAttribute("charset", charset);
        this.getDocument().append(metaElement);
        return this;
    }
    /**
     * Добавляет ссылку
     * @param {{ rel: string, href: string}|*} props
     * @return {appDocumentHead}
     */
    addLink(props) {
        const lnk = document.createElement("link");
        for (const key in props)
            if (props.hasOwnProperty(key))
                lnk.setAttribute(key, props[key]);
        this.getDocument().append(lnk);
        return this;
    }
}

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
 + Файл: AppDocuments                                                     +
 + Файл изменен: 30.01.2019 01:54:33                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Документ приложения
 * @class AppDocument
 */
class AppDocument {
    constructor() {
        /**
         * Заголовок
         */
        this.__head = new appDocumentHead();
        /**
         * Тело документа
         */
        this.__body = new AppDocumentBody();
    }
    /**
     * Возвращает тело документа
     * @return {AppDocumentBody}
     */
    getBody() {
        return this.__body;
    }
    /**
     * Возвращает заголовок документа
     * @return {appDocumentHead}
     */
    getHead() {
        return this.__head;
    }
}

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
 + Файл: ViewController                                                 +
 + Файл изменен: 30.11.2018 00:25:05                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Контроллер элемента отображения
 * @class ViewController
 * @augments Observable
 */
class ViewController extends Observable {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Элемент отображения
         * @type {Control}
         */
        this.view = Control.empty();
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
ViewController.__thisControllers = [];

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
/**
 * Элемент, который может быть перестроен
 * @class elyRebuildableViewProtocol
 * @augments {View}
 */
class elyRebuildableViewProtocol extends View {
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
        this.notificate("rebuilt");
        return this;
    }
    /**
     * Добавляет наблюдатель: элемент был перестроен
     *
     * Имя обсервера: rebuilt
     *
     * @param o - наблюдатель
     */
    addRebuiltObserver(o) {
        this.addObserver("rebuilt", o);
        return this;
    }
}

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
/**
 * Массив
 * @template T
 * @class ObservableArray
 * @augments ObservableProperty.<T[]>
 */
class ObservableArray extends ObservableProperty {
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
    get() {
        return this.value || [];
    }
    /**
     * Регистрирует слушатель добавления нового элемента в массив
     * @param {function(newItem: {T}, index: number)} observer - слушатель
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
        this.notificate("change", [this.get()]);
        this.notificate("add", [item, this.value.length - 1]);
        return this;
    }
    /**
     * Добавляет элемент в массив по индексу
     * @param {number} index
     * @param {...T} items
     */
    insert(index, ...items) {
        this.value.splice(index, 0, ...items);
        this.notificate("change", [this.get()]);
        this.notificate("add", [index, ...items]);
        return this;
    }
    /**
     * Добавляет элемент в массив
     * @param {number} index
     * @return {this}
     */
    remove(index) {
        const item = this.item(index);
        this.value = this.value.splice(index, 1);
        this.notificate("change", [this.get()]);
        this.notificate("remove", [item]);
        return this;
    }
    /**
     * Удаляет элемент из массива
     * @param {T} item - элемент массива
     * @return {this}
     */
    removeItem(item) {
        const index = this.indexOf(item);
        this.remove(index);
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
     * @return {T}
     */
    last() {
        return this.value[this.value.length - 1];
    }
    /**
     * Возвращает последний элемент и удаляет его из массива
     * @return {T}
     */
    pop() {
        const val = this.items().pop();
        return val === undefined ? null : val;
    }
    /**
     * Возвращает длину массива
     * @return {number}
     */
    length() {
        return this.value.length;
    }
    /**
     * Возвращает true, если существует индекс
     * @param {number} index
     */
    hasIndex(index) {
        return !!this.value[index];
    }
    /**
     * Возвращает индекс элемента в массиве или -1, если
     * элемент не найден
     * @param {T} item
     */
    indexOf(item) {
        return this.value.indexOf(item);
    }
    /**
     * Возвращает true, если массив содержит item
     * @param {T} item
     */
    hasItem(item) {
        return this.indexOf(item) > -1;
    }
    /**
     * Очищает массив
     * @return {this}
     */
    clear() {
        this.value = [];
        this.notificate("change", [this.get()]);
        this.notificate("clear", []);
        return this;
    }
    /**
     * Возвращает true, если массив пустой
     * @return {boolean}
     */
    isEmpty() {
        return this.length() === 0;
    }
    /**
     * Элементы
     * @return {T[]}
     */
    items() {
        return this.value;
    }
    /**
     * Цикл по элементам массива
     * @param {function(item: T, index: number, items: T[])} callbackfn - обработчик
     */
    forEach(callbackfn) {
        this.items().forEach((value, index, array) => callbackfn(value, index, array));
        return this;
    }
}

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
 + Файл: RowLayoutViews                                                   +
 + Файл изменен: 09.02.2019 16:35:37                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображение строка {@link GridLayoutView}
 * @class efGridLayoutRowView
 * @augments {View}
 */
class RowLayoutView extends elyRebuildableViewProtocol {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Элементы отображения
         * @ignore
         * @protected
         */
        this.__views = new ObservableArray();
        /**
         * Свойство: количество элементов в динамической строке
         * @ignore
         * @protected
         */
        this.__rowLengthProperty = new ObservableProperty(24);
        /**
         * Свойство: использование статичного размера элементов в строке
         * @ignore
         * @protected
         */
        this.__rowItemsStaticSizeProperty = new ObservableProperty(false);
        /**
         * Контейнеры
         * @protected
         * @ignore
         */
        this.__containers = [];
        this.addClass("ef-row");
        this.__views.change(() => this.rebuild());
        this.__rowLengthProperty.change(() => this.rebuild());
        this.__rowItemsStaticSizeProperty.change(() => this.rebuild());
        this.denyRebuild(true);
        this.rowLength(24);
        this.rowItemsStaticSize(false);
        variable(options.rowLength, () => this.rowLength(options.rowLength));
        variable(options.rowItemsStaticSize, () => this.rowItemsStaticSize(options.rowItemsStaticSize));
        variable(options.items, () => this.add(...options.items));
        this.denyRebuild(false);
        this.rebuild();
    }
    /**
     * Возвращает и устанавливает количество элементов в динамической строке
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    rowLength(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowLengthProperty);
    }
    /**
     * Возвращает и устанавливает использование статичного размера элементов в строке
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    rowItemsStaticSize(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowItemsStaticSizeProperty);
    }
    /**
     * Возвращает массив элементов отображения
     * @return {ObservableArray<View>}
     */
    getViews() {
        return this.__views;
    }
    /**
     * Добавляет элемент[ы] в строку
     * @param {...View} view
     */
    add(...view) {
        view.forEach(value => this.getViews().push(value));
        return this;
    }
    /**
     * Вставляет элементы в нужную позицию
     * @param index
     * @param view
     */
    insert(index, ...view) {
        this.getViews().insert(index, ...view);
        return this;
    }
    /**
     * Возвращает индекс элемента в строке
     * @param {View} view
     * @return {number}
     */
    indexOf(view) {
        return this.getViews().indexOf(view);
    }
    /**
     * Возвращает true, если в строке существует элемент
     * @param {View} view
     * @return {boolean}
     */
    contains(view) {
        return this.indexOf(view) > -1;
    }
    /**
     * Удаляет элемент
     * @param {View} view
     * @return {this}
     */
    remove(view) {
        return this.removeIndex(this.indexOf(view));
    }
    /**
     * Удаляет элемент по индексу
     * @param {number} index - индекс элемента в строке
     * @return {this}
     */
    removeIndex(index) {
        this.getViews().remove(index);
        return this;
    }
    /**
     * Добавляет наблюдатель: элемент будет добавлен, помещенный в контейнер.
     *
     * Аргументы:
     * - Первый аргумент - элемент;
     * - Второй аргумент - контейнер в который уже добавлен элемент.
     *
     * Имя обсервера: itemWillAdd
     *
     * @param o - наблюдатель
     */
    addItemWillAddObserver(o) {
        this.addObserver("itemWillAdd", o);
        return this;
    }
    /**
     * Возвращает элемент на сетке
     *
     * @param {number} index
     * @return {View}
     */
    viewAt(index) {
        if (this.getViews().hasIndex(index))
            return this.getViews().item(index);
        return null;
    }
    /**
     * Возвращает колонку по индексу. Колонка - контейнер содержит элемент. Элемент
     * можно получить испльзуя метод `{@link RowLayoutView.viewAt}`
     *
     * @param {number} index
     * @return {View}
     */
    columnAt(index) {
        if (this.getViews().hasIndex(index))
            return this.__containers[index];
        return null;
    }
    /**
     * Выполняет перестроение
     * @ignore
     * @private
     */
    __rebuild() {
        this.removeViewContent();
        this.__containers = [];
        this.getViews().forEach(item => {
            const container = new Control({ class: "ef-col" });
            let containerSize = (1 / this.rowLength()) * 100;
            if (!this.rowItemsStaticSize())
                containerSize = 100 / (this.rowLength() / (this.rowLength() / this.getViews().length()));
            container.getStyle().width = containerSize + "%";
            container.addSubView(item);
            this.__containers.push(container);
            this.notificate("itemWillAdd", [item, container]);
            this.getDocument().append(container.getDocument());
        });
        return this;
    }
}
/**
 * @typedef {Object} RowLayoutViewOptions
 * @property {number} [rowLength = 24]
 * @property {boolean} [rowItemsStaticSize = false]
 * @property {View[]} [items]
 */

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
 + Файл: gridLayoutViews                                                  +
 + Файл изменен: 09.02.2019 16:34:32                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения динамической сетки
 * @class GridLayoutView
 * @augments {View}
 */
class GridLayoutView extends elyRebuildableViewProtocol {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Свойство: количество элементов в строках
         * @ignore
         * @protected
         */
        this.__rowsLengthProperty = new ObservableProperty(24);
        /**
         * Строки
         * @ignore
         * @protected
         */
        this.__rows = new ObservableArray();
        /**
         * Свойство: использование статистических размеров элементов
         * @ignore
         * @protected
         */
        this.__staticGridProperty = new ObservableProperty(false);
        this.__rowsLengthProperty.change((val) => this.getRows().forEach(item => item.rowLength(val)));
        this.__staticGridProperty.change(value => this.getRows().forEach(item => item.rowItemsStaticSize(value)));
        this.__rows.change(() => this.rebuild());
        this.denyRebuild(true);
        variable(options.items, (value) => {
            if (value[0] && value[0] instanceof RowLayoutView)
                for (const row of value)
                    this.getRows().push(row);
            else
                for (const items of value)
                    this.add(...items);
        });
        this.rowsLength(24);
        this.staticGrid(false);
        variableAndSet(options.rowsLength, this.rowsLength, this);
        variableAndSet(options.staticGrid, this.staticGrid, this);
        this.denyRebuild(false);
        this.rebuild();
    }
    /**
     * Возвращает и устанавливает использование статистических размеров элементов
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     *
     * Внимание! После установки данного значения, значения во всех строках будут изменены!
     */
    staticGrid(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__staticGridProperty);
    }
    /**
     * Возвращает и устанавливает количество элементов в строках
     * @param {number} [value] - значение
     * @returns {number|this|null}
     *
     * Внимание! После установки данного значения, значения во всех строках будут изменены!
     */
    rowsLength(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowsLengthProperty);
    }
    /**
     * Возвращает строки сетки
     * @return {ObservableArray<RowLayoutView>}
     */
    getRows() {
        return this.__rows;
    }
    /**
     * Возвращает строку по индексу
     * @param {number} index
     * @return {RowLayoutView}
     */
    rowAt(index) {
        if (this.getRows().hasIndex(index))
            return this.getRows().item(index);
        return null;
    }
    /**
     * Добавляет элемент[ы] на сетку
     * @param view
     */
    add(...view) {
        const row = new RowLayoutView({ rowLength: this.rowsLength() });
        this.getRows().push(row);
        row.add(...view);
        this.rebuild();
        return this;
    }
    /**
     * Возвращает индекс строки элемента
     * @param {View} view
     */
    rowIndex(view) {
        let i = 0;
        for (const row of this.getRows().get()) {
            if (row.contains(view))
                return i;
            i++;
        }
        return -1;
    }
    /**
     * Воззвращает координаты элемента на сетке
     * @param {View} view
     * @return {{ rowIndex: number, colIndex: number }}
     */
    colRowIndex(view) {
        const rowIndex = this.rowIndex(view);
        if (rowIndex === -1)
            return { rowIndex: -1, colIndex: -1 };
        const row = this.rowAt(rowIndex);
        const colIndex = row ? row.indexOf(view) : -1;
        if (colIndex > -1)
            return { rowIndex, colIndex };
        return { rowIndex: -1, colIndex: -1 };
    }
    /**
     * Перестроение
     * @ignore
     * @private
     */
    __rebuild() {
        this.removeViewContent();
        this.getRows().forEach(item => {
            this.getDocument().append(item.getDocument());
        });
        return this;
    }
}
/**
 * @typedef {Object} GridLayoutViewOptions
 * @property {number} [rowsLength = 24]
 * @property {boolean} [staticGrid = false]
 * @property {View[][] | RowLayoutView[]} [items]
 */

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
 + Файл: GridViewController.ts                                                +
 + Файл изменен: 09.02.2019 18:42:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Контроллер с сеткой в основании
 * @class GridViewController
 * @augments {ViewController}
 */
class GridViewController extends ViewController {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Элемент отображения
         * @type {GridLayoutView|View}
         */
        this.view = new GridLayoutView();
    }
}

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
 + Файл: Size.ts                                                              +
 + Файл изменен: 08.02.2019 01:19:15                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Размеры ely.flat.application
 * @class Size
 * @augments {elyEnum<string>}
 */
class Size extends elyEnum {
    /**
     * Конструктор
     * @ignore
     * @param {string} val
     * @param {boolean} custom
     */
    constructor(val, custom = false) {
        super(val);
        this.custom = custom;
    }
    /**
     * Свой размер
     * @param {string|number} value
     * @type {Size}
     */
    static custom(value) {
        if (typeof value === "number")
            value = value.toString() + "px";
        return new Size(value, true);
    }
    /**
     * Возвращает размер по его названию
     * @param {string} name
     * @return {Size}
     */
    static byName(name) {
        return new Size(name);
    }
    /**
     * Список
     * @return {*}
     */
    static rawList() {
        return {
            default: Size.default.value,
            fill: Size.fill.value,
            large: Size.large.value,
            normal: Size.normal.value,
            small: Size.small.value,
            xlarge: Size.xlarge.value,
            xsmall: Size.xsmall.value,
            xxlarge: Size.xxlarge.value,
        };
    }
}
/**
 * Стандартный размер
 * @type {Size}
 */
Size.default = new Size("normal");
/**
 * Основной размер, используемый в ely.flat
 * @type {Size}
 */
Size.normal = new Size("regular");
/**
 * Размер во весь блок
 * @type {Size}
 */
Size.fill = new Size("fill");
/**
 * Маленький размер
 * @type {Size}
 */
Size.small = new Size("small");
/**
 * Очень маленький размер
 * @type {Size}
 */
Size.xsmall = new Size("xsmall");
/**
 * Большой размер
 * @type {Size}
 */
Size.large = new Size("large");
/**
 * Очень большой размер
 * @type {Size}
 */
Size.xlarge = new Size("xlarge");
/**
 * Огромный размер
 * @type {Size}
 */
Size.xxlarge = new Size("xxlarge");

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
 + Файл: Weight.ts                                                            +
 + Файл изменен: 08.02.2019 02:06:22                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Толщина ely.flat.application
 * @class Weight
 * @augments {elyEnum<number>}
 */
class Weight extends elyEnum {
    /**
     * Конструктор
     * @ignore
     * @param val
     * @param custom
     */
    constructor(val, custom = false) {
        super(String(val));
        this.custom = custom;
    }
    /**
     * Свой размер
     * @param value
     * @return {Weight}
     */
    static custom(value) {
        return new Weight(value, true);
    }
    /**
     * Возвращает размер по названию
     * @param {String} value
     * @return {Weight}
     */
    static byName(value) {
        return new Weight(value);
    }
    /**
     * Список
     */
    static rawList() {
        return {
            default: Weight.default.value,
            fat: Weight.fat.value,
            light: Weight.light.value,
            normal: Weight.normal.value,
            thin: Weight.thin.value,
        };
    }
}
/**
 * Стандартная толщина ely.flat.application
 * @type {Weight}
 */
Weight.default = new Weight("regular");
/**
 * Толщина, используемая общими стандартами
 * @type {Weight}
 */
Weight.normal = new Weight("standard");
/**
 * Высокая толщина
 * @type {Weight}
 */
Weight.fat = new Weight("fat");
/**
 * Толщина меньше стандартной
 * @type {Weight}
 */
Weight.light = new Weight("light");
/**
 * Предельно низкая толщина
 * @type {Weight}
 */
Weight.thin = new Weight("thin");

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
 + Файл: SimplePageViewController                                       +
 + Файл изменен: 30.11.2018 01:52:55                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Контроллер с шаблоном макета приложения
 * @class SimplePageViewController
 * @augments {GridViewController}
 */
class SimplePageViewController extends GridViewController {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Основной заголовок
         * @type {elyTextView}
         */
        this.titleView = new TextView({ class: "--title" });
        /**
         * Описание страницы
         * @type {elyTextView}
         */
        this.descriptionView = new TextView({ class: "--description" });
        this.view.addClass("ef-simple-content");
        const headerView = new Control({ class: "--content-header" });
        this.titleView.textSize(Size.xlarge).textCenter(true);
        this.descriptionView.textCenter(true).textWeight(Weight.thin);
        headerView.addSubView(this.titleView);
        headerView.addSubView(this.descriptionView);
        this.view.add(headerView);
    }
    /**
     * Устанавливает или возвращает заголовок
     * @param {string} [value]
     * @return {this|string}
     */
    title(value) {
        if (value === undefined)
            return this.titleView.text();
        this.titleView.text(value);
        return this;
    }
    /**
     * Устанавливает или возвращает описание контента
     * @param {string} [value]
     * @return {this|string}
     */
    description(value) {
        if (value === undefined)
            return this.descriptionView.text();
        this.descriptionView.text(value);
        return this;
    }
}

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
 + Файл: SingleApps                                                       +
 + Файл изменен: 19.02.2019 22:26:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Простое приложение ely.flat
 * @class SingleApp
 */
class SingleApp extends Observable {
    /**
     * Приложение, испольщзующее single
     */
    static isUsesSingle() {
        return window.hasOwnProperty("efSingleInit") && window.efSingleInit;
    }
    static initApplication(callback) {
        const vc = new SimplePageViewController();
        vc.title("efSingle App");
        vc.description("Простейшее приложение ely.flat");
        callback(vc);
    }
}

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
 + Файл: ScreenController                                               +
 + Файл изменен: 30.11.2018 00:19:28                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
class __elyScreenIndexViewController extends SimplePageViewController {
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
 * @class ScreenController
 * @augments Observable
 */
class ScreenController extends Observable {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Контроллер
         */
        this.controller = new ObservableProperty();
        /**
         * Элемент отображения
         */
        this.view = new Control({ class: "ef-screen" });
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
                if (ViewController.__thisControllers.indexOf(controller.constructor.name) === -1) {
                    ViewController.__thisControllers.push(controller.constructor.name);
                    controller.viewDidLoad();
                }
                controller.viewWillAppear(this);
                this.view.removeViewContent();
                this.view.addSubView(controller.view);
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
ScreenController.default = new ScreenController();

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
 + Файл: ListView.ts                                                          +
 + Файл изменен: 07.02.2019 23:53:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Списко элементов
 * @class ListView
 * @augments {elyRebuildableViewProtocol}
 */
class ListView extends elyRebuildableViewProtocol {
    /**
     * Конструктор
     * @param {ListViewOptions} options
     */
    constructor(options = {}) {
        super(Object.assign({ tag: "ul" }, options));
        this.__items = new ObservableArray();
        this.__items.change(() => this.__rebuild());
        (options.items || []).forEach(value => this.addView(value));
    }
    /**
     * Возвращает элементы списка
     */
    getItems() {
        return this.__items;
    }
    /**
     * Добавляет элемент отображения
     * @param view
     */
    addView(view) {
        this.__items.push(view);
        return this;
    }
    /**
     * Добавляет наблюдатель: элемент будет добавлен.
     *
     * Наблюдатель принимает два параметра: view и container.
     *
     * Элементы в ListView хранятся в контейнерах. Поэтому
     * при добавлении слушатель получает два View элемента.
     * Благодаря этому слушателю, Вы можете кастомизировать контейнер.
     *
     * Имя обсервера: itemWillAdd
     *
     * @param o - наблюдатель
     */
    addItemWillAddObserver(o) {
        this.addObserver("itemWillAdd", o);
        return this;
    }
    /**
     * Выполняет перестроение элемента
     *
     * Метод для переопределения реализации престроения
     * @private
     * @ignore
     */
    __rebuild() {
        this.removeViewContent();
        this.getItems().forEach(item => {
            const view = new Control({ tag: "li", class: "--item" });
            view.addSubView(item);
            this.notificate("itemWillAdd", [item, view]);
            this.getDocument().append(view.getDocument());
        });
        return this;
    }
}
/**
 * @typedef {Object} ListViewOptions
 * @property {View[]} [items]
 */

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
 + Файл: NavigationView.ts                                                    +
 + Файл изменен: 07.02.2019 23:43:35                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения - панель навигации
 * @class NavigationView
 * @augments {elyRebuildableViewProtocol}
 */
class NavigationView extends ListView {
    /**
     * Конструктор
     * @param {NavigationViewOptions} options
     */
    constructor(options = { horizontal: true, fixed: false }) {
        super(options);
        /**
         * Элемент отображения заголовка
         * @protected
         * @ignore
         */
        this.__titleTextView = new TextView({ tag: "li" });
        /**
         * Элемент отображения иконки-переключателя
         * @protected
         * @ignore
         */
        this.__toggleIconView = new IconView({ tag: "li", iconName: "navicon" });
        this.__denyRebuild = false;
        this.addClass("ef-navigation");
        this.fixed(options.fixed || false);
        this.horizontal(options.horizontal);
        this.getTitleView().addClass("--item", "logo");
        this.getToggleIconView().addClass("--toggle");
        this.getToggleIconView().addObserver("click", () => {
            if (this.hasClass("--open"))
                this.removeClass("--open");
            else
                this.addClass("--open");
        });
        this.rebuild();
    }
    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    getTitleView() {
        return this.__titleTextView;
    }
    /**
     * Возвращает иконку-переключатель
     */
    getToggleIconView() {
        return this.__toggleIconView;
    }
    /**
     * Возвращает и устанавливает
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    fixed(value) {
        if (value === undefined)
            return this.hasClass("--fixed");
        if (value)
            this.addClass("--fixed");
        else
            this.removeClass("--fixed");
        return this;
    }
    /**
     * Возвращает и устанавливает горизонтальное расположение
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    horizontal(value) {
        if (value === undefined)
            return this.hasClass("--horizontal");
        if (value)
            this.addClass("--horizontal");
        else
            this.removeClass("--horizontal");
        return this;
    }
    /**
     * Выполняет перестроение элемента
     *
     * Метод для переопределения реализации престроения
     * @private
     * @ignore
     */
    __rebuild() {
        this.removeViewContent();
        this.getDocument().append(this.getToggleIconView().getDocument());
        this.getDocument().append(this.getTitleView().getDocument());
        this.getItems().forEach(item => {
            const view = new Control({ tag: "li", class: "--item" });
            view.addSubView(item);
            this.notificate("itemWillAdd", [item, view]);
            this.getDocument().append(view.getDocument());
        });
        return this;
    }
}
/**
 * @typedef {Object} NavigationViewOptions
 * @property {boolean} [horizontal = true]
 * @property {boolean} [fixed = false]
 */

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
 + Файл: efSize.ts                                                            +
 + Файл изменен: 28.12.2018 01:18:31                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Прослушиываемый размер
 */
class efSize extends Observable {
    /**
     * Конструктор
     * @param {{width: number, height: number}} props
     */
    constructor(props = { width: 0, height: 0 }) {
        super();
        /**
         * Свойство: ширина
         */
        this.widthProperty = new ObservableProperty(0);
        /**
         * Свойство: высота
         */
        this.heightProperty = new ObservableProperty(0);
        if (props.d !== undefined) {
            this.width(props.d || 0);
            this.height(props.d || 0);
        }
        else {
            this.width(props.width || 0);
            this.height(props.height || 0);
        }
        this.widthProperty.change(value => this.notificate("changed", ["width", value, this.height()]));
        this.heightProperty.change(value => this.notificate("changed", ["height", this.width(), value]));
    }
    /**
     * Возвращает нулевой размер
     * @return {efSize}
     */
    static zero() {
        return new efSize({ width: 0, height: 0 });
    }
    /**
     * Возвращает и устанавливает ширина
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    width(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.widthProperty);
    }
    /**
     * Возвращает и устанавливает высота
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    height(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.heightProperty);
    }
    /**
     * Изменяет размер
     *
     * @param {number} sW   - ширина или общее значение
     * @param {number} [sH] - высота
     * @return {this}
     */
    scale(sW, sH) {
        if (sH === undefined) {
            this.width(this.width() * sW);
            this.height(this.height() * sW);
        }
        else {
            this.width(this.width() * sW);
            this.height(this.height() * (sH || 0));
        }
        return this;
    }
    /**
     * Добавляет наблюдатель: изменение размера
     *
     * Имя обсервера: changed
     *
     * @param o - наблюдатель
     */
    addChangeObserver(o) {
        this.addObserver("changed", o);
        return this;
    }
    /**
     * Преобразует объект в строку
     * @return {string}
     */
    toString() {
        return `efSize{w: ${this.width()}, h: ${this.height()}}`;
    }
}

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
 + Файл: DeviceDetector.ts                                              +
 + Файл изменен: 31.01.2019 00:49:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Детектор устройств и системы
 */
class DeviceDetector extends Observable {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Данные
         * @ignore
         * @protected
         */
        this.__data = {
            browser: null,
            os: null,
        };
    }
    /**
     * Добавляет наблюдатель: распознавание закончено
     *
     * Имя обсервера: detected
     *
     * @param o - наблюдатель
     */
    addDetectedObserver(o) {
        this.addObserver("detected", o);
        return this;
    }
    /**
     * Выполняет детектинг
     */
    detect() {
        for (const os of DeviceDetector.__osNames)
            if (navigator.userAgent.indexOf(os.value) > -1) {
                this.__data.os = os.name;
                break;
            }
        for (const browser of DeviceDetector.__browsers)
            if (navigator.userAgent.indexOf(browser.value) > -1) {
                this.__data.browser = browser.name;
                break;
            }
        this.notificate("detected");
    }
    /**
     * Возвращает имя системы
     * @return {string}
     */
    getOSName() {
        return this.__data.os || "Undetected";
    }
    /**
     * Возвращает имя браузера
     * @return {string}
     */
    getBrowserName() {
        return this.__data.browser || "Undefined";
    }
    /**
     * Возвращает true, если приложение запущено отдельным приложением**
     * @return {boolean}
     */
    isStandalone() {
        // @ts-ignore
        return window.navigator.standalone || false;
    }
    /**
     * Возвращает true, если система iOS
     * @return {boolean}
     */
    isIOS() {
        return /iPad|iPhone|iPod/.test(this.__data.os);
    }
    /**
     * Возвращает соотнощение сторон
     * @return {number}
     */
    getRatio() {
        return window.devicePixelRatio || 1;
    }
    /**
     * Возвращает реальный размер жкрана
     * @return {efSize}
     */
    getScreenSize() {
        return new efSize({
            height: window.screen.height * this.getRatio(),
            width: window.screen.width * this.getRatio(),
        });
    }
    /**
     * Возвращает true, если устройство - iPhone X
     * @return {boolean}
     */
    isIPhoneX() {
        const size = this.getScreenSize();
        return this.isIOS() && size.width() === 1125 && size.height() === 2436;
    }
}
/**
 * Стандартный детектор
 */
DeviceDetector.default = new DeviceDetector();
/**
 * Имена операционных систем
 * @protected
 * @ignore
 */
DeviceDetector.__osNames = [
    { name: "Windows Phone", value: "Windows Phone", version: "OS" },
    { name: "Windows", value: "Win", version: "NT" },
    { name: "iPhone", value: "iPhone", version: "OS" },
    { name: "iPad", value: "iPad", version: "OS" },
    { name: "iPod", value: "iPod", version: "OS" },
    { name: "Kindle", value: "Silk", version: "Silk" },
    { name: "Android", value: "Android", version: "Android" },
    { name: "PlayBook", value: "PlayBook", version: "OS" },
    { name: "BlackBerry", value: "BlackBerry", version: "/" },
    { name: "MacOS", value: "Mac", version: "OS X" },
    { name: "Linux", value: "Linux", version: "rv" },
    { name: "Palm", value: "Palm", version: "PalmOS" },
];
/**
 * Браузеры
 * @protected
 * @ignore
 */
DeviceDetector.__browsers = [
    { name: "Chrome", value: "Chrome", version: "Chrome" },
    { name: "Firefox", value: "Firefox", version: "Firefox" },
    { name: "Safari", value: "Safari", version: "Version" },
    { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
    { name: "Opera", value: "Opera", version: "Opera" },
    { name: "BlackBerry", value: "CLDC", version: "CLDC" },
    { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
];
/**
 * Заголовки
 * @protected
 * @ignore
 */
DeviceDetector.__headers = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
];

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
 + Файл: Applications                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Приложение
 */
class Application extends Observable {
    /**
     * Конструктор
     */
    constructor() {
        super();
        /**
         * Панель навигации
         * @protected
         * @ignore
         */
        this.__applicationNavigationView = new NavigationView({ horizontal: true, fixed: true });
        /**
         * Документ
         * @protected
         * @ignore
         */
        this.__applicationDocument = new AppDocument();
        this.__applicationLoaderView = new AppPreloaderView();
        this.applicationColorManager = new AppColorManager({ app: this });
        this.readySignalsShouldBeReceived = 0;
        this.containerView = new Control({ class: "ef--container" });
        this.wrapperView = new Control({ class: "ef--wrapper" });
        this.footerView = new elyFooterView();
        this.getApplicationDocument().getBody().addSubView(this.wrapperView);
        this.containerView.css({ margin: "0 auto" });
        this.containerView.css({ width: "100%" });
        this.wrapperView.addSubView(this.containerView);
        this.containerView.addSubView(ScreenController.default.view);
    }
    /**
     * Возвращает стандартный объект приложения
     * @param closure
     */
    static loadApplication(closure) {
        XLogger.default.log("Загрузка приложения...");
        AppConfig.default.addLoadedObserver((result, cfg) => {
            console.log(cfg);
            if (!result)
                XLogger.default.error("Файл конфигурации не найден. " +
                    "Будет использована стандратная конфигурация.");
            else
                XLogger.default.log("Файл конфигурации успешно загружен.");
            // Распознание текущего устройства
            DeviceDetector.default.addDetectedObserver(() => Application.default.init(cfg));
            DeviceDetector.default.detect();
        });
        if (SingleApp.isUsesSingle()) {
            XLogger.default.log("Загрузка single версии приложения...");
            SingleApp.initApplication(vc => {
                SingleApp.applicationInitFunction(cfg => {
                    Application.default.addReadyObserver(next => {
                        ScreenController.default.addControllerName("index", vc);
                        next(true);
                    });
                    AppConfig.default.load({ data: cfg });
                })(vc);
            });
        }
        else {
            AppConfig.default.load({ file: AppConfig.appConfigPath });
        }
    }
    /**
     * Возвращает конфигурацию приложения
     */
    getApplicationConfig() {
        return this.__applicationConfig;
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
     * Возвращает элемент отображения экрана загрузки приложения
     * @return {PreloaderView}
     */
    getApplicationLoaderView() {
        return this.__applicationLoaderView;
    }
    /**
     * Возвращает документ приложения
     * @return {AppDocument}
     */
    getApplicationDocument() {
        return this.__applicationDocument;
    }
    /**
     * Возвращает панель навигации
     * @return {NavigationView}
     */
    getApplicationNavigationView() {
        return this.__applicationNavigationView;
    }
    /**
     * Инициилизирует приложение
     * @param {AppConfig} config
     */
    init(config) {
        this.__applicationConfig = config;
        this.applyConfiguration(config);
        this.notificate("ready", [(flag, message) => {
                XLogger.default.log(`---> Запуск загрузчика ${this.readySignalsShouldBeReceived}`);
                XLogger.default.log(`[~~] Загрузчик передал флаг ${flag ? "true" : "false"} (${message})`);
                if (!flag) {
                    this.getApplicationLoaderView().getIconView()
                        .iconName("times")
                        .spinning(false);
                    this.getApplicationLoaderView().title(message || "Загрузка была остановлена...");
                    throw Error("Остановка приложения...");
                    return;
                }
                this.readySignalsShouldBeReceived--;
                XLogger.default.log("[OK] Загрузчик обработан. Осталось: " + this.readySignalsShouldBeReceived);
                if (this.readySignalsShouldBeReceived === 0) {
                    if (this.getApplicationConfig().manifest.useContentController) {
                        __applyElyOneActions(this);
                    }
                    ScreenController.default.present("index");
                    this.getApplicationLoaderView().hidden(true);
                }
            }]);
    }
    /**
     * Применяет конфигурацию
     * @param config
     */
    applyConfiguration(config) {
        XLogger.default.log("~~~> Применение конфигурации");
        //
        // App
        //
        this.getApplicationDocument().getHead().title(config.getAppTitle());
        //
        // Manifest
        //
        //
        //  Template
        //
        this.containerView.getStyle().maxWidth = typeof config.template.maxContainerWidth === "number" ?
            config.template.maxContainerWidth + "px" : config.template.maxContainerWidth;
        this.applicationColorManager.applyApplicationColor(config.getAppColor());
        this.footerView.titleView.text(config.template.footer.title);
        this.footerView.subtitleView.text(config.template.footer.subtitle);
        //
        //  Navigation config
        //
        if (config.isNavigationBarUsed()) {
            this.wrapperView.addClass("--with-fixed-nav");
            this.__applicationDocument.getBody().addSubView(this.getApplicationNavigationView());
            this.getApplicationNavigationView().getTitleView().text(config.navigationBar.title);
            if (config.manifest.useContentController)
                this.getApplicationNavigationView().getTitleView().addObserver("click", () => {
                    ScreenController.default.present(config.contentController.defaultContentId);
                });
            config.navigationBar.items.forEach(value => {
                value.item = value.item || "LinkTextView";
                this.getApplicationNavigationView().addView(Control.fromObject(value));
            });
            // if (config.navigationBar.imageUrl) {
            //     this.navigationView.navigationBarImage(config.navigationBar.imageUrl);
            //     if (config.manifest.useContentController)
            //         this.navigationView.imageView.addObserver("click", () => {
            //             ScreenController.default.present(config.contentController.defaultContentId);
            //         });
            // }
            this.applicationColorManager.applyNavigationBarColor(config.getNavigationBarColor());
        }
        //
        // Meta
        //
        if (config.manifest.useMeta) {
            const head = this.getApplicationDocument().getHead();
            head.setCharset(config.meta.charset)
                .addMetaValue({
                content: config.app.title,
                name: "apple-mobile-web-app-title",
            })
                .addMetaValue({
                content: config.meta.appleMobile.statusBarStyle,
                name: "apple-mobile-web-app-status-bar-style",
            })
                .addMetaValue({
                content: config.manifest.allowStandaloneMode ? "yes" : "no",
                name: "apple-mobile-web-app-capable",
            }).addMetaValue({
                content: config.getNavigationBarColorString(),
                name: "theme-color",
            });
        }
        if (config.manifest.useViewPort)
            this.getApplicationDocument().getHead().addViewPort(config.meta.viewport);
        if (config.manifest.useApplicationIcon) {
            this.getApplicationDocument().getHead()
                .addLink({
                href: config.meta.iconPath + "/apple-touch-icon.png",
                rel: "apple-touch-icon",
                sizes: "180x180",
            }).addLink({
                href: config.meta.iconPath + "/favicon-32x32.png",
                rel: "icon",
                sizes: "32x32",
                type: "image/png",
            }).addLink({
                href: config.meta.iconPath + "/favicon-16x16.png",
                rel: "icon",
                sizes: "16x16",
                type: "image/png",
            }).addLink({
                href: config.meta.iconPath + "/favicon.ico",
                rel: "shortcut icon",
            }).addLink({
                color: config.getNavigationBarColorString(),
                href: config.meta.iconPath + "/safari-pinned-tab.svg",
                rel: "mask-icon",
            });
        }
        if (config.manifest.allowStandaloneMode && config.manifest.useIPhoneXStandaloneFix) {
            if (DeviceDetector.default.isIPhoneX() && DeviceDetector.default.isStandalone()) {
                AppStylesheet.global.addClass("ef-wrp", { paddingTop: "40px" });
                this.__applicationDocument.getBody().getStyle().minHeight =
                    DeviceDetector.default.getScreenSize().height() + "px";
                // todo Circular...
                // NotificationView.defaults.marginFromScreenEdge = 40;
                if (config.manifest.useNavigationBar)
                    Application.default.getApplicationNavigationView().css({ "padding-top": "40px" });
            }
        }
        if (config.manifest.useDevelopMode) {
            AppDevelopConsole.shared.hidden(true);
            this.__applicationDocument.getBody().getDocument().append(AppDevelopConsole.shared.getDocument());
            window.onkeyup = ev => {
                if (ev.key === "~")
                    AppDevelopConsole.shared.hidden(!AppDevelopConsole.shared.hidden());
            };
            new AppFileWatcher({ filePath: config.develop.appFile || "js/index.js" }).start().addUpdateListener(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            });
        }
    }
}
/**
 * Паттерн синглтон
 */
Application.default = new Application();
function __applyElyOneActions(app) {
    elyOneActionEval.default.actionsRules.content = (arg) => {
        switch (arg) {
            case "back":
                // cc.back();
                break;
            case "*index":
                ScreenController.default.present("index");
                break;
            default:
                ScreenController.default.present(arg);
        }
    };
}

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
 + Файл: Button.ts                                                        +
 + Файл изменен: 08.02.2019 02:22:02                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения кнопка
 * @class Button
 * @augments {Button}
 */
class Button extends View {
    /**
     * Конструктор
     * @param {ButtonOptions} options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Свойство: текст на кнопке
         * @ignore
         */
        this.textProperty = new ObservableProperty("");
        /**
         * Свойство: стиль кнопки
         * @ignore
         */
        this.buttonStyleProperty = new ObservableProperty(Style.primary);
        /**
         * Свойство: размер кнопки
         * @ignore
         */
        this.buttonSizeProperty = new ObservableProperty(Size.default);
        this.addClass("button");
        this.textProperty.change(value => {
            this.getDocument().innerHTML = TextView.filterString(value);
        });
        this.text(options.text || "");
        this.buttonSizeProperty.change((value, oldVal) => {
            this.getStyle().fontSize = null;
            if (oldVal && !oldVal.custom)
                this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });
        this.buttonStyleProperty.change((value, oldVal) => {
            if (oldVal)
                this.removeClass(`--${oldVal.value}`);
            this.addClass(`--${value.value}`);
        });
        variableAndSet(options.buttonSize, this.buttonSize, this);
        variableAndSet(options.buttonStyle, this.buttonStyle, this, Style.primary);
        variableAndSet(options.buttonRounded, this.buttonRounded, this);
        if (isSet(options.click))
            this.click(() => {
                options.click();
            });
        if (options.fill)
            this.fill();
    }
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {TextView}
     */
    static deserialize(raw) {
        return new Button(JSON.parse(raw));
    }
    /**
     * Возвращает и устанавливает размер кнопки
     * @param {Size} [value] - значение
     * @returns {Size|this|null}
     */
    buttonSize(value) {
        if (value !== undefined && typeof value === "string")
            value = Size.byName(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.buttonSizeProperty);
    }
    /**
     * Устанавливает размер кнопки во весь блок.
     * Алиас выражения `Button.buttonSize(Size.fill)`.
     * @return {this}
     */
    fill() {
        return this.buttonSize(Size.fill);
    }
    /**
     * Возвращает и устанавливает стиль кнопки
     * @param {Style|string} [value] - значение
     * @returns {Style|this|null}
     */
    buttonStyle(value) {
        if (value !== undefined && typeof value === "string")
            value = Style.byName(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.buttonStyleProperty);
    }
    /**
     * Возвращает и устанавливает текст на кнопке
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    text(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.textProperty);
    }
    /**
     * Устанавливает слушатель нажатия или нажимает на кнопку
     *
     * @param {Function} [callback = null]
     * @returns {Button}
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
     * Возвращает и устанавливает флаг закругления углов кнопки
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    buttonRounded(value) {
        if (value === undefined)
            return this.hasClass("--rounded");
        if (value)
            this.addClass("--rounded");
        else
            this.removeClass("--rounded");
        return this;
    }
    /**
     * Сериализует объект
     * @return {string}
     */
    serialize() {
        return JSON.stringify({
            buttonRounded: this.buttonRounded(),
            buttonSize: this.buttonSize().value,
            buttonStyle: this.buttonStyle().value,
            text: this.text(),
        });
    }
}
/**
 * @typedef {Object} ButtonOptions
 * @property {String} [text = ""]
 * @property {Size|String} [buttonSize]
 * @property {Style|String} [buttonStyle]
 * @property {boolean} [buttonRounded = false]
 * @property {boolean} [fill = false]
 * @property {function()} [click]
 */

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
 + Файл: TextViewContainer.ts                                             +
 + Файл изменен: 09.02.2019 16:15:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * элемент отображения контейнера с текстом
 * @class TextViewContainer
 * @augments View
 */
class TextViewContainer extends View {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Элемент отображения текста
         * @protected
         * @ignore
         */
        this.__textView = new TextView();
        this.getDocument().append(this.getTextView().getDocument());
    }
    /**
     * Возвращает элемент отображения текста
     * @return {TextView}
     */
    getTextView() {
        return this.__textView;
    }
}

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
 + Файл: PanelView.ts                                                         +
 + Файл изменен: 09.02.2019 16:11:48                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения панель
 */
class PanelView extends View {
    /**
     * Конструктор
     * @param {PanelViewOptions} options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Элемен отображения заголовка
         * @protected
         * @ignore
         */
        this.__headerView = new TextViewContainer({ class: "--header" });
        /**
         * Элемен отображения контента
         * @protected
         * @ignore
         */
        this.__contentView = new GridLayoutView({ class: "--content" });
        /**
         * Элемен отображения подвала
         * @protected
         * @ignore
         */
        this.__footerView = new TextViewContainer({ class: "--footer" });
        this.addClass("ef-panel");
        this.panelHover(true);
        variable(options.panelTitle, (v) => this.panelTitle(v));
        variable(options.panelHover, (v) => this.panelHover(v));
        variable(options.panelActionText, (v) => this.panelActionText(v));
        variable(options.panelActionClick, (v) => this.panelActionClick(v));
        variable(options.panelContent, (v) => this.getContentView().add(v));
        this.rebuild();
    }
    /**
     * Возвращает элемент отображения заголовка
     * @return {TextViewContainer}
     */
    getHeaderView() {
        return this.__headerView;
    }
    /**
     * Возвращает элемент отображения подвала
     * @return {TextViewContainer}
     */
    getFooterView() {
        return this.__footerView;
    }
    /**
     * Возвращает элемент отображения контента
     * @return {GridLayoutView}
     */
    getContentView() {
        return this.__contentView;
    }
    /**
     * Возвращает и устанавливает флаг изменения палени при наведении на неё
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    panelHover(value) {
        if (value === undefined)
            return this.hasClass("--hover");
        if (value)
            this.addClass("--hover");
        else
            this.removeClass("--hover");
        return this;
    }
    /**
     * Возвращает и устанавливает текст активации
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    panelActionText(value) {
        if (value === undefined)
            return this.getFooterView().getTextView().text();
        this.getFooterView().getTextView().text(value);
        this.rebuild();
        return this;
    }
    /**
     * Возвращает и устанавливает текст заголовка панели
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    panelTitle(value) {
        if (value === undefined)
            return this.getHeaderView().getTextView().text();
        this.getHeaderView().getTextView().text(value);
        this.rebuild();
        return this;
    }
    /**
     * Выполняет перестроение панели
     */
    rebuild() {
        this.removeViewContent();
        if (this.panelTitle() !== "")
            this.getDocument().append(this.getHeaderView().getDocument());
        this.getDocument().append(this.getContentView().getDocument());
        if (this.panelActionText() !== "")
            this.getDocument().append(this.getFooterView().getDocument());
        return this;
    }
    /**
     * Добавляет слушатель нажатия на функциональную клавишу
     * @param {function()} callbackfn
     */
    panelActionClick(callbackfn) {
        this.getFooterView().addObserver("click", callbackfn);
        return this;
    }
}
/**
 * @typedef {Object} PanelViewOptions - Опции панели
 * @property {string} [panelTitle]
 * @property {string} [panelActionText]
 * @property {boolean} [panelHover = true]
 * @property {View} [panelContent]
 * @property {function()} [panelActionClick]
 */

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
 + Файл: NotificationView.ts                                            +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Оповещения
 *
 * elyNotification (TypeScript)
 * version 0.1
 */
class NotificationView extends Control {
    /**
     * Конструктор
     * @param props
     */
    constructor(props = NotificationView.defaults) {
        super(props);
        this.notificationHeight = 0;
        /**
         * Флаг нотифицирования
         */
        this._isNotified = false;
        this._isClosable = true;
        this.options = NotificationView.defaults;
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
        this.closeButton = new Control({ tag: "b", class: "ely-notification-close-button" });
        this.closeButton.css({ color: this.options.titleColor });
        this.closeButton.getDocument().innerHTML = "&times;";
        //
        //  Title
        //
        this.titleView = new Control({ class: "ely-notification-title-label" });
        this.titleView.css({ width: absoluteWidth + "px", color: this.options.titleColor });
        this.titleView.getDocument().innerHTML = this.options.title || "";
        //
        //  Message
        //
        this.messageView = new Control({ class: "ely-notification-message-label" });
        this.messageView.css({ width: absoluteWidth + "px", color: this.options.messageColor });
        this.messageView.getDocument().innerHTML = this.options.message || "";
        this.contentView = new Control({ class: "ely-notification-content" });
        this.contentView.css({
            "border-top": "1px solid " + this.options.sepColor,
            "color": this.options.contentColor,
            "width": this.options.width + "px",
        });
        if (this.options.content)
            this.contentView.addSubView(new TextView({ text: this.options.content }));
        this.hide();
        this.closable(this.options.closable);
    }
    /**
     * Закрывает все уведомения, кроме последнего
     */
    static closeAllNotificationsToLast() {
        if (NotificationView.defaults.notificationsData.length > 0) {
            for (let i = 0; i < NotificationView.defaults.notificationsData.length - 1; i++)
                NotificationView.defaults.notificationsData[i].dismiss();
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
        Application.default.getApplicationDocument().getBody().addSubView(this);
        this.show();
        this.notificationHeight = this.offSize().height;
        this.hide();
        const notifications = NotificationView.defaults.notificationsData;
        const margin = NotificationView.defaults.notificationsMargin + this.notificationHeight;
        const displayPositions = this.getDisplayPositions();
        switch (displayPositions[0]) {
            case "bottom":
                this.css({ bottom: "+=" + (this.options.marginFromScreenEdge || 0) + "px" });
                break;
            default:
                this.css({ top: "+=" + (this.options.marginFromScreenEdge || 0) + "px" });
                break;
        }
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
        if (notifications.length > NotificationView.defaults.limit)
            NotificationView.closeAllNotificationsToLast();
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
            const noties = NotificationView.defaults.notificationsData;
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
                NotificationView.defaults.notificationsData = cache;
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
NotificationView.defaults = {
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
    marginFromScreenEdge: 0,
    messageColor: "#595959",
    moveTime: 500,
    notificationsData: [],
    notificationsMargin: 10,
    sepColor: "#EEEEEE",
    titleColor: "#595959",
    width: 400,
};

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
 + Файл: SendFileRequest.ts                                             +
 + Файл изменен: 27.02.2019 00:18:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Запрос отправки файла
 * @class SendFileRequest
 * @augments {URLRequest}
 */
class SendFileRequest extends URLRequest {
    /**
     * Выполняет отправку файлов
     *
     * @param {string} url - адрес
     * @param {*} files - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     * @return SendFileRequest
     */
    static send(url, files, callback) {
        new SendFileRequest({ url, files }).send(callback);
    }
    /**
     * Конструктор
     * @param {SendFileRequestOptions} options
     */
    constructor(options) {
        super(options);
        this.__files = options.files || [];
    }
    /**
     * Выполняет запрос
     *
     * @param {TURLCallback} callback
     */
    send(callback) {
        this.__method = URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);
        const theFormData = new FormData();
        this.getFiles().forEach(file => {
            theFormData.append("file", file);
        });
        this.getXMLHttpRequest().send(theFormData);
    }
    /**
     * Добавляет файлы
     * @param {...File} files - файлы
     * @return SendFileRequest
     */
    addFiles(...files) {
        this.__files.push(...files);
        return this;
    }
    /**
     * Возвращает файлы
     */
    getFiles() {
        return this.__files;
    }
}
/**
 * @typedef {Object} SendFileRequest
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {File[]} [files]
 */

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
 + Файл: SendJsonRequest.ts                                             +
 + Файл изменен: 26.02.2019 23:45:06                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * SendJsonRequest позволяет передавать JSON данные через POST запрос.
 *
 * JSON данные передаются в теле запроса. Отправка данных производится методом POST.
 *
 * Заголовки:
 * - Content-type: application/json; charset=utf-8
 *
 * @class SendJsonRequest
 * @augments {URLRequest}
 */
class SendJsonRequest extends URLRequest {
    /**
     * Выполняет отправку JSON данных
     *
     * @param {string} url - адрес
     * @param {*} object - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     */
    static send(url, object, callback) {
        new SendJsonRequest({ url, object }).send(callback);
    }
    /**
     * Конструктор
     * @param {SendJsonRequestOptions} options
     */
    constructor(options) {
        super(options);
        this.__object = options.object;
    }
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     */
    send(callback) {
        this.__method = URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);
        this.getXMLHttpRequest().send(JSON.stringify(this.getObject()));
    }
    /**
     * Устаналивает объект для передачи
     * @param {*} obj
     * @return {this}
     */
    setObject(obj) {
        this.__object = obj;
        return this;
    }
    /**
     * Возвращает объект для передачи
     * @return {*}
     */
    getObject() {
        return this.__object;
    }
}
/**
 * @typedef {Object} SendJsonRequestOptions
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {*} [object]
 */

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
 + Файл: elyUIExt.ts                                                          +
 + Файл изменен: 08.02.2019 02:41:23                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Возвращает текущий URL
 * @return {URL}
 */
URL.current = () => new URL(window.location.href);
/**
 * Возвращает абсолютную строку URL
 * @return {string}
 */
URL.prototype.getAbsoluteString = function () {
    return String(this);
};
/**
 * Возвращает URL очищенный от запроса
 * @return {string}
 */
URL.prototype.getClear = function () {
    return (new RegExp("(http[s]?:\\/\\/.+)\\?").exec(this.getAbsoluteString()) || [])[1] || "";
};
/**
 * Создает URL запрос из данного URL
 * @param {{ data?: *, method?: URLRequestMethod, async?: boolean }} props - опции
 *
 * @return {URLRequest}
 */
URL.prototype.createUrlRequest = function (props = {}) {
    props = props || {};
    const data = props.data;
    const method = props.method;
    const async = props.async;
    return new URLRequest({ url: this.getAbsoluteString(), data, method, async });
};
/**
 * Создает SendJson запрос из данного URL
 * @param {*} object - объект для передачи
 * @param {{ async?: boolean }} props - опции
 *
 * @return {SendJsonRequest}
 */
URL.prototype.createSendJsonRequest = function (object, props = {}) {
    props = props || {};
    return new SendJsonRequest(Object.assign({ url: this.getAbsoluteString(), object }, props));
};
/**
 * Создает SendJson запрос из данного URL
 * @param {File[]} files - файлы для передачи
 * @param {{ async?: boolean }} props - опции
 *
 * @return {SendFileRequest}
 */
URL.prototype.createSendFileRequest = function (files, props) {
    props = props || {};
    return new SendFileRequest(Object.assign({ url: this.getAbsoluteString(), files }, props));
};
/**
 * Создает {@link TextView} элемент из строки
 * @param {TextViewOptions} options - опции {@link TextViewOptions}
 * @return {TextView}
 */
String.prototype.textView = function (options = {}) {
    return new TextView(Object.assign({ text: this }, options));
};
/**
 * Создает {@link HeaderTextView} элемент из строки
 * @param {HeaderTextViewOptions} options - опции {@link HeaderTextViewOptions}
 * @return {HeaderTextView}
 */
String.prototype.headerTextView = function (options = { headerLevel: 1 }) {
    return new HeaderTextView(Object.assign({ text: this }, options));
};
/**
 * Создает {@link Button} из строки
 * @param {ButtonOptions} options - опции {@link ButtonOptions}
 * @return {Button}
 */
String.prototype.button = function (options) {
    return new Button(Object.assign({ text: this }, options));
};
/**
 * Создает {@link IconView} из строки
 * @param {IconViewOptions} options - опции {@link IconViewOptions}
 * @return {IconView}
 */
String.prototype.iconView = function (options) {
    return new IconView(Object.assign({ iconName: this }, options));
};
/**
 * Создает {@link URL} из строки
 * @return {URL}
 */
String.prototype.url = function () {
    return new URL(this);
};
/**
 * Содает {@link ListView} из массива строк или элементов
 * @param options - опции {@link ListViewOptions}
 * @return {ListView}
 */
Array.prototype.listView = function (options) {
    return new ListView(Object.assign({ items: this }, options));
};
/**
 * Создает оповещение
 * @function
 * @param {string} text - текст оповещения
 * @param {string?} title - заголовок оповещения
 * @param {string?} content - контента
 */
Window.prototype.notifi = (text, title, content) => {
    new NotificationView({ title, message: text, content }).present();
};

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
 + Файл: SwitchFields                                                     +
 + Файл изменен: 09.02.2019 15:38:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Поле ввода переключатель
 * @class SwitchField
 * @augments {Field<boolean>}
 */
class SwitchField extends Field {
    /**
     * Конструктор
     * @param {SwitchFieldOptions} options
     */
    constructor(options = {}) {
        super(Object.assign({ tag: "label" }, options));
        /**
         * Левый лейбл
         * @type {ObservableProperty<View>}
         * @protected
         * @ignore
         */
        this.__leftLabel = new ObservableProperty();
        /**
         * Правый лейбл
         * @type {ObservableProperty<View>}
         * @protected
         * @ignore
         */
        this.__rightLabel = new ObservableProperty();
        /**
         * Элемент переключателя
         * @protected
         * @ignore
         */
        this.__core = new Control({ class: "--core", tag: "span" });
        /**
         * Свойство: стиль переключателя
         * @ignore
         */
        this.switchStyleProperty = new ObservableProperty(null);
        this.addClass("ef-switch");
        this.getDocument().append(this.getToggleView().getDocument());
        this.getAccessory().type = "checkbox";
        this.getAccessory().onchange = () => this.value(this.getAccessory().checked);
        this.__leftLabel.change(() => this.rebuild());
        this.__rightLabel.change(() => this.rebuild());
        this.switchStyleProperty.change((value, oldVal) => {
            if (oldVal)
                this.removeClass(`--${oldVal}`);
            this.addClass(`--${value}`);
        });
        this.valueProperty.change(value => this.getAccessory().checked = value);
        variable(options.leftLabel, () => this.setLeftLabel(options.leftLabel));
        variable(options.rightLabel, () => this.setRightLabel(options.rightLabel));
        variable(options.title, () => this.setLeftLabel(options.title));
        variable(options.value, () => this.value(options.value));
        variable(options.switchStyle, () => this.switchStyle(options.switchStyle));
    }
    /**
     * Очищает значение
     * @return {this}
     */
    clearValue() {
        this.value(false);
        return this;
    }
    /**
     * Устанавливает лейбл слева
     * @param {string|View} view
     * @return {this}
     */
    setLeftLabel(view) {
        if (typeof view === "string")
            view = new TextView({ text: view });
        this.__leftLabel.set(view);
        return this;
    }
    /**
     * Устанавливает лейбл справа
     * @param {string|View} view
     * @return {this}
     */
    setRightLabel(view) {
        if (typeof view === "string")
            view = new TextView({ text: view });
        this.__rightLabel.set(view);
        return this;
    }
    /**
     * Возвращает левый лейбл
     * @return {View|null}
     */
    getLeftLabel() {
        return this.__leftLabel.get();
    }
    /**
     * Возвращает правый лейбл
     * @return {View|null}
     */
    getRightLabel() {
        return this.__rightLabel.get();
    }
    /**
     * Возвращает элемент переключателя
     * @return {View}
     */
    getToggleView() {
        return this.__core;
    }
    /**
     * Выполняет перестроение элемента
     * @return {this}
     */
    rebuild() {
        this.removeViewContent();
        this.getDocument().append(this.getAccessory());
        if (!this.__leftLabel.isNull())
            this.getDocument().append(this.__leftLabel.get().getDocument());
        this.getDocument().append(this.getToggleView().getDocument());
        if (!this.__rightLabel.isNull())
            this.getDocument().append(this.__rightLabel.get().getDocument());
        return this;
    }
    /**
     * Возвращает и устанавливает стиль переключателя
     * @param {Style|string} [value] - значение
     * @returns {Style|this|null}
     */
    switchStyle(value) {
        if (typeof value === "string")
            value = Style.byName(value);
        return ObservableProperty.simplePropertyAccess(this, value, this.switchStyleProperty);
    }
}
/**
 * @typedef {Object} SwitchFieldOptions
 * @property {string|View} [title]
 * @property {string|View} [leftLabel]
 * @property {string|View} [rightLabel]
 * @property {string|Style} [switchStyle]
 * @property {boolean} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 */

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
 + Файл: ContainerViews.ts                                                    +
 + Файл изменен: 09.02.2019 19:10:18                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения контейнер с элементом
 * @class ContainerView
 * @template T
 * @augments View
 */
class ContainerView extends View {
    /**
     * Конструктор
     * @param {T} view
     * @param options
     */
    constructor(view, options = {}) {
        super(options);
        /**
         * Элемент отображения
         * @protected
         * @ignore
         */
        this.__theView = view;
        this.getDocument().append(view.getDocument());
    }
    /**
     * Возвращает содержимое контейнера
     * @return {T}
     */
    getView() {
        return this.__theView;
    }
}

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
 + Файл: fieldType.tss                                                      +
 + Файл изменен: 05.12.2018 23:47:11                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Типы ввода данных
 * @class TextFieldType
 * @augments {elyEnum<string>}
 */
class TextFieldType extends elyEnum {
    /**
     * Конструктор
     * @ignore
     * @param val
     */
    constructor(val) {
        super(val);
    }
    /**
     * Тип по имени
     * @param value
     */
    static byName(value) {
        if (typeof value === "number")
            value = value.toString() + "px";
        return new TextFieldType(value);
    }
    /**
     * Список
     */
    static rawList() {
        return {
            mail: TextFieldType.mail.value,
            number: TextFieldType.number.value,
            password: TextFieldType.password.value,
            text: TextFieldType.text.value,
        };
    }
}
/**
 * Текст
 */
TextFieldType.text = new TextFieldType("text");
/**
 * Пароль
 */
TextFieldType.password = new TextFieldType("password");
/**
 * Число
 */
TextFieldType.number = new TextFieldType("number");
/**
 * Почта
 */
TextFieldType.mail = new TextFieldType("mail");

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
 + Файл: TextField.ts                                                     +
 + Файл изменен: 09.02.2019 19:08:52                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Поле ввода текста
 * @class TextField
 * @augments {View}
 */
class TextField extends Field {
    /**
     * Конструктор
     * @param {TextFieldOptions} options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Правая иконка
         * @protected
         * @ignore
         */
        this.__rightIconContainerView = null;
        /**
         * Левая иконка
         * @protected
         * @ignore
         */
        this.__leftIconContainerView = null;
        this.addClass("ef-input");
        this.getAccessory().onchange = () => {
            this.value(this.getAccessory().value);
        };
        this.getAccessory().oninput = (e) => {
            this.notificate("input", [this.getAccessory().value, e]);
        };
        this.valueProperty.change((value, oldVal) => {
            this.getAccessory().value = value;
        });
        variable(options.value, () => this.value(options.value));
        variable(options.fieldType, () => this.fieldType(options.fieldType));
        variable(options.rightIconName, (v) => this.setRightIcon(v));
        variable(options.leftIconName, (v) => this.setLeftIcon(v));
    }
    /**
     * Возвращает и устанавливает тип поля текста
     * @param {TextFieldType | string} [value] - значение
     * @returns {TextFieldType|this|null}
     */
    fieldType(value) {
        if (value === undefined)
            return TextFieldType.byName(this.getAccessory().type);
        if (typeof value === "string")
            value = TextFieldType.byName(value);
        this.getAccessory().type = value.value;
        return this;
    }
    /**
     * Добавляет наблюдатель: ввод текста
     *
     * Имя обсервера: input
     *
     * @param {function(value: string, e: Event)} o - наблюдатель
     */
    addInputObserver(o) {
        this.addObserver("input", o);
        return this;
    }
    /**
     * Возвращает отображение правой иконки
     * @return {ContainerView<IconView>}
     */
    getRightIconView() {
        return this.__rightIconContainerView;
    }
    /**
     * Возвращает отображение левой иконки
     * @return {ContainerView<IconView>}
     */
    getLeftIconView() {
        return this.__leftIconContainerView;
    }
    /**
     * Устанавливает левую иконку
     * @param {string} name
     * @return {this}
     */
    setLeftIcon(name) {
        this.__leftIconContainerView = new ContainerView(new IconView({ iconName: name }));
        this.__leftIconContainerView.addClass("ef-input-prefix");
        return this.__rebuild();
    }
    /**
     * Устанавливает правую иконку
     * @param {string} name
     * @return {this}
     */
    setRightIcon(name) {
        this.__rightIconContainerView = new ContainerView(new IconView({ iconName: name }));
        this.__rightIconContainerView.addClass("ef-input-suffix");
        return this.__rebuild();
    }
    /**
     * Удаляет левую иконку
     * @return {this}
     */
    removeLeftIcon() {
        this.removeClass("with-prefix");
        this.__leftIconContainerView = null;
        return this.__rebuild();
    }
    /**
     * Удаляет левую иконку
     * @return {this}
     */
    removeRightIcon() {
        this.removeClass("with-suffix");
        this.__rightIconContainerView = null;
        return this.__rebuild();
    }
    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    isValid() {
        return super.isValid();
    }
    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    isEmpty() {
        return super.isEmpty() || this.value().trim() === "";
    }
    /**
     * перестраивает поле ввода
     * @protected
     * @ignore
     */
    __rebuild() {
        this.removeViewContent();
        this.getDocument().append(this.getAccessory());
        if (this.getLeftIconView()) {
            this.addClass("with-prefix");
            this.getDocument().append(this.getLeftIconView().getDocument());
        }
        if (this.getRightIconView()) {
            this.addClass("with-suffix");
            this.getDocument().append(this.getRightIconView().getDocument());
        }
        return this;
    }
}
/**
 * @typedef {Object} TextFieldOptions
 * @property {TextFieldType|string} [fieldType]
 * @property {string} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 * @property {string} [rightIconName = ""]
 * @property {string} [leftIconName = ""]
 */

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
 + Файл: RowLayoutViews                                                   +
 + Файл изменен: 09.02.2019 16:35:37                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображение строка {@link GridLayoutView}
 * @class efGridLayoutRowView
 * @augments {View}
 */
class RowLayoutView$1 extends elyRebuildableViewProtocol {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Элементы отображения
         * @ignore
         * @protected
         */
        this.__views = new ObservableArray();
        /**
         * Свойство: количество элементов в динамической строке
         * @ignore
         * @protected
         */
        this.__rowLengthProperty = new ObservableProperty(24);
        /**
         * Свойство: использование статичного размера элементов в строке
         * @ignore
         * @protected
         */
        this.__rowItemsStaticSizeProperty = new ObservableProperty(false);
        /**
         * Контейнеры
         * @protected
         * @ignore
         */
        this.__containers = [];
        this.addClass("ef-row");
        this.__views.change(() => this.rebuild());
        this.__rowLengthProperty.change(() => this.rebuild());
        this.__rowItemsStaticSizeProperty.change(() => this.rebuild());
        this.denyRebuild(true);
        this.rowLength(24);
        this.rowItemsStaticSize(false);
        variable(options.rowLength, () => this.rowLength(options.rowLength));
        variable(options.rowItemsStaticSize, () => this.rowItemsStaticSize(options.rowItemsStaticSize));
        variable(options.items, () => this.add(...options.items));
        this.denyRebuild(false);
        this.rebuild();
    }
    /**
     * Возвращает и устанавливает количество элементов в динамической строке
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    rowLength(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowLengthProperty);
    }
    /**
     * Возвращает и устанавливает использование статичного размера элементов в строке
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    rowItemsStaticSize(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__rowItemsStaticSizeProperty);
    }
    /**
     * Возвращает массив элементов отображения
     * @return {ObservableArray<View>}
     */
    getViews() {
        return this.__views;
    }
    /**
     * Добавляет элемент[ы] в строку
     * @param {...View} view
     */
    add(...view) {
        view.forEach(value => this.getViews().push(value));
        return this;
    }
    /**
     * Вставляет элементы в нужную позицию
     * @param index
     * @param view
     */
    insert(index, ...view) {
        this.getViews().insert(index, ...view);
        return this;
    }
    /**
     * Возвращает индекс элемента в строке
     * @param {View} view
     * @return {number}
     */
    indexOf(view) {
        return this.getViews().indexOf(view);
    }
    /**
     * Возвращает true, если в строке существует элемент
     * @param {View} view
     * @return {boolean}
     */
    contains(view) {
        return this.indexOf(view) > -1;
    }
    /**
     * Удаляет элемент
     * @param {View} view
     * @return {this}
     */
    remove(view) {
        return this.removeIndex(this.indexOf(view));
    }
    /**
     * Удаляет элемент по индексу
     * @param {number} index - индекс элемента в строке
     * @return {this}
     */
    removeIndex(index) {
        this.getViews().remove(index);
        return this;
    }
    /**
     * Добавляет наблюдатель: элемент будет добавлен, помещенный в контейнер.
     *
     * Аргументы:
     * - Первый аргумент - элемент;
     * - Второй аргумент - контейнер в который уже добавлен элемент.
     *
     * Имя обсервера: itemWillAdd
     *
     * @param o - наблюдатель
     */
    addItemWillAddObserver(o) {
        this.addObserver("itemWillAdd", o);
        return this;
    }
    /**
     * Возвращает элемент на сетке
     *
     * @param {number} index
     * @return {View}
     */
    viewAt(index) {
        if (this.getViews().hasIndex(index))
            return this.getViews().item(index);
        return null;
    }
    /**
     * Возвращает колонку по индексу. Колонка - контейнер содержит элемент. Элемент
     * можно получить испльзуя метод `{@link RowLayoutView.viewAt}`
     *
     * @param {number} index
     * @return {View}
     */
    columnAt(index) {
        if (this.getViews().hasIndex(index))
            return this.__containers[index];
        return null;
    }
    /**
     * Выполняет перестроение
     * @ignore
     * @private
     */
    __rebuild() {
        this.removeViewContent();
        this.__containers = [];
        this.getViews().forEach(item => {
            const container = new Control({ class: "ef-col" });
            let containerSize = (1 / this.rowLength()) * 100;
            if (!this.rowItemsStaticSize())
                containerSize = 100 / (this.rowLength() / (this.rowLength() / this.getViews().length()));
            container.getStyle().width = containerSize + "%";
            container.addSubView(item);
            this.__containers.push(container);
            this.notificate("itemWillAdd", [item, container]);
            this.getDocument().append(container.getDocument());
        });
        return this;
    }
}
/**
 * @typedef {Object} RowLayoutViewOptions
 * @property {number} [rowLength = 24]
 * @property {boolean} [rowItemsStaticSize = false]
 * @property {View[]} [items]
 */

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
 + Файл: NavigationView.ts                                                    +
 + Файл изменен: 07.02.2019 23:43:35                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения - панель навигации
 * @class NavigationView
 * @augments {elyRebuildableViewProtocol}
 */
class NavigationView$1 extends ListView {
    /**
     * Конструктор
     * @param {NavigationViewOptions} options
     */
    constructor(options = { horizontal: true, fixed: false }) {
        super(options);
        /**
         * Элемент отображения заголовка
         * @protected
         * @ignore
         */
        this.__titleTextView = new TextView({ tag: "li" });
        /**
         * Элемент отображения иконки-переключателя
         * @protected
         * @ignore
         */
        this.__toggleIconView = new IconView({ tag: "li", iconName: "navicon" });
        this.__denyRebuild = false;
        this.addClass("ef-navigation");
        this.fixed(options.fixed || false);
        this.horizontal(options.horizontal);
        this.getTitleView().addClass("--item", "logo");
        this.getToggleIconView().addClass("--toggle");
        this.getToggleIconView().addObserver("click", () => {
            if (this.hasClass("--open"))
                this.removeClass("--open");
            else
                this.addClass("--open");
        });
        this.rebuild();
    }
    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    getTitleView() {
        return this.__titleTextView;
    }
    /**
     * Возвращает иконку-переключатель
     */
    getToggleIconView() {
        return this.__toggleIconView;
    }
    /**
     * Возвращает и устанавливает
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    fixed(value) {
        if (value === undefined)
            return this.hasClass("--fixed");
        if (value)
            this.addClass("--fixed");
        else
            this.removeClass("--fixed");
        return this;
    }
    /**
     * Возвращает и устанавливает горизонтальное расположение
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    horizontal(value) {
        if (value === undefined)
            return this.hasClass("--horizontal");
        if (value)
            this.addClass("--horizontal");
        else
            this.removeClass("--horizontal");
        return this;
    }
    /**
     * Выполняет перестроение элемента
     *
     * Метод для переопределения реализации престроения
     * @private
     * @ignore
     */
    __rebuild() {
        this.removeViewContent();
        this.getDocument().append(this.getToggleIconView().getDocument());
        this.getDocument().append(this.getTitleView().getDocument());
        this.getItems().forEach(item => {
            const view = new Control({ tag: "li", class: "--item" });
            view.addSubView(item);
            this.notificate("itemWillAdd", [item, view]);
            this.getDocument().append(view.getDocument());
        });
        return this;
    }
}
/**
 * @typedef {Object} NavigationViewOptions
 * @property {boolean} [horizontal = true]
 * @property {boolean} [fixed = false]
 */

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
 + Файл: LinkTextViews                                                    +
 + Файл изменен: 08.02.2019 00:48:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Текст с ссылкой
 * @class LinkTextView
 * @augments {TextView}
 */
class LinkTextView extends TextView {
    /**
     * Конструктор
     * @param {LinkTextViewOptions} options
     */
    constructor(options = { url: "#" }) {
        super(options);
        /**
         * Свойство: адрес ссылки
         * @type {ObservableProperty<string>}
         */
        this.urlProperty = new ObservableProperty("#").change(value => {
            this.attribute("href", value);
        });
        this.url(options.url);
    }
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {LinkTextView}
     */
    static deserialize(raw) {
        return new LinkTextView(JSON.parse(raw));
    }
    /**
     * Возвращает и устанавливает адрес ссылки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    url(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.urlProperty);
    }
    /**
     * Сериализует объект
     * @return {string}
     */
    serialize() {
        return JSON.stringify({
            text: this.text(),
            textCenter: this.textCenter(),
            textSize: this.textSize().value,
            textStyle: this.textStyle().value,
            textWeight: this.textWeight().value,
            url: this.url(),
        });
    }
}
/**
 * @typedef {TextViewOptions} LinkTextViewOptions
 * @property {string} [url = "#"]
 */

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
 + Файл: ImageViews                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения: Изображение
 * @version 1.0
 *
 * Events:
 * - loaded: Изображение загружено
 */
class ImageView extends View {
    /**
     * Конструтор
     * @param {ImageViewOptions} options - опции
     */
    constructor(options = {}) {
        super(Object.assign({ tag: "img" }, options));
        /**
         * Свойство: ссылка на изображение
         * @ignore
         * @protected
         */
        this.__urlProperty = new ObservableProperty().change((newValue) => this.getDocument().src = newValue);
        this.getDocument().onload = (e) => this.notificate("loaded", [e]);
        if (options.url)
            this.url(options.url);
    }
    /**
     * Возвращает свойство: ссылка на изображение
     * @return {ObservableProperty<string>}
     */
    getUrlProperty() {
        return this.__urlProperty;
    }
    /**
     * Возвращает и устанавливает ссылка на изображение
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    url(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__urlProperty);
    }
    /**
     * Добавляет наблюдатель: изображение загружено
     *
     * Имя обсервера: loaded
     *
     * @param o - наблюдатель
     */
    addLoadedObserver(o) {
        this.addObserver("loaded", o);
        return this;
    }
    /**
     * Возвращает корневой элемент
     */
    getDocument() {
        return this.__view;
    }
}
/**
 * @typedef {Object} ImageViewOptions
 * @property {string} [url]
 */

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
 + Файл: ModalViews                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**w
 * Элемент отображения: Модальное окно
 * @version 1.0
 * @class ModalView
 * @augments {View}
 */
class ModalView extends View {
    /**
     * Конструктор
     * @param {ModalViewOptions} options - опции
     */
    constructor(options = {}) {
        super(options);
        /**
         * Элемент модального окна
         * @readonly
         * @type {Control}
         */
        this.__containerView = new Control({ class: "ef-modal-container" });
        /**
         * Кнопка закрытия
         * @type {IconView}
         * @readonly
         */
        this.__closeButtonView = new IconView({ iconName: "close", class: "close" });
        /**
         * Элемент заголовка
         * @readonly
         * @type {TextViewContainer}
         */
        this.__titleTextContainerView = new TextViewContainer({ class: "title" });
        /**
         * Элемент контента
         * @type {View}
         * @readonly
         * @protected
         */
        this.__modalContentView = new Control({ class: "content" });
        /**
         * Свойство: стиль модального окна
         * @ignore
         * @protected
         */
        this.__modalStyleProperty = new ObservableProperty(Style.primary).change((value, oldVal) => {
            if (oldVal)
                this.getTitleTextContainerView().removeClass(`bg-${oldVal.value}`);
            this.getTitleTextContainerView().addClass(`bg-${value.value}`);
        });
        /**
         * Свойство: флаг возможности закрытия окна
         * @ignore
         * @protected
         */
        this.__modalClosableProperty = new ObservableProperty(true).change(value => {
            this.getCloseButtonView().hidden(!value);
        });
        /**
         * Свойство: элемент - содержимое модального окна
         * @ignore
         * @protected
         */
        this.__modalContentProperty = new ObservableProperty(Control.empty()).change((newValue) => {
            this.getContentView().removeViewContent();
            this.getContentView().getDocument().append(newValue.getDocument());
        });
        this.addClass("ef-modal");
        this.getCloseButtonView().addObserver("click", () => this.dismiss());
        this.getTitleTextContainerView().getDocument().append(this.getCloseButtonView().getDocument());
        this.getContainerView().addSubView(this.getTitleTextContainerView());
        this.getContainerView().addSubView(this.getContentView());
        this.getDocument().append(this.getContainerView().getDocument());
        // Set
        variable(options.content, value => this.content(value), Control.empty());
        variable(options.title, value => this.title(value), "Modal");
        variable(options.closable, value => this.closable(value), true);
        variable(options.modalStyle, value => this.modalStyle(value), Style.byName("default"));
    }
    /**
     * Открывает следующее модальное окно из стэка
     * @protected
     * @static
     */
    static next() {
        if (ModalView.queue.length > 0 && ModalView.currentModal === null) {
            ModalView.currentModal = ModalView.queue.pop();
            Application.default.getApplicationDocument().getBody().addSubView(ModalView.currentModal);
            ModalView.currentModal.fadeIn();
        }
    }
    /**
     * Отображает модальное окно
     * @return
     */
    present() {
        this.notificate("present", [this]);
        ModalView.queue.push(this);
        ModalView.next();
    }
    /**
     * Скрывает модальное окно
     * @param {boolean} [force = false]
     * @return
     *
     * Модальное окно может быть "незакрываемым", тогда
     * удалить его можно только используя параметр `force`.
     *
     *
     *     myModal.dismiss(true); // Force dismiss modal
     *
     *
     */
    dismiss(force = false) {
        if (this.closable() || force) {
            this.notificate("dismiss", [this]);
            this.fadeOut(() => {
                Application.default.getApplicationDocument().getBody().removeSubView(this);
                ModalView.currentModal = null;
                ModalView.next();
            });
        }
    }
    /**
     * Возвращает элемент отображения заголовка
     * @return {TextView}
     */
    getTitleTextContainerView() {
        return this.__titleTextContainerView;
    }
    /**
     * Возвращает элемент отображения содержимого модального окна
     * @return {View}
     */
    getContentView() {
        return this.__modalContentView;
    }
    /**
     * Возвращает элемент отображения - контейнер модального окна
     * @return {Control}
     */
    getContainerView() {
        return this.__containerView;
    }
    /**
     * Возвращает элемент отображения иконки закрытия модального окна
     * @return {IconView}
     */
    getCloseButtonView() {
        return this.__closeButtonView;
    }
    /**
     * Возвращает и устанавливает заголовок модального окна
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    title(value) {
        if (value === undefined)
            return this.getTitleTextContainerView().getTextView().text();
        this.getTitleTextContainerView().getTextView().text(value);
        return this;
    }
    /**
     * Возвращает свойство: элемент - содержимое модального окна
     * @return {ObservableProperty<View>}
     */
    getModalContentProperty() {
        return this.__modalContentProperty;
    }
    /**
     * Возвращает и устанавливает элемент - содержимое модального окна
     * @param {View} [value] - значение
     * @returns {View|this|null}
     */
    content(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__modalContentProperty);
    }
    /**
     * Возвращает свойство: флаг возможности закрытия окна
     * @return {ObservableProperty<boolean>}
     */
    getModalClosableProperty() {
        return this.__modalClosableProperty;
    }
    /**
     * Возвращает и устанавливает флаг возможности закрытия окна
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    closable(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__modalClosableProperty);
    }
    /**
     * Возвращает свойство: стиль модального окна
     * @return {ObservableProperty<Style>}
     */
    getModalStyleProperty() {
        return this.__modalStyleProperty;
    }
    /**
     * Возвращает и устанавливает стиль модального окна
     * @param {Style} [value] - значение
     * @returns {Style|this|null}
     */
    modalStyle(value) {
        return ObservableProperty.simplePropertyAccess(this, value, this.__modalStyleProperty);
    }
}
/**
 * Текущее окно
 * @type {ModalView|null}
 */
ModalView.currentModal = null;
/**
 * Очередь из объектов
 * @protected
 * @type {ModalView[]}
 */
ModalView.queue = [];
/**
 * @typedef {Object} ModalViewOptions
 * @property {string} [title]
 * @property {View} [content]
 * @property {boolean} [closable = true]
 * @property {Style} [modalStyle]
 */

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
 + Файл: Cookies.ts                                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Печеньки
 */
class Cookies {
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
 + Файл: Time.ts                                                              +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Модуль elyFlat для работы со временем
 * @class elyTime
 */
class Time {
    /**
     * Конструткор
     * @param {{date?: Date}} options - опции
     */
    constructor(options = { date: new Date() }) {
        this.date = options.date;
    }
    /**
     * Создает объект времени по дате
     * @param {number} [day] - день
     * @param {number} [month] - месяц
     * @param {number} [year] - год
     * @param {number} [hour] - час
     * @param {number} [minute] - минута
     * @param {number} [second] - секунда
     *
     * @return {Time}
     */
    static byDate(day = 0, month = 0, year = 0, hour = 0, minute = 0, second = 0) {
        return new Time({ date: new Date(year, month - 1, day, hour, minute, second) });
    }
    /**
     * Возвращает объект текущего времени
     * @return {Time}
     */
    static now() {
        return new Time({ date: new Date() });
    }
    /**
     * Возвращает количество часов со склонением
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     *
     *     time.hoursString(5); // 5 часов
     *     time.hoursString(2); // 2 часа
     *
     *
     */
    static hoursString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
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
     *
     * @return {string}
     *
     *
     *     time.minutesString(5); // 5 минут
     *     time.minutesString(2); // 2 минуты
     *
     *
     */
    static minutesString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
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
     *
     * @return {string}
     *
     *
     *     time.secondsString(5); // 5 секунд
     *     time.secondsString(2); // 2 секунды
     *
     *
     */
    static secondsString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
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
     * @return {string}
     *
     *
     *     time.daysString(5); // 5 дней
     *     time.daysString(2); // 2 дня
     *
     *
     */
    static daysString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
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
     * @return {string}
     *
     *
     *     time.monthsString(5); // 5 месяцев
     *     time.monthsString(2); // 2 месяца
     *
     *
     */
    static monthsString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
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
     * @return {string}
     *
     *
     *     time.yearsString(5); // 5 лет
     *     time.yearsString(2); // 2 года
     *
     *
     */
    static yearsString(value, isUpperFirstChar = false) {
        return Time.__stringByLastNumber(value, [
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
     * @return {TimeDifferences}
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
        const str = list[Time.__lastNumberChar(num)];
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
     * @return {number}
     */
    getTime() {
        return this.date.getTime();
    }
    /**
     * Возвращает количество дней в месяце для
     * даты, указанной в Time.
     *
     * @return {number}
     */
    getDaysInMonth() {
        return 32 - new Date(this.date.getFullYear(), this.date.getMonth(), 32).getDate();
    }
    /**
     * Возвращает разницу времени
     * @param {Time} time - время сравнения
     *
     * @return {TimeDifferences}
     */
    getDifference(time) {
        return Time.timeCodeToVars(Math.abs(this.getTime() - time.getTime()));
    }
    /**
     * Возвращает разницу времени
     *
     * @return {TimeDifferences}
     */
    getDifferenceNow() {
        return this.getDifference(Time.now());
    }
    /**
     * Возвращает true, елси текущее время позже, чем время,
     * указанное в аршументе.
     * @param {Time} time - время сравнения
     *
     * @return {boolean}
     */
    isLaterThen(time) {
        return this.getDifference(time).source > 0;
    }
    /**
     * Возвращает строку времени
     * @param {boolean} withTime - если установлено true, в строке будет отображено
     * время в формате HH:MM:SS
     *
     * @return {string}
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
     *
     * @return {string}
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
     * @return {{date: number, month: number, year: number}}
     */
    getDate() {
        return { date: this.date.getDate(), month: this.date.getMonth() + 1, year: this.date.getFullYear() };
    }
    /**
     * Возвращает время
     * @return {{hours: number, milliseconds: number, minutes: number, seconds: number}}
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
     * @return {number}
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
     * @param {boolean} isShort
     * @return {string}
     */
    getWeekDayName(isShort = false) {
        return isShort ? Time.weekDaysShortList[this.getWeekDayIndex()] :
            Time.weekDaysList[this.getWeekDayIndex()];
    }
    /**
     * Возвращает строку времени
     * @return {string}
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
 * @type {string[]}
 *
 * - "Понедельник"
 * - "Вторник"
 * - "Среда"
 * - "Четверг"
 * - "Пятница"
 * - "Суббота"
 * - "Воскресение"
 */
Time.weekDaysList = [
    "Понедельник", "Вторник", "Среда",
    "Четверг", "Пятница", "Суббота", "Воскресение",
];
/**
 * Список коротких названий дней недели
 * @type {string[]}
 *
 * - "Пн"
 * - "Вт"
 * - "Ср"
 * - "Чт"
 * - "Пт"
 * - "Сб"
 * - "Вс"
 */
Time.weekDaysShortList = [
    "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",
];
/**
 * Список названий мясяцев
 * @type {string[]}
 */
Time.monthsList = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
/**
 * Список названий коротких названий мясяцев
 * @type {string[]}
 */
Time.monthsShortList = [
    "Янв", "Фев", "Мрт", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноб", "Дек",
];
/**
 * @typedef {Object} TimeDifferences
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} source
 */

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
 + Файл: Timer.ts                                                       +
 + Файл изменен: 08.01.2019 01:11:46                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Таймер
 * @class {Timer}
 */
class Timer extends Observable {
    /**
     * Конструктор
     * @param props
     */
    constructor(props) {
        super();
        /**
         * Циклический таймер
         * @type {boolean}
         * @protected
         */
        this.__loop = false;
        /**
         * @protected
         */
        this.__duration = props.duration;
        /**
         * @protected
         */
        this.__loop = props.loop || false;
    }
    /**
     * Добавляет наблюдатель: окончание таймера
     *
     * Если таймер циклический, данный метод будет вызван каждый цикл
     *
     * Имя обсервера: addEndObserver
     *
     * @param o - наблюдатель
     */
    addEndObserver(o) {
        this.addObserver("endTimer", o);
        return this;
    }
    /**
     * Добавляет наблюдатель: запускт таймера
     *
     * Имя обсервера: startTimer
     *
     * @param o - наблюдатель
     */
    addStartObserver(o) {
        this.addObserver("startTimer", o);
        return this;
    }
    /**
     * Запускает таймер
     */
    start() {
        if (this.__thread !== null)
            return;
        this.notificate("startTimer");
        if (this.__loop)
            this.__thread = setInterval(() => {
                this.stop(true);
            }, this.__duration);
        else {
            this.__thread = setTimeout(() => {
                this.stop(true);
            }, this.__duration);
        }
    }
    /**
     * Перезапускает таймер
     */
    restart() {
        this.stop(false);
        this.start();
    }
    /**
     * Останавливает таймер
     * @param {boolean} [notificate = true] - если установлено значение true,
     * после выполнения метода, будет вызвано событие `endTimer` {@link Timer.addEndObserver(o)}
     */
    stop(notificate = true) {
        if (this.__loop)
            clearInterval(this.__thread);
        else
            clearTimeout(this.__thread);
        if (notificate)
            this.notificate("endTimer");
        this.__thread = null;
    }
}

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
 + Файл: SendJsonRequest.ts                                             +
 + Файл изменен: 26.02.2019 23:45:06                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * SendJsonRequest позволяет передавать JSON данные через POST запрос.
 *
 * JSON данные передаются в теле запроса. Отправка данных производится методом POST.
 *
 * Заголовки:
 * - Content-type: application/json; charset=utf-8
 *
 * @class SendJsonRequest
 * @augments {URLRequest}
 */
class SendJsonRequest$1 extends URLRequest {
    /**
     * Выполняет отправку JSON данных
     *
     * @param {string} url - адрес
     * @param {*} object - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     */
    static send(url, object, callback) {
        new SendJsonRequest$1({ url, object }).send(callback);
    }
    /**
     * Конструктор
     * @param {SendJsonRequestOptions} options
     */
    constructor(options) {
        super(options);
        this.__object = options.object;
    }
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     */
    send(callback) {
        this.__method = URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);
        this.getXMLHttpRequest().send(JSON.stringify(this.getObject()));
    }
    /**
     * Устаналивает объект для передачи
     * @param {*} obj
     * @return {this}
     */
    setObject(obj) {
        this.__object = obj;
        return this;
    }
    /**
     * Возвращает объект для передачи
     * @return {*}
     */
    getObject() {
        return this.__object;
    }
}
/**
 * @typedef {Object} SendJsonRequestOptions
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {*} [object]
 */

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
 + Файл: efxApp.ts                                                            +
 + Файл изменен: 22.02.2019 23:04:56                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Приложение efX-app
 * @class {efxApp}
 * @augments {Observable}
 */
class efxApp extends Observable {
    /**
     * Конструктор
     * @param props
     */
    constructor(props = {}) {
        super();
        /**
         * @protected
         * @ignore
         */
        this.__isConnected = false;
        /**
         * @protected
         * @ignore
         */
        this.__host = "http://localhost";
        /**
         * @protected
         * @ignore
         */
        this.__port = 1583;
    }
    /**
     * Возвращает состояние подключения
     * @return {boolean}
     */
    isConnected() {
        return this.__isConnected;
    }
    /**
     * Возвращает хост соединения
     * @return {string}
     */
    getHost() {
        return this.__host;
    }
    /**
     * Возвращает порт соединения
     * @return {number}
     */
    getPort() {
        return this.__port;
    }
    /**
     * Соединяется с сервером efX-app
     * @param callback
     */
    connect(callback) {
        this.sendRaw("list", {}, (res) => {
            const self = this;
            this.__isConnected = res.status;
            if (res.status) {
                const obj = {};
                res.response.forEach(value => {
                    Object.defineProperty(obj, value, {
                        get: () => {
                            return {
                                rows(data, callback) {
                                    self.sendRaw("select", Object.assign({ table: value }, data), response => {
                                        callback(response.response);
                                    });
                                },
                            };
                        },
                    });
                });
                callback(obj);
            }
        });
    }
    global(callback) {
        this.sendRaw("select", { table: "global" }, response => {
            const obj = {};
            response.response.forEach((o) => {
                obj[o.name] = {
                    value: o.value,
                    set(value, callback) {
                        this.sendRaw("set", { table: "global", id: o.id }, (a) => {
                            callback();
                        });
                    },
                };
            });
            callback(obj);
        });
    }
    sendRaw(method, data, callback) {
        URLRequest.sendGET(this.getHost() + ":" + this.getPort() + "/db/" + method, data, response => {
            callback(response);
        });
    }
}

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
 + Файл: AppDevelopConsole.ts                                             +
 + Файл изменен: 10.02.2019 18:49:26                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Элемент отображения - консоль
 * @class AppDevelopConsole
 * @augments {View}
 */
class AppDevelopConsole$1 extends View {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Кол-во строк
         */
        this.saveRowsLimit = 100;
        /**
         * Строки
         */
        this.__rows = [];
        /**
         * Текст
         */
        this.__textArea = new TextArea({ readonly: true });
        /**
         * Перекрывает консоль
         */
        this.__lockConsole = false;
        this.addClass("ef-app-develop-console");
        this.getDocument().append(new HeaderTextView({ headerLevel: 3, text: "ely.flat Application Develop Console" }).getDocument());
        this.getDocument().append(this.__textArea.getDocument());
    }
    /**
     * Отображает данные в консоли
     * @param data
     */
    print(...data) {
        if (this.__lockConsole)
            return this;
        const strs = data.map(value => String(value));
        this.__rows.push(strs.join(" "));
        if (this.__rows.length > this.saveRowsLimit) {
            this.__rows.splice(0, Math.abs(this.__rows.length - this.saveRowsLimit));
        }
        this.__textArea.value(this.__rows.join("\n"));
        this.__textArea.scrollToBottom();
        return this;
    }
    /**
     * Отображает ошибку в консоли
     * @param data
     */
    error(...data) {
        if (this.hidden())
            this.hidden(false);
        const arr = ["<b>"];
        data.forEach(value => arr.push(value));
        arr.push("</b>");
        this.print(...arr);
        this.__lockConsole = true;
        return this;
    }
}
/**
 * Общий объект консоли
 * @type {AppDevelopConsole}
 */
AppDevelopConsole$1.shared = new AppDevelopConsole$1();

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
 + Файл: ely.flat.ts                                                          +
 + Файл изменен: 02.01.2019 14:04:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 *
 * @param result
 */
const elyOnReady = (result) => {
    Application.default.addReadyObserver(result);
};
/**
 *
 * @param name
 * @param viewController
 * @param canOverwrite
 */
const addController = (name, viewController, canOverwrite = true) => {
    ScreenController.default.addControllerName(name, viewController, canOverwrite);
};
/**
 * Возвращает приложение
 * @return {Application}
 */
const app = () => {
    return Application.default;
};
/**
 * Возвращает навигацию
 * @return {NavigationView}
 */
const navigation = () => {
    return app().getApplicationNavigationView();
};
window.onload = () => {
    XLogger.default.clear = true;
    if (SingleApp.isUsesSingle()) {
        SingleApp.applicationInitFunction = window.efSingleInit;
        Object.keys(window.elyflatobjects).forEach(value => {
            window[value] = window.elyflatobjects[value];
        });
    }
    Application.loadApplication(() => {
        //
    });
};
/**
 * @param {*} config
 * @return {function(vc: SimplePageViewController)}
 */
window.efSingleInit = window.efSingleInit || (window.ef || null);
window.elyflatobjects = {
    addController,
    app,
    elyOnReady,
    navigation,
    AppDevelopConsole: AppDevelopConsole$1,
    efxApp,
    // elyGuard
    isNone,
    isSet,
    safeJsonParse,
    variable,
    variableAndSet,
    // elyObservable
    Observable,
    ObservableArray,
    ObservableBoolean,
    ObservableDictionary,
    ObservableProperty,
    // elyRequest
    URLRequest,
    URLRequestHeaderName,
    URLRequestMethod,
    SendFileRequest,
    SendJsonRequest: SendJsonRequest$1,
    AppStylesheet,
    Application,
    DeviceDetector,
    Color,
    Time,
    Timer,
    Cookies,
    XLogger,
    Utils,
    ColorUtils,
    AppFileWatcher,
    View,
    Control,
    ScreenController,
    ViewController,
    SimplePageViewController,
    GridViewController,
    Style,
    Size,
    Weight,
    TextFieldType,
    TextView,
    LinkTextView,
    IconView,
    HeaderTextView,
    Button,
    ListView,
    Field,
    TextField,
    SwitchField,
    RowLayoutView: RowLayoutView$1,
    GridLayoutView,
    PanelView,
    ImageView,
    NavigationView: NavigationView$1,
    ModalView,
    PreloaderView,
};

export { app, navigation, elyOnReady, addController, efxApp, AppDevelopConsole$1 as AppDevelopConsole, variable, variableAndSet, isSet, isNone, safeJsonParse, Observable, ObservableProperty, ObservableArray, ObservableDictionary, ObservableBoolean, URLRequest, URLRequestMethod, URLRequestHeaderName, SendJsonRequest$1 as SendJsonRequest, SendFileRequest, AppStylesheet, Application, Time, DeviceDetector, Color, Timer, Cookies, XLogger, Utils, ColorUtils, AppFileWatcher, View, Control, ScreenController, ViewController, SimplePageViewController, GridViewController, Style, Size, Weight, TextFieldType, TextView, LinkTextView, IconView, HeaderTextView, Button, ListView, Field, TextField, SwitchField, RowLayoutView$1 as RowLayoutView, GridLayoutView, PanelView, ImageView, NavigationView$1 as NavigationView, ModalView, PreloaderView };
