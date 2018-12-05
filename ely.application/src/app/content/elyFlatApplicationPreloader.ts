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
 + Файл: elyFlatApplicationPreloader.ts                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyXLogger from "@core/utils/elyXLogger";

export default class elyFlatApplicationPreloader extends elyView {

    /**
     * Стандартный загрузчик
     */
    public static readonly default: elyFlatApplicationPreloader = new elyFlatApplicationPreloader();

    /**
     * Элемент отображения сообщения
     */
    public readonly messageView: elyTextView;
    /**
     * Элемент отображения сообщения
     */
    public readonly iconLabel: elyTextView;

    /**
     * Конструктор
     */
    private constructor() {
        super({selector: ".eld"});

        this.iconLabel = new elyTextView({selector: ".efm"});

        const selector = document.querySelector(".elm");
        if (selector) {
            selector.innerHTML = "";
            this.messageView = new elyTextView({selector: ".elm"});
            this.messageView.text("Пожалуйста, подождите...");
        } else {
            this.messageView = new elyTextView({});
            elyXLogger.default.warning("Ошибка обработки экрана загрузки...");
        }
    }

    /**
     * Отображает сообщение
     * @param text
     */
    public showScreen(text: string): void {
        this.messageView.text(text);
        this.hidden(false);
    }

    /**
     * Скрывает сообщение
     */
    public hideScreen(): void {
        this.hidden(true);
    }
}
