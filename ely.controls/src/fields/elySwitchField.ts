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

import {designable, elyDesignableFieldState} from "ely.core/src/elyDesignable";
import elyObservableProperty from "ely.core/src/observable/properties/elyObservableProperty";
import elyControl from "../action/elyControl";
import elyInput from "../action/elyInput";
import elySwitchFieldOptions from "../options/fields/elySwitchFieldOptions";
import elyTextView from "../text/elyTextView";
import elyField from "./elyField";

/**
 * Поле: Переключатель
 * @version 1.0
 */
@designable("value", elyDesignableFieldState.GETSET, "boolean")
@designable("title", elyDesignableFieldState.GETSET, "string")
@designable("placeholder", elyDesignableFieldState.DENY)
export default class elySwitchField extends elyField<boolean> {

    /**
     * Отображение заголовка
     */
    public readonly titleView: elyTextView;

    /**
     * Заголовок
     */
    public readonly titleProperty: elyObservableProperty<string>;

    /**
     * Иконка переключателя
     */
    protected readonly switcherView: elyControl;

    /**
     * Элемент с переключателем
     */
    protected readonly switcherBox: elyControl;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elySwitchFieldOptions = {}) {
        super(options, new elyInput({type: "checkbox"}));

        this.valueProperty = new elyObservableProperty<boolean>(false);
        this.editableProperty.addChangeObserver((oldValue, newValue) => {
            this.accessoryView.editable(newValue);
        });

        this.valueProperty.addChangeObserver((oldValue, newValue) => {
            this.accessoryView.getDocument().checked = newValue;
        });

        this.accessoryView.valueProperty.addChangeObserver(() =>
            this.valueProperty.set(this.accessoryView.getDocument().checked || false));

        this.switcherView  = new elyControl({class: "switcher"});
        this.switcherBox   = new elyControl({tag: "label", class: "ef-switch"});
        this.titleView    = new elyTextView({class: "title"});
        this.titleProperty = new elyObservableProperty<string>();

        this.addClass("ef-input-switch");
        this.removeViewContent();
        this.switcherBox.addSubView(this.accessoryView);
        this.switcherBox.addSubView(this.switcherView);
        this.fieldLineView.addSubView(this.switcherBox);
        this.fieldLineView.addSubView(this.titleView);
        this.accessoryView.attribute("type", "checkbox");

        this.getDocument().appendChild(this.fieldLineView.getDocument());

        this.titleProperty.addChangeObserver((oldValue, newValue) => {
            this.titleView.text(newValue);
        });

        this.editableProperty.addChangeObserver((oldValue, newValue) =>
            this.accessoryView.getDocument().disabled = !newValue);

        if (options.title) this.titleProperty.set(options.title);
        this.applyProtocolOptions(options);

    }

    /**
     * Стандартное значение
     */
    public defaultValue(): boolean {
        return false;
    }

    /**
     * Проверка на пустоту значения elySwitchField, которое всегда отрицательно.
     * Иными словами, поле {@link elySwitchField} не может быть пустым!
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
     * @param title
     */
    public title(title?: string): string | null | elySwitchField {
        return elyObservableProperty.simplePropertyAccess(this, title, this.titleProperty);
    }
}
