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
 + Файл: efAppPreloaderView.ts                                                +
 + Файл изменен: 15.02.2019 01:31:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {efIconView} from "@controls/text/efIconView";
import {efTextView} from "@controls/text/efTextView";
import {efPreloaderView} from "@controls/view/efPreloaderView";

/**
 * Элемент отображения - экран загрузки приложения
 * @class efAppPreloaderView
 * @augments {efPreloaderView}
 */
export class efAppPreloaderView extends efPreloaderView {

    /**
     * Панель объединения
     * @protected
     * @ignore
     */
    protected readonly __wrapperView: elyControl = new elyControl({
        element: document.getElementById("preloader")!
            .getElementsByClassName("--wrapper")[0]!,
    });

    /**
     * Иконка
     * @protected
     * @ignore
     */
    protected __iconView: efIconView = new efIconView({
        element: document.getElementById("preloader")!
            .getElementsByClassName("--wrapper")[0]!
            .getElementsByClassName("ef-icon")[0]!,
    });

    /**
     * Элемент отображения текста
     * @protected
     * @ignore
     */
    protected __titleTextView: efTextView = new efTextView({
        element: document.getElementById("preloader")!
            .getElementsByClassName("--wrapper")[0]!
            .getElementsByClassName("--title")[0]!,
    });

    /**
     * Конструктор
     */
    public constructor() {
        super({selector: "#preloader"});
        this.title("Пожалуйста, подождите...");
        this.fixedPosition(true);
        this.getIconView().iconName("refresh");
    }

}
