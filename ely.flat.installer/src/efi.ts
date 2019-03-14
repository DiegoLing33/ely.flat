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
 + Файл изменен: 26.02.2019 01:59:34                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as fs from "fs";
import * as rollup from "rollup";
import elyXLogger from "./core/elyXLogger";
import {efiLiveUpdateServer} from "./efiLiveUpdateServer";
import {TErrorCallback} from "./efiTypes";
import {efiUtils} from "./efiUtils";
import {efiDatabase} from "./efxapp/db/efiDatabase";

/**
 * Обработчик с результатом
 */
export type TResultCallback = (result: boolean) => void;
export type TNextCallback = (result: boolean, data: any) => void;

/**
 * Основной класс утилиты efi
 * @class efi
 */
export class efi {

    /**
     * Сервер живого обновления
     */
    public static liveUpdateServer: efiLiveUpdateServer | null;

    /**
     * Рабочая директория
     */
    public static workingDirectory: string = "";

    /**
     * Главный логгер
     */
    public static logger: elyXLogger = new elyXLogger({mainPrefix: "efi"});

    /**
     * База данных
     */
    public static db: efiDatabase;

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
    public static changeWorkingDirectory(newPath: string, callback?: (err?: string | null, efHere?: boolean) => void):
        void {
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
                    const setToValue = (_obj: any, _value: any, _path: any) => {
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
     * Вызывает TNextCallback с сообщением об ошибке
     * @param error
     * @param next
     */
    public static nextErrorSend(error: string, next: TNextCallback): void {
        efi.logger.error(error);
        next(false, {error});
        return;
    }
}
