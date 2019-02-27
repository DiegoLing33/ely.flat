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
 + Файл: Applications                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import AppColorManager from "@app/app/AppColorManager";
import AppFileWatcher from "@app/app/AppFileWatcher";
import AppPreloaderView from "@app/app/AppPreloaderView";
import elyFooterView from "@app/app/view/elyFooterView";
import AppStylesheet from "@app/AppStylesheet";
import AppConfig from "@app/config/AppConfig";
import AppDevelopConsole from "@app/develop/AppDevelopConsole";
import AppDocument from "@app/document/AppDocument";
import SingleApp from "@app/SingleApp";
import ScreenController from "@controllers/ScreenController";
import Control from "@controls/action/Control";
import NavigationView from "@controls/navigation/NavigationView";
import PreloaderView from "@controls/view/PreloaderView";
import DeviceDetector from "@core/DeviceDetector";
import elyOneActionEval from "@core/elyOneActionEval";
import Observable from "@core/observable/Observable";
import XLogger from "@core/utils/XLogger";

/**
 * Наблюдатель за завершением загрузки приложения
 * @callback elyApplicationReadyObserver
 * @param next - функиця продолжения
 *
 * В обработчик передается один аргумент next, который обязательно должен быть вызван.
 * В случае необходимости выброса исключения, в него может быть передано значение false.
 *
 *
 *     elyOnReady( (next) => {
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
export default class Application extends Observable {

    /**
     * Паттерн синглтон
     */
    public static default: Application = new Application();

    /**
     * Возвращает стандартный объект приложения
     * @param closure
     */
    public static loadApplication(closure: () => void): void {
        XLogger.default.log("Загрузка приложения...");
        AppConfig.default.addLoadedObserver((result, cfg) => {
            console.log(cfg);
            if (!result) XLogger.default.error("Файл конфигурации не найден. " +
                "Будет использована стандратная конфигурация.");
            else XLogger.default.log("Файл конфигурации успешно загружен.");

            // Распознание текущего устройства
            DeviceDetector.default.addDetectedObserver(() => Application.default.init(cfg));
            DeviceDetector.default.detect();
        });

        if (SingleApp.isUsesSingle()) {
            XLogger.default.log("Загрузка single версии приложения...");
            SingleApp.initApplication(vc => {
                SingleApp.applicationInitFunction(cfg => {
                    Application.default.addReadyObserver(next => {
                        SingleApp.applicationScreenController.addControllerName("index", vc);
                        next(true);
                    });
                    AppConfig.default.load({data: cfg});
                })(vc);
            });
        } else {
            XLogger.default.log("Загрузка конфигурации: " + AppConfig.appConfigPath);
            AppConfig.default.load({file: AppConfig.appConfigPath});
        }
    }

    /**
     * Менеджер цветов
     */
    public readonly applicationColorManager: AppColorManager;

    /**
     * Строитель макета
     */
    public readonly wrapperView: Control;

    /**
     * Контейнер
     */
    public readonly containerView: Control;

    /**
     * Контейнер
     */
    public readonly footerView: elyFooterView;

    /**
     * Панель навигации
     * @protected
     * @ignore
     */
    protected readonly __applicationNavigationView: NavigationView
        = new NavigationView({horizontal: true, fixed: true});

    /**
     * Документ
     * @protected
     * @ignore
     */
    protected readonly __applicationDocument: AppDocument = new AppDocument();

    /**
     * Экран загрузки
     * @protected
     * @ignore
     */
    protected readonly __applicationLoaderView: PreloaderView;

    /**
     * Конфигурация
     * @protected
     * @ignore
     */
    protected __applicationConfig: AppConfig | undefined;

    /**
     * Количество сигналов зугрузчиков
     */
    protected readySignalsShouldBeReceived: number;

    /**
     * Контроллер экранов
     * @protected
     * @ignore
     */
    protected readonly __applicationScreenController: ScreenController = new ScreenController();

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.__applicationLoaderView = new AppPreloaderView();
        this.applicationColorManager = new AppColorManager({app: this});
        this.readySignalsShouldBeReceived = 0;

        this.containerView = new Control({class: "ef--container"});
        this.wrapperView = new Control({class: "ef--wrapper"});
        this.footerView = new elyFooterView();

        this.getApplicationDocument().getBody().addSubView(this.wrapperView);
        this.containerView.css({margin: "0 auto"});
        this.containerView.css({width: "100%"});
        this.wrapperView.addSubView(this.containerView);

        this.containerView.addSubView(this.getApplicationScreenController().view);
        this.containerView.addSubView(this.footerView);

    }

    /**
     * Возвращает конфигурацию приложения
     */
    public getApplicationConfig(): AppConfig | undefined {
        return this.__applicationConfig;
    }

    /**
     * Добавляет слушатель окончания загрузки приложения
     * @param observer
     */
    public addReadyObserver(observer: elyApplicationReadyObserver): Application {
        this.readySignalsShouldBeReceived++;
        this.addObserver("ready", observer);
        return this;
    }

    /**
     * Возвращает элемент отображения экрана загрузки приложения
     * @return {PreloaderView}
     */
    public getApplicationLoaderView(): PreloaderView {
        return this.__applicationLoaderView;
    }

    /**
     * Возвращает документ приложения
     * @return {AppDocument}
     */
    public getApplicationDocument(): AppDocument {
        return this.__applicationDocument;
    }

    /**
     * Возвращает панель навигации
     * @return {NavigationView}
     */
    public getApplicationNavigationView(): NavigationView {
        return this.__applicationNavigationView;
    }

    /**
     * Возвращает контроллер экранов приложения
     * @return {ScreenController}
     */
    public getApplicationScreenController(): ScreenController {
        return this.__applicationScreenController;
    }

    /**
     * Инициилизирует приложение
     * @param {AppConfig} config
     */
    protected init(config: AppConfig) {
        this.__applicationConfig = config;
        this.applyConfiguration(config);
        this.notificate("ready", [(flag: boolean, message?: string) => {
            XLogger.default.log(`---> Запуск загрузчика ${this.readySignalsShouldBeReceived}`);
            XLogger.default.log(`[~~] Загрузчик передал флаг ${flag ? "true" : "false"} (${message})`);
            if (!flag) {
                this.getApplicationLoaderView().getIconView()
                    .iconName("times")
                    .spinning(false);
                this.getApplicationLoaderView().title(message || "Загрузка была остановлена...");
                throw Error("Остановка приложения...");
                return;
            }
            this.readySignalsShouldBeReceived--;
            XLogger.default.log("[OK] Загрузчик обработан. Осталось: " + this.readySignalsShouldBeReceived);
            if (this.readySignalsShouldBeReceived === 0) {
                if (this.getApplicationConfig()!.manifest.useContentController) {
                    __applyElyOneActions(this);
                }
                this.getApplicationScreenController().present("index");
                this.getApplicationLoaderView().hidden(true);
            }
        }]);
    }

    /**
     * Применяет конфигурацию
     * @param config
     */
    protected applyConfiguration(config: AppConfig) {
        XLogger.default.log("~~~> Применение конфигурации");

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
                    this.getApplicationScreenController().present(config.contentController.defaultContentId);
                });
            config.navigationBar.items.forEach(value => {
                value.item = value.item || "LinkTextView";
                this.getApplicationNavigationView().addView(Control.fromObject(value));
            });
            // if (config.navigationBar.imageUrl) {
            //     this.navigationView.navigationBarImage(config.navigationBar.imageUrl);
            //     if (config.manifest.useContentController)
            //         this.navigationView.imageView.addObserver("click", () => {
            //             ScreenController.default.present(config.contentController.defaultContentId);
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
            if (DeviceDetector.default.isIPhoneX() && DeviceDetector.default.isStandalone()) {
                AppStylesheet.global.addClass("ef-wrp", {paddingTop: "40px"});
                this.__applicationDocument.getBody().getStyle().minHeight =
                    DeviceDetector.default.getScreenSize().height() + "px";
                // todo Circular...
                // NotificationView.defaults.marginFromScreenEdge = 40;
                if (config.manifest.useNavigationBar)
                    Application.default.getApplicationNavigationView().css({"padding-top": "40px"});
            }
        }

        if (config.manifest.useDevelopMode) {
            AppDevelopConsole.shared.hidden(true);
            this.__applicationDocument.getBody().getDocument().append(AppDevelopConsole.shared.getDocument());
            window.onkeyup = ev => {
                if (ev.key === "~") AppDevelopConsole.shared.hidden(!AppDevelopConsole.shared.hidden());
            };
            new AppFileWatcher({filePath: config.develop.appFile || "js/index.js"}).start().addUpdateListener(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            });
        }
    }
}

function __applyElyOneActions(app: Application) {
    elyOneActionEval.default.actionsRules.content = (arg) => {
        switch (arg) {
            case "back":
                // cc.back();
                break;
            case "*index":
                app.getApplicationScreenController().present("index");
                break;
            default:
                app.getApplicationScreenController().present(arg);
        }
    };
}
