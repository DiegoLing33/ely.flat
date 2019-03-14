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
 + Файл: index.ts                                                             +
 + Файл изменен: 27.02.2019 15:39:59                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as child_process from "child_process";
import {app, BrowserWindow} from "electron";
import * as figlet from "figlet";
import * as path from "path";
import {cli} from "./cli";
import elyXLogger from "./core/elyXLogger";
import {efi} from "./efi";
import {efiApplicationServer} from "./efiApplicationServer";
import {efiConst} from "./efiConst";
import {efiUtils} from "./efiUtils";
import {efiDatabase} from "./efxapp/db/efiDatabase";

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
    child_process.exec(path.resolve(__dirname + efiConst.ELECTRON_PATH) + " ./ " + flags.join(" "));
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
            darkTheme: true,
            height: 800,
            icon: path.resolve(efiUtils.getModulePath() + "/resources/icon/favicon-32x32.png"),
            // titleBarStyle: "hidden",
            width: 1000,
        });
        win.loadFile(path.resolve(efiUtils.getModulePath() + "/app/index.html"));
        win.setResizable(false);
        win.setMenu(null);
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
        efi.db = new efiDatabase({path: efi.workingDirectory + "/db"});
        // nothing is done
    });

}
