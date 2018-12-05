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
 + Файл: elyTextAreaField.ts                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservableProperty from "ely.core/src/observable/properties/elyObservableProperty";
import elyInput from "../action/elyInput";
import elyFieldOptions from "../options/fields/elyFieldOptions";
import elyField from "./elyField";

/**
 * Поле ввода: Многострочный ввод текста
 */
export default class elyTextAreaField extends elyField<string> {

    /**
     * Свойство: количество строк
     * @ignore
     */
    protected readonly rowsNumberProperty: elyObservableProperty<number>;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyFieldOptions<string> &
        { rowsNumber?: number } = {}) {
        super(options, new elyInput({tag: "textarea"}));
        this.rowsNumberProperty = new elyObservableProperty<number>();
        this.rowsNumberProperty.addChangeObserver((oldValue, newValue) => {
            (this.accessoryView.getDocument() as HTMLTextAreaElement).rows = newValue;
        });
        this.valueProperty = this.accessoryView.valueProperty;
        this.applyProtocolOptions(options);
        this.rowsNumber(options.rowsNumber || 4);
        (this.accessoryView as elyInput).addInputObserver((value) =>
            this.notificate("input", [value]));
    }

    /**
     * Добавляет слушатель изменения поля
     * @param observer
     */
    public addInputObserver(observer: (value: string) => void): elyTextAreaField {
        this.addObserver("input", observer);
        return this;
    }

    /**
     * Возвращает количество строк
     */
    public rowsNumber(): number;

    /**
     * Устанавливает количество строк
     */
    public rowsNumber(value: number): elyTextAreaField;

    /**
     * Возвращает и устанавливает количество строк
     */
    public rowsNumber(value?: number): number | null | elyTextAreaField {
        return elyObservableProperty.simplePropertyAccess(this, value, this.rowsNumberProperty);
    }

    /**
     * Стандартное значение
     */
    public defaultValue(): string {
        return "";
    }

    /**
     * Возвращает true, если поле пустое
     */
    public isEmpty(): boolean {
        return this.accessoryView.isEmpty();
    }

}
