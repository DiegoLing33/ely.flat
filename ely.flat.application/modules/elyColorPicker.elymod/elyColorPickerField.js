"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@devMods/elyColorPicker.elymod/color.picker");
const Control_1 = require("@controls/action/Control");
const Field_1 = require("@controls/input/Field");
const ContainerView_1 = require("@controls/layout/ContainerView");
const IconView_1 = require("@controls/text/IconView");
const Color_1 = require("@core/Color");
const elyDesignable_1 = require("@core/elyDesignable");
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
let elyColorPickerField = class elyColorPickerField extends Field_1.default {
    /**
     * Конструктор
     * @param options
     */
    constructor(options = {}) {
        super(options);
        /**
         * Элемент отображения цвета
         * @type {Control}
         */
        this.colorView = new Control_1.default({ class: "ef-color-pict" });
        /**
         * Иконка цвета
         * @type {Control}
         */
        this.colorThumbnail = new Control_1.default();
        this.actionIconView = new ContainerView_1.default(new IconView_1.default({ iconName: "edit" }));
        this.addClass("ef-input");
        const accessory = this.getAccessory();
        // this.colorThumbnail.addClass("bg-primary");
        this.colorView.addSubView(this.colorThumbnail);
        // this.actionIconView.getDocument().append(this.colorThumbnail.getDocument());
        // this.colorThumbnail.getDocument().innerHTML = "&nbsp";
        this.valueProperty.set(Color_1.default.black());
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
            }
            else
                this.picker.destroy();
        });
        accessory.oninput = () => {
            this.picker.set(accessory.value);
            const ec = new Color_1.default({ hex: accessory.value });
            accessory.value = ec.toString();
            // this.colorThumbnail.css({"background-color": ec.getDarkerColor(0.2).toString()});
            this.getAccessory().style.color = ec.getDarkerColor(0.14).toString();
        };
        // @ts-ignore
        this.picker = new CP(this.getAccessory());
        this.picker.on("exit", () => {
            if (this.editable()) {
                const ec = new Color_1.default({ hex: accessory.value });
                this.value(ec);
                this.editable(false);
            }
        });
        this.picker.on("change", (color) => {
            if ("#" + color === this.value().toString())
                return;
            const ec = new Color_1.default({ hex: color });
            accessory.value = ec.toString();
            // this.colorThumbnail.css({"background-color": ec.getDarkerColor(0.2).toString()});
            this.getAccessory().style.color = ec.getDarkerColor(0.14).toString();
        });
        this.placeholder("#______");
        this.editable(false);
        this.value(options.value || Color_1.default.black());
    }
    /**
     * Возвращает и устанавливает плейслхолдер для ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    placeholder(value) {
        if (value === undefined)
            return this.getAccessory().placeholder;
        this.getAccessory().placeholder = value;
        return this;
    }
};
elyColorPickerField = __decorate([
    elyDesignable_1.designable("value", elyDesignable_1.elyDesignableFieldState.DENY),
    elyDesignable_1.designable("placeholder", elyDesignable_1.elyDesignableFieldState.DENY)
], elyColorPickerField);
exports.default = elyColorPickerField;
