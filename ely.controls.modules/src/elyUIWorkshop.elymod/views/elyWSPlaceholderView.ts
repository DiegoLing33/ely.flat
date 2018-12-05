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
 + Файл: elyWSPlaceholderView.ts                                              +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyUIWorkshop from "../elyUIWorkshop";
import elyUIWSWorkspace from "../src/elyUIWSWorkspace";
import elyWSRegex from "../src/elyWSRegex";
import elyWSCreateViewWindow from "../windows/elyWSCreateViewWindow";

/**
 * Элемент для замены его другим элементом
 */
export default class elyWSPlaceholderView extends elyView {

    /**
     * Место для вставки элемента
     * @ignore
     */
    protected __placeViewName: string;

    /**
     * Автоматическое имя
     * @ignore
     */
    protected __autoViewName: string;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyViewOptions & { placeViewName: string, autoViewName: string }) {
        super(options);
        this.__placeViewName = options.placeViewName;
        this.__autoViewName = options.autoViewName;
        this.getDocument().append(this.createPlaceHolderItemView().getDocument());
    }

    /**
     * Создает элемент для ввода элемента
     */
    private createPlaceHolderItemView(): elyView {
        const view = new elyControl().addClass("elyuiws-placeolder-item") as elyControl;
        view.addSubView(new elyTextView({text: "Empty"}));
        view.addSubView(new elyTextView({text: this.__autoViewName}));
        view.addClass("clickable");
        view.addObserver("click", () => {
            elyWSCreateViewWindow.present(createdView => {
                elyUIWSWorkspace.main.canUpdate = false;
                elyWSRegex.main.dependencies[this.__placeViewName][this.__autoViewName]
                    = elyUIWorkshop.add(createdView);
                elyUIWSWorkspace.main.canUpdate = true;
                elyUIWSWorkspace.main.update();
            });
        });

        return view;
    }
}
