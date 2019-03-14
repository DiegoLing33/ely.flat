import {Button, PanelView, Style, TextView, View} from "../../../build/ely.flat";
import WSManager from "../ws/WSManager";
import WSViewsRegex from "../ws/WSViewsRegex";

/**
 * Контекстное меню строителя
 * @class
 */
export default class BuilderContextMenuView extends PanelView {

    /**
     * Конструктор
     */
    constructor() {
        super({panelHover: false});
        this.addClass("vb-context");
        this.hidden(true);
        this.width(230);
        this.getStyle().position = "absolute";
    }

    /**
     * Отображает контекстное меню
     *
     * @param {View} view
     * @param {number} x
     * @param {number} y
     */
    present(view, x, y) {
        this.getContentView().getRows().clear();

        this.getStyle().left = `${x}px`;
        this.getStyle().top = `${y}px`;

        this.createTitle(view);
        this.createEditButton(view);
        this.createRemoveButton(view);
        this.hidden(false);
    }

    /**
     * Создает объект заголовка
     * @param {View} view
     */
    createTitle(view) {
        const name = view.constructor.name;
        const id = view.attribute(WSViewsRegex.consts.BUILDER_ID_ATTR_NAME);
        const title = new TextView({
            text: `${name} (${id || "null"})`,
            opacity: 0.5,
        });
        this.getContentView().add(title);
    }

    /**
     * Создаёт кнопку редактирования
     * @param {View} view
     */
    createEditButton(view) {
        const button = new Button({
            text: "Изменить",
            fill: true,
        }).click(() => {
            WSManager.default.selectView(view);
            this.hidden(true);
        });
        this.getContentView().add(button);
    }

    /**
     * Создаёт кнопку удаления
     * @param {View} view
     */
    createRemoveButton(view) {
        const button = new Button({
            text: "Удалить",
            fill: true,
            buttonStyle: Style.danger,
        }).click(() => {
            WSManager.default.removeView(view);
            this.hidden(true);
        });
        this.getContentView().add(button);
    }
}

/**
 * Стандартное контекстное меню
 * @type {BuilderContextMenuView}
 */
BuilderContextMenuView.default = new BuilderContextMenuView();

/**
 * Отображает контекстно меню для элемента с координатами
 * @param {View} view
 * @param {number} x
 * @param {number} y
 */
BuilderContextMenuView.presentDefaultContextMenuForView = (view, x, y) => {
    BuilderContextMenuView.default.present(view, x, y);
};