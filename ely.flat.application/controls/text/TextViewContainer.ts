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
 + Файл: TextViewContainer.ts                                             +
 + Файл изменен: 09.02.2019 16:15:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import View, {ViewOptions} from "../../core/controls/View";
import TextView from "./TextView";

/**
 * элемент отображения контейнера с текстом
 * @class TextViewContainer
 * @augments View
 */
export default class TextViewContainer extends View {

    /**
     * Элемент отображения текста
     * @protected
     * @ignore
     */
    protected readonly __textView: TextView = new TextView();

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: ViewOptions = {}) {
        super(options);
        this.getDocument().append(this.getTextView().getDocument());
    }

    /**
     * Возвращает элемент отображения текста
     * @return {TextView}
     */
    public getTextView(): TextView {
        return this.__textView;
    }
}
