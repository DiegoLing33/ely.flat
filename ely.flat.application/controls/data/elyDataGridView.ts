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
 + Файл: elyDataGridView.ts                                                   +
 + Файл изменен: 27.11.2018 22:06:16                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import {efTextView} from "@controls/text/efTextView";
// import elyTextView from "@controls/text/elyTextView";
// import elyTextViewEditable from "@controls/text/elyTextViewEditable";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import {designable, elyDesignableFieldState} from "@core/elyDesignable";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

/**
 * Опции для {@link elyDataGridViewOptions}
 */
export interface elyDataGridViewOptions extends elyViewOptions {

    /**
     * Количество строк
     */
    rowsCount?: number;

    /**
     * Количество столбцов
     */
    colsCount?: number;

    /**
     * Отмечает первую колонку как заголовок
     */
    firstColumnIsHeader?: boolean;

    /**
     * Матрица исходных данных
     */
    sourceData?: any[][];

    /**
     * Заголовки
     */
    headers?: Array<string | any>;

    /**
     * Флаг - таблица вокруг рамки
     */
    borderedStyle?: boolean;

    /**
     * Заголовок таблицы
     */
    title?: string | elyView;
}

/**
 * Делегат элементов
 */
type elyDataGridViewItemDelegate = (rowIndex: number, colIndex: number) => any | elyView;

/**
 * Делегат заголовков
 */
type elyDataGridViewHeaderDelegate = (colIndex: number) => any | string;

/**
 * Делегат запроса на разрешение редактировании ячейки
 */
type elyDataGridViewAllowEditDelegate = (rowIndex: number, colIndex: number) => boolean;

/**
 * Делегат обработки сохранения значения
 */
type elyDataGridViewShouldSaveDelegate = (rowIndex: number, colIndex: number, value: string,
                                          result: (res: boolean) => void) => void;

@designable("title", elyDesignableFieldState.GETSET, "string")
@designable("rowsCount", elyDesignableFieldState.GETSET, "number")
@designable("colsCount", elyDesignableFieldState.GETSET, "number")
/**
 * Элемент отображения: Таблица элементов
 *
 * @author Diego Ling
 */
export class elyDataGridView<T> extends elyView {

    /**
     * Запрещает обновление
     */
    public denyUpdate: boolean = false;

    /**
     * Делегат
     * @ignore
     */
    protected itemDelegateProperty: elyDataGridViewItemDelegate = ((rowIndex, colIndex) => {
        return (this.sourceData[rowIndex] || [])[colIndex] || "";
    });

    /**
     * Делегат заголвков
     * @ignore
     */
    protected headersDelegateProperty: elyDataGridViewHeaderDelegate = (colIndex => {
        return (this.headers || [])[colIndex] || "";
    });

    /**
     * Свойство: количество строк таблицы
     * @ignore
     */
    protected readonly rowsCountProperty: elyObservableProperty<number>;

    /**
     * Свойство: количество колонок в таблице
     * @ignore
     */
    protected readonly colsCountProperty: elyObservableProperty<number>;

    /**
     * Свойство: флаг - первая колонка - колонка заголовков
     * @ignore
     */
    protected readonly firstColumnIsHeaderProperty: elyObservableProperty<boolean>;

    /**
     * Исходные данные
     * @ignore
     */
    protected sourceData: any[][] = [];

    /**
     *  Заголовки
     *  @ignore
     */
    protected headers: Array<string | any> | null = null;

    /**
     * Свойство: флаг - рамка вокруг таблицы
     * @ignore
     */
    protected readonly borderedStyleProperty: elyObservableProperty<boolean>;

    /**
     * Свойство: заголовок таблицы
     * @ignore
     */
    protected readonly titleProperty: elyObservableProperty<string | elyView>;

    /**
     * Делегат запроса на разрешение редактировании ячейки
     * @ignore
     */
    protected allowEditDelegateProperty: elyDataGridViewAllowEditDelegate = (() => false);

    /**
     * Делегат обработки сохранения значения
     * @ignore
     */
    protected shouldSaveDelegateProperty: elyDataGridViewShouldSaveDelegate = (() => true);

    /**
     * Конструктор
     * @param {elyDataGridViewOptions} props
     */
    public constructor(props: elyDataGridViewOptions = {}) {
        super({...props, tag: "table"});
        this.addClass("ef-dgv");

        this.denyUpdate = true;
        this.sourceData = props.sourceData || [];
        this.headers    = props.headers || null;

        this.rowsCountProperty           = new elyObservableProperty<number>(props.rowsCount || 0);
        this.colsCountProperty           = new elyObservableProperty<number>(props.colsCount || 0);
        this.firstColumnIsHeaderProperty = new elyObservableProperty<boolean>(props.firstColumnIsHeader || false);
        this.borderedStyleProperty       = new elyObservableProperty<boolean>(false);
        this.titleProperty               = new elyObservableProperty<string | elyView>("");

        this.rowsCountProperty.change(() => this.update());
        this.colsCountProperty.change(() => this.update());
        this.firstColumnIsHeaderProperty.change(() => this.update());
        this.titleProperty.change(() => this.update());

        this.borderedStyleProperty.change(value => {
            if (value) this.addClass("bordered");
            else this.removeClass("bordered");
        });

        if (props.title) this.title(props.title);
        this.borderedStyle(props.borderedStyle || false);

        this.dataGridViewAllowEdit(() => false);
        this.dataGridShouldSave(() => true);

        if (props.sourceData && (!props.rowsCount && !props.colsCount)) {
            this.rowsCount(props.sourceData.length || 0);
            this.colsCount((props.sourceData.length || 0) > 0 ? props.sourceData[0].length : 0);
        }
        this.denyUpdate = false;
        this.update();
    }

    /**
     * Возвращает заголовок таблицы
     */
    public title(): string;

    /**
     * Устанавливает заголовок таблицы
     */
    public title(value: string | elyView): elyDataGridView<T>;

    /**
     * Возвращает и устанавливает заголовок таблицы
     */
    public title(value?: string | elyView): string | null | elyDataGridView<T> {
        const val = elyObservableProperty.simplePropertyAccess(this, value, this.titleProperty);
        return val instanceof elyView ? "" : val;
    }

    /**
     * Возвращает флаг - рамка вокруг таблицы
     */
    public borderedStyle(): boolean;

    /**
     * Устанавливает флаг - рамка вокруг таблицы
     */
    public borderedStyle(value: boolean): elyDataGridView<T>;

    /**
     * Возвращает и устанавливает флаг - рамка вокруг таблицы
     */
    public borderedStyle(value?: boolean): boolean | null | elyDataGridView<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.borderedStyleProperty);
    }

    /**
     * Устанавливает данные
     * @param sourceData
     */
    public setData(sourceData: any[][]): elyDataGridView<T> {
        this.sourceData = sourceData;
        return this.update();
    }

    /**
     * Устанавливает заголовки
     * @param headers
     */
    public setHeaders(headers: string[]): elyDataGridView<T> {
        this.headers = headers;
        return this.update();
    }

    /**
     * Возвращает флаг - первая колонка - колонка заголовков
     */
    public firstColumnIsHeader(): boolean;

    /**
     * Устанавливает флаг - первая колонка - колонка заголовков
     */
    public firstColumnIsHeader(value: boolean): elyDataGridView<T>;

    /**
     * Возвращает и устанавливает флаг - первая колонка - колонка заголовков
     */
    public firstColumnIsHeader(value?: boolean): boolean | null | elyDataGridView<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.firstColumnIsHeaderProperty);
    }

    /**
     * Возвращает количество колонок в таблице
     */
    public colsCount(): number;

    /**
     * Устанавливает количество колонок в таблице
     */
    public colsCount(value: number): elyDataGridView<T>;

    /**
     * Возвращает и устанавливает количество колонок в таблице
     */
    public colsCount(value?: number): number | null | elyDataGridView<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.colsCountProperty);
    }

    /**
     * Возвращает количество строк таблицы
     */
    public rowsCount(): number;

    /**
     * Устанавливает количество строк таблицы
     */
    public rowsCount(value: number): elyDataGridView<T>;

    /**
     * Возвращает и устанавливает количество строк таблицы
     */
    public rowsCount(value?: number): number | null | elyDataGridView<T> {
        return elyObservableProperty.simplePropertyAccess(this, value, this.rowsCountProperty);
    }

    /**
     * Устанавливает делегат для установки элементов
     * @param delegate
     */
    public dataGridViewItem(delegate: elyDataGridViewItemDelegate): elyDataGridView<T> {
        this.itemDelegateProperty = delegate;
        return this.update();
    }

    /**
     * Устанавливает делегат для установки заголовков
     * @param delegate
     */
    public dataGridViewHeader(delegate: elyDataGridViewHeaderDelegate): elyDataGridView<T> {
        this.headersDelegateProperty = delegate;
        return this.update();
    }

    /**
     * Устанавливает делегат запроса на разрешение редактировании ячейки
     * @param delegate
     */
    public dataGridViewAllowEdit(delegate: elyDataGridViewAllowEditDelegate): elyDataGridView<T> {
        this.allowEditDelegateProperty = delegate;
        return this.update();
    }

    /**
     * Устанавливает делегат обработки сохранения значения
     * @param delegate
     */
    public dataGridShouldSave(delegate: elyDataGridViewShouldSaveDelegate): elyDataGridView<T> {
        this.shouldSaveDelegateProperty = delegate;
        return this.update();
    }

    /**
     * Добавляет наблюдатель: отрисовка строки элемента
     *
     * Имя обсервера: rowDraw
     * @param o
     */
    public addRowDrawObserver(o: (rowIndex: number, row: elyView) => void): elyDataGridView<T> {
        this.addObserver("rowDraw", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: отрисовка элемента
     *
     * Имя обсервера: cellDraw
     *
     * @param {function(rowIndex: number, colIndex: number, cell: elyView, view: elyView)} o - наблюдатель
     */
    public addCellDrawObserver(o: (rowIndex: number, colIndex: number, cell: elyView, view: elyView) => void):
        elyDataGridView<T> {
        this.addObserver("cellDraw", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: отрисовка строки заголовков таблицы
     *
     * Имя обсервера: headerRowDraw
     *
     * @param o - наблюдатель
     */
    public addHeaderRowDrawObserver(o: (row: elyView) => void): elyDataGridView<T> {
        this.addObserver("headerRowDraw", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: отрисовка элемента заголовка
     *
     * Имя обсервера: headerCellDraw
     *
     * @param o - наблюдатель
     */
    public addHeaderCellDrawObserver(o: (colIndex: number, cell: elyView, view: elyView) => void): elyDataGridView<T> {
        this.addObserver("headerCellDraw", o);
        return this;
    }

    /**
     * Обновляет таблицу
     */
    public update(): elyDataGridView<T> {
        if (this.denyUpdate) return this;
        this.removeViewContent();
        //
        // Отрисовка заголовка
        //
        if (this.titleProperty.get()) {
            const cap = new elyControl({tag: "caption"});
            cap.addSubView(elyControl.tryMutateToView(this.titleProperty.get()));
            this.getDocument().append(cap.getDocument());
        }
        //
        // Отрисовка заголовков таблицы
        //
        if (this.headers) {
            const row = new elyControl({tag: "tr"});
            this.notificate("headerRowDraw", [row]);
            for (let j = 0; j < this.colsCount(); j++) {
                const col  = new elyControl({tag: "th"});
                const cell = elyControl.tryMutateToView(this.headersDelegateProperty(j));
                this.notificate("headerCellDraw", [j, col, cell]);
                col.addSubView(cell);
                row.addSubView(col);
            }
            this.getDocument().append(row.getDocument());
        }
        //
        //  Отрисовка элементов таблицы
        //
        for (let i = 0; i < this.rowsCount(); i++) {
            const row = new elyControl({tag: "tr"});
            this.notificate("rowDraw", [i, row]);
            for (let j = 0; j < this.colsCount(); j++) {
                const col = new elyControl({tag: (j === 0 && this.firstColumnIsHeader()) ? "th" : "td"});
                const view = new efTextView({text: String(this.itemDelegateProperty(i, j))});
                // if (this.allowEditDelegateProperty(i, j)) {
                //     if (view instanceof elyTextView) {
                //         view = elyTextView.editable(view);
                //         (view as elyTextViewEditable).textViewEditableShouldSaveValue((value, res) => {
                //             this.shouldSaveDelegateProperty(i, j, value, shouldSave => {
                //                 res(shouldSave);
                //             });
                //         });
                //     }
                // }
                this.notificate("cellDraw", [i, j, col, view]);
                col.addSubView(view);

                row.addSubView(col);
            }
            this.getDocument().append(row.getDocument());
        }
        return this;
    }
}

/**
 * @typedef {Object} elyDataGridViewOptions
 * @property {*[][]} [sourceData]
 * @property {*[]} [headers]
 * @property {boolean} [borderedStyle]
 * @property {string} [title]
 * @property {boolean} [firstColumnIsHeader = false]
 */
