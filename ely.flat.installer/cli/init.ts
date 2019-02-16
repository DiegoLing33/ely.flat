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
 + Файл: init.ts                                                              +
 + Файл изменен: 06.01.2019 04:52:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as child_process from "child_process";
import elyXLogger from "../core/elyXLogger";

export function init(logger: elyXLogger, prompt?: string, end?: () => void, root?: string) {
    logger.log("[~~] Создание проекта...");
    logger.log("[~~] Создание стартовых файлов проекта...");

    const path = root || require("path").resolve("./");
    const builder = __dirname.replace("/cli", "");

    child_process.exec(`cp ${builder}/start/* ${path}`, () => {
        child_process.exec(`cp ${builder}/build/* ${path}`, () => {
            logger.log("[OK] Проект успешно создан!");
            logger.log("Главный файл приложения: &cynapp.js");
            logger.log("Конфигурация приложения: &cynapp.config.json");
            if (end) end();
        });
    });
}
