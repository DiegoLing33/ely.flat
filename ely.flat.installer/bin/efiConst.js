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
 + Файл: efiConst.ts                                                          +
 + Файл изменен: 17.02.2019 21:09:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
/**
 * Константы efi
 * @class efiConst
 */
var efiConst = /** @class */ (function () {
    function efiConst() {
    }
    /**
     * Путь к файлам сборки ely.flat
     */
    efiConst.BUILD_PATH = "build";
    /**
     * Путь к стартовым файлам приложения
     */
    efiConst.APPLICATION_FILES_PATH = "start";
    /**
     * Путь к ресурсам приложения
     */
    efiConst.RESOURCES_FILES_PATH = "resources";
    /**
     * Путь к электрону
     */
    efiConst.ELECTRON_PATH = "/node_modules/.bin/electron";
    /**
     * Путь до директории тестирования
     */
    efiConst.TEST_PATH = "/../test/efi-app";
    /**
     * Путь до директории базы данных
     */
    efiConst.DB_FILES_PATH = "db";
    return efiConst;
}());
exports.efiConst = efiConst;
