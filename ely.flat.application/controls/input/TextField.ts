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
 + Файл: TextField.ts                                                     +
 + Файл изменен: 09.02.2019 19:08:52                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Field, {FieldOptions} from "@controls/input/Field";
import ContainerView from "@controls/layout/ContainerView";
import IconView from "@controls/text/IconView";
import View from "@core/controls/View";
import {variable} from "@core/Guard";
import TextFieldType from "@enums/TextFieldType";

/**
 * Опции {@link TextField}
 */
export interface TextFieldOptions extends FieldOptions<string> {
    fieldType?: TextFieldType | string;
    rightIconName?: string;
    leftIconName?: string;
}

/**
 * Поле ввода текста
 * @class TextField
 * @augments {View}
 */
export default class TextField extends Field<string> {

    public static willBeDeserialized(obj: any) {
        if (typeof obj.fieldType === "string") obj.fieldType = TextFieldType.byName(obj.fieldType);
    }

    /**
     * Правая иконка
     * @protected
     * @ignore
     */
    protected __rightIconContainerView: ContainerView<IconView> | null = null;

    /**
     * Левая иконка
     * @protected
     * @ignore
     */
    protected __leftIconContainerView: ContainerView<IconView> | null = null;

    /**
     * Конструктор
     * @param {TextFieldOptions} options
     */
    public constructor(options: TextFieldOptions = {}) {
        super(options);
        this.addClass("ef-input");
        this.getAccessory().onchange = () => {
            this.value(this.getAccessory().value);
        };

        this.getAccessory().oninput = (e) => {
            this.notificate("input", [this.getAccessory().value, e]);
        };

        this.valueProperty.change((value, oldVal) => {
            this.getAccessory().value = value;
        });

        variable(options.value, () => this.value(options.value!));
        variable(options.fieldType, () => this.fieldType(options.fieldType!));
        variable<string>(options.rightIconName, (v) => this.setRightIcon(v));
        variable<string>(options.leftIconName, (v) => this.setLeftIcon(v));
    }

    /**
     * Возвращает тип поля текста
     * @return {TextFieldType}
     */
    public fieldType(): TextFieldType;

    /**
     * Устанавливает тип поля текста
     * @param {TextFieldType | string} value - значение
     * @return {this}
     */
    public fieldType(value: TextFieldType | string): TextField;

    /**
     * Возвращает и устанавливает тип поля текста
     * @param {TextFieldType | string} [value] - значение
     * @returns {TextFieldType|this|null}
     */
    public fieldType(value?: TextFieldType | string): TextFieldType | null | TextField {
        if (value === undefined) return TextFieldType.byName(this.getAccessory().type);
        if (typeof value === "string") value = TextFieldType.byName(value);
        this.getAccessory().type = value.value;
        return this;
    }

    /**
     * Добавляет наблюдатель: ввод текста
     *
     * Имя обсервера: input
     *
     * @param {function(value: string, e: Event)} o - наблюдатель
     */
    public addInputObserver(o: (value: string, e: Event) => void): TextField {
        this.addObserver("input", o);
        return this;
    }

    /**
     * Возвращает отображение правой иконки
     * @return {ContainerView<IconView>}
     */
    public getRightIconView(): ContainerView<IconView> | null {
        return this.__rightIconContainerView;
    }

    /**
     * Возвращает отображение левой иконки
     * @return {ContainerView<IconView>}
     */
    public getLeftIconView(): ContainerView<IconView> | null {
        return this.__leftIconContainerView;
    }

    /**
     * Устанавливает левую иконку
     * @param {string} name
     * @return {this}
     */
    public setLeftIcon(name: string): TextField {
        this.__leftIconContainerView = new ContainerView<IconView>(new IconView({iconName: name}));
        this.__leftIconContainerView.addClass("ef-input-prefix");
        return this.__rebuild();
    }

    /**
     * Устанавливает правую иконку
     * @param {string} name
     * @return {this}
     */
    public setRightIcon(name: string): TextField {
        this.__rightIconContainerView = new ContainerView<IconView>(new IconView({iconName: name}));
        this.__rightIconContainerView.addClass("ef-input-suffix");
        return this.__rebuild();
    }

    /**
     * Возвращает имя правой иконки
     * @return {string}
     */
    public rightIconName(): string;

    /**
     * Устанавливает имя правой иконки
     * @param {string} value - значение
     * @return {this}
     */
    public rightIconName(value: string): TextField;

    /**
     * Возвращает и устанавливает имя правой иконки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public rightIconName(value?: string): string | null | TextField {
        if (value === undefined) {
            if (this.getRightIconView())
                return this.getRightIconView()!.getView().iconName();
            return null;
        }
        if (value === "") this.removeRightIcon();
        else this.setRightIcon(value);
        return this;
    }

    /**
     * Возвращает имя левой иконки
     * @return {string}
     */
    public leftIconName(): string;

    /**
     * Устанавливает имя левой иконки
     * @param {string} value - значение
     * @return {this}
     */
    public leftIconName(value: string): TextField;

    /**
     * Возвращает и устанавливает имя левой иконки
     * @param {string} [value] - значение
     * @returns {string|this|null}
     */
    public leftIconName(value?: string): string | null | TextField {
        if (value === undefined) {
            if (this.getLeftIconView())
                return this.getLeftIconView()!.getView().iconName();
            return null;
        }
        if (value === "") this.removeLeftIcon();
        else this.setLeftIcon(value);
        return this;
    }

    /**
     * Удаляет левую иконку
     * @return {this}
     */
    public removeLeftIcon(): TextField {
        this.removeClass("with-prefix");
        this.__leftIconContainerView = null;
        return this.__rebuild();
    }

    /**
     * Удаляет левую иконку
     * @return {this}
     */
    public removeRightIcon(): TextField {
        this.removeClass("with-suffix");
        this.__rightIconContainerView = null;
        return this.__rebuild();
    }

    /**
     * Возвращает true, если данные валидны
     * @return {boolean}
     */
    public isValid(): boolean {
        return super.isValid();
    }

    /**
     * Возвращает true, если данные пусты
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return super.isEmpty() || this.value()!.trim() === "";
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        const obj: any = {};
        if (this.getRightIconView()) obj.rightIconName = this.getRightIconView()!.getView().iconName();
        if (this.getLeftIconView()) obj.leftIconName = this.getLeftIconView()!.getView().iconName();

        return {
            ...super.serialize(),
            ...obj,
            fieldType: this.fieldType().serialize(),
        };
    }

    /**
     * перестраивает поле ввода
     * @protected
     * @ignore
     */
    protected __rebuild(): TextField {
        this.removeViewContent();
        this.getDocument().append(this.getAccessory());
        if (this.getLeftIconView()) {
            this.addClass("with-prefix");
            this.getDocument().append(this.getLeftIconView()!.getDocument());
        }
        if (this.getRightIconView()) {
            this.addClass("with-suffix");
            this.getDocument().append(this.getRightIconView()!.getDocument());
        }
        return this;
    }

}

/**
 * @typedef {Object} TextFieldOptions
 * @property {TextFieldType|string} [fieldType]
 * @property {string} [value]
 * @property {boolean} [editable = true]
 * @property {string} [placeholder = ""]
 * @property {string} [rightIconName = ""]
 * @property {string} [leftIconName = ""]
 */
