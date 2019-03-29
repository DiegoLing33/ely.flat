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
 + Файл: YouTubePlayer.ts                                                     +
 + Файл изменен: 12.03.2019 18:53:31                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View, {ViewOptions} from "../../core/controls/View";

/**
 * Опции {@link YouTubePlayer}
 */
export interface YouTubePlayerOptions extends ViewOptions {
    videoId?: string;
}

/**
 * Элемент отображения
 * @class YouTubePlayer
 * @augments {View}
 */
export default class YouTubePlayer extends View {

    /**
     * Свойство: идентификатор видео
     * @ignore
     * @protected
     */
    protected readonly __videoIdProperty: ObservableProperty<string>
        = new ObservableProperty<string>().change(value => {
        this.attribute("src", `https://www.youtube.com/embed/${value}`);
    });

    /**
     * Конструктор
     * @param {YouTubePlayerOptions} [options] - опции
     */
    public constructor(options: YouTubePlayerOptions = {}) {
        super({...options, tag: "iframe"});
        Guard.variableAndSet(options.videoId, this.videoId, this);
        this.attribute("frameborder", "0");
        this.attribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        this.attribute("allowfullscreen", "allowfullscreen");
    }

    /**
     * Возвращает свойство: идентификатор видео
     * @return {ObservableProperty<string>}
     */
    public getVideoIdProperty(): ObservableProperty<string> {
        return this.__videoIdProperty;
    }

    /**
     * Возвращает идентификатор видео
     * @returns {string}
     */
    public videoId(): string;

    /**
     * Устанавливает идентификатор видео
     * @param {string} value - значение
     * @returns {this}
     */
    public videoId(value: string): YouTubePlayer;

    /**
     * Возвращает и устанавливает идентификатор видео
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public videoId(value?: string): string | null | YouTubePlayer {
        return ObservableProperty.simplePropertyAccess(this, value, this.__videoIdProperty);
    }

}

/**
 * @typedef {Object} YouTubePlayerOptions
 * @property {string} [videoId]
 */
