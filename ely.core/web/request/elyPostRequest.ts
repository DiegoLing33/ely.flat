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
 + Файл: elyPostRequest.ts                                                    +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyLogger from "@core/elyLogger";
import elyGetRequest from "@core/web/request/elyGetRequest";
import elyURL from "@core/web/url/elyURL";

type elyPostRequestSendObserver = (response: any, status: number) => void;

/**
 * POST запрос
 */
export default class elyPostRequest extends elyGetRequest {
    /**
     * Конструктор
     * @param options
     */
    public constructor(options: { url: elyURL | string } | string) {
        super(options);
    }

    /**
     * Отправляет данные
     * @param data
     * @param callback
     */
    public send(data: { [p: string]: any } | any, callback?: elyPostRequestSendObserver): void {
        let fmd = data;
        if (!(data instanceof FormData)) {
            fmd = new FormData();
            for (const index in data) {
                if (data.hasOwnProperty(index)) {
                    if (data[index] instanceof Array) {
                        for (const it of data[index])
                            fmd.append(index, it);
                    } else {
                        fmd.set(index, data[index]);
                    }
                }
            }
        }

        this.xhr.open("POST", this.url.absoluteString);
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === XMLHttpRequest.DONE) {
                let resp = this.xhr.response;
                try {
                    if (this.useJson)
                        resp = JSON.parse(resp);
                } catch (e) {
                    elyLogger.warning("Ошибка возникла при обработке JSON в elyGetRequest! " + this.url.absoluteString);
                    elyLogger.debugObject(this);
                    resp = null;
                }
                if (callback) callback(resp, this.xhr.status);
            }
        };
        // this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.xhr.send(fmd);
    }
}
