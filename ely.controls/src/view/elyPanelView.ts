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
 + Файл: elyPanelView.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyControl from "@controls/action/elyControl";
import elyStyle from "@controls/enums/elyStyle";
import elyControlOptions from "@options/elyControlOptions";
import elyTextView from "@controls/text/elyTextView";

/**
 * Элемент отображения: Панель
 */
@designable("title", elyDesignableFieldState.GETSET, "string")
@designable("panelStyle", elyDesignableFieldState.GETSET, "string", elyStyle.rawList())
@designable("contentView", elyDesignableFieldState.VIEW)
@designable("descriptionView", elyDesignableFieldState.VIEW)
export default class elyPanelView extends elyControl {

    public titleView: elyTextView;
    public contentView: elyControl;
    public descriptionView: elyControl;

    /**
     * Свойство: стиль панели
     * @hidden
     */
    protected readonly panelStyleProperty: elyObservableProperty<elyStyle>;

    /**
     * Инициилизирует объект
     * @param options
     */
    constructor(options: elyControlOptions & { title?: string, panelStyle?: elyStyle | string } = {}) {
        let subviews: elyView[] = [];
        if (options.subviews) {
            subviews         = options.subviews;
            options.subviews = [];
        }
        super({class: "ef-panel", ...options});

        this.titleView          = new elyTextView({class: "ef-panel-title", text: options.title || "Panel"});
        this.contentView        = new elyControl({class: "ef-panel-content", subviews});
        this.descriptionView    = new elyControl({class: "ef-panel-description"});
        this.panelStyleProperty = new elyObservableProperty<elyStyle>();
        this.panelStyleProperty.addChangeObserver((oldValue, newValue) => {
            if (oldValue) {
                this.titleView.removeClass(`bg-${oldValue.value}`);
                this.removeClass(`brd-${oldValue.value}`);
            }
            this.titleView.addClass(`bg-${newValue.value}`);
            this.addClass(`brd-${newValue.value}`);
        });

        this.panelStyle(options.panelStyle || elyStyle.default);

        this.addSubView(this.titleView);
        this.addSubView(this.contentView);
        this.addSubView(this.descriptionView);

        this.titleView.textCenter(true);
    }

    /**
     * Возвращает заголовок
     */
    public title(): string;

    /**
     * Устанавливает заголовок
     * @param value
     */
    public title(value: string): elyPanelView;

    /**
     * Возвращает или устанавливает заголвок
     * @param value
     */
    public title(value?: string): string | elyPanelView {
        if (value === undefined) return this.titleView.text();
        this.titleView.text(value);
        return this;
    }

    /**
     * Возвращает стиль панели
     */
    public panelStyle(): elyStyle;

    /**
     * Устанавливает стиль панели
     * См. {@ling elyStyles}
     */
    public panelStyle(value: elyStyle | string): elyPanelView;

    /**
     * Возвращает и устанавливает стиль панели
     */
    public panelStyle(value?: elyStyle | string): elyStyle | null | elyPanelView {
        if (typeof value === "string") value = elyStyle.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.panelStyleProperty);
    }
}
