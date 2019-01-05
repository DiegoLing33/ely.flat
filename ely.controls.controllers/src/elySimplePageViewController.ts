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
 + Файл: elySimplePageViewController.ts                                       +
 + Файл изменен: 30.11.2018 01:52:55                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyGridViewController from "@controllers/elyGridViewController";
import elyControl from "@controls/action/elyControl";
import elyTextView from "@controls/text/elyTextView";
import elySize from "@enums/elySize";
import elyWeight from "@enums/elyWeight";

/**
 * Контроллер с шаблоном макета приложения
 * @class elySimplePageViewController
 * @augments {elyGridViewController}
 */
export default class elySimplePageViewController extends elyGridViewController {

    /**
     * Основной заголовок
     * @type {elyTextView}
     */
    public readonly titleView: elyTextView = new elyTextView({class: "ef-title"});

    /**
     * Описание страницы
     * @type {elyTextView}
     */
    public readonly descriptionView: elyTextView = new elyTextView({class: "ef-description"});

    /**
     * Конструктор
     */
    public constructor() {
        super();
        this.view.addClass("ef-simple-content");

        const headerView = new elyControl({class: "ef-content-head"});

        (this.titleView.textSize(elySize.large).textWeight(elyWeight.normal) as elyTextView).textCenter(true);
        this.descriptionView.textSize(elySize.middle).textCenter(true);

        headerView.addSubView(this.titleView);
        headerView.addSubView(this.descriptionView);
        this.view.add(headerView);
    }

    /**
     * Устанавливает или возвращает заголовок
     * @param {string} [value]
     * @return {this|string}
     */
    public title(value?: string): elySimplePageViewController | string {
        if (value === undefined) return this.titleView.text();
        this.titleView.text(value);
        return this;
    }

    /**
     * Устанавливает или возвращает описание контента
     * @param {string} [value]
     * @return {this|string}
     */
    public description(value?: string): elySimplePageViewController | string {
        if (value === undefined) return this.descriptionView.text();
        this.descriptionView.text(value);
        return this;
    }
}
