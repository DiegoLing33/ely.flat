/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyFlatServerFiles.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyPostRequest from "@core/web/request/elyPostRequest";
import elyFlatServer from "./elyFlatServer";

/**
 * Загружает файлы на сервер
 */
export default class elyFlatServerFiles {

    /**
     * Загружает файлы на сервер
     * @param token
     * @param files
     * @param callback
     */
    public static upload(token: string, files: File[], callback: (result: boolean, error: any) => void): void {
        new elyPostRequest(elyFlatServer.url + "/fs.upload?token=" + token).send(files,
            (response, status1) => {
                if (response && response.result) {
                    callback(response.result, null);
                } else if (response && response.error) {
                    callback(false, response.error);
                }
            });
    }

    /**
     * Возвращает информацию о файле
     * @param id
     * @param callback
     * @param autoErrors
     */
    public static getFile(id: number, callback: (result: any | null, err: any | null) => void,
                          autoErrors: boolean | number[] = true): void {
        elyFlatServer.getRequest("fs", "getFile", {id}, response => {
            if (response && !response.error) callback(response.response, null);
            else if (response && response.error) callback(null, response.error);
            else callback(null, null);
        });
    }

    /**
     * Удаляет файл
     * @param token
     * @param id
     * @param callback
     * @param autoErrors
     */
    public static removeFile(token: string, id: number, callback: (result: any | null, err: any | null) => void,
                             autoErrors: boolean | number[] = true): void {
        elyFlatServer.getRequest("fs", "remove", {id, token}, response => {
            if (response && !response.error) callback(response.response.result, null);
            else if (response && response.error) callback(false, response.error);
            else callback(false, null);
        });
    }
}
