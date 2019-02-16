/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 +                                                                            +
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
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: efTextArea.ts                                                        +
 + Файл изменен: 09.02.2019 21:45:17                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {efField, efFieldOptions} from "@controls/input/efField";
import elyGuard from "@core/elyGuard";

/**
 * Опции {@link efTextArea}
 */
export interface efTextAreaOptions extends efFieldOptions<string> {
    rowsCount?: number;
    readonly?: boolean;
}

/**
 * Поле воода многострочного текста
 * @class efTextArea
 * @augments {efTextField}
 */
export class efTextArea extends efField<string> {

    /**
     * Конструктор
     * @param {efTextAreaOptions} options - опции
     */
    public constructor(options: efTextAreaOptions = {}) {
        super(options);
        this.addClass("ef-textarea");
        this.getAccessory().onchange = () => this.value(this.getAccessory().value);
        this.getAccessory().oninput = (e: any) => this.notificate("input", [this.getAccessory().value, e]);

        this.valueProperty.change((value) => this.getAccessory().value = value);

        this.rowsCount(5);
        elyGuard.variable<string>(options.value, (v) => this.value(v));
        elyGuard.variable<number>(options.rowsCount, (v) => this.rowsCount(v));
        elyGuard.variable<boolean>(options.readonly, (v) => this.readonly(v));
    }

    /**
     * Возвращает элемент доступа
     */
    public getAccessory(): HTMLTextAreaElement | any {
        return this.__accessoryView;
    }

    /**
     * Возвращает количество строк
     * @return {number}
     */
    public rowsCount(): number;

    /**
     * Устанавливает количество строк
     * @param {number} value - значение
     * @return {this}
     */
    public rowsCount(value: number): efTextArea;

    /**
     * Возвращает и устанавливает количество строк
     * @param {number} [value] - значение
     * @returns {number|this|null}
     */
    public rowsCount(value?: number): number | null | efTextArea {
        if (value === undefined) return this.getAccessory().rows;
        this.getAccessory().rows = value;
        return this;
    }

    /**
     * Возвращает флаг разрешающий только чтение
     * @return {boolean}
     */
    public readonly(): boolean;

    /**
     * Устанавливает флаг разрешающий только чтение
     * @param {boolean} value - значение
     * @return {this}
     */
    public readonly(value: boolean): efTextArea;

    /**
     * Возвращает и устанавливает флаг разрешающий только чтение
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public readonly(value?: boolean): boolean | null | efTextArea {
        if (value === undefined) return this.getAccessory().readOnly;
        this.getAccessory().readOnly = value;
        return this;
    }

    /**
     * Добавляет наблюдатель: ввод текста
     *
     * Имя обсервера: input
     *
     * @param {function(value: string, e: Event)} o - наблюдатель
     */
    public addInputObserver(o: (value: string, e: Event) => void): efTextArea {
        this.addObserver("input", o);
        return this;
    }

    /**
     * Пролистывает поле ввода многострочного текста до конца
     * @return {this}
     */
    public scrollToBottom(): efTextArea {
        this.getAccessory().scrollTop = this.getAccessory().scrollHeight;
        return this;
    }

    /**
     * Фабрикует элемент доступа
     * @private
     * @ignore
     */
    protected __createAccessory(): HTMLInputElement {
        return new elyControl({tag: "textarea"}).getDocument() as HTMLInputElement;
    }
}

/**
 * @typedef {efTextFieldOptions} efTextAreaOptions
 * @property {number} [rowsCount = 5]
 * @property {string} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 * @property {boolean} [readonly = false]
 */
