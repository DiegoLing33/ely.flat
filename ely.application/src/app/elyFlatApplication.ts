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
 + Файл: elyFlatApplication.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplicationPreloader from "@app/app/content/elyFlatApplicationPreloader";
import elyFlatApplicationLoader from "@app/app/elyFlatApplicationLoader";
import elyFlatApplicationConfig_Application from "@app/app/options/elyFlatApplication/app";
import elyFlatApplicationConfig_Navigation from "@app/app/options/elyFlatApplication/navigation";
import elyFlatApplicationConfig_Sideavigation from "@app/app/options/elyFlatApplication/sidenavigation";
import elyFlatApplicationConfig_Template from "@app/app/options/elyFlatApplication/template";
import elyFlatApplicationConfig_Template_Footer from "@app/app/options/elyFlatApplication/template/footer";
import elyFlatApplicationConfig from "@app/app/options/elyFlatApplicationConfig";
import elyFlatSideNavigationView from "@app/app/view/elyFlatSideNavigationView";
import elyFooterView from "@app/app/view/elyFooterView";
import elyHeaderView from "@app/app/view/elyHeaderView";
import elyNavigationView from "@app/app/view/elyNavigationView";
import elyScreenController from "@controllers/elyScreenController";
import elyControl from "@controls/action/elyControl";
import elyStylesheet from "@controls/elyStylesheet";
import elyIconView from "@controls/text/elyIconView";
import elyColor from "@core/elyColor";
import elyLogger from "@core/elyLogger";
import elyOneActionEval from "@core/elyOneActionEval";
import elyObservable from "@core/observable/elyObservable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyXLogger from "@core/utils/elyXLogger";

/**
 * Наблюдатель за завершением загрузки приложения
 * @callback elyApplicationReadyObserver
 * @param next - функиця продолжения
 *
 * В обработчик передается один аргумент next, который обязательно должен быть вызван.
 * В случае необходимости выброса исключения, в него может быть передано значение false.
 *
 *
 *     ely.app.ready( (next) => {
 *
 *         let appTest = true; // Тестирование приложения
 *         next(appTest);
 *
 *     });
 *
 *
 *
 * Обработчик принимает на вход один или два параметра:
 *
 * - `next(true);`
 * - `next(false);`
 * - `next(false, reason: string?);`
 *
 * Параметр reason является отображением сообщения ошибки для пользователя.
 */

type elyApplicationReadyObserver = (next: elyApplicationNextCompletion) => void;

/**
 * Обработчик завершения подготовки приложения
 */
type elyApplicationNextCompletion = (result: boolean, reason?: string) => void;

/**
 * Приложение
 */
export default class elyFlatApplication extends elyObservable {

    /**
     * Паттерн синглтон
     */
    public static default: elyFlatApplication = new elyFlatApplication();

    /**
     * Возвращает стандартный объект приложения
     * @param closure
     */
    public static loadApplication(closure: () => void): void {
        elyXLogger.default.log("Загрузка приложения...");
        if (!elyFlatApplication.default.getConfig()) {
            elyFlatApplicationLoader.loadApplicationConfiguration((config) => {
                elyFlatApplication.default.init(config);
            });
        }
    }

    /**
     * Тело страницы
     */
    public readonly bodyView: elyControl;

    /**
     * Заголовок
     */
    public readonly headerView: elyHeaderView;

    /**
     * Строитель макета
     */
    public readonly wrapperView: elyControl;

    /**
     * Контейнер
     */
    public readonly containerView: elyControl;

    /**
     * Контейнер
     */
    public readonly navigationView: elyNavigationView;

    /**
     * Контейнер
     */
    public readonly footerView: elyFooterView;

    /**
     * Контейнер
     */
    public readonly sideNavigationView: elyFlatSideNavigationView;

    /**
     * Загрузчик
     */
    public readonly preloader: elyFlatApplicationPreloader;

    /**
     * Конфигурация
     */
    protected config: elyFlatApplicationConfig | undefined;

    /**
     * Количество сигналов зугрузчиков
     */
    protected readySignalsShouldBeReceived: number;

    /**
     * Цвет приложения
     */
    protected applicationColorProperty: elyObservableProperty<elyColor>;

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.readySignalsShouldBeReceived = 0;
        this.applicationColorProperty = new elyObservableProperty<elyColor>();

        this.bodyView = new elyControl({element: document.body});
        this.headerView = new elyHeaderView();
        this.containerView = new elyControl({class: "ef-cntr"});
        this.wrapperView = new elyControl({class: "ef-wrp"});
        this.navigationView = new elyNavigationView();
        this.footerView = new elyFooterView();
        this.sideNavigationView = new elyFlatSideNavigationView();
        this.preloader = elyFlatApplicationPreloader.default;

        this.bodyView.addSubView(this.wrapperView);
        this.containerView.css({margin: "0 auto"});
        this.containerView.css({width: "100%"});
        this.wrapperView.addSubView(this.containerView);

        this.containerView.addSubView(elyScreenController.default.view);

        this.applicationColorProperty.change(value => {
            this.applyApplicationColor(value);
        });

        this.wrapperView.addObserver("click", () => {
            if (this.config!.sidenavigation!.enabled) {
                this.sideNavigationView.dismiss();
            }
        });

        this.bodyView.getDocument().onmousemove = (e: MouseEvent) => {
            if (e.pageX <= 20) {
                this.sideNavigationView.present();
            }
        };

    }

    /**
     * Возвращает конфигурацию приложения
     */
    public getConfig(): elyFlatApplicationConfig | undefined {
        return this.config;
    }

    /**
     * Добавляет слушатель окончания загрузки приложения
     * @param observer
     */
    public addReadyObserver(observer: elyApplicationReadyObserver): elyFlatApplication {
        this.readySignalsShouldBeReceived++;
        this.addObserver("ready", observer);
        return this;
    }

    /**
     * Возвращает цвет приложения
     */
    public applicationColor(): elyColor;

    /**
     * Устанавливает цвет приложения
     * @param color
     */
    public applicationColor(color: elyColor | string): elyFlatApplication;

    /**
     * Устанавливает или возвращает цвет приложения
     * @param color
     */
    public applicationColor(color?: elyColor | string): elyColor | elyFlatApplication {
        if (typeof color === "string") color = new elyColor({hex: color});
        return elyObservableProperty.simplePropertyAccess(this, color, this.applicationColorProperty);
    }

    /**
     * Изменяет цветовую гамму приложения
     * @param color
     */
    protected applyApplicationColor(color: elyColor): elyFlatApplication {
        const darker = color.getDarkerColor(0.1);
        const lighter = color.getLighterColor(0.18);
        elyStylesheet.global.addClass("bg-primary", {
            backgroundColor: color.toString(),
            color: color.isDarker() ? "white" : "black",
        });
        elyStylesheet.global.addClass("brd-primary", {
            borderColor: color.toString(),
        });

        elyStylesheet.global.addClass("text-primary", {
            color: color.toString(),
        });

        elyStylesheet.global.addClass("bg-info", {
            backgroundColor: lighter.toString(),
            color: lighter.isDarker() ? "white" : "black",
        });
        elyStylesheet.global.addClass("brd-info", {
            borderColor: lighter.toString(),
        });

        elyStylesheet.global.addClass("text-info", {
            color: lighter.toString(),
        });

        elyStylesheet.global.add("::-webkit-scrollbar-track", {
            borderColor: "#c2c2c2",
        });

        elyStylesheet.global.add("::-webkit-scrollbar", {
            borderColor: "#c2c2c2",
            width: "5px",
        });

        elyStylesheet.global.add("::-webkit-scrollbar-thumb", {
            backgroundColor: darker.toString(),
        });

        if (this.navigationView) this.navigationView.navigationBarColor(color);
        return this;
    }

    /**
     * Инициилизирует приложение
     * @param config
     */
    protected init(config: elyFlatApplicationConfig) {
        this.config = config;
        elyLogger.debug("Конфигураци:");
        elyLogger.debugObject(this.config);
        this.applyConfiguration(config);

        this.notificate("ready", [(flag: boolean, message?: string) => {
            elyLogger.debug(`---> Запуск загрузчика ${this.readySignalsShouldBeReceived}`);
            elyLogger.debug(`[~~] Загрузчик передал флаг ${flag ? "true" : "false"} (${message})`);
            if (!flag) {
                this.preloader.iconLabel
                    .removeClass("fa-refresh")
                    .addClass("fa-times")
                    .removeClass("fa-spin");
                this.preloader.messageView.text(message || "Загрузка была остановлена...");
                throw Error("Остановка приложения...");
                return;
            }
            this.readySignalsShouldBeReceived--;
            elyLogger.debug("[OK] Загрузчик обработан. Осталось: " + this.readySignalsShouldBeReceived);
            if (this.readySignalsShouldBeReceived === 0) {
                if (this.config!.app!.useContentController) {
                    __applyElyOneActions(this);
                }
                elyScreenController.default.present("index");
                this.preloader.hidden(true);
            }
        }]);
    }

    /**
     * Применяет конфигурацию
     * @param config
     */
    protected applyConfiguration(config: elyFlatApplicationConfig) {
        elyLogger.debug("~~~> Применение конфигурации");

        if (this.config!.app) setUpAppConfig(this, this.config!.app!);
        if (this.config!.navigation) setUpNavigationConfig(this, this.config!.navigation!);
        if (this.config!.template) setUpTemplateConfig(this, this.config!.template!);
        if (this.config!.sidenavigation) setUpSidebarConfig(this, this.config!.sidenavigation!);

        /**
         * Настраивает app секцию
         * @param application
         * @param app
         */
        function setUpAppConfig(application: elyFlatApplication, app: elyFlatApplicationConfig_Application) {
            if (app.title) application.headerView.title(app.title);
        }

        /**
         * Настраивает navigation секцию
         * @param app
         * @param navigation
         */
        function setUpNavigationConfig(app: elyFlatApplication, navigation: elyFlatApplicationConfig_Navigation) {
            app.navigationView.titleView.text(navigation.title).addObserver("click", () => {
                elyScreenController.default.present("index");
            });
            app.bodyView.addSubView(app.navigationView);
            if (navigation.items)
                navigation.items.forEach((value) => {
                    value.item = value.item || "elyLinkTextView";
                    app.navigationView.itemsView.add(elyControl.fromObject(value));
                });
            if (navigation.imageUrl) {
                app.navigationView.navigationBarImage(navigation.imageUrl);
                app.navigationView.imageView.addObserver("click", () => {
                    elyScreenController.default.present("index");
                });
            }
        }

        /**
         * Настраивает template секцию
         * @param app
         * @param template
         */
        function setUpTemplateConfig(app: elyFlatApplication, template: elyFlatApplicationConfig_Template) {

            if (template.maxContainerWidth) {
                app.containerView.getStyle().maxWidth = template.maxContainerWidth + "px";
            }

            if (template.color) {
                app.applicationColor(new elyColor({hex: template.color}));
            }
            if (template.footer) setUpTemplateFooterConfig(app, template.footer);

            /**
             * Настраивает template.footer секцию
             * @param app
             * @param footer
             */
            function setUpTemplateFooterConfig(app: elyFlatApplication,
                                               footer: elyFlatApplicationConfig_Template_Footer) {
                if (footer.title)
                    app.footerView.titleView.text(footer.title);
                if (footer.subtitle)
                    app.footerView.subtitleView.text(footer.subtitle);
            }
        }

        /**
         * Настраивает sidebar секцию
         * @param app
         * @param sidebar
         */
        function setUpSidebarConfig(app: elyFlatApplication, sidebar: elyFlatApplicationConfig_Sideavigation) {
            if (sidebar.enabled) {
                if (app.navigationView) {
                    const showButton = new elyControl({
                        class: "ef-sidenav-toggle",
                        subviews: [new elyIconView({iconName: "bars"})],
                    });
                    showButton.addObserver("click", () => {
                        app.sideNavigationView.toggle();
                    });
                    app.navigationView.addSubView(showButton);
                }

                app.sideNavigationView.apply();

                if (sidebar.allowMouseEvents)
                    app.sideNavigationView.applyMouseEvents();

                if (sidebar.items) {
                    for (const item of sidebar.items) {
                        if (item.line) {
                            app.sideNavigationView.listView.add(elyControl.line());
                        } else {
                            item.item = item.item || "elyLinkTextView";
                            app.sideNavigationView.listView.add(elyControl.fromObject(item));
                        }
                    }
                }
            }
        }

    }
}

function __applyElyOneActions(app: elyFlatApplication) {
    elyOneActionEval.default.actionsRules.content = (arg) => {
        switch (arg) {
            case "back":
                // cc.back();
                break;
            case "*index":
                elyScreenController.default.present("index");
                break;
            default:
                elyScreenController.default.present(arg);
        }
    };
}
