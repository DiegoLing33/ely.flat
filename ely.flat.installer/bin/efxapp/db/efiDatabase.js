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
 + Файл: efiDatabase.tss                                                        +
 + Файл изменен: 25.02.2019 22:58:54                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var fs = require("fs");
var efiDataTable_1 = require("./efiDataTable");
/**
 * База данных efi
 * @class
 */
var efiDatabase = /** @class */ (function () {
    /**
     * Конструктор
     * @param props
     */
    function efiDatabase(props) {
        this.__path = props.path;
    }
    /**
     * Загружает таблицу
     *
     * @param name
     * @param callback
     */
    efiDatabase.prototype.load = function (name, callback) {
        return efiDataTable_1.efiDataTable.load(name, this.getPath(), callback);
    };
    /**
     * Загружает таблицу
     *
     * @param name
     * @param cells
     * @param callback
     */
    efiDatabase.prototype.create = function (name, cells, callback) {
        return efiDataTable_1.efiDataTable.create(name, this.getPath(), cells, callback);
    };
    /**
     * Загружает таблицу или создаёт её
     *
     * @param name
     * @param cells
     * @param callback
     */
    efiDatabase.prototype.loadOrCreate = function (name, cells, callback) {
        if (efiDataTable_1.efiDataTable.isDataTableExists(name, this.getPath())) {
            return this.load(name, callback);
        }
        else {
            return this.create(name, cells, callback);
        }
    };
    /**
     * Возвращает путь до хранилища
     */
    efiDatabase.prototype.getPath = function () {
        return this.__path;
    };
    /**
     * Возвращает список таблиц
     */
    efiDatabase.prototype.getList = function () {
        var stats = fs.readdirSync(this.getPath());
        return stats ? stats.filter(function (value) { return value.endsWith(efiDataTable_1.efiDataTable.DB_FILES_EXTENSION); })
            .map(function (value) { return value.replace("." + efiDataTable_1.efiDataTable.DB_FILES_EXTENSION, ""); }) : [];
    };
    return efiDatabase;
}());
exports.efiDatabase = efiDatabase;
