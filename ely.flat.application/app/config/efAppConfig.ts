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
 + Файл: efAppConfig.ts                                                       +
 + Файл изменен: 30.01.2019 00:57:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {
    efAppConfigInterface,
    efConfigSection_app,
    efConfigSection_contentController, efConfigSection_develop,
    efConfigSection_manifest,
    efConfigSection_meta,
    efConfigSection_navigationBar,
    efConfigSection_sideNavigationBar,
    efConfigSection_template,
} from "@app/config/efAppConfigSections";
import elyColor from "@core/elyColor";
import elyGuard from "@core/elyGuard";
import elyUtils from "@core/elyUtils";
import elyObservable from "@core/observable/elyObservable";
import elyGetRequest from "@core/web/request/elyGetRequest";

/**
 * Конфигурация приложения
 * @class efAppConfig
 * @augments {elyObservable}
 * @augments {efAppConfigInterface}
 */
export default class efAppConfig extends elyObservable implements efAppConfigInterface {

    /**
     * Путь до файла конфигурации
     * @type {string}
     */
    public static appConfigPath = "app.config.json";

    /**
     * Стандратная конфигурация
     * @type {efAppConfig}
     */
    public static default: efAppConfig = new efAppConfig();

    /**
     * Секция: приложение
     * {@link efConfigSection_app}
     */
    public app: efConfigSection_app = {
        author: null,
        title: "my.App",
    };

    /**
     * Секция: разработка
     * {@link efConfigSection_develop}
     */
    public develop: efConfigSection_develop = {
        appFile: "js/index.js",
    };

    /**
     * Секция: манифест
     * {@link efConfigSection_manifest}
     */
    public manifest: efConfigSection_manifest = {
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
     * {@link efConfigSection_contentController}
     */
    public contentController: efConfigSection_contentController = {
        defaultContentId: "index",
        errorContentId: "error",
    };

    /**
     * Секция: панель навигации
     * {@link efConfigSection_navigationBar}
     */
    public navigationBar: efConfigSection_navigationBar = {
        color: "#2b2b2b",
        extendedStyle: false,
        imageUrl: null,
        items: [],
        subtitle: null,
        title: "my.App{ }",
    };

    /**
     * Секция: боковая панель навигации
     * {@link efConfigSection_sideNavigationBar}
     */
    public sideNavigationBar: efConfigSection_sideNavigationBar = {
        allowMouseEvents: true,
        items: [],
    };

    /**
     * Секция: шаблон
     * {@link efConfigSection_template}
     */
    public template: efConfigSection_template = {
        color: "#194d6d",
        footer: {
            subtitle: "My application",
            title: "Works with *ely.Flat* Application Engine",
        },
        maxContainerWidth: 700,
    };

    /**
     * Секция: мета данные
     * {@link efConfigSection_meta}
     */
    public meta: efConfigSection_meta = {
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
        if (elyGuard.isSet(props.file)) {
            new elyGetRequest({url: props.file!}).send({}, (response, status) => {
                if (response) {
                    elyUtils.mergeDeep(this, response);
                    this.notificate("loaded", [true, this]);
                } else {
                    this.notificate("loaded", [false, this]);
                }
            });
        } else {
            if (props.data) {
                elyUtils.mergeDeep(this, props.data);
                this.notificate("loaded", [true, this]);
            }
        }
    }

    /**
     * Добавляет наблюдатель: загрузка конфигурации завершена
     *
     * Имя обсервера: loaded
     *
     * @param {function(result: boolean, cfg: efAppConfig)} o - наблюдатель
     */
    public addLoadedObserver(o: (result: boolean, cfg: efAppConfig) => void): efAppConfig {
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
    public getNavigationBarColor(): elyColor {
        return new elyColor({hex: this.getNavigationBarColorString()});
    }

    /**
     * Возвращает основной цвет приложения
     * @return {elyColor}
     */
    public getAppColor(): elyColor {
        return new elyColor({hex: this.getAppColorString()});
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
