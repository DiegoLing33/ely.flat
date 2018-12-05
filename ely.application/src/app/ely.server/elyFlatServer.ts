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
 + Файл: elyFlatServer.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyNotificationView from "@controls/notification/elyNotificationView";
import elyGetRequest from "@core/web/request/elyGetRequest";

export default class elyFlatServer {

    /**
     * Адрес сервера
     */
    public static url: string = "http://localhost:5130";

    /**
     * Создает get запрос к методу API
     * @param apiClass
     * @param aliMethod
     * @param options
     * @param callback
     * @param autoErrors
     */
    public static getRequest(apiClass: string, aliMethod: string, options: {},
                             callback?: (response: any, status: any) => void, autoErrors: boolean | number[] = true) {
        new elyGetRequest(`${elyFlatServer.url}/${apiClass}.${aliMethod}`).send(options,
            (response: any, status: number) => {
                if (autoErrors && response.error) {
                    const error = response.error;

                    if ((typeof autoErrors === "boolean" && autoErrors) ||
                        (autoErrors instanceof Array && autoErrors.indexOf(error.code) === -1)) {
                        new elyNotificationView({
                            content: `Код ошибки: ${error.code}`,
                            message: error.message,
                            title: "Ошибка",
                        }).present();
                    }
                }
                if (callback) callback(response, status);
            });
    }
}
