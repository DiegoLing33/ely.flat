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
 + Файл: efContainerView.ts                                                   +
 + Файл изменен: 09.02.2019 19:10:18                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * Элемент отображения контейнер с элементом
 * @class efContainerView
 * @template T
 * @augments elyView
 */
export class efContainerView<T extends elyView> extends elyView {

    /**
     * Элемент отображения
     * @protected
     * @ignore
     */
    protected readonly __theView: T | any;

    /**
     * Конструктор
     * @param {T} view
     * @param options
     */
    public constructor(view: T, options: elyViewOptions = {}) {
        super(options);

        /**
         * Элемент отображения
         * @protected
         * @ignore
         */
        this.__theView = view;
        this.getDocument().append(view.getDocument());
    }

    /**
     * Возвращает содержимое контейнера
     * @return {T}
     */
    public getView(): T {
        return this.__theView;
    }

}
