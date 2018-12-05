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
 + Файл: elyImageView.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyImageViewOptions from "@options/elyImageViewOptions";

/**
 * Элемент отображения: Изображение
 * @version 1.0
 *
 * Events:
 * - loaded: Изображение загружено
 */
@designable("url", elyDesignableFieldState.GETSET, "string")
export default class elyImageView extends elyView {

    /**
     * Путь до изображения
     */
    public readonly urlProperty: elyObservableProperty<string>;

    /**
     * Конструтор
     * @param options
     */
    public constructor(options: elyImageViewOptions = {}) {
        super({tag: "img", ...options});
        this.urlProperty = new elyObservableProperty<string>(null);
        this.getDocument().onload = (e: any) => this.notificate("loaded", [e]);
        this.urlProperty.addChangeObserver((oldValue, newValue) => {
            this.getDocument().src = newValue;
        });
        if (options.url) this.url(options.url);
    }

    /**
     * Устанавливает или возвращает ссылку на изображение
     * @param str
     */
    public url(str?: string): string | null | elyImageView {
        return elyObservableProperty.simplePropertyAccess(this, str, this.urlProperty);
    }

    /**
     * Возвращает корневой элемент
     */
    public getDocument(): HTMLImageElement {
        return this.__view as HTMLImageElement;
    }
}
