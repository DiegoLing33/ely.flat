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
 + Файл: efHeaderTextView.ts                                                  +
 + Файл изменен: 09.02.2019 15:19:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efTextView, efTextViewOptions} from "@controls/text/efTextView";

/**
 * Опции {@link efHeaderTextViewOptions}
 */
export interface efHeaderTextViewOptions extends efTextViewOptions {
    headerLevel?: number;
}

/**
 * Элемент отображения заголовка
 */
export class efHeaderTextView extends efTextView {

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: efHeaderTextViewOptions = {headerLevel: 1}) {
        super({tag: `h${options.headerLevel}`, ...options});
    }
}

/**
 * @typedef {efTextViewOptions} efHeaderTextViewOptions
 * @property {number} [headerLevel = 1]
 */
