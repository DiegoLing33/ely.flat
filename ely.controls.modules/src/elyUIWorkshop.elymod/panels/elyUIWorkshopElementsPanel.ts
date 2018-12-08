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
 + Файл: elyUIWorkshopElementsPanel.ts                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyStylesheet from "@controls/elyStylesheet";
import elyGridView from "@controls/flex/elyGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyTextView from "@controls/text/elyTextView";
import elyPanelView from "@controls/view/elyPanelView";
import elyUIWorkshop from "@devMods/elyUIWorkshop.elymod/elyUIWorkshop";
import elyWSRegex from "@devMods/elyUIWorkshop.elymod/src/elyWSRegex";
import elySize from "@enums/elySize";
import elyWeight from "@enums/elyWeight";

/**
 * Панель созданных элементов
 */
export default class elyUIWorkshopElementsPanel extends elyPanelView {

    public static readonly main = new elyUIWorkshopElementsPanel();

    /**
     * Список элементов
     */
    public readonly gridView = new elyGridView({flex: [[15, 70, 15]]});

    protected constructor() {
        super({title: "Обзор"});

        this.contentView.addSubView(this.gridView);
        elyStylesheet.global.addClass("builderRowItem", {
            cursor: "pointer",
            opacity: "0.6",
        });
        elyStylesheet.global.addClass("builderRowItem:hover", {
            cursor: "pointer",
            opacity: "1",
        });

        this.titleView.hidden(true);
        this.descriptionView.hidden(true);
    }

    /**
     * Обновляет панель элементов
     */
    public update(): void {
        this.gridView.removeViewContent();
        let num = 0;
        elyWSRegex.main.views.forEach((key, value) => {
            num++;
            const nameTextView = key.textView({
                textWeight: elyWeight.normal,
            });

            const typeNameView = String(value.constructor.name).textView({
                opacity: 0.7,
                textSize: elySize.small,
                textWeight: elyWeight.thin,
            });

            const nameView = new elyControl({subviews: [nameTextView, typeNameView]});
            nameView.addClass("clickable").addObserver("click", () => {
                elyUIWorkshop.selectedViewName.set(key);
            });

            const removeButton = new elyTextView({iconName: "remove"});
            removeButton.addClass("clickable");
            removeButton.getStyle().textAlign = "right";
            removeButton.getStyle().color = "#aa0000";
            removeButton.addObserver("click", () => {
                if (key === "workspace") {
                    new elyNotificationView({
                        message: "Вы не можете удалить корневой элемент!",
                        title: "Ошибка",
                    }).present();
                    return;
                }
                elyUIWorkshop.remove(key);
            });

            const numTextView = String(num).textView({opacity: 0.7});

            this.gridView.add(numTextView, nameView, removeButton);
        });
    }
}
