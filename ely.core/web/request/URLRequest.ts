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

import {variable} from "../../Guard";
import Observable from "../../observable/Observable";

/**
 * Тип возвращаемого ответа
 */
export type TURLCallback = (response: any, result: boolean) => void;

/**
 * Прогресс выполнения запроса изменен
 */
export type TURLProgressChangedCallback = (loadedBytes: number, totalBytes: number) => void;

/**
 * Методы передачи параметров
 * @enum
 */
export enum URLRequestMethod {
    GET = "GET",
    POST = "POST",
}

/**
 * Названия заголовков запроса
 * @enum
 */
export enum URLRequestHeaderName {
    contentType = "Content-type",
}

/**
 * Данные запроса
 */
export interface TRequestData {
    [name: string]: any;
}

/**
 * Опции {@link URLRequest}
 */
export interface URLRequestOptions {
    url: string;
    method?: URLRequestMethod;
    async?: boolean;
    data?: TRequestData;
}

/**
 * URL запрос
 * @class URLRequest
 * @augments {Observable}
 */
export default class URLRequest extends Observable {

    /**
     * Отправляет GET запрос
     *
     * @param {string} url
     * @param {* | TURLCallback} data
     * @param {TURLCallback} callback
     */
    public static sendGET(url: string, data?: any | TURLCallback, callback?: TURLCallback): void {
        if (typeof data === "function") new URLRequest({url}).send(data);
        else new URLRequest({url, data}).send(callback);
    }

    /**
     * @ignore
     */
    protected readonly __url: string;

    /**
     * @ignore
     */
    protected readonly __data: TRequestData;

    /**
     * @ignore
     */
    protected readonly __xhr: XMLHttpRequest;

    /**
     * @ignore
     */
    protected __method: URLRequestMethod;

    /**
     * @ignore
     */
    protected __async: boolean = true;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: URLRequestOptions) {
        super();
        this.__url = options.url;
        this.__xhr = new XMLHttpRequest();
        this.__method = options.method || URLRequestMethod.GET;
        this.__data = options.data || {};
        variable<boolean>(options.async, value => this.__async = value, true);
    }

    /**
     * Возвращает URL запроса
     * @return {string}
     */
    public getURL(): string {
        return this.__url;
    }

    /**
     * Возвращает данные запроса
     * @return {*}
     */
    public getData(): TRequestData {
        return this.__data;
    }

    /**
     * Возвращает true, если запрос асинхронный
     * @return {boolean}
     */
    public isAsync(): boolean {
        return this.__async;
    }

    /**
     * Возвращает метод
     * @return URLRequestMethod
     */
    public getMethod(): URLRequestMethod {
        return this.__method;
    }

    /**
     * Устанавливает данные
     * @param name
     * @param value
     */
    public setData(name: string, value: any): URLRequest {
        this.__data[name] = value;
        return this;
    }

    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     * @return URLRequest
     */
    public send(callback?: TURLCallback): void {
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
    public setHeader(name: string | URLRequestHeaderName, value: string): URLRequest {
        this.getXMLHttpRequest().setRequestHeader(name, value);
        return this;
    }

    /**
     * Возвращает ядро запроса
     * @return {XMLHttpRequest}
     */
    public getXMLHttpRequest(): XMLHttpRequest {
        return this.__xhr;
    }

    /**
     * Добавляет наблюдатель: изменение прогресса
     *
     * Имя обсервера: progressChanged
     *
     * @param o - наблюдатель
     */
    public addProgressChangedObserver(o: TURLProgressChangedCallback): URLRequest {
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
    public addReadyObserver(o: TURLCallback): URLRequest {
        this.addObserver("ready", o);
        return this;
    }

    /**
     * Возвращает строку параметров
     * @private
     */
    protected __getParametersString(): string {
        return Object
            .keys(this.getData())
            .map((key) => {
                return key + "=" + encodeURIComponent(this.getData()[key]);
            })
            .join("&");
    }

    protected __prepareXMLHttpRequestCore(callback?: TURLCallback): void {
        this.getXMLHttpRequest().open(this.getMethod(), this.getURL() + "?" +
            this.__getParametersString(), this.isAsync());
        this.getXMLHttpRequest().onprogress = ev => {
            this.notificate("progressChanged", [ev.loaded, ev.total]);
        };
        this.getXMLHttpRequest().onreadystatechange = () => {
            if (this.getXMLHttpRequest().readyState === 4) {
                if (this.getXMLHttpRequest().status === 200) {
                    if (callback) callback(this.getXMLHttpRequest().responseText, true);
                    this.notificate("ready", [this.getXMLHttpRequest().responseText, true]);
                } else {
                    if (callback) callback(null, false);
                    this.notificate("ready", [null, false]);
                }
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
