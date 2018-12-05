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
import elyView from "@core/controls/elyView";
import elyWSPlaceholderView from "../views/elyWSPlaceholderView";
import elyWSRegex from "./elyWSRegex";

/**
 * Рабочая область
 */
export default class elyUIWSWorkspace extends elyView {

    /**
     * Главная рабочая область
     */
    public static main: elyUIWSWorkspace = new elyUIWSWorkspace();

    /**
     * Контент
     */
    public content: elyView;

    public canUpdate: boolean = true;

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.content = new elyControl();
        this.getDocument().append(this.content.getDocument());
        elyWSRegex.main.regView(this, "workspace");
        elyWSRegex.main.dependencies.workspace = {content: null};
        this.update();
    }

    /**
     * Обновляет рабочую область
     */
    public update(): void {

        if (!this.canUpdate) return;
        this.content.removeViewContent();

        if (elyWSRegex.main.dependencies.workspace.content)
            this.content.getDocument()
                .append(elyWSRegex.main.views.item(elyWSRegex.main.dependencies.workspace.content)!.getDocument());
        else
            this.applyPlaceHolder(this.content, "workspace", "content");

        for (const viewName in elyWSRegex.main.dependencies) {
            if (!elyWSRegex.main.dependencies.hasOwnProperty(viewName)) continue;
            const view = elyWSRegex.main.views.item(viewName);
            if (!view) continue;
            if (typeof elyWSRegex.main.dependencies[viewName] === "object") {
                for (const placerName in elyWSRegex.main.dependencies[viewName]) {
                    if (!elyWSRegex.main.dependencies[viewName].hasOwnProperty(placerName)) continue;
                    const placer = elyWSRegex.main.dependencies[viewName][placerName];
                    const placerView = ((view as any)[placerName] as elyView);
                    if (!placerView) continue;
                    placerView.removeViewContent();
                    if (placer === null) {
                        this.applyPlaceHolder(placerView, viewName, placerName);
                    } else {
                        const subView = elyWSRegex.main.views.item(placer);
                        if (subView) placerView.getDocument().append(subView.getDocument());
                    }
                }
            }
        }
    }

    /**
     * Создает и применяет холдер
     * @param view
     * @param placeViewName
     * @param autoViewName
     */
    protected applyPlaceHolder(view: elyView, placeViewName: string, autoViewName: string): elyWSPlaceholderView {
        const holder = new elyWSPlaceholderView({placeViewName, autoViewName});
        view.getDocument().append(holder.getDocument());
        return holder;
    }

}
