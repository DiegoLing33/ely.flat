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
 + Проект: ely.flat.application                                               +
 +                                                                            +
 + Файл: elyTextViewEditable.ts                                               +
 + Файл изменен: 27.11.2018 23:47:26                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import {elyTextField} from "@fields/elyTextField";

/**
 * Делегат вызывается для проверки возможности сохранить значение
 */
type elyTextViewEditableShouldSaveValueDelegate = (value: string, result: (res: boolean) => void) => void;

/**
 * Состояния объекта
 * @enum elyTextViewEditableState
 */
enum elyTextViewEditableState {
    /**
     * Отображение значения
     */
    PRESENT,

    /**
     * Редактирование
     */
    EDIT,
}

/**
 * Элемент отображения: Мутация elyTextView в редактируемый по клику элемент
 * @class elyTextViewEditable
 * @augments elyView
 */
export default class elyTextViewEditable extends elyView {

    /**
     * Свойство: флаг режима редактирования
     * @ignore
     */
    public readonly editmodeProperty: elyObservableProperty<boolean>
        = new elyObservableProperty<boolean>(false);

    /**
     * Свойство: флаг - разрешение редактирования
     * @ignore
     */
    public readonly editableProperty: elyObservableProperty<boolean>
        = new elyObservableProperty<boolean>(true);

    /**
     * Свойство: значение
     * @ignore
     */
    public readonly valueProperty: elyObservableProperty<string>
        = new elyObservableProperty<string>("");

    /**
     * Элемент отображения текста
     */
    protected readonly textView: elyTextView;

    /**
     * Поле редактирования текста
     */
    protected readonly textEditField: elyTextField = new elyTextField(/*{actionIcon: "check"}*/);

    /**
     * Делегат: проверка возможности сохранить значение
     */
    protected shouldSaveValueDelegate: elyTextViewEditableShouldSaveValueDelegate = ((val, res) => {
        res(true);
    });

    /**
     * Флаг того, что еще идет проверка
     * @ignore
     */
    private __isChecking: boolean = false;

    /**
     * Конструктор
     * @param props
     */
    constructor(props: elyViewOptions & { textView?: elyTextView, editmode?: boolean }) {
        super(props);
        this.textView = props.textView || new elyTextView({text: ""});
        this.textView.addClass("clickable");
        this.textEditField.hidden(true);

        // Изменение значения
        this.valueProperty.change((value, oldVal) => {
            this.textView.text(value);
            this.textEditField.value(value).placeholder(value);
            this.notificate("value", [value, oldVal]);
        });

        // Режим редактирования
        this.editmodeProperty.change(editMode => {
            if (!this.editable() || this.__isChecking) return;
            this.__isChecking = true;

            // Изменяет состояния иконки
            // this.textEditField.actionIconView.iconName("refresh");
            // this.textEditField.actionIconView.iconSpinning(true);

            /**
             * Выполняет попытку сохранить результаты,
             * проходя все необходимые проверки и делигаты.
             */
            const tryToSaveResults = (callback: (res: boolean) => void) => {
                if (this.textView.text() === this.textEditField.value()) {
                    // this.value(this.textEditField.value());
                    callback(true);
                    this.setEditorViewState(elyTextViewEditableState.PRESENT);
                } else {
                    /*
                    this.shouldSaveValueDelegate(this.textEditField.value(), res => {
                        if (res) {
                            this.value(this.textEditField.value());
                            callback(res);
                            this.setEditorViewState(elyTextViewEditableState.PRESENT);
                        } else {
                            this.value(this.textView.text());
                            this.textEditField.error(true);
                            callback(false);
                            this.setEditorViewState(elyTextViewEditableState.EDIT);
                        }
                    });*/
                }
            };

            /**
             * Выполняет попытку войти в режим редактирования
             * @param callback
             */
            const tryToEnterEditMode = (callback: (res: boolean) => void) => {
                this.setEditorViewState(elyTextViewEditableState.EDIT);
                callback(true);
            };

            if (editMode) tryToEnterEditMode(() => this.__isChecking = false);
            else tryToSaveResults(() => this.__isChecking = false);
            if (props.editmode) this.editemode(props.editmode);
        });

        this.textEditField.addObserver("actionClick", () => this.editemode(false));
        this.textView.addObserver("click", () => this.editemode(true));
        this.value(this.textView.text());

        this.getDocument().append(this.textView.getDocument());
        this.getDocument().append(this.textEditField.getDocument());
    }

    /**
     * Устанавливает делигат проверки возможности сохранения значения
     * @param delegate
     */
    public textViewEditableShouldSaveValue(delegate: elyTextViewEditableShouldSaveValueDelegate): elyTextViewEditable {
        this.shouldSaveValueDelegate = delegate;
        return this;
    }

    /**
     * Возвращает значение
     */
    public value(): string;

    /**
     * Устанавливает значение
     */
    public value(value: string): elyTextViewEditable;

    /**
     * Возвращает и устанавливает значение
     */
    public value(value?: string): string | null | elyTextViewEditable {
        return elyObservableProperty.simplePropertyAccess(this, value, this.valueProperty);
    }

    /**
     * Добавляет наблюдатель: изменение значения
     *
     * Имя обсервера: value
     *
     * @param o - наблюдатель
     */
    public addChangeValueObserver(o: (value: string, oldValue?: string) => void): elyTextViewEditable {
        this.addObserver("value", o);
        return this;
    }

    /**
     * Возвращает флаг - разрешение редактирования
     */
    public editable(): boolean;

    /**
     * Устанавливает флаг - разрешение редактирования
     */
    public editable(value: boolean): elyTextViewEditable;

    /**
     * Возвращает и устанавливает флаг - разрешение редактирования
     */
    public editable(value?: boolean): boolean | null | elyTextViewEditable {
        return elyObservableProperty.simplePropertyAccess(this, value, this.editableProperty);
    }

    /**
     * Возвращает флаг редактирования
     */
    public editemode(): boolean;

    /**
     * Устанавливает флаг редактирования
     */
    public editemode(value: boolean): elyTextViewEditable;

    /**
     * Возвращает и устанавливает флаг редактирования
     */
    public editemode(value?: boolean): boolean | null | elyTextViewEditable {
        return elyObservableProperty.simplePropertyAccess(this, value, this.editmodeProperty);
    }

    /**
     * Модифицирует элемент отображения в зависимости от состояния
     * @param state
     */
    protected setEditorViewState(state: elyTextViewEditableState): elyTextViewEditable {
        this.textEditField.hidden(state === elyTextViewEditableState.PRESENT);
        this.textView.hidden(state === elyTextViewEditableState.EDIT);
        // this.textEditField.actionIconView.iconName("check");
        // this.textEditField.actionIconView.iconSpinning(false);
        return this;
    }
}
