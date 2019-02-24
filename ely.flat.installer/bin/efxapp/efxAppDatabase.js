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
 + Файл: efxAppDatabase.ts                                                    +
 + Файл изменен: 22.02.2019 22:11:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var fs = require("fs");
var md5 = require("md5");
/**
 * Таблица данных efX-app
 * @class efxAppDatabase
 */
var efxAppDatabase = /** @class */ (function () {
    /**
     * Конструктор
     * @param db_path
     * @param o
     */
    function efxAppDatabase(db_path, o) {
        this.path = db_path;
        if (!efxAppDatabase.checkExists(db_path))
            o("База данных не найдена!");
        else
            this.update(o);
    }
    /**
     * Проверяет существование таблицы path
     * @param db_path
     */
    efxAppDatabase.checkExists = function (db_path) {
        return fs.existsSync(db_path);
    };
    /**
     * Возвращает элементы таблицы
     * @param table
     */
    efxAppDatabase.prototype.getTableItems = function (table) {
        if (this.__data.items.hasOwnProperty(table)) {
            return this.__data.db[table] || [];
        }
        return null;
    };
    /**
     * ВОзвращает true, если таблица существует
     * @param tableName
     */
    efxAppDatabase.prototype.hasTable = function (tableName) {
        return this.__data.items.hasOwnProperty(tableName);
    };
    /**
     * Возвращает true, если таблица имеет колонку
     * @param tableName
     * @param columnName
     */
    efxAppDatabase.prototype.tableHasColumn = function (tableName, columnName) {
        var cols = this.getTableColumns(tableName);
        return cols ? cols.indexOf(columnName) > -1 : false;
    };
    /**
     * Возвращает строку таблицы
     * @param tableName
     * @param rowIndex
     */
    efxAppDatabase.prototype.getTableRow = function (tableName, rowIndex) {
        if (!this.hasTable(tableName))
            return null;
        var items = this.getTableItems(tableName);
        if (items)
            return items;
        return null;
    };
    /**
     * Обновляет базу данных
     * @param o
     */
    efxAppDatabase.prototype.update = function (o) {
        var _this = this;
        fs.readFile(this.path, function (err, content) {
            if (err) {
                o(err.message);
                return;
            }
            try {
                _this.__data = JSON.parse(String(content));
                o();
            }
            catch (e) {
                o(e.message);
                _this.__data = null;
            }
        });
    };
    /**
     * Сохраняет базу данных
     * @param callback
     */
    efxAppDatabase.prototype.save = function (callback) {
        fs.writeFile(this.path, JSON.stringify(this.__data, null, 2), function (err) {
            callback(err ? err.message : undefined);
        });
    };
    /**
     * ВОзвращает заголовки таблицы
     * @param tableName
     */
    efxAppDatabase.prototype.getTableColumns = function (tableName) {
        if (!this.hasTable(tableName))
            return null;
        return this.__data.items[tableName].items || null;
    };
    /**
     * Устанавливает элемент таблицы
     * @param table
     * @param rowIndex
     * @param column
     * @param value
     * @param callback
     */
    efxAppDatabase.prototype.setTableRowColumnItem = function (table, rowIndex, column, value, callback) {
        if (!this.hasTable(table))
            return callback("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 " + table + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445!");
        if (!this.tableHasColumn(table, column))
            return callback("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 " + table + " \u043D\u0435 \u0438\u043C\u0435\u0435\u0442 \u043A\u043E\u043B\u043E\u043D\u043A\u0438 " + column + "!");
        var row = this.getTableRow(table, rowIndex);
        if (!row)
            return callback("\u0412 \u0442\u0430\u0431\u043B\u0438\u0446\u0435 " + table + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0441\u0442\u0440\u043E\u043A\u0430 index: " + rowIndex + "!");
        this.__data.db[table][rowIndex][this.getTableColumns(table).indexOf(column)] = value;
        this.save(callback);
    };
    /**
     * Добавляет строку в таблицу
     * @param tableName
     * @param data
     * @param callback
     */
    efxAppDatabase.prototype.addTableRow = function (tableName, data, callback) {
        if (!this.hasTable(tableName))
            return callback("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 " + tableName + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445!");
        var values = [];
        this.getTableColumns(tableName).forEach(function (col) {
            if (col === "id") {
                values.push(md5(new Date().getTime() + tableName));
            }
            else {
                if (data.hasOwnProperty(col)) {
                    values.push(data[col]);
                }
                else {
                    values.push(null);
                }
            }
        });
        this.__data.db[tableName].push(values);
        this.save(callback);
    };
    /**
     * Возвращает строку таблицы по критерию
     * @param tableName
     * @param selector
     * @param callback
     */
    efxAppDatabase.prototype.getTableRows = function (tableName, selector, callback) {
        if (!this.hasTable(tableName))
            return callback("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 " + tableName + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445!");
        var columns = this.getTableColumns(tableName);
        selector = Object.keys(selector).map(function (value) {
            return { key: columns.indexOf(value), value: selector[value] };
        });
        var rows = [];
        this.getTableItems(tableName).forEach(function (row) {
            if (selector.every(function (value) { return row[value.key] === value.value; })) {
                var obj_1 = {};
                columns.forEach(function (value, index) {
                    obj_1[value] = row[index];
                });
                rows.push(obj_1);
            }
        });
        callback(undefined, rows);
    };
    return efxAppDatabase;
}());
exports.efxAppDatabase = efxAppDatabase;
