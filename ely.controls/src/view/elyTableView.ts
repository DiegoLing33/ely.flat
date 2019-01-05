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
 + Файл: elyTableView.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyTableViewOptions from "@options/elyTableViewOptions";

/**
 * Элемент отображения: Таблица
 * @version 1.0
 * @deprecated
 */
export default class elyTableView extends elyRebuildableViewProtocol {

    /**
     * Создает строку
     */
    public static createTableRowView(): elyControl {
        return new elyControl({tag: "tr"});
    }

    /**
     * Создает колонку
     * @param isHeader
     */
    public static createTableColumnView(isHeader: boolean = false): elyControl {
        return new elyControl({tag: isHeader ? "th" : "td"});
    }

    /**
     * Элемент заголовка таблицы
     */
    public readonly titleView: elyTextView;

    /**
     * Элемент шапки таблицы
     */
    public readonly headView: elyControl;

    /**
     * Элемент тела таблицы
     */
    public readonly bodyView: elyControl;

    /**
     * Свойство заголовка
     * @ignore
     */
    protected readonly titleProperty: elyObservableProperty<string>;

    /**
     * Заголовочная строка
     * @ignore
     */
    protected headerRow: elyView[];

    /**
     * Строки таблицы
     * @ignore
     */
    protected rows: elyView[][];

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: elyTableViewOptions = {}) {
        super({tag: "table", ...options});

        this.rows          = [];
        this.headerRow     = [];
        this.titleView     = new elyTextView({tag: "caption"});
        this.headView      = new elyControl({tag: "thead"});
        this.bodyView      = new elyControl({tag: "tbody"});
        this.titleProperty = new elyObservableProperty<string>();
        this.titleProperty.change((newValue) => this.titleView.text(newValue));
        if (options.title) this.title(options.title);

        this.rebuild();
    }

    /**
     * Устанавливает или возвращает заголовок
     * @param value
     */
    public title(value?: string): string | null | elyTableView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.titleProperty);
    }

    /**
     * Добавляет строку
     * @param columns
     */
    public addRow(...columns: elyView[]): elyTableView {
        this.rows.push(columns);
        this.rebuild();
        return this;
    }

    /**
     * Добавляет строку и индекс
     * @param index
     * @param columns
     */
    public addRowIndex(index: number, ...columns: elyView[]): elyTableView {
        this.rows.splice(index, 0, columns);
        this.rebuild();
        return this;
    }

    /**
     * Устанавливает заголовочную строку
     * @param columns
     */
    public setHeaderRow(...columns: elyView[]): elyTableView {
        this.headerRow.splice(0, this.headerRow.length);
        this.headerRow.splice(0, 0, ...columns);
        this.rebuild();
        return this;
    }

    /**
     * Добавляет колонку в заголовчную строку
     * @param column
     */
    public addHeaderColumn(column: elyView): elyTableView {
        this.headerRow.push(column);
        this.rebuild();
        return this;
    }

    /**
     * Реализация перестроения
     * @ignore
     * @private
     */
    protected __rebuild(): elyRebuildableViewProtocol {
        this.removeViewContent();
        this.getDocument().appendChild(this.titleView.getDocument());
        this.getDocument().appendChild(this.headView.getDocument());
        this.headView.removeViewContent();
        this.getDocument().appendChild(this.bodyView.getDocument());
        this.bodyView.removeViewContent();

        const rowView = elyTableView.createTableRowView();
        for (const hview of this.headerRow) {
            rowView.addSubView(elyTableView.createTableColumnView(true).addSubView(hview));
        }
        this.headView.addSubView(rowView);

        for (const row of this.rows) {
            const rowView = elyTableView.createTableRowView();
            for (const item of row) {
                rowView.addSubView(elyTableView.createTableColumnView().addSubView(item));
            }
            this.bodyView.addSubView(rowView);
        }

        return this;
    }

}
