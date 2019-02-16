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
 + Файл: gui.ts                                                               +
 + Файл изменен: 16.02.2019 03:55:20                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var electron_1 = require("electron");
var express = require("express");
var figlet = require("figlet");
var fs = require("fs");
var path = require("path");
var build_1 = require("./cli/build");
var init_1 = require("./cli/init");
var server_1 = require("./cli/server");
var elyXLogger_1 = require("./core/elyXLogger");
var efi_1 = require("./efi");
var logger = new elyXLogger_1["default"]({ mainPrefix: "Builder" });
var expressApp = express();
console.clear();
console.log(elyXLogger_1["default"].styles.fgYellow + figlet.textSync("e l y . f l a t"));
console.log(elyXLogger_1["default"].styles.reset);
function createWindow() {
    var win = new electron_1.BrowserWindow({
        height: 650,
        icon: path.resolve(__dirname + "/res/resources/icon/favicon-32x32.png"),
        width: 900
    });
    win.loadFile(path.resolve(__dirname + "/app/index.html"));
    win.setResizable(false);
    win.center();
    // Quit when all windows are closed.
    electron_1.app.on("window-all-closed", function () {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        electron_1.app.quit();
    });
}
electron_1.app.setName("efi");
electron_1.app.on("ready", createWindow);
efi_1.efi.workingDirectory = path.resolve("./");
var server = expressApp.listen(1583, function () {
    expressApp.get("/init", function (req, res) {
        logger.log("Запрос инциилизации приложения из GUI");
        init_1.init(logger, undefined, function () {
            build_1.buildProject(logger, function () {
                res.send({ response: "ok" });
            }, false, efi_1.efi.workingDirectory);
        }, efi_1.efi.workingDirectory);
    });
    expressApp.get("/build", function (req, res) {
        logger.log("Запрос построения приложения из GUI");
        build_1.buildProject(logger, function () {
            res.send({ response: "ok" });
        }, true, efi_1.efi.workingDirectory);
    });
    expressApp.get("/getWorkingDirectory", function (req, res) {
        logger.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438 efi \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        res.send({ response: "ok", directory: efi_1.efi.workingDirectory });
    });
    expressApp.get("/setWorkingDirectory", function (req, res) {
        efi_1.efi.workingDirectory = String(req.query.directory || efi_1.efi.workingDirectory);
        logger.log("\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438 efi \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        res.send({ response: "ok" });
    });
    expressApp.get("/isServerRunning", function (req, res) {
        logger.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F live update server efi \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        res.send({ response: "ok", state: efi_1.efi.liveUpdateServer.state });
    });
    expressApp.get("/runServer", function (req, res) {
        logger.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 live update server efi \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        server_1.startServer(logger, "127.0.0.1", efi_1.efi.workingDirectory);
        res.send({ response: "ok" });
    });
    expressApp.get("/stopServer", function (req, res) {
        logger.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 live update server efi \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        server_1.stopServer(logger, function () {
            res.send({ response: "ok" });
        });
    });
    expressApp.get("/getConfig", function (req, res) {
        logger.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        res.sendFile(path.resolve(efi_1.efi.workingDirectory + "/app.config.json"));
    });
    expressApp.get("/setConfig", function (req, res) {
        logger.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438\u0437 GUI [" + efi_1.efi.workingDirectory + "]");
        var file = path.resolve(efi_1.efi.workingDirectory + "/app.config.json");
        fs.readFile(file, function (err, data) {
            data = JSON.parse(String(data));
            var p = String(req.query.path).split("/");
            if (p.length === 2) {
                data[p[0]][p[1]] = req.query.value;
            }
            else if (p.length === 3) {
                data[p[0]][p[1]][p[2]] = req.query.value;
            }
            else if (p.length === 4) {
                data[p[0]][p[1]][p[2]][p[3]] = req.query.value;
            }
            fs.writeFile(file, JSON.stringify(data, null, 2), function (err) {
                build_1.buildProject(logger, function () {
                    res.send({ response: "ok" });
                }, true, efi_1.efi.workingDirectory);
            });
        });
    });
});
