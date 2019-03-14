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
 + Файл: View.ts                                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {
    deserialize,
    DeserializeData,
    deserializeWithData,
} from "../../ely.flat.application/protocols/efSerializableProtocol";
import elyObject from "../elyObject";
import elyOneActionEval from "../elyOneActionEval";
import {isSet, safeJsonParse, variableAndSet} from "../Guard";
import ObservableBoolean from "../observable/properties/ObservableBoolean";
import ObservableProperty from "../observable/properties/ObservableProperty";
import Utils from "../Utils";
import URLRequest from "../web/request/URLRequest";
import ViewCounter from "./viewCounter";

/**
 * Протокол сущности View
 */
export interface efViewEntityProtocol {

    /**
     * Элемент
     */
    item: string;

    /**
     * Линяя
     */
    line?: boolean;

    /**
     * Остальные ключи
     */
    [name: string]: any;
}

/**
 * Опции {@link View}
 */
export interface ViewOptions {
    /**
     * Стилевой класс
     */
    class?: string;

    /**
     * Флаг отображения
     */
    display?: string;

    /**
     * Отображение элемента
     */
    hidden?: boolean;

    /**
     * Флаг блокировки элемента
     */
    disabled?: boolean;

    /**
     * Однострочная функция
     *
     * См. {@link elyOneActionEval}
     */
    action?: string;

    /**
     * Стили
     */
    style?: { [key: string]: string };

    /**
     * Прозрачность элемента
     */
    opacity?: number;

    styleClickable?: boolean;
    styleNoSelect?: boolean;

    /**
     * Дополнительные опции
     */
    [prop: string]: any;
}

/**
 * Объект отображения
 * @class View
 * @abstract
 */
export default class View extends elyObject {

    /**
     * Создает пустой элемент View
     * @return {View}
     */
    public static empty(): View {
        return new View();
    }

    /**
     * Создает линюю
     * @return {View}
     */
    public static line(): View {
        return new View({tag: "hr"});
    }

    /**
     * Создает пустую строку <br>
     * @return {View}
     */
    public static breakLine(): View {
        return new View({tag: "br"});
    }

    /**
     * Преобразует объект в элемент View
     * @param {*} obj
     * @return {View|null}
     */
    public static fromObject(obj: efViewEntityProtocol): View | null {
        return deserialize<View>(obj);
    }

    /**
     * Преобразует строку в элемент View
     * @param {string} str
     * @return {View|null}
     */
    public static fromString(str: string): View | null {
        return View.fromObject(safeJsonParse(str));
    }

    /**
     * Загружает View объект через URL
     * @param {string} url - URL
     * @param {function(view: View | null, data: DeserializeData | null)} callback
     * @return {DeserializeData | null}
     */
    public static loadView(url: string, callback: (view: View | null, data: DeserializeData | null) => void) {
        new URLRequest({url}).send((response, result) => {
            if (result && response) {
                const data = deserializeWithData<View>(safeJsonParse(response));
                if (data) callback(data.object, data.data);
                else callback(null, null);
            } else {
                callback(null, null);
            }
        });
    }

    /**
     * Родитель элемента
     */
    public superview: View | null = null;

    /**
     * Элемент отображения
     */
    protected readonly __view: HTMLElement;

    /**
     * Идентификатор
     */
    protected __id: string | null = null;

    /**
     * Строка действия
     */
    protected __actionString: string = "";

    /**
     * Свойство: скрытие элемента
     * @ignore
     */
    private readonly hiddenProperty: ObservableBoolean;

    /**
     * Конструктор
     * @param {ViewOptions} options
     * @protected
     */
    protected constructor(options: ViewOptions = {}) {
        super();
        if (options.selector) this.__view = document.querySelector(options.selector);
        else if (options.element) this.__view = options.element;
        else this.__view = document.createElement(options.tag || "div");

        if (options.action) this.actionString(options.action);
        if (options.class) this.addClass(...options.class.split(" "));

        this.__view.onclick = (ev: any) => this.notificate("click", [ev]);
        this.__view.onmouseenter = (ev: MouseEvent) => this.notificate("mouseEnter", [ev]);
        this.__view.onmouseleave = (ev: MouseEvent) => this.notificate("mouseLeave", [ev]);

        if (options.style) this.css(options.style);
        this.addObserver("click", () => {
            if (this.__actionString !== "") elyOneActionEval.default.go(this.__actionString);
        });
        this.hiddenProperty = new ObservableBoolean(false);
        this.hiddenProperty.change(value => {
            if (this.getStyle().display && this.getStyle().display !== "none") {
                this.getDocument().hidden = value;
            } else {
                this.getStyle().display = value ? "none" : null;
            }
        });
        this.hidden(options.hidden || false);
        if (options.opacity) this.opacity(options.opacity);
        if (options.disabled) this.disabled(options.disabled);

        variableAndSet(options.styleClickable, this.styleClickable, this);
        variableAndSet(options.styleNoSelect, this.styleNoSelect, this);
        const wait = setInterval(() => {
            if (this.getRect().width) {
                clearInterval(wait);
                this.notificate("viewWillDraw", [this]);
            }
        }, 10);
    }

    /**
     * Возвращает флаг стиля невозможности выделения
     * @return {boolean}
     */
    public styleNoSelect(): boolean;

    /**
     * Устанавливает флаг стиля невозможности выделения
     * @param {boolean} value - значение
     * @return {this}
     */
    public styleNoSelect(value: boolean): View;

    /**
     * Возвращает и устанавливает флаг стиля невозможности выделения
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public styleNoSelect(value?: boolean): boolean | null | View {
        if (value === undefined) return this.hasClass("--no-select");
        if (value) this.addClass("--no-select");
        else this.removeClass("--no-select");
        return this;
    }

    /**
     * Возвращает флаг стиля "возможности нажатия"
     * @return {boolean}
     */
    public styleClickable(): boolean;

    /**
     * Устанавливает флаг стиля "возможности нажатия"
     * @param {boolean} value - значение
     * @return {this}
     */
    public styleClickable(value: boolean): View;

    /**
     * Возвращает и устанавливает флаг стиля "возможности нажатия"
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public styleClickable(value?: boolean): boolean | null | View {
        if (value === undefined) return this.hasClass("--clickable");
        if (value) this.addClass("--clickable");
        else this.removeClass("--clickable");
        return this;
    }

    public serialize(): any {
        const obj: any = {};
        if (this.styleClickable()) obj.styleClickable = this.styleClickable();
        if (this.styleNoSelect()) obj.styleNoSelect = this.styleNoSelect();
        return {_item: this.constructor.name, ...obj};
    }

    /**
     * Возвращает HTML элемент
     */
    public getDocument(): HTMLElement {
        return this.__view;
    }

    /**
     * Возвращает внутренний идентификатор элемента
     */
    public identifier(): string {
        if (!this.__id) {
            this.__id = ViewCounter.createIdentifierFor();
            this.attribute("id", this.__id);
        }
        return this.__id;
    }

    /**
     * Возвращает действие
     */
    public actionString(): string;

    /**
     * Устанавливает действие
     * @param action
     */
    public actionString(action: string): View;

    /**
     * Устанавливает или возвращает действие
     * @param action
     */
    public actionString(action?: string): View | string {
        if (action === undefined) return this.__actionString;
        this.__actionString = action;
        return this;
    }

    /**
     * Возвращает атррибут
     * @param name
     */
    public attribute(name: string): string | null;

    /**
     * Устанавливает или удаляет аттрибут
     * @param name
     * @param value
     */
    public attribute(name: string, value: string | null): View;

    /**
     * Устанавливает или возвращает атрибут.
     *
     * Для удаления атрибута, установите значение value как null.
     *
     * @param name
     * @param value
     */
    public attribute(name: string, value?: string | null): string | null | View {
        if (value === null) {
            this.getDocument().removeAttribute(name);
            return this;
        }
        if (value === undefined) {
            return this.getDocument().getAttribute(name);
        }
        this.getDocument().setAttribute(name, value);
        return this;
    }

    /**
     * Добавляет класс
     * @param className - имя класса стилей или кортеж имен
     *
     *
     *     let obj = new Control();
     *     obj.addClass("animate");
     *     obj.addClass("go");
     *
     *     // Или
     *
     *     obj.addClass("animate", "go");
     *
     *
     */
    public addClass(...className: string[]): View {
        this.getDocument().classList.add(...className);
        return this;
    }

    /**
     * Возвращает true, если содержит класс
     * @param className - имя класса стилей
     */
    public hasClass(className: string): boolean {
        return this.getDocument().classList.contains(className);
    }

    /**
     * Удаляет класс
     * @param className - имя класса стилей
     */
    public removeClass(className: string): View {
        this.getDocument().classList.remove(className);
        return this;
    }

    /**
     * Удаляет или добавляет класс
     * @param {string} className
     * @return {this}
     */
    public toggleClass(className: string): View {
        if (this.hasClass(className)) this.removeClass(className);
        else this.addClass(className);
        return this;
    }

    /**
     * Возвращает скрытие элемента
     */
    public hidden(): boolean;

    /**
     * Устанавливает скрытие элемента
     */
    public hidden(value: boolean): View;

    /**
     * Возвращает и устанавливает скрытие элемента
     */
    public hidden(value?: boolean): boolean | null | View {
        if (isSet(value)) this.notificate("hidden", [value]);
        return ObservableProperty.simplePropertyAccess(this, value, this.hiddenProperty);
    }

    /**
     * Устанавливает css значение
     * @param style
     */
    public css(style: { [key: string]: any }): View {
        Utils.forEach(style, (k, v) => {
            const pattern = /([+-]=)?(.+)(px|%|rem)/;
            const res = pattern.exec(v.toString());
            if (res && res[1]) {
                if (res[1] === "+=") {
                    v = parseFloat(/(.+)(px|%)/.exec(this.getDocument().style[k] || "0")![1])
                        + parseFloat(res[2]) + res[3];
                } else if (res[1] === "-=") {
                    v = parseFloat(/(.+)(px|%)/.exec(this.getDocument().style[k] || "0")![1])
                        - parseFloat(res[2]) + res[3];
                }
            }
            this.getDocument().style[k] = v;
        });
        return this;
    }

    /**
     * Возвращает стили элемента
     */
    public getStyle(): CSSStyleDeclaration;

    /**
     * Возвращает параметр стиля элемента
     * @param name - имя параметра
     */
    public getStyle(name: string): string | null;

    /**
     * Возвращает параметр стиля или все стили элемента,
     * если значение  name не установлено.
     * @param name
     */
    public getStyle(name?: string): CSSStyleDeclaration | string | null {
        if (name === undefined) return this.getDocument().style;
        return this.getStyle()[name as any];
    }

    /**
     * Возвращает данные положения и размера объекта
     */
    public getRect(): DOMRect | ClientRect {
        return this.getDocument().getBoundingClientRect();
    }

    /**
     * Устанавливает или возвращает высоту
     * @param value
     */
    public height(value?: number | string): number | View {
        if (value === undefined) {
            return this.getDocument().getBoundingClientRect().height;
        }
        if (typeof value === "number") value = `${value}px`;
        this.css({height: value});
        return this;
    }

    /**
     * Устанавливает или возвращает ширину
     * @param value
     */
    public width(value?: number | string): number | View {
        if (value === undefined) {
            return this.getDocument().getBoundingClientRect().width;
        }
        if (typeof value === "number") value = `${value}px`;
        this.css({width: value});
        return this;
    }

    /**
     * Возвращает прозрачность элемента
     */
    public opacity(): number;

    /**
     * Устанавливает прозрачность элемента
     * @param value
     */
    public opacity(value: number): View;

    /**
     * Устанавливает или возвращает прозрачность
     * @param value
     */
    public opacity(value?: number): number | null | View {
        if (value === undefined) return parseFloat(this.getStyle("opacity") || "1");
        return this.css({opacity: value.toString()});
    }

    /**
     * Устанавливает фокус на объект
     */
    public makeFirstResponder(): View {
        this.getDocument().focus();
        return this;
    }

    /**
     * Размывает объект
     */
    public blur(): View {
        this.getDocument().blur();
        return this;
    }

    /**
     * Запускает анимацию css
     * @param animationName
     * @param completion
     */
    public animateCss(animationName: string, completion?: () => void) {
        const animationEnd = ((el) => {
            const animations = {
                MozAnimation: "mozAnimationEnd",
                OAnimation: "oAnimationEnd",
                WebkitAnimation: "webkitAnimationEnd",
                animation: "animationend",
            };

            for (const t in animations) {
                if (el.style[t as any] !== undefined) {
                    // @ts-ignore
                    return animations[t];
                }
            }
        })(document.createElement("div"));

        this.addClass("animated", animationName);
        const animationCallback = () => { // This is the fix
            this.removeClass("animated");
            this.removeClass(animationName);

            // this is the main part of the fix
            this.getDocument().removeEventListener(animationEnd, animationCallback);
            if (completion) completion();
            this.notificate("animate-css-" + animationName);
        }; // End fix
        this.getDocument().addEventListener(animationEnd, animationCallback);

        return this;
    }

    /**
     * Анимация повяления
     * @param completion - обработчик завершения анимации
     */
    public fadeIn(completion?: () => void): View {
        this.hidden(false);
        this.animateCss("fadeIn", () => {
            if (completion) completion();
            this.notificate("fadedIn", [this]);
        });
        return this;
    }

    /**
     * Анимация исчезания
     * @param completion - обработчик завершения анимации
     */
    public fadeOut(completion?: () => void): View {
        this.animateCss("fadeOut", () => {
            this.hidden(true);
            if (completion) completion();
            this.notificate("fadedOut", [this]);
        });
        return this;
    }

    /**
     * Возвращает абсолютные размеры (без отступов)
     * @return {{width: number, height: number}}
     *
     * @deprecated
     */
    public offSize() {
        return {width: this.getDocument().offsetWidth, height: this.getDocument().offsetHeight};
    }

    /**
     * Удаляет содержимое view
     */
    public removeViewContent(): View {
        this.getDocument().innerHTML = "";
        return this;
    }

    /**
     * Удаляет все применененные стили
     */
    public removeStyles(): View {
        return this.attribute("style", null) as View;
    }

    /**
     * Удаляет все аттрибуты элемента
     */
    public removeAttributes(): View {
        for (const attr in this.getDocument().attributes) {
            if (this.getDocument().getAttribute(attr))
                this.getDocument().removeAttribute(attr);
        }
        return this;
    }

    /**
     * Полностью очищает элемент view
     *
     * - {@link View.removeViewContent}
     * - {@link View.removeStyles}
     * - {@link View.removeAttributes}
     */
    public clearView(): View {
        this.removeViewContent();
        this.removeStyles();
        this.removeAttributes();
        return this;
    }

    /**
     * Утанавливает подсказку
     * @param {String} hint - подсказка
     * @return {View}
     */
    public hint(hint?: string): View | string {
        const selector = this.getDocument().querySelector(".ef-hint");
        if (typeof hint === "string") {
            if (selector) {
                selector.innerHTML = hint;
            } else {
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
     * Возвращает доступность элемента
     */
    public disabled(): boolean;

    /**
     * Устанавливает доступность элемента
     * @param bool
     */
    public disabled(bool: boolean): View;

    /**
     * Устанавливает или возвращает доступность элемента
     * @param bool
     */
    public disabled(bool?: boolean): View | boolean {
        if (bool === undefined) return (this.attribute("disabled") || null) === "disabled";
        return this.attribute("disabled", bool ? "disabled" : null) as View;
    }

    /**
     * Удаляет элемент
     */
    public removeFromSuperview(): View {
        if (this.getDocument().parentNode !== null) {
            this.getDocument().parentNode!.removeChild(this.getDocument());
        }
        return this;
    }

    /**
     * Добавляет слушатель изменения
     * @param closure
     */
    public resize(closure: (view: View, maxWidth: number, maxHeight: number) => void): View {
        const bd = window.document.body;
        window.addEventListener("resize", () => {
            closure(this, bd.clientWidth, bd.clientHeight);
        });
        closure(this, bd.clientWidth, bd.clientHeight);
        return this;
    }

    /**
     * Добавляет наблюдатель: нажатие на объект
     *
     * Имя обсервера: click
     *
     * @param {function(e: MouseEvent)} o - наблюдатель
     */
    public addClickObserver(o: (e: MouseEvent) => void): View {
        this.addObserver("click", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: мыш наведена на объект
     *
     * Имя обсервера: mouseEnter
     *
     * @param {function(e: MouseEvent)} o - наблюдатель
     */
    public addMouseEnterObserver(o: (e: MouseEvent) => void): View {
        this.addObserver("mouseEnter", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: мыш наведена на объект
     *
     * Имя обсервера: mouseLeave
     *
     * @param {function(e: MouseEvent)} o - наблюдатель
     */
    public addMouseLeaveObserver(o: (e: MouseEvent) => void): View {
        this.addObserver("mouseLeave", o);
        return this;
    }

    /**
     * Добавляет далюдатель: скрытие элемента
     *
     * Имя обсервера: hidden
     *
     * @param {function(hidden: boolean)} o - наблюдатель
     */
    public addHiddenChangeObserver(o: (hidden: boolean) => void): View {
        this.addObserver("hidden", o);
        return this;
    }

    protected elyViewWillDraw(o: (view: View) => void): void {
        this.addObserver("viewWillDraw", o);
    }
}

/**
 * @typedef {Object} ViewOptions
 * @typedef {string} [class]
 * @typedef {string} [display]
 * @typedef {boolean} [hidden]
 * @typedef {boolean} [disabled]
 * @typedef {number} [opacity]
 * @typedef {boolean} [styleClickable]
 * @typedef {boolean} [styleNoSelect]
 */
