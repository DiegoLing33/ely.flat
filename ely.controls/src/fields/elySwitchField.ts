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
 + Файл: elySwitchField.ts                                                    +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import elyTextView from "@controls/text/elyTextView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elySwitchFieldOptions from "@options/fields/elySwitchFieldOptions";

/**
 * Поле: Переключатель
 * @version 1.0
 * @class elySwitchField
 * @augments {elyField<boolean>}
 */
@designable("value", elyDesignableFieldState.GETSET, "boolean")
@designable("title", elyDesignableFieldState.GETSET, "string")
@designable("placeholder", elyDesignableFieldState.DENY)
export default class elySwitchField extends elyField<boolean> {

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
     * @param {elySwitchFieldOptions} options
     */
    public constructor(options: elySwitchFieldOptions = {}) {
        super(options, new elyInput({type: "checkbox"}));

        /**
         * @type {elyObservableProperty<boolean>}
         */
        this.valueProperty = new elyObservableProperty<boolean>(false);

        this.editableProperty.change((newValue) => this.accessoryView.editable(newValue));
        this.valueProperty.change((newValue) => this.accessoryView.getDocument().checked = newValue);
        this.titleProperty.change((newValue) => this.titleView.text(newValue));
        this.editableProperty.change((newValue) => this.accessoryView.getDocument().disabled = !newValue);
        this.accessoryView.valueProperty.change(() =>
            this.valueProperty.set(this.accessoryView.getDocument().checked || false));

        this.addClass("ef-input-switch");
        this.removeViewContent();
        this.switcherBox.addSubView(this.accessoryView);
        this.switcherBox.addSubView(this.switcherView);
        this.fieldLineView.addSubView(this.switcherBox);
        this.fieldLineView.addSubView(this.titleView);

        this.accessoryView.attribute("type", "checkbox");

        this.getDocument().appendChild(this.fieldLineView.getDocument());

        if (options.title) this.titleProperty.set(options.title);
        this.applyProtocolOptions(options);

    }

    /**
     * Стандартное значение
     * @return {boolean}
     */
    public defaultValue(): boolean {
        return false;
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
