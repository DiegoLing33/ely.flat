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
 + Файл: elyComboField.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import elyComboFieldItemProtocol from "@controls/protocols/elyComboFieldItemProtocol";
import elyTextView from "@controls/text/elyTextView";
import elyListView from "@controls/view/elyListView";
import elyUtils from "@core/elyUtils";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyComboFieldOptions from "@options/fields/elyComboFieldOptions";

/**
 * Элемент: Поле выбора значения
 */
export default class elyComboField extends elyField<elyComboFieldItemProtocol> {

    public maxSearchResultsCount: number;

    public tipsView: elyControl;

    /**
     * Состояние отображения полосы подсказки
     */
    public readonly tipsBoxVisibility: elyObservableProperty<boolean>;

    /**
     * Элементы выбора
     */
    public readonly items: elyObservableDictionary<string>;

    /**
     * Результаты поиска
     */
    public readonly searchResults: elyObservableDictionary<string>;

    /**
     * Инииилизирует объект
     * @param {*} [options={}] - параметры
     */
    constructor(options: elyComboFieldOptions = {}) {
        super(options, new elyInput({class: "ef-input"}));

        this.tipsView          = new elyControl({class: "ef-tips-view"});
        this.tipsBoxVisibility = new elyObservableProperty<boolean>(false);

        this.getDocument().append(this.tipsView.getDocument());

        this.accessoryView.getDocument().oninput =
            (e: any) => this.find(this.accessoryView.getDocument().value, e.inputType === "insertText");

        this.tipsBoxVisibility.change((newValue, oldValue) => {
            if (oldValue === newValue || !this.editable()) return;
            if (newValue) {
                this.removeClass("ef-control-opacity");
                this.tipsView.hidden(false);
                this.__updateTipsView();
                this.accessoryView.clearValue();
                this.accessoryView.getDocument().focus();
                this.__lock(false);
                this.__setCancelIcon();
            } else {
                this.tipsView.hidden(true);
                this.accessoryView.value(this.value().key);
                this.addClass("ef-control-opacity");
                this.__lock(true);
                this.__setStaticIcon();
            }

        });
        this.valueProperty.change((newValue) => {
            this.tipsBoxVisibility.set(false);
            this.accessoryView.value(newValue.key);
        });

        this.editableProperty.change((newValue) => {
            if (newValue) this.opacity(1);
            else this.opacity(0.74);
        });

        this.searchResults = new elyObservableDictionary<string>();
        this.searchResults.change(() => this.__updateTips());

        this.items = new elyObservableDictionary<string>();
        this.items.change(() =>  this.clearValue());
        elyUtils.forEach(options.items || {}, (index, value) => {
            this.items.add(index, value);
        });

        /**
         * Максимальное количество поисковых результатов
         * @type {number}
         */
        this.maxSearchResultsCount = options.maxSearchResults || 5;

        this.__setStaticIcon();

        this.__lock(true);
        this.applyProtocolOptions(options);
        this.tipsView.hidden(true);
        this.actionIconView.hidden(false);
    }

    /**
     * Добавляет элемент
     * @param title - Заголовок
     * @param value - Значение
     */
    public add(title: string | string[], value?: any): elyComboField {
        if (title instanceof Array) {
            for (const item of (title as string[])) {
                this.add(item);
            }
            return this;
        }

        this.items.add(title, value === undefined ? this.items.count().toString() : value.toString());
        return this;
    }

    /**
     * Удаляет элементы
     * @param title
     */
    public removeItem(title: string): elyComboField {
        this.items.remove(title);
        return this;
    }

    public defaultValue(): elyComboFieldItemProtocol {
        return {key: "", value: ""};
    }

    public isEmpty(): boolean {
        return this.value() === null || this.value().value === null;
    }

    public isValueDefault(value: elyComboFieldItemProtocol): boolean {
        const def = this.defaultValue();
        return value.value === def.value && value.key === def.key;
    }

    public tryToSetValue(value: string) {
        elyUtils.forEach(this.items.get(), (index: any, value1: any, it: number) => {
            if (value1 === value) {
                this.valueProperty.set(this.items.itemByIndex(it)!);
                return elyUtils.BREAK_FLAG;
            }
        });
    }

    /**
     * Очищает значение
     * @return {elyComboField}
     */
    public clearValue(): elyComboField {
        this.value(this.defaultValue());
        this.searchResults.clear();
        return this;
    }

    public find(str = "", completion = false): elyComboField {
        this.searchResults.clear();

        this.items.forEach((title, value) => {
            if (title.toLowerCase().indexOf(str.toLowerCase()) > -1)
                this.searchResults.add(title, value);
        });
        if (this.searchResults.count() === 1 && completion) {
            this.valueProperty.set(this.searchResults.itemByIndex(0)!);
        } else {
            this.tipsBoxVisibility.set(true);
            this.__setCancelIcon();
            this.__updateTips();
        }
        return this;
    }

    protected __lock(bool: boolean): void {
        this.accessoryView.editable(!bool);
    }

    /**
     * Обновляет положение и размер формы подсказок
     * @private
     */
    protected __updateTipsView() {
        const offsetTop = (this.getDocument().offsetTop + this.accessoryView.offSize().height) + "px";
        const width     = (this.offSize().width + 2) + "px";
        this.tipsView.css({"top": offsetTop, "width": width, "margin-left": "-1px"});
    }

    /**
     * Обновляет элементы подсказок
     */
    protected __updateTips() {
        const list    = new elyListView();
        const results = elyUtils.cut(this.searchResults.get(), this.maxSearchResultsCount);
        elyUtils.forEach(results, (key, value) => {
            const listItem                 = new elyTextView({text: key});
            listItem.getDocument().onclick = () => {
                this.valueProperty.set({key, value});
            };
            list.add(listItem);

        });

        this.tipsView.removeViewContent();
        this.tipsView.addSubView(list);
    }

    protected __setStaticIcon() {
        this.actionIconView.iconName("search");
        return this;
    }

    /**
     * Устанавливает иконку при ошибке или отмене
     * @return {elyTextView}
     * @protected
     */
    protected __setCancelIcon() {
        this.actionIconView.iconName("times");
        return this;
    }

    protected actionIconDidClick() {
        super.actionIconDidClick();
        if (!this.editable()) return;
        if (!this.tipsBoxVisibility.get()) {
            this.find("");
        } else {
            this.tipsBoxVisibility.set(false);
        }
    }
}
