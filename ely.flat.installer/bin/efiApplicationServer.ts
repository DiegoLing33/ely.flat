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
 + Файл: efiApplicationServer.ts                                              +
 + Файл изменен: 17.02.2019 21:02:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import express = require("express");
import * as http from "http";
import elyXLogger from "../core/elyXLogger";
import {efi, TResultCallback} from "./efi";

/**
 * Сервер
 * @class efiApplicationServer
 */
export class efiApplicationServer {

    /**
     * Методы сервера
     */
    public static methods = {
        build: "/build",
        compile: "/compile",
        getConfig: "/getConfig",
        getWorkingDirectory: "/getWorkingDirectory",
        init: "/init",
        isLiveUpdateServerRunning: "/isLiveUpdateServerRunning",
        runLiveUpdateServer: "/runLiveUpdateServer",
        setConfigValue: "/setConfigValue",
        setWorkingDirectory: "/setWorkingDirectory",
        stopLiveUpdateServer: "/stopLiveUpdateServer",
    };

    /**
     * Приложение
     * @type {Express}
     */
    public readonly app: express.Express;

    /**
     * Порт
     * @type {number}
     */
    public readonly port: number;

    /**
     * Сервер
     * @type {*}
     */
    public server?: http.Server;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { logger?: elyXLogger, port?: number } = {}) {
        this.app = express();
        this.port = props.port || 1583;
    }

    /**
     * Запускает сервер
     * @param callback
     */
    public startServer(callback: TResultCallback) {
        try {
            this.server = this.app.listen(this.port, () => {
                efi.logger.log("Сервер успешно запущен. Порт: " + this.port);
                this.__server();
                callback(true);
            });
        } catch (e) {
            efi.logger.error("Ошибка запуска сервера: " + e.message);
            callback(false);
        }
    }

    /**
     * Функция сервера
     * @private
     */
    protected __server() {
        this.app.get(efiApplicationServer.methods.getWorkingDirectory, (req, res) => {
            efi.logger.log("GUI запрос: получение рабочей директории");
            efi.checkElyFlatExists(efi.workingDirectory, result => {
                response(res, true, {
                    directory: efi.workingDirectory,
                    efHere: result,
                    version: require("../package.json").version,
                });
            });
        });

        this.app.get(efiApplicationServer.methods.setWorkingDirectory, (req, res) => {
            efi.logger.log(`GUI запрос: установка рабочей директории [${req.query.directory}]`);
            efi.changeWorkingDirectory(req.query.directory, (error, efHere) => {
                response(res, !error, {efHere, error});
            });
        });

        this.app.get(efiApplicationServer.methods.init, (req, res) => {
            efi.logger.log(`GUI запрос: инициилизация приложения в рабочей директории`);
            efi.initTheApplication(efi.workingDirectory, (error) => {
                response(res, !error, {error});
            });
        });

        this.app.get(efiApplicationServer.methods.build, (req, res) => {
            efi.logger.log(`GUI запрос: сборка приложения в рабочей директории`);
            efi.buildTheApplication(efi.workingDirectory, (error) => {
                response(res, !error, {error});
            });
        });

        this.app.get(efiApplicationServer.methods.compile, (req, res) => {
            efi.logger.log(`GUI запрос: простроение приложения в рабочей директории`);
            efi.compileTheApplication(efi.workingDirectory, (error) => {
                response(res, !error, {error});
            });
        });

        this.app.get(efiApplicationServer.methods.runLiveUpdateServer, (req, res) => {
            efi.logger.log(`GUI запрос: запуск live update сервера`);
            efi.runLiveUpdateServer(efi.workingDirectory, (error) => {
                response(res, !error, {error});
            });
        });

        this.app.get(efiApplicationServer.methods.stopLiveUpdateServer, (req, res) => {
            efi.logger.log(`GUI запрос: остановка live update сервера`);
            efi.stopLiveUpdateServer(efi.workingDirectory, (error) => {
                response(res, !error, {error});
            });
        });

        this.app.get(efiApplicationServer.methods.isLiveUpdateServerRunning, (req, res) => {
            efi.logger.log(`GUI запрос: состояние live update сервера`);
            efi.isLiveUpdateServerRunning((server) => {
                response(res, true, {server});
            });
        });

        this.app.get(efiApplicationServer.methods.setConfigValue, (req, res) => {
            efi.logger.log(`GUI запрос: установка конфигурации ${req.query.path} -> ${req.query.value}`);
            efi.writeConfigFromString(efi.workingDirectory, req.query.path, req.query.value, error => {
                if (error) {
                    response(res, !error, {error});
                    return;
                }
                efi.compileTheApplication(efi.workingDirectory, error => {
                    response(res, !error, {error});
                });
            });
        });

        this.app.get(efiApplicationServer.methods.getConfig, (req, res) => {
            efi.logger.log(`GUI запрос: получение конфигурации`);
            efi.checkElyFlatExists(efi.workingDirectory, result => {
                if (result) {
                    res.sendFile(efi.workingDirectory + "/app.config.json");
                } else {
                    response(res, false, {error: "Конфигурация не найдена!"});
                }
            });
        });

        /**
         * Отображает ответ
         * @param res
         * @param result
         * @param data
         */
        function response(res, result, data) {
            res.send({response: result, ...data});
        }
    }

}