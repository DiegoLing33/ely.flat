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

import {Web} from "ely.core";
import Observable from "ely.core/dist/observable/Observable";

/**
 * Приложение efX-app
 * @class {efxApp}
 * @augments {Observable}
 */
export class efxApp extends Observable {

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
    public connect(callback: (result: any) => void): void {
        this.sendRaw("list", {}, (res) => {
            const self = this;
            this.__isConnected = res.status;
            if (res.status) {
                const obj = {};
                (res.response as string[]).forEach(value => {
                    Object.defineProperty(obj, value, {
                        get: () => {
                            return {
                                rows(data: any, callback: (a: any) => void) {
                                    self.sendRaw("select", {table: value, ...data}, response => {
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

    public global(callback: (db: any) => void): void {
        this.sendRaw("select", {table: "global"}, response => {
            const obj: any = {};
            response.response.forEach((o: any) => {
                obj[o.name] = {
                    value: o.value,
                    set(value: any, callback: () => void) {
                        this.sendRaw("set", {table: "global", id: o.id}, (a: any) => {
                            callback();
                        });
                    },
                };

            });
            callback(obj);
        });
    }

    public sendRaw(method: string, data: any, callback: (response: any) => void): void {
        Web.Requests.URLRequest.sendGET(this.getHost() + ":" + this.getPort() + "/db/" + method, data, response => {
           callback(response);
        });
    }
}
