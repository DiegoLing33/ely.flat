#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var child_process = require("child_process");
var electron_1 = require("electron");
var figlet = require("figlet");
var path = require("path");
var process = require("process");
var cli_1 = require("./bin/cli");
var efi_1 = require("./bin/efi");
var efiApplicationServer_1 = require("./bin/efiApplicationServer");
var efiConst_1 = require("./bin/efiConst");
var elyXLogger_1 = require("./core/elyXLogger");
//
//  CLI Performing
//
efi_1.efi.workingDirectory = path.resolve("./");
var cliArgs = process.argv.slice(2);
if (cliArgs.length === 0) {
    launchElectron();
}
else {
    if (cliArgs.indexOf("gui") > -1) {
        gui(cliArgs.indexOf("test") > -1 ?
            path.resolve("./" + efiConst_1.efiConst.TEST_PATH) : efi_1.efi.workingDirectory);
    }
    else {
        cli_1.cli(cliArgs);
    }
}
/**
 * Запускает электрон
 * @param flags
 */
function launchElectron(flags) {
    if (flags === void 0) { flags = []; }
    flags.push("gui");
    var elc = child_process.exec(path.resolve(__dirname + efiConst_1.efiConst.ELECTRON_PATH) + " ./ " + flags.join(" "));
    // elc.stdout.on("data", (data) => console.log(data.toString()));
    // elc.stderr.on("data", (data) => console.log(data.toString()));
    // elc.on("exit", () => efi.logger.log("Приложение завершено."));
}
/**
 * Запускает GUI версию приложения
 * @param {String} [wd] - путь GUI
 */
function gui(wd) {
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
        efi_1.efi.workingDirectory = wd || path.resolve("./");
        // nothing is done
    });
}
