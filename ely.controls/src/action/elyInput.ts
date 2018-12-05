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
 + Файл: elyInput.ts                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFieldOptions from "ely.controls/src/options/fields/elyFieldOptions";
import elyFieldType from "../enums/elyFieldType";
import elyFieldProtocol from "../protocols/elyFieldProtocol";

/**
 * Элемент: Элемент ввода текст
 * @version 1.0
 */
export default class elyInput extends elyFieldProtocol<string> {

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyFieldOptions<string> & {type?: elyFieldType | string} = {}) {
        super({tag: options.tag || "input", class: "ef-input", ...options});
        this.valueProperty.addChangeObserver((oldValue, newValue) => this.getDocument().value = newValue);
        this.getDocument().onchange = () => this.value(this.getDocument().value);
        this.editableProperty.addChangeObserver((oldValue, newValue) => this.getDocument().disabled = !newValue);
        if (options.type) this.attribute("type", options.type.toString());
        this.applyProtocolOptions(options);
        this.getDocument().oninput = () => this.notificate("input", [this.getDocument().value]);
    }

    /**
     * Возвращает исходной элемент
     */
    public getDocument(): HTMLInputElement {
        return this.__view as HTMLInputElement;
    }

    /**
     * Возвращает значение по умолчанию
     */
    public defaultValue(): string {
        return "";
    }

    /**
     * Возвращает true, если значение пустое
     */
    public isEmpty(): boolean {
        return this.value() === "";
    }

    /**
     * Добавляет слушатель изменения поля
     * @param observer
     */
    public addInputObserver(observer: (value: string) => void): elyInput {
        this.addObserver("input", observer);
        return this;
    }

    public isValidData(): boolean {
        return true;
    }
}
