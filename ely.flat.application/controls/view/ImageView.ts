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
 + Файл: ImageViews                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import View, {ViewOptions} from "@core/controls/View";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Опции {@link ImageView}
 */
export interface ImageViewOptions extends ViewOptions {
    url?: string;
}

/**
 * Элемент отображения: Изображение
 * @version 1.0
 *
 * Events:
 * - loaded: Изображение загружено
 */
export default class ImageView extends View {

    /**
     * Свойство: ссылка на изображение
     * @ignore
     * @protected
     */
    protected readonly __urlProperty: ObservableProperty<string>
        = new ObservableProperty<string>().change((newValue) => this.getDocument().src = newValue);

    /**
     * Конструтор
     * @param {ImageViewOptions} options - опции
     */
    public constructor(options: ImageViewOptions = {}) {
        super({tag: "img", ...options});
        this.getDocument().onload = (e: any) => this.notificate("loaded", [e]);
        if (options.url) this.url(options.url);
    }

    /**
     * Возвращает свойство: ссылка на изображение
     * @return {ObservableProperty<string>}
     */
    public getUrlProperty(): ObservableProperty<string> {
        return this.__urlProperty;
    }

    /**
     * Возвращает ссылка на изображение
     * @returns {string}
     */
    public url(): string;

    /**
     * Устанавливает ссылка на изображение
     * @param {string} value - значение
     * @returns {this}
     */
    public url(value: string): ImageView;

    /**
     * Возвращает и устанавливает ссылка на изображение
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public url(value?: string): string | null | ImageView {
        return ObservableProperty.simplePropertyAccess(this, value, this.__urlProperty);
    }

    /**
     * Добавляет наблюдатель: изображение загружено
     *
     * Имя обсервера: loaded
     *
     * @param o - наблюдатель
     */
    public addLoadedObserver(o: () => void): ImageView {
        this.addObserver("loaded", o);
        return this;
    }

    /**
     * Возвращает корневой элемент
     */
    public getDocument(): HTMLImageElement {
        return this.__view as HTMLImageElement;
    }
}

/**
 * @typedef {Object} ImageViewOptions
 * @property {string} [url]
 */
