import {Control, StaticGridLayoutView} from "../../../build/ely.flat";
import BuilderViewCreateItemModal from "../BuilderViewCreateItemModal";
import BuilderViewsFactory from "./BuilderViewsFactory";
import WSViewsRegex from "../ws/WSViewsRegex";
import WSManager from "../ws/WSManager";
import WSUtils from "../ws/WSUtils";

/**
 * Фабрика холдеров
 */
export default class BuilderPlaceholdersFactory {

    /**
     * Создает простой плейсхолдер, открывающий модальное окно
     * @param {function(view: View, opt: *)} result
     * @return {Control}
     */
    static createPlaceholderWithModal(result) {
        return BuilderViewsFactory.createPlaceholderView().addClickObserver(() => {
            BuilderPlaceholdersFactory.presentCreateItemModal().addCreateObserver((createdView, opt) => {
                result(createdView, opt);
                WSManager.default.selectView(createdView);
            });
        });
    }

    /**
     * Добавляет стандартный холдер
     * @param {Control|View} view
     */
    static createBasePlaceholder(view) {
        const holder = this.createPlaceholderWithModal((createdView, opt) => {
            view.removeViewContent();
            view.addSubView(createdView);
            BuilderPlaceholdersFactory.testViewForPlaceholders(createdView, opt);
            createdView.__runRemover = () => {
                view.removeViewContent();
                view.getDocument().append(holder.getDocument());
            };
        });
        view.removeViewContent();
        view.getDocument().append(holder.getDocument());
        return holder;
    }

    /**
     * Создает систему холдинга для статистической сетки
     * @param {StaticGridLayoutView} grid - сетка
     */
    static createPlaceholdingSystemForStaticGrid(grid) {
        const rebuildHoldersForGrid = () => {
            for (let i = 0; i < grid.rows(); i++) {
                for (let j = 0; j < grid.columns(); j++)
                    if (!grid.items()[i * grid.columns() + j]) {
                        const holder = BuilderPlaceholdersFactory.createPlaceholderWithModal((createdView, opt) => {
                            grid.setViewAt(createdView, i, j);
                            BuilderPlaceholdersFactory.testViewForPlaceholders(createdView, opt);
                            createdView.__runRemover = () => {
                                grid.setViewAt(holder, i, j);
                            };
                        });
                        grid.setViewAt(holder, i, j);
                    }
            }
        };
        grid.getColumnsProperty().change(() => rebuildHoldersForGrid());
        grid.getRowsProperty().change(() => rebuildHoldersForGrid());
        grid.getItemsProperty().change(() => rebuildHoldersForGrid());
        rebuildHoldersForGrid();
    }

    /**
     * Отображает модальное окно создания элемента
     * @return {BuilderViewCreateItemModal}
     */
    static presentCreateItemModal() {
        const modal = new BuilderViewCreateItemModal();
        modal.present();
        return modal;
    }

    /**
     * Тестирует элемент на холдеры и добавляет их
     * @param {View|*} view
     * @param {*} opt
     */
    static testViewForPlaceholders(view, opt) {
        if (view instanceof StaticGridLayoutView) {
            BuilderPlaceholdersFactory.createPlaceholdingSystemForStaticGrid(view);
        } else {
            if (opt.subviews) {
                Object.keys(opt.subviews).forEach(k =>
                    WSViewsRegex.default.registerView(view[opt.subviews[k]], k, WSUtils.getViewSignatureClassName(view)));
            }
            if (opt.grid) {
                opt.grid.forEach(value => {
                    BuilderPlaceholdersFactory.createPlaceholdingSystemForStaticGrid(view[value]);
                });
            }
        }
    }
}
