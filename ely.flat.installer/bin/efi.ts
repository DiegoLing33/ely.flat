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

import * as fs from "fs";
import * as rollup from "rollup";
import elyXLogger from "../core/elyXLogger";
import {efiConst} from "./efiConst";
import {efiLiveUpdateServer} from "./efiLiveUpdateServer";
import {efiUtils} from "./efiUtils";
import {efxAppDatabase} from "./efxapp/efxAppDatabase";

/**
 * Обработчик с результатом
 */
export type TResultCallback = (result: boolean) => void;
export type TErrorCallback = (error?: string) => void;
export type TNextCallback = (result: boolean, data: any) => void;

/**
 * Основной класс утилиты efi
 * @class efi
 */
export class efi {

    /**
     * Сервер живого обновления
     */
    public static liveUpdateServer: efiLiveUpdateServer;

    /**
     * Рабочая директория
     */
    public static workingDirectory: string = "";

    /**
     * Главный логгер
     */
    public static logger: elyXLogger = new elyXLogger({mainPrefix: "efi"});

    /**
     * Проверяет наличие ely.flat в директории
     * @param path
     * @param callback
     */
    public static checkElyFlatExists(path: string, callback: TResultCallback): void {
        callback(fs.existsSync(path + "/ely.flat.js") && fs.existsSync(path + "/app.js"));
    }

    /**
     * Меняет рабочую директорию
     * @param newPath
     * @param callback
     */
    public static changeWorkingDirectory(newPath: string, callback?: (err?: string, efHere?: boolean) => void): void {
        efi.logger.log(`[~~] Изменение рабочей директории [${newPath}]`);
        if (fs.existsSync(newPath)) {
            efi.workingDirectory = newPath;
            efi.checkElyFlatExists(newPath, result => {
                efi.logger.log(`[OK] Рабочая директория изменена! Наличие ely.flat: ${result ? "YES" : "NO"}`);
                if (callback) callback(null, result);
            });
        } else {
            fs.mkdir(newPath, {recursive: true}, err => {
                efi.logger.log(`[XX] Директория не найдена.`);
                efi.logger.log(`[~~] Рекурсивное создание директории...`);
                if (err) {
                    efi.logger.error(`[XX] Ошибка: ${err.message}`);
                    if (callback) callback(err.message, false);
                } else {
                    efi.workingDirectory = newPath;
                    if (callback) callback(null, false);
                    efi.logger.log(`[OK] Рабочая директория изменена! Наличие ely.flat: NO`);
                }
            });
        }
    }

    /**
     * Инициилизирует приложение
     * @param path
     * @param callback
     */
    public static initTheApplication(path: string, callback?: TErrorCallback): void {
        efi.logger.log("[~~] Инициилизация проекта...");
        if (!fs.existsSync(path)) {
            efi.logger.error(`[XX] Рабочая директория не существует! [${path}]`);
            if (callback) callback(`Рабочая директория не существует! [${path}]`);
            return;
        }
        efi.logger.log("[~~] Экспорт файлов...");
        efiUtils.exportApplicationFilesToPath(path, err => {
            if (err) {
                efi.logger.error(`[XX] Экспорт файлов: ${err}`);
                if (callback) callback(err);
            } else {
                efi.logger.log("[OK] Экспорт файлов");
                efi.buildTheApplication(path, error => {
                    if (callback) callback(error);
                });
            }
        });
    }

    /**
     * Выполняет построение приложения
     * @param path
     * @param callback
     */
    public static buildTheApplication(path: string, callback?: TErrorCallback): void {
        efi.checkElyFlatExists(path, result => {
            if (!result) {
                if (callback) callback(`В директории ${path} не найдены файлы приложения ely.flat!`);
                return;
            }
            efi.logger.log("[~~] Очистка...");
            fs.rmdir(path + "/build", (err) => {
                efi.logger.log(`[!!] Внимание: ${err.message}`);
                efi.logger.log(`[~~] Начато построение в [${path}/build]`);
                efi.logger.log(`[~~] Копирование ресурсов`);
                efiUtils.exportResourcesFilesToPath(path + "/build", err => {
                    if (err) {
                        if (callback) callback(err);
                        return;
                    }
                    efi.compileTheApplication(path, error => {
                        if (callback) callback(error);
                    });
                });
            });
        });
    }

    /**
     * Компилирует приложение
     * @param path
     * @param callback
     */
    public static compileTheApplication(path: string, callback?: TErrorCallback): void {
        efi.logger.log(`[~~] Компиляция файлов ely.flat...`);
        efi.checkElyFlatExists(path, async result => {
            if (fs.existsSync(path + "/app.config.json") && fs.existsSync(path + "/build") && result) {
                const bundle = await rollup.rollup({input: path + "/app.js"});
                // console.log(bundle.watchFiles);
                bundle.write({file: path + "/build/js/index.js", format: "iife"}).then(() => {
                    efi.logger.log(`[OK] Компиляция файлов ely.flat`);
                    efi.logger.log(`[~~] Копирование конфигурации...`);
                    fs.copyFile(path + "/app.config.json", path + "/build/app.config.json", err => {
                        if (callback) callback(err ? err.message : undefined);
                    });
                }).catch(reason => {
                    efi.logger.error(`[XX] Ошибка: ${reason}`);
                    if (callback) callback(reason);
                });
            } else {
                efi.logger.error(`[XX] Не найдено приложение для компиляции!`);
                if (callback) callback("Не найдено приложение для компиляции!");
            }
        });
    }

    /**
     * Запускает live update сервер
     * @param path
     * @param callback
     */
    public static runLiveUpdateServer(path: string, callback?: TErrorCallback): void {
        if (efi.liveUpdateServer) {
            if (callback) callback("Сервер живого обновления уже запущен.");
            return;
        }
        efi.liveUpdateServer = new efiLiveUpdateServer();
        efi.liveUpdateServer.runServer(path, err => {
            if (callback) callback(err);
        }, () => {
            this.compileTheApplication(path, () => {
                // Nothing is care about
            });
        });
    }

    /**
     * Останавливает live update сервер
     * @param path
     * @param callback
     */
    public static stopLiveUpdateServer(path: string, callback?: TErrorCallback): void {
        if (!efi.liveUpdateServer) {
            if (callback) callback("Сервер живого обновления не запущен.");
            return;
        }
        efi.liveUpdateServer.stop(err => {
            efi.liveUpdateServer = null;
            if (callback) callback(err);
        });
    }

    /**
     * Проверяет состояние сервера живого обновления
     * @param callback
     */
    public static isLiveUpdateServerRunning(callback: TResultCallback): void {
        callback(!!efi.liveUpdateServer);
    }

    /**
     * Записывает данные в конфигурацию через строку
     * @param path
     * @param configPath
     * @param value
     * @param callback
     */
    public static writeConfigFromString(path: string, configPath: string, value: any, callback?: TErrorCallback): void {
        efi.logger.log(`[~~] Установка значения конфигурации ${configPath} -> ${value}...`);
        this.checkElyFlatExists(path, result => {
            if (!result) {
                if (callback) callback(`В директории ${path} не найдены файлы приложения ely.flat!`);
                return;
            }
            const file = path + "/app.config.json";
            fs.readFile(file, (err, content) => {
                if (err) {
                    if (callback) callback(err.message);
                    return;
                }
                try {
                    // Simple timed fix
                    if (value === "true") value = true;
                    if (value === "false") value = false;

                    const JSON_object = JSON.parse(String(content));
                    const setToValue = (_obj, _value, _path) => {
                        let i;
                        _path = _path.split(".");
                        for (i = 0; i < _path.length - 1; i++) {
                            _obj = _obj[_path[i]];

                        }
                        _obj[_path[i]] = _value;
                    };
                    setToValue(JSON_object, value, configPath);
                    fs.writeFile(file, JSON.stringify(JSON_object, null, 2), err => {
                        if (err) {
                            efi.logger.error(`[XX] Установка значения конфигурации ${configPath} -> ${value}: ` +
                                `${err.message}`);
                            if (callback) callback(err.message);
                        } else {
                            efi.logger.log(`[OK] Установка значения конфигурации ${configPath} -> ${value}.`);
                            if (callback) callback();
                        }
                    });
                } catch (e) {
                    efi.logger.error(`[XX] Установка значения конфигурации ${configPath} -> ${value}: ${e.message}`);
                    if (callback) callback(e.message);
                }
            });
        });
    }

    /**
     * Возвращает элементы базы данных
     * @param path
     * @param request
     * @param next
     */
    public static getDBItems(path: string, request: any, next: TNextCallback): void {
        if (!fs.existsSync(path + "/" + efiConst.DB_FILES_PATH + "/db.json")) {
            return efi.nextErrorSend("Модуль efx-app не установлен!", next);
        }
        fs.readFile(path + "/" + efiConst.DB_FILES_PATH + "/db.json", (err, content) => {
            if (err) return efi.nextErrorSend(err.message, next);
            try {
                const JSON_DATA = JSON.parse(String(content));
                next(true, JSON_DATA);
            } catch (e) {
                efi.nextErrorSend(e.message, next);
            }
        });
    }

    /**
     * Устанавливает значение существующей строки
     * @param path
     * @param request
     * @param next
     */
    public static setDBItemValue(path: string, request: any, next: TNextCallback): void {

        if (!(request.table && request.column && request.value && request.rowIndex)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }

        const table: string = request.table;
        const column: string = request.column;
        const value: string = request.value;
        const rowIndex: number = parseInt(String(request.rowIndex), 10);

        const db = new efxAppDatabase(path + "/" + efiConst.DB_FILES_PATH + "/db.json", err => {
            if (err) return efi.nextErrorSend(err, next);
            db.setTableRowColumnItem(table, rowIndex, column, value, err1 => {
                if (err1) efi.nextErrorSend(err1, next);
                else next(true, {});
            });
        });
    }

    /**
     * Возвращает элементы таблицы
     * @param path
     * @param request
     * @param next
     */
    public static getTableItems(path: string, request: any, next: TNextCallback): void {
        if (!(request.table)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        const table: string = request.table;
        const db = new efxAppDatabase(path + "/" + efiConst.DB_FILES_PATH + "/db.json", err => {
            if (err) return efi.nextErrorSend(err, next);
            const items = db.getTableItems(table);
            if (!items) return efi.nextErrorSend(`Таблица ${table} не найдена в базе данных!`, next);
            next(true, {items});
        });
    }

    /**
     * Возвращает строки таблицы по критерию
     * @param path
     * @param request
     * @param next
     */
    public static getTableRows(path: string, request: any, next: TNextCallback): void {
        if (!(request.table && request.selector)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        const table: string = request.table;
        const selector: any = request.selector;
        const db = new efxAppDatabase(path + "/" + efiConst.DB_FILES_PATH + "/db.json", err => {
            if (err) return efi.nextErrorSend(err, next);
            db.getTableRows(table, selector, (err1, rows) => {
                if (err1) {
                    this.nextErrorSend(err1, next);
                } else {
                    next(true, {rows});
                }
            });
        });
    }

    /**
     * Добавляет запись в таблицу
     * @param path
     * @param request
     * @param next
     */
    public static addTableRow(path: string, request: any, next: TNextCallback): void {
        if (!(request.table)) {
            return efi.nextErrorSend("Передано недостаточно аргументов для выполнения действия.", next);
        }
        const table: string = request.table;
        const data: any = request;
        delete data.table;
        const db = new efxAppDatabase(path + "/" + efiConst.DB_FILES_PATH + "/db.json", err => {
            if (err) return efi.nextErrorSend(err, next);
            efi.logger.log("Добавление строки в efX-app database: " + JSON.stringify(data, null, 2));
            db.addTableRow(table, data, err1 => {
                next(err1 === undefined, {});
            });
        });
    }

    /**
     * Простой мтеод проверки
     * @param path
     * @param request
     * @param next
     */
    public static testEFX(path: string, request: any, next: TNextCallback): void {
        next(true, {});
    }

    /**
     * Вызывает TNextCallback с сообщением об ошибке
     * @param error
     * @param next
     */
    public static nextErrorSend(error: string, next: TNextCallback): void {
        efi.logger.error(error);
        next(false, {error});
        return null;
    }
}
