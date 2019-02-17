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
 + Файл: efiUtils.ts                                                          +
 + Файл изменен: 17.02.2019 21:04:35                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var fs = require("fs");
var ncp_1 = require("ncp");
var efiConst_1 = require("./efiConst");
/**
 * Утилиты efi
 * @class efiUtils
 */
var efiUtils = /** @class */ (function () {
    function efiUtils() {
    }
    /**
     * Возвращает путь до файлов модуля
     */
    efiUtils.getModulePath = function () {
        return __dirname.replace("/bin", "");
    };
    /**
     * Проверяет существование пути
     * @param path
     * @param callback
     */
    efiUtils.checkExportPath = function (path, callback) {
        if (typeof path === "string") {
            callback(fs.existsSync(path));
        }
        else {
            callback(path.every(function (value) { return fs.existsSync(value); }));
        }
    };
    /**
     * Экспортирует содержимое директории в директорию path
     * @param a
     * @param path
     * @param callback
     */
    efiUtils.exportToPath = function (a, path, callback) {
        efiUtils.checkExportPath(efiUtils.getModulePath() + "/" + a, function (result) {
            if (!result)
                callback("\u041E\u0431\u044A\u0435\u043A\u0442 " + a + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u043F\u0430\u043A\u0435\u0442\u0435 efi!");
            else {
                ncp_1.ncp(efiUtils.getModulePath() + "/" + a, path, function (err) {
                    callback(err ? err.message : undefined);
                });
            }
        });
    };
    /**
     * Экспортирует файлы скриптов приложения
     * @param {string} path - новый путь
     * @param {function(err: string|undefined)} callback
     */
    efiUtils.exportApplicationFilesToPath = function (path, callback) {
        efiUtils.exportToPath(efiConst_1.efiConst.APPLICATION_FILES_PATH, path, function (err) {
            if (err)
                callback(err);
            else
                efiUtils.exportToPath(efiConst_1.efiConst.BUILD_PATH, path, function (err) {
                    callback();
                });
        });
    };
    /**
     * Экспортирует файлы ресурсов в директорию path
     * @param path
     * @param callback
     */
    efiUtils.exportResourcesFilesToPath = function (path, callback) {
        efiUtils.exportToPath(efiConst_1.efiConst.RESOURCES_FILES_PATH, path, function (err) {
            callback(err);
        });
    };
    return efiUtils;
}());
exports.efiUtils = efiUtils;
