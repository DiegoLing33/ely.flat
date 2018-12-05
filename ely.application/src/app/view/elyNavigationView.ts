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
 + Файл: elyNavigationView.ts                                                 +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyLinkTextView from "@controls/text/elyLinkTextView";
import elyImageView from "@controls/view/elyImageView";
import elyListView from "@controls/view/elyListView";
import elyColor from "@core/elyColor";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyControlOptions from "@options/elyControlOptions";

/**
 * Элемент верхней навигации
 */
export default class elyNavigationView extends elyControl {

    /**
     * Элементы
     */
    public readonly itemsView: elyListView;

    /**
     * Заголовок
     */
    public readonly titleView: elyLinkTextView;

    /**
     * Изображение
     */
    public readonly imageView: elyImageView;

    /**
     * Цвет навигационной панели
     */
    protected readonly navigationBarColorProperty: elyObservableProperty<elyColor>;

    /**
     * Конструктор
     * @param options
     */
    constructor(options: elyControlOptions = {}) {
        super(options);
        this.itemsView                  = new elyListView();
        this.titleView                  = new elyLinkTextView({text: "ely.Flat", url: "#", class: "title"});
        this.imageView                  = new elyImageView();
        this.navigationBarColorProperty = new elyObservableProperty<elyColor>();

        this.addSubView(this.imageView);
        this.addSubView(this.titleView);
        this.addSubView(this.itemsView);

        this.addClass("ely-navigation-view");

        this.imageView.hidden(true);
        this.navigationBarColorProperty.addChangeObserver((oldValue, newValue) => {
            const backgroundColor = newValue.toString();
            let borderColor       = newValue.getLighter(0.3).toString();
            if (!newValue.isDarker()) {
                this.addClass("light");
                borderColor = newValue.getDarker(0.05).toString();
            } else this.removeClass("light");

            this.css({"background-color": backgroundColor, "border-bottom": "4px solid " + borderColor});
        });
    }

    /**
     * Устанавливает или возвращает цвет бара
     * @param color
     */
    public navigationBarColor(color?: string | elyColor): elyNavigationView | string {
        if (color && typeof color === "string") color = new elyColor({hex: color});
        return elyObservableProperty.simplePropertyAccess(this, color, this.navigationBarColorProperty);
    }

    /**
     * Устанавливает изображение
     * @param image
     */
    public navigationBarImage(image: string): elyNavigationView {
        this.imageView.hidden(false);
        this.imageView.url(image);
        this.imageView.height(34);
        this.imageView.css({"margin-top": "-12px"});
        return this;
    }
}
