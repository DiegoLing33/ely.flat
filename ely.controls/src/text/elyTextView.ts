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
 + Файл: elyTextView.ts                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyTextViewEditable from "@controls/text/elyTextViewEditable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyView from "ely.core/src/controls/elyView";
import {designable, elyDesignableFieldState} from "ely.core/src/elyDesignable";
import elyControl from "../action/elyControl";
import elySize from "../enums/elySize";
import elyWeight from "../enums/elyWeight";
import elyTextViewOptions from "../options/elyTextViewOptions";

/**
 * Элемент отображения: Текст
 *
 * Объект соответствует стандарту: EPS4
 */
@designable("text", elyDesignableFieldState.GETSET, "text")
@designable("textCenter", elyDesignableFieldState.GETSET, "boolean")
@designable("textSize", elyDesignableFieldState.GETSET, "number|string", elySize.rawList())
@designable("textWeight", elyDesignableFieldState.GETSET, "number|string", elyWeight.rawList())
@designable("iconName", elyDesignableFieldState.GETSET)
@designable("setIconPosition", elyDesignableFieldState.SET, "string", {
    left:  elyTextView.iconLeft,
    right: elyTextView.iconRight,
})
export default class elyTextView extends elyControl {

    /**
     * Константа положения иконки: лево
     */
    public static readonly iconLeft: string = "left";

    /**
     * Константа положения иконки: право
     */
    public static readonly iconRight: string = "right";

    /**
     * Возвращает интерактивный элемент
     * @param textView
     */
    public static editable(textView: elyTextView): elyTextViewEditable {
        return new elyTextViewEditable({textView});
    }

    /**
     * Выполняет попытку мутировать obj в объект elyTextView.
     * Иначе возвращает пустой элемент.
     *
     *
     *     let obj = "Тест";
     *     let view = elyTextView.tryMutate(obj);
     *
     *     typeOf view; // elyTextView
     *     view.text(); // "Тест"
     *
     *
     *
     * @param obj
     */
    public static tryMutate(obj: any): elyTextView {
        try {
            if (obj instanceof elyView) {
                if (obj instanceof elyTextView) return obj;
                return obj.getDocument().innerText.textView();
            } else return String(obj).textView();
        } catch (e) {
            return new elyTextView();
        }
    }

    /**
     * Фильтрует строку
     * @param str
     */
    public static filterString(str: string): string {
        return str.replace(/\*([^*]+)\*/g, "<b>$1</b>")
            .replace(/\(link:([^)]+)\){([^}]+)}/g, "<a href='$1'>$2</a>")
            .replace(/\(action:([^{]+)\){([^}]+)}/g, "<a href='#' onclick='ely.oneAction.go(\"$1\")'>$2</a>")
            .replace(/{nl}/g, "<br>");
    }

    /**
     * Свойство: Текст
     */
    public readonly textProperty: elyObservableProperty<string>;

    /**
     * Свойство: Иконка
     */
    public readonly iconNameProperty: elyObservableProperty<string>;

    /**
     * Отображение текста
     * @ignore
     */
    protected readonly textContentView: elyControl;

    /**
     * Отображение иконки
     * @ignore
     */
    protected readonly iconView: elyControl;

    /**
     * Свойство: размер текста
     * @ignore
     */
    protected readonly textSizeProperty: elyObservableProperty<elySize>;

    /**
     * Свойство: толщина текста
     * @ignore
     */
    protected readonly textWeightProperty: elyObservableProperty<number>;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyTextViewOptions = {}) {
        super(options);
        this.addClass("ef-text");

        this.textContentView = new elyControl({tag: "span", class: "content"});
        this.iconView        = new elyControl({tag: "span"});

        this.addSubView(this.iconView);
        this.addSubView(this.textContentView);
        this.iconView.hidden(true);

        this.textProperty = new elyObservableProperty<string>("").change((value) =>
            this.textContentView.getDocument().innerHTML = elyTextView.filterString(value));

        this.textSizeProperty = new elyObservableProperty<elySize>().change((newValue, oldValue) => {
            if (oldValue && !oldValue.custom) this.removeClass(`ts-${oldValue.value}`);
            if (oldValue && oldValue.custom) this.css({"font-size": null});
            if (newValue.custom) {
                this.css({"font-size": newValue.value});
            } else {
                this.addClass(`ts-${newValue.value}`);
            }
        });

        this.textWeightProperty = new elyObservableProperty<number>(elyWeight.default.value)
            .change(value => {
                return this.css({"font-weight": value});
            });

        this.iconNameProperty = new elyObservableProperty<string>("")
            .change((value) => {
                if (value) {
                    this.iconView.attribute("class", `fa fa-${value}`);
                    this.iconView.hidden(false);
                } else this.iconView.hidden(true);
            });

        if (options.text) this.text(options.text);
        if (options.iconName) this.iconName(options.iconName);
        if (options.textSize) this.textSize(options.textSize);
        if (options.textWeight) this.textWeight(options.textWeight);
        if (options.textCenter) this.textCenter(options.textCenter);
    }

    /**
     * Возвращает true, если текст выравнен по центру
     */
    public textCenter(): boolean;

    /**
     * Устанавливает выравнивание текста по центру
     * @param bool
     */
    public textCenter(bool: boolean): elyTextView;

    /**
     * Устанавливает выравнивание текста по середине
     */
    public textCenter(bool?: boolean): boolean | elyTextView {
        if (bool === undefined) return this.getStyle().textAlign === "center";
        this.getStyle().textAlign = bool === true ? "center" : null;
        return this;
    }

    /**
     * Возвращает размер текста
     */
    public textSize(): elySize;

    /**
     * Устанавливает размер текста
     */
    public textSize(value: elySize | string | number): elyTextView;

    /**
     * Возвращает и устанавливает размер текста
     */
    public textSize(value?: elySize | string | number): elySize | null | elyTextView {
        if (value !== undefined) {
            if (typeof value === "string") {
                if (/^([A-z]+)$/.test(value)) value = elySize.byName(value);
                else {
                    value = elySize.custom(value);
                }
            } else if (typeof value === "number") value = elySize.custom(value + "px");
        }
        return elyObservableProperty.simplePropertyAccess(this, value, this.textSizeProperty);
    }

    /**
     * Устанавливает толщину текста
     * @param weight
     *
     * Используемые константы: {@link elyWeight}
     */
    public textWeight(weight?: elyWeight | number): elyTextView {
        if (weight) {
            // @ts-ignore
            weight = weight.toString();
        }
        return elyObservableProperty.simplePropertyAccess(this, weight, this.textWeightProperty);
    }

    /**
     * Устанавливает или возвращает текст
     * @param value
     */
    public text(value?: string): string | elyTextView | any {
        return elyObservableProperty.simplePropertyAccess(this, value, this.textProperty);
    }

    /**
     * Название иконки
     * @param value
     */
    public iconName(value?: string): string | elyTextView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.iconNameProperty);
    }

    /**
     * Устанавливает положение икноки
     * - {@link elyTextView.iconLeft}
     * - {@link elyTextView.iconRight}
     *
     * @param position
     */
    public setIconPosition(position: string): elyTextView {
        this.removeSubView(this.textContentView);
        this.removeSubView(this.iconView);

        if (position === elyTextView.iconRight) {
            this.addSubView(this.textContentView);
            this.addSubView(this.iconView);
        } else if (position === elyTextView.iconLeft) {
            this.addSubView(this.iconView);
            this.addSubView(this.textContentView);
        } else {
            this.addSubView(this.iconView);
            this.addSubView(this.textContentView);
        }
        return this;
    }
}
