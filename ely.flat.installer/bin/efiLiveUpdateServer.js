"use strict";
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
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
// @ts-ignore
var filewatcher = require("filewatcher");
var elyXLogger_1 = require("./core/elyXLogger");
/**
 * Сервер живого обновления
 * @class efiLiveUpdateServer
 */
var efiLiveUpdateServer = /** @class */ (function () {
    /**
     * Конструктор
     * @param props
     */
    function efiLiveUpdateServer(props) {
        if (props === void 0) { props = {}; }
        this.port = props.port || 1580;
        this.host = props.host || "127.0.0.1";
        this.logger = props.logger || elyXLogger_1["default"]["default"];
        this.app = express();
    }
    /**
     * Запускает сервер
     * @param path
     * @param callback
     * @param change
     */
    efiLiveUpdateServer.prototype.runServer = function (path, callback, change) {
        var _this = this;
        this.logger.log("[~~] Запуск LIVE UPDATE сервера...");
        try {
            this.server = this.app.listen(this.port, function () {
                _this.logger.log("[OK] Запуск LIVE UPDATE сервера.");
                _this.app.use(express.static(path + "/build"));
                _this.app.use("/app.config.json", function (req, res) {
                    res.sendFile(path + "/build/app.config.json");
                });
                _this.app.use(bodyParser.urlencoded({
                    extended: true
                }));
                _this.app.use(bodyParser.json());
                _this.logger.log("[~~] Запуск watcher...");
                var watcher = filewatcher();
                watcher.add(path + "/app.js");
                _this.logger.log("[OK] Запуск watcher...");
                watcher.on("change", function (file, stat) {
                    change(file, stat);
                });
                callback();
            });
        }
        catch (e) {
            this.logger.error("[XX] Запуск LIVE UPDATE сервера: " + e.message);
            callback(e.message);
        }
    };
    /**
     * Останавливает сервер
     * @param callback
     */
    efiLiveUpdateServer.prototype.stop = function (callback) {
        var _this = this;
        this.logger.log("[~~] Остановка LIVE UPDATE сервера...");
        try {
            this.server.close(function () {
                _this.logger.log("[OK] Остановка LIVE UPDATE сервера.");
                callback();
            });
        }
        catch (e) {
            this.logger.log("[XX] Остановка LIVE UPDATE сервера: " + e.message);
            callback(e.message);
        }
    };
    return efiLiveUpdateServer;
}());
exports.efiLiveUpdateServer = efiLiveUpdateServer;
