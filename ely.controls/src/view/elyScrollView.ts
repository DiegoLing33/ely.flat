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
 + Файл: elyScrollView.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyControl from "@controls/action/elyControl";
import elyScrollViewOptions from "@options/elyScrollViewOptions";

/**
 * Элемент с прокруткой
 */
export default class elyScrollView extends elyControl {

    /**
     * Свойство:  скроллинг по вертикали
     * @ignore
     */
    protected readonly scrollVerticalProperty: elyObservableProperty<boolean>;

    /**
     * Свойство:  скроллинг по горизонтали
     * @ignore
     */
    protected readonly scrollHorizontalProperty: elyObservableProperty<boolean>;

    /**
     * Свойство: флаг фиксации элементов прокрутки в центре блока
     * @ignore
     */
    protected readonly scrollSnapCenterProperty: elyObservableProperty<boolean>;

    /**
     * Конструктор
     * @param option
     */
    public constructor(option: elyScrollViewOptions = {}) {
        super({class: "ef-scroll-view"});

        this.scrollHorizontalProperty = new elyObservableProperty<boolean>();
        this.scrollVerticalProperty   = new elyObservableProperty<boolean>();
        this.scrollSnapCenterProperty = new elyObservableProperty<boolean>();

        this.scrollHorizontalProperty.change((newValue) => {
            if (newValue) this.addClass("horizontal");
            else this.removeClass("horizontal");
        });
        this.scrollVerticalProperty.change((newValue) => {
            if (newValue) this.addClass("vertical");
            else this.removeClass("vertical");
        });
        this.scrollSnapCenterProperty.change((newValue) => {
            if (newValue) this.addClass("mnd-center");
            else this.removeClass("mnd-center");
        });

        this.scrollHorizontal(option.scrollHorizontal || false);
        this.scrollVertical(option.scrollVertical || false);
        this.scrollSnapCenter(option.scrollSnapCenter || false);
    }

    /**
     * Возвращает скроллинг по вертикали
     */
    public scrollVertical(): boolean;

    /**
     * Устанавливает скроллинг по вертикали
     */
    public scrollVertical(value: boolean): elyScrollView;

    /**
     * Возвращает и устанавливает скроллинг по вертикали
     */
    public scrollVertical(value?: boolean): boolean | null | elyScrollView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.scrollVerticalProperty);
    }

    /**
     * Возвращает скроллинг по вертикали
     */
    public scrollHorizontal(): boolean;

    /**
     * Устанавливает скроллинг по горизонтали
     */
    public scrollHorizontal(value: boolean): elyScrollView;

    /**
     * Возвращает и устанавливает скроллинг по горизонтали
     */
    public scrollHorizontal(value?: boolean): boolean | null | elyScrollView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.scrollHorizontalProperty);
    }

    /**
     * Возвращает флаг фиксации элементов прокрутки в центре блока
     */
    public scrollSnapCenter(): boolean;

    /**
     * Устанавливает флаг фиксации элементов прокрутки в центре блока
     */
    public scrollSnapCenter(value: boolean): elyScrollView;

    /**
     * Возвращает и устанавливает флаг фиксации элементов прокрутки в центре блока
     */
    public scrollSnapCenter(value?: boolean): boolean | null | elyScrollView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.scrollSnapCenterProperty);
    }

    /**
     * Прокручивает объект элементы
     * @param h
     * @param v
     */
    public scrollBy(h: number, v: number = 0): elyScrollView {
        this.getDocument().scrollBy({top: h, left: v, behavior: "smooth"});
        return this;
    }

    /**
     * Прокручивает объект горизонтально
     * @param value
     */
    public scrollHorizontalBy(value: number): elyScrollView {
        return this.scrollBy(value, 0);
    }

    /**
     * Прокручивает объект вертикально
     * @param value
     */
    public scrollVerticalBy(value: number): elyScrollView {
        return this.scrollBy(value, 0);
    }
}
