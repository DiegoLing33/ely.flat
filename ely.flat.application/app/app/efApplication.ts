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
 + Файл: efApplication.ts                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efAppColorManager from "@app/app/efAppColorManager";
import {efAppPreloaderView} from "@app/app/efAppPreloaderView";
import elyFooterView from "@app/app/view/elyFooterView";
import efAppConfig from "@app/config/efAppConfig";
import {efAppDevelopConsole} from "@app/develop/efAppDevelopConsole";
import efAppDocument from "@app/document/efAppDocument";
import elyScreenController from "@controllers/elyScreenController";
import elyControl from "@controls/action/elyControl";
import elyStylesheet from "@controls/elyStylesheet";
import {efNavigationView} from "@controls/navigation/efNavigationView";
import {efNotificationView} from "@controls/notification/efNotificationView";
import {efPreloaderView} from "@controls/view/efPreloaderView";
import elyDeviceDetector from "@core/elyDeviceDetector";
import elyOneActionEval from "@core/elyOneActionEval";
import elyObservable from "@core/observable/elyObservable";
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
export default class efApplication extends elyObservable {

    /**
     * Паттерн синглтон
     */
    public static default: efApplication = new efApplication();

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
            elyDeviceDetector.default.addDetectedObserver(() => efApplication.default.init(cfg));
            elyDeviceDetector.default.detect();
        });
        efAppConfig.default.load({file: efAppConfig.appConfigPath});
    }

    /**
     * Менеджер цветов
     */
    public readonly applicationColorManager: efAppColorManager;

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
    public readonly footerView: elyFooterView;

    /**
     * Панель навигации
     * @protected
     * @ignore
     */
    protected readonly __applicationNavigationView: efNavigationView
        = new efNavigationView({horizontal: true, fixed: true});

    /**
     * Документ
     * @protected
     * @ignore
     */
    protected readonly __applicationDocument: efAppDocument = new efAppDocument();

    /**
     * Экран загрузки
     * @protected
     * @ignore
     */
    protected readonly __applicationLoaderView: efPreloaderView;

    /**
     * Конфигурация
     * @protected
     * @ignore
     */
    protected __applicationConfig: efAppConfig | undefined;

    /**
     * Количество сигналов зугрузчиков
     */
    protected readySignalsShouldBeReceived: number;

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.__applicationLoaderView = new efAppPreloaderView();
        this.applicationColorManager = new efAppColorManager({app: this});
        this.readySignalsShouldBeReceived = 0;

        this.containerView = new elyControl({class: "ef--container"});
        this.wrapperView = new elyControl({class: "ef--wrapper"});
        this.footerView = new elyFooterView();

        this.getApplicationDocument().getBody().addSubView(this.wrapperView);
        this.containerView.css({margin: "0 auto"});
        this.containerView.css({width: "100%"});
        this.wrapperView.addSubView(this.containerView);

        this.containerView.addSubView(elyScreenController.default.view);

    }

    /**
     * Возвращает конфигурацию приложения
     */
    public getApplicationConfig(): efAppConfig | undefined {
        return this.__applicationConfig;
    }

    /**
     * Добавляет слушатель окончания загрузки приложения
     * @param observer
     */
    public addReadyObserver(observer: elyApplicationReadyObserver): efApplication {
        this.readySignalsShouldBeReceived++;
        this.addObserver("ready", observer);
        return this;
    }

    /**
     * Возвращает элемент отображения экрана загрузки приложения
     * @return {efPreloaderView}
     */
    public getApplicationLoaderView(): efPreloaderView {
        return this.__applicationLoaderView;
    }

    /**
     * Возвращает документ приложения
     * @return {efAppDocument}
     */
    public getApplicationDocument(): efAppDocument {
        return this.__applicationDocument;
    }

    /**
     * Возвращает панель навигации
     * @return {efNavigationView}
     */
    public getApplicationNavigationView(): efNavigationView {
        return this.__applicationNavigationView;
    }

    /**
     * Инициилизирует приложение
     * @param {efAppConfig} config
     */
    protected init(config: efAppConfig) {
        this.__applicationConfig = config;
        this.applyConfiguration(config);

        this.notificate("ready", [(flag: boolean, message?: string) => {
            elyXLogger.default.log(`---> Запуск загрузчика ${this.readySignalsShouldBeReceived}`);
            elyXLogger.default.log(`[~~] Загрузчик передал флаг ${flag ? "true" : "false"} (${message})`);
            if (!flag) {
                this.getApplicationLoaderView().getIconView()
                    .iconName("times")
                    .spinning(false);
                this.getApplicationLoaderView().title(message || "Загрузка была остановлена...");
                throw Error("Остановка приложения...");
                return;
            }
            this.readySignalsShouldBeReceived--;
            elyXLogger.default.log("[OK] Загрузчик обработан. Осталось: " + this.readySignalsShouldBeReceived);
            if (this.readySignalsShouldBeReceived === 0) {
                if (this.getApplicationConfig()!.manifest.useContentController) {
                    __applyElyOneActions(this);
                }
                elyScreenController.default.present("index");
                this.getApplicationLoaderView().hidden(true);
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
        this.getApplicationDocument().getHead().title(config.getAppTitle());

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
            this.wrapperView.addClass("--with-fixed-nav");
            this.__applicationDocument.getBody().addSubView(this.getApplicationNavigationView());
            this.getApplicationNavigationView().getTitleView().text(config.navigationBar.title);
            if (config.manifest.useContentController)
                this.getApplicationNavigationView().getTitleView().addObserver("click", () => {
                    elyScreenController.default.present(config.contentController.defaultContentId);
                });
            config.navigationBar.items.forEach(value => {
                value.item = value.item || "efLinkTextView";
                this.getApplicationNavigationView().addView(elyControl.fromObject(value));
            });
            // if (config.navigationBar.imageUrl) {
            //     this.navigationView.navigationBarImage(config.navigationBar.imageUrl);
            //     if (config.manifest.useContentController)
            //         this.navigationView.imageView.addObserver("click", () => {
            //             elyScreenController.default.present(config.contentController.defaultContentId);
            //         });
            // }
            this.applicationColorManager.applyNavigationBarColor(config.getNavigationBarColor());
        }

        //
        // Meta
        //
        if (config.manifest.useMeta) {
            const head = this.getApplicationDocument().getHead();
            head.setCharset(config.meta.charset)
                .addMetaValue({
                    content: config.app.title,
                    name: "apple-mobile-web-app-title",
                })
                .addMetaValue({
                    content: config.meta.appleMobile.statusBarStyle,
                    name: "apple-mobile-web-app-status-bar-style",
                })
                .addMetaValue({
                    content: config.manifest.allowStandaloneMode ? "yes" : "no",
                    name: "apple-mobile-web-app-capable",
                }).addMetaValue({
                content: config.getNavigationBarColorString(),
                name: "theme-color",
            });
        }
        if (config.manifest.useViewPort) this.getApplicationDocument().getHead().addViewPort(config.meta.viewport);
        if (config.manifest.useApplicationIcon) {
            this.getApplicationDocument().getHead()
                .addLink({
                    href: config.meta.iconPath + "/apple-touch-icon.png",
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                }).addLink({
                href: config.meta.iconPath + "/favicon-32x32.png",
                rel: "icon",
                sizes: "32x32",
                type: "image/png",
            }).addLink({
                href: config.meta.iconPath + "/favicon-16x16.png",
                rel: "icon",
                sizes: "16x16",
                type: "image/png",
            }).addLink({
                href: config.meta.iconPath + "/favicon.ico",
                rel: "shortcut icon",
            }).addLink({
                color: config.getNavigationBarColorString(),
                href: config.meta.iconPath + "/safari-pinned-tab.svg",
                rel: "mask-icon",
            });
        }
        if (config.manifest.allowStandaloneMode && config.manifest.useIPhoneXStandaloneFix) {
            if (elyDeviceDetector.default.isIPhoneX() && elyDeviceDetector.default.isStandalone()) {
                elyStylesheet.global.addClass("ef-wrp", {paddingTop: "40px"});
                this.__applicationDocument.getBody().getStyle().minHeight =
                    elyDeviceDetector.default.getScreenSize().height() + "px";
                efNotificationView.defaults.marginFromScreenEdge = 40;
                if (config.manifest.useNavigationBar)
                    efApplication.default.getApplicationNavigationView().css({"padding-top": "40px"});
            }
        }

        if (config.manifest.useDevelopMode) {
            efAppDevelopConsole.shared.hidden(true);
            this.__applicationDocument.getBody().getDocument().append(efAppDevelopConsole.shared.getDocument());
            window.onkeyup = ev => {
                if (ev.key === "~") efAppDevelopConsole.shared.hidden(!efAppDevelopConsole.shared.hidden());
            };
        }
    }
}

function __applyElyOneActions(app: efApplication) {
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
