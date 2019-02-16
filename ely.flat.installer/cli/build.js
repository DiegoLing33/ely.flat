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
 + Файл: build.ts                                                             +
 + Файл изменен: 06.01.2019 04:52:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var child_process = require("child_process");
var fs = require("fs");
var path = require("path");
function __buildAPPJS(logger, cb, root) {
    logger.log("[~~] Построение...");
    var appRoot = __dirname.replace("/cli", "");
    var build = path.resolve((root || path.resolve("./")) + "/build/");
    var buildPath = path.resolve((root || path.resolve("./")) + "/build/js/index.js");
    var sourcePath = path.resolve((root || path.resolve("./")) + "/app.js");
    // logger.log("");
    // logger.log(`Build path: ${buildPath}`);
    // logger.log(`Source path: ${sourcePath}`);
    // logger.log("");
    child_process.exec(appRoot + "/node_modules/.bin/rollup " + sourcePath + " --file " + buildPath + " --format iife", function (a, b, c) {
        child_process.exec("cp " + build + "/../app.config.json " + build, function () {
            logger.log("[OK] Построение завершено!");
            if (cb)
                cb();
        });
    });
}
function buildProject(logger, end, short, root) {
    var appPath = __dirname.replace("/cli", "");
    var build = path.resolve((root || path.resolve("./")) + "/build/");
    if (short) {
        fs.mkdir(build, function (err) {
            __buildAPPJS(logger, end, root);
        });
    }
    else {
        child_process.exec("rm -r " + build, function () {
            logger.log("[~~] Создание директории...");
            fs.mkdir(build, function (err) {
                __buildAPPJS(logger, function () {
                    logger.log("[OK] Построение завершено!");
                    logger.log("[~~] Копирование ресурсов...");
                    child_process.exec("cp -r " + appPath + "/res/* " + build, function () {
                        logger.log("[OK] Ресурсы скопированы!");
                        logger.log("[~~] Копирование файла &cynapp.config");
                        child_process.exec("cp " + build + "/../app.config.json " + build, function () {
                            if (end)
                                end();
                        });
                    });
                }, root);
            });
        });
    }
}
exports.buildProject = buildProject;
