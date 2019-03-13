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
 + Файл: BoxHeaderView.ts                                                     +
 + Файл изменен: 08.03.2019 20:24:00                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import BoxView, {BoxViewOptions} from "@controls/content/BoxView";
import TextViewContainer from "@controls/text/TextViewContainer";
import {variableAndSet} from "@core/Guard";

/**
 * Опции {@link BoxHeaderView}
 */
export interface BoxHeaderViewOptions extends BoxViewOptions {
    /**
     * Текст заголовка элемента
     */
    boxTitle?: string;
}

/**
 * Элемент отображения
 * @class BoxHeaderView
 * @augments {BoxView}
 */
export default class BoxHeaderView extends BoxView {

    /**
     * Контейнер с текстом
     * @ignore
     */
    protected __headerView: TextViewContainer
        = new TextViewContainer({class: "box-header"});

    /**
     * Конструктор
     * @param {BoxHeaderViewOptions} [options] - опции
     */
    public constructor(options: BoxHeaderViewOptions = {}) {
        super(options);
        this.removeViewContent();
        this.getDocument().append(this.getHeaderView().getDocument());
        this.getDocument().append(this.getContainerView().getDocument());
        variableAndSet(options.boxTitle, this.boxTitle, this);
    }

    /**
     * Возвращает заголовок
     * @return {string}
     */
    public boxTitle(): string;

    /**
     * Устанавливает заголовок
     * @param {string} value - значение
     * @return {this}
     */
    public boxTitle(value: string): BoxHeaderView;

    /**
     * Возвращает и устанавливает заголовок
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public boxTitle(value?: string): string | null | BoxHeaderView {
        if (value === undefined) return this.getHeaderView().getTextView().text();
        this.getHeaderView().getTextView().text(value);
        return this;
    }

    /**
     * Возвращает элемент заголовка
     * @return {TextViewContainer}
     */
    public getHeaderView(): TextViewContainer {
        return this.__headerView;
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        return {
            ...super.serialize(),
            boxTitle: this.boxTitle(),
        };
    }

}

/**
 * @typedef {BoxViewOptions} BoxHeaderViewOptions
 * @property {string} [boxTitle] - заголовок
 */
