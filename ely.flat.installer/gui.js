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
var figlet = require("figlet");
var path = require("path");
var efi_1 = require("./bin/efi");
var efiApplicationServer_1 = require("./bin/efiApplicationServer");
var elyXLogger_1 = require("./core/elyXLogger");
console.clear();
console.log(elyXLogger_1["default"].styles.fgYellow + figlet.textSync("e l y . f l a t"));
console.log(elyXLogger_1["default"].styles.reset);
function createWindow() {
    var win = new electron_1.BrowserWindow({
        height: 800,
        icon: path.resolve(__dirname + "/res/resources/icon/favicon-32x32.png"),
        width: 1000
    });
    win.loadFile(path.resolve(__dirname + "/app/index.html"));
    win.setResizable(false);
    win.center();
    electron_1.app.on("window-all-closed", function () {
        electron_1.app.quit();
    });
}
electron_1.app.setName("efi");
electron_1.app.on("ready", createWindow);
var server = new efiApplicationServer_1.efiApplicationServer();
server.startServer(function () {
    efi_1.efi.workingDirectory = path.resolve("./");
    // nothing is done
});
