import {SelectField, SwitchField, TextField} from "../../../build/ely.flat";

/**
 * Фабрика полей ввода данных
 */
export default class WSFieldsFactory {

    /**
     * Создаёт булевый переключатель
     *
     * @param {string} title
     * @param {boolean} [value]
     * @return {SwitchField}
     */
    static createBooleanField(title, value) {
        return new SwitchField({title, value});
    }

    /**
     * Создает строковое поле ввода
     *
     * @param {string} placeholder
     * @param {string} [value]
     * @return {TextField}
     */
    static createStringField(placeholder, value) {
        return new TextField({placeholder, value});
    }

    /**
     * Создает поле ввода словаря
     *
     * @param {string} placeholder
     * @param {string} [value]
     * @param {*} [items]
     * @return {SelectField}
     */
    static createDictionaryField(placeholder, value, items) {
        return new SelectField({placeholder, value, items});
    }

}