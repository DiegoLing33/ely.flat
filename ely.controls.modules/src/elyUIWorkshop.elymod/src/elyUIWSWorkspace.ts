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
 + Файл: elyUIWSWorkspace.ts                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import elyView from "@core/controls/elyView";
import elyWorkspaceView from "@core/controls/elyWorkspaceView";
import {elyDesignableAutoFields, elyDesignableAutoFieldsData, elyDesignableFieldState} from "@core/elyDesignable";
import elyWorkshop from "@devMods/elyUIWorkshop.elymod/elyWorkshop";
import elyWSRegex from "@devMods/elyUIWorkshop.elymod/src/elyWSRegex";
import elyWSPlaceholderView from "@devMods/elyUIWorkshop.elymod/views/elyWSPlaceholderView";

/**
 * Рабочая область
 */
export default class elyUIWSWorkspace extends elyWorkspaceView {

    /**
     * Главная рабочая область
     */
    public static main: elyUIWSWorkspace = new elyUIWSWorkspace();

    public canUpdate: boolean = true;

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.getDocument().append(this.content.getDocument());
    }

    /**
     * Обновляет рабочую область
     */
    public update(): void {

        elyWorkshop.logger.log("Отрисовка рабочей области...");
        if (!this.canUpdate) return;
        this.content.removeViewContent();

        if (elyWSRegex.main.views.contains("workspace"))
            this.content.addSubView(elyWSRegex.main.views.item("workspace")!);

        for (const viewName in elyWSRegex.main.views.get()) {
            if (!elyWSRegex.main.views.contains(viewName)) continue;
            elyWorkshop.logger.log(`Отрисовка элемента [${viewName}]`);
            const viewObject = elyWSRegex.main.views.item(viewName)!;
            const placers = this.getViewPlacers(viewObject);
            console.log(viewName, placers);
            for (const afvName in placers) {
                if (!placers.hasOwnProperty(afvName)) continue;
                elyWorkshop.logger.log(`Элемент [${viewName}] --> поле [${afvName}]`);
                const obj = placers[afvName] as elyControl;
                if (obj.getSubViews().length === 1 && obj.getSubViews()[0] instanceof elyWSPlaceholderView) {
                    obj.removeViewContent();
                }
                if (obj.getSubViews().length === 0) {
                    elyWorkshop.logger.log(`Элемент [${viewName}] --> поле [${afvName}] --> {placeholder}`);
                    obj.addSubView(new elyWSPlaceholderView({view: obj, autoFieldName: afvName}));
                }
            }

        }
    }

    protected getViewPlacers(view: elyView | any): { [name: string]: elyView } {
        const views: any = {};
        const af = elyDesignableAutoFieldsData[view.constructor.name];
        if (view instanceof elyStaticGridView) {
            for (let i = 0; i < view.rowsCount() * view.colsCount(); i++) {
                views["contentView" + i] = view["contentView" + i];
            }
        }
        if (af) {
            const fields = af.fields;
            for (const fieldName in fields) {
                if (!fields.hasOwnProperty(fieldName)) continue;
                if (fields[fieldName].state === elyDesignableFieldState.VIEW) {
                    views[fieldName] = view[fieldName];
                }
            }
        }
        return views;
    }
}
