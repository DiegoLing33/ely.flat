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
 + Файл: elyColorPickerField.ts                                               +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import "@devMods/elyColorPicker.elymod/color.picker";

import Control from "@controls/action/Control";
import Field, {FieldOptions} from "@controls/input/Field";
import ContainerView from "@controls/layout/ContainerView";
import IconView from "@controls/text/IconView";
import Color from "@core/Color";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";

/**
 * @class elyColorPickerField
 * @augments {Field<string>}
 * Поле выблора цвета
 *
 *
 *     // Создаём объект выбора цвета
 *     let pickerField = new ely.colorPickerField();
 *
 *     pickerField.addChangeValueObserver( oldValue, newValue => {
 *         console.log("Выбран цвет: " + newValue.toString());
 *     });
 *
 *
 */
@designable("value", elyDesignableFieldState.DENY)
@designable("placeholder", elyDesignableFieldState.DENY)
export default class elyColorPickerField extends Field<Color> {

    /**
     * Элемент выбора
     * @todo Rewrite color picker element (WOW)
     */
    public picker: any;

    /**
     * Элемент отображения цвета
     * @type {Control}
     */
    public colorView: Control = new Control({class: "ef-color-pict"});

    /**
     * Иконка цвета
     * @type {Control}
     */
    public colorThumbnail: Control = new Control();

    public readonly actionIconView: ContainerView<IconView> =
        new ContainerView<IconView>(new IconView({iconName: "edit"}));

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: FieldOptions<Color> = {}) {
        super(options);
        this.addClass("ef-input");
        const accessory = this.getAccessory() as HTMLInputElement;

        // this.colorThumbnail.addClass("bg-primary");
        this.colorView.addSubView(this.colorThumbnail);
        // this.actionIconView.getDocument().append(this.colorThumbnail.getDocument());
        // this.colorThumbnail.getDocument().innerHTML = "&nbsp";
        this.valueProperty.set(Color.black());
        this.actionIconView.addClass("ef-input-suffix");
        this.getDocument().append(this.actionIconView.getDocument());
        this.addClass("with-suffix");

        this.actionIconView.addObserver("click", () => this.editableProperty.toggle());

        this.valueProperty.change(value => {
            this.picker.set(value.toString());
            accessory.value = (value.toString());
            // this.colorThumbnail.css({"background-color": value.getDarkerColor(0.2).toString()});
            this.getAccessory().style.color = value.getDarkerColor(0.14).toString();
        });

        this.editableProperty.change((value) => {
            accessory.disabled = !value;
            if (value) {
                this.picker.create();
                this.picker.enter();
            } else this.picker.destroy();
        });

        accessory.oninput = () => {
            this.picker.set(accessory.value);
            const ec = new Color({hex: accessory.value});
            accessory.value = ec.toString();
            // this.colorThumbnail.css({"background-color": ec.getDarkerColor(0.2).toString()});
            this.getAccessory().style.color = ec.getDarkerColor(0.14).toString();
        };

        // @ts-ignore
        this.picker = new CP(this.getAccessory());

        this.picker.on("exit", () => {
            if (this.editable()) {
                const ec = new Color({hex: accessory.value});
                this.value(ec);
                this.editable(false);
            }
        });

        this.picker.on("change", (color: string) => {
            if ("#" + color === this.value()!.toString()) return;
            const ec = new Color({hex: color});
            accessory.value = ec.toString();
            // this.colorThumbnail.css({"background-color": ec.getDarkerColor(0.2).toString()});
            this.getAccessory().style.color = ec.getDarkerColor(0.14).toString();
        });

        this.placeholder("#______");
        this.editable(false);
        this.value(options.value || Color.black());
    }

    /**
     * Возвращает плейслхолдер для ввода
     * @return {string}
     */
    public placeholder(): string;

    /**
     * Устанавливает плейслхолдер для ввода
     * @param {string} value - значение
     * @return {this}
     */
    public placeholder(value: string): elyColorPickerField;

    /**
     * Возвращает и устанавливает плейслхолдер для ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public placeholder(value?: string): string | null | elyColorPickerField {
        if (value === undefined) return (this.getAccessory() as HTMLInputElement).placeholder;
        (this.getAccessory() as HTMLInputElement).placeholder = value;
        return this;
    }
}
