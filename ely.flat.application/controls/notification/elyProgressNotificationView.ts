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

import Size from "../../enums/Size";
import IconView from "../text/IconView";
import TextView from "../text/TextView";
import NotificationView, {NotificationViewOptions} from "./NotificationView";

/**
 * Опции
 */
interface elyProgressNotificationOptions extends NotificationViewOptions {
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
export default class elyProgressNotificationView extends NotificationView {

    /**
     * Коэффициент времени, необходимы для переключения строки
     */
    public static STRINGS_TIME: number = 3000;

    /**
     * Заголовок
     */
    public readonly progressTitleView: TextView;

    /**
     * Текст
     */
    public readonly textView: TextView;

    /**
     * Иконка
     */
    public readonly iconView: IconView;

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

        this.iconView          = new IconView({iconName: "refresh", iconSize: Size.xlarge, spinning: true});
        this.progressTitleView = new TextView({
            text: options.progressTitle || "Загрузка...", textSize: Size.custom(20),
        });
        this.textView          = new TextView({text: options.strings[0]});

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
