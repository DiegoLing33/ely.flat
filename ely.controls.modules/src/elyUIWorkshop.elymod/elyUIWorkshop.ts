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
 + Файл: elyUIWorkshop.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplicationPreloader from "@app/app/content/elyFlatApplicationPreloader";
import elyFlatApplication from "@app/app/elyFlatApplication";
import elyGridRowView from "@controls/flex/elyGridRowView";
import elyGridView from "@controls/flex/elyGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyView from "@core/controls/elyView";
import elyCookie from "@core/elyCookie";
import {elyDesignableCore} from "@core/elyDesignable";
import elyLogger from "@core/elyLogger";
import elySimpleJSONParser from "@core/elySimpleJSONParser";
import elyUtils from "@core/elyUtils";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
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

export default class elyUIWorkshop {

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
     * Удаляет элемент
     * @param viewName
     */
    public static remove(viewName: string): boolean {
        if (viewName === "workspace") return false;
        if (elyWSRegex.main.unregView(viewName)) {
            return true;
        } else {
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
        elyUIWorkshop.superView = root;
        if (elyUIWorkshop.view) return;

        const workshopRow = new elyGridRowView();

        elyFlatApplicationPreloader.default.messageView.text("Загрузка данных...");
        elyFlatApplicationPreloader.default.hidden(false);
        setTimeout(() => {
            elyUIWorkshop.restoreSessionFromCookies(undefined, () =>
                elyFlatApplicationPreloader.default.hidden(true));
        }, 500);

        elyUIWorkshop.addContextMenuAuto();

        workshopRow.add(elyUIWSWorkspace.main);

        elyWSRegex.main.addRegObserver(() => {
            elyUIWSWorkspace.main.update();
            elyUIWorkshopElementsPanel.main.update();
        });
        elyWSRegex.main.addUnregObserver(() => {
            elyUIWSWorkspace.main.update();
            elyUIWorkshopElementsPanel.main.update();
        });

        elyUIWorkshop.view = workshopRow;

        //
        // tabs
        //

        elyUIWorkshop.tabBar.getStyle().marginTop = elyFlatApplication.default.navigationView.height() + "px";
        elyUIWorkshop.tabBar.add("props", {text: "Свойства", iconName: "cogs", content: elyWSViewPropsPanel.main});
        elyUIWorkshop.tabBar.add("overview", {
            content: elyUIWorkshopElementsPanel.main,
            iconName: "list",
            text: "Обзор",
        });
        elyUIWorkshop.tabBar.add("settings", {
            content: elyWSSettingsPanel.main,
            iconName: "support",
            text: "Инструменты",
        });

        if (elyUIWorkshop.superView) {
            elyUIWorkshop.superView.getDocument().append(elyUIWorkshop.tabBar.getDocument());
            elyUIWorkshop.superView.getDocument().append(elyUIWorkshop.view.getDocument());
        }
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
            elyUIWorkshop.saveSessionToCookies();
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
            elySimpleJSONParser.parse(elyCookie.get(`ws-${name || "workshop"}-meta`) || "{}", meta => {
                sessionObject.meta = meta || {};
                elySimpleJSONParser.parse(elyCookie.get(`ws-${name || "workshop"}-svs`) || "{}", svs => {
                    sessionObject.svs = svs || {};
                    elyUIWorkshop.restoreSessionFromObject(sessionObject, callback);
                });
            });
        });

    }

    /**
     * Очищает проект
     */
    public static cleanProject(): void {
        elyUIWSWorkspace.main.canUpdate = false;
        elyWSRegex.main.views.forEach((key) => elyUIWorkshop.remove(key));
        elyUIWSMeta.metas = {};
        elyUIWSWorkspace.main.canUpdate = true;
        elyUIWSWorkspace.main.update();
    }

    /**
     * Восстанавливает сессию из объекта
     * @param obj
     * @param callback
     */
    public static restoreSessionFromObject(obj: any, callback?: () => void): void {
        elyUIWorkshop.cleanProject();
        elyUIWSWorkspace.main.canUpdate = false;
        elyUtils.forEach(obj.views, (index, value) => {
            const view = elyUIWSViewsFactory.custom(value);
            if (view) {
                elyUIWorkshop.add(view, index);
            } else {
                new elyNotificationView({
                    message: `Не удалось создать элемент ${index}!`,
                    title: "Ошибка создания элемента",
                }).present();
            }
        });
        elyUtils.forEach(obj.meta, (index, value) => {
            if (elyUIWSMeta.metas.hasOwnProperty(index)) {
                elyUtils.forEach(value, (name, val) => {
                    (elyUIWSMeta.metas[index] as any)[name] = val;
                });
            } else {
                new elyNotificationView({
                    message: `Не удалось восстановить мета данные элемента ${index}!`,
                    title: "Ошибка создания элемента",
                }).present();
            }
        });
        elyUtils.forEach(obj.svs, (index, value) => {
            if (elyWSRegex.main.dependencies[index]) {
                elyWSRegex.main.dependencies[index] = {...elyWSRegex.main.dependencies[index], ...value};
            } else {
                elyWSRegex.main.dependencies[index] = value;
            }
        });
        elyUIWSWorkspace.main.canUpdate = true;
        elyUIWSWorkspace.main.update();
        elyLogger.debug("Загрузка сессии WS...");
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
        sessionData.meta = elyUIWSMeta.freezeAllMeta();
        sessionData.svs = elyWSRegex.main.dependencies;
        callback(sessionData);
    }

    /**
     * Сохраняет сессиию в cookies с именем name
     * @param name
     * @param callback
     */
    public static saveSessionToCookies(name: string = "workshop", callback?: (sessionObject: any) => void): void {
        elyUIWorkshop.saveSessionToObject(sessionObject => {
            elyCookie.set("ws-" + name + "-svs", JSON.stringify(sessionObject.svs || {}));
            elyCookie.set("ws-" + name + "-views", JSON.stringify(sessionObject.views || {}));
            elyCookie.set("ws-" + name + "-meta", JSON.stringify(sessionObject.meta || {}));
            if (callback) callback(sessionObject);
        });
    }

    protected static view: elyGridRowView;
}
