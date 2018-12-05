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
 + Файл: elyProgressNotificationView.ts                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elySize from "../enums/elySize";
import elyNotificationOptions from "../options/elyNotificationOptions";
import elyIconView from "../text/elyIconView";
import elyTextView from "../text/elyTextView";
import elyNotificationView from "./elyNotificationView";

/**
 * Опции
 */
interface elyProgressNotificationOptions extends elyNotificationOptions {
    /**
     * Отображаемые сообщения
     */
    strings?: string[];

    /**
     * Заголовок процесса
     */
    progressTitle?: string;
}

/**
 * Шаблон прогресса
 */
export default class elyProgressNotificationView extends elyNotificationView {

    /**
     * Коэффициент времени, необходимы для переключения строки
     */
    public static STRINGS_TIME: number = 3000;

    /**
     * Заголовок
     */
    public readonly progressTitleView: elyTextView;

    /**
     * Текст
     */
    public readonly textView: elyTextView;

    /**
     * Иконка
     */
    public readonly iconView: elyIconView;

    /**
     * Индексация строки
     * @ignore
     */
    private __currentStringIndex: number = 1;

    /**
     * Конструктор
     * @param options
     */
    constructor(options: elyProgressNotificationOptions = {}) {
        super(options);

        if (!options.strings || options.strings.length === 0)
            options.strings = ["Пожалуйста, полождите..."];

        this.iconView          = new elyIconView({iconName: "refresh", iconSize: 60, iconSpinning: true});
        this.progressTitleView = new elyTextView({
            text: options.progressTitle || "Загрузка...", textSize: elySize.middle,
        });
        this.textView          = new elyTextView({text: options.strings[0]});

        const timer = setInterval(() => {
            if (this.__currentStringIndex === options.strings!.length) {
                clearInterval(timer);
                return;
            }
            this.textView.fadeOut(() => {
                this.textView.text(options.strings![this.__currentStringIndex]);
                this.textView.fadeIn();
                this.__currentStringIndex++;
            });
        }, elyProgressNotificationView.STRINGS_TIME * this.__currentStringIndex);

        this.closable(false);
        this.contentView.getStyle().textAlign = "center";
        this.contentView.addSubView(this.iconView);
        this.contentView.addSubView(this.progressTitleView);
        this.contentView.addSubView(this.textView);
    }

    /**
     * Устанавливает заголовок загрузки
     * @param text
     */
    public progressTitle(text: string): elyProgressNotificationView {
        this.progressTitleView.text(text);
        return this;
    }
}
