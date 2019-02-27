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
 + Файл: SendFileRequest.ts                                             +
 + Файл изменен: 27.02.2019 00:18:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import URLRequest, {TURLCallback, URLRequestMethod, URLRequestOptions} from "./URLRequest";

/**
 * Опции {@link SendFileRequest}
 */
export interface SendFileRequestOptions extends URLRequestOptions {
    files?: File[];
}

/**
 * Запрос отправки файла
 * @class SendFileRequest
 * @augments {URLRequest}
 */
export default class SendFileRequest extends URLRequest {
    /**
     * Выполняет отправку файлов
     *
     * @param {string} url - адрес
     * @param {*} files - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     * @return SendFileRequest
     */
    public static send(url: string, files: File[], callback?: TURLCallback): void {
        new SendFileRequest({url, files}).send(callback);
    }

    /**
     * @ignore
     */
    protected readonly __files: File[];

    /**
     * Конструктор
     * @param {SendFileRequestOptions} options
     */
    public constructor(options: SendFileRequestOptions) {
        super(options);
        this.__files = options.files || [];
    }

    /**
     * Выполняет запрос
     *
     * @param {TURLCallback} callback
     */
    public send(callback?: TURLCallback): void {
        this.__method = URLRequestMethod.POST;
        this.__prepareXMLHttpRequestCore(callback);

        const theFormData = new FormData();
        this.getFiles().forEach(file => {
            theFormData.append("file", file);
        });
        this.getXMLHttpRequest().send(theFormData);
    }

    /**
     * Добавляет файлы
     * @param {...File} files - файлы
     * @return SendFileRequest
     */
    public addFiles(...files: File[]): SendFileRequest {
        this.__files.push(...files);
        return this;
    }

    /**
     * Возвращает файлы
     */
    public getFiles(): File[] {
        return this.__files;
    }
}

/**
 * @typedef {Object} SendFileRequest
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {File[]} [files]
 */
