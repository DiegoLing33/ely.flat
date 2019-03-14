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
 + Файл: BuilderViewsFactory.ts                                               +
 + Файл изменен: 13.03.2019 23:18:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


import {BoxHeaderView, Control, GridLayoutView} from "../../../build/ely.flat";

/**
 * Фабрика вспомогательных элементов строителя
 */
export default class BuilderViewsFactory {

    /**
     * Создает сетку с заголовком и элементом
     *
     * @param {string} title
     * @param {View} view
     *
     * @return {GridLayoutView}
     */
    static createGridViewWithTitleAndView(title, view) {
        const titleTextView = title.textView();
        titleTextView.css({
            backgroundColor: "#fbfbfb",
            margin: "0 -16px",
            padding: "16px",
        });
        return new GridLayoutView({items: [[titleTextView], [view]]});
    }

    /**
     * Создает бокс с заголовком и стилем
     * @param {string} title
     * @param {CSSStyleDeclaration|*} [style]
     * @return {BoxHeaderView}
     */
    static createBoxHeaderWithTitle(title, style) {
        return new BoxHeaderView({boxTitle: title, boxHover: false, style: style});
    }

    /**
     * Создает секцию редактора
     *
     * @param {string} title
     * @return {BoxHeaderView}
     */
    static createEditorViewSectionBox(title) {
        const box = BuilderViewsFactory.createBoxHeaderWithTitle(title, {
            margin: "-16px", paddingBottom: "30px", borderBottom: "none",
        });
        box.getContainerView().getStyle().marginTop = "-15px";
        return box;
    }

    /**
     * Создаёт контейнер со скролом для сайд бара
     * @param {string} title
     * @param {View} innerView
     *
     * @return {BoxView}
     */
    static createSidebarScrollBox(title, innerView) {
        const box = new BoxHeaderView({boxTitle: title, boxHover: false});
        box.css({
            margin: "-1px",
            height: "100%",
            maxHeight: (document.documentElement.clientHeight - 72) + "px",
            borderBottom: "none",
        });
        box.getContainerView().css({
            maxHeight: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            marginRight: "-5px",
        });
        box.getContainerView().add(innerView);
        return box;
    }

    /**
     * Создает элемент плейсхолдера
     *
     * @return {Control}
     */
    static createPlaceholderView() {
        const view = new Control({class: "view-placeholder", styleNoSelect: true});
        view.getDocument().innerHTML = "<b style='font-size: 30px'>+</b><br>Добавить элемент";
        return view;
    }
}
