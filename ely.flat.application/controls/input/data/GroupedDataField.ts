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
 + Файл: GroupedDataField.ts                                                  +
 + Файл изменен: 15.03.2019 20:07:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Guard} from "ely.core";
import View from "../../../core/controls/View";
import Control from "../../action/Control";
import Field, {FieldOptions} from "../Field";
import TextField from "../TextField";

/**
 * Опции {@link GroupedDataField}
 */
export interface GroupedDataFieldOptions extends FieldOptions<string[]> {
    /**
     * Элементы группы
     */
    items?: Array<Field<any> | View>;
}

/**
 * Элемент группы полей
 */
export interface GroupedDataFieldItem {
    field?: Field<any>;
    percentage?: number;
    block?: View;
}

/**
 * Элемент отображения: сгрупированное поле.
 *
 * Временно поддерживается только тип string.
 *
 * @class GroupedDataField
 * @augments {View}
 */
export default class GroupedDataField extends Field<string[]> {

    /**
     * Поля
     */
    protected __fields: GroupedDataFieldItem[] = [];

    /**
     * Конструктор
     * @param {GroupedDataFieldOptions} [options] - опции
     */
    public constructor(options: GroupedDataFieldOptions = {}) {
        super(options);
        this.addClass("ef-input", "ef-input-group");
        this.removeViewContent();

        // this.valueProperty.removeAllObservers("change");
        // this.valueProperty.change(a => {
        //     a.forEach((value, index) => this.getFieldsOnly()[index].field!.value(value));
        // });

        this.editableProperty.removeAllObservers("change");
        this.editableProperty.change(value => {
            this.getFieldsOnly().forEach(field => field.field!.editable(value));
        });

        if (options.items) {
            options.items.forEach(item => {
                if (item instanceof Field) this.addField(item as TextField);
                else this.addBlock(item);
            });
            this.rebuild();
        }

        Guard.variableAndSet(options.value, this.value, this);
    }

    /**
     * Возвращает элемент управления
     * @deprecated Объект GroupedDataField не имеет элемента управления
     */
    public getAccessory(): HTMLInputElement {
        return this.__accessoryView;
    }

    /**
     * Добавляет поле
     * @param {Field<*>} field - поле
     * @param {number} percentage - дробное значение - процент места в строке
     *
     * @return {GroupedDataField}
     */
    public addField(field: TextField, percentage?: number): GroupedDataField {
        field.change(() => this.value(this.getValuesArray()));
        field.addInputObserver(value => {
            this.notificate("input", [this.getFieldsOnly().map(f => {
                if (f.field! === field) return value;
                else return f.field!.value();
            })]);
        });
        this.__fields.push({field, percentage});
        return this.rebuild();
    }

    /**
     * Возвращает массив значений
     */
    public getValuesArray(): string[] {
        return this.getFieldsOnly().map(item => {
            if (Guard.isSet(item.field!.value())) return item.field!.value();
            else return null;
        });
    }

    /**
     * Добавляет блок отображения
     * @param {View} content
     * @return {GroupedDataField}
     */
    public addBlock(content: View): GroupedDataField {
        this.__fields.push({block: content});
        return this.rebuild();
    }

    /**
     * Возаращает массив всех полей и элементов в группе
     * @return {GroupedDataFieldItem[]}
     */
    public getFieldsAndBlocks(): GroupedDataFieldItem[] {
        return this.__fields;
    }

    /**
     * Возвращает только поля в группе
     * @return {GroupedDataFieldItem[]}
     */
    public getFieldsOnly(): GroupedDataFieldItem[] {
        return this.__fields.filter(a => Guard.isSet(a.field));
    }

    /**
     * Выполняет перестроение элемента
     * @return {GroupedDataField}
     */
    public rebuild(): GroupedDataField {
        this.removeViewContent();
        const percentageMode = this.__fields.every(value => Guard.isSet(value.percentage) || Guard.isSet(value.block));
        this.__fields.forEach(field => {
            if (field.field) {
                this.getDocument().append(field.field.getAccessory());
                if (percentageMode) {
                    field.field.getAccessory().style.width = (field.percentage! * 100) + "%";
                } else {
                    field.field.getAccessory().style.width = (100 / this.getFieldsOnly().length) + "%";
                }
            }
            if (field.block) {
                const view = new Control({class: "ef-input-block"});
                view.addSubView(field.block);
                this.getDocument().append(view.getDocument());
            }
        });
        return this;
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
     * Возвращает true, если все элементы прошли валидацию
     * @return {boolean}
     */
    public isValid(): boolean {
        return this.getFieldsOnly().every(f => f.field!.isValid());
    }
}

/**
 * @typedef {Object} GroupedDataFieldOptions
 * @property {boolean} [first]
 */
