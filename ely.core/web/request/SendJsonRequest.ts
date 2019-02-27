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

import URLRequest, {TURLCallback, URLRequestMethod, URLRequestOptions} from "./URLRequest";

/**
 * Опции {@link SendJsonRequest}
 */
export interface SendJsonRequestOptions extends URLRequestOptions {
    object?: any;
}

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
export default class SendJsonRequest extends URLRequest {

    /**
     * Выполняет отправку JSON данных
     *
     * @param {string} url - адрес
     * @param {*} object - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     */
    public static send(url: string, object: any, callback?: TURLCallback): void {
        new SendJsonRequest({url, object}).send(callback);
    }

    /**
     * @ignore
     */
    protected __object: any;

    /**
     * Конструктор
     * @param {SendJsonRequestOptions} options
     */
    public constructor(options: SendJsonRequestOptions) {
        super(options);
        this.__object = options.object;
    }

    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     */
    public send(callback?: TURLCallback): void {
        this.__method = URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);
        this.getXMLHttpRequest().send(JSON.stringify(this.getObject()));
    }

    /**
     * Устаналивает объект для передачи
     * @param {*} obj
     * @return {this}
     */
    public setObject(obj: any): SendJsonRequest {
        this.__object = obj;
        return this;
    }

    /**
     * Возвращает объект для передачи
     * @return {*}
     */
    public getObject(): any {
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
