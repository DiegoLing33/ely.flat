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
 + Файл: elyView.ts                                                           +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewCounter from "@core/controls/elyViewCounter";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyObject from "@core/elyObject";
import elyOneActionEval from "@core/elyOneActionEval";
import elyUtils from "@core/elyUtils";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

/**
 * Объект отображения
 * @class elyView
 * @abstract
 */
export default abstract class elyView extends elyObject {

    /**
     * Родитель элемента
     */
    public superview: elyView | null = null;

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
    private readonly hiddenProperty: elyObservableProperty<boolean>;

    /**
     * Конструктор
     * @param options
     */
    protected constructor(options: elyViewOptions = {}) {
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
        this.hiddenProperty = new elyObservableProperty<boolean>(false);
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

        const wait = setInterval(() => {
            if (this.getRect().width) {
                clearInterval(wait);
                this.notificate("viewWillDraw", [this]);
            }
        }, 10);
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
            this.__id = elyViewCounter.createIdentifierFor(this);
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
    public actionString(action: string): elyView;

    /**
     * Устанавливает или возвращает действие
     * @param action
     */
    public actionString(action?: string): elyView | string {
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
    public attribute(name: string, value: string | null): elyView;

    /**
     * Устанавливает или возвращает атрибут.
     *
     * Для удаления атрибута, установите значение value как null.
     *
     * @param name
     * @param value
     */
    public attribute(name: string, value?: string | null): string | null | elyView {
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
     *     let obj = new elyControl();
     *     obj.addClass("animate");
     *     obj.addClass("go");
     *
     *     // Или
     *
     *     obj.addClass("animate", "go");
     *
     *
     */
    public addClass(...className: string[]): elyView {
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
    public removeClass(className: string): elyView {
        this.getDocument().classList.remove(className);
        return this;
    }

    /**
     * Удаляет или добавляет класс
     * @param {string} className
     * @return {this}
     */
    public toggleClass(className: string): elyView {
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
    public hidden(value: boolean): elyView;

    /**
     * Возвращает и устанавливает скрытие элемента
     */
    public hidden(value?: boolean): boolean | null | elyView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.hiddenProperty);
    }

    /**
     * Устанавливает css значение
     * @param style
     */
    public css(style: { [key: string]: any }): elyView {
        elyUtils.forEach(style, (k, v) => {
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
    public height(value?: number | string): number | elyView {
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
    public width(value?: number | string): number | elyView {
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
    public opacity(value: number): elyView;

    /**
     * Устанавливает или возвращает прозрачность
     * @param value
     */
    public opacity(value?: number): number | null | elyView {
        if (value === undefined) return parseFloat(this.getStyle("opacity") || "1");
        return this.css({opacity: value.toString()});
    }

    /**
     * Устанавливает фокус на объект
     */
    public makeFirstResponder(): elyView {
        this.getDocument().focus();
        return this;
    }

    /**
     * Размывает объект
     */
    public blur(): elyView {
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
    public fadeIn(completion?: () => void): elyView {
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
    public fadeOut(completion?: () => void): elyView {
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
    public removeViewContent(): elyView {
        this.getDocument().innerHTML = "";
        return this;
    }

    /**
     * Удаляет все применененные стили
     */
    public removeStyles(): elyView {
        return this.attribute("style", null) as elyView;
    }

    /**
     * Удаляет все аттрибуты элемента
     */
    public removeAttributes(): elyView {
        for (const attr in this.getDocument().attributes) {
            if (this.getDocument().getAttribute(attr))
                this.getDocument().removeAttribute(attr);
        }
        return this;
    }

    /**
     * Полностью очищает элемент view
     *
     * - {@link elyView.removeViewContent}
     * - {@link elyView.removeStyles}
     * - {@link elyView.removeAttributes}
     */
    public clearView(): elyView {
        this.removeViewContent();
        this.removeStyles();
        this.removeAttributes();
        return this;
    }

    /**
     * Утанавливает подсказку
     * @param {String} hint - подсказка
     * @return {elyView}
     */
    public hint(hint?: string): elyView | string {
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
    public disabled(bool: boolean): elyView;

    /**
     * Устанавливает или возвращает доступность элемента
     * @param bool
     */
    public disabled(bool?: boolean): elyView | boolean {
        if (bool === undefined) return (this.attribute("disabled") || null) === "disabled";
        return this.attribute("disabled", bool ? "disabled" : null) as elyView;
    }

    /**
     * Удаляет элемент
     */
    public removeFromSuperview(): elyView {
        if (this.getDocument().parentNode !== null) {
            this.getDocument().parentNode!.removeChild(this.getDocument());
        }
        return this;
    }

    /**
     * Добавляет слушатель изменения
     * @param closure
     */
    public resize(closure: (view: elyView, maxWidth: number, maxHeight: number) => void): elyView {
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
    public addClickObserver(o: (e: MouseEvent) => void): elyView {
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
    public addMouseEnterObserver(o: (e: MouseEvent) => void): elyView {
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
    public addMouseLeaveObserver(o: (e: MouseEvent) => void): elyView {
        this.addObserver("mouseLeave", o);
        return this;
    }

    protected elyViewWillDraw(o: (view: elyView) => void): void {
        this.addObserver("viewWillDraw", o);
    }
}
