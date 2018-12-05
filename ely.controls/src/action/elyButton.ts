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
 + Файл: elyButton.ts                                                         +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {designable, elyDesignableFieldState} from "ely.core/src/elyDesignable";
import elyObservableProperty from "ely.core/src/observable/properties/elyObservableProperty";
import elySize from "../enums/elySize";
import elyStyle from "../enums/elyStyle";
import elyButtonOptions from "../options/elyButtonOptions";
import elyTextView from "../text/elyTextView";
import elyControl from "./elyControl";

/**
 * Элемент управления: Кнопка
 * @version 1.0
 *
 *
 *     // Создание кнопки по ширине заполнения
 *     let button = new ely.button({text: "Button", buttonSize: ely.size.fill});
 *
 *     button.click( () => {
 *        // Обработка нажатия кнопки
 *        console.log("Wow!");
 *     });
 *
 *
 */
@designable("text", elyDesignableFieldState.GETSET, "string")
@designable("buttonSize", elyDesignableFieldState.GETSET, "string", elySize.rawList())
@designable("buttonStyle", elyDesignableFieldState.GETSET, "string", elyStyle.rawList())
export default class elyButton extends elyControl {

    /**
     * Текст на кнопке
     */
    public readonly textView: elyTextView;

    /**
     * Параметр стиля кнопки
     * @ignore
     */
    protected readonly buttonStyleProperty: elyObservableProperty<elyStyle>;

    /**
     * Параметр размера кнопки
     * @ignore
     */
    protected readonly buttonSizeProperty: elyObservableProperty<elySize>;

    /**
     * Инициилизирует объект
     * @param options
     */
    constructor(options: elyButtonOptions = {}) {
        super({tag: "button", class: "btn", ...options});

        this.textView = new elyTextView({tag: "span", text: options.text, iconName: options.iconName});
        this.buttonSizeProperty = new elyObservableProperty<elySize>(elySize.default);
        this.buttonStyleProperty = new elyObservableProperty<elyStyle>(elyStyle.default);

        this.buttonStyleProperty.change((newValue, oldValue) => {
            if (oldValue) this.removeClass(`bg-${oldValue.value}`);
            this.addClass(`bg-${newValue.value}`);
        });
        this.buttonSizeProperty.change((newValue, oldValue) => {
            if (oldValue) this.removeClass(`btn-${oldValue.value}`);
            this.addClass(`btn-${newValue.value}`);
        });

        this.addSubView(this.textView);
        this.buttonSize(options.buttonSize || elySize.regular);
        this.buttonStyle(options.buttonStyle || elyStyle.primary);

        if (options.click) this.click(options.click);
        if (options.fill) this.fill();
    }

    /**
     * Возвращает текст на кнопке
     */
    public text(): string;

    /**
     * Устанавливает текст на кнопке
     * @param text
     */
    public text(text: string): elyButton;

    /**
     * Устанавливает текст на кнопку
     * @param text
     */
    public text(text?: string): string | elyButton {
        if (text === undefined) return this.textView.text();
        this.textView.text(text);
        return this;
    }

    /**
     * Возвращает или устанавливает размер кнопки
     *
     * См {@link elySize}
     * @param sizeName - {@link elySize}
     */
    public buttonSize(sizeName?: elySize | string): elySize | elyButton {
        if (typeof sizeName === "string") sizeName = elySize.byName(sizeName);
        return elyObservableProperty.simplePropertyAccess(this, sizeName, this.buttonSizeProperty);
    }

    /**
     * Возвращает стиль кнопки
     */
    public buttonStyle(): elyStyle;

    /**
     * Устанавливает стиль кнопки
     * @param styleName - {@link elyStyle}
     */
    public buttonStyle(styleName: elyStyle | string): elyButton;

    /**
     * Возвращает или устанавливает стиль кнопки
     *
     * См {@link elyStyle}
     * @param styleName
     */
    public buttonStyle(styleName?: string | elyStyle): elyStyle | elyButton {
        if (typeof styleName === "string") styleName = elyStyle.byName(styleName);
        return elyObservableProperty.simplePropertyAccess(this, styleName, this.buttonStyleProperty);
    }

    /**
     * Устанавливает слушатель нажатия или нажимает на кнопку
     *
     * @param {Function} [callback = null]
     * @return {elyButton}
     */
    public click(callback?: () => void): elyButton {
        if (callback === undefined) {
            this.getDocument().click();
        } else {
            this.addObserver("click", callback);
        }
        return this;
    }

    /**
     * Увеличивает размер кнопки до всего блока
     */
    public fill(): elyButton {
        this.buttonSize(elySize.fill);
        return this;
    }
}
