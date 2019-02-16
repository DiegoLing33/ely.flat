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
 + Файл: efAppDocumentHead.ts                                                 +
 + Файл изменен: 30.01.2019 01:54:59                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyStylesheet from "@controls/elyStylesheet";
import elyView from "@core/controls/elyView";

/**
 * Документ: Заголовок
 * @class efAppDocumentHead
 * @augments {elyView}
 */
export default class efAppDocumentHead extends elyView {

    /**
     * Свойство: заголовок
     * @ignore
     * @protected
     */
    protected readonly __titleElement: HTMLTitleElement;

    /**
     * Мета значения
     * @ignore
     * @protected
     */
    protected readonly __metaValues: Array<{ name: string, content: string }> = [];

    /**
     * Конструктор
     */
    public constructor() {
        super({element: document.head});
        this.__titleElement = document.getElementsByTagName("title")[0];
        this.getDocument().append(this.__titleElement);
        this.getDocument().append(elyStylesheet.global.getDocument());
    }

    /**
     * Возвращает заголовок
     * @return {string}
     */
    public title(): string;

    /**
     * Устанавливает заголовок
     * @param {string} value - значение
     * @return {this}
     */
    public title(value: string): efAppDocumentHead;

    /**
     * Возвращает и устанавливает заголовок
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public title(value?: string): string | null | efAppDocumentHead {
        if (value === undefined) return this.__titleElement.innerText;
        this.__titleElement.innerText = value;
        document.title = value;
        return this;
    }

    /**
     * Возвращает мета значения
     * @return {*}
     */
    public getMetaValues(): Array<{ name: string, content: string }> {
        return this.__metaValues;
    }

    /**
     * Добавляет мета значение
     * @param {{ name: string, content: string }} props
     * @return {efAppDocumentHead}
     */
    public addMetaValue(props: { name: string, content: string }): efAppDocumentHead {
        const metaElement: HTMLMetaElement = document.createElement("meta");
        metaElement.content = props.content;
        metaElement.name = props.name;
        this.getDocument().append(metaElement);
        return this;
    }

    /**
     * Добавляет viewport
     * @param {{fit?: string, initialScale?: number, maximumScale?: number,
     * userScalable?: string, width?: string}} props
     * @return {efAppDocumentHead}
     */
    public addViewPort(props: {
        fit?: string, initialScale?: number, maximumScale?: number, userScalable?: string, width?: string,
    }): efAppDocumentHead {
        const a = [];
        if (props.fit) a.push(`viewport-fit=${props.fit}`);
        if (props.width) a.push(`width=${props.width}`);
        if (props.initialScale) a.push(`initial-scale=${props.initialScale}`);
        if (props.maximumScale) a.push(`maximum-scale=${props.maximumScale}`);
        if (props.userScalable) a.push(`user-scalable=${props.userScalable}`);
        return this.addMetaValue({name: "viewport", content: a.join(", ")});
    }

    /**
     * Устанавливает кодировку
     * @param {string} charset
     * @return {efAppDocumentHead}
     */
    public setCharset(charset: string): efAppDocumentHead {
        const metaElement = document.createElement("meta");
        metaElement.setAttribute("charset", charset);
        this.getDocument().append(metaElement);
        return this;
    }

    /**
     * Добавляет ссылку
     * @param {{ rel: string, href: string}|*} props
     * @return {efAppDocumentHead}
     */
    public addLink(props: { rel: string, href: string, [key: string]: string }): efAppDocumentHead {
        const lnk = document.createElement("link");
        for (const key in props)
            if (props.hasOwnProperty(key))
                lnk.setAttribute(key, props[key]);
        this.getDocument().append(lnk);
        return this;
    }
}
