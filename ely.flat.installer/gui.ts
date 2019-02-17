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

import {app, BrowserWindow} from "electron";

import * as figlet from "figlet";
import * as path from "path";
import {efi} from "./bin/efi";
import {efiApplicationServer} from "./bin/efiApplicationServer";
import elyXLogger from "./core/elyXLogger";

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
    efi.workingDirectory = path.resolve("./");
    // nothing is done
});
