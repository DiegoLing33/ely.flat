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
import elyWorkshop from "@devMods/elyUIWorkshop.elymod/elyWorkshop";
import elyWSCreateViewWindow from "../windows/elyWSCreateViewWindow";

/**
 * Элемент для замены его другим элементом
 */
export default class elyWSPlaceholderView extends elyView {

    /**
     * Место для вставки элемента
     * @ignore
     */
    protected __autoFieldName: string;

    /**
     * Автоматическое имя
     * @ignore
     */
    protected __autoView: elyControl;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyViewOptions & { view: elyControl, autoFieldName: string }) {
        super(options);
        this.__autoFieldName = options.autoFieldName;
        this.__autoView = options.view;
        this.getDocument().append(this.createPlaceHolderItemView().getDocument());
    }

    /**
     * Создает элемент для ввода элемента
     */
    private createPlaceHolderItemView(): elyView {
        const view = new elyControl().addClass("elyuiws-placeolder-item") as elyControl;
        view.addSubView(new elyTextView({text: "Empty"}));
        view.addSubView(new elyTextView({text: this.__autoFieldName}));
        view.addClass("clickable");
        view.addObserver("click", () => {
            elyWSCreateViewWindow.present(createdView => {
                this.__autoView.removeSubView(this);
                this.__autoView.addSubView(createdView);
                elyWorkshop.add(createdView);
            });
        });

        return view;
    }
}
