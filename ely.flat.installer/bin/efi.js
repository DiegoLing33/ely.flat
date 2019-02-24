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
 + Файл: efi.ts                                                               +
 + Файл изменен: 17.02.2019 21:01:33                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var rollup = require("rollup");
var elyXLogger_1 = require("../core/elyXLogger");
var efiConst_1 = require("./efiConst");
var efiLiveUpdateServer_1 = require("./efiLiveUpdateServer");
var efiUtils_1 = require("./efiUtils");
var efxAppDatabase_1 = require("./efxapp/efxAppDatabase");
/**
 * Основной класс утилиты efi
 * @class efi
 */
var efi = /** @class */ (function () {
    function efi() {
    }
    /**
     * Проверяет наличие ely.flat в директории
     * @param path
     * @param callback
     */
    efi.checkElyFlatExists = function (path, callback) {
        callback(fs.existsSync(path + "/ely.flat.js") && fs.existsSync(path + "/app.js"));
    };
    /**
     * Меняет рабочую директорию
     * @param newPath
     * @param callback
     */
    efi.changeWorkingDirectory = function (newPath, callback) {
        efi.logger.log("[~~] \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438 [" + newPath + "]");
        if (fs.existsSync(newPath)) {
            efi.workingDirectory = newPath;
            efi.checkElyFlatExists(newPath, function (result) {
                efi.logger.log("[OK] \u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430! \u041D\u0430\u043B\u0438\u0447\u0438\u0435 ely.flat: " + (result ? "YES" : "NO"));
                if (callback)
                    callback(null, result);
            });
        }
        else {
            fs.mkdir(newPath, { recursive: true }, function (err) {
                efi.logger.log("[XX] \u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.");
                efi.logger.log("[~~] \u0420\u0435\u043A\u0443\u0440\u0441\u0438\u0432\u043D\u043E\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438...");
                if (err) {
                    efi.logger.error("[XX] \u041E\u0448\u0438\u0431\u043A\u0430: " + err.message);
                    if (callback)
                        callback(err.message, false);
                }
                else {
                    efi.workingDirectory = newPath;
                    if (callback)
                        callback(null, false);
                    efi.logger.log("[OK] \u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430! \u041D\u0430\u043B\u0438\u0447\u0438\u0435 ely.flat: NO");
                }
            });
        }
    };
    /**
     * Инициилизирует приложение
     * @param path
     * @param callback
     */
    efi.initTheApplication = function (path, callback) {
        efi.logger.log("[~~] Инициилизация проекта...");
        if (!fs.existsSync(path)) {
            efi.logger.error("[XX] \u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442! [" + path + "]");
            if (callback)
                callback("\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442! [" + path + "]");
            return;
        }
        efi.logger.log("[~~] Экспорт файлов...");
        efiUtils_1.efiUtils.exportApplicationFilesToPath(path, function (err) {
            if (err) {
                efi.logger.error("[XX] \u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0444\u0430\u0439\u043B\u043E\u0432: " + err);
                if (callback)
                    callback(err);
            }
            else {
                efi.logger.log("[OK] Экспорт файлов");
                efi.buildTheApplication(path, function (error) {
                    if (callback)
                        callback(error);
                });
            }
        });
    };
    /**
     * Выполняет построение приложения
     * @param path
     * @param callback
     */
    efi.buildTheApplication = function (path, callback) {
        efi.checkElyFlatExists(path, function (result) {
            if (!result) {
                if (callback)
                    callback("\u0412 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438 " + path + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0444\u0430\u0439\u043B\u044B \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F ely.flat!");
                return;
            }
            efi.logger.log("[~~] Очистка...");
            fs.rmdir(path + "/build", function (err) {
                efi.logger.log("[!!] \u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: " + err.message);
                efi.logger.log("[~~] \u041D\u0430\u0447\u0430\u0442\u043E \u043F\u043E\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u0435 \u0432 [" + path + "/build]");
                efi.logger.log("[~~] \u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432");
                efiUtils_1.efiUtils.exportResourcesFilesToPath(path + "/build", function (err) {
                    if (err) {
                        if (callback)
                            callback(err);
                        return;
                    }
                    efi.compileTheApplication(path, function (error) {
                        if (callback)
                            callback(error);
                    });
                });
            });
        });
    };
    /**
     * Компилирует приложение
     * @param path
     * @param callback
     */
    efi.compileTheApplication = function (path, callback) {
        var _this = this;
        efi.logger.log("[~~] \u041A\u043E\u043C\u043F\u0438\u043B\u044F\u0446\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432 ely.flat...");
        efi.checkElyFlatExists(path, function (result) { return __awaiter(_this, void 0, void 0, function () {
            var bundle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(fs.existsSync(path + "/app.config.json") && fs.existsSync(path + "/build") && result)) return [3 /*break*/, 2];
                        return [4 /*yield*/, rollup.rollup({ input: path + "/app.js" })];
                    case 1:
                        bundle = _a.sent();
                        // console.log(bundle.watchFiles);
                        bundle.write({ file: path + "/build/js/index.js", format: "iife" }).then(function () {
                            efi.logger.log("[OK] \u041A\u043E\u043C\u043F\u0438\u043B\u044F\u0446\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432 ely.flat");
                            efi.logger.log("[~~] \u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438...");
                            fs.copyFile(path + "/app.config.json", path + "/build/app.config.json", function (err) {
                                if (callback)
                                    callback(err ? err.message : undefined);
                            });
                        })["catch"](function (reason) {
                            efi.logger.error("[XX] \u041E\u0448\u0438\u0431\u043A\u0430: " + reason);
                            if (callback)
                                callback(reason);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        efi.logger.error("[XX] \u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043A\u043E\u043C\u043F\u0438\u043B\u044F\u0446\u0438\u0438!");
                        if (callback)
                            callback("Не найдено приложение для компиляции!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Запускает live update сервер
     * @param path
     * @param callback
     */
    efi.runLiveUpdateServer = function (path, callback) {
        var _this = this;
        if (efi.liveUpdateServer) {
            if (callback)
                callback("Сервер живого обновления уже запущен.");
            return;
        }
        efi.liveUpdateServer = new efiLiveUpdateServer_1.efiLiveUpdateServer();
        efi.liveUpdateServer.runServer(path, function (err) {
            if (callback)
                callback(err);
        }, function () {
            _this.compileTheApplication(path, function () {
                // Nothing is care about
            });
        });
    };
    /**
     * Останавливает live update сервер
     * @param path
     * @param callback
     */
    efi.stopLiveUpdateServer = function (path, callback) {
        if (!efi.liveUpdateServer) {
            if (callback)
                callback("Сервер живого обновления не запущен.");
            return;
        }
        efi.liveUpdateServer.stop(function (err) {
            efi.liveUpdateServer = null;
            if (callback)
                callback(err);
        });
    };
    /**
     * Проверяет состояние сервера живого обновления
     * @param callback
     */
    efi.isLiveUpdateServerRunning = function (callback) {
        callback(!!efi.liveUpdateServer);
    };
    /**
     * Записывает данные в конфигурацию через строку
     * @param path
     * @param configPath
     * @param value
     * @param callback
     */
    efi.writeConfigFromString = function (path, configPath, value, callback) {
        efi.logger.log("[~~] \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 " + configPath + " -> " + value + "...");
        this.checkElyFlatExists(path, function (result) {
            if (!result) {
                if (callback)
                    callback("\u0412 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0438\u0438 " + path + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0444\u0430\u0439\u043B\u044B \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F ely.flat!");
                return;
            }
            var file = path + "/app.config.json";
            fs.readFile(file, function (err, content) {
                if (err) {
                    if (callback)
                        callback(err.message);
                    return;
                }
                try {
                    // Simple timed fix
                    if (value === "true")
                        value = true;
                    if (value === "false")
                        value = false;
                    var JSON_object = JSON.parse(String(content));
                    var setToValue = function (_obj, _value, _path) {
                        var i;
                        _path = _path.split(".");
                        for (i = 0; i < _path.length - 1; i++) {
                            _obj = _obj[_path[i]];
                        }
                        _obj[_path[i]] = _value;
                    };
                    setToValue(JSON_object, value, configPath);
                    fs.writeFile(file, JSON.stringify(JSON_object, null, 2), function (err) {
                        if (err) {
                            efi.logger.error("[XX] \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 " + configPath + " -> " + value + ": " +
                                ("" + err.message));
                            if (callback)
                                callback(err.message);
                        }
                        else {
                            efi.logger.log("[OK] \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 " + configPath + " -> " + value + ".");
                            if (callback)
                                callback();
                        }
                    });
                }
                catch (e) {
                    efi.logger.error("[XX] \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 " + configPath + " -> " + value + ": " + e.message);
                    if (callback)
                        callback(e.message);
                }
            });
        });
    };
    /**
     * Возвращает элементы базы данных
     * @param path
     * @param request
     * @param next
     */
    efi.getDBItems = function (path, request, next) {
        if (!fs.existsSync(path + "/" + efiConst_1.efiConst.DB_FILES_PATH + "/db.json")) {
            return efi.nextErrorSend("Модуль efx-app не установлен!", next);
        }
        fs.readFile(path + "/" + efiConst_1.efiConst.DB_FILES_PATH + "/db.json", function (err, content) {
            if (err)
                return efi.nextErrorSend(err.message, next);
            try {
                var JSON_DATA = JSON.parse(String(content));
                next(true, JSON_DATA);
            }
            catch (e) {
                efi.nextErrorSend(e.message, next);
            }
        });
    };
    /**
     * Устанавливает значение существующей строки
     * @param path
     * @param request
     * @param next
     */
    efi.setDBItemValue = function (path, request, next) {
        if (!(request.table && request.column && request.value && request.rowIndex)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        var table = request.table;
        var column = request.column;
        var value = request.value;
        var rowIndex = parseInt(String(request.rowIndex), 10);
        var db = new efxAppDatabase_1.efxAppDatabase(path + "/" + efiConst_1.efiConst.DB_FILES_PATH + "/db.json", function (err) {
            if (err)
                return efi.nextErrorSend(err, next);
            db.setTableRowColumnItem(table, rowIndex, column, value, function (err1) {
                if (err1)
                    efi.nextErrorSend(err1, next);
                else
                    next(true, {});
            });
        });
    };
    /**
     * Возвращает элементы таблицы
     * @param path
     * @param request
     * @param next
     */
    efi.getTableItems = function (path, request, next) {
        if (!(request.table)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        var table = request.table;
        var db = new efxAppDatabase_1.efxAppDatabase(path + "/" + efiConst_1.efiConst.DB_FILES_PATH + "/db.json", function (err) {
            if (err)
                return efi.nextErrorSend(err, next);
            var items = db.getTableItems(table);
            if (!items)
                return efi.nextErrorSend("\u0422\u0430\u0431\u043B\u0438\u0446\u0430 " + table + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445!", next);
            next(true, { items: items });
        });
    };
    /**
     * Возвращает строки таблицы по критерию
     * @param path
     * @param request
     * @param next
     */
    efi.getTableRows = function (path, request, next) {
        var _this = this;
        if (!(request.table && request.selector)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        var table = request.table;
        var selector = request.selector;
        var db = new efxAppDatabase_1.efxAppDatabase(path + "/" + efiConst_1.efiConst.DB_FILES_PATH + "/db.json", function (err) {
            if (err)
                return efi.nextErrorSend(err, next);
            db.getTableRows(table, selector, function (err1, rows) {
                if (err1) {
                    _this.nextErrorSend(err1, next);
                }
                else {
                    next(true, { rows: rows });
                }
            });
        });
    };
    /**
     * Добавляет запись в таблицу
     * @param path
     * @param request
     * @param next
     */
    efi.addTableRow = function (path, request, next) {
        if (!(request.table)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        var table = request.table;
        var data = request;
        delete data.table;
        var db = new efxAppDatabase_1.efxAppDatabase(path + "/" + efiConst_1.efiConst.DB_FILES_PATH + "/db.json", function (err) {
            if (err)
                return efi.nextErrorSend(err, next);
            efi.logger.log("Добавление строки в efX-app database: " + JSON.stringify(data, null, 2));
            db.addTableRow(table, data, function (err1) {
                next(err1 === undefined, {});
            });
        });
    };
    /**
     * Простой мтеод проверки
     * @param path
     * @param request
     * @param next
     */
    efi.testEFX = function (path, request, next) {
        next(true, {});
    };
    /**
     * Вызывает TNextCallback с сообщением об ошибке
     * @param error
     * @param next
     */
    efi.nextErrorSend = function (error, next) {
        efi.logger.error(error);
        next(false, { error: error });
        return null;
    };
    /**
     * Рабочая директория
     */
    efi.workingDirectory = "";
    /**
     * Главный логгер
     */
    efi.logger = new elyXLogger_1["default"]({ mainPrefix: "efi" });
    return efi;
}());
exports.efi = efi;
