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

import elyGridView from "@controls/flex/elyGridView";
import elyView from "ely.core/src/controls/elyView";
import elyViewController from "./elyViewController";

/**
 * Контроллер с сеткой в основании
 */
export default class elyGridViewController extends elyViewController {

    /**
     * Элемент отображения
     */
    public readonly view: elyGridView & elyView;

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.view = new elyGridView();
    }
}
