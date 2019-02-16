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
 + Файл: elyWSRegex.ts                                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import {elyDesignableCore} from "@core/elyDesignable";
import elyGuard from "@core/elyGuard";
import elyObservable from "@core/observable/elyObservable";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";
import elyWorkshop from "@devMods/elyUIWorkshop.elymod/elyWorkshop";
import elyUIWSMeta from "@devMods/elyUIWorkshop.elymod/src/elyUIWSMeta";
import elyWSUtils from "@devMods/elyUIWorkshop.elymod/elyWSUtils";

/**
 * Обработчик регистрации элемента
 */
type elyWSRegexRegObserver = (viewName: string, view: elyView) => void ;

/**
 * Обработчик удаления элемента
 */
type elyWSRegexUnregObserver = (result: boolean, view: elyView) => void ;

/**
 * Обработчик связки элементов
 */
type elyWSRegexLinkObserver = (result: boolean, viewName: string, superviewName: string,
                               view: elyView, superview: elyView) => void ;

/**
 * elyWorkshop реестер элементов
 */
export default class elyWSRegex extends elyObservable {

    /**
     * Главный элемент
     */
    public static main: elyWSRegex = new elyWSRegex();

    /**
     * Зарегистрированные элементы
     */
    public views: elyObservableDictionary<elyView> = new elyObservableDictionary<elyView>();

    /**
     * Зависимости элементов
     */
    public dependencies: { [viewName: string]: { [placeViewName: string]: string | null } } = {};

    /**
     * Конструктор
     */
    public constructor() {
        super();
    }

    public rename(oldName: string, newName: string): boolean | string {
        if (this.views.contains(newName)) return "Имя элемента должно быть уникально!";
        if (!this.views.contains(oldName)) return "Элемент не найден!";
        this.views.item(oldName)!.attribute(elyWSUtils.WS_NAME_ATTRIBUTE, newName);
        if (elyUIWSMeta.metas.hasOwnProperty(oldName)) {
            elyUIWSMeta.metas[newName] = elyUIWSMeta.metas[oldName];
            delete elyUIWSMeta.metas[oldName];
        }
        this.views.add(newName, this.views.item(oldName)!);
        this.views.remove(oldName);

        if (this.dependencies.hasOwnProperty(oldName)) {
            this.dependencies[newName] = {...this.dependencies[oldName]};
            delete this.dependencies[oldName];
        }
        for (const root in this.dependencies) {
            if (!this.dependencies.hasOwnProperty(root) && this.dependencies[root] !== null) continue;
            for (const af in this.dependencies[root]) {
                if (!this.dependencies[root].hasOwnProperty(af)) continue;
                if (this.dependencies[root][af] === oldName) {
                    this.dependencies[root][af] = newName;
                    return true;
                }
            }
        }
        return true;
    }

    /**
     * Замораживает элементы
     */
    public freezeViews(): any {
        const freeze: any = {};
        this.views.forEach((key, value) => freeze[key] = elyDesignableCore.freeze(value));
        return freeze;
    }

    /**
     * Регистрирует элемент, назначает ему имя и щаписывает его
     * в аттрибут ely-ws-view-name.
     * @param view
     * @param forceName - принудительное имя
     */
    public regView(view: elyView, forceName?: string): string {
        const id = view.identifier();
        const viewName = forceName || view.constructor.name + "-" + id;
        view.attribute("ely-ws-view-name", viewName);
        this.views.add(viewName, view);
        elyWorkshop.logger.log(`Регистрация [${viewName}]`);
        this.notificate("reg", [viewName, view]);
        return viewName;
    }

    /**
     * Удаляет элемент
     * @param viewName
     */
    public unregView(viewName: string): boolean {
        if (viewName === "workspace" || !this.views.remove(viewName)) return false;
        elyWorkshop.logger.log(`Удаление регистрации [${viewName}]`);
        if (elyUIWSMeta.metas[viewName]) delete elyUIWSMeta.metas[viewName];
        this.notificate("unreg", [true, viewName]);
        return true;
    }

    /**
     * Добавляет слушатель регистрации
     * @param o
     */
    public addRegObserver(o: elyWSRegexRegObserver): void {
        this.addObserver("reg", o);
    }

    /**
     * Добавляет слушатель окончания регистрации
     * @param o
     */
    public addUnregObserver(o: elyWSRegexUnregObserver): void {
        this.addObserver("unreg", o);
    }
}
