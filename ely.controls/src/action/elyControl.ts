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
 + Файл: elyControl.ts                                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewEntityProtocol from "@controls/protocols/elyViewEntityProtocol";
import elyView from "@core/controls/elyView";
import {designable, elyDesignableAutoFieldsData, elyDesignableFieldState} from "@core/elyDesignable";
import elyUtils from "@core/elyUtils";
import elyControlOptions from "@options/elyControlOptions";

/**
 * Основная единица графического элемента
 * @class elyControl
 * @augments elyView
 */
@designable("actionString", elyDesignableFieldState.GETSET, "string")
@designable("hidden", elyDesignableFieldState.GETSET, "boolean")
@designable("opacity", elyDesignableFieldState.GETSET, "number")
export default class elyControl extends elyView {

    /**
     * Горизонтальная линяя
     */
    public static line = () => new elyControl({tag: "hr"});

    /**
     * Пустой объект elyControl
     */
    public static empty = () => new elyControl();

    /**
     * Создает elyControl или объект elyControlObjectProtocol
     * @param obj
     */
    public static fromObject(obj: elyViewEntityProtocol): elyView {
        if (obj.line) return elyControl.line();
        const item = obj.item;
        if (item && window.elyflatobjects.hasOwnProperty(item)) {
            const opts = elyUtils.filter(obj, (k) => {
                return ["item"].indexOf(k) === -1;
            });
            const inst = new (window.elyflatobjects as any)[item](opts);
            for (const afvName in elyDesignableAutoFieldsData[item].fields) {
                if (!elyDesignableAutoFieldsData[item].fields.hasOwnProperty(afvName)) continue;
                if (elyDesignableAutoFieldsData[item].fields[afvName].state === elyDesignableFieldState.VIEW
                    && opts.hasOwnProperty(afvName)) {
                    for (const afvv of opts[afvName]) {
                        (inst[afvName] as elyControl).addSubView(elyControl.fromObject(afvv));
                    }
                }

            }
            if (inst instanceof elyView || typeof inst.getView === "function")
                return inst;
        }
        return elyControl.empty();
    }

    /**
     * Создает elyControl или объект elyControlObjectProtocol из JSON строки
     * @param json
     */
    public static fromJSON(json: string): elyView {
        return elyControl.fromObject(JSON.parse(json));
    }

    /**
     * Выполняет попытку мутировать obj в объект elyView.
     * Иначе возвращает пустой элемент.
     *
     *
     *     let obj = "Тест";
     *     let view = elyControl.tryMutateToView(obj);
     *
     *     typeOf view; // elyTextView
     *     view.text(); // "Тест"
     *
     *
     *
     * @param obj
     */
    public static tryMutateToView(obj: any): elyView {
        try {
            if (obj instanceof elyView) return obj;
            return String(obj).textView();
        } catch (e) {
            return elyControl.empty();
        }
    }

    /**
     * Дочерние элементы
     */
    private readonly __subviews: elyView[];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyControlOptions = {}) {
        super(options);

        this.__subviews = [];
        if (options.subviews) this.addSubView(...options.subviews);
    }

    /**
     * Возвращает дочерние элементы
     */
    public getSubViews(): elyView[] {
        return this.__subviews;
    }

    /**
     * Добавляет элемент в элемент
     * @param views
     */
    public addSubView(...views: elyView[]): elyControl {
        views.forEach((view) => {
            if (view instanceof elyView) {
                this.__subviews.push(view);
                view.superview = this;
                this.notificate("addview", [view]);
                this.getDocument().appendChild(view.getDocument());
            } else {
                window.console.error(view);
                throw new Error("В объект elyControl может быть добавлен только элемент " +
                    "реализующий протокол elyContentProtocol!");
            }
        });
        return this;
    }

    /**
     * Удаляет дочений элемент
     * @param view
     */
    public removeSubView(view: elyView): elyControl {
        const index = this.__subviews.indexOf(view);
        if (index > -1) {
            const sub = this.__subviews[index];
            this.getDocument().removeChild(sub.getDocument());
            this.__subviews.splice(this.__subviews.indexOf(view), 1);
        }
        return this;
    }

    /**
     * Полностью очищает графический элемент
     */
    public clearView(): elyControl {
        this.__subviews.splice(0, this.__subviews.length);
        this.__view.innerHTML = "";
        return this;
    }

    public removeViewContent(): elyView {
        this.__subviews.splice(0, this.__subviews.length);
        return super.removeViewContent();
    }

}
