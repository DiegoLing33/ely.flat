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
 + Файл: efiDatabaseClient.ts                                                 +
 + Файл изменен: 26.02.2019 03:30:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Observable from "ely.core/dist/observable/Observable";

/**
 * Опции {@link efiDatabaseClient}
 */
export interface efiDatabaseClientOptions {
    host?: string;
    port?: number;
}

/**
 * Клиент для соединения с базой efi
 * @class efiDatabaseClient
 * @augments {Observable}
 */
export class efiDatabaseClient extends Observable {
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
    public constructor(props: efiDatabaseClientOptions = {}) {
        super();
        if (props.host) this.__host = props.host;
        if (props.port) this.__port = props.port;
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
}

export class efiDatabaseClientTable {

    protected constructor() {

    }
}

/**
 * @typedef {Object} efiDatabaseClientOptions
 * @property {string} [host]
 * @property {number} [port]
 */
