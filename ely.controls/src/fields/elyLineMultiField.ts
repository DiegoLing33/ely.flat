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
 + Файл: elyLineMultiField.ts                                                 +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyTextField from "@controls/fields/elyTextField";
import elyGridRowView from "@controls/flex/elyGridRowView";
import elyFieldProtocol from "@controls/protocols/elyFieldProtocol";
import elyView from "@core/controls/elyView";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";

/**
 * @deprecated
 */
export default class elyLineMultiField extends elyFieldProtocol<{ [key: string]: any }> {

    /**
     * Значение
     */
    public valueProperty: elyObservableDictionary<any>;

    /**
     * Прослушивает введение данных в TextField, вместе с общими ChangeObserver событиями.
     */
    public listenInput: boolean = false;

    /**
     * Поля
     */
    protected readonly __fields: Array<elyFieldProtocol<any>>;

    /**
     * Поля
     */
    protected readonly __items: elyView[];

    /**
     * Строка флекса
     */
    protected readonly __flex: elyGridRowView;

    /**
     * Консруктор
     * @param options
     */
    public constructor(options: any = {}) {
        super({class: "ef-line-field"});
        this.valueProperty = new elyObservableDictionary<any>();
        this.__fields = [];
        this.__items = [];
        this.__flex = new elyGridRowView();
        this.getDocument().append(this.__flex.getDocument());
    }

    /**
     * Возвращает флекс элемент строки
     */
    public getFlex() {
        return this.__flex;
    }

    /**
     * Добавляет поле ввода
     * @param field
     * @param percentage
     */
    public addField(field: elyFieldProtocol<any> | elyView, percentage: number | string | null = null):
        elyLineMultiField {
        this.getFlex().add(field, percentage);
        this.__items.push(field);
        if (field instanceof elyFieldProtocol) {
            const id = this.__fields.length.toString();
            field.addChangeValueObserver((oldValue, newValue) => {
                this.valueProperty.add(id, newValue);
            });
            if (this.listenInput && field instanceof elyTextField) {
                field.addInputObserver((value) => {
                    this.valueProperty.add(id, value);
                });
            }
            this.__fields.push(field);
        }
        return this;
    }

    public defaultValue(): { [p: string]: string } {
        return {};
    }

    /**
     * Возвращает true, если одна из переменных пустая
     */
    public isEmpty(): boolean {
        for (const view of this.__fields) {
            if (view.isEmpty()) return true;
        }
        return false;
    }

    /**
     * Возвращает true, если все поля вернули true
     */
    public isValidData(): boolean {
        return true;
    }

}
