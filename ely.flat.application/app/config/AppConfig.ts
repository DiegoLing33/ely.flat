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
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: AppConfig.ts                                                     +
 + Файл изменен: 30.01.2019 00:57:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Color, Guard, Utils, Web, XLogger} from "ely.core";
import Observable from "ely.core/dist/observable/Observable";
import {
    AppConfigInterface,
    ConfigSection_app,
    ConfigSection_contentController, ConfigSection_develop,
    ConfigSection_manifest,
    ConfigSection_meta,
    ConfigSection_navigationBar,
    ConfigSection_sideNavigationBar,
    ConfigSection_template,
} from "./AppConfigSections";

/**
 * Конфигурация приложения
 * @class AppConfig
 * @augments {Observable}
 * @augments {AppConfigInterface}
 */
export default class AppConfig extends Observable implements AppConfigInterface {

    /**
     * Путь до файла конфигурации
     * @type {string}
     */
    public static appConfigPath = "app.config.json";

    /**
     * Стандратная конфигурация
     * @type {AppConfig}
     */
    public static default: AppConfig = new AppConfig();

    /**
     * Секция: приложение
     * {@link ConfigSection_app}
     */
    public app: ConfigSection_app = {
        author: null,
        title: "my.App",
    };

    /**
     * Секция: разработка
     * {@link ConfigSection_develop}
     */
    public develop: ConfigSection_develop = {
        appFile: "js/index.js",
    };

    /**
     * Секция: манифест
     * {@link ConfigSection_manifest}
     */
    public manifest: ConfigSection_manifest = {
        allowStandaloneMode: true,
        useApplicationIcon: true,
        useContentController: true,
        useContentRouter: true,
        useDevelopMode: false,
        useIPhoneXStandaloneFix: true,
        useMeta: true,
        useNavigationBar: true,
        useViewPort: true,
    };

    /**
     * Секция: контроллер контента
     * {@link ConfigSection_contentController}
     */
    public contentController: ConfigSection_contentController = {
        defaultContentId: "index",
        errorContentId: "error",
    };

    /**
     * Секция: панель навигации
     * {@link ConfigSection_navigationBar}
     */
    public navigationBar: ConfigSection_navigationBar = {
        color: "#2b2b2b",
        extendedStyle: false,
        imageUrl: null,
        items: [],
        subtitle: null,
        title: "my.App{ }",
    };

    /**
     * Секция: боковая панель навигации
     * {@link ConfigSection_sideNavigationBar}
     */
    public sideNavigationBar: ConfigSection_sideNavigationBar = {
        allowMouseEvents: true,
        items: [],
    };

    /**
     * Секция: шаблон
     * {@link ConfigSection_template}
     */
    public template: ConfigSection_template = {
        color: "#194d6d",
        footer: {
            subtitle: "My application",
            title: "Works with *ely.Flat* Application Engine",
        },
        maxContainerWidth: 700,
    };

    /**
     * Секция: мета данные
     * {@link ConfigSection_meta}
     */
    public meta: ConfigSection_meta = {
        appleMobile: {
            statusBarStyle: "black-translucent",
        },
        charset: "UTF-8",
        iconPath: "resources/icon",
        viewport: {
            fit: "cover",
            initialScale: 1.0,
            maximumScale: 1.0,
            userScale: "no",
            width: "device-width",
        },

    };

    public constructor() {
        super();
    }

    /**
     * Загружает конфигурацию
     * @param {{file?: string, data?: *}} props
     */
    public load(props: { file?: string, data?: any }): void {
        if (Guard.isSet(props.file)) {
            XLogger.default.log("[AppConfig]: Загрузка конфигурации через URL...");
            Web.Requests.URLRequest.sendGET(props.file!, {}, (response: any, status: any) => {
                if (status) {
                    Utils.mergeDeep(this, Guard.safeJsonParse(response));
                }
                this.notify("loaded", status, this);
            });
        } else {
            if (props.data) {
                XLogger.default.log("[AppConfig]: Загрузка конфигурации из данных...");
                Utils.mergeDeep(this, props.data);
                this.notify("loaded", true, this);
            }
        }
    }

    /**
     * Добавляет наблюдатель: загрузка конфигурации завершена
     *
     * Имя обсервера: loaded
     *
     * @param {function(result: boolean, cfg: AppConfig)} o - наблюдатель
     */
    public addLoadedObserver(o: (result: boolean, cfg: AppConfig) => void): AppConfig {
        this.addObserver("loaded", o);
        return this;
    }

    /**
     * Возвращает заголовок приложения
     * @return {string}
     */
    public getAppTitle(): string {
        return this.app.title;
    }

    /**
     * Возвращает строку цвета приложения
     * @return {string}
     */
    public getAppColorString(): string {
        return this.template.color;
    }

    /**
     * Возвращает цвет панели навигации
     * @return {string}
     */
    public getNavigationBarColorString(): string {
        return this.navigationBar.color || this.template.color;
    }

    /**
     * Возвращает цвет панели навигации
     */
    public getNavigationBarColor(): Color {
        return new Color({hex: this.getNavigationBarColorString()});
    }

    /**
     * Возвращает основной цвет приложения
     * @return {Color}
     */
    public getAppColor(): Color {
        return new Color({hex: this.getAppColorString()});
    }

    /**
     * Возвращает true, если используется панель навигации
     */
    public isNavigationBarUsed(): boolean {
        return this.manifest.useNavigationBar;
    }

    /**
     * Возвращает true, если используется боковая панель навигации
     */
    public isSideNavigationBarUsed(): boolean {
        return this.manifest.useSideNavigationBar;
    }
}
