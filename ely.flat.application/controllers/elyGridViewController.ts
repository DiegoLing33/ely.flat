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
 + Файл: elyGridViewController.ts                                             +
 + Файл изменен: 09.02.2019 18:42:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewController from "@controllers/elyViewController";
import {efGridLayoutView} from "@controls/layout/efGridLayoutView";
import elyView from "@core/controls/elyView";

/**
 * Контроллер с сеткой в основании
 * @class elyGridViewController
 * @augments {elyViewController}
 */
export default class elyGridViewController extends elyViewController {

    /**
     * Элемент отображения
     * @type {efGridLayoutView|elyView}
     */
    public readonly view: efGridLayoutView & elyView = new efGridLayoutView();

    /**
     * Конструктор
     */
    public constructor() {
        super();
    }
}