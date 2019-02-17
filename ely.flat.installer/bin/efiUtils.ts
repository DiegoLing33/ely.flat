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

import * as fs from "fs";
import {ncp} from "ncp";
import {efiConst} from "./efiConst";

/**
 * Утилиты efi
 * @class efiUtils
 */
export class efiUtils {

    /**
     * Возвращает путь до файлов модуля
     */
    public static getModulePath(): string {
        return __dirname.replace("/bin", "");
    }

    /**
     * Проверяет существование пути
     * @param path
     * @param callback
     */
    public static checkExportPath(path: string | string[], callback: (result: boolean) => void): void {
        if (typeof path === "string") {
            callback(fs.existsSync(path));
        } else {
            callback(path.every(value => fs.existsSync(value)));
        }
    }

    /**
     * Экспортирует содержимое директории в директорию path
     * @param a
     * @param path
     * @param callback
     */
    public static exportToPath(a, path, callback: (err?: string) => void): void {
        efiUtils.checkExportPath(efiUtils.getModulePath() + "/" + a, result => {
            if (!result) callback(`Объект ${a} не найден в пакете efi!`);
            else {
                ncp(efiUtils.getModulePath() + "/" + a, path, err => {
                    callback(err ? err.message : undefined);
                });
            }
        });
    }

    /**
     * Экспортирует файлы скриптов приложения
     * @param {string} path - новый путь
     * @param {function(err: string|undefined)} callback
     */
    public static exportApplicationFilesToPath(path, callback: (err?: string) => void): void {
        efiUtils.exportToPath(efiConst.APPLICATION_FILES_PATH, path, err => {
            if (err) callback(err);
            else efiUtils.exportToPath(efiConst.BUILD_PATH, path, err => {
                callback();
            });
        });
    }

    /**
     * Экспортирует файлы ресурсов в директорию path
     * @param path
     * @param callback
     */
    public static exportResourcesFilesToPath(path, callback: (err?: string) => void): void {
        efiUtils.exportToPath(efiConst.RESOURCES_FILES_PATH, path, err => {
            callback(err);
        });
    }

}
