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
 + Файл: elyDataPickerField.ts                                                +
 + Файл изменен: 08.01.2019 02:54:40                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {efListView} from "@controls/list/efListView";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import elyGuard from "@core/elyGuard";
import elyUtils from "@core/elyUtils";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";
import {elyFieldView, elyFieldViewOptions} from "@fields/elyFieldView";

/**
 * Опции для {@link elyDataPickerField}
 */
export interface elyDataPickerFieldOptions extends elyFieldViewOptions<any> {
    maxTipsCount?: number;
    items?: { [title: string]: any } | string[];
}

/**
 * Поле: Выбор элемента
 * @class elyDataPickerField
 * @augments {elyField<*>}
 *
 */
export class elyDataPickerField extends elyFieldView<any> {

    /**
     * Элементы поля
     * @type {elyObservableDictionary<*>}
     * @readonly
     */
    public readonly items: elyObservableDictionary<any> = new elyObservableDictionary<any>();

    /**
     * Элемент отображения подсказок
     */
    public readonly tipsView = new elyControl({class: "ef-tips-view"});

    /**
     * Найденные ключи
     * @type {elyObservableArray<string>}
     */
    public readonly searchResultsKeys: elyObservableArray<string> = new elyObservableArray<string>();

    /**
     * Иконка
     * @type {elyIconView}
     */
    public readonly actionIconView: elyIconView = new elyIconView({class: "ef-input-status"});

    /**
     * Максимальное количество подсказок
     * @protected
     * @type {number}
     */
    protected __maxTipsCount: number = 5;

    /**
     * Конструктор
     * @param {elyDataPickerFieldOptions} props - параметры
     */
    public constructor(props: elyDataPickerFieldOptions = {}) {
        super({accessory: new elyControl({tag: "input", class: "ef-input"})});
        this.getDocument().append(this.actionIconView.getDocument());

        const accessory = this.accessoryView.getDocument() as HTMLInputElement;

        /**
         * Максимальное кол-во подсказок
         * @protected
         */
        this.__maxTipsCount = props.maxTipsCount || 5;

        this.editableProperty.change(value => {
            accessory.disabled = !value;
            if (value) {
                this.actionIconView.iconName("close");
                accessory.value = "";
                this.accessoryView.makeFirstResponder();
                this.tipsView.hidden(false);
                this.find(accessory.value);
            } else {
                this.actionIconView.iconName("search");
                this.tipsView.hidden(true);
                if (this.searchResultsKeys.length() === 0) {
                    if (this.value() !== null) {
                        accessory.value = this.items.keyOf(this.value()) || "";
                    } else {
                        accessory.value = "";
                    }
                }
            }
        });

        this.searchResultsKeys.change(() => {
            const list = new efListView();
            let index = 0;
            for (const value of this.searchResultsKeys.get()) {
                const listItem = new elyTextView({text: value});
                listItem.getDocument().onclick = () => {
                    this.valueProperty.set(this.items.item(value));
                };
                list.addView(listItem);
                index++;
                if (index >= this.maxTipsCount()) break;
            }

            this.tipsView.removeViewContent();
            this.tipsView.addSubView(list);
        });

        this.valueProperty.change(value => {
            accessory.value = this.items.keyOf(value) || "";
            this.editable(false);
        });

        this.actionIconView.hidden(false);
        this.editable(false);

        if (props.items) this.addItems(props.items);

        accessory.oninput = (e: any) => {
            this.find(accessory.value, e.inputType === "insertText");
        };
        this.getDocument().append(this.tipsView.getDocument());

        this.actionIconView.addObserver("click", () => this.editableProperty.toggle());

        if (elyGuard.isSet(props.placeholder)) accessory.placeholder = props.placeholder!;
        if (elyGuard.isSet(props.value)) this.value(props.value);
    }

    /**
     * Выполняет поиск
     * @param {string} str
     * @param {boolean} [completion = false]
     */
    public find(str: string, completion: boolean = false): void {
        this.searchResultsKeys.clear();

        this.items.forEach(title => {
            if (title.toLowerCase().indexOf(str.toLowerCase()) > -1)
                this.searchResultsKeys.push(title);
        });
        if (this.searchResultsKeys.length() === 1 && completion) {
            const item = this.items.item(this.searchResultsKeys.item(0));
            if (item !== null) this.valueProperty.set(item);
        }
    }

    /**
     * Добавляет значение
     * @param {string} title
     * @param {*} value
     * @return {this}
     */
    public addItem(title: string, value: any): elyDataPickerField {
        this.items.add(title, value);
        return this;
    }

    /**
     * Лобавляет значения
     * @param {* | string[]} items - значения
     */
    public addItems(items: { [title: string]: any } | string[]): elyDataPickerField {
        if (items instanceof Array) {
            items.forEach((value, index) => {
                this.addItem(value, index);
            });
        } else {
            elyUtils.forEach(items, (index, value) => this.addItem(index, value));
        }
        return this;
    }

    /**
     * Возвращает true, если поле пустое
     * @return {boolean}
     */
    public isEmpty(): boolean {
        return this.valueProperty.isNull();
    }

    /**
     * Возвращает максимальное количество результатов
     * @return {number}
     */
    public maxTipsCount(): number;

    /**
     * Устанавливает максимальное количество результатов
     * @param value
     */
    public maxTipsCount(value: number): elyDataPickerField;

    /**
     * Максимальное кол-во подсказок
     * @param {number} [value]
     * @return {this|number}
     */
    public maxTipsCount(value?: number): number | elyDataPickerField {
        if (value === undefined) return this.__maxTipsCount;
        this.__maxTipsCount = value;
        return this;
    }

}
