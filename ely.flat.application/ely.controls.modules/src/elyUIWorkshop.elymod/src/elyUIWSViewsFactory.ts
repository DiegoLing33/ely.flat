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
 + Файл: elyUIWSViewsFactory.ts                                               +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyView from "@core/controls/elyView";
import {elyDesignableAutoFieldsData, elyDesignableFieldState} from "@core/elyDesignable";
import elyUtils from "@core/elyUtils";
import elyWorkshop from "../elyWorkshop";
import elyUIWSMeta from "./elyUIWSMeta";
import elyUIWSWorkspace from "./elyUIWSWorkspace";
import elyWSRegex from "./elyWSRegex";

/**
 * Фабрика элементов
 */
export default class elyUIWSViewsFactory {

    /**
     * Создаёт элемент из объекта
     * @param obj
     */
    public static custom(obj: any | string): elyView | null {
        let view: elyView | null = null;
        try {
            if (typeof obj === "string") obj = JSON.parse(obj);
            view = elyControl.fromObject(obj);
            if (!view) {
                throw Error("Не верный код объекта");
            }
        } catch (e) {
            const noti =
                new elyNotificationView({
                    message: "Ошибка создания элемента",
                    title: "Создание элемента",
                });
            noti.contentView.addSubView(String(e.message || "").textView());
            noti.present();
        }
        return view;
    }

    /**
     * Применяет мета значения
     * @param viewName
     * @param view
     */
    public static applyMeta(viewName: string, view: elyView): void {
        elyUIWSMeta.metas[viewName] = new elyUIWSMeta();
        elyWSRegex.main.dependencies[viewName] = {};
        elyUIWSMeta.metas[viewName].autoData = elyDesignableAutoFieldsData[view.constructor.name];

        if (elyUIWSMeta.metas[viewName].autoData)
            for (const fieldName in elyUIWSMeta.metas[viewName].autoData!.fields) {
                if (!elyUIWSMeta.metas[viewName].autoData!.fields.hasOwnProperty(fieldName)) continue;
                const field = elyUIWSMeta.metas[viewName].autoData!.fields[fieldName];

                // View field
                if (field && field.state === elyDesignableFieldState.VIEW) {
                    elyWSRegex.main.dependencies[viewName][fieldName] = null;
                }
            }
        if (view instanceof elyStaticGridView) {
            view.addObserver("rebuild", () => {
                elyUtils.forEach(elyWSRegex.main.dependencies[viewName], (index, value) => {
                    const num = parseInt(String(index).replace("contentView", ""), 10);
                    if (num >= view.colsCount() * view.rowsCount()) {
                        if (value) elyWorkshop.remove(value);
                    }
                });

                elyUIWSWorkspace.main.update();
            });
            view.rebuild();
        }
    }
}
