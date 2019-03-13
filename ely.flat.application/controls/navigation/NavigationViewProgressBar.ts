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
 + Файл: NavigationViewProgressBar.ts                                         +
 + Файл изменен: 02.03.2019 02:43:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ProgressBarView, {ProgressBarViewOptions} from "@controls/action/ProgressBarView";
import ObservableProperty from "@core/observable/properties/ObservableProperty";
import Style from "@enums/Style";

/**
 * Панель загрузки навигации
 * @class NavigationViewProgressBar
 * @augments {ProgressBarView}
 */
export default class NavigationViewProgressBar extends ProgressBarView {

    /**
     * Свойство: стиль полосы бара
     * @ignore
     * @protected
     */
    protected readonly __progressBarStyleProperty: ObservableProperty<Style>
        = new ObservableProperty<Style>()
        .change((value, oldVal) => {
            if (oldVal) this.removeClass(`bg-${oldVal.value}`);
            this.addClass(`bg-${value.value}`);
        });

    /**
     * Конструктор
     * @param {ProgressBarViewOptions} [options = {}] - опции
     */
    public constructor(options: ProgressBarViewOptions = {}) {
        super(options);
        this.removeViewContent();
        this.addClass("--progress-line");
    }

    /**
     * Обновляет бар
     * @ignore
     * @private
     */
    protected __update(): void {
        this.notificate("changed", [this.value(), this.maxValue(), this.minValue()]);
        this.getStyle().width = this.getPercentage() + "%";
    }
}
