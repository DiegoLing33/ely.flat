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

import express = require("express");
import * as figlet from "figlet";
import * as fs from "fs";
import * as path from "path";
import {buildProject} from "./cli/build";
import {init} from "./cli/init";
import {startServer, stopServer} from "./cli/server";
import elyXLogger from "./core/elyXLogger";
import {efi} from "./efi";

const logger = new elyXLogger({mainPrefix: "Builder"});
const expressApp = express();

console.clear();
console.log(elyXLogger.styles.fgYellow + figlet.textSync(`e l y . f l a t`));
console.log(elyXLogger.styles.reset);

function createWindow() {
    const win = new BrowserWindow({
        height: 650,
        icon: path.resolve(__dirname + "/res/resources/icon/favicon-32x32.png"),
        width: 900,
    });
    win.loadFile(path.resolve(__dirname + "/app/index.html"));

    win.setResizable(false);
    win.center();

    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        app.quit();
    });
}

app.setName("efi");
app.on("ready", createWindow);

efi.workingDirectory = path.resolve("./");

const server = expressApp.listen(1583, () => {
    expressApp.get("/init", (req: any, res: any) => {
        logger.log("Запрос инциилизации приложения из GUI");
        init(logger, undefined, () => {
            buildProject(logger, () => {
                res.send({response: "ok"});
            }, false, efi.workingDirectory);
        }, efi.workingDirectory);
    });
    expressApp.get("/build", (req: any, res: any) => {
        logger.log("Запрос построения приложения из GUI");
        buildProject(logger, () => {
            res.send({response: "ok"});
        }, true, efi.workingDirectory);
    });
    expressApp.get("/getWorkingDirectory", (req: any, res: any) => {
        logger.log(`Запрос рабочей директории efi из GUI [${efi.workingDirectory}]`);
        res.send({response: "ok", directory: efi.workingDirectory});
    });
    expressApp.get("/setWorkingDirectory", (req: any, res: any) => {
        efi.workingDirectory = String(req.query.directory || efi.workingDirectory);
        logger.log(`Изменение рабочей директории efi из GUI [${efi.workingDirectory}]`);
        res.send({response: "ok"});
    });
    expressApp.get("/isServerRunning", (req: any, res: any) => {
        logger.log(`Запрос состояния live update server efi из GUI [${efi.workingDirectory}]`);
        res.send({response: "ok", state: efi.liveUpdateServer.state});
    });
    expressApp.get("/runServer", (req: any, res: any) => {
        logger.log(`Запрос запуска live update server efi из GUI [${efi.workingDirectory}]`);
        startServer(logger, "127.0.0.1", efi.workingDirectory);
        res.send({response: "ok"});
    });
    expressApp.get("/stopServer", (req: any, res: any) => {
        logger.log(`Запрос остановки live update server efi из GUI [${efi.workingDirectory}]`);
        stopServer(logger, () => {
            res.send({response: "ok"});
        });
    });
    expressApp.get("/getConfig", (req, res) => {
        logger.log(`Запрос конфигурации приложения из GUI [${efi.workingDirectory}]`);
        res.sendFile(path.resolve(efi.workingDirectory + "/app.config.json"));
    });
    expressApp.get("/setConfig", (req, res) => {
        logger.log(`Запрос установки конфигурации приложения из GUI [${efi.workingDirectory}]`);
        const file = path.resolve(efi.workingDirectory + "/app.config.json");
        fs.readFile(file, (err: any, data: any) => {
            data = JSON.parse(String(data));
            const p = String(req.query.path).split("/");
            if (p.length === 2) {
                data[p[0]][p[1]] = req.query.value;
            } else if (p.length === 3) {
                data[p[0]][p[1]][p[2]] = req.query.value;
            } else if (p.length === 4) {
                data[p[0]][p[1]][p[2]][p[3]] = req.query.value;
            }
            fs.writeFile(file, JSON.stringify(data, null, 2), (err: any) => {
                buildProject(logger, () => {
                    res.send({response: "ok"});
                }, true, efi.workingDirectory);
            });
        });
    });
});
