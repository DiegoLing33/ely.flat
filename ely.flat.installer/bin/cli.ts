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

import * as figlet from "figlet";
import elyXLogger from "../core/elyXLogger";
import {efi} from "./efi";

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
export function cli(args: any) {

    // Start
    console.clear();
    console.log(elyXLogger.styles.fgYellow + figlet.textSync(`e l y . f l a t . c l i`));
    console.log(elyXLogger.styles.reset);
    console.log();
    efi.logger.log(`Добро пожаловать в строитель ely.flat [${require("../package.json").version}]!`);
    console.log();
    efi.logger.log(`Аргументы получены: [${args.join(", ")}]`);

    // Logic
    switch (args[0]) {
        case "--get-wd":
        case "-gwd":
            efi.logger.log(`Текущая рабочая директория: ${efi.workingDirectory}`);
            break;
        case "--set-wd":
        case "-swd":
            efi.changeWorkingDirectory(args[1]);
            break;
        case "--init":
        case "-i":
            efi.initTheApplication(efi.workingDirectory);
            break;
        case "--build":
        case "-b":
            efi.buildTheApplication(efi.workingDirectory);
            break;
        case "--update":
        case "-u":
            efi.compileTheApplication(efi.workingDirectory);
            break;
        case "--server":
        case "-s":
            efi.runLiveUpdateServer(efi.workingDirectory);
            break;
        case "--stop-server":
        case "-ss":
            efi.stopLiveUpdateServer(efi.workingDirectory);
            break;
        case "--version":
        case "-v":
            efi.logger.log("Текущая версия: " + require("../package.json").version);
            break;
        case "--help":
        case "-h":
        default:
            __help();
            break;
    }
}
