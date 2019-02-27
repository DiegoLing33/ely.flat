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
 + Файл: efiDataTablee.ts                                                       +
 + Файл изменен: 25.02.2019 22:55:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var fs = require("fs");
var md5 = require("md5");
var efiDataCellType_1 = require("./efiDataCellType");
var efiDataRow_1 = require("./efiDataRow");
/**
 * Таблица базы данных efiDatabase
 * @class
 */
var efiDataTable = /** @class */ (function () {
    /**
     * Конструктор
     * @param props
     *
     * @throws Error
     */
    function efiDataTable(props) {
        var _this = this;
        this.__path = props.path + "/" + props.name + "." + efiDataTable.DB_FILES_EXTENSION;
        this.__name = props.name;
        if (props.load) {
            if (!efiDataTable.isDataTableExists(this.getName(), props.path)) {
                props.callback("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 [" + this.getName() + "] \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!");
                return;
            }
            fs.readFile(this.getPath(), function (err, content) {
                if (err)
                    return props.callback(err.message);
                try {
                    _this.__data = JSON.parse(String(content));
                    props.callback();
                    return;
                }
                catch (e) {
                    props.callback(e.message);
                    return;
                }
            });
        }
        else {
            if (efiDataTable.isDataTableExists(this.getName(), props.path)) {
                props.callback("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 [" + this.getName() + "] \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!");
                return;
            }
            else {
                if (props.cells) {
                    Object.keys(props.cells).forEach(function (column) {
                        if (props.cells[column].nullable === undefined)
                            props.cells[column].nullable = true;
                        if (props.cells[column]["default"] === undefined)
                            props.cells[column]["default"] = null;
                    });
                    props.cells.id = { type: efiDataCellType_1.efiDataCellType.id };
                }
                else {
                    props.callback("\u0414\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0442\u0430\u0431\u043B\u0438\u0446\u044B \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0438!");
                    return;
                }
                this.__data = { name: this.__name, columns: props.cells, rows: [] };
                this.save(props.callback);
            }
        }
    }
    /**
     * Возвращает true, если база данных существует
     * @param name
     * @param path
     */
    efiDataTable.isDataTableExists = function (name, path) {
        return fs.existsSync(path + "/" + name + "." + efiDataTable.DB_FILES_EXTENSION);
    };
    /**
     * Создает новую таблицу
     * @param name
     * @param path - расположение таблицы (путь до хранилища)
     * @param cells
     * @param callback
     */
    efiDataTable.create = function (name, path, cells, callback) {
        return new efiDataTable({ name: name, load: false, path: path, cells: cells, callback: callback });
    };
    /**
     * Загружает таблицу
     * @param name
     * @param path - расположение таблицы (путь до хранилища)
     * @param callback
     */
    efiDataTable.load = function (name, path, callback) {
        return new efiDataTable({ name: name, load: true, path: path, callback: callback });
    };
    /**
     * Возвращает путь до db файла
     */
    efiDataTable.prototype.getPath = function () {
        return this.__path;
    };
    /**
     * Возвращает имя таблицы
     */
    efiDataTable.prototype.getName = function () {
        return this.__name;
    };
    /**
     * Возвращает колонки таблицы
     */
    efiDataTable.prototype.getColumns = function () {
        return this.__data.columns;
    };
    /**
     * Возвращает строки таблицы
     */
    efiDataTable.prototype.getRows = function () {
        var _this = this;
        return this.__data.rows.map(function (value) {
            _this.__assignRow(value);
            return value;
        });
    };
    /**
     * Удаляет конкретную строку по переданному объекту
     *
     * @param row
     * @param callback
     */
    efiDataTable.prototype.removeRow = function (row, callback) {
        var index = this.__data.rows.indexOf(row);
        if (index > -1)
            this.__data.rows.splice(index, 1);
        return this;
    };
    /**
     * Удаляет строку
     * @param filter
     * @param callback
     */
    efiDataTable.prototype.remove = function (filter, callback) {
        var _this = this;
        if (typeof filter === "function") {
            this.getRows().forEach(function (value, index) {
                if (filter(value)) {
                    _this.__data.rows.splice(index, 1);
                }
            });
            this.save(callback);
            return this;
        }
        return this.remove(function (row) { return Object.keys(filter).every(function (cell) { return row[cell] === filter[cell]; }); }, callback);
    };
    /**
     * Делает выборку строк
     * @param filter
     * @param result
     */
    efiDataTable.prototype.select = function (filter, result) {
        if (typeof filter === "function") {
            result(this.getRows().filter(function (value) { return filter(value); }));
            return this;
        }
        return this.select(function (row) { return Object.keys(filter).every(function (cell) { return row[cell] === filter[cell]; }); }, result);
    };
    /**
     * Позволяет обрабатывать выборку
     *
     * @param filter
     * @param closure
     * @param callback
     */
    efiDataTable.prototype.handle = function (filter, closure, callback) {
        if (typeof filter === "function") {
            this.getRows().forEach(function (value) {
                if (filter(value))
                    closure(value);
            });
            this.save(callback);
            return this;
        }
        return this.handle(function (row) { return Object.keys(filter).every(function (cell) { return row[cell] === filter[cell]; }); }, closure, callback);
    };
    /**
     * Возвращает количество элементов
     *
     * @param filter
     * @param result
     */
    efiDataTable.prototype.count = function (filter, result) {
        if (typeof filter === "function") {
            result(this.getRows().filter(function (value) { return filter(value); }).length);
            return this;
        }
        return this.count(function (row) { return Object.keys(filter).every(function (cell) { return row[cell] === filter[cell]; }); }, result);
    };
    /**
     * Возвращает количество элементов
     *
     * @param filter
     * @param result
     */
    efiDataTable.prototype.exists = function (filter, result) {
        if (typeof filter === "function") {
            result(this.getRows().some(function (row) { return filter(row); }));
            return this;
        }
        return this.exists(function (row) { return Object.keys(filter).every(function (cell) { return row[cell] === filter[cell]; }); }, result);
    };
    /**
     * Добавляет строку в таблицу
     * @param objects
     */
    efiDataTable.prototype.add = function () {
        var _this = this;
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        objects.forEach(function (object) {
            if (!(object instanceof efiDataRow_1.efiDataRow)) {
                object = new efiDataRow_1.efiDataRow(object);
            }
            _this.__assignRow(object);
            _this.__data.rows.push(object);
        });
        return this;
    };
    /**
     * Очищает базу данных
     * @param callback
     */
    efiDataTable.prototype.clear = function (callback) {
        this.__data.rows = [];
        this.save(callback);
        return this;
    };
    /**
     * Сохраняет таблицу
     */
    efiDataTable.prototype.save = function (callback) {
        var _this = this;
        var error = false;
        this.__data.rows.map(function (value) {
            if (error)
                return;
            Object.keys(value).filter(function (key) { return !_this.getColumns().hasOwnProperty(key); }).forEach(function (key) {
                if (key !== "remove")
                    delete value[key];
            });
            for (var cellName in _this.getColumns()) {
                if (!_this.getColumns().hasOwnProperty(cellName))
                    continue;
                var cell = _this.getColumns()[cellName];
                if (!value.hasOwnProperty(cellName)) {
                    value[cellName] = cell["default"] === undefined ? null : cell["default"];
                    if (value[cellName] === null && !cell.nullable) {
                        if (callback)
                            callback("\u042F\u0447\u0435\u0439\u043A\u0430 [" + cellName + "] \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C null!");
                        error = true;
                    }
                }
                value[cellName] = value.hasOwnProperty(cellName) ? value[cellName] : null;
            }
            return value;
        });
        if (error)
            return;
        fs.writeFile(this.getPath(), efiDataTable.DB_PRETTY_SAVE ? JSON.stringify(this.__data, null, 2) :
            JSON.stringify(this.__data), function (err) {
            if (err)
                return callback ? callback("Ошибка записи таблицы: " + err.message) : null;
            else {
                if (callback)
                    callback();
            }
        });
        return;
    };
    efiDataTable.prototype.__assignRow = function (row, methods) {
        var _this = this;
        if (methods === void 0) { methods = true; }
        if (methods) {
            row.remove = function (callback) {
                _this.removeRow(row, callback);
                return;
            };
        }
        if (!row.hasOwnProperty("id"))
            row.id = md5(this.getName() + new Date().getTime());
    };
    /**
     * Расширение db файлов
     */
    efiDataTable.DB_FILES_EXTENSION = "db.json";
    /**
     * Красивое оформление db файлов внутри
     *
     * Данный флаг снижает производительность!
     */
    efiDataTable.DB_PRETTY_SAVE = true;
    return efiDataTable;
}());
exports.efiDataTable = efiDataTable;
