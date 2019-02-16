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
 + Файл: build.ts                                                             +
 + Файл изменен: 06.01.2019 04:52:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import elyXLogger from "../core/elyXLogger";

function __buildAPPJS(logger: elyXLogger, cb?: () => void, root?: string) {
    logger.log("[~~] Построение...");

    const appRoot = __dirname.replace("/cli", "");
    const build = path.resolve((root || path.resolve("./")) + "/build/");
    const buildPath = path.resolve((root || path.resolve("./")) + "/build/js/index.js");
    const sourcePath = path.resolve((root || path.resolve("./")) + "/app.js");
    // logger.log("");
    // logger.log(`Build path: ${buildPath}`);
    // logger.log(`Source path: ${sourcePath}`);
    // logger.log("");
    child_process.exec(`${appRoot}/node_modules/.bin/rollup ${sourcePath} --file ${buildPath} --format iife`,
        (a, b, c) => {
            child_process.exec(`cp ${build}/../app.config.json ${build}`, () => {
                logger.log("[OK] Построение завершено!");
                if (cb) cb();
            });
        });
}

export function buildProject(logger: elyXLogger, end?: () => void, short?: boolean, root?: string) {
    const appPath = __dirname.replace("/cli", "");
    const build = path.resolve((root || path.resolve("./")) + "/build/");

    if (short) {
        fs.mkdir(build, err => {
            __buildAPPJS(logger, end, root);
        });
    } else {
        child_process.exec(`rm -r ${build}`, () => {
            logger.log("[~~] Создание директории...");
            fs.mkdir(build, err => {
                __buildAPPJS(logger, () => {
                    logger.log("[OK] Построение завершено!");
                    logger.log("[~~] Копирование ресурсов...");
                    child_process.exec(`cp -r ${appPath}/res/* ${build}`, () => {
                        logger.log("[OK] Ресурсы скопированы!");
                        logger.log("[~~] Копирование файла &cynapp.config");
                        child_process.exec(`cp ${build}/../app.config.json ${build}`, () => {
                            if (end) end();
                        });
                    });
                }, root);
            });
        });
    }
}
