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
 + Файл: ContainerViews.ts                                                    +
 + Файл изменен: 09.02.2019 19:10:18                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


import View, {ViewOptions} from "../../core/controls/View";

/**
 * Элемент отображения контейнер с элементом
 * @class ContainerView
 * @template T
 * @augments View
 */
export default class ContainerView<T extends View> extends View {

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
    public constructor(view: T, options: ViewOptions = {}) {
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
