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
 + Файл: AppDevelopConsole.ts                                             +
 + Файл изменен: 10.02.2019 18:49:26                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import TextArea from "@controls/input/TextArea";
import HeaderTextView from "@controls/text/HeaderTextView";
import View, {ViewOptions} from "@core/controls/View";

/**
 * Элемент отображения - консоль
 * @class AppDevelopConsole
 * @augments {View}
 */
export default class AppDevelopConsole extends View {

    /**
     * Общий объект консоли
     * @type {AppDevelopConsole}
     */
    public static readonly shared: AppDevelopConsole = new AppDevelopConsole();

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
    protected __textArea = new TextArea({readonly: true});

    /**
     * Перекрывает консоль
     */
    protected __lockConsole: boolean = false;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: ViewOptions = {}) {
        super(options);
        this.addClass("ef-app-develop-console");
        this.getDocument().append(
            new HeaderTextView({headerLevel: 3, text: "ely.flat Application Develop Console"}).getDocument());
        this.getDocument().append(this.__textArea.getDocument());
    }

    /**
     * Отображает данные в консоли
     * @param data
     */
    public print(...data: any[]): AppDevelopConsole {
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
    public error(...data: any[]): AppDevelopConsole {
        if (this.hidden()) this.hidden(false);
        const arr = ["<b>"];
        data.forEach(value => arr.push(value));
        arr.push("</b>");
        this.print(...arr);
        this.__lockConsole = true;
        return this;
    }

}
