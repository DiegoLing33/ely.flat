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
 + Файл: AppDocuments                                                     +
 + Файл изменен: 30.01.2019 01:54:33                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import AppDocumentBody from "./AppDocumentBody";
import AppDocumentHead from "./AppDocumentHead";

/**
 * Документ приложения
 * @class AppDocument
 */
export default class AppDocument {

    /**
     * Заголовок
     */
    protected readonly __head: AppDocumentHead = new AppDocumentHead();

    /**
     * Тело документа
     */
    protected readonly __body: AppDocumentBody = new AppDocumentBody();

    /**
     * Возвращает тело документа
     * @return {AppDocumentBody}
     */
    public getBody(): AppDocumentBody {
        return this.__body;
    }

    /**
     * Возвращает заголовок документа
     * @return {AppDocumentHead}
     */
    public getHead(): AppDocumentHead {
        return this.__head;
    }
}
