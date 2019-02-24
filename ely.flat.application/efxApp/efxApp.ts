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

import elyObservable from "@core/observable/elyObservable";
import elyGetRequest from "@core/web/request/elyGetRequest";

/**
 * Приложение efX-app
 * @class {efxApp}
 * @augments {elyObservable}
 */
export class efxApp extends elyObservable {

    /**
     * @protected
     * @ignore
     */
    protected __isConnected: boolean = false;

    /**
     * @protected
     * @ignore
     */
    protected __host: string = "http://localhost";

    /**
     * @protected
     * @ignore
     */
    protected __port: number = 1583;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: any = {}) {
        super();
    }

    /**
     * Возвращает состояние подключения
     * @return {boolean}
     */
    public isConnected(): boolean {
        return this.__isConnected;
    }

    /**
     * Возвращает хост соединения
     * @return {string}
     */
    public getHost(): string {
        return this.__host;
    }

    /**
     * Возвращает порт соединения
     * @return {number}
     */
    public getPort(): number {
        return this.__port;
    }

    /**
     * Соединяется с сервером efX-app
     * @param callback
     */
    public connect(callback: (result: boolean) => void): void {
        this.sendRaw("testEFX", {}, (result, response) => {
            this.__isConnected = result;
            callback(result);
        });
    }

    public sendRaw(method: string, data: any, callback: (result: boolean, response: any) => void): void {
        const req = new elyGetRequest({url: this.getHost() + ":" + this.getPort() + "/r/" + method});
        req.send(data, (response, status1) => {
            if (!response || !response.response) {
                callback(false, null);
            } else {
                callback(response.response, response);
            }
        });
    }
}
