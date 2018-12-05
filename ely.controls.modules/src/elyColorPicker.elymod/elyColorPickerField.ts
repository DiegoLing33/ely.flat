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

// import "../../../ely.flat";
import "./color.picker";

import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import elyFieldOptions from "@controls/options/fields/elyFieldOptions";
import elyColor from "@core/elyColor";

/**
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
// @autField("value", elyDesignableFieldState.GETSET, "string")
export default class elyColorPickerField extends elyField<elyColor> {

    /**
     * Элемент выбора
     * @todo Rewrite color picker element (WOW)
     */
    public picker: any;

    /**
     * Элемент отображения цвета
     */
    public colorView: elyControl;

    public colorThumbnail: elyControl;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyFieldOptions<elyColor> = {}) {
        super({}, new elyInput({...{class: "ef-input", tag: "input"}}));

        this.valueProperty.addChangeObserver((oldValue, newValue) => {
            if (oldValue === newValue) return;
            this.accessoryView.value(newValue.toString());
            this.colorThumbnail.css({"background-color": newValue.toString()});
            this.accessoryView.css({color: newValue.toString()});
            this.picker.set(newValue.toString());
        });

        this.colorThumbnail = new elyControl();
        this.colorView = new elyControl({class: "ef-color-pict"});
        this.colorView.addSubView(this.colorThumbnail);
        this.actionIconView.getDocument().append(this.colorThumbnail.getDocument());
        this.actionIconView.removeClass("fa").addClass("ef-color-pict");

        this.colorThumbnail.getDocument().innerHTML = "&nbsp";

        this.editableProperty.addChangeObserver((oldValue, newValue) => {
            this.accessoryView.getDocument().disabled = !newValue;
            if (newValue) this.picker.create();
            else this.picker.destroy();
        });

        // @ts-ignore
        this.picker = new CP(this.accessoryView.getDocument());

        this.picker.on("change", (color: string) => {
            if (this.editable()) {
                this.value(new elyColor({hex: color}));
            }
        });

        this.applyProtocolOptions(options);
        this.editable(false);
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
            this.value(new elyColor({hex: this.accessoryView.getDocument().value}));
            this.editable(false);
        }
    }
}
