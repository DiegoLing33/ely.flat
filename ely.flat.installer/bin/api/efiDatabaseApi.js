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
 + Файл: efiDatabaseApi.ts                                                    +
 + Файл изменен: 26.02.2019 01:53:16                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var elyUtils_1 = require("../core/elyUtils");
var efi_1 = require("../efi");
/**
 * Класс API методов для работы с базой данных
 * @class
 */
var efiDatabaseApi = /** @class */ (function () {
    function efiDatabaseApi() {
    }
    /**
     * Возвращает строки
     * @param path
     * @param next
     */
    efiDatabaseApi.select = function (path, next) {
        return {
            args: ["table"],
            method: function (args) {
                efiDatabaseApi.__connect(args.table, next, function (table) {
                    efi_1.efi.logger.log("\u0412\u044B\u0431\u043E\u0440\u043A\u0430 \u0438\u0437 \u0442\u0430\u0431\u043B\u0438\u0446\u044B [" + args.table + "]");
                    table.select(function (row) {
                        var filter = elyUtils_1["default"].filterObject(args, function (index) { return index !== "table"; });
                        return Object.keys(filter).every(function (key) {
                            var fv = String(filter[key]);
                            return (fv.indexOf("%") > -1) ?
                                new RegExp(fv.replace("%", ".+")).test(row[key]) :
                                row[key] === fv;
                        });
                    }, function (result) {
                        next(true, result);
                    });
                });
            }
        };
    };
    /**
     * Удаляет строки
     * @param path
     * @param next
     */
    efiDatabaseApi.remove = function (path, next) {
        return {
            args: ["table"],
            method: function (args) {
                efiDatabaseApi.__connect(args.table, next, function (table) {
                    efi_1.efi.logger.log("\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u043E\u043A \u0438\u0437 \u0442\u0430\u0431\u043B\u0438\u0446\u044B [" + args.table + "]");
                    table.remove(function (row) {
                        var filter = elyUtils_1["default"].filterObject(args, function (index) { return index !== "table"; });
                        return Object.keys(filter).every(function (key) {
                            var fv = String(filter[key]);
                            return (fv.indexOf("%") > -1) ?
                                new RegExp(fv.replace("%", ".+")).test(row[key]) :
                                row[key] === fv;
                        });
                    }, function (error) {
                        if (error)
                            next(false, error);
                        else
                            next(true, "ok");
                    });
                });
            }
        };
    };
    /**
     * Добавляет строку
     * @param path
     * @param next
     */
    efiDatabaseApi.add = function (path, next) {
        return {
            args: ["table"],
            method: function (args) {
                efiDatabaseApi.__connect(args.table, next, function (table) {
                    efi_1.efi.logger.log("\u0417\u0430\u043F\u0438\u0441\u044C \u0432 \u0442\u0430\u0431\u043B\u0438\u0446\u0443 [" + args.table + "]");
                    var filter = elyUtils_1["default"].filterObject(args, function (index) { return index !== "table"; });
                    if (!Object.keys(table.getColumns())
                        .every(function (value) { return Object.keys(filter).indexOf(value) > -1 || value === "id"; })) {
                        next(false, "Ошибка в синтаксисе запроса");
                        return;
                    }
                    table.add(filter);
                    table.save(function (error) {
                        if (error)
                            next(false, { error: error });
                        else
                            next(true, "ok");
                    });
                });
            }
        };
    };
    /**
     * Добавляет строку
     * @param path
     * @param next
     */
    efiDatabaseApi.cells = function (path, next) {
        return {
            args: ["table"],
            method: function (args) {
                efiDatabaseApi.__connect(args.table, next, function (table) {
                    next(true, table.getColumns());
                });
            }
        };
    };
    /**
     * Возвращает список таблиц
     * @param path
     * @param next
     */
    efiDatabaseApi.list = function (path, next) {
        return {
            args: [],
            method: function (args) {
                if (!efi_1.efi.db)
                    return next(false, "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 efi \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430!");
                next(true, efi_1.efi.db.getList());
            }
        };
    };
    efiDatabaseApi.__connect = function (tableName, next, go) {
        if (!efi_1.efi.db)
            return next(false, "\u0411\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 efi \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430!");
        efi_1.efi.logger.log("\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0442\u0430\u0431\u043B\u0438\u0446\u0435 [" + tableName + "]");
        var table = efi_1.efi.db.load(tableName, function (err) {
            if (err)
                return next(false, err);
            go(table);
        });
    };
    return efiDatabaseApi;
}());
exports.efiDatabaseApi = efiDatabaseApi;
