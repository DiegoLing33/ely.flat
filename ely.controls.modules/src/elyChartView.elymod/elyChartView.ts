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
 + Файл: elyChartView.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyTableView from "@controls/view/elyTableView";
import elyView from "@core/controls/elyView";
import elyViewOptions from "@core/controls/elyViewOptions";
import elyObservableArray from "@core/observable/properties/elyObservableArray";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

interface elyChartViewOptions extends elyViewOptions {

    /**
     * Отображает фон
     */
    background?: boolean;

    /**
     * Заголовок
     */
    title?: string;
}

interface elyChartViewData {
    title: string;
    value: number;
}

/**
 * Граффик
 */
export default class elyChartView extends elyControl {

    /**
     * Заголовок
     */
    public readonly tableView: elyTableView;

    /**
     * Отображение ступеней
     */
    public readonly ticksView: elyControl;

    /**
     * Данные графика
     */
    public readonly data: elyObservableArray<elyChartViewData>;

    /**
     * Шаг
     */
    public readonly step: elyObservableProperty<number>;

    /**
     * Максимальная высота
     */
    public readonly maxHeight: elyObservableProperty<number>;

    /**
     * Фон
     */
    public readonly chartBackgroundView: elyView;

    /**
     * Конструктор
     * @param {*} options
     */
    constructor(options: elyChartViewOptions = {}) {
        super(options);

        this.step = new elyObservableProperty<number>(50);

        this.addClass("ef-chart");

        this.data      = new elyObservableArray<elyChartViewData>();
        this.maxHeight = new elyObservableProperty<number>(240);

        this.tableView = new elyTableView({title: "", class: "ef-chart-default"});
        this.addSubView(this.tableView);
        this.tableView.denyRebuild(true);

        this.ticksView = new elyControl({class: "ticks"});
        this.addSubView(this.ticksView);

        this.chartBackgroundView = new elyControl({class: "chart-bg"});
        this.addSubView(this.chartBackgroundView);

        this.step.addChangeObserver(() => this.update());
        this.maxHeight.addChangeObserver(() => this.update());
        this.data.addNewItemObserver(() => this.update());
        this.data.addRemoveObserver(() => this.update());
        this.data.addClearObserver(() => this.update());

        this.chartBackground(options.background || true);
        if (options.title) this.title(options.title);
    }

    /**
     * Устанавливает или скрывает задний фон
     * @param bool
     */
    public chartBackground(bool: boolean): elyChartView {
        this.chartBackgroundView.hidden(!bool);
        return this;
    }

    /**
     * Устанавливает заголвоок
     * @param title
     */
    public title(title: string): elyChartView {
        this.tableView.title(title);
        return this;
    }

    /**
     * Добалвяет данные
     * @param title
     * @param value
     */
    public add(title: string, value: number) {
        this.data.push({title, value});
    }

    /**
     * Обновляет график
     */
    public update() {
        this.tableView.bodyView.removeViewContent();
        this.ticksView.removeViewContent();

        const mH     = this.maxHeight.get(1);
        const levels = Math.ceil(this.getMaxValue() / this.step.get(1));
        const upb    = levels * this.step.get(1);

        //
        //  Ticks render
        //
        const height = mH / levels;
        this.ticksView.css({top: -1 * mH + "px"});
        this.tableView.css({height: mH + "px"});

        this.chartBackgroundView.css({height: (mH + 120) + "px"});

        for (let i = 0; i < levels; i++) {
            const tick = new elyControl({class: "tick"});
            tick.css({height: height + "px"});
            const tt                   = new elyControl({tag: "p"});
            tt.getDocument().innerText = (this.step.get(1) * (levels - i)).toString();
            tick.addSubView(tt);
            this.ticksView.addSubView(tick);
        }

        //
        //  Data render
        //
        let i            = 0;
        let k            = 1;
        const w          = 500;
        const offsetSize = w / this.data.length();

        for (const value of this.data.get()) {

            //
            //  The row creating
            //
            const tr = elyTableView.createTableRowView();
            tr.addClass("qtr");
            tr.css({"left": i + "px", "padding-left": 5 + "px"});

            //
            //  The header creating
            //
            const th                   = elyTableView.createTableColumnView(true);
            th.getDocument().innerText = value.title;
            th.attribute("scope", "row");
            th.css({width: offsetSize + "px", top: (mH + 20) + "px"});

            //
            //  The column creating
            //
            const col = elyTableView.createTableColumnView();
            col.addClass("bar");
            const ctn                   = new elyControl({tag: "p"});
            ctn.getDocument().innerText = value.value.toString();
            col.addSubView(ctn);
            col.css({width: (offsetSize - 10) + "px", height: ((value.value * mH) / upb) + "px"});
            col.addClass(k % 2 === 0 ? "odd" : "nodd");
            tr.addSubView(th);
            tr.addSubView(col);

            this.tableView.bodyView.addSubView(tr);
            i += offsetSize;
            k++;
        }

    }

    /**
     * Возвращает максимальное цифровое значение
     */
    public getMaxValue(): number {
        let max = Number.MIN_VALUE;
        for (const value of this.data.get())
            if (value.value > max) max = value.value;
        return max;
    }

}
