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
 + Файл: elyURLDelegate.ts                                                    +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyURL from "./elyURL";

/**
 * Делегат elyURL
 */
export default class elyURLDelegate {

    /**
     * Запрос был отправлен
     *
     * @param {elyURL} url - объект elyURL
     * @param {*} status - статус ответа
     * @param {*} response - ответ чистого формата (НЕ JSON)
     */
    public elyURLDidSendRequest(url: elyURL, status: any, response: any) {
        // Nothing is done
    }

    /**
     * Метод вызывается перед отправкой запроса, на вход передаются
     * данные, которые будут отправлены.
     *
     * Возвращаемое значение - разрешение на совершение запроса.
     *
     * @param {elyURL} url - URL
     * @param {*} data - данные запроса
     *
     * @return boolean - разрешение на отправку запроса
     */
    public elyURLWillSendRequest(url: elyURL, data: any): boolean {
        return true;
    }

    /**
     * Запрос был отменен пользователем
     *
     * Данный метод вызывается при отмене запроса.
     *
     * @param {elyURL} url - объект elyURL
     */
    public elyURLDidCanseled(url: elyURL) {
        // Nothing is done
    }

    /**
     * Запрос выполнен с ошибкой
     *
     * @param {elyURL} url - объект elyURL
     * @param {*} error - ошибка
     */
    public elyURLRequestDidLose(url: elyURL, error: any) {
        // Nothing is done
    }

    /**
     * Запрос выполняется и передается
     *
     * @param {elyURL} url - объект elyURL
     * @param {number} loadedBytes - передано байт
     * @param {number} totalBytes - всего байт
     */
    public elyURLProgressChanged(url: elyURL, loadedBytes: number, totalBytes: number) {
        // Nothing is done
    }
}
