/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 +                                                                            +
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
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: efTextField.ts                                                       +
 + Файл изменен: 09.02.2019 19:08:52                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efField, efFieldOptions} from "@controls/input/efField";
import {efContainerView} from "@controls/layout/efContainerView";
import {efIconView} from "@controls/text/efIconView";
import elyView from "@core/controls/elyView";
import elyGuard from "@core/elyGuard";
import TextFieldType from "@enums/textFieldType";

/**
 * Опции {@link efTextField}
 */
export interface efTextFieldOptions extends efFieldOptions<string> {
    fieldType?: TextFieldType | string;
    rightIconName?: string;
    leftIconName?: string;
}

/**
 * Поле ввода текста
 * @class efTextField
 * @augments {elyView}
 */
export class efTextField extends efField<string> {

    /**
     * Правая иконка
     * @protected
     * @ignore
     */
    protected __rightIconContainerView: efContainerView<efIconView> | null = null;

    /**
     * Левая иконка
     * @protected
     * @ignore
     */
    protected __leftIconContainerView: efContainerView<efIconView> | null = null;

    /**
     * Конструктор
     * @param {efTextFieldOptions} options
     */
    public constructor(options: efTextFieldOptions = {}) {
        super(options);
        this.addClass("ef-input");
        this.getAccessory().onchange = () => {
            this.value(this.getAccessory().value);
        };

        this.getAccessory().oninput = (e) => {
            this.notificate("input", [this.getAccessory().value, e]);
        };

        this.valueProperty.change((value, oldVal) => {
            this.getAccessory().value = value;
        });

        elyGuard.variable(options.value, () => this.value(options.value!));
        elyGuard.variable(options.fieldType, () => this.fieldType(options.fieldType!));
        elyGuard.variable<string>(options.rightIconName, (v) => this.setRightIcon(v));
        elyGuard.variable<string>(options.leftIconName, (v) => this.setLeftIcon(v));
    }

    /**
     * Возвращает тип поля текста
     * @return {TextFieldType}
     */
    public fieldType(): TextFieldType;

    /**
     * Устанавливает тип поля текста
     * @param {TextFieldType | string} value - значение
     * @return {this}
     */
    public fieldType(value: TextFieldType | string): efTextField;

    /**
     * Возвращает и устанавливает тип поля текста
     * @param {TextFieldType | string} [value] - значение
     * @returns {TextFieldType|this|null}
     */
    public fieldType(value?: TextFieldType | string): TextFieldType | null | efTextField {
        if (value === undefined) return TextFieldType.byName(this.getAccessory().type);
        if (typeof value === "string") value = TextFieldType.byName(value);
        this.getAccessory().type = value.value;
        return this;
    }

    /**
     * Добавляет наблюдатель: ввод текста
     *
     * Имя обсервера: input
     *
     * @param {function(value: string, e: Event)} o - наблюдатель
     */
    public addInputObserver(o: (value: string, e: Event) => void): efTextField {
        this.addObserver("input", o);
        return this;
    }

    /**
     * Возвращает отображение правой иконки
     * @return {efContainerView<efIconView>}
     */
    public getRightIconView(): efContainerView<efIconView> | null {
        return this.__rightIconContainerView;
    }

    /**
     * Возвращает отображение левой иконки
     * @return {efContainerView<efIconView>}
     */
    public getLeftIconView(): efContainerView<efIconView> | null {
        return this.__leftIconContainerView;
    }

    /**
     * Устанавливает левую иконку
     * @param {string} name
     * @return {this}
     */
    public setLeftIcon(name: string): efTextField {
        this.__leftIconContainerView = new efContainerView<efIconView>(new efIconView({iconName: name}));
        this.__leftIconContainerView.addClass("ef-input-prefix");
        return this.__rebuild();
    }

    /**
     * Устанавливает правую иконку
     * @param {string} name
     * @return {this}
     */
    public setRightIcon(name: string): efTextField {
        this.__rightIconContainerView = new efContainerView<efIconView>(new efIconView({iconName: name}));
        this.__rightIconContainerView.addClass("ef-input-suffix");
        return this.__rebuild();
    }

    /**
     * Удаляет левую иконку
     * @return {this}
     */
    public removeLeftIcon(): efTextField {
        this.removeClass("with-prefix");
        this.__leftIconContainerView = null;
        return this.__rebuild();
    }

    /**
     * Удаляет левую иконку
     * @return {this}
     */
    public removeRightIcon(): efTextField {
        this.removeClass("with-suffix");
        this.__rightIconContainerView = null;
        return this.__rebuild();
    }

    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    public isValid(): boolean {
        return super.isValid();
    }

    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return super.isEmpty() || this.value()!.trim() === "";
    }

    /**
     * перестраивает поле ввода
     * @protected
     * @ignore
     */
    protected __rebuild(): efTextField {
        this.removeViewContent();
        this.getDocument().append(this.getAccessory());
        if (this.getLeftIconView()) {
            this.addClass("with-prefix");
            this.getDocument().append(this.getLeftIconView()!.getDocument());
        }
        if (this.getRightIconView()) {
            this.addClass("with-suffix");
            this.getDocument().append(this.getRightIconView()!.getDocument());
        }
        return this;
    }

}

/**
 * @typedef {Object} efTextFieldOptions
 * @property {TextFieldType|string} [fieldType]
 * @property {string} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 * @property {string} [rightIconName = ""]
 * @property {string} [leftIconName = ""]
 */
