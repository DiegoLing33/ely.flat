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
 + Файл: SimplePageViewController                                       +
 + Файл изменен: 30.11.2018 01:52:55                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import GridViewController from "@controllers/GridViewController";
import Control from "@controls/action/Control";
import TextView from "@controls/text/TextView";
import Size from "@enums/Size";
import Weight from "@enums/Weight";

/**
 * Контроллер с шаблоном макета приложения
 * @class SimplePageViewController
 * @augments {GridViewController}
 */
export default class SimplePageViewController extends GridViewController {

    /**
     * Основной заголовок
     * @type {elyTextView}
     */
    public readonly titleView: TextView = new TextView({class: "--title"});

    /**
     * Описание страницы
     * @type {elyTextView}
     */
    public readonly descriptionView: TextView = new TextView({class: "--description"});

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.view.addClass("ef-simple-content");

        const headerView = new Control({class: "--content-header"});

        this.titleView.textSize(Size.xlarge).textCenter(true);
        this.descriptionView.textCenter(true).textWeight(Weight.thin);

        headerView.addSubView(this.titleView);
        headerView.addSubView(this.descriptionView);
        this.view.add(headerView);
    }

    /**
     * Устанавливает или возвращает заголовок
     * @param {string} [value]
     * @return {this|string}
     */
    public title(value?: string): SimplePageViewController | string {
        if (value === undefined) return this.titleView.text();
        this.titleView.text(value);
        return this;
    }

    /**
     * Устанавливает или возвращает описание контента
     * @param {string} [value]
     * @return {this|string}
     */
    public description(value?: string): SimplePageViewController | string {
        if (value === undefined) return this.descriptionView.text();
        this.descriptionView.text(value);
        return this;
    }
}
