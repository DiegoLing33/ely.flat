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
 + Файл: server.ts                                                            +
 + Файл изменен: 06.01.2019 04:52:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var express = require("express");
var path = require("path");
var elyXLogger_1 = require("../core/elyXLogger");
var app = express();
var bodyParser = require("body-parser");
var figlet = require("figlet");
// @ts-ignore
var filewatcher = require("filewatcher");
var efi_1 = require("../efi");
var build_1 = require("./build");
function startServer(logger, address, root) {
    if (address === void 0) { address = "127.0.0.1"; }
    efi_1.efi.liveUpdateServer.server = app.listen(1580, function () {
        console.clear();
        console.log(elyXLogger_1["default"].styles.fgYellow + figlet.textSync("e l y . f l a t"));
        console.log(elyXLogger_1["default"].styles.reset);
        logger.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D: http://" + address + ":1580");
        efi_1.efi.liveUpdateServer.state = true;
    });
    root = path.resolve(path.resolve(root || "./") + "/build");
    app.use(express.static(root));
    app.use("/app.config.json", function (req, res) {
        res.sendFile(path.resolve(root + "/app.config.json"));
    });
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    var watcher = filewatcher();
    watcher.add(path.resolve(root + "/../app.js"));
    watcher.on("change", function (file, stat) {
        if (stat)
            logger.log("[~~] Сборка APPJS...");
        build_1.buildProject(logger, function () {
            //
        }, true);
    });
}
exports.startServer = startServer;
function stopServer(logger, end) {
    logger.log("[~~] \u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 live update server");
    efi_1.efi.liveUpdateServer.server.close(function () {
        efi_1.efi.liveUpdateServer.state = false;
        logger.log("[OK] \u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 live update server");
        if (end)
            end();
    });
}
exports.stopServer = stopServer;
