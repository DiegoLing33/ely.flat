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

import SimplePageViewController from "@controllers/SimplePageViewController";
import ViewController from "@controllers/ViewController";
import Control from "@controls/action/Control";
import Observable from "@core/observable/Observable";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

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
        if (this.items.hasOwnProperty(name)) {
            if (!this.items[name].canOverwrite) return;
            this.items[name].controller = controller;
            this.items[name].canOverwrite = canOverwrite;
        }
        this.items[name] = {controller, canOverwrite};
    }
}