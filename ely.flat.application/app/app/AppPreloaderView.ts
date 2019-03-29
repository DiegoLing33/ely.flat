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
 + Файл: AppPreloaderViews                                                +
 + Файл изменен: 15.02.2019 01:31:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Control from "../../controls/action/Control";
import IconView from "../../controls/text/IconView";
import TextView from "../../controls/text/TextView";
import PreloaderView from "../../controls/view/PreloaderView";

/**
 * Элемент отображения - экран загрузки приложения
 * @class AppPreloaderView
 * @augments {PreloaderView}
 */
export default class AppPreloaderView extends PreloaderView {

    /**
     * Панель объединения
     * @protected
     * @ignore
     */
    protected readonly __wrapperView: Control = new Control({
        element: document.getElementById("preloader")!
            .getElementsByClassName("--wrapper")[0]!,
    });

    /**
     * Иконка
     * @protected
     * @ignore
     */
    protected __iconView: IconView = new IconView({
        element: document.getElementById("preloader")!
            .getElementsByClassName("--wrapper")[0]!
            .getElementsByClassName("ef-icon")[0]!,
    });

    /**
     * Элемент отображения текста
     * @protected
     * @ignore
     */
    protected __titleTextView: TextView = new TextView({
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
