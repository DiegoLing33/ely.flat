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

import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import elyFieldOptions from "@controls/options/fields/elyFieldOptions";
import elyColor from "@core/elyColor";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";

/**
 * @class elyColorPickerField
 * @augments {elyField<string>}
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
export default class elyColorPickerField extends elyField<elyColor> {

    /**
     * Элемент выбора
     * @todo Rewrite color picker element (WOW)
     */
    public picker: any;

    /**
     * Элемент отображения цвета
     * @type {elyControl}
     */
    public colorView: elyControl = new elyControl({class: "ef-color-pict"});

    /**
     * Иконка цвета
     * @type {elyControl}
     */
    public colorThumbnail: elyControl = new elyControl();

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyFieldOptions<elyColor> = {}) {
        super({}, new elyInput({...{class: "ef-input", tag: "input"}}));

        // this.colorThumbnail.addClass("bg-primary");
        this.colorView.addSubView(this.colorThumbnail);
        this.actionIconView.getDocument().append(this.colorThumbnail.getDocument());
        this.actionIconView.removeClass("fa").addClass("ef-color-pict");

        this.colorThumbnail.getDocument().innerHTML = "&nbsp";

        this.valueProperty.change(value => {
            this.picker.set(value.toString());
            this.accessoryView.value(value.toString());
            this.colorThumbnail.css({"background-color": value.getDarker(0.2).toString()});
            this.accessoryView.css({color: value.getDarker(0.14).toString()});
        });

        this.editableProperty.change((value) => {
            this.accessoryView.getDocument().disabled = !value;
            if (value) this.picker.create();
            else this.picker.destroy();
        });

        // @ts-ignore
        this.picker = new CP(this.accessoryView.getDocument());

        this.picker.on("exit", () => {
            if (this.editable()) {
                const ec = new elyColor({hex: this.accessoryView.value()});
                this.value(ec);
            }
        });

        this.picker.on("change", (color: string) => {
            if ("#" + color === this.value().toString()) return;
            const ec = new elyColor({hex: color});
            this.accessoryView.value(ec.toString());
            this.colorThumbnail.css({"background-color": ec.getDarker(0.2).toString()});
            this.accessoryView.css({color: ec.getDarker(0.14).toString()});
        });

        this.placeholder("#______");
        this.editable(false);
        this.applyProtocolOptions(options);
        this.actionIconView.hidden(false);
    }

    public defaultValue(): elyColor {
        return new elyColor({hex: "#000000"});
    }

    public isEmpty(): boolean {
        return this.accessoryView.isEmpty();
    }

    protected actionIconDidClick() {
        super.actionIconDidClick();
        if (!this.editable()) {
            this.editable(true);
        } else {
            this.editable(false);
        }
    }
}
