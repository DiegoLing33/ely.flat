#!/usr/bin/env node

import * as child_process from "child_process";
import {app, BrowserWindow} from "electron";
import * as figlet from "figlet";
import * as path from "path";
import process = require("process");
import {cli} from "./bin/cli";
import {efi} from "./bin/efi";
import {efiApplicationServer} from "./bin/efiApplicationServer";
import {efiConst} from "./bin/efiConst";
import elyXLogger from "./core/elyXLogger";

//
//  CLI Performing
//

efi.workingDirectory = path.resolve("./");

const cliArgs = process.argv.slice(2);
if (cliArgs.length === 0) {
    launchElectron();
} else {
    if (cliArgs.indexOf("gui") > -1) {
        gui(cliArgs.indexOf("test") > -1 ?
            path.resolve("./" + efiConst.TEST_PATH) : efi.workingDirectory);
    } else {
        cli(cliArgs);
    }
}

/**
 * Запускает электрон
 * @param flags
 */
function launchElectron(flags: string[] = []) {
    flags.push("gui");
    const elc = child_process.exec(path.resolve(__dirname + efiConst.ELECTRON_PATH) + " ./ " + flags.join(" "));

    // elc.stdout.on("data", (data) => console.log(data.toString()));
    // elc.stderr.on("data", (data) => console.log(data.toString()));
    // elc.on("exit", () => efi.logger.log("Приложение завершено."));
}

/**
 * Запускает GUI версию приложения
 * @param {String} [wd] - путь GUI
 */
function gui(wd?: string) {
    console.clear();
    console.log(elyXLogger.styles.fgYellow + figlet.textSync(`e l y . f l a t`));
    console.log(elyXLogger.styles.reset);

    function createWindow() {
        const win = new BrowserWindow({
            height: 800,
            icon: path.resolve(__dirname + "/res/resources/icon/favicon-32x32.png"),
            width: 1000,
        });

        win.loadFile(path.resolve(__dirname + "/app/index.html"));
        win.setResizable(false);
        win.center();

        app.on("window-all-closed", () => {
            app.quit();
        });
    }

    app.setName("efi");
    app.on("ready", createWindow);

    const server = new efiApplicationServer();

    server.startServer(() => {
        efi.workingDirectory = wd || path.resolve("./");
        // nothing is done
    });

}
