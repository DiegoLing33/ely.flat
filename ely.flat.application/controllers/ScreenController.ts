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
 + Файл: ScreenController                                               +
 + Файл изменен: 30.11.2018 00:19:28                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {XLogger} from "ely.core";
import Observable from "ely.core/dist/observable/Observable";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import Control from "../controls/action/Control";
import SimplePageViewController from "./SimplePageViewController";
import ViewController from "./ViewController";

class __elyScreenIndexViewController extends SimplePageViewController {

    /**
     * После загрущки
     *
     * + В данном методе рекомендуется выполнять отрисовку, а также программную логику
     *   контроллера элемента отображения.
     */
    public viewDidLoad() {
        super.viewDidLoad();

        this.title("ely.Flat *{* Application *}*");
        this.description("Приложение разработано на основе ely.flat framework");
    }
}

/**
 * Контроллер экрана
 * @class ScreenController
 * @augments Observable
 */
export default class ScreenController extends Observable {

    /**
     * Контроллер
     */
    public controller: ObservableProperty<ViewController> = new ObservableProperty<ViewController>();

    /**
     * Элемент отображения
     */
    public readonly view: Control = new Control({class: "ef-screen"});

    /**
     * Элементы контента
     */
    protected readonly items: { [id: string]: { controller: ViewController, canOverwrite: boolean } } = {};

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.present(new __elyScreenIndexViewController());
        this.elyScreenControllerDidInit();
    }

    /**
     * Делегат завершения инициилизации контроллера
     */
    public elyScreenControllerDidInit(): void {
        this.notificate("didInit");
    }

    /**
     * Отображает элемент
     * @param controller
     * @param completion
     */
    public present(controller: ViewController | string, completion?: () => void): void {
        if (typeof controller === "string") {
            XLogger.default.log(`[ScreenController]: Отображение контроллера id:${controller}`);
            if (this.items.hasOwnProperty(controller))
                this.present(this.items[controller].controller, completion);
        } else {
            this.view.fadeOut(() => {
                this.controller.set(controller);
                if (ViewController.__thisControllers.indexOf(controller.constructor.name) === -1) {
                    ViewController.__thisControllers.push(controller.constructor.name);
                    controller.viewDidLoad();
                }
                controller.viewWillAppear(this);
                this.view.removeViewContent();
                this.view.addSubView(controller.view);
                this.view.fadeIn(() => {
                    controller.viewDidAppear();
                    if (completion) completion();
                });

            });
        }
    }

    /**
     * Добавляет контроллер в навигацию
     * @param name
     * @param controller
     * @param canOverwrite
     */
    public addControllerName(name: string, controller: ViewController, canOverwrite: boolean = false): void {
        XLogger.default.log(`[ScreenController]: Добавлен контроллер: ${name} (${controller.constructor.name})`);
        if (this.items.hasOwnProperty(name)) {
            if (!this.items[name].canOverwrite) return;
            this.items[name].controller = controller;
            this.items[name].canOverwrite = canOverwrite;
        }
        this.items[name] = {controller, canOverwrite};
    }
}
