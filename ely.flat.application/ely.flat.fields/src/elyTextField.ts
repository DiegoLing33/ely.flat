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
 + Файл: elyTextField.ts                                                      +
 + Файл изменен: 08.01.2019 02:54:20                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import TextFieldType from "@enums/textFieldType";
import {elyFieldView, elyFieldViewOptions} from "@fields/elyFieldView";

/**
 * Опции
 * @class elyTextFieldOptions
 */
export interface elyTextFieldOptions extends elyFieldViewOptions<string> {
    /**
     * @type {TextFieldType}
     */
    fieldType?: TextFieldType;

    /**
     * @type {boolean}
     */
    encrypted?: boolean;
}

/**
 * Поле: Ввод текста
 * @version 1.0
 * @class elyTextField
 * @augments {elyField<string>}
 */
@designable("value", elyDesignableFieldState.GETSET, "string")
@designable("fieldType", elyDesignableFieldState.GET, "string", TextFieldType.rawList())
export class elyTextField extends elyFieldView<string> {

    /**
     * Флаг шифрования данных
     *
     * Данный флаг необходим для elyFormBuilder, при получении
     * и отрпавки значений, поле шифруется ключем.
     *
     * @type {boolean}
     */
    public encrypted: boolean = false;

    /**
     * Свойство: тип поля ввода
     * @ignore
     * @protected
     */
    protected readonly __fieldType: TextFieldType;

    /**
     * Конструктор
     * @param {elyTextFieldOptions} props
     */
    public constructor(props: elyTextFieldOptions = {fieldType: TextFieldType.text, encrypted: false}) {
        super({accessory: new elyControl({tag: "input", class: "ef-input"})});
        this.__fieldType = props.fieldType || TextFieldType.text;

        const accessory = this.accessoryView.getDocument() as HTMLInputElement;
        accessory.onchange = () => {
            this.value(accessory.value);
        };
        this.valueProperty.change((newValue) => accessory.value = newValue);

        if (props.placeholder) accessory.placeholder = props.placeholder;
        if (props.value) this.value(props.value);
        accessory.type = this.fieldType().value;
    }

    /**
     * Возвращает тип поля ввода
     * @return {TextFieldType}
     */
    public fieldType(): TextFieldType {
        return this.__fieldType;
    }

    /**
     * Возвращает true, если поле пустое
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return super.isEmpty() || this.value() === "";
    }

    /**
     * Добавляет слушатель изменения поля
     * @param {{function(value: string)}} observer
     * @return {this}
     */
    public addInputObserver(observer: (value: string) => void): elyTextField {
        this.addObserver("input", observer);
        return this;
    }

    /**
     * Возвращает true, если данные введены правильно
     * @return {boolean}
     */
    public isValid(): boolean {
        let result = false;
        if (this.fieldType().value === TextFieldType.mail.value) {
            result = /^([^ {}\]\[,]+)@(.+)\.(.+)/.test(this.valueProperty.get(""));
        } else {
            result = true;
        }
        return result && super.isValid();
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
    public placeholder(value: string): elyTextField;

    /**
     * Возвращает и устанавливает плейслхолдер для ввода
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public placeholder(value?: string): string | null | elyTextField {
        if (value === undefined) return (this.accessoryView.getDocument() as HTMLInputElement).placeholder;
        (this.accessoryView.getDocument() as HTMLInputElement).placeholder = value;
        return this;
    }

}
