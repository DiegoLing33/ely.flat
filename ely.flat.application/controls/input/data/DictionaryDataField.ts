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
 + Файл: DictionaryDataField.ts                                               +
 + Файл изменен: 15.03.2019 20:01:40                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import ObservableArray from "ely.core/dist/observable/properties/ObservableArray";
import Size from "../../../enums/Size";
import Style from "../../../enums/Style";
import Button from "../../action/Button";
import IconView from "../../text/IconView";
import Field, {FieldOptions} from "../Field";
import TextField from "../TextField";
import GroupedDataField from "./GroupedDataField";

/**
 * Опции {@link DictionaryDataField}
 */
export interface DictionaryDataFieldOptions<T> extends FieldOptions<DictionaryDataFieldValue<T>> {
    filedKey?: any;
    fieldValue?: any;
}

/**
 * Значение поля словаря
 */
export interface DictionaryDataFieldValue<T> {
    [name: string]: any;
}

/**
 * Элемент отображения
 * @class DictionaryDataField
 * @augments {View}
 * @template {T} - тип данных значения
 */
export default class DictionaryDataField<T> extends Field<DictionaryDataFieldValue<T>> {

    /**
     * Создаёт строку словаря
     * @param {DictionaryDataField} field
     * @param {*} options
     * @return {GroupedDataField}
     */
    public static createDictionaryGroupDataField(field: DictionaryDataField<any>, options: any = {}): GroupedDataField {
        const gdf = new GroupedDataField();
        const gdfRemoveButton = new IconView({styleNoSelect: true, styleClickable: true, iconName: "times"});
        gdfRemoveButton.addClickObserver(() => field.getGroupDataFieldsProperty().removeItem(gdf));
        gdf.addField(new TextField({placeholder: "Key"}));
        gdf.addField(new TextField({placeholder: "Value"}));
        gdf.addBlock(gdfRemoveButton);
        return gdf;
    }

    /**
     * Строки
     */
    protected __rows: ObservableArray<GroupedDataField>
        = new ObservableArray<GroupedDataField>().change(() => {
        const rows = this.getGroupDataFieldsProperty().get();
        this.removeViewContent();
        rows.forEach((row) => this.getDocument().append(row.getDocument()));
        this.getDocument().append(this.getAddButton().getDocument());
    }) as ObservableArray<GroupedDataField>;

    /**
     * Кнопка
     */
    protected __addRowButton = new Button({text: "Добавить", buttonSize: Size.fill, buttonStyle: Style.default});

    /**
     * Конструктор
     * @param {DictionaryDataFieldOptions} [options] - опции
     */
    public constructor(options: DictionaryDataFieldOptions<T> = {}) {
        super(options);
        this.addClass("ef-dictionary-input");

        this.getAddButton().click(() => {
            this.addNewRows(1);
        });
        this.addNewRows(1);

        this.getGroupDataFieldsProperty().addRemoveObserver(() => this.value(this.getValuesObject()));
        this.getGroupDataFieldsProperty().addClearObserver(() => this.value(this.getValuesObject()));
    }

    /**
     * Добавляет новые строки
     * @param {number} [count = 1] - количество строк будет добавлено
     * @return {DictionaryDataField<T>}
     */
    public addNewRows(count: number = 1): DictionaryDataField<T> {
        const field = DictionaryDataField.createDictionaryGroupDataField(this);
        field.change(() => this.value(this.getValuesObject()));
        field.addInputObserver(value => {
            const obj: any = {};
            this.getGroupDataFieldsProperty().forEach(item => {
                if (item === field) {
                    if (Guard.isSet(value[0])) obj[value[0]] = value[1];
                } else {
                    const values = item.getValuesArray();
                    if (Guard.isSet(values[0])) obj[values[0]] = values[1];
                }
            });
            this.notificate("input", [obj]);
        });
        this.getGroupDataFieldsProperty().push(field);
        return this;
    }

    /**
     * Возвращает словарь значений
     * @return {DictionaryDataFieldValue}
     */
    public getValuesObject(): DictionaryDataFieldValue<T> {
        const obj: any = {};
        this.getGroupDataFieldsProperty().forEach(f => {
            if (f.isValid()) {
                const pair = f.value();
                if (pair) obj[pair![0]] = pair![1];
            }
        });
        return obj;
    }

    /**
     * Добавляет наблюдатель ввода
     *
     * Имя наблюдатель: input
     *
     * @param {function(values: *[])} o
     * @return {GroupedDataField}
     */
    public addInputObserver(o: (value: string[]) => void): GroupedDataField {
        return this.addObserver("input", o) as GroupedDataField;
    }

    /**
     * Удаляет строку по индексу
     * @param {number} index
     * @return {DictionaryDataField}
     */
    public removeRow(index: number): DictionaryDataField<T> {
        this.getGroupDataFieldsProperty().remove(index);
        return this;
    }

    /**
     * Возвращает кнопку добавления строки
     * @return {Button}
     */
    public getAddButton() {
        return this.__addRowButton;
    }

    /**
     * Возвращает свойство строк
     * @return {ObservableArray<GroupedDataField>}
     */
    public getGroupDataFieldsProperty(): ObservableArray<GroupedDataField> {
        return this.__rows;
    }
}

/**
 * @typedef {Object} DictionaryDataFieldOptions
 * @property {boolean} [first]
 */
