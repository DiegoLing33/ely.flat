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
 + Файл: elyWSSettingsPanel.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyControl from "@controls/action/elyControl";
import elyStylesheet from "@controls/elyStylesheet";
import elySwitchField from "@controls/fields/elySwitchField";
import elyGridView from "@controls/flex/elyGridView";
import elyPanelView from "@controls/view/elyPanelView";
import elyUIWorkshop from "@devMods/elyUIWorkshop.elymod/elyUIWorkshop";
import elyWSOpenProjectWindow from "@devMods/elyUIWorkshop.elymod/windows/elyWSOpenProjectWindow";
import elyStyle from "@enums/elyStyle";

/**
 * Панель инструментов
 */
export default class elyWSSettingsPanel extends elyPanelView {

    /**
     * Стандартная панель
     */
    public static readonly main: elyWSSettingsPanel = new elyWSSettingsPanel();

    constructor() {
        super({title: "Инструменты"});

        const grid = new elyGridView();
        this.contentView.addSubView(grid);

        grid.add(new elySwitchField({
            hint: "Скрывает все view-холдеры (empty элементы) из workshop.",
            title: "скрыть view-холдеры",
        }).addChangeValueObserver((oldValue, newValue) => {
            elyStylesheet.global.addClass("elyuiws-placeolder-item", {display: newValue ? "none" : "block"});
        }));
        grid.add(elyControl.line());

        const button = new elyButton({
            buttonStyle: elyStyle.secondary,
            iconName: "download",
            text: "Сохранить проект",
        }).fill();
        button.click(() => {
            elyUIWorkshop.saveSessionToObject(sessionObject => {
                const item = document.createElement("a");
                const json = JSON.stringify(sessionObject);
                item.setAttribute("download", "project.elyws");
                item.setAttribute("href", `data:application/json;charset=utf-8,${json}`);
                document.body.append(item);
                item.click();
                document.body.removeChild(item);
            });
        });
        grid.add(button);

        const open = new elyButton({
            buttonStyle: elyStyle.secondary,
            iconName: "upload",
            text: "Открыть проект",
        }).fill().click(() => {
            elyWSOpenProjectWindow.present(obj => {

            });
        });
        grid.add(open);

        this.titleView.hidden(true);
        this.descriptionView.hidden(true);

    }

}
