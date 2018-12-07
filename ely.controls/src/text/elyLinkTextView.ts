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
 + Файл: elyLinkTextView.ts                                                   +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyTextViewOptions from "../options/elyTextViewOptions";
import elyTextView from "./elyTextView";

/**
 * Элемент отображения: Текст ссылкой
 * @version 1.0
 * @class elyLinkTextView
 */
@designable("url", elyDesignableFieldState.GETSET, "string")
@designable("text", elyDesignableFieldState.GETSET)
export default class elyLinkTextView extends elyTextView {

    /**
     * Свойство ссылки
     */
    public readonly urlProperty: elyObservableProperty<string>;

    /**
     * Конструктор
     * @param {elyTextViewOptions|url:String} options
     */
    public constructor(options: elyTextViewOptions & { url?: string } = {}) {
        super({tag: "a", ...options});

        this.urlProperty = new elyObservableProperty<string>();
        this.urlProperty.addChangeObserver((oldValue, newValue) => {
            this.attribute("href", newValue);
        });

        if (options.url) this.url(options.url);
        else this.url("#");
    }

    /**
     * Возвращает URL
     */
    public url(): string;

    /**
     * Устанавливает URL
     * @param url
     */
    public url(url: string): elyLinkTextView;

    /**
     * Устанавливает или возвращает URL
     * @param value
     */
    public url(value?: string): elyTextView | string {
        return elyObservableProperty.simplePropertyAccess(this, value, this.urlProperty);
    }
}
