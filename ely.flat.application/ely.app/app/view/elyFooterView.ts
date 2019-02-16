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
 + Файл: elyFooterView.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyTextView from "@controls/text/elyTextView";

/**
 * Подвал приложения
 */
export default class elyFooterView extends elyControl {

    /**
     * Основной текст
     */
    public readonly titleView: elyTextView;

    /**
     * Дополнительный текст
     */
    public readonly subtitleView: elyTextView;

    /**s
     * Констуктор
     */
    constructor() {
        super({class: "ef-footer"});

        this.titleView = new elyTextView({class: "--title"});
        this.subtitleView = new elyTextView({class: "--sub-title"});
        this.addSubView(this.titleView);
        this.addSubView(this.subtitleView);
    }
}
