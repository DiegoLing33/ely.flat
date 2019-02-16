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
 + Файл: elyWorkspaceView.ts                                                  +
 + Файл изменен: 08.12.2018 03:43:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";

/**
 * Рабочая область для elyWSProjectLoader
 * @class elyWorkspaceView
 * @augments elyView
 */
@designable("content", elyDesignableFieldState.VIEW)
export default class elyWorkspaceView extends elyView {

    /**
     * Контент
     * @type {elyControl}
     */
    public readonly content: elyControl = new elyControl();

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: elyViewOptions = {}) {
        super(props);
        this.getDocument().append(this.content.getDocument());
    }
}
