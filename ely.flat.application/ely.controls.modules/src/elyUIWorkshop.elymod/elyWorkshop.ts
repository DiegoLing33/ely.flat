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
 + Файл: elyWorkshops                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplicationPreloader from "@app/app/content/elyFlatApplicationPreloader";
import efApplication from "@app/app/efApplication";
import elyGridRowView from "@controls/flex/elyGridRowView";
import elyGridView from "@controls/flex/elyGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyView from "@core/controls/elyView";
import elyWorkspaceView from "@core/controls/elyWorkspaceView";
import elyCookie from "@core/elyCookie";
import {elyDesignableCore} from "@core/elyDesignable";
import elyLogger from "@core/elyLogger";
import elySimpleJSONParser from "@core/elySimpleJSONParser";
import elyUtils from "@core/elyUtils";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyXLogger from "@core/utils/elyXLogger";
import elyWSUtils from "@devMods/elyUIWorkshop.elymod/elyWSUtils";
import elyTabBarView from "@devMods/elyUIWorkshop.elymod/navigation/elyTabBarView";
import elyUIWorkshopElementsPanel from "@devMods/elyUIWorkshop.elymod/panels/elyUIWorkshopElementsPanel";
import elyWSSettingsPanel from "@devMods/elyUIWorkshop.elymod/panels/elyWSSettingsPanel";
import elyWSViewPropsPanel from "@devMods/elyUIWorkshop.elymod/panels/elyWSViewPropsPanel";
import elyUIWSContextMenu from "@devMods/elyUIWorkshop.elymod/src/elyUIWSContextMenu";
import elyUIWSMeta from "@devMods/elyUIWorkshop.elymod/src/elyUIWSMeta";
import elyUIWSViewsFactory from "@devMods/elyUIWorkshop.elymod/src/elyUIWSViewsFactory";
import elyUIWSWorkspace from "@devMods/elyUIWorkshop.elymod/src/elyUIWSWorkspace";
import elyWSRegex from "@devMods/elyUIWorkshop.elymod/src/elyWSRegex";
import elyControl from "@controls/action/elyControl";
import elyGuard from "@core/elyGuard";

export default class elyWorkshop {

    /**
     * Выбранный элемент
     */
    public static readonly selectedViewName: elyObservableProperty<string> =
        new elyObservableProperty<string>().change(value => {
            elyWSViewPropsPanel.main.applySettingsPanel(value);
        });

    public static superView: elyView | null = null;

    /**
     * Бар
     */
    public static tabBar: elyTabBarView = new elyTabBarView({tabBarSticky: true});

    /**
     * Логгер
     */
    public static logger = new elyXLogger({mainPrefix: "WS", clear: true});

    /**
     * Удаляет элемент
     * @param viewName
     */
    public static remove(viewName: string): boolean {
        if (viewName === "workspace") return false;
        elyWorkshop.logger.log(`Удаление [${viewName}]...`);

        const view = elyWSRegex.main.views.item(viewName);
        if (view && view.superview && view.superview instanceof elyControl) {
            view.superview.removeSubView(view);
        }
        if (elyWSRegex.main.unregView(viewName)) {
            elyUIWSWorkspace.main.update();
            elyUIWorkshopElementsPanel.main.update();
            elyWorkshop.logger.log(`Удаление [${viewName}] [OK]`);
            return true;
        } else {
            elyWorkshop.logger.log(`Удаление [${viewName}] [NO]`);
            new elyNotificationView({
                message: `Не удалось удалить элемент ${viewName}!`,
                title: "Удаление элемента",
            }).present();
            return false;
        }
    }

    /**
     * добавляет элемент
     * @param view
     * @param forceName - принудительное имя
     */
    public static add(view: elyView, forceName?: string): string {
        const viewName = elyWSRegex.main.regView(view, forceName);
        elyUIWSViewsFactory.applyMeta(viewName, view);
        return viewName;
    }

    /**
     * Создает фрейм
     */
    public static create(root: elyView): void {
        elyWorkshop.superView = root;
        if (elyWorkshop.view) return;

        elyWorkshop.logger.log(`Инициилизация elyWorkshop...`);

        const workshopRow = new elyGridRowView();

        workshopRow.add(elyUIWSWorkspace.main);

        elyFlatApplicationPreloader.default.messageView.text("Загрузка данных...");
        elyFlatApplicationPreloader.default.hidden(false);
        elyWorkshop.restoreSessionFromCookies("workshop", () => {
            elyFlatApplicationPreloader.default.hidden(true);

            if (!elyWSRegex.main.views.contains("workspace")) {
                elyWSRegex.main.regView(new elyWorkspaceView(), "workspace");
                elyUIWSWorkspace.main.update();
            }
            elyUIWorkshopElementsPanel.main.update();
        });

        elyWorkshop.addContextMenuAuto();

        elyWSRegex.main.addRegObserver(() => {
            elyUIWSWorkspace.main.update();
            elyUIWorkshopElementsPanel.main.update();
        });
        elyWSRegex.main.addUnregObserver(() => {
            elyUIWSWorkspace.main.update();
            elyUIWorkshopElementsPanel.main.update();
        });

        elyWorkshop.view = workshopRow;

        //
        // tabs
        //

        elyWorkshop.tabBar.getStyle().marginTop = efApplication.default.getApplicationNavigationView().height() + "px";
        elyWorkshop.tabBar.add("props", {text: "Свойства", iconName: "cogs", content: elyWSViewPropsPanel.main});
        elyWorkshop.tabBar.add("overview", {
            content: elyUIWorkshopElementsPanel.main,
            iconName: "list",
            text: "Обзор",
        });
        elyWorkshop.tabBar.add("settings", {
            content: elyWSSettingsPanel.main,
            iconName: "support",
            text: "Инструменты",
        });

        if (elyWorkshop.superView) {
            elyWorkshop.superView.getDocument().append(elyWorkshop.tabBar.getDocument());
            elyWorkshop.superView.getDocument().append(elyWorkshop.view.getDocument());
        }

        elyWorkshop.logger.log(`Инициилизация elyWorkshop [OK]`);
    }

    /**
     * Добавляет автоматическое контекстное мению
     */
    public static addContextMenuAuto(): void {
        document.addEventListener("contextmenu", (e: MouseEvent) => {
            let element: HTMLElement | null = e.target as HTMLElement;
            while (element != null) {
                if (element.hasAttribute(elyWSUtils.WS_NAME_ATTRIBUTE)) break;
                element = element.parentElement;
            }
            const dataWSName = element ? element.getAttribute(elyWSUtils.WS_NAME_ATTRIBUTE) : null;
            if (dataWSName) {
                const view = elyWSRegex.main.views.item(dataWSName);
                if (view) {
                    elyUIWSContextMenu.main.update(view,
                        {x: e.pageX, y: e.pageY});
                    e.preventDefault();
                }
            }
        }, false);

        document.addEventListener("click", (e: MouseEvent) => {
            if (!e.metaKey) return;
            let element: HTMLElement | null = e.target as HTMLElement;
            while (element != null) {
                if (element.hasAttribute(elyWSUtils.WS_NAME_ATTRIBUTE)) break;
                element = element.parentElement;
            }
            const dataWSName = element ? element.getAttribute(elyWSUtils.WS_NAME_ATTRIBUTE) : null;
            if (dataWSName) {
                elyWSViewPropsPanel.main.applySettingsPanel(dataWSName);
            }
        });
    }

    /**
     * Запускает автосохранение сессии
     */
    public static startAutoSaver(): void {
        setInterval(() => {
            elyWorkshop.saveSessionToCookies();
        }, 2000);
    }

    /**
     * Восстанавливает сессию из cookie
     * @param name
     * @param callback
     */
    public static restoreSessionFromCookies(name?: string, callback?: () => void): void {
        const sessionObject: any = {};
        elySimpleJSONParser.parse(elyCookie.get(`ws-${name || "workshop"}-views`) || "{}", obj => {
            sessionObject.views = obj || {};
            elyWorkshop.restoreSessionFromObject(sessionObject, callback);
        });

    }

    /**
     * Очищает проект
     */
    public static cleanProject(): void {
        elyWorkshop.logger.log(`Очистка проекта...`);
        elyUIWSWorkspace.main.canUpdate = false;
        elyWSRegex.main.views.forEach((key) => elyWorkshop.remove(key));
        elyUIWSMeta.metas = {};
        elyUIWSWorkspace.main.canUpdate = true;
        elyUIWSWorkspace.main.update();
        elyWorkshop.logger.log(`Очистка проекта [OK]`);
    }

    /**
     * Восстанавливает сессию из объекта
     * @param obj
     * @param callback
     */
    public static restoreSessionFromObject(obj: any, callback?: () => void): void {
        elyWorkshop.logger.log(`Восстановление сессии проекта из объекта...`);
        elyWorkshop.cleanProject();
        elyUIWSWorkspace.main.canUpdate = false;
        elyUtils.forEach(obj.views, (index, value) => {
            const view = elyUIWSViewsFactory.custom(value);
            elyWorkshop.logger.log(`Найден объект [${index}]`);
            if (view) {
                elyWorkshop.add(view, index);
                elyWorkshop.logger.log(`Найден объект [${index}] [OK]`);
            } else {
                new elyNotificationView({
                    message: `Не удалось создать элемент ${index}!`,
                    title: "Ошибка создания элемента",
                }).present();
            }
        });
        elyUIWSWorkspace.main.canUpdate = true;
        elyUIWSWorkspace.main.update();
        elyLogger.debugObject(obj);
        if (callback) callback();
    }

    /**
     * Сохраняет сессию в объект
     * @param callback
     */
    public static saveSessionToObject(callback: (sessionObject: any) => void): void {
        const sessionData: any = {};
        const views: any = {};
        elyWSRegex.main.views.forEach((key, value) => views[key] = elyDesignableCore.freeze(value));
        sessionData.views = views;
        callback(sessionData);
    }

    /**
     * Сохраняет сессиию в cookies с именем name
     * @param name
     * @param callback
     */
    public static saveSessionToCookies(name: string = "workshop", callback?: (sessionObject: any) => void): void {
        elyWorkshop.saveSessionToObject(sessionObject => {
            elyCookie.set("ws-" + name + "-views", JSON.stringify(sessionObject.views || {}));
            if (callback) callback(sessionObject);
        });
    }

    protected static view: elyGridRowView;
}
