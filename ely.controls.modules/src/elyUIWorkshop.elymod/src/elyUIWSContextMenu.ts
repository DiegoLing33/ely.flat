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
 + Файл: elyUIWSContextMenu.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyControl from "@controls/action/elyControl";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
import elyGridView from "@controls/flex/elyGridView";
import elyModalView from "@controls/view/elyModalView";
import elyPanelView from "@controls/view/elyPanelView";
import elyView from "@core/controls/elyView";
import {elyDesignableCore} from "@core/elyDesignable";
import elyGuard from "@core/elyGuard";
import elyWorkshop from "@devMods/elyUIWorkshop.elymod/elyWorkshop";
import elyWSUtils from "@devMods/elyUIWorkshop.elymod/elyWSUtils";
import elyWSViewPropsPanel from "@devMods/elyUIWorkshop.elymod/panels/elyWSViewPropsPanel";
import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";

export default class elyUIWSContextMenu extends elyPanelView {

    public static main = new elyUIWSContextMenu();

    /**
     * Лист элементов
     */
    public readonly flexGrid: elyGridView;

    public constructor() {
        super();
        this.flexGrid = new elyGridView({margin: {left: 0, right: 0, top: 0, bottom: 5}});

        this.title("");
        this.descriptionView.hidden(true);
        this.getStyle().position = "absolute";
        this.getStyle().width = "220px";

        this.hidden(true);
        document.body.append(this.getDocument());
        document.body.onclick = () => {
            this.hidden(true);
        };

        this.contentView.addSubView(this.flexGrid);

    }

    /**
     * Обновляет позицию
     * @param view
     * @param point
     */
    public update(view: elyView, point?: { x: number, y: number }): void {
        this.flexGrid.removeViewContent();

        this.hidden(false);
        if (point) {
            this.getStyle().top = point.y + "px";
            this.getStyle().left = point.x + "px";
        } else {
            this.getStyle().top = (view.getDocument().offsetTop || 0) /*+ (view.getRect().height || 0)*/ + "px";
            this.getStyle().left = (view.getDocument().offsetLeft || 0) + 10 + (view.getRect().width || 0) + "px";
        }

        elyGuard.func<string>(elyWSUtils.getWSName, [view], name => {
            this.titleView.textSize(elySize.small);
            this.title(name);
            this.flexGrid.add(new elyButton({text: "Свойства", iconName: "cogs"}).click(() => {
                elyWSViewPropsPanel.main.applySettingsPanel(name);
            }).fill().buttonStyle(elyStyle.primary));
            this.flexGrid.add(elyControl.line());
            this.flexGrid.add(new elyButton({text: "Код элемента"}).click(() => {
                const text = JSON.stringify(
                    elyDesignableCore.freeze(view),
                    null, 4);
                new elyModalView({modalTitle: "Код элемента"})
                    .modalContent(new elyTextAreaField({rowsNumber: 12}).value(text))
                    .present();
            }).fill().buttonStyle(elyStyle.primary));
            this.flexGrid.add(new elyButton({text: "Удалить", iconName: "remove"}).click(() => {
                elyWorkshop.remove(name!);
            }).fill().buttonStyle(elyStyle.danger));
        });

    }

}
