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
 + Файл: init.ts                                                              +
 + Файл изменен: 06.01.2019 04:52:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var child_process = require("child_process");
function init(logger, prompt, end, root) {
    logger.log("[~~] Создание проекта...");
    logger.log("[~~] Создание стартовых файлов проекта...");
    var path = root || require("path").resolve("./");
    var builder = __dirname.replace("/cli", "");
    child_process.exec("cp " + builder + "/start/* " + path, function () {
        child_process.exec("cp " + builder + "/build/* " + path, function () {
            logger.log("[OK] Проект успешно создан!");
            logger.log("Главный файл приложения: &cynapp.js");
            logger.log("Конфигурация приложения: &cynapp.config.json");
            if (end)
                end();
        });
    });
}
exports.init = init;
