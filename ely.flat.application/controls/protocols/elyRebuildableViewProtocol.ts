/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyRebuildableViewProtocol.ts                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import View, {ViewOptions} from "../../core/controls/View";

/**
 * Элемент, который может быть перестроен
 * @class elyRebuildableViewProtocol
 * @augments {View}
 */
export default abstract class elyRebuildableViewProtocol extends View {

    /**
     * Флаг перестроения
     * @ignore
     */
    protected __denyRebuild: boolean;

    /**
     * Конструктор
     * @param options
     */
    protected constructor(options: ViewOptions) {
        super(options);
        this.__denyRebuild = false;
    }

    /**
     * Запрещает или отменяет запрет перестроения
     * @param deny
     */
    public denyRebuild(deny: boolean): elyRebuildableViewProtocol | any {
        this.__denyRebuild = deny;
        return this;
    }

    /**
     * Выполняет перестроени элемента
     */
    public rebuild(): elyRebuildableViewProtocol | any {
        if (!this.__denyRebuild) this.__rebuild();
        this.notificate("rebuilt");
        return this;
    }

    /**
     * Добавляет наблюдатель: элемент был перестроен
     *
     * Имя обсервера: rebuilt
     *
     * @param o - наблюдатель
     */
    public addRebuiltObserver(o: () => void): elyRebuildableViewProtocol | any {
        this.addObserver("rebuilt", o);
        return this;
    }

    /**
     * Выполняет перестроение элемента
     *
     * Метод для переопределения реализации престроения
     * @private
     * @ignore
     */
    protected abstract __rebuild(): elyRebuildableViewProtocol | any;
}
