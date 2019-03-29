(function () {
    'use strict';

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var Observable_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: Observable.ts                                                        *
     * Файл изменен: 27.02.2019 01:18:10                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Прослушиваемый протокол
     * @class Observable
     */
    class Observable {
        constructor() {
            /**
             * Слушатели
             * @protected
             * @ignore
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
         * @param {string} event - событие
         * @param {Function} observer - обработчик
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
         * Оповещает всех наблюдателей о совершении события
         *
         * @param {string} event - событие
         * @param {...*} args - аргументы события
         */
        notify(event, ...args) {
            if (event in this.observers)
                this.observers[event].forEach((func) => func.apply(this, args || []));
            return this;
        }
        /**
         * Сообщает о событие всем наблюдателям
         * @param {String} event - событие
         * @param {*[]} args - массив аргументов
         *
         * @deprecated {@link Observable.notify}
         */
        notificate(event, args) {
            if (this.observers.hasOwnProperty(event)) {
                for (const observer of this.observers[event])
                    observer.apply(this, args);
            }
        }
    }
    exports.default = Observable;
    });

    var Observable = unwrapExports(Observable_1);

    var Guard = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Безопасная операция над переменной
     *
     * @template T - Тип данных переменной
     * @param {T|*} testVar - Проверяемая переменная
     * @param {function(value: T)} callback - Обработчик с переменной
     * @param {T} [opt] - Опциональное значение, если переменная null или undefined
     * @return
     *
     * ```typescript
     *
     * const a = 123;
     * const b = null;
     *
     * variable(b, value => a = value, 100);
     * variable(a, value => b = value);
     *
     * // a = 100
     * // b = 100
     * ```
     *
     */
    function variable(testVar, callback, opt) {
        if (testVar !== undefined && testVar !== null)
            callback(testVar);
        else if (isSet(opt))
            callback(opt);
    }
    exports.variable = variable;
    /**
     * Безопасная операция над переменной и выполнение операции через объект и контекст
     *
     * @template T - Тип данных переменной
     * @param {T|*} testVar - Проверяемая переменная
     * @param {function(value: T)} callback - Обработчик с переменной
     * @param {*} [context] - Контекст
     * @param {T} [opt] - Опциональное значение, если переменная null или undefined
     *
     * @return
     *
     * ```typescript
     *
     * class MyClass{
     *
     *      public constructor(options = {}){
     *          this.a = null;
     *          this.b = null;
     *
     *          variableAndSet(options.a, this.setA, this, "theA");
     *          variableAndSet(options.b, this.setB, this, "theB");
     *
     *          // Альтернатива:
     *          // variable(options.a, value => this.setA(value), "theA");
     *          // variable(options.b, value => this.setB(value), "theB");
     *      }
     *
     *      setA(value){
     *          this.a = value;
     *      }
     *
     *      setB(value){
     *          this.b = value;
     *      }
     *
     * }
     *
     * const mc = new MyClass({a: 123});
     * // mc.a = 123
     * // mc.b = "theB"
     * ```
     */
    function variableAndSet(testVar, callback, context, opt) {
        variable(testVar, (value) => {
            callback.call(context, value);
        }, opt);
    }
    exports.variableAndSet = variableAndSet;
    /**
     * Возвращает true, если obj не undefined
     * @param {*} obj
     * @return {boolean}
     */
    function isSet(obj) {
        return obj !== undefined;
    }
    exports.isSet = isSet;
    /**
     * Возвращает true, если obj undefined или null.
     * @param {*} obj
     * @return {boolean}
     */
    function isNone(obj) {
        return obj === undefined || obj === null;
    }
    exports.isNone = isNone;
    /**
     * Парсинг JSON *без try/catch* конструкции
     *
     * @param {string} jsonString - строка JSON
     * @param {*} [opt = {}] - значение в случае неудачи
     *
     * @return {*}
     *
     * ```typescript
     *
     * const a = safeJsonParse("a");
     * const b = safeJsonParse("{\"a\": 1}");
     *
     * // a = {}
     * // b = {a: 1};
     * ```
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
    exports.safeJsonParse = safeJsonParse;
    });

    unwrapExports(Guard);
    var Guard_1 = Guard.variable;
    var Guard_2 = Guard.variableAndSet;
    var Guard_3 = Guard.isSet;
    var Guard_4 = Guard.isNone;
    var Guard_5 = Guard.safeJsonParse;

    var URLRequest_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: URLRequest.ts                                                        *
     * Файл изменен: 27.02.2019 03:07:17                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });


    /**
     * Методы передачи параметров
     * @enum
     */
    var URLRequestMethod;
    (function (URLRequestMethod) {
        URLRequestMethod["GET"] = "GET";
        URLRequestMethod["POST"] = "POST";
    })(URLRequestMethod = exports.URLRequestMethod || (exports.URLRequestMethod = {}));
    /**
     * Названия заголовков запроса
     * @enum
     */
    var URLRequestHeaderName;
    (function (URLRequestHeaderName) {
        URLRequestHeaderName["contentType"] = "Content-type";
    })(URLRequestHeaderName = exports.URLRequestHeaderName || (exports.URLRequestHeaderName = {}));
    /**
     * URL запрос
     * @class URLRequest
     * @augments {Observable}
     */
    class URLRequest extends Observable_1.default {
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
            Guard.variable(options.async, value => this.__async = value, true);
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
                if (this.getXMLHttpRequest().readyState === 4) {
                    if (this.getXMLHttpRequest().status === 200) {
                        if (callback)
                            callback(this.getXMLHttpRequest().responseText, true);
                        this.notificate("ready", [this.getXMLHttpRequest().responseText, true]);
                    }
                    else {
                        if (callback)
                            callback(null, false);
                        this.notificate("ready", [null, false]);
                    }
                }
            };
        }
    }
    exports.default = URLRequest;
    /**
     * @typedef {Object} IURLRequestOptions
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
    });

    var URLRequest = unwrapExports(URLRequest_1);
    var URLRequest_2 = URLRequest_1.URLRequestMethod;
    var URLRequest_3 = URLRequest_1.URLRequestHeaderName;

    var SendFileRequest_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Запрос отправки файла
     * @class SendFileRequest
     * @augments {URLRequest}
     */
    class SendFileRequest extends URLRequest_1.default {
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
         * @param {ISendFileRequestOptions} options
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
            this.__method = URLRequest_1.URLRequestMethod.POST;
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
    exports.default = SendFileRequest;
    /**
     * @typedef {Object} ISendFileRequestOptions
     * @property {string} url
     * @property {boolean} [async]
     * @property {*} [data]
     * @property {File[]} [files]
     */
    });

    var SendFileRequest = unwrapExports(SendFileRequest_1);

    var SendJsonRequest_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });

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
    class SendJsonRequest extends URLRequest_1.default {
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
         * @param {ISendJsonRequestOptions} options
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
            this.__method = URLRequest_1.URLRequestMethod.POST;
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
    exports.default = SendJsonRequest;
    /**
     * @typedef {Object} ISendJsonRequestOptions
     * @property {string} url
     * @property {boolean} [async]
     * @property {*} [data]
     * @property {*} [object]
     */
    });

    var SendJsonRequest = unwrapExports(SendJsonRequest_1);

    var ObservableProperty_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });


    /**
     * Обрабатываемое значение
     * @class ObservableProperty
     * @template T
     * @augments Observable
     */
    class ObservableProperty extends Observable_1.default {
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
            if (!Guard.isSet(value))
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
            return Guard.isNone(this.value);
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
    exports.default = ObservableProperty;
    });

    var ObservableProperty = unwrapExports(ObservableProperty_1);

    var ObservableArray_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Массив
     * @template T
     * @class ObservableArray
     * @augments ObservableProperty.<T[]>
     */
    class ObservableArray extends ObservableProperty_1.default {
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
            this.value.splice(index, 1);
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
         * Устанавливает элемент в индексе массива
         * @param {T} item - элемент
         * @param {number} index - индекс
         * @deprecated Данный метод не рекомендуется к спользованию!
         */
        setItemAtIndex(item, index) {
            this.value[index] = item;
            this.notificate("change", [this.get()]);
            return this;
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
    exports.default = ObservableArray;
    });

    var ObservableArray = unwrapExports(ObservableArray_1);

    var ObservableBoolean_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Прослушиваемый булевый тип
     * @class ObservableBoolean
     * @augments {ObservableProperty<boolean>}
     */
    class ObservableBoolean extends ObservableProperty_1.default {
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
    exports.default = ObservableBoolean;
    });

    var ObservableBoolean = unwrapExports(ObservableBoolean_1);

    var Utils_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Утилиты
     *
     * @version 2.0 Рефракторинг и обновление утилит
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
            Object.keys(obj).sort().forEach(key => {
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
            if (window) {
                if (window.getSelection) {
                    if (window.getSelection().empty) { // Chrome
                        window.getSelection().empty();
                    }
                    else if (window.getSelection().removeAllRanges) { // Firefox
                        window.getSelection().removeAllRanges();
                    }
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
    exports.default = Utils;
    });

    unwrapExports(Utils_1);

    var ObservableDictionary_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });



    /**
     * Свойство словаря
     * @class ObservableDictionary
     * @template T
     */
    class ObservableDictionary extends ObservableProperty_1.default {
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
            return Guard.isNone(val) ? null : val;
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
            Utils_1.default.forEach(this.value, () => count++);
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
            Utils_1.default.forEach(this.value, iterator);
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
            Utils_1.default.forEach(this.value, (index, value1) => {
                if (value1 === value) {
                    searched = index;
                    return Utils_1.default.BREAK_FLAG;
                }
            });
            return searched;
        }
    }
    exports.default = ObservableDictionary;
    });

    var ObservableDictionary = unwrapExports(ObservableDictionary_1);

    var Time_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Модуль elyFlat для работы со временем
     * @class Time
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
         *
         * ```typescript
         *
         * Time.hoursString(5); // 5 часов
         * Time.hoursString(2); // 2 часа
         * ```
         *
         * @param {number} value - значение
         * @param {boolean} [isUpperFirstChar = false] - делает первую букву
         * величины закловной
         *
         * @return {string}
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
         *
         * ```typescript
         *
         * Time.minutesString(5); // 5 минут
         * Time.minutesString(2); // 2 минуты
         * ```
         *
         * @param {number} value - значение
         * @param {boolean} [isUpperFirstChar = false] - делает первую букву
         * величины закловной
         *
         * @return {string}
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
         *
         * ```typescript
         *
         * Time.secondsString(5); // 5 секунд
         * Time.secondsString(2); // 2 секунды
         * ```
         *
         * @param {number} value - значение
         * @param {boolean} [isUpperFirstChar = false] - делает первую букву
         * величины закловной
         *
         *
         * @return {string}
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
         *
         * ```typescript
         *
         * Time.daysString(5); // 5 дней
         * Time.daysString(2); // 2 дня
         * ```
         *
         * @param {number} value - значение
         * @param {boolean} [isUpperFirstChar = false] - делает первую букву
         * величины закловной
         *
         * @return {string}
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
         *
         * ```typescript
         *
         * Time.monthsString(5); // 5 месяцев
         * Time.monthsString(2); // 2 месяца
         * ```
         *
         * @param {number} value - значение
         * @param {boolean} [isUpperFirstChar = false] - делает первую букву
         * величины закловной
         *
         *
         * @return {string}
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
         *
         * ```typescript
         *
         * Time.yearsString(5); // 5 лет
         * Time.yearsString(2); // 2 года
         * ```
         *
         * @param {number} value - значение
         * @param {boolean} [isUpperFirstChar = false] - делает первую букву
         * величины закловной
         *
         * @return {string}
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
         * @return {ITimeDifferences}
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
         * @return {ITimeDifferences}
         *
         *
         * ```ts
         *
         * const d1 = Time.byDate(10, 1, 2019);
         * const d2 = Time.byDate(15, 1, 2019);
         *
         * const diff = d1.getDifference(d2);
         * const daysString = Time.daysString(diff.days); // 5 дней
         * ```
         */
        getDifference(time) {
            return Time.timeCodeToVars(Math.abs(this.getTime() - time.getTime()));
        }
        /**
         * Возвращает разницу времени
         *
         * @return {ITimeDifferences}
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
     *
     * - "Понедельник"
     * - "Вторник"
     * - "Среда"
     * - "Четверг"
     * - "Пятница"
     * - "Суббота"
     * - "Воскресение"
     *
     * @type {string[]}
     */
    Time.weekDaysList = [
        "Понедельник", "Вторник", "Среда",
        "Четверг", "Пятница", "Суббота", "Воскресение",
    ];
    /**
     * Список коротких названий дней недели
     *
     * - "Пн"
     * - "Вт"
     * - "Ср"
     * - "Чт"
     * - "Пт"
     * - "Сб"
     * - "Вс"
     *
     * @type {string[]}
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
    exports.default = Time;
    /**
     * @typedef {Object} ITimeDifferences
     * @property {number} days
     * @property {number} hours
     * @property {number} minutes
     * @property {number} seconds
     * @property {number} source
     */
    });

    unwrapExports(Time_1);

    var Timer_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: Timer.ts                                                             *
     * Файл изменен: 27.02.2019 05:10:21                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Таймер
     *
     * ```ts
     *
     * const timer = new Timer({duration: 10 * 1000}); // Таймер на 10 сек
     *
     * // Добавляем наблюдатель начала работы таймера
     * timer.addStartObserver( () => {
     *    console.log( "Go!" );
     * });
     *
     * // Добавляем наблюдатель окончания работы таймера
     * timer.addEndObserver( () => {
     *    console.log( "Time is up!" );
     * });
     *
     * // Запускаем таймер
     * timer.start();
     * ```
     *
     * @class {Timer}
     * @augments {Observable}
     */
    class Timer extends Observable_1.default {
        /**
         * Конструктор
         * @param {{ duration: number, loop: boolean | undefined }} props - свойства
         */
        constructor(props) {
            super();
            /**
             * Циклический таймер
             * @type {boolean}
             * @ignore
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
         * @param {function} o - наблюдатель
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
         * @param {function} o - наблюдатель
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
            this.notify("startTimer");
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
         * после выполнения метода, будет вызвано событие `endTimer`.
         * {@link Timer.addEndObserver}
         */
        stop(notificate = true) {
            if (this.__loop)
                clearInterval(this.__thread);
            else
                clearTimeout(this.__thread);
            if (notificate)
                this.notify("endTimer");
            this.__thread = null;
        }
    }
    exports.default = Timer;
    });

    unwrapExports(Timer_1);

    var EFMath_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: EFMath.ts                                                            *
     * Файл изменен: 06.01.2019 05:18:48                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Библиотека математики
     */
    class EFMath {
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
    exports.default = EFMath;
    });

    unwrapExports(EFMath_1);

    var ColorUtils_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.ColorUtils = ColorUtils;
    });

    unwrapExports(ColorUtils_1);
    var ColorUtils_2 = ColorUtils_1.ColorUtils;

    var Color_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: Color.ts                                                             *
     * Файл изменен: 27.02.2019 01:00:30                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });


    /**
     * Цвет
     * @class Color
     */
    class Color {
        /**
         * Конструктор
         * @param {{ __hex?: string, rgb?: IColorRGB, hsv?: IColorHSV }} props - параметры
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
                this.__hex = ColorUtils_1.ColorUtils.rgb2hex(props.rgb);
            else if (props.hsv)
                this.__hex = ColorUtils_1.ColorUtils.hsv2hex(props.hsv);
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
            return this.getByte() < (ColorUtils_1.ColorUtils.whiteNumber / 1.8);
        }
        /**
         * Возвращает байты цветов
         * @return {IColorRGB}
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
         * @param {{IColorRGB}} props
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
            rgb.red = Math.round(EFMath_1.default.map(val, 0, 255, rgb.red, 255));
            rgb.green = Math.round(EFMath_1.default.map(val, 0, 255, rgb.green, 255));
            rgb.blue = Math.round(EFMath_1.default.map(val, 0, 255, rgb.blue, 255));
            return new Color({ hex: "#" + ColorUtils_1.ColorUtils.rgb2hex(rgb) });
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
            rgb.red = Math.round(EFMath_1.default.map(val, 0, 255, rgb.red, 0));
            rgb.green = Math.round(EFMath_1.default.map(val, 0, 255, rgb.green, 0));
            rgb.blue = Math.round(EFMath_1.default.map(val, 0, 255, rgb.blue, 0));
            return new Color({ hex: "#" + ColorUtils_1.ColorUtils.rgb2hex(rgb) });
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
    exports.default = Color;
    });

    unwrapExports(Color_1);

    var SizeValue_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: SizeValue.ts                                                         *
     * Файл изменен: 27.03.2019 18:59:07                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Неизменяемый размер
     * @class {SizeConstValue}
     */
    class SizeConstValue {
        /**
         * Конструктор
         * @param {ISizeValueProps} props
         * @constructor
         */
        constructor(props = {}) {
            /**
             * @ignore
             * @protected
             */
            this.__width = 0;
            /**
             * @ignore
             * @protected
             */
            this.__height = 0;
            if (props.d) {
                this.__height = this.__width = 0;
            }
            else {
                this.__height = props.height || 0;
                this.__width = props.width || 0;
            }
        }
        /**
         * Возвращает значение ширины
         * @return {number}
         */
        width() {
            return this.__width;
        }
        /**
         * Возвращает значение высоты
         * @return {number}
         */
        height() {
            return this.__height;
        }
        /**
         * Создает значения
         * @return {SizeValue}
         */
        getValue() {
            return new SizeValue({ width: this.width(), height: this.height() });
        }
    }
    exports.SizeConstValue = SizeConstValue;
    /**
     * Размер
     * @class {SizeValue}
     */
    class SizeValue extends SizeConstValue {
        /**
         * Конструктор
         * @param {ISizeValueProps} props
         * @constructor
         */
        constructor(props = {}) {
            super(props);
            this.__width = 0;
            this.__height = 0;
        }
        /**
         * Возвращает сумму размеров
         * @param {...SizeConstValue} s
         * @return {SizeConstValue}
         */
        static getSum(...s) {
            const size = new SizeValue();
            s.forEach(sz => size.add({ s: sz }));
            return size.getConstValue();
        }
        /**
         * Устанавливает размер по диагонали
         * @param {number} d - значение диагонали
         */
        setDiagonal(d) {
            this.width(d);
            this.height(d);
            return this;
        }
        /**
         * Возвращает и устанавливает значение ширины
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        width(value) {
            if (value === undefined)
                return this.__width;
            this.__width = value;
            return this;
        }
        /**
         * Возвращает и устанавливает значение высоты
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        height(value) {
            if (value === undefined)
                return this.__height;
            this.__height = value;
            return this;
        }
        /**
         * Прибавляет значение к размеру
         * @param {{ width?: number, height?: number, s: SizeConstValue | SizeValue}} props - значения
         * @return {SizeValue}
         */
        add(props) {
            if (props.s) {
                this.width(this.height() + props.s.width());
                this.height(this.height() + props.s.height());
            }
            else {
                this.width(this.width() + (props.width || 0));
                this.height(this.height() + (props.height || 0));
            }
            return this;
        }
        /**
         * Умножает размеры и значения
         * @param {{ width?: number, height?: number, s: SizeConstValue | SizeValue}} props - значения
         * @return {SizeValue}
         */
        mul(props = {}) {
            if (props.s) {
                this.width(this.width() * props.s.width());
                this.height(this.height() * props.s.height());
            }
            else {
                Guard.variable(props.width, v => this.width(this.width() * v));
                Guard.variable(props.height, v => this.height(this.height() * v));
            }
            return this;
        }
        /**
         * Делит размеры и значения
         * @param {{ width?: number, height?: number, s: SizeConstValue | SizeValue}} props - значения
         * @return {SizeValue}
         */
        subdivide(props = {}) {
            if (props.s) {
                this.width(this.width() / props.s.width());
                this.height(this.height() / props.s.height());
            }
            else {
                Guard.variable(props.width, v => this.width(this.width() / v));
                Guard.variable(props.height, v => this.height(this.height() / v));
            }
            return this;
        }
        /**
         * Возвращает константный объект разницы
         * @param {VectorValue|VectorConstValue} s - вектор сравнения
         * @param {boolean} [abs = false] - абсолютные значения
         * @return {SizeConstValue}
         */
        getDiffs(s, abs = false) {
            if (abs)
                return new SizeConstValue({
                    height: Math.abs(this.height() - s.height()),
                    width: Math.abs(this.width() - s.width()),
                });
            return new SizeConstValue({ width: this.width() - s.width(), height: this.height() - s.height() });
        }
        /**
         * Возвращает true, если объекты идентичны
         * @param {SizeConstValue|SizeValue} s - вектор
         * @return {boolean}
         */
        equals(s) {
            return this.width() === s.width() && this.height() === s.height();
        }
        /**
         * Создает постоянные значения
         * @return {SizeConstValue}
         */
        getConstValue() {
            return new SizeConstValue({ width: this.width(), height: this.height() });
        }
    }
    exports.default = SizeValue;
    /**
     * @typedef {Object} ISizeValueProps
     * @property {number} [width = 0] - ширина
     * @property {number} [height = 0] - высота
     * @property {number} [d = 0] - диагональ
     */
    });

    unwrapExports(SizeValue_1);
    var SizeValue_2 = SizeValue_1.SizeConstValue;

    var VectorValue_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: VectorValue.ts                                                     *
     * Файл изменен: 27.03.2019 19:04:31                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Вектор с постоянными значениями
     * @class VectorConstValue
     */
    class VectorConstValue {
        /**
         * Конструктор
         * @param {IVectorValueProps} [props = {}]
         */
        constructor(props = {}) {
            /**
             * @ignore
             * @protected
             */
            this.__x = 0;
            /**
             * @ignore
             * @protected
             */
            this.__y = 0;
            /**
             * @ignore
             * @protected
             */
            this.__z = 0;
            this.__x = props.x || 0;
            this.__y = props.y || 0;
            this.__z = props.z || 0;
        }
        /**
         * Возвращает значение по оси X
         * @return {number}
         */
        x() {
            return this.__x;
        }
        /**
         * Возвращает значение по оси Y
         * @return {number}
         */
        y() {
            return this.__y;
        }
        /**
         * Возвращает значение по оси Z
         * @return {number}
         */
        z() {
            return this.__z;
        }
        /**
         * Создает векторные значения
         * @return {VectorValue}
         */
        getValue() {
            return new VectorValue({ x: this.x(), y: this.y(), z: this.z() });
        }
    }
    exports.VectorConstValue = VectorConstValue;
    /**
     * Значения вектора
     * @class VectorValue
     */
    class VectorValue extends VectorConstValue {
        /**
         * Возвращает сумму векторов
         * @param {...VectorConstValue} v
         * @return {VectorConstValue}
         */
        static getSum(...v) {
            const vec = new VectorValue();
            v.forEach(vc => vec.add({ v: vc }));
            return vec.getConstValue();
        }
        /**
         * Конструктор
         * @param {IVectorValueProps} [props = {}]
         */
        constructor(props = {}) {
            super(props);
        }
        /**
         * Возвращает и устанавливает значение по оси X
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        x(value) {
            if (value === undefined)
                return this.__x;
            this.__x = value;
            return this;
        }
        /**
         * Возвращает и устанавливает значение по оси Y
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        y(value) {
            if (value === undefined)
                return this.__y;
            this.__y = value;
            return this;
        }
        /**
         * Возвращает и устанавливает значение по оси Z
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        z(value) {
            if (value === undefined)
                return this.__z;
            this.__z = value;
            return this;
        }
        /**
         * Прибавляет значение к вектору
         * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
         * @return {VectorValue}
         */
        add(props = {}) {
            if (props.v) {
                this.x(this.x() + props.v.x());
                this.y(this.y() + props.v.y());
                this.z(this.z() + props.v.z());
            }
            else {
                this.x(this.x() + (props.x || 0));
                this.x(this.y() + (props.y || 0));
                this.x(this.z() + (props.y || 0));
            }
            return this;
        }
        /**
         * Умножает векторы и значения
         * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
         * @return {VectorValue}
         */
        mul(props = {}) {
            if (props.v) {
                this.x(this.x() * props.v.x());
                this.y(this.y() * props.v.y());
                this.z(this.z() * props.v.z());
            }
            else {
                Guard.variable(props.x, v => this.x(this.x() * v));
                Guard.variable(props.y, v => this.y(this.y() * v));
                Guard.variable(props.z, v => this.z(this.z() * v));
            }
            return this;
        }
        /**
         * Делит векторы и значения
         * @param {{ x?: number, y?: number, z?: number, v?: VectorValue | VectorConstValue }} props - значения
         * @return {VectorValue}
         */
        subdivide(props = {}) {
            if (props.v) {
                this.x(this.x() / props.v.x());
                this.y(this.y() / props.v.y());
                this.z(this.z() / props.v.z());
            }
            else {
                Guard.variable(props.x, v => this.x(this.x() / v));
                Guard.variable(props.y, v => this.y(this.y() / v));
                Guard.variable(props.z, v => this.z(this.z() / v));
            }
            return this;
        }
        /**
         * Возвращает константный объект разницы
         * @param {VectorValue|VectorConstValue} v - вектор сравнения
         * @param {boolean} [abs = false] - абсолютные значения
         * @return {VectorConstValue}
         */
        getDiffs(v, abs = false) {
            if (abs)
                return new VectorConstValue({
                    x: Math.abs(this.x() - v.x()),
                    y: Math.abs(this.y() - v.y()),
                    z: Math.abs(this.z() - v.z()),
                });
            return new VectorConstValue({ x: this.x() - v.x(), y: this.y() - v.y(), z: this.z() - v.z() });
        }
        /**
         * Возвращает true, если объекты идентичны
         * @param {VectorValue|VectorConstValue} v - вектор
         * @return {boolean}
         */
        equals(v) {
            return this.x() === v.x() && this.y() === v.y();
        }
        /**
         * Создает постоянные векторные значения
         * @return {VectorConstValue}
         */
        getConstValue() {
            return new VectorConstValue({ x: this.x(), y: this.y(), z: this.z() });
        }
    }
    exports.default = VectorValue;
    /**
     * @typedef {Object} IVectorValueProps
     * @property {number} [x = 0]
     * @property {number} [y = 0]
     * @property {number} [z = 0]
     */
    });

    unwrapExports(VectorValue_1);
    var VectorValue_2 = VectorValue_1.VectorConstValue;

    var efMath = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: EFMath.ts                                                            *
     * Файл изменен: 06.01.2019 05:18:48                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Библиотека математики
     */
    class EFMath {
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
    exports.default = EFMath;
    });

    unwrapExports(efMath);

    var Cookies_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: Cookies.ts                                                           *
     * Файл изменен: 27.02.2019 01:01:19                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Печеньки
     *
     * @deprecated Используйте {@link LocalStorage}
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
                d.setTime(d.getTime() + expires);
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
    exports.default = Cookies;
    });

    unwrapExports(Cookies_1);

    var LocalStorage_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: LocalStorage.ts                                                      *
     * Файл изменен: 27.03.2019 18:56:06                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });



    /**
     * Локальное хранилище
     * @class LocalStorage
     */
    class LocalStorage {
        /**
         * Создает локальное хранилище
         * @param {{ name: string }} props
         */
        constructor(props) {
            this.__name = props.name;
        }
        /**
         * Возвращает имя хранилища
         * @return {string}
         */
        getName() {
            return this.__name;
        }
        /**
         * Устанавливает значение локального хранилища
         * @param {string} name - имя переменной
         * @param {*} value - значение
         * @param {Time|number} [time] - срок хранения
         */
        set(name, value, time) {
            name = `${this.getName()}-${name}`;
            if (time && time instanceof Time_1.default)
                time = time.getTime();
            Cookies_1.default.set(name, JSON.stringify(value), { expires: time || 1000 * 60 * 60 * 24 * 356 });
            return this;
        }
        /**
         * Возвращает значение хранилища
         * @param {string} name
         * @return {*}
         */
        get(name) {
            name = `${this.getName()}-${name}`;
            return Guard.safeJsonParse(Cookies_1.default.get(name) || "", null);
        }
        /**
         * Удаляет переменную из локального хранилища
         * @param name
         */
        remove(name) {
            return this.set(name, null, -1);
        }
    }
    /**
     * Стандартное локальное хранилище
     * @type {LocalStorage}
     */
    LocalStorage.default = new LocalStorage({ name: "ef" });
    exports.default = LocalStorage;
    });

    var LocalStorage = unwrapExports(LocalStorage_1);

    var DeviceDetector_1 = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: DeviceDetector.ts                                                    *
     * Файл изменен: 27.02.2019 02:27:21                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });


    /**
     * Детектор устройств и системы
     * @class DeviceDetector
     */
    class DeviceDetector extends Observable_1.default {
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
         * @return {SizeConstValue}
         */
        getScreenSize() {
            return new SizeValue_1.SizeConstValue({
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
    exports.default = DeviceDetector;
    });

    var DeviceDetector = unwrapExports(DeviceDetector_1);

    var XLogger_1 = createCommonjsModule(function (module, exports) {
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
    Object.defineProperty(exports, "__esModule", { value: true });
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
            console.log(...obj);
        }
        static __error(...obj) {
            console.error(...obj);
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
    exports.default = XLogger;
    });

    unwrapExports(XLogger_1);

    var encrypt = createCommonjsModule(function (module, exports) {
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
     + Файл: encrypt.ts                                                     +
     + Файл создан: 23.11.2018 23:03:37                                           +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    Object.defineProperty(exports, "__esModule", { value: true });
    class Encrypt {
        /**
         * Кодирует строку ключем или общим ключем Encrypt.sharedKey
         *
         * @param str
         * @param decodeKey
         */
        static encodeString(str, decodeKey) {
            decodeKey = decodeKey || Encrypt.sharedKey;
            let enc = "";
            for (let i = 0; i < str.length; i++) {
                const a = str.charCodeAt(i);
                const b = a ^ decodeKey.charAt(i % decodeKey.length);
                enc = enc + String.fromCharCode(b);
            }
            return Encrypt.b64EncodeUnicode(enc);
        }
        /**
         * Декодирует строку ключем или общим ключем Encrypt.sharedKey
         *
         * @param str
         * @param decodeKey
         */
        static decodeString(str, decodeKey) {
            decodeKey = decodeKey || Encrypt.sharedKey;
            const decode = Encrypt.b64DecodeUnicode(str);
            if (decode === null)
                return null;
            str = decode;
            // str = Encrypt.b64DecodeUnicode(str);
            let dec = "";
            for (let i = 0; i < str.length; i++) {
                const a = str.charCodeAt(i);
                const b = a ^ decodeKey.charAt(i % decodeKey.length);
                dec = dec + String.fromCharCode(b);
            }
            return dec;
        }
        /**
         * Кодирует строку в base64
         * @param str
         */
        static b64EncodeUnicode(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
                // @ts-ignore
                return String.fromCharCode("0x" + p1);
            }));
        }
        /**
         * Декодирует base64 строку или возвращает null при неудаче
         * @param str
         */
        static b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            try {
                return decodeURIComponent(atob(str).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
            }
            catch (e) {
                return null;
            }
        }
    }
    /**
     * Ключ шифрования общего назначения.
     *
     * Ключ используется как стандартное значение для Encrypt.encodeString
     */
    Encrypt.sharedKey = "el292ySHa28r5edK5ey2XX2ToEn6cr22e4qyp5t";
    exports.default = Encrypt;
    });

    unwrapExports(encrypt);

    var bin = createCommonjsModule(function (module, exports) {
    /******************************************************************************
     *                                                                            *
     * ,--. o                   |    o                                            *
     * |   |.,---.,---.,---.    |    .,---.,---.                                  *
     * |   |||---'|   ||   |    |    ||   ||   |                                  *
     * `--' ``---'`---|`---'    `---'``   '`---|                                  *
     *            `---'                    `---'                                  *
     *                                                                            *
     * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
     * Mail: <diegoling33@gmail.com>                                              *
     *                                                                            *
     * Это программное обеспечение имеет лицензию, как это сказано в файле        *
     * COPYING, который Вы должны были получить в рамках распространения ПО.      *
     *                                                                            *
     * Использование, изменение, копирование, распространение, обмен/продажа      *
     * могут выполняться исключительно в согласии с условиями файла COPYING.      *
     *                                                                            *
     * Проект: ely.core                                                           *
     *                                                                            *
     * Файл: index.ts                                                             *
     * Файл изменен: 27.03.2019 18:32:29                                          *
     *                                                                            *
     ******************************************************************************/
    Object.defineProperty(exports, "__esModule", { value: true });

    exports.Guard = Guard;






    exports.Time = Time_1.default;

    exports.Timer = Timer_1.default;

    exports.Color = Color_1.default;

    exports.ColorUtils = ColorUtils_1.ColorUtils;



    exports.EFMath = efMath.default;





    exports.DeviceDetector = DeviceDetector_1.default;

    exports.Utils = Utils_1.default;

    exports.XLogger = XLogger_1.default;

    exports.Encrypt = encrypt.default;
    /**
     * Наблюдатели
     */
    const Observers = {
        Observable: Observable_1.default,
        ObservableArray: ObservableArray_1.default,
        ObservableBoolean: ObservableBoolean_1.default,
        ObservableDictionary: ObservableDictionary_1.default,
        ObservableProperty: ObservableProperty_1.default,
    };
    exports.Observers = Observers;
    /**
     * Значения
     */
    const Values = {
        SizeValue: SizeValue_1.default,
        VectorValue: VectorValue_1.default,
    };
    exports.Values = Values;
    /**
     * Запросы
     */
    const Requests = {
        SendFileRequest: SendFileRequest_1.default,
        SendJsonRequest: SendJsonRequest_1.default,
        URLRequest: URLRequest_1.default,
    };
    /**
     * Пользователь
     */
    const User = {
        LocalStorage: LocalStorage_1.default,
    };
    exports.User = User;
    /**
     * Запросы
     */
    const Web = {
        Requests,
    };
    exports.Web = Web;
    });

    unwrapExports(bin);
    var bin_1 = bin.Guard;
    var bin_2 = bin.Time;
    var bin_3 = bin.Timer;
    var bin_4 = bin.Color;
    var bin_5 = bin.ColorUtils;
    var bin_6 = bin.EFMath;
    var bin_7 = bin.DeviceDetector;
    var bin_8 = bin.Utils;
    var bin_9 = bin.XLogger;
    var bin_10 = bin.Encrypt;
    var bin_11 = bin.Observers;
    var bin_12 = bin.Values;
    var bin_13 = bin.User;
    var bin_14 = bin.Web;

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
     + Файл: efProtocol.ts                                                        +
     + Файл изменен: 08.01.2019 00:55:09                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

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
     + Файл: efSerializableProtocol.ts                                            +
     + Файл изменен: 07.01.2019 23:56:45                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Данные десериализации
     * @class DeserializeData
     */
    class DeserializeData {
        /**
         * Конструктор
         * @param props
         */
        constructor(props) {
            this.__ids = props.ids;
        }
        /**
         * Возвращает массив идетификаторов,
         * найденных при десериализации
         * @return {string[]}
         */
        getIds() {
            return Object.keys(this.__ids);
        }
        /**
         * Возвращает объект по идентификатору
         * @param {string} id
         * @template T
         * @return {T}
         */
        getById(id) {
            if (this.__ids.hasOwnProperty(id)) {
                return this.__ids[id];
            }
            return null;
        }
    }
    /**
     * Десериализует объект
     * @template T
     * @param {*} rawData
     * @return {T | null}
     */
    function deserializeWithData(rawData) {
        const ids = {};
        const body = ((raw) => {
            if (raw && typeof raw._item === "string") {
                const theObject = window.elyflatobjects[raw._item];
                if (theObject) {
                    if (theObject.willBeDeserialized)
                        theObject.willBeDeserialized(raw);
                    // const name = theObject.prototype.constructor.name;
                    const theId = raw._id;
                    Object.keys(raw).forEach(key => {
                        if (key === "_item")
                            return;
                        const val = raw[key];
                        if (val instanceof Array) {
                            val.forEach((a, i) => {
                                const res = body(a);
                                raw[key][i] = res ? res : a;
                            });
                        }
                        else {
                            if (val._item)
                                raw[key] = body(val);
                        }
                    });
                    const obj = new theObject.prototype.constructor(raw);
                    if (theId)
                        ids[theId] = obj;
                    return obj;
                }
                else {
                    bin_9.default.error(`[Serialization]: Не найден класс ${raw._item}!`);
                }
            }
            bin_9.default.error(`[Serialization]: Невозможно десериализовать объект! ${JSON.stringify(raw)}`);
        });
        const obj = body(rawData);
        if (obj)
            return { object: obj, data: new DeserializeData({ ids }) };
        return null;
    }
    /**
     * Десериализует объект
     * @template T
     * @param {*} raw
     * @param {*} raw
     * @return {T | null}
     */
    function deserialize(raw) {
        const result = deserializeWithData(raw);
        if (result)
            return result.object;
        return null;
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
    class elyObject extends bin_11.Observable {
        constructor() {
            super();
        }
        describe() {
            return Object.getOwnPropertyNames(this).filter((value, index$$1) => {
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
     + Файл: View.ts                                                              +
     + Файл изменен: 29.03.2019 23:18:14                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Объект отображения
     * @class View
     * @abstract
     */
    class View extends elyObject {
        /**
         * Конструктор
         * @param {ViewOptions} options
         * @protected
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
            this.hiddenProperty = new bin_11.ObservableBoolean(false);
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
            bin_1.variableAndSet(options.styleClickable, this.styleClickable, this);
            bin_1.variableAndSet(options.styleNoSelect, this.styleNoSelect, this);
            const wait = setInterval(() => {
                if (this.getRect().width) {
                    clearInterval(wait);
                    this.notificate("viewWillDraw", [this]);
                }
            }, 10);
        }
        /**
         * Создает пустой элемент View
         * @return {View}
         */
        static empty() {
            return new View();
        }
        /**
         * Создает линюю
         * @return {View}
         */
        static line() {
            return new View({ tag: "hr" });
        }
        /**
         * Создает пустую строку <br>
         * @return {View}
         */
        static breakLine() {
            return new View({ tag: "br" });
        }
        /**
         * Преобразует объект в элемент View
         * @param {*} obj
         * @return {View|null}
         */
        static fromObject(obj) {
            return deserialize(obj);
        }
        /**
         * Преобразует строку в элемент View
         * @param {string} str
         * @return {View|null}
         */
        static fromString(str) {
            return View.fromObject(bin_1.safeJsonParse(str));
        }
        /**
         * Загружает View объект через URL
         * @param {string} url - URL
         * @param {function(view: View | null, data: DeserializeData | null)} callback
         * @return {DeserializeData | null}
         */
        static loadView(url, callback) {
            new bin_14.Requests.URLRequest({ url }).send((response, result) => {
                if (result && response) {
                    const data = deserializeWithData(bin_1.safeJsonParse(response));
                    if (data)
                        callback(data.object, data.data);
                    else
                        callback(null, null);
                }
                else {
                    callback(null, null);
                }
            });
        }
        /**
         * Возвращает и устанавливает флаг стиля невозможности выделения
         * @param {boolean} [value] - значение
         * @returns {boolean|this|null}
         */
        styleNoSelect(value) {
            if (value === undefined)
                return this.hasClass("--no-select");
            if (value)
                this.addClass("--no-select");
            else
                this.removeClass("--no-select");
            return this;
        }
        /**
         * Возвращает и устанавливает флаг стиля "возможности нажатия"
         * @param {boolean} [value] - значение
         * @returns {boolean|this|null}
         */
        styleClickable(value) {
            if (value === undefined)
                return this.hasClass("--clickable");
            if (value)
                this.addClass("--clickable");
            else
                this.removeClass("--clickable");
            return this;
        }
        serialize() {
            const obj = {};
            if (this.styleClickable())
                obj.styleClickable = this.styleClickable();
            if (this.styleNoSelect())
                obj.styleNoSelect = this.styleNoSelect();
            return Object.assign({ _item: this.constructor.name }, obj);
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
            if (bin_1.isSet(value))
                this.notificate("hidden", [value]);
            return bin_11.ObservableProperty.simplePropertyAccess(this, value, this.hiddenProperty);
        }
        /**
         * Устанавливает css значение
         * @param style
         */
        css(style) {
            bin_8.forEach(style, (k, v) => {
                if (bin_1.isSet(v) && v !== null) {
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
        /**
         * Добавляет далюдатель: скрытие элемента
         *
         * Имя обсервера: hidden
         *
         * @param {function(hidden: boolean)} o - наблюдатель
         */
        addHiddenChangeObserver(o) {
            this.addObserver("hidden", o);
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
     * @typedef {boolean} [styleClickable]
     * @typedef {boolean} [styleNoSelect]
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
         * @param {{value: T}} props
         */
        constructor(props) {
            this.value = props.value;
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
         * @param {{value: string, custom?: boolean}} props
         */
        constructor(props) {
            super(props);
            this.custom = props.custom || false;
        }
        /**
         * Свой размер
         * @param {string|number} value
         * @type {Size}
         */
        static custom(value) {
            if (typeof value === "number")
                value = value.toString() + "px";
            return new Size({ value, custom: true });
        }
        /**
         * Возвращает размер по его названию
         * @param {string} name
         * @return {Size}
         */
        static byName(name) {
            return new Size({ value: name });
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
        /**
         * Список
         * @return {*}
         */
        static list() {
            return {
                default: Size.default,
                fill: Size.fill,
                large: Size.large,
                normal: Size.normal,
                small: Size.small,
                xlarge: Size.xlarge,
                xsmall: Size.xsmall,
                xxlarge: Size.xxlarge,
            };
        }
        /**
         * Сериализует объект
         * @return {string}
         */
        serialize() {
            return { _item: "Size", custom: this.custom, value: this.value };
        }
    }
    /**
     * Стандартный размер
     * @type {Size}
     */
    Size.default = new Size({ value: "normal" });
    /**
     * Основной размер, используемый в ely.flat
     * @type {Size}
     */
    Size.normal = new Size({ value: "regular" });
    /**
     * Размер во весь блок
     * @type {Size}
     */
    Size.fill = new Size({ value: "fill" });
    /**
     * Маленький размер
     * @type {Size}
     */
    Size.small = new Size({ value: "small" });
    /**
     * Очень маленький размер
     * @type {Size}
     */
    Size.xsmall = new Size({ value: "xsmall" });
    /**
     * Большой размер
     * @type {Size}
     */
    Size.large = new Size({ value: "large" });
    /**
     * Очень большой размер
     * @type {Size}
     */
    Size.xlarge = new Size({ value: "xlarge" });
    /**
     * Огромный размер
     * @type {Size}
     */
    Size.xxlarge = new Size({ value: "xxlarge" });

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
         * @param props
         */
        constructor(props) {
            super(props);
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
         * Список
         */
        static list() {
            return {
                danger: Style.danger,
                default: Style.default,
                info: Style.info,
                primary: Style.primary,
                success: Style.success,
                warning: Style.warning,
            };
        }
        /**
         * Свой стиль
         * @param name
         */
        static custom(name) {
            return new Style({ value: name });
        }
        /**
         * Возвраща стиль по имени
         * @param name
         */
        static byName(name) {
            return new Style({ value: name });
        }
        /**
         * Сериализует объект
         * @return {*}
         */
        serialize() {
            return { _item: "Style", value: this.value };
        }
    }
    /**
     * Стандартный стиль
     *
     * Элементарный сброс стиля
     */
    Style.default = new Style({ value: "default" });
    /**
     * Главный стиль
     *
     * Основной стиль подходит для важных элементов.
     */
    Style.primary = new Style({ value: "primary" });
    /**
     * Информативный стиль
     *
     * Основной стиль подходит для отображения информации, которая должна выделяться.
     */
    Style.info = new Style({ value: "info" });
    /**
     * Стиль предупреждения
     *
     * Стиль, особо концентрирующий внимание пользователя.
     */
    Style.warning = new Style({ value: "warning" });
    /**
     * Успешный стиль
     *
     * Стиль, говорящий об успешном завершении действия.
     */
    Style.success = new Style({ value: "success" });
    /**
     * Опасный стиль
     *
     * Стиль, ярко бросающийся в глаза. Подойдет для отметки ошибок.
     */
    Style.danger = new Style({ value: "danger" });

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
            Guard_1(options.textSize, value => this.textSize(value));
            Guard_1(options.textStyle, value => this.textStyle(value));
            Guard_1(options.textWeight, value => this.textWeight(value));
            Guard_1(options.textCenter, value => this.textCenter(value));
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
            const obj = Object.assign({}, super.serialize(), { text: this.text(), textCenter: this.textCenter() });
            if (this.textSize())
                obj.textSize = this.textSize().serialize();
            if (this.textStyle())
                obj.textStyle = this.textStyle().serialize();
            if (this.textWeight())
                obj.textWeight = this.textWeight().serialize();
            return obj;
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
            bin_1.variableAndSet(options.buttonSize, this.buttonSize, this);
            bin_1.variableAndSet(options.buttonStyle, this.buttonStyle, this, Style.primary);
            bin_1.variableAndSet(options.buttonRounded, this.buttonRounded, this);
            if (bin_1.isSet(options.click))
                this.click(() => {
                    options.click();
                });
            if (options.fill)
                this.fill();
        }
        static willBeDeserialized(obj) {
            if (typeof obj.buttonSize === "string")
                obj.buttonSize = Size.byName(obj.buttonSize);
            if (typeof obj.buttonStyle === "string")
                obj.buttonStyle = Style.byName(obj.buttonStyle);
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
            return Object.assign({}, super.serialize(), { buttonRounded: this.buttonRounded(), buttonSize: this.buttonSize().serialize(), buttonStyle: this.buttonStyle().serialize(), text: this.text() });
        }
    }
    /**
     * @typedef {Object} ButtonOptions
     * @property {String} [text = ""]
     * @property {Size} [buttonSize]
     * @property {Style} [buttonStyle]
     * @property {boolean} [buttonRounded = false]
     * @property {boolean} [fill = false]
     * @property {function()} [click]
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
                const opts = bin_8.filter(obj, (k) => {
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
                    bin_9.default.error("В объект Control может быть добавлен только элемент " +
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
            const index$$1 = this.__subviews.indexOf(view);
            if (index$$1 > -1) {
                const sub = this.__subviews[index$$1];
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
         * @param {value: string | number, custom: boolean} props
         */
        constructor(props) {
            super({ value: String(props.value) });
            this.custom = props.custom || false;
        }
        /**
         * Свой размер
         * @param value
         * @return {Weight}
         */
        static custom(value) {
            return new Weight({ value, custom: true });
        }
        /**
         * Возвращает размер по названию
         * @param {String} value
         * @return {Weight}
         */
        static byName(value) {
            return new Weight({ value });
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
        /**
         * Список
         */
        static list() {
            return {
                default: Weight.default,
                fat: Weight.fat,
                light: Weight.light,
                normal: Weight.normal,
                thin: Weight.thin,
            };
        }
        /**
         * Сериализует объект
         * @return {*}
         */
        serialize() {
            return { _item: "Weight", value: this.value, custom: this.custom };
        }
    }
    /**
     * Стандартная толщина ely.flat.application
     * @type {Weight}
     */
    Weight.default = new Weight({ value: "regular" });
    /**
     * Толщина, используемая общими стандартами
     * @type {Weight}
     */
    Weight.normal = new Weight({ value: "standard" });
    /**
     * Высокая толщина
     * @type {Weight}
     */
    Weight.fat = new Weight({ value: "fat" });
    /**
     * Толщина меньше стандартной
     * @type {Weight}
     */
    Weight.light = new Weight({ value: "light" });
    /**
     * Предельно низкая толщина
     * @type {Weight}
     */
    Weight.thin = new Weight({ value: "thin" });

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
     + Файл: ViewLayout.ts                                                        +
     + Файл изменен: 08.03.2019 21:20:52                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class ViewLayout
     * @augments {View}
     */
    class ViewLayout extends elyRebuildableViewProtocol {
        /**
         * Конструктор
         * @param {ViewLayoutOptions} [options] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Свойство: элементы отображения
             * @ignore
             * @protected
             */
            this.__itemsProperty = new ObservableArray().change(() => this.rebuild());
            this.denyRebuild(true);
            this.add(...(options.items || []));
            this.denyRebuild(false);
            if (!(options.nobuild))
                this.rebuild();
        }
        /**
         * Возвращает свойство: элементы отображения
         * @return {ObservableProperty<View[]>}
         */
        getItemsProperty() {
            return this.__itemsProperty;
        }
        /**
         * Возвращает и устанавливает элементы отображения
         * @param {View[]} [value] - значение
         * @returns {View[]|this|null}
         */
        items(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__itemsProperty);
        }
        /**
         * Добавляет элементы
         * @param items
         */
        add(...items) {
            items.forEach(value => this.getItemsProperty().push(value));
            return this;
        }
        /**
         * Сериализует объект
         */
        serialize() {
            return Object.assign({}, super.serialize(), { items: this.items().map(value => value.serialize()) });
        }
        /**
         * Выполняет перестроение
         * @private
         */
        __rebuild() {
            this.removeViewContent();
            this.getItemsProperty().forEach(item => {
                this.getDocument().append(item.getDocument());
            });
            return this;
        }
    }
    /**
     * @typedef {Object} ViewLayoutOptions
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
     + Файл: RowLayoutViews                                                   +
     + Файл изменен: 09.02.2019 16:35:37                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображение строка {@link GridLayoutView}
     * @class efGridLayoutRowView
     * @augments {View}
     */
    class RowLayoutView extends ViewLayout {
        /**
         * Конструктор
         * @param options
         */
        constructor(options = {}) {
            super(Object.assign({}, options, { nobuild: true }));
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
            this.__rowLengthProperty.change(() => this.rebuild());
            this.__rowItemsStaticSizeProperty.change(() => this.rebuild());
            this.denyRebuild(true);
            this.rowLength(24);
            this.rowItemsStaticSize(false);
            bin_1.variable(options.rowLength, () => this.rowLength(options.rowLength));
            bin_1.variable(options.rowItemsStaticSize, () => this.rowItemsStaticSize(options.rowItemsStaticSize));
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
         * Вставляет элементы в нужную позицию
         * @param index
         * @param view
         */
        insert(index$$1, ...view) {
            this.getItemsProperty().insert(index$$1, ...view);
            return this;
        }
        /**
         * Возвращает индекс элемента в строке
         * @param {View} view
         * @return {number}
         */
        indexOf(view) {
            return this.getItemsProperty().indexOf(view);
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
        removeIndex(index$$1) {
            this.getItemsProperty().remove(index$$1);
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
        viewAt(index$$1) {
            if (this.getItemsProperty().hasIndex(index$$1))
                return this.getItemsProperty().item(index$$1);
            return null;
        }
        /**
         * Возвращает колонку по индексу. Колонка - контейнер содержит элемент. Элемент
         * можно получить испльзуя метод `{@link RowLayoutView.viewAt}`
         *
         * @param {number} index
         * @return {View}
         */
        columnAt(index$$1) {
            if (this.getItemsProperty().hasIndex(index$$1))
                return this.__containers[index$$1];
            return null;
        }
        /**
         * Сериализует объект
         */
        serialize() {
            const _items = [];
            this.getItemsProperty().forEach(view => _items.push(view.serialize()));
            return Object.assign({}, super.serialize(), { items: _items });
        }
        /**
         * Выполняет перестроение
         * @ignore
         * @private
         */
        __rebuild() {
            this.removeViewContent();
            this.__containers = [];
            this.getItemsProperty().forEach((item) => {
                const container = new Control({ class: "ef-col" });
                let containerSize = (1 / this.rowLength()) * 100;
                if (!this.rowItemsStaticSize())
                    containerSize = 100 / (this.rowLength() / (this.rowLength() / this.getItemsProperty().length()));
                container.getStyle().width = containerSize + "%";
                container.addSubView(item);
                this.__containers.push(container);
                this.notify("itemWillAdd", item, container);
                this.getDocument().append(container.getDocument());
            });
            return this;
        }
    }
    /**
     * @typedef {ViewLayoutOptions} RowLayoutViewOptions
     * @property {number} [rowLength = 24]
     * @property {boolean} [rowItemsStaticSize = false]
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
            this.__rowsLengthProperty.change((val) => this.getRows().forEach(item => item.rowLength(val)));
            this.__rows.change(() => this.rebuild());
            this.denyRebuild(true);
            bin_1.variable(options.items, (value) => {
                if (value[0] && value[0] instanceof RowLayoutView)
                    for (const row of value)
                        this.getRows().push(row);
                else
                    for (const items of value)
                        this.add(...items);
            });
            this.rowsLength(24);
            bin_1.variableAndSet(options.rowsLength, this.rowsLength, this);
            this.denyRebuild(false);
            this.rebuild();
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
        rowAt(index$$1) {
            if (this.getRows().hasIndex(index$$1))
                return this.getRows().item(index$$1);
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
         * Серализует объект
         */
        serialize() {
            const _items = [];
            this.getRows().forEach(row => {
                _items.push(row.serialize());
            });
            return Object.assign({}, super.serialize(), { items: _items });
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
    /**
     * @typedef {Object} TGridSize
     * @property {number} columns
     * @property {number} rows
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
        constructor(props) {
            super();
            this.view = props.controllerMainView || new GridLayoutView();
        }
        /**
         * Сериализует объект
         */
        serialize() {
            return { _item: "GridViewController", controllerMainView: this.view.serialize() };
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
         * @param {} [props]
         */
        constructor(props = {}) {
            super(props);
            /**
             * Основной заголовок
             * @type {TextView}
             */
            this.titleView = new TextView({ class: "--title" });
            /**
             * Описание страницы
             * @type {TextView}
             */
            this.descriptionView = new TextView({ class: "--description" });
            const rows = this.view.getRows().get();
            this.view.getRows().clear();
            this.view.addClass("ef-simple-content");
            const headerView = new Control({ class: "--content-header" });
            this.titleView.textSize(Size.xlarge).textCenter(true);
            this.descriptionView.textCenter(true).textWeight(Weight.thin);
            headerView.addSubView(this.titleView);
            headerView.addSubView(this.descriptionView);
            this.view.add(headerView);
            bin_1.variableAndSet(props.title, this.title, this);
            bin_1.variableAndSet(props.description, this.description, this);
            rows.forEach((row) => this.view.getRows().push(row));
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
        /**
         * Сериализует объект
         */
        serialize() {
            const obj = super.serialize();
            obj._item = "SimplePageViewController";
            obj.title = this.title();
            obj.description = this.description();
            return obj;
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
                bin_9.default.log(`[ScreenController]: Отображение контроллера id:${controller}`);
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
            bin_9.default.log(`[ScreenController]: Добавлен контроллер: ${name} (${controller.constructor.name})`);
            if (this.items.hasOwnProperty(name)) {
                if (!this.items[name].canOverwrite)
                    return;
                this.items[name].controller = controller;
                this.items[name].canOverwrite = canOverwrite;
            }
            this.items[name] = { controller, canOverwrite };
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
            Guard_2(options.iconName, this.iconName, this, "refresh");
            Guard_2(options.iconSize, this.iconSize, this);
            Guard_2(options.iconStyle, this.iconStyle, this);
            Guard_2(options.iconWeight, this.iconWeight, this);
            Guard_2(options.spinning, this.spinning, this);
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
        getIconStyleProperty() {
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
            else
                this.removeClass("fa-spin");
            return this;
        }
        /**
         * Сериализует объект
         */
        serialize() {
            const obj = {};
            if (this.iconSize())
                obj.iconSize = this.iconSize().serialize();
            if (this.iconWeight())
                obj.iconWeight = this.iconWeight().serialize();
            if (this.iconSize())
                obj.iconStyle = this.iconStyle().serialize();
            if (this.spinning())
                obj.spinning = this.spinning();
            return Object.assign({}, super.serialize(), obj, { iconName: this.iconName() });
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
            this.__urlProperty = new ObservableProperty("").change((newValue) => this.getDocument().src = newValue);
            this.addClass("ef-image");
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
        /**
         * Сериализует объект
         */
        serialize() {
            const obj = {};
            if (this.url())
                obj.url = this.url();
            return Object.assign({}, super.serialize(), obj);
        }
    }
    /**
     * @typedef {Object} ImageViewOptions
     * @property {string} [url]
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
     + Файл: ProgressBarView.ts                                                   +
     + Файл изменен: 02.03.2019 02:19:54                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class ProgressBarView
     * @augments {View}
     */
    class ProgressBarView extends View {
        /**
         * Конструктор
         * @param {IProgressBarViewOptions} options - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Основной элемент
             * @ignore
             * @protected
             */
            this.__bodyView = new Control({ class: "ef-progress-bar" });
            /**
             * Контейнер
             * @ignore
             * @protected
             */
            this.__progressLineContainer = new ContainerView(new Control({ class: "ef-progress-line" }), { class: "ef-progress-container" });
            /**
             * Свойство: стиль полосы бара
             * @ignore
             * @protected
             */
            this.__progressBarStyleProperty = new ObservableProperty()
                .change((value, oldVal) => {
                if (this.getLineViewContainer() instanceof ContainerView) {
                    if (oldVal)
                        this.getLineViewContainer()
                            .getView().removeClass(`bg-${oldVal.value}`);
                    this.getLineViewContainer()
                        .getView().addClass(`bg-${value.value}`);
                }
            });
            /**
             * Свойство: максимальное значение
             * @ignore
             * @protected
             */
            this.__maxValueProperty = new ObservableProperty(100).change(value => {
                if (value < this.minValue())
                    this.maxValue(this.minValue());
                this.__update();
            });
            /**
             * Свойство: минимальное значение
             * @ignore
             * @protected
             */
            this.__minValueProperty = new ObservableProperty(0).change(value => {
                if (value > this.minValue())
                    this.minValue(this.maxValue());
                if (this.value() < value)
                    this.value(this.minValue());
                this.__update();
            });
            /**
             * Свойство: значение шкалы прогресса
             * @ignore
             * @protected
             */
            this.__valueProperty = new ObservableProperty(0).change(value => {
                if (value > this.maxValue())
                    this.value(this.maxValue());
                if (value < this.minValue())
                    this.value(this.minValue());
                this.__update();
            });
            this.addClass("ef-progress");
            this.getDocument().append(this.getBodyView().getDocument());
            this.getBodyView().getDocument().append(this.getLineViewContainer().getDocument());
            bin_1.variableAndSet(options.minValue, this.minValue, this, 0);
            bin_1.variableAndSet(options.maxValue, this.maxValue, this, 100);
            bin_1.variableAndSet(options.value, this.value, this, 0);
        }
        /**
         * Возвращает основной элемент, содержащий прогресс баг
         * @return {View}
         */
        getBodyView() {
            return this.__bodyView;
        }
        /**
         * Возвращает контейнер с элементом отображения
         * @return {ContainerView<View>}
         */
        getLineViewContainer() {
            return this.__progressLineContainer;
        }
        /**
         * Возвращает свойство: стиль полосы бара
         * @return {ObservableProperty<Style>}
         */
        getProgressBarStyleProperty() {
            return this.__progressBarStyleProperty;
        }
        /**
         * Возвращает и устанавливает стиль полосы бара
         * @param {Style} [value] - значение
         * @returns {Style|this|null}
         */
        progressBarStyle(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__progressBarStyleProperty);
        }
        /**
         * Возвращает свойство: максимальное значение
         * @return {ObservableProperty<number>}
         */
        getMaxValueProperty() {
            return this.__maxValueProperty;
        }
        /**
         * Возвращает и устанавливает максимальное значение
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        maxValue(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__maxValueProperty);
        }
        /**
         * Возвращает свойство: минимальное значение
         * @return {ObservableProperty<number>}
         */
        getMinValueProperty() {
            return this.__minValueProperty;
        }
        /**
         * Возвращает и устанавливает минимальное значение
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        minValue(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__minValueProperty);
        }
        /**
         * Возвращает свойство: значение шкалы прогресса
         * @return {ObservableProperty<number>}
         */
        getValueProperty() {
            return this.__valueProperty;
        }
        /**
         * Возвращает и устанавливает значение шкалы прогресса
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        value(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__valueProperty);
        }
        /**
         * Возвращает процентное соотношение значений
         * @return {number}
         */
        getPercentage() {
            return bin_6.map(this.value(), this.minValue(), this.maxValue(), 0, 100);
        }
        /**
         * Добавляет наблюдатель: при изменении значений прогресс бара
         *
         * Имя обсервера: changed
         *
         * @param {function(value: number, maxValue: number, minValue: number)} o - наблюдатель
         */
        addChangedObserver(o) {
            this.addObserver("changed", o);
            return this;
        }
        serialize() {
            return Object.assign({}, super.serialize(), { maxValue: this.maxValue(), minValue: this.minValue(), value: this.value() });
        }
        /**
         * Обновляет бар
         * @ignore
         * @private
         */
        __update() {
            this.notificate("changed", [this.value(), this.maxValue(), this.minValue()]);
            if (this.getLineViewContainer() instanceof ContainerView) {
                this.getLineViewContainer().getView().getStyle().width =
                    this.getPercentage() + "%";
            }
        }
    }
    /**
     * @typedef {Object} IProgressBarViewOptions
     * @property {Style} [progressBarStyle]
     * @property {number} [maxValue]
     * @property {number} [minValue]
     * @property {number} [value]
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
     + Файл: NavigationViewProgressBar.ts                                         +
     + Файл изменен: 02.03.2019 02:43:04                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Панель загрузки навигации
     * @class NavigationViewProgressBar
     * @augments {ProgressBarView}
     */
    class NavigationViewProgressBar extends ProgressBarView {
        /**
         * Конструктор
         * @param {IProgressBarViewOptions} [options = {}] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Свойство: стиль полосы бара
             * @ignore
             * @protected
             */
            this.__progressBarStyleProperty = new ObservableProperty()
                .change((value, oldVal) => {
                if (oldVal)
                    this.removeClass(`bg-${oldVal.value}`);
                this.addClass(`bg-${value.value}`);
            });
            this.removeViewContent();
            this.addClass("--progress-line");
        }
        /**
         * Обновляет бар
         * @ignore
         * @private
         */
        __update() {
            this.notificate("changed", [this.value(), this.maxValue(), this.minValue()]);
            this.getStyle().width = this.getPercentage() + "%";
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
             * Изображение
             * @protected
             * @ignore
             */
            this.__imageView = null;
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
            /**
             * Элемент загрузки
             * @protected
             * @ignore
             */
            this.__progressView = new NavigationViewProgressBar();
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
         * Изображение
         * @return {ImageView}
         */
        getImageView() {
            return this.__imageView;
        }
        /**
         * Возвращает и устанавливает путь до изображения в навигации
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        imageUrl(value) {
            if (value === undefined) {
                return this.getImageView() ? this.getImageView().url() : null;
            }
            if (value) {
                this.__imageView = new ImageView({ url: value });
            }
            else {
                this.__imageView = null;
            }
            return this.rebuild();
        }
        /**
         * Возвращает панель прогресса в панели навигации
         * @return {NavigationViewProgressBar|ProgressBarView}
         */
        getProgressView() {
            return this.__progressView;
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
            if (this.getImageView()) {
                const view = new Control({ tag: "li", class: "--item" });
                view.addClass("--image");
                view.getDocument().append(this.getImageView().getDocument());
                this.getDocument().append(view.getDocument());
            }
            this.getDocument().append(this.getTitleView().getDocument());
            this.getItems().forEach(item => {
                const view = new Control({ tag: "li", class: "--item" });
                view.addSubView(item);
                this.notificate("itemWillAdd", [item, view]);
                this.getDocument().append(view.getDocument());
            });
            this.getDocument().append(this.getProgressView().getDocument());
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
     + Файл: AppStylesheet.ts                                                     +
     + Файл изменен: 27.02.2019 01:47:53                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
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
            if (bin_1.isSet(props.file)) {
                bin_9.default.log("[AppConfig]: Загрузка конфигурации через URL...");
                bin_14.Requests.URLRequest.sendGET(props.file, {}, (response, status) => {
                    if (status) {
                        bin_8.mergeDeep(this, bin_1.safeJsonParse(response));
                    }
                    this.notify("loaded", status, this);
                });
            }
            else {
                if (props.data) {
                    bin_9.default.log("[AppConfig]: Загрузка конфигурации из данных...");
                    bin_8.mergeDeep(this, props.data);
                    this.notify("loaded", true, this);
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
            return new bin_4({ hex: this.getNavigationBarColorString() });
        }
        /**
         * Возвращает основной цвет приложения
         * @return {Color}
         */
        getAppColor() {
            return new bin_4({ hex: this.getAppColorString() });
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
            bin_1.variableAndSet(options.editable, this.editable, this);
            bin_1.variableAndSet(options.placeholder, this.placeholder, this);
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
         * Сериализует объект
         */
        serialize() {
            const obj = {};
            if (this.placeholder())
                obj.placeholder = this.placeholder();
            if (this.value())
                obj.value = this.value();
            return Object.assign({}, super.serialize(), obj, { editable: this.editable() });
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
     + Файл: TextAreaFieldField.ts                                                      +
     + Файл изменен: 09.02.2019 21:45:17                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Поле воода многострочного текста
     * @class TextAreaField
     * @augments {TextField}
     */
    class TextAreaField extends Field {
        /**
         * Конструктор
         * @param {TextAreaFieldOptions} options - опции
         */
        constructor(options = {}) {
            super(options);
            this.addClass("ef-textarea");
            this.getAccessory().onchange = () => this.value(this.getAccessory().value);
            this.getAccessory().oninput = (e) => this.notificate("input", [this.getAccessory().value, e]);
            this.valueProperty.change((value) => this.getAccessory().value = value);
            this.rowsCount(5);
            bin_1.variable(options.value, (v) => this.value(v));
            bin_1.variable(options.rowsCount, (v) => this.rowsCount(v));
            bin_1.variable(options.readonly, (v) => this.readonly(v));
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
     * @typedef {TextFieldOptions} TextAreaFieldOptions
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
            this.__textArea = new TextAreaField({ readonly: true });
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
     + Файл: AppDocumentHead.ts                                                   +
     + Файл изменен: 30.01.2019 01:54:59                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Документ: Заголовок
     * @class AppDocumentHead
     * @augments {View}
     */
    class AppDocumentHead extends View {
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
         * @return {AppDocumentHead}
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
         * @return {AppDocumentHead}
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
         * @return {AppDocumentHead}
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
         * @return {AppDocumentHead}
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
            this.__head = new AppDocumentHead();
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
         * @return {AppDocumentHead}
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
            bin_9.default.log("[SingleApp] Инициилизация single app контроллера");
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
            this.__appColor = bin_4.black();
            /**
             * Цвет навигации
             * @protected
             * @ignore
             */
            this.__navigationBarColor = bin_4.black();
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
            bin_9.default.log(`[AppColorManager]: Смена цвета навигации: ${color.toString()}. ` +
                `Темынй: ${color.isDarker() ? "YES" : "NO"}`);
            const isDarkerColor = color.isDarker();
            const borderColor = isDarkerColor ? color.getLighterColor(0.3) : color.getDarkerColor(0.05);
            const textColor = isDarkerColor ? bin_4.white() : new bin_4({ hex: "#555555" });
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
    class AppFileWatcher extends bin_11.Observable {
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
                bin_1.variable(options.fixedPosition, value => this.fixedPosition(value));
                bin_1.variable(options.preloaderStyle, value => this.preloaderStyle(value));
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
            /**
             * Контроллер экранов
             * @protected
             * @ignore
             */
            this.__applicationScreenController = new ScreenController();
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
            this.containerView.addSubView(this.getApplicationScreenController().view);
            this.containerView.addSubView(this.footerView);
        }
        /**
         * Возвращает стандартный объект приложения
         * @param closure
         */
        static loadApplication(closure) {
            bin_9.default.log("Загрузка приложения...");
            AppConfig.default.addLoadedObserver((result, cfg) => {
                console.log(cfg);
                if (!result)
                    bin_9.default.error("Файл конфигурации не найден. " +
                        "Будет использована стандратная конфигурация.");
                else
                    bin_9.default.log("Файл конфигурации успешно загружен.");
                // Распознание текущего устройства
                DeviceDetector.default.addDetectedObserver(() => Application.default.init(cfg));
                DeviceDetector.default.detect();
            });
            if (SingleApp.isUsesSingle()) {
                bin_9.default.log("Загрузка single версии приложения...");
                SingleApp.initApplication((vc) => {
                    SingleApp.applicationInitFunction((cfg) => {
                        Application.default.addReadyObserver(next => {
                            Application.default.getApplicationScreenController().addControllerName("index", vc);
                            next(true);
                        });
                        AppConfig.default.load({ data: cfg });
                    })(vc);
                });
            }
            else {
                bin_9.default.log("Загрузка конфигурации: " + AppConfig.appConfigPath);
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
         * Возвращает контроллер экранов приложения
         * @return {ScreenController}
         */
        getApplicationScreenController() {
            return this.__applicationScreenController;
        }
        /**
         * Инициилизирует приложение
         * @param {AppConfig} config
         */
        init(config) {
            this.__applicationConfig = config;
            this.applyConfiguration(config);
            this.notificate("ready", [(flag, message) => {
                    bin_9.default.log(`---> Запуск загрузчика ${this.readySignalsShouldBeReceived}`);
                    bin_9.default.log(`[~~] Загрузчик передал флаг ${flag ? "true" : "false"} (${message})`);
                    if (!flag) {
                        this.getApplicationLoaderView().getIconView()
                            .iconName("times")
                            .spinning(false);
                        this.getApplicationLoaderView().title(message || "Загрузка была остановлена...");
                        throw Error("Остановка приложения...");
                        return;
                    }
                    this.readySignalsShouldBeReceived--;
                    bin_9.default.log("[OK] Загрузчик обработан. Осталось: " + this.readySignalsShouldBeReceived);
                    if (this.readySignalsShouldBeReceived === 0) {
                        if (this.getApplicationConfig().manifest.useContentController) {
                            __applyElyOneActions(this);
                        }
                        this.getApplicationScreenController().present("index");
                        this.getApplicationLoaderView().hidden(true);
                    }
                }]);
        }
        /**
         * Применяет конфигурацию
         * @param config
         */
        applyConfiguration(config) {
            bin_9.default.log("~~~> Применение конфигурации");
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
                        this.getApplicationScreenController().present(config.contentController.defaultContentId);
                    });
                config.navigationBar.items.forEach((value) => {
                    value.item = value.item || "LinkTextView";
                    this.getApplicationNavigationView().addView(Control.fromObject(value));
                });
                if (config.navigationBar.imageUrl) {
                    this.getApplicationNavigationView().imageUrl(config.navigationBar.imageUrl);
                    if (config.manifest.useContentController)
                        this.getApplicationNavigationView().getImageView().addObserver("click", () => {
                            this.getApplicationScreenController().present(config.contentController.defaultContentId);
                        });
                }
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
                    app.getApplicationScreenController().present("index");
                    break;
                default:
                    app.getApplicationScreenController().present(arg);
            }
        };
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
            bin_14.Requests.URLRequest.sendGET(this.getHost() + ":" + this.getPort() + "/db/" + method, data, response => {
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
         * @param {{value: string}} props
         */
        constructor(props) {
            super(props);
        }
        /**
         * Тип по имени
         * @param value
         */
        static byName(value) {
            if (typeof value === "number")
                value = value.toString() + "px";
            return new TextFieldType({ value });
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
        /**
         * Список
         */
        static list() {
            return {
                mail: TextFieldType.mail,
                number: TextFieldType.number,
                password: TextFieldType.password,
                text: TextFieldType.text,
            };
        }
        /**
         * Сериализует объект
         * @return {*}
         */
        serialize() {
            return { _item: "TextFieldType", value: this.value };
        }
    }
    /**
     * Текст
     */
    TextFieldType.text = new TextFieldType({ value: "text" });
    /**
     * Пароль
     */
    TextFieldType.password = new TextFieldType({ value: "password" });
    /**
     * Число
     */
    TextFieldType.number = new TextFieldType({ value: "number" });
    /**
     * Почта
     */
    TextFieldType.mail = new TextFieldType({ value: "mail" });

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
            bin_1.variable(options.value, () => this.value(options.value));
            bin_1.variable(options.fieldType, () => this.fieldType(options.fieldType));
            bin_1.variable(options.rightIconName, (v) => this.setRightIcon(v));
            bin_1.variable(options.leftIconName, (v) => this.setLeftIcon(v));
        }
        static willBeDeserialized(obj) {
            if (typeof obj.fieldType === "string")
                obj.fieldType = TextFieldType.byName(obj.fieldType);
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
         * Возвращает и устанавливает имя правой иконки
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        rightIconName(value) {
            if (value === undefined) {
                if (this.getRightIconView())
                    return this.getRightIconView().getView().iconName();
                return null;
            }
            if (value === "")
                this.removeRightIcon();
            else
                this.setRightIcon(value);
            return this;
        }
        /**
         * Возвращает и устанавливает имя левой иконки
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        leftIconName(value) {
            if (value === undefined) {
                if (this.getLeftIconView())
                    return this.getLeftIconView().getView().iconName();
                return null;
            }
            if (value === "")
                this.removeLeftIcon();
            else
                this.setLeftIcon(value);
            return this;
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
         * Сериализует объект
         */
        serialize() {
            const obj = {};
            if (this.getRightIconView())
                obj.rightIconName = this.getRightIconView().getView().iconName();
            if (this.getLeftIconView())
                obj.leftIconName = this.getLeftIconView().getView().iconName();
            return Object.assign({}, super.serialize(), obj, { fieldType: this.fieldType().serialize() });
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
            bin_1.variable(options.leftLabel, () => this.setLeftLabel(options.leftLabel));
            bin_1.variable(options.rightLabel, () => this.setRightLabel(options.rightLabel));
            bin_1.variable(options.title, () => this.setLeftLabel(options.title));
            bin_1.variable(options.value, () => this.value(options.value));
            bin_1.variable(options.switchStyle, () => this.switchStyle(options.switchStyle));
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
            return this.__setLabel(this.__leftLabel, view);
        }
        /**
         * Устанавливает лейбл справа
         * @param {string|View} view
         * @return {this}
         */
        setRightLabel(view) {
            return this.__setLabel(this.__rightLabel, view);
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
         * Возвращает и устанавливает левый заголовок
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        leftLabel(value) {
            if (value === undefined) {
                if (this.getLeftLabel())
                    return this.getLeftLabel().getDocument().innerText;
                return null;
            }
            this.setLeftLabel(value);
            return this;
        }
        /**
         * Возвращает и устанавливает правый заголовок
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        rightLabel(value) {
            if (value === undefined) {
                if (this.getRightLabel())
                    return this.getRightLabel().getDocument().innerText;
                return null;
            }
            this.setRightLabel(value);
            return this;
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
        serialize() {
            const obj = {};
            if (this.leftLabel())
                obj.leftLabel = this.leftLabel();
            if (this.rightLabel())
                obj.rightLabel = this.rightLabel();
            if (this.switchStyle())
                obj.switchStyle = this.switchStyle();
            return Object.assign({}, super.serialize(), obj);
        }
        /**
         * Устанавливает заголовок переключателья
         * @param label
         * @param value
         * @private
         */
        __setLabel(label, value) {
            if (typeof value === "string") {
                if (value === "")
                    label.set(null);
                else {
                    value = new TextView({ text: value });
                    label.set(value);
                }
            }
            else {
                label.set(value);
            }
            return this;
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
     + Файл: GroupedDataField.ts                                                  +
     + Файл изменен: 15.03.2019 20:07:19                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения: сгрупированное поле.
     *
     * Временно поддерживается только тип string.
     *
     * @class GroupedDataField
     * @augments {View}
     */
    class GroupedDataField extends Field {
        /**
         * Конструктор
         * @param {GroupedDataFieldOptions} [options] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Поля
             */
            this.__fields = [];
            this.addClass("ef-input", "ef-input-group");
            this.removeViewContent();
            // this.valueProperty.removeAllObservers("change");
            // this.valueProperty.change(a => {
            //     a.forEach((value, index) => this.getFieldsOnly()[index].field!.value(value));
            // });
            this.editableProperty.removeAllObservers("change");
            this.editableProperty.change(value => {
                this.getFieldsOnly().forEach(field => field.field.editable(value));
            });
            if (options.items) {
                options.items.forEach(item => {
                    if (item instanceof Field)
                        this.addField(item);
                    else
                        this.addBlock(item);
                });
                this.rebuild();
            }
            bin_1.variableAndSet(options.value, this.value, this);
        }
        /**
         * Возвращает элемент управления
         * @deprecated Объект GroupedDataField не имеет элемента управления
         */
        getAccessory() {
            return this.__accessoryView;
        }
        /**
         * Добавляет поле
         * @param {Field<*>} field - поле
         * @param {number} percentage - дробное значение - процент места в строке
         *
         * @return {GroupedDataField}
         */
        addField(field, percentage) {
            field.change(() => this.value(this.getValuesArray()));
            field.addInputObserver(value => {
                this.notificate("input", [this.getFieldsOnly().map(f => {
                        if (f.field === field)
                            return value;
                        else
                            return f.field.value();
                    })]);
            });
            this.__fields.push({ field, percentage });
            return this.rebuild();
        }
        /**
         * Возвращает массив значений
         */
        getValuesArray() {
            return this.getFieldsOnly().map(item => {
                if (bin_1.isSet(item.field.value()))
                    return item.field.value();
                else
                    return null;
            });
        }
        /**
         * Добавляет блок отображения
         * @param {View} content
         * @return {GroupedDataField}
         */
        addBlock(content) {
            this.__fields.push({ block: content });
            return this.rebuild();
        }
        /**
         * Возаращает массив всех полей и элементов в группе
         * @return {GroupedDataFieldItem[]}
         */
        getFieldsAndBlocks() {
            return this.__fields;
        }
        /**
         * Возвращает только поля в группе
         * @return {GroupedDataFieldItem[]}
         */
        getFieldsOnly() {
            return this.__fields.filter(a => bin_1.isSet(a.field));
        }
        /**
         * Выполняет перестроение элемента
         * @return {GroupedDataField}
         */
        rebuild() {
            this.removeViewContent();
            const percentageMode = this.__fields.every(value => bin_1.isSet(value.percentage) || bin_1.isSet(value.block));
            this.__fields.forEach(field => {
                if (field.field) {
                    this.getDocument().append(field.field.getAccessory());
                    if (percentageMode) {
                        field.field.getAccessory().style.width = (field.percentage * 100) + "%";
                    }
                    else {
                        field.field.getAccessory().style.width = (100 / this.getFieldsOnly().length) + "%";
                    }
                }
                if (field.block) {
                    const view = new Control({ class: "ef-input-block" });
                    view.addSubView(field.block);
                    this.getDocument().append(view.getDocument());
                }
            });
            return this;
        }
        /**
         * Добавляет наблюдатель ввода
         *
         * Имя наблюдатель: input
         *
         * @param {function(values: *[])} o
         * @return {GroupedDataField}
         */
        addInputObserver(o) {
            return this.addObserver("input", o);
        }
        /**
         * Возвращает true, если все элементы прошли валидацию
         * @return {boolean}
         */
        isValid() {
            return this.getFieldsOnly().every(f => f.field.isValid());
        }
    }
    /**
     * @typedef {Object} GroupedDataFieldOptions
     * @property {boolean} [first]
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
     + Файл: BoxView.ts                                                           +
     + Файл изменен: 08.03.2019 20:11:59                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class BoxView
     * @augments {View}
     */
    class BoxView extends View {
        /**
         * Конструктор
         * @param {BoxViewOptions} options - опции
         */
        constructor(options = {}) {
            super(options);
            this.addClass("box");
            this.__containerView = options.containerView ?
                options.containerView : new GridLayoutView();
            this.getContainerView().addClass("--container");
            this.getDocument().append(this.getContainerView().getDocument());
            bin_1.variableAndSet(options.boxHover, this.boxHover, this, true);
        }
        /**
         * Возвращает и устанавливает флаг анимации при наведении
         * @param {boolean} [value] - значение
         * @returns {boolean|this|null}
         */
        boxHover(value) {
            if (value === undefined)
                return this.hasClass("--hover");
            if (value)
                this.addClass("--hover");
            else
                this.removeClass("--hover");
            return this;
        }
        /**
         * Возвращает контейнер элемента
         * @return {GridLayoutView}
         */
        getContainerView() {
            return this.__containerView;
        }
        /**
         * Сериализует элемент
         */
        serialize() {
            return Object.assign({}, super.serialize(), { containerView: this.getContainerView().serialize() });
        }
    }
    /**
     * @typedef {Object} BoxViewOptions
     * @property {GridLayoutView} [container] - контейнер
     * @property {boolean} [boxHover] - анимация тени при наведении
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
     + Файл: SelectField.ts                                                       +
     + Файл изменен: 14.03.2019 01:36:41                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент подсказок
     */
    class SelectFieldHintView extends BoxView {
        /**
         * Конструктор
         * @param field
         */
        constructor(field) {
            super({ boxHover: false, styleNoSelect: true });
            this.__field = field;
            this.addClass("--hint");
            this.hidden(true);
            this.getField().getAccessory().onfocus = () => this.addClass("--focus");
            this.getField().getAccessory().onblur = () => this.removeClass("--focus");
        }
        /**
         * Обновляет элемент
         * @param {string} q - введенное значение для фильтра подсказок
         * @return {string[]} - результаты поиска
         */
        update(q) {
            q = q || "";
            const results = [];
            this.width(this.getField().getRect().width - 2);
            this.getContainerView().getRows().clear();
            this.getField().forEachItem((key, value, index$$1) => {
                if (index$$1 > this.getField().maxHintsCount())
                    return;
                if (key.toLowerCase().indexOf(q.toLowerCase()) === -1)
                    return;
                const textView = key.textView();
                this.getContainerView().add(textView);
                this.getContainerView().getRows().last().addClickObserver(() => {
                    this.getField().value(value);
                });
                results.push(key);
            });
            return results;
        }
        /**
         * Возвращает поле подсказки
         * @return {SelectField<*>}
         */
        getField() {
            return this.__field;
        }
    }
    /**
     * Элемент отображения
     * @class SelectField
     * @template {T}
     * @augments {Field<T>}
     */
    class SelectField extends Field {
        /**
         * Конструктор
         * @param {SelectFieldOptions} [options] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Свойство: элементы выбора
             * @ignore
             * @protected
             */
            this.__itemsProperty = new ObservableDictionary();
            /**
             * Элемент иконки
             * @ignore
             */
            this.__iconContainer = new ContainerView(new IconView({ iconName: "search" }));
            /**
             * Свойство: максимальное количество подсказок
             * @ignore
             * @protected
             */
            this.__maxHintsCount = 7;
            this.addClass("ef-input", "ef-selection", "with-suffix");
            this.__hintView = new SelectFieldHintView(this);
            this.getIconViewContainer().addClass("ef-input-suffix");
            this.getIconViewContainer().styleClickable(true);
            this.getIconViewContainer().addClickObserver(() => {
                this.__editableLogic();
            });
            this.getHintView().addHiddenChangeObserver(hidden => {
                if (!hidden)
                    this.addClass("--with-hint");
                else
                    this.removeClass("--with-hint");
            });
            this.editable(false);
            this.getAccessory().ondblclick = () => {
                this.__editableLogic();
            };
            this.getAccessory().oninput = (e) => {
                this.search(this.getAccessory().value, true);
            };
            this.valueProperty.change((value, oldVal) => {
                const key = this.getKeyForValue(value);
                if (bin_1.isSet(key)) {
                    this.getAccessory().value = key;
                    this.__disableLogic();
                }
            });
            this.getDocument().append(this.getIconViewContainer().getDocument());
            this.getDocument().append(this.getHintView().getDocument());
            bin_1.variable(options.value, () => this.value(options.value));
            bin_1.variableAndSet(options.items, this.items, this);
            bin_1.variableAndSet(options.maxHintsCount, this.maxHintsCount, this, 7);
        }
        /**
         * Устанавливает элементы из массива
         * @param {T[]} arr
         */
        setItemsByArray(arr) {
            const obj = {};
            arr.forEach((value, index$$1) => obj[value] = index$$1);
            return this.items(obj);
        }
        /**
         * Возвращает и устанавливает максимальное количество подсказок
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        maxHintsCount(value) {
            if (value === undefined)
                return this.__maxHintsCount;
            this.__maxHintsCount = value;
            return this;
        }
        /**
         * Выполняет поиск
         *
         * @param {string} str
         * @param {boolean} [complete = true]
         * @return {SelectField<T>>}
         */
        search(str, complete = true) {
            this.getHintView().hidden(false);
            const results = this.getHintView().update(str);
            if (complete && results.length === 1) {
                this.trySelectByKey(results[0]);
            }
            else if (complete) {
                for (const resKey of results)
                    if (str.toLowerCase() === resKey.toLowerCase())
                        this.trySelectByKey(resKey);
            }
            return this;
        }
        /**
         * Устанавливает элемент по его ключу и возвращает результат
         * @param {string} key
         * @return {boolean}
         */
        trySelectByKey(key) {
            const val = this.getValueForKey(key);
            if (bin_1.isSet(val)) {
                this.value(val);
                return true;
            }
            return false;
        }
        /**
         * Возвращает элемент отображения подсказок
         * @return {SelectFieldHintView}
         */
        getHintView() {
            return this.__hintView;
        }
        /**
         * Возвращает контейнер с иконки
         * @return {ContainerView<IconView>}
         */
        getIconViewContainer() {
            return this.__iconContainer;
        }
        /**
         * Возвращает свойство: элементы выбора
         * @return {ObservableDictionary<T>}
         */
        getItemsProperty() {
            return this.__itemsProperty;
        }
        /**
         * Возвращает и устанавливает элементы выбора
         * @param {T} [value] - значение
         * @returns {{T}}|this|null}
         */
        items(value) {
            if (value && value instanceof Array)
                return this.setItemsByArray(value);
            return ObservableProperty.simplePropertyAccess(this, value, this.__itemsProperty);
        }
        /**
         * Добавляет элемент
         * @param {string} key
         * @param {T} value
         * @return {SelectField<T>}
         */
        addItem(key, value) {
            this.getItemsProperty().add(key, value);
            return this;
        }
        /**
         * Цикл по элемента
         * @param {function(key: string, value: T, index: number)} closure
         * @return {SelectField<T>}
         */
        forEachItem(closure) {
            this.getItemsProperty().getSorted((a, b) => a[0] > b[0] ? 1 : -1).forEach(closure);
            return this;
        }
        /**
         * Возвращает ключ для значения
         * @param {T} value
         * @return {string|null}
         */
        getKeyForValue(value) {
            const key = this.getItemsProperty().keyOf(value);
            return bin_1.isSet(key) ? key : null;
        }
        /**
         * Возвращает значение для ключа
         * @param {string} key
         * @return {T|null}
         */
        getValueForKey(key) {
            const val = this.getItemsProperty().item(key);
            return bin_1.isSet(val) ? val : null;
        }
        /**
         * Логика отключения поля
         * @ignore
         * @private
         */
        __disableLogic() {
            this.editable(false);
            this.getHintView().hidden(true);
            this.getIconViewContainer().getView().iconName("search");
            if (bin_1.isSet(this.value()))
                this.getAccessory().value = this.getKeyForValue(this.value());
            else
                this.getAccessory().value = "";
        }
        /**
         * Логика редактирования
         * @ignore
         * @private
         */
        __editableLogic() {
            if (this.getHintView().hidden()) {
                this.getAccessory().value = "";
                this.editable(true);
                this.getAccessory().focus();
                this.search(this.getAccessory().value);
                this.getIconViewContainer().getView().iconName("times");
            }
            else {
                this.__disableLogic();
            }
        }
    }
    /**
     * @typedef {FieldOptions} SelectFieldOptions
     * @template {T}
     * @property {T} [value]
     * @property {string} [placeholder]
     * @property {string} [selectedKey]
     * @property {number} [maxHintsCount]
     * @property {T[]|{{}}} [items]
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
     + Файл: DictionaryDataField.ts                                               +
     + Файл изменен: 15.03.2019 20:01:40                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class DictionaryDataField
     * @augments {View}
     * @template {T} - тип данных значения
     */
    class DictionaryDataField extends Field {
        /**
         * Конструктор
         * @param {DictionaryDataFieldOptions} [options] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Строки
             */
            this.__rows = new ObservableArray().change(() => {
                const rows = this.getGroupDataFieldsProperty().get();
                this.removeViewContent();
                rows.forEach((row) => this.getDocument().append(row.getDocument()));
                this.getDocument().append(this.getAddButton().getDocument());
            });
            /**
             * Кнопка
             */
            this.__addRowButton = new Button({ text: "Добавить", buttonSize: Size.fill, buttonStyle: Style.default });
            this.addClass("ef-dictionary-input");
            this.getAddButton().click(() => {
                this.addNewRows(1);
            });
            this.addNewRows(1);
            this.getGroupDataFieldsProperty().addRemoveObserver(() => this.value(this.getValuesObject()));
            this.getGroupDataFieldsProperty().addClearObserver(() => this.value(this.getValuesObject()));
        }
        /**
         * Создаёт строку словаря
         * @param {DictionaryDataField} field
         * @param {*} options
         * @return {GroupedDataField}
         */
        static createDictionaryGroupDataField(field, options = {}) {
            const gdf = new GroupedDataField();
            const gdfRemoveButton = new IconView({ styleNoSelect: true, styleClickable: true, iconName: "times" });
            gdfRemoveButton.addClickObserver(() => field.getGroupDataFieldsProperty().removeItem(gdf));
            gdf.addField(new TextField({ placeholder: "Key" }));
            gdf.addField(new TextField({ placeholder: "Value" }));
            gdf.addBlock(gdfRemoveButton);
            return gdf;
        }
        /**
         * Добавляет новые строки
         * @param {number} [count = 1] - количество строк будет добавлено
         * @return {DictionaryDataField<T>}
         */
        addNewRows(count = 1) {
            const field = DictionaryDataField.createDictionaryGroupDataField(this);
            field.change(() => this.value(this.getValuesObject()));
            field.addInputObserver(value => {
                const obj = {};
                this.getGroupDataFieldsProperty().forEach(item => {
                    if (item === field) {
                        if (bin_1.isSet(value[0]))
                            obj[value[0]] = value[1];
                    }
                    else {
                        const values = item.getValuesArray();
                        if (bin_1.isSet(values[0]))
                            obj[values[0]] = values[1];
                    }
                });
                this.notificate("input", [obj]);
            });
            this.getGroupDataFieldsProperty().push(field);
            return this;
        }
        /**
         * Возвращает словарь значений
         * @return {DictionaryDataFieldValue}
         */
        getValuesObject() {
            const obj = {};
            this.getGroupDataFieldsProperty().forEach(f => {
                if (f.isValid()) {
                    const pair = f.value();
                    if (pair)
                        obj[pair[0]] = pair[1];
                }
            });
            return obj;
        }
        /**
         * Добавляет наблюдатель ввода
         *
         * Имя наблюдатель: input
         *
         * @param {function(values: *[])} o
         * @return {GroupedDataField}
         */
        addInputObserver(o) {
            return this.addObserver("input", o);
        }
        /**
         * Удаляет строку по индексу
         * @param {number} index
         * @return {DictionaryDataField}
         */
        removeRow(index$$1) {
            this.getGroupDataFieldsProperty().remove(index$$1);
            return this;
        }
        /**
         * Возвращает кнопку добавления строки
         * @return {Button}
         */
        getAddButton() {
            return this.__addRowButton;
        }
        /**
         * Возвращает свойство строк
         * @return {ObservableArray<GroupedDataField>}
         */
        getGroupDataFieldsProperty() {
            return this.__rows;
        }
    }
    /**
     * @typedef {Object} DictionaryDataFieldOptions
     * @property {boolean} [first]
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
     + Файл: StaticGridLayoutView.ts                                              +
     + Файл изменен: 07.03.2019 22:56:32                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class StaticGridLayoutView
     * @augments {View}
     */
    class StaticGridLayoutView extends ViewLayout {
        /**
         * Конструктор
         * @param {StaticGridLayoutViewOptions} options - опции
         */
        constructor(options) {
            super(Object.assign({}, options, { nobuild: true }));
            /**
             * Свойство: количество колонок
             * @ignore
             * @protected
             */
            this.__columnsProperty = new ObservableProperty(1).change(() => this.rebuild());
            /**
             * Свойство: количество строк
             * @ignore
             * @protected
             */
            this.__rowsProperty = new ObservableProperty(1).change(() => this.rebuild());
            this.denyRebuild(true);
            this.rows(options.rows);
            this.columns(options.columns);
            bin_1.variableAndSet(options.items, this.items, this, []);
            this.denyRebuild(false);
            this.rebuild();
        }
        /**
         * Возвращает свойство: количество колонок
         * @return {ObservableProperty<number>}
         */
        getColumnsProperty() {
            return this.__columnsProperty;
        }
        /**
         * Возвращает и устанавливает количество колонок
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        columns(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.getColumnsProperty());
        }
        /**
         * Возвращает свойство: количество строк
         * @return {ObservableProperty<number>}
         */
        getRowsProperty() {
            return this.__rowsProperty;
        }
        /**
         * Возвращает и устанавливает количество строк
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        rows(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.getRowsProperty());
        }
        serialize() {
            return Object.assign({}, super.serialize(), { columns: this.columns(), items: this.items().map(value => value.serialize()), rows: this.rows() });
        }
        /**
         * Устанавливает элемент отображения на координатах
         * @param {View} view
         * @param {number} row
         * @param {number} column
         * @return {this}
         */
        setViewAt(view, row, column) {
            this.getItemsProperty().setItemAtIndex(view, row * this.columns() + column);
            return this;
        }
        /**
         * Выполняет перестроение
         * @private
         */
        __rebuild() {
            this.removeViewContent();
            for (let i = 0; i < this.rows(); i++) {
                const row = new RowLayoutView();
                for (let j = 0; j < this.columns(); j++) {
                    const item = this.items()[i * this.columns() + j];
                    row.add(item ? item : View.empty());
                }
                this.getDocument().append(row.getDocument());
            }
            return this;
        }
    }
    /**
     * @typedef {ViewLayoutOptions} StaticGridLayoutViewOptions
     * @property {number} rows
     * @property {number} columns
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
     + Файл: BoxHeaderView.ts                                                     +
     + Файл изменен: 08.03.2019 20:24:00                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class BoxHeaderView
     * @augments {BoxView}
     */
    class BoxHeaderView extends BoxView {
        /**
         * Конструктор
         * @param {BoxHeaderViewOptions} [options] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Контейнер с текстом
             * @ignore
             */
            this.__headerView = new TextViewContainer({ class: "box-header" });
            this.removeViewContent();
            this.getDocument().append(this.getHeaderView().getDocument());
            this.getDocument().append(this.getContainerView().getDocument());
            bin_1.variableAndSet(options.boxTitle, this.boxTitle, this);
        }
        /**
         * Возвращает и устанавливает заголовок
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        boxTitle(value) {
            if (value === undefined)
                return this.getHeaderView().getTextView().text();
            this.getHeaderView().getTextView().text(value);
            return this;
        }
        /**
         * Возвращает элемент заголовка
         * @return {TextViewContainer}
         */
        getHeaderView() {
            return this.__headerView;
        }
        /**
         * Сериализует объект
         */
        serialize() {
            return Object.assign({}, super.serialize(), { boxTitle: this.boxTitle() });
        }
    }
    /**
     * @typedef {BoxViewOptions} BoxHeaderViewOptions
     * @property {string} [boxTitle] - заголовок
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
            if (options.panelContainer)
                this.__contentView = options.panelContainer.addClass("--content");
            this.panelHover(true);
            bin_1.variable(options.panelTitle, (v) => this.panelTitle(v));
            bin_1.variable(options.panelHover, (v) => this.panelHover(v));
            bin_1.variable(options.panelActionText, (v) => this.panelActionText(v));
            bin_1.variable(options.panelActionClick, (v) => this.panelActionClick(v));
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
        /**
         * Сериализует объект
         */
        serialize() {
            return Object.assign({}, super.serialize(), { panelActionText: this.panelActionText(), panelContainer: this.getContentView().serialize(), panelHover: this.panelHover(), panelTitle: this.panelTitle() });
        }
    }
    /**
     * @typedef {Object} PanelViewOptions - Опции панели
     * @property {string} [panelTitle]
     * @property {string} [panelActionText]
     * @property {boolean} [panelHover = true]
     * @property {function()} [panelActionClick]
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
     + Файл: WrapperView.ts                                                       +
     + Файл изменен: 08.03.2019 00:50:11                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения: Разметка
     * @class WrapperView
     * @augments {View}
     */
    class WrapperView extends View {
        /**
         * Конструктор
         * @param {ViewOptions} options - опции
         */
        constructor(options = {}) {
            super(options);
            this.addClass("--wrapper");
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
     + Файл: TabsPanelView.ts                                                     +
     + Файл изменен: 08.03.2019 00:42:13                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Разделитель панели с горизонтальными разделами
     * @class TabsPanelWrapperView
     * @augments {WrapperView}
     */
    class TabsPanelWrapperView extends WrapperView {
        /**
         * Конструктор
         */
        constructor() {
            super();
        }
    }
    /**
     * Скролл панель панели с горизонтальными разделами
     * @class TabsPanelWrapperView
     * @augments {View}
     */
    class TabsPanelScrollView extends View {
        /**
         * Конструктор
         */
        constructor() {
            super({ class: "--scroll" });
            /**
             * Разделитель
             * @ignore
             */
            this.__wrapperView = new TabsPanelWrapperView();
            this.getDocument().append(this.getWrapperView().getDocument());
        }
        /**
         * Возвращает разделитель
         * @return {TabsPanelWrapperView}
         */
        getWrapperView() {
            return this.__wrapperView;
        }
    }
    /**
     * Заголовок панели с горизонтальными разделами
     * @class
     * @augments {View}
     */
    class TabsPanelHeaderView extends View {
        /**
         * Конструктор
         */
        constructor() {
            super();
            /**
             * Контейнер
             * @ignore
             */
            this.__scrollView = new TabsPanelScrollView();
            this.addClass("box-header", "--tabs");
            this.getDocument().append(this.getScrollView().getDocument());
        }
        /**
         * Возвращает scroll контейнер
         * @return {TabsPanelScrollView}
         */
        getScrollView() {
            return this.__scrollView;
        }
    }
    /**
     * Элемент отображения панели с горизонтальными разделами
     * @class TabsPanelView
     * @augments {View}
     */
    class TabsPanelView extends elyRebuildableViewProtocol {
        /**
         * Конструктор
         * @param {TabsPanelViewOptions} options - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Свойство: названия разделов
             * @ignore
             * @protected
             */
            this.__tabsProperty = new ObservableArray().change(() => this.rebuild());
            /**
             * Свойство: индекс выбранного раздела
             * @ignore
             * @protected
             */
            this.__selectedTabIndexProperty = new ObservableProperty().change(() => this.rebuild());
            /**
             * Свойство: содержимое табов
             * @ignore
             * @protected
             */
            this.__tabsBodyViews = new ObservableArray().change(() => this.rebuild());
            /**
             * Заголовок
             * @ignore
             */
            this.__headerView = new TabsPanelHeaderView();
            /**
             * Контейнер
             * @ignore
             */
            this.__containerView = new Control({ class: "--container" });
            this.addClass("box");
            this.denyRebuild(true);
            bin_1.variableAndSet(options.tabs, this.tabs, this);
            bin_1.variableAndSet(options.selectedTabIndex, this.selectedTabIndex, this);
            bin_1.variableAndSet(options.panelHover, this.panelHover, this, true);
            this.getDocument().append(this.getHeaderView().getDocument());
            this.getDocument().append(this.getContainerView().getDocument());
            this.denyRebuild(false);
            this.rebuild();
        }
        /**
         * Возвращает элемент заголовка
         * @return {TabsPanelHeaderView}
         */
        getHeaderView() {
            return this.__headerView;
        }
        /**
         * Возвращает контейнер
         * @return {View}
         */
        getContainerView() {
            return this.__containerView;
        }
        /**
         * Возвращает свойство содержимого разделов
         * @return {ObservableArray<View>}
         */
        getTabsBodyViewsProperty() {
            return this.__tabsBodyViews;
        }
        /**
         * Устанавливает содержимое раздела по индексу
         * @param {number} index
         * @param {View} body
         */
        setTabIndexBody(index$$1, body) {
            this.getTabsBodyViewsProperty().setItemAtIndex(body, index$$1);
            return this;
        }
        /**
         * Возвращает свойство: названия разделов
         * @return {ObservableProperty<string>}
         */
        getTabsProperty() {
            return this.__tabsProperty;
        }
        /**
         * Возвращает свойство: индекс выбранного раздела
         * @return {ObservableProperty<number>}
         */
        getSelectedTabIndexProperty() {
            return this.__selectedTabIndexProperty;
        }
        /**
         * Возвращает и устанавливает индекс выбранного раздела
         * @param {number} [value] - значение
         * @returns {number|this|null}
         */
        selectedTabIndex(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__selectedTabIndexProperty);
        }
        /**
         * Возвращает и устанавливает названия разделов
         * @param {string[]} [value] - значение
         * @returns {string[]|this|null}
         */
        tabs(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__tabsProperty);
        }
        /**
         * Добавляет наблюдатель: выборе окна
         *
         * Имя обсервера: selected
         *
         * @param {function(index: number, title: string)} o - наблюдатель
         */
        addSelectedObserver(o) {
            this.addObserver("selected", o);
            return this;
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
         * Сериализует объект
         * @return {*}
         */
        serialize() {
            return Object.assign({}, super.serialize(), { tabs: this.tabs() });
        }
        /**
         * Выполняет перестроение
         * @private
         */
        __rebuild() {
            this.getContainerView().removeViewContent();
            const wrapper = this.getHeaderView().getScrollView().getWrapperView();
            wrapper.removeViewContent();
            this.tabs().forEach((tabName, index$$1) => {
                const view = tabName.textView().addClass("--item");
                if (this.selectedTabIndex() === index$$1) {
                    view.addClass("--active");
                    this.notificate("selected", [index$$1, tabName]);
                }
                else {
                    view.addClickObserver(() => {
                        this.selectedTabIndex(index$$1);
                    });
                }
                wrapper.getDocument().append(view.getDocument());
            });
            if (bin_1.isSet(this.selectedTabIndex())) {
                if (this.getTabsBodyViewsProperty().hasIndex(this.selectedTabIndex())) {
                    this.getContainerView().getDocument()
                        .append(this.getTabsBodyViewsProperty().item(this.selectedTabIndex()).getDocument());
                }
            }
            return this;
        }
    }
    /**
     * @typedef {Object} TabsPanelViewOptions
     * @property {string[]} [tabs]
     * @property {number} [selectedTabIndex]
     * @property {boolean} [panelHover = true]
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
            bin_1.variable(options.content, value => this.content(value), Control.empty());
            bin_1.variable(options.title, value => this.title(value), "Modal");
            bin_1.variable(options.closable, value => this.closable(value), true);
            bin_1.variable(options.modalStyle, value => this.modalStyle(value), Style.byName("default"));
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
     + Файл: elyProgressNotificationView.ts                                       +
     + Файл создан: 23.11.2018 23:03:37                                           +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Шаблон прогресса
     */
    class elyProgressNotificationView extends NotificationView {
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
            this.iconView = new IconView({ iconName: "refresh", iconSize: Size.xlarge, spinning: true });
            this.progressTitleView = new TextView({
                text: options.progressTitle || "Загрузка...", textSize: Size.custom(20),
            });
            this.textView = new TextView({ text: options.strings[0] });
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
     + Файл: CircularProgressBarView.ts                                           +
     + Файл изменен: 02.03.2019 02:55:37                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Круговой бар загрузки
     * @class CircularProgressBarView
     * @augments {ProgressBarView}
     */
    class CircularProgressBarView extends ProgressBarView {
        /**
         * Конструктор
         * @param {IProgressBarViewOptions} [options = {}] - опции
         */
        constructor(options = {}) {
            super(options);
            /**
             * Свойство: стиль полосы бара
             * @ignore
             * @protected
             */
            this.__progressBarStyleProperty = new ObservableProperty();
            this.addClass("--circular");
            this.getBodyView().removeClass("ef-progress-bar")
                .addClass("ef-progress-circle");
        }
        /**
         * Возвращает элемент полосы бара
         */
        getLineViewContainer() {
            return this.__createSVG();
        }
        __createSVG() {
            const svg = new Control({ tag: "svg" });
            const circle0 = new Control({ tag: "circle" });
            const circle1 = new Control({ tag: "circle" });
            svg.attribute("viewBox", "0 0 120 120");
            svg.getDocument().append(circle0.getDocument());
            svg.getDocument().append(circle1.getDocument());
            circle0.attribute("cx", "60")
                .attribute("cy", "60")
                .attribute("r", "54")
                .attribute("fill", "none")
                .attribute("class", "--track");
            circle1.attribute("cx", "60")
                .attribute("cy", "60")
                .attribute("r", "54")
                .attribute("fill", "none")
                .attribute("class", "--path");
            this.addChangedObserver((value, maxValue, minValue) => {
                circle1.attribute("stroke-dashoffset", (339.292 * (1 - (this.getPercentage() / 100))).toString());
            });
            this.getProgressBarStyleProperty()
                .change((value, oldVal) => {
                if (oldVal)
                    circle1.removeClass(`stroke-${oldVal.value}`);
                circle1.addClass(`stroke-${value.value}`);
            });
            return svg;
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
     + Файл: YouTubePlayer.ts                                                     +
     + Файл изменен: 12.03.2019 18:53:31                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class YouTubePlayer
     * @augments {View}
     */
    class YouTubePlayer extends View {
        /**
         * Конструктор
         * @param {YouTubePlayerOptions} [options] - опции
         */
        constructor(options = {}) {
            super(Object.assign({}, options, { tag: "iframe" }));
            /**
             * Свойство: идентификатор видео
             * @ignore
             * @protected
             */
            this.__videoIdProperty = new ObservableProperty().change(value => {
                this.attribute("src", `https://www.youtube.com/embed/${value}`);
            });
            bin_1.variableAndSet(options.videoId, this.videoId, this);
            this.attribute("frameborder", "0");
            this.attribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
            this.attribute("allowfullscreen", "allowfullscreen");
        }
        /**
         * Возвращает свойство: идентификатор видео
         * @return {ObservableProperty<string>}
         */
        getVideoIdProperty() {
            return this.__videoIdProperty;
        }
        /**
         * Возвращает и устанавливает идентификатор видео
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        videoId(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__videoIdProperty);
        }
    }
    /**
     * @typedef {Object} YouTubePlayerOptions
     * @property {string} [videoId]
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
     + Файл: VideoPlayer.ts                                                       +
     + Файл изменен: 12.03.2019 19:07:15                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    /**
     * Элемент отображения
     * @class VideoPlayer
     * @augments {View}
     */
    class VideoPlayer extends View {
        /**
         * Конструктор
         * @param {VideoPlayerOptions} [options] - опции
         */
        constructor(options = {}) {
            super(Object.assign({}, options, { tag: "video" }));
            /**
             * Свойство: URL видео файла
             * @ignore
             * @protected
             */
            this.__urlProperty = new ObservableProperty().change(value => {
                this.attribute("src", value);
            });
            bin_1.variableAndSet(options.url, this.url, this);
            this.attribute("controls", "true");
            this.attribute("type", "video/mp4");
            this.attribute("controlsList", "nodownload");
        }
        getDocument() {
            return super.getDocument();
        }
        /**
         * Возвращает свойство: URL видео файла
         * @return {ObservableProperty<string>}
         */
        getUrlProperty() {
            return this.__urlProperty;
        }
        /**
         * Возвращает и устанавливает URL видео файла
         * @param {string} [value] - значение
         * @returns {string|this|null}
         */
        url(value) {
            return ObservableProperty.simplePropertyAccess(this, value, this.__urlProperty);
        }
    }
    /**
     * @typedef {Object} VideoPlayerOptions
     * @property {string} [url]
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
        Application.default.getApplicationScreenController().addControllerName(name, viewController, canOverwrite);
    };
    /**
     * Возвращает приложение
     * @return {Application}
     */
    const app = () => {
        return Application.default;
    };
    /**
     * Возвращает контроллер экранов
     * @return {ScreenController}
     */
    const screenController = () => {
        return app().getApplicationScreenController();
    };
    /**
     * Возвращает навигацию
     * @return {NavigationView}
     */
    const navigationBar = () => {
        return app().getApplicationNavigationView();
    };
    window.onload = () => {
        bin_9.default.clear = true;
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
        navigationBar,
        screenController,
        deserialize,
        AppDevelopConsole,
        efxApp,
        // elyGuard
        Guard: bin_1,
        isNone: Guard_4,
        isSet: Guard_3,
        safeJsonParse: Guard_5,
        variable: Guard_1,
        variableAndSet: Guard_2,
        // elyObservable
        Observable,
        ObservableArray,
        ObservableBoolean,
        ObservableDictionary,
        ObservableProperty,
        // elyRequest
        URLRequest,
        URLRequestHeaderName: URLRequest_3,
        URLRequestMethod: URLRequest_2,
        SendFileRequest,
        SendJsonRequest,
        AppStylesheet,
        Application,
        DeviceDetector: bin_7,
        Color: bin_4,
        Time: bin_2,
        Timer: bin_3,
        LocalStorage,
        XLogger: bin_9,
        Utils: bin_8,
        ColorUtils: bin_5,
        AppFileWatcher,
        Control,
        View,
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
        TextAreaField,
        SwitchField,
        SelectField,
        GroupedDataField,
        DictionaryDataField,
        RowLayoutView,
        GridLayoutView,
        StaticGridLayoutView,
        BoxView,
        BoxHeaderView,
        PanelView,
        TabsPanelView,
        ImageView,
        NavigationView,
        ModalView,
        NotificationView,
        elyProgressNotificationView,
        ProgressBarView,
        CircularProgressBarView,
        PreloaderView,
        YouTubePlayer,
        VideoPlayer,
    };

    function addHomeButton(view) {
        view.add("Назад".button({buttonStyle: Style.info}).fill().click(() => {
            screenController().present("index");
        }));
    }

    const workingDirectoryField = new TextField({placeholder: "Рабочая директория"});

    /**
     * @type {{win: Window}}
     */
    let serverWindow = {
        /**
         * @type {Window}
         */
        win: null,
    };

    let requestsInProcess = [];

    /**
     * Выполняет запрос к приложению
     * @param method
     * @param data
     * @param callback
     * @param props
     */
    function makeAppRequest(method, data, callback, props = {}) {
        if (requestsInProcess.indexOf(method) > -1) return;
        requestsInProcess.push(method);
        let prog = new elyProgressNotificationView({
            title: props.title || "Выполнение команды",
            progressTitle: "Идёт выполнение команды..."
        });
        if (props.info) prog.present();
        new URLRequest({url: "http://127.0.0.1:1583/" + method, data}).send((resp, status) => {
            resp = Guard_5(resp);
            requestsInProcess.splice(requestsInProcess.indexOf(method), 1);
            if (props.info) prog.dismiss(true);
            if (props.ok && resp.response) new NotificationView({title: "Готово", message: props.ok}).present();
            if (resp.error) new NotificationView({title: "Ошибка", message: resp.error}).present();
            callback(resp, status);
        });
    }

    /**
     * Выполняет команду построения приложения
     * @param callback
     */
    function buildApplicationCommand(callback) {
        makeAppRequest("compile", {}, (resp, status) => {
            callback(status, resp);
        }, {
            title: "Компиляция приложения",
            info: true,
            ok: "Основные файлы приложения app.js и app.config.json собраны в директории /build/!"
        });
    }

    /**
     * Выполняет команду инициилизации приложения
     * @param callback
     */
    function initApplicationCommand(callback) {
        makeAppRequest("init", {}, (resp, status) => {
            callback(status, resp);
        }, {
            title: "Инициилизация приложения",
            info: true,
            ok: "Приложение успешно инициилизировано!"
        });
    }

    /**
     * Выполняет команду получения рабочей директории
     * @param callback
     */
    function getWorkingDirectoryCommand(callback) {
        makeAppRequest("getWorkingDirectory", {}, (resp, status) => {
            callback(status, resp);
        }, {title: "Получение рабочей директории", info: true});
    }

    /**
     * Выполняет команду получения рабочей директории
     * @param directory
     * @param callback
     */
    function setWorkingDirectoryCommand(directory, callback) {
        makeAppRequest("setWorkingDirectory", {directory}, (resp, status) => {
            callback(status, resp);
        }, {
            title: "Установка рабочей директории",
            info: true,
            ok: "Рабочая директория изменена!"
        });
    }

    /**
     * Выполняет команду получения состояния live update server
     * @param callback
     */
    function isLiveUpdateServerRunning(callback) {
        makeAppRequest("isLiveUpdateServerRunning", {}, (resp, status) => {
            callback(status, resp);
        });
    }

    /**
     * Выполняет команду запуска live update server
     * @param callback
     */
    function runLiveUpdateServer(callback) {
        makeAppRequest("runLiveUpdateServer", {}, (resp, status) => {
            callback(status, resp);
        }, {
            title: "Запуск Live Update Server",
            info: true,
            ok: "Сервер живого обновления успешно запущен!"
        });
    }

    /**
     * Выполняет команду остановки live update server
     * @param callback
     */
    function stopLiveUpdateServer(callback) {
        makeAppRequest("stopLiveUpdateServer", {}, (resp, status) => {
            callback(status, resp);
        }, {
            title: "Остановка Live Update Server",
            info: true,
            ok: "Сервер живого обновления остановлен!"
        });
    }

    /**
     * Выполняет команду получения конфигурации
     * @param callback
     */
    function getConfigCommand(callback) {
        const req = new URLRequest({url: "http://127.0.0.1:1583/getConfig"});
        req.send((resp, status) => {
            callback(JSON.parse(resp));
        });
    }

    /**
     * Выполняет команду установки значения конфигурации
     * @param path
     * @param value
     * @param callback
     */
    function setConfigCommand(path, value, callback) {
        makeAppRequest("setConfigValue", {path, value}, resp => {
            callback(resp.response);
        });
    }

    /**
     * Выполняет команду получения базы данных
     * @param callback
     */
    function getDBDItemsCommand(callback) {
        makeAppRequest("r/getDBItems", {}, resp => {
            callback(status, resp);
        }, {
            title: "Получение данных базы",
            info: true
        });
    }


    /**
     * Выполняет команду установки значения
     * @param table
     * @param rowIndex
     * @param column
     * @param value
     * @param callback
     */
    function setDBDItemValueCommand(table, rowIndex, column, value, callback) {
        makeAppRequest("r/setDBItemValue", {table, rowIndex, column, value}, resp => {
            callback(status, resp);
        }, {
            title: "Получение данных базы",
            info: true
        });
    }

    /**
     * Контроллер отображения: Экран конфигурации
     */
    class ConfigViewController extends SimplePageViewController {
        viewDidLoad() {
            super.viewDidLoad();

            // Установка заголовка и описания
            // для контроллера типа SimplePageViewController
            this.title("ely.flat *{* Installer *}*");
            this.description("Настройка приложения");

            addHomeButton(this.view);
            this.view.add(new Control({tag: "br"}));

            getConfigCommand((cfg) => {

                let appSettings = {
                    name: "Приложение",
                    options: [
                        [
                            "Название приложения",
                            "Название Вашего приложения будет отображено в title тэге, а также при добавлении на " +
                            "домашний экран смартфона.",
                            new TextField({value: cfg.app.title}),
                            "app.title"
                        ]
                    ]
                };

                let navigationSettings = {
                    name: "Панель навигации",
                    options: [
                        [
                            "Текст на панели навигации",
                            "Название Вашего приложения. Отображается в левом углу навигации или в центре, если приложение " +
                            "запущено с мобильного устройства.",
                            new TextField({value: cfg.navigationBar.title}),
                            "navigationBar.title"
                        ],
                        [
                            "Цвет панели навигации",
                            "Основной цвет верхней панели навигации.",
                            new TextField({value: cfg.navigationBar.color}),
                            "navigationBar.Color"
                        ]
                    ]
                };

                let templateSettings = {
                    name: "Шаблон",
                    options: [
                        [
                            "Максимальная ширина контейнера",
                            "Максимальная ширина контейнера приложения, которая возможна. Вы можете установить 100% " +
                            "или указать значение в пикислях.",
                            new TextField({value: cfg.template.maxContainerWidth}),
                            "template.maxContainerWidth"
                        ],
                        [
                            "Основной цвет приложения",
                            "Основной цвет приложения или primary Color. В соответсвии с ним будут установлены другие цвета.",
                            new TextField({value: cfg.navigationBar.color}),
                            "template.Color"
                        ],
                        ["Подвал"],
                        [
                            "Основной текст",
                            "Основной текст имеет более яркий окрас и большой размер.",
                            new TextField({value: cfg.template.footer.title}),
                            "template.footer.title"
                        ],
                        [
                            "Дополнительный текст",
                            "Дополнительный текст распологается под основным и менее заметен.",
                            new TextField({value: cfg.template.footer.subtitle}),
                            "template.footer.subtitle"
                        ],
                    ]
                };


                let metaSettings = {
                    name: "Мета данные",
                    options: [
                        [
                            "Кодировка приложения",
                            "Кодировка символов в приложении. Устанавливается в мета заголовок.",
                            new TextField({value: cfg.meta.charset}),
                            "meta.charset"
                        ],
                        [
                            "Путь до иконок",
                            "Путь до иконок приложения. Необходимо для манифеста *useApplicationIcon*",
                            new TextField({value: cfg.meta.iconPath}),
                            "meta.iconPath"
                        ]
                    ]
                };

                let manifestSettings = {
                    name: "Манифесты",
                    options: [
                        [
                            "Использование панели навигации",
                            "Панель навигации отображается в верху приложения.",
                            new SwitchField({value: cfg.manifest.useNavigationBar}),
                            "manifest.useNavigationBar"
                        ],
                        [
                            "Использование мета заголовков",
                            "В мета заголовков хранится название Вашего приложения и кодировка UTF-8.",
                            new SwitchField({value: cfg.manifest.useMeta}),
                            "manifest.useMeta"
                        ],
                        [
                            "Использование иконки приложения",
                            "Иконки приложения будут добавлены в мета заголовки.",
                            new SwitchField({value: cfg.manifest.useApplicationIcon}),
                            "manifest.useApplicationIcon"
                        ],
                        [
                            "Использование адаптации дисплея",
                            "В мета заголовки будет добавлен корректный тег viewport.",
                            new SwitchField({value: cfg.manifest.useViewPort}),
                            "manifest.useViewPort"
                        ],
                        [
                            "Разрешает использование standalone",
                            "Ваше приложение сможет быть добавлено на домашний экран смартфона, после чего " +
                            "оно будет работать как полноценное приложение.",
                            new SwitchField({value: cfg.manifest.allowStandaloneMode}),
                            "manifest.allowStandaloneMode"
                        ],
                        [
                            "Использование iPhone X view fix",
                            "Некоторые элементы приложения будут адаптированы под iPhone X. Например, полоса навигации.",
                            new SwitchField({value: cfg.manifest.useIPhoneXStandaloneFix}),
                            "manifest.useIPhoneXStandaloneFix"
                        ],
                        [
                            "Использование режима разработчика",
                            "Режим разработчика необходим для работы с Live update server в программе efi.",
                            new SwitchField({value: cfg.manifest.useDevelopMode}),
                            "manifest.useDevelopMode"
                        ]
                    ]
                };


                this.view.add(this.settingsPanel(appSettings));
                this.view.add(this.settingsPanel(templateSettings));
                this.view.add(this.settingsPanel(navigationSettings));
                this.view.add(this.settingsPanel(metaSettings));
                this.view.add(this.settingsPanel(manifestSettings));
                this.view.add(new Control({tag: "br"}));
                addHomeButton(this.view);
            });

        }

        settingsPanel(data) {
            let efPanel = new PanelView({
                panelTitle: data.name
            });
            data.options.forEach(value =>
                efPanel.getContentView().add(this.optionsRow(value)));
            return efPanel;
        }

        optionsRow(data) {
            if (data.length === 1) {
                return String(data[0]).headerTextView({headerLevel: 1});
            } else {
                let grid = new GridLayoutView();
                let header = new HeaderTextView({text: data[0], headerLevel: 2});
                grid.add(header);
                grid.add(data[2]);
                data[2].placeholder(data[0]);
                data[2].change(value => {
                    data[2].editable(false);
                    if(typeof value === "number" || typeof value === "boolean"){
                        console.log(value, typeof value);
                    }else{
                        value = value.toString();
                    }
                    setConfigCommand(data[3], value, () => {
                        data[2].editable(true);
                        if (serverWindow.win) {
                            serverWindow.win.location.href = "http://127.0.0.1:1580";
                        }
                    });

                });
                grid.add(String(data[1]).textView({opacity: 0.5}));
                grid.add(String(data[3]).textView({opacity: 0.4, textStyle: Style.primary}));
                return grid;
            }
        }
    }

    /**
     * Контроллер отображения: Главный экран
     */
    class IndexViewController extends SimplePageViewController {

        /**
         * Данный метод выполняется после загрузки экрана
         *
         * + В данном методе рекомендуется выполнять элементарную отрисовку,
         *   а также программную логику контроллера элемента отображения.
         * + Данный метод выполняется один раз.
         *
         * Внимание! Рекомендуется изучить делегат elyViewWillDraw для полного
         * понимания отрисовки элементов View.
         */
        viewDidLoad() {
            // Вызов рдительского метода
            super.viewDidLoad();

            this.cells = {};


            // Установка заголовка и описания
            // для контроллера типа SimplePageViewController
            this.title("ely.flat *{* Installer *}*");
            this.description("Приложение для сборки и запуска приложения ely.flat.application");


            let serverRunGrid = this.factoryGridCell("server", "refresh", "Live update server",
                "Запускает сервер живого обновления для отладки и разработки, " +
                "который обновляется при изменении файлов приложения.", () => {
                    screenController().present("server");
                });

            let buildGrid = this.factoryGridCell("build", "gavel", "Build the app",
                "Выполняет компиляцию основных файлов приложения.", (panel) => {
                    panel.opacity(0.4);
                    buildApplicationCommand(() => panel.opacity(1));
                });


            let appInitGrid = this.factoryGridCell("init", "terminal", "Init the app",
                "Инициилизирует новое приложение и выполняет первую сборку.", (panel) => {
                    panel.opacity(0.4);
                    initApplicationCommand(() => {
                        panel.opacity(1);
                        setTimeout(() => {
                            this.update();
                        }, 1000);
                    });
                });


            let configGrid = this.factoryGridCell("config", "cog", "Configuration",
                "Настройки приложения.", () => {
                    screenController().present("config");
                });

            let efiSettingsPanel = new PanelView({
                panelTitle: "Настройки efi",
                panelActionText: "Изменить",
                panelActionClick: () => {
                    efiSettingsPanel.opacity(0.4);
                    setWorkingDirectoryCommand(workingDirectoryField.value(), (res, data) => {
                        efiSettingsPanel.opacity(1);
                        if (data.efHere) {
                            notifi("В установленной директории найдена система *ely.flat*!", "Информация");
                        }
                        setTimeout(() => {
                            this.update();
                        }, 1000);
                    });
                }
            });

            efiSettingsPanel.getContentView().add("Рабочая директория".textView());
            efiSettingsPanel.getContentView().add(workingDirectoryField);

            let efXAppInit = this.factoryGridCell("efxapp_init", "cube", "efx-app init",
                "efX-app позволяет создать самое простое и одновременно полноценное REST приложение с небольшой " +
                "базой данных и запросами.", () => {
                });
            let efXDB = this.factoryGridCell("efxapp_db", "server", "Database view",
                "База данных Вашего efX-app приложения", () => {
                    elyScreenController.default.present("dbview");
                });
            let efXMethods = this.factoryGridCell("efxapp_methods", "gears", "REST Methods",
                "REST функции Вашего приложения", () => {

                });

            this.efiVersion = new TextView({textSize: Size.large, textWeight: Weight.thin, text: "version: 0"});
            this.efiVersion.centered().opacity(0.14);

            this.view.add(appInitGrid, configGrid, buildGrid);
            this.view.add(serverRunGrid);
            this.view.add(efiSettingsPanel);
            this.view.add("efX-app".headerTextView({
                headerLevel: 1,
                textSize: Size.xxlarge,
                textCenter: true,
                textWeight: Weight.thin
            }));
            this.view.add("Создайте своё простое приложение...".textView({
                opacity: 0.3,
                textCenter: true,
                style: {paddingBottom: "40px"}
            }));
            this.view.add(efXAppInit);
            this.view.add(efXDB, efXMethods);
            this.view.add(this.efiVersion);

        }

        /**
         * Создает ячейку
         * @param name
         * @param icon
         * @param title
         * @param desc
         * @param action
         * @return {PanelView}
         */
        factoryGridCell(name, icon, title, desc, action) {
            title = title.toUpperCase();

            let panelView = new PanelView();
            panelView.getStyle().height = "250px";

            let iconView = new IconView({
                iconName: icon,
                iconStyle: Style.primary,
                iconSize: Size.xlarge,
            });
            let titleView = String(title).textView({textCenter: true, textSize: Size.normal});
            let descView = String(desc).textView({textSize: Size.normal, opacity: 0.5});

            panelView.getContentView().add(iconView);
            panelView.getContentView().add(titleView);
            panelView.getContentView().add(descView);

            panelView.getContentView().rowAt(0).getStyle().textAlign = "center";
            panelView.addObserver("click", () => {
                if (!this.cells[name].lock) action(panelView);
            });

            this.cells[name] = panelView;
            this.lockCell(name, true);
            return panelView;
        }

        viewDidAppear() {
            this.update();
        }

        /**
         * Обновляет контроллер и состояние элементов на нем
         */
        update() {
            Object.keys(this.cells).forEach(value => this.lockCell(value));
            getWorkingDirectoryCommand((res, data) => {
                if (res) {
                    workingDirectoryField.value(data.directory);
                    this.lockCell("init", data.efHere);
                    this.lockCell("config", !data.efHere);
                    this.lockCell("build", !data.efHere);
                    this.lockCell("server", !data.efHere);
                    this.efiVersion.text(`efi ${data.version}`);
                }
            });

            this.lockCell("efxapp_methods", true);
            this.lockCell("efxapp_init", true);
        }

        /**
         * Брокирует ячейки
         * @param name
         * @param willLock
         */
        lockCell(name, willLock) {
            let cell = this.cells[name];
            this.cells[name].lock = willLock;
            if (willLock) {
                cell.opacity(0.4);
            } else {
                cell.opacity(1);
            }
        }

    }

    /**
     * Контроллер отображения: Запуск сервера
     */
    class ServerViewController extends SimplePageViewController {


        viewDidLoad() {
            super.viewDidLoad();

            this.title("ely.flat *{* Installer *}*");
            this.description("Live Update Server");

            addHomeButton(this.view);
            this.view.add(new Control({tag: "br"}));

            this.infoPanel = new PanelView({panelTitle: "Информация"});
            this.stateServer = new SwitchField({title: "Состояние сервера"});

            this.infoPanel.getContentView().add(this.stateServer);

            let button = new Button({text: "Открыть приложение", fill: true});
            this.infoPanel.getContentView().add(button);
            this.infoPanel.getContentView().rowAt(1).hidden(true);

            button.click(() => {
                serverWindow.win = window.open("http://127.0.0.1:1580", "ely.flat", "width=1000,height=700");
            });

            this.stateServer.change((value) => {
                if(this.checking) return;
                if (value) {
                    runLiveUpdateServer(() => {
                        this.update();
                    });
                } else if (!value) {
                    stopLiveUpdateServer(() => {
                        this.update();
                    });
                }
            });

            this.stateServer.editable(false);
            this.view.add(this.infoPanel);
        }

        viewDidAppear() {
            this.update();
        }

        update(){
            this.checking = true;
            this.stateServer.editable(false);
            this.infoPanel.getContentView().rowAt(1).hidden(true);

            isLiveUpdateServerRunning((s, r) => {
                this.stateServer.value(r.server);
                this.infoPanel.getContentView().rowAt(1).hidden(!r.server);
                this.stateServer.editable(true);
                this.checking = false;
            });
        }
    }

    /**
     * Контроллер отображения: Просмотр баз данных
     */
    class DatabaseViewController extends SimplePageViewController {

        /**
         * Данный метод выполняется после загрузки экрана
         *
         * + В данном методе рекомендуется выполнять элементарную отрисовку,
         *   а также программную логику контроллера элемента отображения.
         * + Данный метод выполняется один раз.
         *
         * Внимание! Рекомендуется изучить делегат elyViewWillDraw для полного
         * понимания отрисовки элементов View.
         */
        viewDidLoad() {
            // Вызов рдительского метода
            super.viewDidLoad();

            // Установка заголовка и описания
            // для контроллера типа SimplePageViewController
            this.title("efX-app");
            this.description("Просмотр баз данных");

            this.data = {};
            this.currentTable = null;

            addHomeButton(this.view);
            this.view.add(View.breakLine());

            let info = new PanelView({
                panelActionText: "Хорошо, понятно.",
                panelActionClick: () => {
                    info.fadeOut();
                }
            });
            info.getContentView().add(
                ("*Внимание!* База данных не предусмотрена для больших нагрузок. {nl}Система efX-app разработана для личного ипользования. " +
                    "Например, если Вы разрабатываете приложение для умного дома, то здесь может быть записано состояние Ваших умных устройств." +
                    "{nl}{nl}Здесь Вы можете посмотреть записанные в **efX-app database** данные, удалить или изменить их.")
                    .textView({textWeight: Weight.light})
            );
            this.view.add(info);

            this.dbsView = new GridLayoutView();

            this.contentDbView = new PanelView({});
            this.contentDbView.getContentView().add("Нет данных для отображения.".textView({opacity: 0.3}));

            this.view.add(this.dbsView, this.contentDbView);

            this.view.rowAt(4).columnAt(0).getStyle().width = "20%";
            this.view.rowAt(4).columnAt(1).getStyle().width = "80%";

            app().getApplicationLoaderView().hidden(false);
        }

        viewWillAppear(screen) {
            this.currentTable = null;
            app().getApplicationLoaderView().hidden(false);
            if (this.contentDbView) {
                this.contentDbView.getContentView().getRows().clear();
                this.contentDbView.panelActionText("");
                this.contentDbView.getContentView().add("Нет данных для отображения.".textView({opacity: 0.3}));
            }
        }

        viewDidAppear() {
            this.update();
        }


        /**
         * Обновляет контроллер и состояние элементов на нем
         */
        update() {
            getDBDItemsCommand((result, data) => {
                this.dbsView.getRows().clear();
                this.contentDbView.getContentView().getRows().clear();
                this.contentDbView.panelTitle("");
                this.contentDbView.getContentView().add("Нет данных для отображения.".textView({opacity: 0.3}));

                const items = data.items;
                for (let key in items) {
                    let item = new efButton({text: key, fill: true});
                    item.click(() => {
                        showDB(key, data);
                    });
                    this.dbsView.add(item);
                }

                app().getApplicationLoaderView().hidden(true);
                if (this.currentTable) showDB(this.currentTable, data);
            });

            const showDB = (name, data) => {
                this.currentTable = name;
                this.contentDbView.getContentView().getRows().clear();
                const dv = new elyDataGridView({
                    sourceData: data.db[name],
                    headers: data.items[name].items,
                    borderedStyle: true,
                });
                dv.addCellDrawObserver((rowIndex, colIndex, cell, view) => {
                    cell.addObserver("click", () => {
                        if (cell.inEdit) return;
                        cell.inEdit = true;
                        const colName = data.items[name].items[colIndex];
                        const val = data.db[name][rowIndex];
                        if (colName !== "id") {
                            let tf = new efTextField({value: val[colIndex]});
                            tf.setRightIcon("save");
                            tf.getRightIconView().addClass("button");
                            tf.getRightIconView().css({padding: "0", backgroundColor: "transparent", border: "none"});
                            tf.getRightIconView().addObserver("click", () => {
                                tf.editable(false);
                                setDBDItemValueCommand(name, rowIndex, colName, tf.value(), (result) => {
                                    tf.editable(true);
                                    const tv = new efTextView({text: result ? tf.value() : val});
                                    cell.clearView();
                                    cell.getDocument().append(tv.getDocument());
                                });
                            });
                            cell.clearView();
                            cell.getDocument().append(tf.getDocument());
                        }
                    });
                });
                dv.update();
                this.contentDbView.getContentView().add(dv);
                this.contentDbView.panelTitle(`База данных: ${name}`);
                this.contentDbView.panelActionText("Обновить");
                this.contentDbView.panelActionClick(() => {
                    this.update();
                });
            };
        }
    }

    const BuilderViewElements = {

        View: {
            fields: {
                __groups: {
                    View: {
                        hidden: "boolean",
                        opacity: "float",
                    },
                    Style: {
                        styleClickable: "boolean",
                        styleNoSelect: "boolean",
                        css: "dictionary"
                    }
                }
            }
        },

        BoxView: {
            type: "Content",
            description: "Элемент отображения: контейнер. Простой контейнер с эффектом наведения и рамкой.",
            extends: ["View"],
            fields: {
                boxHover: "boolean",
            },
            subviews: {
                container: "__containerView"
            },
            grid: ["__containerView"],
            defaults: {
                containerView: ["s", {
                    "_item": "StaticGridLayoutView",
                    "columns": 1,
                    "rows": 1,
                    "items": []
                }]
            },
        },

        BoxHeaderView: {
            type: "Content",
            description: "Элемент отображения: контейнер с заголовком. " +
                "Контейнер с эффектом наведения, рамкой и заголовком",
            extends: ["BoxView"],
            subviews: {
                header: "__headerView",
                container: "__containerView",
            },
            fields: {
                boxTitle: "string"
            },
            grid: ["__containerView"],
            defaults: {
                boxTitle: "Box",
                containerView: ["s", {
                    "_item": "StaticGridLayoutView",
                    "columns": 1,
                    "rows": 1,
                    "items": []
                }]
            },
        },

        Button: {
            type: "Action",
            description: "Элемент отображения: кнопка.",
            extends: ["View"],
            fields: {
                text: "string",
                buttonRounded: "boolean",
                buttonStyle: "styles",
                buttonSize: "sizes",
            },
            defaults: {
                text: "Button"
            }
        },

        ProgressBarView: {
            type: "View",
            description: "Элемент отображения: полоса загрузки.",
            extends: ["View"],
            fields: {
                progressBarStyle: "styles",
                minValue: "float",
                maxValue: "float",
                value: "float",
            },
            defaults: {
                minValue: 0,
                maxValue: 100,
                value: 30,
            }
        },

        ImageView: {
            extends: ["View"],
            type: "View",
            description: "Элемент отображения: картинка",
            fields: {
                url: "string",
            },
        },

        IconView: {
            extends: ["View"],
            type: "Text",
            description: "Элемент отображения: иконка.",
            fields: {
                iconName: "string",
                spinning: "boolean",
                iconStyle: "styles",
                iconSize: "sizes",
                iconWights: "weights",
            },
            defaults: {
                iconName: "refresh",
            }
        },

        TextView: {
            type: "Text",
            description: "Элемент отображения: текст.",
            extends: ["View"],
            fields: {
                textStyle: "styles",
                testSize: "sizes",
                testWights: "weights",
                text: "string",
                textCenter: "boolean",
            },
            defaults: {
                text: "Text View"
            }
        },

        PanelView: {
            extends: ["View"],
            type: "Content",
            description: "Элемент отображения: панель. Панель может содержать заголовок и кнопку активации.",
            fields: {
                panelTitle: "string",
                panelActionText: "string",
                panelHover: "boolean"
            },
            subviews: {
                header: "__headerView",
                footer: "__footerView",
                container: "__contentView",
            },
            grid: ["__contentView"],
            defaults: {
                panelTitle: "Panel",
                panelActionText: null,
                panelContainer: ["s", {
                    "_item": "StaticGridLayoutView",
                    "columns": 1,
                    "rows": 1,
                    "items": []
                }]
            }
        },

        Field: {
            extends: ["View"],
            fields: {
                placeholder: "string",
                editable: "boolean",
            }
        },

        TextField: {
            type: "Field",
            description: "Поле ввода текста.",
            extends: ["Field"],
            fields: {
                fieldType: "textFieldTypes",
                value: "string",
                __groups: {
                    Icons: {
                        rightIconName: "string",
                        leftIconName: "string",
                    }
                }
            },
            defaults: {
                placeholder: "Text Field"
            }
        },

        SwitchField: {
            type: "Field",
            description: "Поле ввода: переключатель.",
            extends: ["Field"],
            fields: {
                switchStyle: "styles",
                value: "boolean",
                leftLabel: "string",
                rightLabel: "string",
            },
            defaults: {
                leftLabel: "Switch field",
            }
        },

        TextAreaField: {
            type: "Field",
            description: "Поле ввода многострочного текста.",
            extends: ["Field"],
            fields: {
                rowsCount: "number",
                readonly: "boolean",
            }
        },

        StaticGridLayoutView: {
            type: "Layout",
            description: "Разметка. Элементы расположены на фиксированной сетке.",
            extends: ["View"],
            fields: {
                columns: "number",
                rows: "number"
            },
            defaults: {
                columns: 3,
                rows: 3,
            }
        },
    };

    const BuilderViewElementsFieldsLang = {
        text: "Текст",
        hidden: "Скрыть",
        opacity: "Прозрачность",

        buttonSize: "Размер кнопки",
        buttonStyle: "Стиль кнопки",

        textSize: "Размер текста",
        textStyle: "Стиль текста",
        textWights: "Толщина текста",

        iconSize: "Размер иконки",
        iconStyle: "Стиль иконки",
        iconWights: "Толщина иконки",

        value: "Значение",
        editable: "Редактирование",
        placeholder: "Плейсхолдер",

        panelTitle: "Заголовок панели",
        panelActionText: "Текст активации",
        panelHover: "Эффект наведения",

        columns: "Количество столбцов",
        rows: "Количество строк",

        rightIconName: "Имя иконки справа",
        leftIconName: "Имя иконки слева",

        styleClickable: "Стиль активного для нажатия элемента",
        styleNoSelect: "Стиль запрещающий выделение элемента",

        boxHover: "Эффект наведения",
        boxTitle: "Заголовок",

        leftLabel: "Левый заголовок",
        rightLabel: "Правый заголовок",

        switchStyle: "Стиль переключателя",
        progressBarStyle: "Стиль полосы прогресса",

        __groups: {
            View: "Отображение",
            Style: "Стили",
            Icons: "Иконки",
        }
    };

    /**
     * Возвращает перевод группы
     * @param group
     * @return {*}
     */
    function getGroupLang(group) {
        return BuilderViewElementsFieldsLang.__groups[group] ?
            BuilderViewElementsFieldsLang.__groups[group] : group;
    }

    function getFieldsMap(name) {
        name = name || "View";
        const val = BuilderViewElements[name] || BuilderViewElements.View;
        let opts = {};
        if (val.extends) {
            val.extends.forEach(ext => {
                opts = bin_8.mergeDeep(opts, getFieldsMap(ext));
            });
        }
        return bin_8.mergeDeep(opts, val.fields);
    }

    /**
     * Фабрика элементов
     */
    class BuilderViewFactory {

        /**
         * Обрабатывает опции
         * @param defaults
         * @return {*}
         */
        static processDefaults(defaults) {
            Object.keys(defaults).forEach(value => {
                const obj = defaults[value];
                if (obj instanceof Array && obj.length === 2 && obj[0] === "s") {
                    defaults[value] = View.fromObject(obj[1]);
                }
            });
            return defaults;
        }

        /**
         * Создает превью элемент
         * @param name
         * @return {null}
         */
        static createPoorView(name) {
            const classObject = window.elyflatobjects[name];
            const opts = BuilderViewElements[name];
            if (!(classObject && opts)) return null;

            const defaults = BuilderViewFactory.processDefaults(opts.defaults || {});
            return new classObject(defaults);
        }
    }

    /**
     * Утилиты efiWorkShop
     */
    class WSUtils {

        /**
         * Возвращает имя класса view
         * @param {View} view
         * @return {string|null}
         */
        static getViewClassName(view) {
            return view.constructor.name || null;
        }

        /**
         * Возвращает имя сигнатуры
         * @param {View} view
         * @return {string}
         */
        static getViewSignatureClassName(view) {
            const name = (WSUtils.getViewClassName(view) || "view").toLowerCase();
            const template = {
                grid: "grid",
                layout: "layout",
                button: "button",
                field: "field",
                panel: "panel",
                box: "box",
            };
            for (const key of Object.keys(template)) {
                if (name.indexOf(key) > -1) return template[key];
            }
            return "view";
        }

    }

    /**
     * Регистр элементов
     */
    class WSViewsRegex extends Observable {

        constructor() {
            super();

            /**
             * Счетчик идентификаторов
             * @type {number}
             * @private
             */
            this.__idsCounter = 0;

            /**
             * Зарегистрированные элементы
             * @type {{}}
             * @private
             */
            this.__registeredViews = {};
        }

        /**
         * Возвращает список зарегистрированных элементов
         * @return {{}}
         */
        getRegisteredViews() {
            return this.__registeredViews;
        }

        /**
         * Регистрирует View
         * @param {View} view
         * @param {string?} prename
         * @param {string?} postname
         */
        registerView(view, prename, postname) {
            let id = `${WSUtils.getViewSignatureClassName(view)}`;
            if (prename) id = prename + id.substr(0, 1).toUpperCase() + id.substr(1);
            if (postname) id = postname + id.substr(0, 1).toUpperCase() + id.substr(1);
            id += `-${++this.__idsCounter}`;
            view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME, id);
            this.__registeredViews[id] = view;
            this.notificate("registered", [view, id]);
        }

        /**
         * Отменет рестистрацию View
         * @param {View} view
         */
        unregisterView(view) {
            const id = view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME);
            if (id) {
                delete this.__registeredViews[id];
                this.notificate("unregistered", [view, id]);
            } else {
                throw Error(`Не удалось удалить элемент: ${JSON.stringify(view, null, 2)}`);
            }
        }

        /**
         * Возвращает зарегистрированный элемент или null
         *
         * @param {string} id
         * @return {View|null}
         */
        getView(id) {
            return this.__registeredViews[id] || null;
        }

        /**
         * Добавляет слушатель регистрации
         * @param {function(view: View, id: string)} o - наблюдатель
         */
        addViewRegisteredObserver(o) {
            this.addObserver("registered", o);
        }

        /**
         * Добавляет слушатель отмены регистрации
         * @param {function(view: View, id: string)} o - наблюдатель
         */
        addViewUnregisteredObserver(o) {
            this.addObserver("unregistered", o);
        }

    }

    WSViewsRegex.default = new WSViewsRegex();
    WSViewsRegex.consts = {};

    /**
     * Имя атрибута с идентификатором элемента
     * @type {string}
     */
    WSViewsRegex.consts.BUILDER_ID_ATTR_NAME = "ws-id";

    /**
     * Отображение создания элемента
     */
    class BuilderCreatorView extends GridLayoutView {

        /**
         * Конструктор
         */
        constructor() {
            super();

            this.createTabsBar();
            this.createPrimaryButton();

            this.__createTabsBarElementsTab();
            this.__createTabsBarEJVCodeTab();
            this.tabsBar.selectedTabIndex(0);
        }

        /**
         * Создает навигацию в строителе
         */
        createTabsBar() {
            /**
             * Разделы создания
             * @type {TabsPanelView}
             */
            this.tabsBar = new TabsPanelView({tabs: ["Элементы", "EJV Code"]});
            this.add(this.tabsBar);
        }

        /**
         * Создает список элементов
         * @private
         */
        __createTabsBarElementsTab() {
            const grid = new GridLayoutView();
            grid.addClass("--scrollView");
            grid.getStyle().height = "500px";

            const data = this.__getAllTheViewsData();
            const types = this.__getAllTheTypesFromTheViewsData(data);

            types.forEach(value => {
                const panel = new PanelView({panelTitle: value, panelHover: false});
                data.forEach(obj => {
                    if (obj.type === value)
                        panel.getContentView().add(this.__createElementCreatorView(obj));
                });
                grid.add(panel);
            });
            this.tabsBar.setTabIndexBody(0, grid);
        }

        /**
         * Возвращает все типы из данных
         * @param viewsData
         * @return {Array}
         * @private
         */
        __getAllTheTypesFromTheViewsData(viewsData) {
            const types = [];
            viewsData.forEach(value => {
                if (types.indexOf(value.type) === -1) types.push(value.type);
            });
            return types.sort((a, b) => a > b ? 1 : -1);
        }

        /**
         * Возвращает данные о всех элементах
         * @return {{name: T, description: *, type: *}[]}
         * @private
         */
        __getAllTheViewsData() {
            const keys = Object.keys(BuilderViewElements);
            return keys
                .filter(value => BuilderViewElements[value].type)
                .map((value) => {
                    return {
                        name: value,
                        type: BuilderViewElements[value].type,
                        description: BuilderViewElements[value].description
                    };
                });
        }

        /**
         * Создаёт элемент отображения в создании
         * @param value
         * @return {BoxView}
         * @private
         */
        __createElementCreatorView(value) {
            const box = new BoxView();
            box.styleNoSelect(true);
            box.styleClickable(true);
            box.getContainerView().add(value.name.textView());
            box.getContainerView().add(value.description.textView({opacity: 0.4, textSize: Size.custom(12)}));
            box.addClickObserver(() => {
                this.selectedOpts = BuilderViewElements[value.name];
                const view = BuilderViewFactory.createPoorView(value.name);
                if (view) {
                    this.tabsBar.selectedTabIndex(1);
                    this.ejvCodeField.value(JSON.stringify(view.serialize(), null, 2));
                }
            });
            return box;
        }

        /**
         * Создает EJV раздел в строке текста
         * @private
         */
        __createTabsBarEJVCodeTab() {
            this.ejvCodeField = new TextAreaField({rowsCount: 17});
            this.tabsBar.setTabIndexBody(1, this.ejvCodeField);
        }

        /**
         * Создает кнопку создания элемента
         */
        createPrimaryButton() {
            this.primaryButton = new Button({text: "Создать"});
            this.primaryButton.fill();
            this.add(this.primaryButton);
            this.primaryButton.click(() => {
                const view = View.fromString(this.ejvCodeField.value());
                if (view) {
                    WSViewsRegex.default.registerView(view);
                    this.notificate("created", [view, this.selectedOpts]);
                } else {
                    this.tabsBar.selectedTabIndex(1);
                    this.ejvCodeField.error(true);
                    notifi("Ошибка при создании элемента!");
                }
            });
        }
    }

    class BuilderViewCreateItemModal extends ModalView {

        constructor(options = {}) {
            super({...options, title: "Создание элемента"});

            const view = new BuilderCreatorView();
            view.addObserver("created", (view, opt)=>{
               this.notificate("create", [view, opt]);
               this.dismiss(true);
            });

            this.getContainerView().width(550);
            this.content(view);
        }

        addCreateObserver(o) {
            this.addObserver("create", o);
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
     + Файл: BuilderViewsFactory.ts                                               +
     + Файл изменен: 13.03.2019 23:18:41                                          +
     +                                                                            +
     +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    /**
     * Фабрика вспомогательных элементов строителя
     */
    class BuilderViewsFactory {

        /**
         * Создает сетку с заголовком и элементом
         *
         * @param {string} title
         * @param {View} view
         *
         * @return {GridLayoutView}
         */
        static createGridViewWithTitleAndView(title, view) {
            const titleTextView = title.textView();
            titleTextView.css({
                backgroundColor: "#fbfbfb",
                margin: "0 -16px",
                padding: "16px",
            });
            return new GridLayoutView({items: [[titleTextView], [view]]});
        }

        /**
         * Создает бокс с заголовком и стилем
         * @param {string} title
         * @param {CSSStyleDeclaration|*} [style]
         * @return {BoxHeaderView}
         */
        static createBoxHeaderWithTitle(title, style) {
            return new BoxHeaderView({boxTitle: title, boxHover: false, style: style});
        }

        /**
         * Создает секцию редактора
         *
         * @param {string} title
         * @return {BoxHeaderView}
         */
        static createEditorViewSectionBox(title) {
            const box = BuilderViewsFactory.createBoxHeaderWithTitle(title, {
                margin: "-16px", paddingBottom: "30px", borderBottom: "none",
            });
            box.getContainerView().getStyle().marginTop = "-15px";
            return box;
        }

        /**
         * Создаёт контейнер со скролом для сайд бара
         * @param {string} title
         * @param {View} innerView
         *
         * @return {BoxView}
         */
        static createSidebarScrollBox(title, innerView) {
            const box = new BoxHeaderView({boxTitle: title, boxHover: false});
            box.css({
                margin: "-1px",
                height: "100%",
                maxHeight: (document.documentElement.clientHeight - 72) + "px",
                borderBottom: "none",
            });
            box.getContainerView().css({
                maxHeight: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                marginRight: "-5px",
            });
            box.getContainerView().add(innerView);
            return box;
        }

        /**
         * Создает элемент плейсхолдера
         *
         * @return {Control}
         */
        static createPlaceholderView() {
            const view = new Control({class: "view-placeholder", styleNoSelect: true});
            view.getDocument().innerHTML = "<b style='font-size: 30px'>+</b><br>Добавить элемент";
            return view;
        }
    }

    /**
     * Фабрика полей ввода данных
     */
    class WSFieldsFactory {

        /**
         * Создаёт булевый переключатель
         *
         * @param {string} title
         * @param {boolean} [value]
         * @return {SwitchField}
         */
        static createBooleanField(title, value) {
            return new SwitchField({title, value});
        }

        /**
         * Создает строковое поле ввода
         *
         * @param {string} placeholder
         * @param {string} [value]
         * @return {TextField}
         */
        static createStringField(placeholder, value) {
            return new TextField({placeholder, value});
        }

        /**
         * Создает поле ввода словаря
         *
         * @param {string} placeholder
         * @param {string} [value]
         * @param {*} [items]
         * @return {SelectField}
         */
        static createDictionaryField(placeholder, value, items) {
            return new SelectField({placeholder, value, items});
        }

        /**
         * Создаёт поле ручного ввода
         *
         * @param placeholder
         * @param value
         * @return {DictionaryDataField}
         */
        static createDictionaryInputField(placeholder, value) {
            return new DictionaryDataField();
        }

    }

    /**
     * Менеджер efiWorkShop
     */
    class WSManager extends Observable {

        /**
         * Возвращает идентификатор элемента
         *
         * @param {View|null} view
         * @return {string|null}
         */
        static getViewIdentifier(view) {
            if (!view) return null;
            const attribute = view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME);
            return attribute || null;
        }

        /**
         * Конструктор
         */
        constructor() {
            super();
            this.__selectedView = new ObservableProperty();
            this.__selectedView.change(value => this.notificate("selectionChanged", [value]));
        }

        /**
         * Выделяет элемент
         * @param {View|null} view
         */
        selectView(view) {
            this.__selectedView.set(view);
        }

        /**
         * Возвращает выбранный элемент
         * @return {View|null}
         */
        getSelectedView() {
            return this.__selectedView.get();
        }

        /**
         * Удаляет элемент
         * @param {View|*} view
         */
        removeView(view) {
            if (view && view.__runRemover) {
                if (this.getSelectedView() === view) this.selectView(null);
                WSViewsRegex.default.unregisterView(view);
                view.__runRemover();
                this.notificate("removedView", [view]);
            } else {
                throw Error("Не удалось удалить элемент. Remover не установлен!");
            }
        }

        /**
         * Добавляет слушатель изменения выбранного элемента
         * @param {function(view: View)} o
         */
        addSelectionChangeObserver(o) {
            this.addObserver("selectionChanged", o);
        }

        /**
         * Добавляет слушатель удаления элемента
         * @param {function(view: View)} o
         */
        addRemovedViewObserver(o) {
            this.addObserver("removedView", o);
        }
    }

    /**
     * Стандартный менеджер efiWorkShop
     * @type {WSManager}
     */
    WSManager.default = new WSManager();

    /**
     * Отображение контекстного меню
     * @type {boolean}
     */
    WSManager.showContextMenu = true;

    /**
     * Панель редактирования элемента
     * @class
     * @augments {PanelView}
     */
    class BuilderViewEditorPanel extends GridLayoutView {

        /**
         * Конструктор
         */
        constructor() {
            super();
            this.hidden(true);
        }

        /**
         * Отображает элемент
         * @param {View} view
         */
        present(view) {
            this.getRows().clear();
            if (view === null) {
                return;
            }

            const name = view.constructor.name;
            const fields = getFieldsMap(name);

            this.innerBox.boxTitle(name + ` (${WSManager.getViewIdentifier(view) || "null"})`);

            const box = BuilderViewsFactory.createEditorViewSectionBox("Свойства");
            box.getContainerView().add(this.__createThisGrid(view, fields));
            this.add(box);

            Object.keys((fields.__groups || [])).forEach((groupName, index) => {
                const group = fields.__groups[groupName];
                const box = BuilderViewsFactory.createEditorViewSectionBox(getGroupLang(groupName));
                box.getContainerView().add(this.__createFieldsGrid(group, view));
                this.add(box);
            });

            this.hidden(false);
        }

        __createThisGrid(view, fields) {
            const grid = new GridLayoutView();
            this.__createFieldsGrid(fields, view).getRows().items().forEach(value => {
                grid.add(value);
            });
            grid.add(new Button({text: "Удалить", buttonStyle: Style.danger}).click(() => {
                WSManager.default.removeView(view);
            }).fill());
            return grid;
        }


        /**
         * Создаёт сетку полей
         * @param fields
         * @param view
         * @private
         */
        __createFieldsGrid(fields, view) {
            const grid = new GridLayoutView();
            Object.keys(fields).sort((a, b) => a < b ? -1 : 1).forEach(fieldName => {
                if (fieldName === "__groups") return;
                if (!Guard_3(view[fieldName])) return;
                const currentValue = view[fieldName]();
                const fieldType = fields[fieldName];
                const field = this.createEditableField(view, fieldType, currentValue, fieldName);
                const title = (BuilderViewElementsFieldsLang[fieldName] ?
                    BuilderViewElementsFieldsLang[fieldName] : fieldName) + ":";
                field.change(value => {
                    if (fieldType === "number") value = parseInt(value);
                    if (fieldType === "float") value = parseFloat(value);

                    view[fieldName](value);
                });
                grid.add(BuilderViewsFactory.createGridViewWithTitleAndView(title, field));
            });
            return grid;
        }

        /**
         * Создает редактируемое поле
         * @param item
         * @param type
         * @param value
         * @param name
         */
        createEditableField(item, type, value, name) {
            switch (type) {
                case "dictionary":
                    const df = WSFieldsFactory.createDictionaryInputField(name, value);
                    df.addInputObserver(v => item[name](v));
                    return df;
                case "boolean":
                    return WSFieldsFactory.createBooleanField(name, value);
                case "string":
                    const field = WSFieldsFactory.createStringField(name, value);
                    field.addInputObserver((v) => item[name](v));
                    return field;
                case "number":
                case "float":
                    return WSFieldsFactory.createStringField(name, value);
                case "styles":
                    return WSFieldsFactory.createDictionaryField(name, value, Style.list());
                case "sizes":
                    return WSFieldsFactory.createDictionaryField(name, value, Size.list());
                case "wights":
                    return WSFieldsFactory.createDictionaryField(name, value, Weight.list());
                case "textFieldTypes":
                    return WSFieldsFactory.createDictionaryField(name, value, TextFieldType.list());
                default:
                    return WSFieldsFactory.createStringField(name, value);
            }
        }
    }

    /**
     * Стандартный редактор элементов
     * @type {BuilderViewEditorPanel}
     */
    BuilderViewEditorPanel.default = new BuilderViewEditorPanel();

    /**
     * Отображает редактирование в стандартном редакторе
     * @param {View} view
     */
    BuilderViewEditorPanel.presentViewInDefaultEditor = (view) => {
        BuilderViewEditorPanel.default.present(view);
    };

    /**
     * Фабрика холдеров
     */
    class BuilderPlaceholdersFactory {

        /**
         * Создает простой плейсхолдер, открывающий модальное окно
         * @param {function(view: View, opt: *)} result
         * @return {Control}
         */
        static createPlaceholderWithModal(result) {
            return BuilderViewsFactory.createPlaceholderView().addClickObserver(() => {
                BuilderPlaceholdersFactory.presentCreateItemModal().addCreateObserver((createdView, opt) => {
                    result(createdView, opt);
                    WSManager.default.selectView(createdView);
                });
            });
        }

        /**
         * Добавляет стандартный холдер
         * @param {Control|View} view
         */
        static createBasePlaceholder(view) {
            const holder = this.createPlaceholderWithModal((createdView, opt) => {
                view.removeViewContent();
                view.addSubView(createdView);
                BuilderPlaceholdersFactory.testViewForPlaceholders(createdView, opt);
                createdView.__runRemover = () => {
                    view.removeViewContent();
                    view.getDocument().append(holder.getDocument());
                };
            });
            view.removeViewContent();
            view.getDocument().append(holder.getDocument());
            return holder;
        }

        /**
         * Создает систему холдинга для статистической сетки
         * @param {StaticGridLayoutView} grid - сетка
         */
        static createPlaceholdingSystemForStaticGrid(grid) {
            const rebuildHoldersForGrid = () => {
                for (let i = 0; i < grid.rows(); i++) {
                    for (let j = 0; j < grid.columns(); j++)
                        if (!grid.items()[i * grid.columns() + j]) {
                            const holder = BuilderPlaceholdersFactory.createPlaceholderWithModal((createdView, opt) => {
                                grid.setViewAt(createdView, i, j);
                                BuilderPlaceholdersFactory.testViewForPlaceholders(createdView, opt);
                                createdView.__runRemover = () => {
                                    grid.setViewAt(holder, i, j);
                                };
                            });
                            grid.setViewAt(holder, i, j);
                        }
                }
            };
            grid.getColumnsProperty().change(() => rebuildHoldersForGrid());
            grid.getRowsProperty().change(() => rebuildHoldersForGrid());
            grid.getItemsProperty().change(() => rebuildHoldersForGrid());
            rebuildHoldersForGrid();
        }

        /**
         * Отображает модальное окно создания элемента
         * @return {BuilderViewCreateItemModal}
         */
        static presentCreateItemModal() {
            const modal = new BuilderViewCreateItemModal();
            modal.present();
            return modal;
        }

        /**
         * Тестирует элемент на холдеры и добавляет их
         * @param {View|*} view
         * @param {*} opt
         */
        static testViewForPlaceholders(view, opt) {
            if (view instanceof StaticGridLayoutView) {
                BuilderPlaceholdersFactory.createPlaceholdingSystemForStaticGrid(view);
            } else {
                if (opt.subviews) {
                    Object.keys(opt.subviews).forEach(k =>
                        WSViewsRegex.default.registerView(view[opt.subviews[k]], k, WSUtils.getViewSignatureClassName(view)));
                }
                if (opt.grid) {
                    opt.grid.forEach(value => {
                        BuilderPlaceholdersFactory.createPlaceholdingSystemForStaticGrid(view[value]);
                    });
                }
            }
        }
    }

    /**
     * Рабочая область
     * @class
     */
    class BuilderWorkspacePanel extends TabsPanelView {

        /**
         * Создает рабочую область
         * @return {Control}
         */
        static createWorkspace() {
            const ws = new Control();
            BuilderPlaceholdersFactory.createBasePlaceholder(ws);
            return ws;
        }

        /**
         * Создает элемент просмотра ely JSON View элементов
         * @return {TextAreaField}
         */
        static createEJVViewer() {
            const textAreaField = new TextAreaField({rowsCount: 30});
            textAreaField.getAccessory().style["border"] = "none";
            textAreaField.editable(false);
            return textAreaField;
        }

        /**
         * Конструктор
         */
        constructor() {
            super({tabs: ["Рабочая область", "EJV Viewer"]});

            // Элементы разделов
            this.workspace = BuilderWorkspacePanel.createWorkspace();
            this.ejvViewer = BuilderWorkspacePanel.createEJVViewer();
            this.setTabIndexBody(0, this.workspace);
            this.setTabIndexBody(1, this.ejvViewer);

            // Обработчик выбора раздела
            this.addSelectedObserver(index => {
                if (index === 1) {
                    if (this.workspace.getSubViews()[0])
                        this.ejvViewer.value(JSON.stringify(this.workspace.getSubViews()[0].serialize(), null, 2));
                    else this.ejvViewer.value("{ /* Nothing is here */ }");
                }
            });
            this.selectedTabIndex(0);
        }

    }

    BuilderWorkspacePanel.default = new BuilderWorkspacePanel();

    /**
     * Контекстное меню строителя
     * @class
     */
    class BuilderContextMenuView extends PanelView {

        /**
         * Конструктор
         */
        constructor() {
            super({panelHover: false});
            this.addClass("vb-context");
            this.hidden(true);
            this.width(230);
            this.getStyle().position = "absolute";
        }

        /**
         * Отображает контекстное меню
         *
         * @param {View} view
         * @param {number} x
         * @param {number} y
         */
        present(view, x, y) {
            this.getContentView().getRows().clear();

            this.getStyle().left = `${x}px`;
            this.getStyle().top = `${y}px`;

            this.createTitle(view);
            this.createEditButton(view);
            this.createRemoveButton(view);
            this.hidden(false);
        }

        /**
         * Создает объект заголовка
         * @param {View} view
         */
        createTitle(view) {
            const name = view.constructor.name;
            const id = view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME);
            const title = new TextView({
                text: `${name} (${id || "null"})`,
                opacity: 0.5,
            });
            this.getContentView().add(title);
        }

        /**
         * Создаёт кнопку редактирования
         * @param {View} view
         */
        createEditButton(view) {
            const button = new Button({
                text: "Изменить",
                fill: true,
            }).click(() => {
                WSManager.default.selectView(view);
                this.hidden(true);
            });
            this.getContentView().add(button);
        }

        /**
         * Создаёт кнопку удаления
         * @param {View} view
         */
        createRemoveButton(view) {
            const button = new Button({
                text: "Удалить",
                fill: true,
                buttonStyle: Style.danger,
            }).click(() => {
                WSManager.default.removeView(view);
                this.hidden(true);
            });
            this.getContentView().add(button);
        }
    }

    /**
     * Стандартное контекстное меню
     * @type {BuilderContextMenuView}
     */
    BuilderContextMenuView.default = new BuilderContextMenuView();

    /**
     * Отображает контекстно меню для элемента с координатами
     * @param {View} view
     * @param {number} x
     * @param {number} y
     */
    BuilderContextMenuView.presentDefaultContextMenuForView = (view, x, y) => {
        BuilderContextMenuView.default.present(view, x, y);
    };

    class WSSidebarBuilderView extends GridLayoutView {

        constructor() {
            super({});

            this.add(WSSidebarBuilderView.createMainTools());
        }

        /**
         * Создает основные инструменты
         * @return {BoxHeaderView}
         */
        static createMainTools() {
            /**
             * Переключатель контекстного меню
             * @return {GridLayoutView}
             */
            function createSwitchContextMenuItem() {
                const field = WSFieldsFactory.createBooleanField("Display context menu", true);
                field.change(value => WSManager.showContextMenu = value);
                return BuilderViewsFactory.createGridViewWithTitleAndView("Контекстное меню", field);
            }

            const box = BuilderViewsFactory.createEditorViewSectionBox("Основное");
            box.getContainerView().add(createSwitchContextMenuItem());
            return box;
        }

    }

    /**
     * Стандартный элемент
     * @type {WSSidebarBuilderView}
     */
    WSSidebarBuilderView.default = new WSSidebarBuilderView();

    /**
     * Элемент боковой панели: список элементов
     */
    class WSSidebarViewsView extends GridLayoutView {

        /**
         * Создаёт элемент отображегия в списке
         * @param {string} id
         * @param {View} view
         */
        static createViewRowForList(id, view) {
            const box = new BoxView({styleNoSelect: true, styleClickable: true});
            const name = WSUtils.getViewSignatureClassName(view).toUpperCase();

            const viewIdTextView = new TextView({text: id});
            viewIdTextView.getDocument().innerHTML += `<b style="float: right">${name[0]}</b>`;

            box.addClickObserver(() => {
                WSManager.default.selectView(view);
            });
            box.addMouseEnterObserver(() => {
                view.animateCss("flash");
            });
            box.getContainerView().add(viewIdTextView);
            return box;
        }

        /**
         * Конструктор
         */
        constructor() {
            super();

            WSViewsRegex.default.addViewRegisteredObserver(() => this.update());
            WSViewsRegex.default.addViewUnregisteredObserver(() => this.update());
        }

        /**
         * Обновление элементов
         */
        update() {
            this.denyRebuild(true);
            this.getRows().clear();
            Object.keys(WSViewsRegex.default.getRegisteredViews()).forEach(key => {
                if (WSViewsRegex.default.getRegisteredViews()[key]) {
                    this.add(WSSidebarViewsView.createViewRowForList(key, WSViewsRegex.default.getRegisteredViews()[key]));
                }
            });
            this.denyRebuild(false);
            this.rebuild();
        }
    }

    /**
     * Стандартный список элементов боковой панели
     * @type {WSSidebarViewsView}
     */
    WSSidebarViewsView.default = new WSSidebarViewsView();

    /**
     * Боковая панель навигации
     */
    class BuilderSideNavigationView extends TabsPanelView {

        /**
         * Конструктор
         */
        constructor() {
            super({tabs: ["Элементы", "Объект", "Builder"]});
            this.addClass("--vertical");
            this.removeClass("--hover");

            this.removeViewContent();
            this.getContainerView().getStyle().padding = "0";
            this.getDocument().append(this.getContainerView().getDocument());
            this.getDocument().append(this.getHeaderView().getDocument());

            this.css({
                width: "100%",
                height: "100%",
            });
            this.disableObjectTab();
        }

        /**
         * Выполняет перестроение элемента
         * @private
         */
        __rebuild() {
            super.__rebuild();
            const ch = this.getHeaderView().getScrollView().getWrapperView().getDocument()
                .getElementsByClassName("--item");
            for (let i = 0; i < this.tabs().length; i++) {
                ch.item(i).style["margin-top"] = "-14px";
                ch.item(i).style["margin-left"] = "-56px";
                ch.item(i).style["padding"] = "12px";
            }


        }

        /**
         * Скрывает панель объектов
         */
        disableObjectTab() {
            if (this.tabs().indexOf("Объект") > -1) {
                this.tabs(["Элементы", "Builder"]);
                this.setTabIndexBody(1, null);

                this.setTabIndexBody(0,
                    BuilderViewsFactory.createSidebarScrollBox("Элементы", WSSidebarViewsView.default));
                this.setTabIndexBody(1,
                    BuilderViewsFactory.createSidebarScrollBox("Builder", WSSidebarBuilderView.default));
            }
        }

        /**
         * Отображает панель объектов
         */
        enableObjectTab() {
            if (this.tabs().indexOf("Объект") === -1) {
                this.tabs(["Элементы", "Объект", "Builder"]);
                const objectContainer = BuilderViewsFactory.createSidebarScrollBox("Объект", BuilderViewEditorPanel.default);
                BuilderViewEditorPanel.default.innerBox = objectContainer;
                this.setTabIndexBody(1, objectContainer);

                this.setTabIndexBody(0,
                    BuilderViewsFactory.createSidebarScrollBox("Элементы", WSSidebarViewsView.default));
                this.setTabIndexBody(2,
                    BuilderViewsFactory.createSidebarScrollBox("Builder", WSSidebarBuilderView.default));
            }
        }

    }

    /**
     * Стандартный сайдбар
     * @type {BuilderSideNavigationView}
     */
    BuilderSideNavigationView.default = new BuilderSideNavigationView();

    /**
     * Менеджер контекстного меню efiWorkShop
     * @class
     */
    class WSContextMenu {

        /**
         * Отображает контекстное меню
         * @param {MouseEvent} ev
         */
        static displayContextMenu(ev) {
            if (WSManager.showContextMenu) {
                ev.preventDefault();
                let view = ev.target;
                while (view != null) {
                    if (view.hasAttribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME)) break;
                    view = view.parentElement;
                }
                if (view) {
                    const item = WSViewsRegex.default.getView(view.getAttribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME));
                    BuilderContextMenuView.presentDefaultContextMenuForView(item, ev.pageX, ev.pageY);
                } else {
                    BuilderContextMenuView.default.hidden(true);
                }
            }
        }

        /**
         * Скрывает контекстное меню
         */
        static hideContextMenu() {
            BuilderContextMenuView.default.hidden(true);
        }

        /**
         * Применяет обработчик контекстного меню
         */
        static applyContextMenuHandler() {
            window.oncontextmenu = ev => WSContextMenu.displayContextMenu(ev);
            window.onclick = ev => {
                let view = ev.target;
                while (view != null) {
                    if (view.classList.contains("vb-context")) return;
                    view = view.parentElement;
                }
                WSContextMenu.hideContextMenu();
            };
        }
    }

    /**
     * Контроллер строителя
     */
    class BuilderViewController extends ViewController {

        constructor(props) {
            super(props);

            this.sidePanelsGrid = new GridLayoutView();
            this.itemsPanel = new PanelView({panelTitle: "Элементы"});
            this.sidePanelsGrid.add(this.itemsPanel);
            this.sidePanelsGrid.add(BuilderViewEditorPanel.default);

            this.__addStyles();

            WSContextMenu.applyContextMenuHandler();
        }

        viewDidLoad() {
            const grid = new GridLayoutView();
            WSManager.default.addSelectionChangeObserver(view => {
                if (view === null) {
                    BuilderSideNavigationView.default.selectedTabIndex(0);
                    BuilderSideNavigationView.default.disableObjectTab();
                } else {
                    BuilderSideNavigationView.default.enableObjectTab();
                    BuilderViewEditorPanel.presentViewInDefaultEditor(view);
                    BuilderSideNavigationView.default.selectedTabIndex(1);
                }
            });

            app().getApplicationDocument().getBody()
                .getDocument().append(BuilderContextMenuView.default.getDocument());


            BuilderSideNavigationView.default.getStyle().height
                = (document.documentElement.clientHeight - 2) + "px";
            BuilderWorkspacePanel.default.getStyle().height
                = (document.documentElement.clientHeight) - 2 + "px";
            grid.add(BuilderWorkspacePanel.default, BuilderSideNavigationView.default);

            grid.rowAt(0).columnAt(0).width("75%");
            grid.rowAt(0).columnAt(1).width("25%");
            grid.rowAt(0).columnAt(0).getStyle().padding = "0";
            grid.rowAt(0).columnAt(0).getStyle().marginRight = "-1px";
            grid.rowAt(0).columnAt(1).getStyle().padding = "0";

            this.view.addSubView(grid);
            app().containerView.getStyle().maxWidth = "100%";
            app().wrapperView.getStyle().margin = "0";
            app().footerView.removeFromSuperview();
            app().getApplicationDocument().getBody().getStyle().overflowX = "hidden";
        }


        /**
         * Добавляет необходимые стили
         * @private
         */
        __addStyles() {
            AppStylesheet.global.addClass("view-placeholder", {
                border: "4px dashed #afafaf",
                margin: "2px",
                padding: "15px",
                cursor: "pointer",
                textAlign: "center",
                color: "#afafaf",
                opacity: 0.35,
                transition: "all 0.5s"
            });
            AppStylesheet.global.addClass("view-placeholder:hover", {
                opacity: 1,
            });
            AppStylesheet.global.addClass("view-create-item", {
                border: "4px dashed #232323",
                color: "#232323",
                backgroundColor: "#aaa",
                margin: "2px",
                padding: "8px",
                opacity: 0.45,
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.5s"
            });

            AppStylesheet.global.addClass("view-create-item:hover", {
                opacity: 1,
            });
        }

        addGridPlaceholders(grid) {
            grid.add(this.createPlaceholderView(grid));
        }

        /**
         * Создает модальное окно нового элемента
         * @param result
         */
        presentAddItemModal(result) {
            const modal = new BuilderViewCreateItemModal();
            modal.addCreateObserver((view, opt) => result(view, opt));
            modal.present();
        }
    }

    /**
     * Класс контроллера отображения Index (главного экрана)
     *
     * @controller IndexViewController
     * @controllerName Index
     */

    //
    //  Обработка завершения запуска приложения
    //
    elyOnReady(next => {

        // Регистрация контроллера в приложении по имени
        addController("index", new IndexViewController());
        addController("config", new ConfigViewController());
        addController("server", new ServerViewController());

        //efx-app
        addController("dbview", new DatabaseViewController());

        // View Builder
        addController("index", new BuilderViewController());

        // Сообщает приложению, что все успешно запустилось.
        // Попробуйте раскомментировать строку ниже для примера и понимания.
        // next(false, "Необязательное описание ошибки");
        getWorkingDirectoryCommand((s, res) => {
            if (res.directory) {
                workingDirectoryField.value(res.directory);
                next(true);
            } else {
                next(false, "Не удалось соединиться с efi.cli =(");
            }
        });
    });

}());
