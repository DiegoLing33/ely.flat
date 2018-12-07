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
 + Файл: elyButtonOptions.ts                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";
import elyControlOptions from "@options/elyControlOptions";
import elyTextViewOptions from "@options/elyTextViewOptions";

/**
 * Опции кнопки
 * @interface elyButtonOptions
 */
export default interface elyButtonOptions extends elyControlOptions, elyTextViewOptions {
    /**
     * Обработчик нажатия
     */
    click?: () => void;

    /**
     * Размер кнопки {@link elyButton.size}
     */
    buttonSize?: elySize | string;

    /**
     * Стиль кнопки {@link elyButton.style}
     */
    buttonStyle?: elyStyle | string;

    /**
     * Устанавливает buttonSize в значение elySize.fill ({@link elySize.fill})
     */
    fill?: boolean;
}
