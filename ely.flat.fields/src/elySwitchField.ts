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
 + Файл: elySwitchField.ts                                                    +
 + Файл изменен: 06.01.2019 00:25:54                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyTextView from "@controls/text/elyTextView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import {elyFieldView, elyFieldViewOptions} from "@fields/elyFieldView";

/**
 * Опции {@link elySwitchField}
 */
export interface elySwitchFieldOptions extends elyFieldViewOptions<boolean> {
    /**
     * Заголовок
     */
    title?: string;
}

/**
 * Поле: Переключатель
 * @version 1.0
 * @class elySwitchField
 * @augments {elyField<boolean>}
 */
@designable("value", elyDesignableFieldState.GETSET, "boolean")
@designable("title", elyDesignableFieldState.GETSET, "string")
@designable("placeholder", elyDesignableFieldState.DENY)
export class elySwitchField extends elyFieldView<boolean> {

    /**
     * Отображение заголовка
     * @readonly
     * @type {elyTextView}
     */
    public readonly titleView: elyTextView = new elyTextView({class: "title"});

    /**
     * Заголовок
     * @readonly
     * @type {elyObservableProperty<string>}
     */
    public readonly titleProperty: elyObservableProperty<string> = new elyObservableProperty<string>();

    /**
     * Иконка переключателя
     * @readonly
     * @protected
     * @type {elyControl}
     */
    protected readonly switcherView: elyControl = new elyControl({class: "switcher"});

    /**
     * Элемент с переключателем
     * @readonly
     * @protected
     * @type {elyControl}
     */
    protected readonly switcherBox: elyControl = new elyControl({tag: "label", class: "ef-switch"});

    /**
     * Конструктор
     * @param {elySwitchFieldOptions} props
     */
    public constructor(props: elySwitchFieldOptions = {}) {
        super({accessory: new elyControl({tag: "input", class: "ef-input"})});
        const accessory = this.accessoryView.getDocument() as HTMLInputElement;
        accessory.type = "checkbox";
        accessory.onchange = () => this.value(accessory.checked);

        this.editableProperty.change((newValue) => accessory.disabled = !newValue);
        this.valueProperty.change((newValue) => accessory.checked = newValue);
        this.titleProperty.change((newValue) => this.titleView.text(newValue));

        this.addClass("ef-input-switch");
        this.removeViewContent();
        this.switcherBox.addSubView(this.accessoryView);
        this.switcherBox.addSubView(this.switcherView);
        this.getDocument().append(this.switcherBox.getDocument());
        this.getDocument().append(this.titleView.getDocument());

        this.editable(true);
        if (props.title) this.titleProperty.set(props.title);
        if (props.value) this.value(props.value);

    }

    /**
     * Проверка на пустоту значения elySwitchField, которое всегда отрицательно.
     * Иными словами, поле {@link elySwitchField} не может быть пустым!
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return false;
    }

    /**
     * @ignore
     * @param flag
     */
    public error(flag: boolean): elySwitchField {
        return this;
    }

    /**
     * Устаналивает или возращает заголовок
     * @param {string} [title]
     * @return {this|string}
     */
    public title(title?: string): string | null | elySwitchField {
        return elyObservableProperty.simplePropertyAccess(this, title, this.titleProperty);
    }
}
