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
 + Файл: elyFlatSideNavigationView.ts                                         +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyIconView from "@controls/text/elyIconView";
import elyListView from "@controls/view/elyListView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyXLogger from "@core/utils/elyXLogger";

/**
 * Боковая панель навигации
 */
export default class elyFlatSideNavigationView extends elyView {

    /**
     * Лист
     */
    public readonly listView: elyListView;

    /**
     * Отображение заголовка
     */
    public readonly titleView: elyView;

    /**
     * Ширина
     */
    public readonly widthProperty: elyObservableProperty<number>;

    public constructor(options: elyViewOptions = {}) {
        super(options);
        this.addClass("ef-sidenav");
        this.widthProperty = new elyObservableProperty<number>(350);
        this.widthProperty.change(value => {
            this.width(value + "px");
        });
        this.listView  = new elyListView();
        this.titleView = new elyControl({class: "ef-sidenav-title"});
        // this.hidden(true);
        this.dismiss();

        const closeIcon = new elyIconView({iconName: "close"});
        this.titleView.getDocument().append(closeIcon.getDocument());
        this.getDocument().append(this.titleView.getDocument());
        this.getDocument().append(this.listView.getDocument());

        this.titleView.addObserver("click", () => {
            this.dismiss();
        });
        this.resize((view: elyView, maxWidth: number) => {
            if (maxWidth > 1600) {
                this.widthProperty.set(350);
            } else {
                this.widthProperty.set(260);
            }
        });

    }

    /**
     * Отображает навигацию
     */
    public present(): void {
        // this.hidden(false);
        this.css({left: `0px`});
    }

    /**
     * Скрывает навигацию
     */
    public dismiss(): void {
        this.css({left: `-${this.widthProperty.get()}px`});
    }

    /**
     * Переключает отображение навигации
     */
    public toggle(): void {
        if (parseInt((this.getStyle().left || "0").replace("px", ""), 10) < 0) {
            this.present();
        } else {
            this.dismiss();
        }
    }

    /**
     * Применяет события мыши
     */
    public applyMouseEvents(): void {
        elyXLogger.default.log("События мыши активированы для боковой панели");
        this.getDocument().onmouseleave = () => {
            this.dismiss();
        };
    }

    /**
     * Добавляет панель навигации в приложение
     */
    public apply(): void {
        document.body.append(this.getDocument());
    }
}
