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
 + Файл: efAppDocument.ts                                                     +
 + Файл изменен: 30.01.2019 01:54:33                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efAppDocumentBody from "@app/document/efAppDocumentBody";
import efAppDocumentHead from "@app/document/efAppDocumentHead";

/**
 * Документ приложения
 * @class efAppDocument
 */
export default class efAppDocument {

    /**
     * Заголовок
     */
    protected readonly __head: efAppDocumentHead = new efAppDocumentHead();

    /**
     * Тело документа
     */
    protected readonly __body: efAppDocumentBody = new efAppDocumentBody();

    /**
     * Возвращает тело документа
     * @return {efAppDocumentBody}
     */
    public getBody(): efAppDocumentBody {
        return this.__body;
    }

    /**
     * Возвращает заголовок документа
     * @return {efAppDocumentHead}
     */
    public getHead(): efAppDocumentHead {
        return this.__head;
    }
}
