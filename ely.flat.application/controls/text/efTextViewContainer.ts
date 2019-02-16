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
 + Файл: efTextViewContainer.ts                                               +
 + Файл изменен: 09.02.2019 16:15:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efTextView} from "@controls/text/efTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * элемент отображения контейнера с текстом
 * @class efTextViewContainer
 * @augments elyView
 */
export class efTextViewContainer extends elyView {

    /**
     * Элемент отображения текста
     * @protected
     * @ignore
     */
    protected readonly __textView: efTextView = new efTextView();

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyViewOptions = {}) {
        super(options);
        this.getDocument().append(this.getTextView().getDocument());
    }

    /**
     * Возвращает элемент отображения текста
     * @return {efTextView}
     */
    public getTextView(): efTextView {
        return this.__textView;
    }
}
