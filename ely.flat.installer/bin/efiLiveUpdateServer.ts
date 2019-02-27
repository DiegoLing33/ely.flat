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
 + Файл: efiLiveUpdateServer.ts                                               +
 + Файл изменен: 17.02.2019 22:22:54                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as bodyParser from "body-parser";
import express = require("express");
// @ts-ignore
import filewatcher = require("filewatcher");
import * as http from "http";
import elyXLogger from "./core/elyXLogger";

/**
 * Сервер живого обновления
 * @class efiLiveUpdateServer
 */
export class efiLiveUpdateServer {

    public readonly app: express.Express;
    public server?: http.Server;
    public readonly port: number;
    public readonly host: string;
    public readonly logger: elyXLogger;

    /**
     * Конструктор
     * @param props
     */
    constructor(props: { port?: number, host?: string, logger?: elyXLogger } = {}) {
        this.port = props.port || 1580;
        this.host = props.host || "127.0.0.1";
        this.logger = props.logger || elyXLogger.default;
        this.app = express();
    }

    /**
     * Запускает сервер
     * @param path
     * @param callback
     * @param change
     */
    public runServer(path: string, callback: (err?: string) => void, change: (file: any, stat: any) => void): void {
        this.logger.log("[~~] Запуск LIVE UPDATE сервера...");
        try {
            this.server = this.app.listen(this.port, () => {
                this.logger.log("[OK] Запуск LIVE UPDATE сервера.");
                this.app.use(express.static(path + "/build"));

                this.app.use("/app.config.json", (req: any, res: any) => {
                    res.sendFile(path + "/build/app.config.json");
                });

                this.app.use(bodyParser.urlencoded({
                    extended: true,
                }));

                this.app.use(bodyParser.json());

                this.logger.log("[~~] Запуск watcher...");
                const watcher = filewatcher();
                watcher.add(path + "/app.js");
                this.logger.log("[OK] Запуск watcher...");
                watcher.on("change", (file: any, stat: any) => {
                    change(file, stat);
                });
                callback();
            });
        } catch (e) {
            this.logger.error("[XX] Запуск LIVE UPDATE сервера: " + e.message);
            callback(e.message);
        }
    }

    /**
     * Останавливает сервер
     * @param callback
     */
    public stop(callback: (err?: string) => void): void {
        this.logger.log("[~~] Остановка LIVE UPDATE сервера...");
        try {
            this.server.close(() => {
                this.logger.log("[OK] Остановка LIVE UPDATE сервера.");
                callback();
            });
        } catch (e) {
            this.logger.log("[XX] Остановка LIVE UPDATE сервера: " + e.message);
            callback(e.message);
        }
    }

}
