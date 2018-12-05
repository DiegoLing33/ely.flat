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
 + Файл: elyTextField.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyFieldType from "@enums/elyFieldType";
import elyFieldOptions from "@options/fields/elyFieldOptions";

/**
 * Поле: Ввод текста
 * @version 1.0
 */
@designable("value", elyDesignableFieldState.GETSET, "string")
@designable("fieldType", elyDesignableFieldState.GETSET, "string", elyFieldType.rawList())
export default class elyTextField extends elyField<string> {

    /**
     * Флаг шифрования данных
     *
     * Данный флаг необходим для elyFormBuilder, при получении
     * и отрпавки значений, поле шифруется ключем.
     */
    public encrypted: boolean = false;

    /**
     * Свойство: тип вводимых данных
     * @ignore
     */
    protected readonly fieldTypeProperty: elyObservableProperty<elyFieldType>;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyFieldOptions<string> & {
        filedType?: string | elyFieldType,
        encrypted?: boolean, fieldIcon?: string,
    } = {}) {
        super(options, new elyInput({type: options.filedType}));
        this.valueProperty = this.accessoryView.valueProperty;
        this.editableProperty = this.accessoryView.editableProperty;
        this.fieldTypeProperty = new elyObservableProperty<elyFieldType>(elyFieldType.text);

        this.fieldTypeProperty.change((newValue) => {
            this.accessoryView.attribute("type", newValue.value);
        });
        this.fieldType(options.filedType || elyFieldType.text.value);
        if (options.fieldIcon) this.setIcon(options.fieldIcon);
        this.encrypted = options.encrypted || false;
        (this.accessoryView as elyInput).addInputObserver((value) =>
            this.notificate("input", [value]));
        this.applyProtocolOptions(options);
    }

    /**
     * Возвращает тип вводимых данных
     */
    public fieldType(): elyFieldType;

    /**
     * Устанавливает тип вводимых данных
     */
    public fieldType(value: elyFieldType | string): elyTextField;

    /**
     * Возвращает и устанавливает тип вводимых данных
     */
    public fieldType(value?: elyFieldType | string): elyFieldType | null | elyTextField {
        if (typeof value === "string") value = elyFieldType.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.fieldTypeProperty);
    }

    /**
     * Возвращает стандартное значение
     */
    public defaultValue(): string {
        return super.defaultValue() || "";
    }

    /**
     * Возвращает true, если поле пустое
     */
    public isEmpty(): boolean {
        return this.value() === "";
    }

    /**
     * Добавляет слушатель изменения поля
     * @param observer
     */
    public addInputObserver(observer: (value: string) => void): elyTextField {
        this.addObserver("input", observer);
        return this;
    }

    /**
     * Возвращает true, если данные введены правильно
     */
    public isValidData(): boolean {
        if (this.manualValidation) return this.manualValidation(this.value());
        if (this.fieldType().value === elyFieldType.mail.value) {
            return /^(.+)@(.+)\.(.+)/.test(this.value());
        }
        return true;
    }

    /**
     * Устанавливает иконку
     * @param iconName - имя иконки
     */
    public setIcon(iconName: string): elyTextField {
        this.accessoryView.removeFromSuperview();
        // Помещает иконку в левую часть
        this.fieldLineView.getDocument().append(this.accessoryView.getDocument());
        this.actionIconView.iconName(iconName);
        this.actionIconView.hidden(false);
        return this;
    }
}
