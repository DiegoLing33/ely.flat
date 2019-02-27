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

import Control from "@controls/action/Control";
import elyTableView from "@controls/view/elyTableView";
import View from "@core/controls/View";
import elyViewOptions from "@core/controls/ViewOptions";
import ObservableArray from "@core/observable/properties/ObservableArray";
import ObservableProperty from "@core/observable/properties/ObservableProperty";

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
export default class elyChartView extends Control {

    /**
     * Заголовок
     */
    public readonly tableView: elyTableView;

    /**
     * Отображение ступеней
     */
    public readonly ticksView: Control;

    /**
     * Данные графика
     */
    public readonly data: ObservableArray<elyChartViewData>;

    /**
     * Шаг
     */
    public readonly step: ObservableProperty<number>;

    /**
     * Максимальная высота
     */
    public readonly maxHeight: ObservableProperty<number>;

    /**
     * Фон
     */
    public readonly chartBackgroundView: View;

    /**
     * Конструктор
     * @param {*} options
     */
    constructor(options: elyChartViewOptions = {}) {
        super(options);

        this.step = new ObservableProperty<number>(50);

        this.addClass("ef-chart");

        this.data      = new ObservableArray<elyChartViewData>();
        this.maxHeight = new ObservableProperty<number>(240);

        this.tableView = new elyTableView({title: "", class: "ef-chart-default"});
        this.addSubView(this.tableView);
        this.tableView.denyRebuild(true);

        this.ticksView = new Control({class: "ticks"});
        this.addSubView(this.ticksView);

        this.chartBackgroundView = new Control({class: "chart-bg"});
        this.addSubView(this.chartBackgroundView);

        this.step.change(() => this.update());
        this.maxHeight.change(() => this.update());
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
            const tick = new Control({class: "tick"});
            tick.css({height: height + "px"});
            const tt                   = new Control({tag: "p"});
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
            const ctn                   = new Control({tag: "p"});
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
