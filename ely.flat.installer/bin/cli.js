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
 + Файл изменен: 17.02.2019 23:42:30                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var figlet = require("figlet");
var elyXLogger_1 = require("../core/elyXLogger");
var efi_1 = require("./efi");
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
    console.log("\t-s --server\tЗапуск автономного сервера с режимом live update");
    console.log("\t-h --help\tСправка cli");
    console.log("\t-v --version\tВерсия ely flat installer");
    console.log();
    console.log();
}
/**
 * CLI MODE
 *
 * @param args
 */
function cli(args) {
    // Start
    console.clear();
    console.log(elyXLogger_1["default"].styles.fgYellow + figlet.textSync("e l y . f l a t . c l i"));
    console.log(elyXLogger_1["default"].styles.reset);
    console.log();
    efi_1.efi.logger.log("\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C ely.flat [" + require("../package.json").version + "]!");
    console.log();
    efi_1.efi.logger.log("\u0410\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u044B: [" + args.join(", ") + "]");
    // Logic
    switch (args[0]) {
        case "--get-wd":
        case "-gwd":
            efi_1.efi.logger.log("\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0440\u0430\u0431\u043E\u0447\u0430\u044F \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F: " + efi_1.efi.workingDirectory);
            break;
        case "--set-wd":
        case "-swd":
            efi_1.efi.changeWorkingDirectory(args[1]);
            break;
        case "--init":
        case "-i":
            efi_1.efi.initTheApplication(efi_1.efi.workingDirectory);
            break;
        case "--build":
        case "-b":
            efi_1.efi.buildTheApplication(efi_1.efi.workingDirectory);
            break;
        case "--update":
        case "-u":
            efi_1.efi.compileTheApplication(efi_1.efi.workingDirectory);
            break;
        case "--server":
        case "-s":
            efi_1.efi.runLiveUpdateServer(efi_1.efi.workingDirectory);
            break;
        case "--stop-server":
        case "-ss":
            efi_1.efi.stopLiveUpdateServer(efi_1.efi.workingDirectory);
            break;
        case "--version":
        case "-v":
            efi_1.efi.logger.log("Текущая версия: " + require("../package.json").version);
            break;
        case "--help":
        case "-h":
        default:
            __help();
            break;
    }
}
exports.cli = cli;
