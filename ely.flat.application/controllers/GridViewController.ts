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
 + Файл: GridViewController.ts                                                +
 + Файл изменен: 09.02.2019 18:42:19                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import GridLayoutView from "../controls/layout/GridLayoutView";
import View from "../core/controls/View";
import ViewController from "./ViewController";

/**
 * Контроллер с сеткой в основании
 * @class GridViewController
 * @augments {ViewController}
 */
export default class GridViewController extends ViewController {

    /**
     * Элемент отображения
     * @type {GridLayoutView|View}
     */
    public readonly view: GridLayoutView & View | any;

    /**
     * Конструктор
     */
    public constructor(props: { controllerMainView?: GridLayoutView }) {
        super();
        this.view = props.controllerMainView || new GridLayoutView();
    }

    /**
     * Сериализует объект
     */
    public serialize(): any {
        return {_item: "GridViewController", controllerMainView: this.view.serialize()};
    }
}
