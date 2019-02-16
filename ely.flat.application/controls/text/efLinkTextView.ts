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
 + Файл: efLinkTextView.ts                                                    +
 + Файл изменен: 08.02.2019 00:48:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efTextView, efTextViewOptions} from "@controls/text/efTextView";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import efSerializableProtocol from "@protocols/efSerializableProtocol";

/**
 * Опции {@link efTextView}
 */
export interface efLinkTextViewOptions extends efTextViewOptions {
    url: string;
}

/**
 * Текст с ссылкой
 * @class efLinkTextView
 * @augments {efTextView}
 */
export class efLinkTextView extends efTextView implements efSerializableProtocol<efLinkTextView> {
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {efLinkTextView}
     */
    public static deserialize<T>(raw: string): efLinkTextView | null {
        return new efLinkTextView(JSON.parse(raw));
    }

    /**
     * Свойство: адрес ссылки
     * @type {elyObservableProperty<string>}
     */
    public readonly urlProperty: elyObservableProperty<string>
        = new elyObservableProperty<string>("#").change(value => {
        this.attribute("href", value);
    });

    /**
     * Конструктор
     * @param {efLinkTextViewOptions} options
     */
    public constructor(options: efLinkTextViewOptions = {url: "#"}) {
        super(options);
        this.url(options.url);
    }

    /**
     * Возвращает адрес ссылки
     * @returns {string}
     */
    public url(): string;

    /**
     * Устанавливает адрес ссылки
     * @param {string} value - значение
     * @returns {this}
     */
    public url(value: string): efLinkTextView;

    /**
     * Возвращает и устанавливает адрес ссылки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public url(value?: string): string | null | efLinkTextView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.urlProperty);
    }

    /**
     * Сериализует объект
     * @return {string}
     */
    public serialize(): string {
        return JSON.stringify({
            text: this.text(),
            textCenter: this.textCenter(),
            textSize: this.textSize().value,
            textStyle: this.textStyle().value,
            textWeight: this.textWeight().value,
            url: this.url(),
        });
    }
}

/**
 * @typedef {efTextViewOptions} efLinkTextViewOptions
 * @property {string} [url = "#"]
 */
