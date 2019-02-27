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
 + Файл: Control.ts                                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewEntityProtocol from "@controls/protocols/elyViewEntityProtocol";
import View, {ViewOptions} from "@core/controls/View";
import Utils from "@core/Utils";
import XLogger from "@core/utils/XLogger";

/**
 * Опции {@link Control}
 */
export interface ControlOptions extends ViewOptions {
    /**
     * Дочерние объекты
     */
    subviews?: View[];

    /**
     * Дополнительные опции
     */
    [prop: string]: any;
}

/**
 * Основная единица графического элемента
 * @class Control
 * @augments View
 */
export default class Control extends View {

    /**
     * Горизонтальная линяя
     */
    public static line = () => new Control({tag: "hr"});

    /**
     * Пустой объект Control
     */
    public static empty = () => new Control();

    /**
     * Создает Control или объект elyControlObjectProtocol
     * @param obj
     */
    public static fromObject(obj: elyViewEntityProtocol): View {
        if (obj.line) return Control.line();
        const item = obj.item;
        if (item && window.elyflatobjects.hasOwnProperty(item)) {
            const opts = Utils.filter(obj, (k) => {
                return ["item"].indexOf(k) === -1;
            });
            const inst = new (window.elyflatobjects as any)[item](opts);
            if (inst instanceof View || typeof inst.getView === "function")
                return inst;
        }
        return Control.empty();
    }

    /**
     * Создает Control или объект elyControlObjectProtocol из JSON строки
     * @param json
     */
    public static fromJSON(json: string): View {
        return Control.fromObject(JSON.parse(json));
    }

    /**
     * Выполняет попытку мутировать obj в объект View.
     * Иначе возвращает пустой элемент.
     *
     *
     *     let obj = "Тест";
     *     let view = Control.tryMutateToView(obj);
     *
     *     typeOf view; // elyTextView
     *     view.text(); // "Тест"
     *
     *
     *
     * @param obj
     */
    public static tryMutateToView(obj: any): View {
        try {
            if (obj instanceof View) return obj;
            return String(obj).textView();
        } catch (e) {
            return Control.empty();
        }
    }

    /**
     * Дочерние элементы
     */
    private readonly __subviews: View[];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: ControlOptions = {}) {
        super(options);

        this.__subviews = [];
        if (options.subviews) this.addSubView(...options.subviews);
    }

    /**
     * Возвращает дочерние элементы
     */
    public getSubViews(): View[] {
        return this.__subviews;
    }

    /**
     * Добавляет элемент в элемент
     * @param views
     */
    public addSubView(...views: View[]): Control {
        views.forEach((view) => {
            if (view instanceof View) {
                this.__subviews.push(view);
                view.superview = this;
                this.notificate("addview", [view]);
                this.getDocument().appendChild(view.getDocument());
            } else {
                XLogger.default.error("В объект Control может быть добавлен только элемент " +
                    "реализующий протокол elyContentProtocol!");
            }
        });
        return this;
    }

    /**
     * Удаляет дочений элемент
     * @param view
     */
    public removeSubView(view: View): Control {
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
    public clearView(): Control {
        this.__subviews.splice(0, this.__subviews.length);
        this.__view.innerHTML = "";
        return this;
    }

    public removeViewContent(): View {
        this.__subviews.splice(0, this.__subviews.length);
        return super.removeViewContent();
    }

}
