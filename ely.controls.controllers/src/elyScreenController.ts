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
 + Файл: elyScreenController.ts                                               +
 + Файл изменен: 30.11.2018 00:19:28                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplication from "@app/app/elyFlatApplication";
import elySimplePageViewController from "@controllers/elySimplePageViewController";
import elyViewController from "@controllers/elyViewController";
import elyControl from "@controls/action/elyControl";
import elyObservable from "@core/observable/elyObservable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

class __elyScreenIndexViewController extends elySimplePageViewController {

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
 * @class elyScreenController
 * @augments elyObservable
 */
export default class elyScreenController extends elyObservable {

    /**
     * Стандартный контроллер экрана
     */
    public static readonly default: elyScreenController = new elyScreenController();

    /**
     * Контроллер
     */
    public controller: elyObservableProperty<elyViewController> = new elyObservableProperty<elyViewController>();

    /**
     * Элемент отображения
     */
    public readonly view: elyControl = new elyControl({class: "ef-screen"});

    /**
     * Элементы контента
     */
    protected readonly items: { [id: string]: { controller: elyViewController, canOverwrite: boolean } } = {};

    /**
     * Конструктор
     */
    protected constructor() {
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
    public present(controller: elyViewController | string, completion?: () => void): void {
        if (typeof controller === "string") {
            if (this.items.hasOwnProperty(controller))
                this.present(this.items[controller].controller, completion);
        } else {
            this.view.fadeOut(() => {
                this.controller.set(controller);
                if (elyViewController.__thisControllers.indexOf(controller.constructor.name) === -1) {
                    elyViewController.__thisControllers.push(controller.constructor.name);
                    controller.viewDidLoad();
                }
                controller.viewWillAppear(this);
                this.view.removeViewContent();
                this.view.addSubView(controller.view);
                this.view.addSubView(elyFlatApplication.default.footerView);
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
    public addControllerName(name: string, controller: elyViewController, canOverwrite: boolean = false): void {
        if (this.items.hasOwnProperty(name)) {
            if (!this.items[name].canOverwrite) return;
            this.items[name].controller = controller;
            this.items[name].canOverwrite = canOverwrite;
        }
        this.items[name] = {controller, canOverwrite};
    }
}
