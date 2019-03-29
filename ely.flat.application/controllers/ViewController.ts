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
 + Файл: ViewController                                                 +
 + Файл изменен: 30.11.2018 00:25:05                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Observable from "ely.core/dist/observable/Observable";
import Control from "../controls/action/Control";
import View from "../core/controls/View";
import ScreenController from "./ScreenController";

/**
 * Контроллер элемента отображения
 * @class ViewController
 * @augments Observable
 */
export default class ViewController extends Observable {

    /**
     * Текущий контроллер
     * @ignore
     */
    public static __thisControllers: string[] = [];

    /**
     * Элемент отображения
     * @type {Control}
     */
    public readonly view: Control | View = Control.empty();

    /**
     * Конструктор
     */
    protected constructor() {
        super();
    }

    /**
     * Делегат окончания инициилизации объекта
     * @param screen - экран
     */
    public viewWillAppear(screen: ScreenController): void {
        // Nothing is done
    }

    /**
     * Делегат окончания загрузки элемента
     */
    public viewDidLoad(): void {
        // Nothing is done
    }

    /**
     * Делегат окончания отображения элемента
     */
    public viewDidAppear(): void {
        // Nothing is done
    }
}
