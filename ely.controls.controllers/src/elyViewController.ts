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
 + Файл: elyViewController.ts                                                 +
 + Файл изменен: 30.11.2018 00:25:05                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyView from "ely.core/src/controls/elyView";
import elyObservable from "ely.core/src/observable/elyObservable";
import elyScreenController from "./elyScreenController";

/**
 * Контроллер элемента отображения
 */
export default class elyViewController extends elyObservable {

    /**
     * Текущий контроллер
     * @ignore
     */
    public static __thisControllers: string[] = [];

    /**
     * Элемент отображения
     */
    public readonly view: elyControl | elyView;

    /**
     * Конструктор
     */
    protected constructor() {
        super();
        this.view = elyControl.empty();
    }

    /**
     * Делегат окончания инициилизации объекта
     * @param screen - экран
     */
    public viewWillAppear(screen: elyScreenController): void {
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
