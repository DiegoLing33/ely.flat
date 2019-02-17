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
 + Файл: efiApplicationServer.ts                                              +
 + Файл изменен: 17.02.2019 21:02:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require("express");
var efi_1 = require("./efi");
/**
 * Сервер
 * @class efiApplicationServer
 */
var efiApplicationServer = /** @class */ (function () {
    /**
     * Конструктор
     * @param props
     */
    function efiApplicationServer(props) {
        if (props === void 0) { props = {}; }
        this.app = express();
        this.port = props.port || 1583;
    }
    /**
     * Запускает сервер
     * @param callback
     */
    efiApplicationServer.prototype.startServer = function (callback) {
        var _this = this;
        try {
            this.server = this.app.listen(this.port, function () {
                efi_1.efi.logger.log("Сервер успешно запущен. Порт: " + _this.port);
                _this.__server();
                callback(true);
            });
        }
        catch (e) {
            efi_1.efi.logger.error("Ошибка запуска сервера: " + e.message);
            callback(false);
        }
    };
    /**
     * Функция сервера
     * @private
     */
    efiApplicationServer.prototype.__server = function () {
        this.app.get(efiApplicationServer.methods.getWorkingDirectory, function (req, res) {
            efi_1.efi.logger.log("GUI запрос: получение рабочей директории");
            efi_1.efi.checkElyFlatExists(efi_1.efi.workingDirectory, function (result) {
                response(res, true, {
                    directory: efi_1.efi.workingDirectory,
                    efHere: result,
                    version: require("../package.json").version
                });
            });
        });
        this.app.get(efiApplicationServer.methods.setWorkingDirectory, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438 [" + req.query.directory + "]");
            efi_1.efi.changeWorkingDirectory(req.query.directory, function (error, efHere) {
                response(res, !error, { efHere: efHere, error: error });
            });
        });
        this.app.get(efiApplicationServer.methods.init, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u0438\u043D\u0438\u0446\u0438\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438");
            efi_1.efi.initTheApplication(efi_1.efi.workingDirectory, function (error) {
                response(res, !error, { error: error });
            });
        });
        this.app.get(efiApplicationServer.methods.build, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u0441\u0431\u043E\u0440\u043A\u0430 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438");
            efi_1.efi.buildTheApplication(efi_1.efi.workingDirectory, function (error) {
                response(res, !error, { error: error });
            });
        });
        this.app.get(efiApplicationServer.methods.compile, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u043F\u0440\u043E\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438");
            efi_1.efi.compileTheApplication(efi_1.efi.workingDirectory, function (error) {
                response(res, !error, { error: error });
            });
        });
        this.app.get(efiApplicationServer.methods.runLiveUpdateServer, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u0437\u0430\u043F\u0443\u0441\u043A live update \u0441\u0435\u0440\u0432\u0435\u0440\u0430");
            efi_1.efi.runLiveUpdateServer(efi_1.efi.workingDirectory, function (error) {
                response(res, !error, { error: error });
            });
        });
        this.app.get(efiApplicationServer.methods.stopLiveUpdateServer, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 live update \u0441\u0435\u0440\u0432\u0435\u0440\u0430");
            efi_1.efi.stopLiveUpdateServer(efi_1.efi.workingDirectory, function (error) {
                response(res, !error, { error: error });
            });
        });
        this.app.get(efiApplicationServer.methods.isLiveUpdateServerRunning, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 live update \u0441\u0435\u0440\u0432\u0435\u0440\u0430");
            efi_1.efi.isLiveUpdateServerRunning(function (server) {
                response(res, true, { server: server });
            });
        });
        this.app.get(efiApplicationServer.methods.setConfigValue, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 " + req.query.path + " -> " + req.query.value);
            efi_1.efi.writeConfigFromString(efi_1.efi.workingDirectory, req.query.path, req.query.value, function (error) {
                if (error) {
                    response(res, !error, { error: error });
                    return;
                }
                efi_1.efi.compileTheApplication(efi_1.efi.workingDirectory, function (error) {
                    response(res, !error, { error: error });
                });
            });
        });
        this.app.get(efiApplicationServer.methods.getConfig, function (req, res) {
            efi_1.efi.logger.log("GUI \u0437\u0430\u043F\u0440\u043E\u0441: \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438");
            efi_1.efi.checkElyFlatExists(efi_1.efi.workingDirectory, function (result) {
                if (result) {
                    res.sendFile(efi_1.efi.workingDirectory + "/app.config.json");
                }
                else {
                    response(res, false, { error: "Конфигурация не найдена!" });
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
            res.send(__assign({ response: result }, data));
        }
    };
    /**
     * Методы сервера
     */
    efiApplicationServer.methods = {
        build: "/build",
        compile: "/compile",
        getConfig: "/getConfig",
        getWorkingDirectory: "/getWorkingDirectory",
        init: "/init",
        isLiveUpdateServerRunning: "/isLiveUpdateServerRunning",
        runLiveUpdateServer: "/runLiveUpdateServer",
        setConfigValue: "/setConfigValue",
        setWorkingDirectory: "/setWorkingDirectory",
        stopLiveUpdateServer: "/stopLiveUpdateServer"
    };
    return efiApplicationServer;
}());
exports.efiApplicationServer = efiApplicationServer;