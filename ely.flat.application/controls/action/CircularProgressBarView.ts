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
 + Файл: CircularProgressBarView.ts                                           +
 + Файл изменен: 02.03.2019 02:55:37                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import View from "../../core/controls/View";
import Style from "../../enums/Style";
import Control from "./Control";
import ProgressBarView, {IProgressBarViewOptions} from "./ProgressBarView";

/**
 * Круговой бар загрузки
 * @class CircularProgressBarView
 * @augments {ProgressBarView}
 */
export default class CircularProgressBarView extends ProgressBarView {
    /**
     * Свойство: стиль полосы бара
     * @ignore
     * @protected
     */
    protected readonly __progressBarStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>();

    /**
     * Конструктор
     * @param {IProgressBarViewOptions} [options = {}] - опции
     */
    public constructor(options: IProgressBarViewOptions = {}) {
        super(options);
        this.addClass("--circular");
        this.getBodyView().removeClass("ef-progress-bar")
            .addClass("ef-progress-circle");
    }

    /**
     * Возвращает элемент полосы бара
     */
    public getLineViewContainer(): View {
        return this.__createSVG();
    }

    protected __createSVG(): View {
        const svg = new Control({tag: "svg"});
        const circle0 = new Control({tag: "circle"});
        const circle1 = new Control({tag: "circle"});

        svg.attribute("viewBox", "0 0 120 120");
        svg.getDocument().append(circle0.getDocument());
        svg.getDocument().append(circle1.getDocument());

        circle0.attribute("cx", "60")
            .attribute("cy", "60")
            .attribute("r", "54")
            .attribute("fill", "none")
            .attribute("class", "--track");

        circle1.attribute("cx", "60")
            .attribute("cy", "60")
            .attribute("r", "54")
            .attribute("fill", "none")
            .attribute("class", "--path");

        this.addChangedObserver((value, maxValue, minValue) => {
            circle1.attribute("stroke-dashoffset", (339.292 * (1 - (this.getPercentage() / 100))).toString());
        });

        this.getProgressBarStyleProperty()
            .change((value, oldVal) => {
                if (oldVal) circle1.removeClass(`stroke-${oldVal.value}`);
                circle1.addClass(`stroke-${value.value}`);
            });
        return svg;
    }

}
