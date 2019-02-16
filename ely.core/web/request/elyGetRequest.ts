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

import elyLogger from "@core/elyLogger";
import elyObservable from "@core/observable/elyObservable";
import elyURL from "@core/web/url/elyURL";

type elyWebRequestSendObserver = (response: any, status: number) => void;
type elyWebRequestProgressChangedObserver = (loadedBytes: number, totalBytes: number) => void;
type elyWebRequestErrorObserver = (error: any) => void;
type elyWebRequestAbortObserver = () => void;

/**
 * Выполняет GET запрос
 */
export default class elyGetRequest extends elyObservable {

    /**
     * URL адрес
     */
    public readonly url: elyURL;

    /**
     * Запрос
     */
    public readonly xhr: XMLHttpRequest;

    /**
     * Парсинг запроса
     */
    public useJson: boolean = true;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: { url: elyURL | string } | string) {
        super();
        if (typeof options === "string") options = {url: options};
        if (typeof options.url === "string") options.url = new elyURL(options.url);
        this.url = options.url;
        this.xhr = new XMLHttpRequest();
        this.applyListeners(this.xhr);
    }

    /**
     * Отправляет запрос
     * @param data
     * @param callback
     */
    public send(data: { [name: string]: any } | string, callback?: elyWebRequestSendObserver): void {
        const params = typeof data === "string" ? data : Object.keys(data).map(k => encodeURIComponent(k) + "="
            + encodeURIComponent(data[k])).join("&");
        this.xhr.open("GET", this.url.absoluteString + "?" + params);
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === XMLHttpRequest.DONE) {
                let resp = this.xhr.response;
                try {
                    if (this.useJson)
                        resp = JSON.parse(resp);
                } catch (e) {
                    elyLogger.warning("Ошибка возникла при обработке JSON в elyGetRequest! " + this.url.absoluteString);
                    elyLogger.debugObject(this);
                    resp = null;
                }
                if (callback) callback(resp, this.xhr.status);
            }
        };
        this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.xhr.send();
    }

    /**
     * Добавляет слушатель изменения прогресса
     * @param observer
     */
    public addProgressChangedObserver(observer: elyWebRequestProgressChangedObserver): elyGetRequest {
        this.addObserver("progressChanged", observer);
        return this;
    }

    /**
     * Добавляет слушатель ошибки
     * @param observer
     */
    public addErrorObserver(observer: elyWebRequestErrorObserver): elyGetRequest {
        this.addObserver("error", observer);
        return this;
    }

    /**
     * Добавляет слушатель прерывания запроса
     * @param observer
     */
    public addAbortObserver(observer: elyWebRequestAbortObserver): elyGetRequest {
        this.addObserver("abort", observer);
        return this;
    }

    /**
     * Добавляет слушатели
     * @ignore
     */
    protected applyListeners(xhr: XMLHttpRequest): void {
        xhr.onerror = ev => this.notificate("error", [ev]);
        xhr.onprogress = ev => this.notificate("progressChanged", [ev.loaded, ev.total]);
        xhr.onabort = () => this.notificate("abort", []);
    }

}
