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
 + Файл: elyFileChooseField.ts                                                +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elyField from "@controls/fields/elyField";
import elyGridView from "@controls/flex/elyGridView";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyUtils from "@core/elyUtils";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyFieldOptions from "@options/fields/elyFieldOptions";

/**
 * Опции элемента поля выбора файла
 */
interface elyFileChooseFieldOptions extends elyFieldOptions<File[]> {
    /**
     * Заголовок, отображаемый в поле текста
     * Может быть установлено через placeholder
     */
    title?: string;
}

/**
 * Поле выбора файла
 *
 * @version 1.0
 */
@designable("title", elyDesignableFieldState.GETSET, "string")
@designable("maxFilesCount", elyDesignableFieldState.GETSET, "string|number")
@designable("multiplyFiles", elyDesignableFieldState.GETSET, "boolean")
export default class elyFileChooseField extends elyField<File[]> {

    /**
     * Элеиент положения файла
     */
    public fileChooseView: elyControl;

    /**
     * Отображение заголовка
     */
    public titleView: elyTextView;

    /**
     * Сетка с файлами
     */
    public filesGridView: elyGridView;

    /**
     * Свойство: Заголовок
     */
    protected titleProperty: elyObservableProperty<string>;

    /**
     * Свойство: Загрузка нескольких файлов
     */
    protected multiplyFilesProperty: elyObservableProperty<boolean>;

    /**
     * Разрешенные расширения
     */
    protected acceptExtensionsProperty: elyObservableArray<string>;

    /**
     * Максимальное количество файлов
     */
    protected maxFilesCountValue: number;

    /**
     * Конструктор
     * @param options
     */
    constructor(options: elyFileChooseFieldOptions = {}) {
        super({}, new elyInput({type: "file"}));
        this.titleProperty = new elyObservableProperty<string>("Выбрать файл");
        this.titleProperty.change((newValue) => {
            this.titleView.text(newValue);
        });
        this.titleView = new elyTextView({class: "title", text: this.titleProperty.get("")});

        this.acceptExtensionsProperty = new elyObservableArray<string>();
        this.acceptExtensionsProperty.addChangeItemsObserver(() => {
            const items = this.acceptExtensionsProperty.items();
            if (items.length > 0) this.accessoryView.attribute("accept", items.join(","));
            else this.accessoryView.removeAttribute("accept");

        });

        this.multiplyFilesProperty = new elyObservableProperty<boolean>(true);
        this.multiplyFilesProperty.change((newValue) => {
            if (newValue) (this.accessoryView as elyControl).attribute("multiple", "multiple");
            else (this.accessoryView as elyControl).attribute("multiple", null);
        });
        this.multiplyFiles(true);
        this.maxFilesCountValue = 10;

        this.addClass("ef-file-choose");

        this.fileChooseView = new elyControl({class: "choose-place"});
        this.fieldLineView.addSubView(this.fileChooseView);

        if (options.placeholder) this.title(options.placeholder);
        if (options.title) this.title(options.title);

        this.fileChooseView.addObserver("click", () => {
            this.accessoryView.getDocument().click();
        });

        this.filesGridView = new elyGridView({class: "ef-files-grid", rowMargin: 5});
        this.filesGridView.hidden(true);
        this.fieldLineView.addSubView(this.filesGridView);

        this.clearValue();

        // Файлы были выбраны
        this.accessoryView.getDocument().onchange = () => {
            const files = this.accessoryView.getDocument().files;
            if (files.length > 0) {
                if (!this.multiplyFiles()) this.clearValue();
                elyUtils.forEach(files, (k, file) => {
                    if (this.valueProperty.get([]).length < this.maxFilesCountValue) {
                        if (elyUtils.find(this.valueProperty.get(),
                            ((index, value) => value === file)).value === null) {
                            this.valueProperty.get([]).push(file);
                        }
                    }
                });
                this.rebuild();

            }
        };
    }

    /**
     * Возвращает или устанавливает заголовок
     * Заголвок - он же placeholder
     * @param text
     */
    public title(text?: string): elyFileChooseField | string {
        return elyObservableProperty.simplePropertyAccess(this, text, this.titleProperty);
    }

    /**
     * Разрешает/запрещает загрузку нескольких файлов или возвращает разрешение
     * @param bool
     */
    public multiplyFiles(bool?: boolean): elyFileChooseField | boolean {
        return elyObservableProperty.simplePropertyAccess(this, bool, this.multiplyFilesProperty);
    }

    /**
     * Устанавливает или возвращает макисмальное количество файлов
     * @param value
     */
    public maxFilesCount(value?: number): elyFileChooseField | number {
        if (value === undefined) return this.maxFilesCountValue;
        this.maxFilesCountValue = value;
        return this;
    }

    /**
     * Добавляет расширение в фильтр
     * @param extension
     */
    public addAcceptExtension(extension: string): elyFileChooseField {
        this.acceptExtensionsProperty.push(extension);
        return this;
    }

    /**
     * Очищает значение поля и возвращает его в стандартный вид
     */
    public clearValue(): elyFileChooseField {
        super.clearValue();
        this.filesGridView.clearView();
        this.filesGridView.hidden(true);
        this.fileChooseView.clearView();
        this.fileChooseView.addSubView(this.titleView);
        this.fileChooseView.addSubView(new elyTextView({
            class: "description",
            text:  "Нажмите для выбора файла",
        }));
        return this;
    }

    /**
     * Стандартное значение
     */
    public defaultValue(): File[] {
        return [];
    }

    /**
     * Добавляет слушатель события перегрузки количества файлов
     * @param observer
     */
    public addOverflowObserver(observer: () => void): elyFileChooseField {
        this.addObserver("overflow", observer);
        return this;
    }

    /**
     * Перестроение блока
     */
    public rebuild(): elyFileChooseField {
        this.filesGridView.clearView();

        if (this.filesGridView.hidden() && this.value().length > 0) {
            this.filesGridView.fadeIn();
        }
        if (this.value().length === 0) this.filesGridView.hidden(true);

        elyUtils.forEach(this.valueProperty.get(), (k, file: File) => {
            const itemView                 = new elyControl({class: "ef-file-item"});
            const fileIcon                 = new elyIconView({iconName: "file"});
            const name                     = new elyTextView({class: "title", text: file.name});
            const remove                   = new elyTextView({class: "remove"});
            remove.getDocument().innerHTML = "&times;";
            remove.addObserver("click", () => {
                const newFiles: any[] = [];
                this.valueProperty.get([]).forEach((value) => {
                    if (value !== file) newFiles.push(value);
                });
                this.value(newFiles);
                this.rebuild();
            });
            itemView.addSubView(fileIcon);
            itemView.addSubView(name);
            itemView.addSubView(remove);
            this.filesGridView.add(itemView);
        });
        const bool = this.valueProperty.get([]).length >= this.maxFilesCountValue;
        this.accessoryView.editable(!bool);

        if (bool) {
            this.fileChooseView.addClass("deny");
            this.notificate("overflow");
        } else this.fileChooseView.removeClass("deny");

        return this;
    }

    /**
     * Возвращает true, если поле пустое
     */
    public isEmpty(): boolean {
        return this.valueProperty.get([]).length === 0;
    }
}
