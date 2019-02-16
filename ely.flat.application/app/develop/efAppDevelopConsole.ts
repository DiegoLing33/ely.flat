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
 + Файл: efAppDevelopConsole.ts                                               +
 + Файл изменен: 10.02.2019 18:49:26                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efTextArea} from "@controls/input/efTextArea";
import {efHeaderTextView} from "@controls/text/efHeaderTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * Элемент отображения - консоль
 * @class efAppDevelopConsole
 * @augments {elyView}
 */
export class efAppDevelopConsole extends elyView {

    /**
     * Общий объект консоли
     * @type {efAppDevelopConsole}
     */
    public static readonly shared: efAppDevelopConsole = new efAppDevelopConsole();

    /**
     * Кол-во строк
     */
    public saveRowsLimit: number = 100;

    /**
     * Строки
     */
    protected __rows: string[] = [];

    /**
     * Текст
     */
    protected __textArea = new efTextArea({readonly: true});

    /**
     * Перекрывает консоль
     */
    protected __lockConsole: boolean = false;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyViewOptions = {}) {
        super(options);
        this.addClass("ef-app-develop-console");
        this.getDocument().append(
            new efHeaderTextView({headerLevel: 3, text: "ely.flat Application Develop Console"}).getDocument());
        this.getDocument().append(this.__textArea.getDocument());
    }

    /**
     * Отображает данные в консоли
     * @param data
     */
    public print(...data: any[]): efAppDevelopConsole {
        if (this.__lockConsole) return this;
        const strs = data.map(value => String(value));
        this.__rows.push(strs.join(" "));
        if (this.__rows.length > this.saveRowsLimit) {
            this.__rows.splice(0, Math.abs(this.__rows.length - this.saveRowsLimit));
        }
        this.__textArea.value(this.__rows.join("\n"));
        this.__textArea.scrollToBottom();
        return this;
    }

    /**
     * Отображает ошибку в консоли
     * @param data
     */
    public error(...data: any[]): efAppDevelopConsole {
        if (this.hidden()) this.hidden(false);
        const arr = ["<b>"];
        data.forEach(value => arr.push(value));
        arr.push("</b>");
        this.print(...arr);
        this.__lockConsole = true;
        return this;
    }

}
