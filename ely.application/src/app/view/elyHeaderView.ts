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
 + Файл: elyHeaderView.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyStylesheet from "@controls/elyStylesheet";

/**
 * Отображение заголовка
 */
export default class elyHeaderView extends elyView {

    /**
     * Заголовок
     */
    private readonly titleElement: HTMLElement;

    /**
     * Конструктор
     */
    public constructor() {
        super({element: document.head});
        this.titleElement = document.getElementsByTagName("title")[0];
        this.getDocument().append(this.titleElement);
        this.getDocument().append(elyStylesheet.global.getDocument());
    }

    /**
     * устанавливает заголовок
     * @param value
     */
    public title(value?: string): elyHeaderView | string {
        if (value === undefined) return this.titleElement.innerText;
        this.titleElement.innerText = value;
        return this;
    }
}
