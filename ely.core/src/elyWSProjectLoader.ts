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
 + Файл: elyWSProjectLoaderLoader.ts                                                      +
 + Файл изменен: 08.12.2018 03:03:58                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * @callback elyWSByUrlCallback
 * @param {elyWSProjectLoader|null} project
 */

import elyControl from "@controls/action/elyControl";
import elyViewEntityProtocol from "@controls/protocols/elyViewEntityProtocol";
import elyWSProjectFileProtocol from "@controls/protocols/elyWSProjectFileProtocol";
import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyXLogger from "@core/utils/elyXLogger";
import elyGetRequest from "@core/web/request/elyGetRequest";

/**
 * Объект проекта ely Workshop
 * @class elyWSProjectLoader
 */
export default class elyWSProjectLoader {

    /**
     * Отладка
     * @type {boolean}
     */
    public static DEBUG: boolean = false;

    /**
     * Загружает проект по URL
     * @param {String} url
     * @param {elyWSByUrlCallback} callback
     */
    public static loadUrl(url: string, callback: (project: elyWSProjectLoader | null) => void): void {
        new elyGetRequest({url}).send({}, response => callback(new elyWSProjectLoader(response)));
    }

    /**
     * Исходные данные
     * @protected
     */
    protected readonly __source: elyWSProjectFileProtocol;

    /**
     * Скомпилированные элементы
     * @protected
     */
    protected readonly __compiledViews: { [name: string]: elyView } = {};

    /**
     * Конструктор
     * @param data
     */
    public constructor(data: elyWSProjectFileProtocol) {
        /**
         * @protected
         */
        this.__source = data || {};
        this.__compile();
    }

    /**
     * Возвращает исходные данные проекта
     * @return {*}
     */
    public getSource(): elyWSProjectFileProtocol {
        return this.__source;
    }

    /**
     * Возвращает главный элемент отображения
     * @return {elyView|null}
     */
    public getWorkspace(): elyView | null {
        return this.getViewByName("workspace");
    }

    /**
     * Возвращает исходной код элемента
     * @param {String} name
     * @return {*}
     */
    public getViewSource(name: string): elyViewEntityProtocol | null {
        return this.__source.views[name] || null;
    }

    /**
     * Возвращает элемент по имени или null
     * @param {String} name
     * @return {elyView|null|*}
     */
    public getViewByName(name: string): elyView | any | null {
        return this.__compiledViews[name] || null;
    }

    /**
     * Возвращает связь с элементом по имени
     * @param {String} name
     * @return {{view: string, af: string}|null}
     */
    public getViewSVSData(name: string): { view: string, af: string } | null {
        for (const root in this.__source.svs) {
            if (!this.__source.svs.hasOwnProperty(root)) continue;
            const svs = this.__source.svs[root] || {};
            for (const af in svs) {
                if (!svs.hasOwnProperty(af)) continue;
                if (svs[af] === name) {
                    return {
                        af,
                        view: root,
                    };
                }
            }
        }
        return null;
    }

    /**
     * Производит компиляцию проекта
     * @private
     * @ignore
     */
    protected __compile(): void {
        const logger = new elyXLogger({mainPrefix: "ws", clear: true});
        if (elyWSProjectLoader.DEBUG) logger.log("Компиляция проекта...");
        for (const name in this.__source.views) {
            if (!this.__source.views.hasOwnProperty(name)) continue;
            if (elyWSProjectLoader.DEBUG) logger.log(`Элемент: [${name} -> ${this.__source.views[name].item}]`);
            const view = elyControl.fromObject(this.__source.views[name]);
            const svs = this.getViewSVSData(name);
            if (elyWSProjectLoader.DEBUG) logger.log(`Зависимости: ${JSON.stringify(svs)}`);
            this.__compiledViews[name] = view;
            if (svs && this.__compiledViews[svs.view]) {
                const sv = (this.__compiledViews[svs.view] as any)[svs.af] as elyView;
                if (sv) {
                    sv.getDocument().append(view.getDocument());
                } else {
                    if (elyWSProjectLoader.DEBUG) logger.error(`${svs.view} не имеет автоматическое поле [${svs.af}]!`);
                }
            } else if (svs) {
                if (elyWSProjectLoader.DEBUG) logger.error(`Невозможно связать [${name}] с [${svs.view}]!`);
            }
        }
        if (elyWSProjectLoader.DEBUG) logger.log(`Компиляция завершена`);
        if (elyWSProjectLoader.DEBUG) logger.log(`Элементов создано: ${elyUtils.count(this.__compiledViews)}`);
    }
}
