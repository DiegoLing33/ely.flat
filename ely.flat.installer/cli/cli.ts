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
 + Файл: cli.ts                                                               +
 + Файл изменен: 30.01.2019 03:15:15                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as figlet from "figlet";
import elyXLogger from "../core/elyXLogger";
import {buildProject} from "./build";
import {init} from "./init";
import {startServer, stopServer} from "./server";

/**
 * Выводит сообщение с помощью
 * @private
 */
function __help() {
    console.log();
    console.log("\tely.flat.builder <command>");
    console.log("\tСтроитель проектов, работающих на ely.flat.");
    console.log();
    console.log("\tКоманды:");
    console.log("\t-i --init\tСоздает начальный проект");
    console.log("\t-b --build\tВыполняет сборку проекта");
    console.log("\t-u --update\tОбновляет js файл в сборке");
    console.log("\t-l --live\tЗапускает систему ely.flat.builder watcher");
    console.log("\t-s --server\tЗапуск автономного сервера с режимом live update");
    console.log("\t-h --help\tСправка cli");
    console.log("\t-v --version\tВерсия ely flat installer");
    console.log();
    console.log();
}

/**
 * CLI MODE
 *
 * @param logger
 * @param args
 */
export function cli(logger: elyXLogger, args: any) {

    // Start
    console.clear();
    console.log(elyXLogger.styles.fgYellow + figlet.textSync(`e l y . f l a t . c l i`));
    console.log(elyXLogger.styles.reset);
    console.log();
    logger.log("Добро пожаловать в строитель ely.flat!");
    console.log();
    logger.log(`Аргументы получены: [${args.join(", ")}]`);

    // Logic
    switch (args[0]) {
        case "--init":
        case "-i":
            init(logger, undefined);
            break;
        case "--build":
        case "-b":
            buildProject(logger, undefined);
            break;
        case "--update":
        case "-u":
            buildProject(logger, undefined, true);
            break;
        case "--server":
        case "-s":
            startServer(logger);
            break;
        case "--stop-server":
        case "-ss":
            stopServer(logger);
            break;
        case "--version":
        case "-v":
            logger.log("Текущая версия: 1.1.0");
            break;
        case "--help":
        case "-h":
        default:
            __help();
            break;
    }
}
