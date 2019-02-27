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
 + Файл: HeaderTextView.ts                                                +
 + Файл изменен: 09.02.2019 15:19:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import TextView, {TextViewOptions} from "@controls/text/TextView";

/**
 * Опции {@link HeaderTextViewOptions}
 */
export interface HeaderTextViewOptions extends TextViewOptions {
    headerLevel?: number;
}

/**
 * Элемент отображения заголовка
 */
export default class HeaderTextView extends TextView {

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: HeaderTextViewOptions = {headerLevel: 1}) {
        super({tag: `h${options.headerLevel}`, ...options});
    }
}

/**
 * @typedef {TextViewOptions} HeaderTextViewOptions
 * @property {number} [headerLevel = 1]
 */
