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
 + Файл: cli.ts                                                               +
 + Файл изменен: 30.01.2019 03:15:15                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var figlet = require("figlet");
var elyXLogger_1 = require("../core/elyXLogger");
var build_1 = require("./build");
var init_1 = require("./init");
var server_1 = require("./server");
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
function cli(logger, args) {
    // Start
    console.clear();
    console.log(elyXLogger_1["default"].styles.fgYellow + figlet.textSync("e l y . f l a t . c l i"));
    console.log(elyXLogger_1["default"].styles.reset);
    console.log();
    logger.log("Добро пожаловать в строитель ely.flat!");
    console.log();
    logger.log("\u0410\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u044B: [" + args.join(", ") + "]");
    // Logic
    switch (args[0]) {
        case "--init":
        case "-i":
            init_1.init(logger, undefined);
            break;
        case "--build":
        case "-b":
            build_1.buildProject(logger, undefined);
            break;
        case "--update":
        case "-u":
            build_1.buildProject(logger, undefined, true);
            break;
        case "--server":
        case "-s":
            server_1.startServer(logger);
            break;
        case "--stop-server":
        case "-ss":
            server_1.stopServer(logger);
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
exports.cli = cli;
