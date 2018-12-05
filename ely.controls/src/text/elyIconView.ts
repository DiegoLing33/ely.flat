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
 + Файл: elyIconView.ts                                                       +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elySize from "@controls/enums/elySize";
import elyWeight from "@controls/enums/elyWeight";

/**
 * Элемент отображения: Иконка
 * @version 1.0
 */
@designable("iconName", elyDesignableFieldState.GETSET, "string")
@designable("iconSpinning", elyDesignableFieldState.SET, "boolean")
@designable("iconWeight", elyDesignableFieldState.SET, "string|number", elyWeight.rawList())
@designable("iconSize", elyDesignableFieldState.SET, "string|number", elySize.rawList())
export default class elyIconView extends elyView {

    /**
     * Свойство: имя иконки
     * @ignore
     */
    protected readonly iconNameProperty: elyObservableProperty<string>;

    /**
     * Конструктор
     * @param options
     */
    constructor(options: { iconName?: string, iconSize?: number | string, iconSpinning?: boolean }
        & elyViewOptions = {}) {
        super({tag: "span", ...options});
        this.addClass("fa");

        this.iconNameProperty = new elyObservableProperty<string>();
        this.iconNameProperty.addChangeObserver((oldValue, newValue) => {
            if (oldValue) this.removeClass(`fa-${oldValue}`);
            this.addClass(`fa-${newValue}`);
        });

        if (options.iconName) this.iconName(options.iconName);
        if (options.iconSize) this.iconSize(options.iconSize);
        if (options.iconSpinning) this.iconSpinning(options.iconSpinning);
    }

    /**
     * Возвращает имя иконки
     */
    public iconName(): string;

    /**
     * Устанавливает имя иконки
     * @param name
     */
    public iconName(name: string): elyIconView;

    /**
     * Устанавливает или возвращает имя иконки
     * @param name
     */
    public iconName(name?: string): string | elyIconView {
        return elyObservableProperty.simplePropertyAccess(this, name, this.iconNameProperty);
    }

    /**
     * Устанавливает размер иконки
     * @param size
     *
     * Используемые константы: {@link elySize}
     */
    public iconSize(size: elySize | string | number): elyIconView {
        if (typeof size === "number") size = `${size}px`;
        if (size instanceof elySize) size = `${size.value}px`;
        return this.css({"font-size": size}) as elyIconView;
    }

    /**
     * Устанавливает толщину иконки
     * @param weight
     *
     * Используемые константы: {@link elyWeight}
     */
    public iconWeight(weight: elyWeight | number): elyIconView {
        return this.css({"font-weight": weight.toString()}) as elyIconView;
    }

    /**
     * Вращение иконки
     * @param bool
     */
    public iconSpinning(bool: boolean = true): elyIconView {
        if (bool) this.addClass("fa-spin");
        else this.removeClass("fa-spin");
        return this;
    }
}
