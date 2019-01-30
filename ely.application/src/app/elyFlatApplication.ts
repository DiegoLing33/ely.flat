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
import efAppColorManager from "@app/app/efAppColorManager";
import elyFlatApplicationConfig from "@app/app/options/elyFlatApplicationConfig";
import elyFlatSideNavigationView from "@app/app/view/elyFlatSideNavigationView";
import elyFooterView from "@app/app/view/elyFooterView";
import elyNavigationView from "@app/app/view/elyNavigationView";
import efAppConfig from "@app/config/efAppConfig";
import efAppDocument from "@app/document/efAppDocument";
import elyScreenController from "@controllers/elyScreenController";
import elyControl from "@controls/action/elyControl";
import elyIconView from "@controls/text/elyIconView";
import elyLogger from "@core/elyLogger";
import elyOneActionEval from "@core/elyOneActionEval";
import elyObservable from "@core/observable/elyObservable";
import elyXLogger from "@core/utils/elyXLogger";
import elyDeviceDetector from "@core/elyDeviceDetector";
import elyStylesheet from "@controls/elyStylesheet";
import elyNotificationView from "@controls/notification/elyNotificationView";

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
        efAppConfig.default.addLoadedObserver((result, cfg) => {
            console.log(cfg);
            if (!result) elyXLogger.default.error("Файл конфигурации не найден. " +
                "Будет использована стандратная конфигурация.");
            else elyXLogger.default.log("Файл конфигурации успешно загружен.");

            // Распознание текущего устройства
            elyDeviceDetector.default.addDetectedObserver(() => elyFlatApplication.default.init(cfg));
            elyDeviceDetector.default.detect();
        });
        efAppConfig.default.load({file: efAppConfig.appConfigPath});
    }

    /**
     * Менеджер цветов
     */
    public readonly applicationColorManager: efAppColorManager;

    /**
     * Тело страницы
     */
    public readonly bodyView: elyControl;

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
     * Документ
     */
    public readonly applicationDocument: efAppDocument = new efAppDocument();

    /**
     * Конфигурация
     */
    protected config: efAppConfig | undefined;

    /**
     * Количество сигналов зугрузчиков
     */
    protected readySignalsShouldBeReceived: number;

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.applicationColorManager = new efAppColorManager({app: this});
        this.readySignalsShouldBeReceived = 0;

        this.bodyView = new elyControl({element: document.body});
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

        this.wrapperView.addObserver("click", () => {
            if (this.config!.isSideNavigationBarUsed()) this.sideNavigationView.dismiss();
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
     * Инициилизирует приложение
     * @param {efAppConfig} config
     */
    protected init(config: efAppConfig) {
        this.config = config;
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
                if (this.config!.manifest.useContentController) {
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
    protected applyConfiguration(config: efAppConfig) {
        elyXLogger.default.log("~~~> Применение конфигурации");

        //
        // App
        //
        this.applicationDocument.head.title(config.getAppTitle());

        //
        // Manifest
        //

        //
        //  Template
        //
        this.containerView.getStyle().maxWidth = typeof config.template.maxContainerWidth === "number" ?
            config.template.maxContainerWidth + "px" : config.template.maxContainerWidth;
        this.applicationColorManager.applyApplicationColor(config.getAppColor());
        this.footerView.titleView.text(config.template.footer.title);
        this.footerView.subtitleView.text(config.template.footer.subtitle);

        //
        //  Navigation config
        //
        if (config.isNavigationBarUsed()) {
            this.bodyView.addSubView(this.navigationView);
            this.navigationView.titleView.text(config.navigationBar.title);
            if (config.manifest.useContentController)
                this.navigationView.titleView.addObserver("click", () => {
                    elyScreenController.default.present(config.contentController.defaultContentId);
                });
            config.navigationBar.items.forEach(value => {
                value.item = value.item || "elyLinkTextView";
                this.navigationView.itemsView.add(elyControl.fromObject(value));
            });
            if (config.navigationBar.imageUrl) {
                this.navigationView.navigationBarImage(config.navigationBar.imageUrl);
                if (config.manifest.useContentController)
                    this.navigationView.imageView.addObserver("click", () => {
                        elyScreenController.default.present(config.contentController.defaultContentId);
                    });
            }
            this.applicationColorManager.applyNavigationBarColor(config.getNavigationBarColor());
        }

        //
        //  Side Navigation config
        //
        if (config.isSideNavigationBarUsed()) {
            if (config.isNavigationBarUsed()) {
                const showButton = new elyControl({
                    class: "ef-sidenav-toggle",
                    subviews: [new elyIconView({iconName: "bars"})],
                });
                showButton.addObserver("click", () => {
                    this.sideNavigationView.toggle();
                });
                this.navigationView.addSubView(showButton);
            }
            this.sideNavigationView.apply();
            if (config.sideNavigationBar.allowMouseEvents)
                this.sideNavigationView.applyMouseEvents();
            config.sideNavigationBar.items.forEach(value => {
                value.item = value.item || "elyLinkTextView";
                this.sideNavigationView.listView.add(elyControl.fromObject(value));
            });
        }

        //
        // Meta
        //
        if (config.manifest.useMeta) {
            this.applicationDocument.head.setCharset(config.meta.charset);
            this.applicationDocument.head.addMetaValue({name: "apple-mobile-web-app-title", content: config.app.title});
            this.applicationDocument.head.addMetaValue({
                content: config.meta.appleMobile.statusBarStyle,
                name: "apple-mobile-web-app-status-bar-style",
            });
            this.applicationDocument.head.addMetaValue({
                content: config.manifest.allowStandaloneMode ? "yes" : "no",
                name: "apple-mobile-web-app-capable",
            });
            this.applicationDocument.head.addMetaValue({
                content: config.getNavigationBarColorString(),
                name: "theme-color",
            });
        }
        if (config.manifest.useViewPort) this.applicationDocument.head.addViewPort(config.meta.viewport);
        if (config.manifest.useApplicationIcon) {
            this.applicationDocument.head.addLink({
                href: config.meta.iconPath + "/apple-touch-icon.png",
                rel: "apple-touch-icon",
                sizes: "180x180",
            });
            this.applicationDocument.head.addLink({
                href: config.meta.iconPath + "/favicon-32x32.png",
                rel: "icon",
                sizes: "32x32",
                type: "image/png",
            });
            this.applicationDocument.head.addLink({
                href: config.meta.iconPath + "/favicon-16x16.png",
                rel: "icon",
                sizes: "16x16",
                type: "image/png",
            });
            this.applicationDocument.head.addLink({
                href: config.meta.iconPath + "/favicon.ico",
                rel: "shortcut icon",
            });
            this.applicationDocument.head.addLink({
                color: config.getNavigationBarColorString(),
                href: config.meta.iconPath + "/safari-pinned-tab.svg",
                rel: "mask-icon",
            });
        }
        if (config.manifest.allowStandaloneMode && config.manifest.useIPhoneXStandaloneFix) {
            if (elyDeviceDetector.default.isIPhoneX() && elyDeviceDetector.default.isStandalone()) {
                elyStylesheet.global.addClass("ef-sidenav-toggle", {paddingTop: "30px"});
                elyStylesheet.global.addClass("ef-wrp", {paddingTop: "40px"});
                elyStylesheet.global.addClass("ef-sidenav-title", {paddingTop: "60px"});
                this.bodyView.getStyle().minHeight = elyDeviceDetector.default.getScreenSize().height() + "px";
                elyNotificationView.defaults.marginFromScreenEdge = 40;
                if (config.manifest.useNavigationBar)
                    elyFlatApplication.default.navigationView.css({"padding-top": "40px"});
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
