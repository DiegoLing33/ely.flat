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
 + Файл: elyURL.ts                                                            +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyLogger from "../../elyLogger";
import elyURLDelegate from "./elyURLDelegate";

/**
 * Класс ely.URL
 *
 * Класс, содержащий набор методов для работы с URL
 */
export default class elyURL {

    /**
     * Возвращает текущий URL
     */
    public static current(): elyURL {
        return new elyURL(window.location.href);
    }

    /**
     * Абсолютный URL
     */
    public readonly absoluteString: string;

    /**
     * Ответ обрабатывается как JSON
     */
    public jsonResponse: boolean = true;

    /**
     * Делегат класса
     */
    public delegate: elyURLDelegate;

    /**
     * Конструктор
     *
     * @param {string} url - URL строка
     * @param {*} props - опции
     */
    public constructor(url: string, props: any = []) {
        this.absoluteString = url;
        this.delegate = new elyURLDelegate();
    }

    /**
     * Возвращает очищенный URL
     */
    public getClearURL(): string {
        return new RegExp("(http[s]?:\\/\\/.+)\\/").exec(this.absoluteString)![1]!;
    }

    /**
     * Возвращает очищенный URL от GET запроса
     */
    public getClearOfRequestURL(): string {
        return new RegExp("(http[s]?:\\/\\/.+)\\?").exec(this.absoluteString)![1]!;
    }

    /**
     * Отправляет запрос на URL
     *
     * @param object - объект с данными запроса
     * @param callback - обработчик результатов запроса
     *
     * Метод работает асинхронно!
     * @async
     * @deprecated
     */
    public request(object: any, callback?: (response: any, status: any) => void): elyURL {
        const xhr = new XMLHttpRequest();
        let fmd = object;
        if (!(object instanceof FormData)) {
            fmd = new FormData();
            for (const index in object)
                if (object.hasOwnProperty(index))
                    fmd.append(index, object[index]);
        }

        xhr.onprogress = ((ev) => {
            this.delegate.elyURLProgressChanged(this, ev.loaded, ev.total);
        });
        xhr.onerror = ((ev) => {
            this.delegate.elyURLRequestDidLose(this, ev);
        });
        xhr.onabort = (() => {
            this.delegate.elyURLDidCanseled(this);
        });

        xhr.onload = () => {
            if (callback) {
                let resp = xhr.response;
                try {
                    if (this.jsonResponse)
                        resp = JSON.parse(resp);
                } catch (e) {
                    elyLogger.warning("Ошибка возникла при обработке JSON в elyURL!");
                    resp = null;
                }
                this.delegate.elyURLDidSendRequest(this, xhr.status, xhr.response);
                callback(resp, xhr.status);
            }
        };

        if (this.delegate.elyURLWillSendRequest(this, object)) {
            xhr.open("POST", this.absoluteString);
            xhr.send(fmd);
        }
        return this;
    }

}
