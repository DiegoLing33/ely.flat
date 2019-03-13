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
 + Файл: VideoPlayer.ts                                                       +
 + Файл изменен: 12.03.2019 19:07:15                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import View, {ViewOptions} from "@core/controls/View";
import {variableAndSet} from "@core/Guard";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

/**
 * Опции {@link VideoPlayer}
 */
export interface VideoPlayerOptions extends ViewOptions {
    url?: string;
}

/**
 * Элемент отображения
 * @class VideoPlayer
 * @augments {View}
 */
export default class VideoPlayer extends View {

    /**
     * Свойство: URL видео файла
     * @ignore
     * @protected
     */
    protected readonly __urlProperty: ObservableProperty<string>
        = new ObservableProperty<string>().change(value => {
        this.attribute("src", value);
    });

    /**
     * Конструктор
     * @param {VideoPlayerOptions} [options] - опции
     */
    public constructor(options: VideoPlayerOptions = {}) {
        super({...options, tag: "video"});
        variableAndSet(options.url, this.url, this);
        this.attribute("controls", "true");
        this.attribute("type", "video/mp4");
        this.attribute("controlsList", "nodownload");
    }

    public getDocument(): HTMLVideoElement | any {
        return super.getDocument();
    }

    /**
     * Возвращает свойство: URL видео файла
     * @return {ObservableProperty<string>}
     */
    public getUrlProperty(): ObservableProperty<string> {
        return this.__urlProperty;
    }

    /**
     * Возвращает URL видео файла
     * @returns {string}
     */
    public url(): string;

    /**
     * Устанавливает URL видео файла
     * @param {string} value - значение
     * @returns {this}
     */
    public url(value: string): VideoPlayer;

    /**
     * Возвращает и устанавливает URL видео файла
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public url(value?: string): string | null | VideoPlayer {
        return ObservableProperty.simplePropertyAccess(this, value, this.__urlProperty);
    }
}

/**
 * @typedef {Object} VideoPlayerOptions
 * @property {string} [url]
 */
