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

import express = require("express");
import * as path from "path";
import elyXLogger from "../core/elyXLogger";

const app = express();
import * as bodyParser from "body-parser";
import figlet = require("figlet");
// @ts-ignore
import filewatcher = require("filewatcher");
import {efi} from "../efi";
import {buildProject} from "./build";

export function startServer(logger: elyXLogger, address: string = "127.0.0.1", root?: string) {
    efi.liveUpdateServer.server = app.listen(1580, () => {

        console.clear();
        console.log(elyXLogger.styles.fgYellow + figlet.textSync(`e l y . f l a t`));
        console.log(elyXLogger.styles.reset);

        logger.log(`Сервер запущен: http://${address}:1580`);
        efi.liveUpdateServer.state = true;
    });

    root = path.resolve(path.resolve(root || "./") + "/build");

    app.use(express.static(root));

    app.use("/app.config.json", (req: any, res: any) => {
        res.sendFile(path.resolve(root + "/app.config.json"));
    });

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(bodyParser.json());

    const watcher = filewatcher();
    watcher.add(path.resolve(root + "/../app.js"));

    watcher.on("change", (file: any, stat: any) => {
        if (stat) logger.log("[~~] Сборка APPJS...");
        buildProject(logger, () => {
            //
        }, true);
    });
}

export function stopServer(logger: elyXLogger, end?: () => void) {
    logger.log(`[~~] Остановка live update server`);
    efi.liveUpdateServer.server.close(() => {
        efi.liveUpdateServer.state = false;
        logger.log(`[OK] Остановка live update server`);
        if (end) end();
    });
}
