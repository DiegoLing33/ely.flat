import {
    AppStylesheet, GridLayoutView,PanelView, app, ViewController
} from "../../build/ely.flat";
import BuilderViewCreateItemModal from "./BuilderViewCreateItemModal";
import BuilderViewEditorPanel from "./views/BuilderViewEditorPanel";
import BuilderWorkspacePanel from "./views/BuilderWorkspacePanel";
import BuilderContextMenuView from "./views/BuilderContextMenuView";
import BuilderSideNavigationView from "./views/BuilderSideNavigationView";
import WSManager from "./ws/WSManager";
import WSContextMenu from "./utils/WSContextMenu";


/**
 * Контроллер строителя
 */
export default class BuilderViewController extends ViewController {

    constructor(props) {
        super(props);

        this.sidePanelsGrid = new GridLayoutView();
        this.itemsPanel = new PanelView({panelTitle: "Элементы"});
        this.sidePanelsGrid.add(this.itemsPanel);
        this.sidePanelsGrid.add(BuilderViewEditorPanel.default);

        this.__addStyles();

        WSContextMenu.applyContextMenuHandler();
    }

    viewDidLoad() {
        const grid = new GridLayoutView();
        WSManager.default.addSelectionChangeObserver(view => {
            if (view === null) {
                BuilderSideNavigationView.default.selectedTabIndex(0);
                BuilderSideNavigationView.default.disableObjectTab();
            } else {
                BuilderSideNavigationView.default.enableObjectTab();
                BuilderViewEditorPanel.presentViewInDefaultEditor(view);
                BuilderSideNavigationView.default.selectedTabIndex(1);
            }
        });

        app().getApplicationDocument().getBody()
            .getDocument().append(BuilderContextMenuView.default.getDocument());


        BuilderSideNavigationView.default.getStyle().height
            = (document.documentElement.clientHeight - 2) + "px";
        BuilderWorkspacePanel.default.getStyle().height
            = (document.documentElement.clientHeight) - 2 + "px";
        grid.add(BuilderWorkspacePanel.default, BuilderSideNavigationView.default);

        grid.rowAt(0).columnAt(0).width("75%");
        grid.rowAt(0).columnAt(1).width("25%");
        grid.rowAt(0).columnAt(0).getStyle().padding = "0";
        grid.rowAt(0).columnAt(0).getStyle().marginRight = "-1px";
        grid.rowAt(0).columnAt(1).getStyle().padding = "0";

        this.view.addSubView(grid);
        app().containerView.getStyle().maxWidth = "100%";
        app().wrapperView.getStyle().margin = "0";
        app().footerView.removeFromSuperview();
        app().getApplicationDocument().getBody().getStyle().overflowX = "hidden";
    }


    /**
     * Добавляет необходимые стили
     * @private
     */
    __addStyles() {
        AppStylesheet.global.addClass("view-placeholder", {
            border: "4px dashed #afafaf",
            margin: "2px",
            padding: "15px",
            cursor: "pointer",
            textAlign: "center",
            color: "#afafaf",
            opacity: 0.35,
            transition: "all 0.5s"
        });
        AppStylesheet.global.addClass("view-placeholder:hover", {
            opacity: 1,
        });
        AppStylesheet.global.addClass("view-create-item", {
            border: "4px dashed #232323",
            color: "#232323",
            backgroundColor: "#aaa",
            margin: "2px",
            padding: "8px",
            opacity: 0.45,
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.5s"
        });

        AppStylesheet.global.addClass("view-create-item:hover", {
            opacity: 1,
        });
    }

    addGridPlaceholders(grid) {
        grid.add(this.createPlaceholderView(grid));
    }

    /**
     * Создает модальное окно нового элемента
     * @param result
     */
    presentAddItemModal(result) {
        const modal = new BuilderViewCreateItemModal();
        modal.addCreateObserver((view, opt) => result(view, opt));
        modal.present();
    }
}