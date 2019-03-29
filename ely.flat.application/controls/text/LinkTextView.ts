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
 + Файл: LinkTextViews                                                    +
 + Файл изменен: 08.02.2019 00:48:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import efSerializableProtocol from "../../protocols/efSerializableProtocol";
import TextView, {TextViewOptions} from "./TextView";

/**
 * Опции {@link TextView}
 */
export interface LinkTextViewOptions extends TextViewOptions {
    url: string;
}

/**
 * Текст с ссылкой
 * @class LinkTextView
 * @augments {TextView}
 */
export default class LinkTextView extends TextView implements efSerializableProtocol<LinkTextView> {
    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {LinkTextView}
     */
    public static deserialize<T>(raw: string): LinkTextView | null {
        return new LinkTextView(JSON.parse(raw));
    }

    /**
     * Свойство: адрес ссылки
     * @type {ObservableProperty<string>}
     */
    public readonly urlProperty: ObservableProperty<string>
        = new ObservableProperty<string>("#").change(value => {
        this.attribute("href", value);
    });

    /**
     * Конструктор
     * @param {LinkTextViewOptions} options
     */
    public constructor(options: LinkTextViewOptions = {url: "#"}) {
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
    public url(value: string): LinkTextView;

    /**
     * Возвращает и устанавливает адрес ссылки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public url(value?: string): string | null | LinkTextView {
        return ObservableProperty.simplePropertyAccess(this, value, this.urlProperty);
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
 * @typedef {TextViewOptions} LinkTextViewOptions
 * @property {string} [url = "#"]
 */
