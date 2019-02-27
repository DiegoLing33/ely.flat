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

import Control from "@controls/action/Control";
import TextView from "@controls/text/TextView";

/**
 * Подвал приложения
 * @deprecated
 */
export default class elyFooterView extends Control {

    /**
     * Основной текст
     */
    public readonly titleView: TextView;

    /**
     * Дополнительный текст
     */
    public readonly subtitleView: TextView;

    /**s
     * Констуктор
     */
    constructor() {
        super({class: "ef-footer"});

        this.titleView = new TextView({class: "--title"});
        this.subtitleView = new TextView({class: "--sub-title"});
        this.addSubView(this.titleView);
        this.addSubView(this.subtitleView);
    }
}
