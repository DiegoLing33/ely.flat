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
 + Проект: ely.flat.application                                               +
 +                                                                            +
 + Файл: elyGridViewController.ts                                             +
 + Файл изменен: 30.11.2018 01:48:16                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewController from "@controllers/elyViewController";
import elyGridView from "@controls/flex/elyGridView";
import elyView from "@core/controls/elyView";

/**
 * Контроллер с сеткой в основании
 * @class elyGridViewController
 * @augments {elyViewController}
 */
export default class elyGridViewController extends elyViewController {

    /**
     * Элемент отображения
     * @type {elyGridView|elyView}
     */
    public readonly view: elyGridView & elyView = new elyGridView();

    /**
     * Конструктор
     */
    public constructor() {
        super();
    }
}
