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
 + Файл: elyField.ts                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyFieldProtocol from "@controls/protocols/elyFieldProtocol";
import elyIconView from "@controls/text/elyIconView";
import elyView from "@core/controls/elyView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyFieldOptions from "@options/fields/elyFieldOptions";

/**
 * Элемент: Поле ввода <T>
 *     @class elyField
 *     @augments elyFieldProtocol
 */
@designable("editable", elyDesignableFieldState.GETSET, "boolean")
@designable("placeholder", elyDesignableFieldState.SET, "string")
@designable("hint", elyDesignableFieldState.GETSET, "string")
@designable("value", elyDesignableFieldState.GETSET, "string")
export default abstract class elyField<T> extends elyFieldProtocol<T> {

    /**
     * Возвращает true, если объект elyField
     * @param view
     */
    public static isField<T>(view: elyView): view is elyField<T> {
        return view instanceof elyField;
    }

    /**
     * Элемент доступа
     */
    public readonly accessoryView: elyFieldProtocol<any> | any;

    /**
     * Разрешить активацию по двойному клику
     */
    public acceptDoubleClickActivation: boolean;

    /**
     * Элемент: Иконка активации (Правая сторона поля)
     */
    public readonly actionIconView: elyIconView;

    /**
     * Ручная валидация
     */
    protected manualValidation: ((input: T) => boolean) | undefined;

    /**
     * Группа элементов для ввода
     */
    protected readonly fieldLineView: elyControl;

    /**
     * Стандартное значение из опций
     */
    private readonly __defaultValue: T | undefined;

    /**
     * Таймер выделения
     */
    private __markTimer: any | null = null;

    /**
     * Конструктор
     * @param options
     * @param accessory
     */
    protected constructor(options: elyFieldOptions<T> = {}, accessory: elyFieldProtocol<any>) {
        super();
        this.addClass("ef-control", "ef-control-opacity");
        this.fieldLineView = new elyControl({class: "ef-input-group"});
        this.accessoryView = accessory;
        this.actionIconView = new elyIconView({class: "ef-input-status"});
        this.acceptDoubleClickActivation = true;
        this.actionIconView.hidden(true);

        if (options.actionIcon) {
            this.actionIconView.iconName(options.actionIcon).hidden(false);
        }

        this.fieldLineView.addSubView(this.accessoryView);
        this.fieldLineView.addSubView(this.actionIconView);
        this.getDocument().appendChild(this.fieldLineView.getDocument());

        this.actionIconView.getDocument().onclick = () => {
            this.notificate("actionClick");
            this.actionIconDidClick();
        };
        this.getDocument().ondblclick = () => {
            if (this.acceptDoubleClickActivation)
                this.actionIconDidClick();
        };
        if (options.hint) this.hint(options.hint);
    }

    /**
     * Стандартное значение
     */
    public defaultValue(): T {
        // @ts-ignore
        return this.__defaultValue === undefined ? null : this.__defaultValue;
    }

    /**
     * Устанавливает ручной обработчик
     * @param closure
     */
    public setManualValidation(closure: (value: T) => boolean): elyField<T> {
        this.manualValidation = closure;
        return this;
    }

    /**
     * Помечает поле, как ошибочное.
     *
     * Отметка выполняется графически, применяя класс
     * `error` к классу `ef-input-group`.
     *
     * @param flag
     */
    public error(flag: boolean = true): elyField<T> {
        if (this.__markTimer) {
            clearTimeout(this.__markTimer);
        }
        if (flag) {
            this.fieldLineView.addClass("error");
            this.__markTimer = setTimeout(() => {
                this.error(false);
                this.__markTimer = null;
            }, 1500);
        } else {
            this.fieldLineView.removeClass("error");
        }
        return this;
    }

    /**
     * Утанавливает подсказку
     * @param {String} hint - подсказка
     * @return {elyView}
     */
    public hint(hint?: string): elyField<T> | string {
        const selector = this.getDocument().querySelector(".ef-hint");
        if (typeof hint === "string") {
            if (selector) {
                selector.innerHTML = hint;
            } else {
                this.fieldLineView.css({"margin-bottom": "15px"});
                const hintView = document.createElement("div");
                hintView.classList.add("ef-hint");
                hintView.innerText = hint;
                this.getDocument().appendChild(hintView);
            }
            return this;
        } else {
            if (selector) return selector.innerHTML;
            return "";
        }
    }

    /**
     * Устанавливает подсказку для ввода
     * @param text
     */
    public placeholder(text: string): elyField<T> {
        this.accessoryView.placeholder(text);
        return this;
    }

    /**
     * Проверяет валидость данных
     */
    public isValidData(): boolean {
        if (this.manualValidation) return this.manualValidation(this.value());
        return true;
    }

    /**
     * Обработчик нажатия на иконку активации
     */
    protected actionIconDidClick() {
        // Nothing is done
    }
}
