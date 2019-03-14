import {Control, TabsPanelView, TextAreaField} from "../../../build/ely.flat";
import BuilderPlaceholdersFactory from "../factory/BuilderPlaceholdersFactory";

/**
 * Рабочая область
 * @class
 */
export default class BuilderWorkspacePanel extends TabsPanelView {

    /**
     * Создает рабочую область
     * @return {Control}
     */
    static createWorkspace() {
        const ws = new Control();
        BuilderPlaceholdersFactory.createBasePlaceholder(ws);
        return ws;
    }

    /**
     * Создает элемент просмотра ely JSON View элементов
     * @return {TextAreaField}
     */
    static createEJVViewer() {
        const textAreaField = new TextAreaField({rowsCount: 30});
        textAreaField.getAccessory().style["border"] = "none";
        textAreaField.editable(false);
        return textAreaField;
    }

    /**
     * Конструктор
     */
    constructor() {
        super({tabs: ["Рабочая область", "EJV Viewer"]});

        // Элементы разделов
        this.workspace = BuilderWorkspacePanel.createWorkspace();
        this.ejvViewer = BuilderWorkspacePanel.createEJVViewer();
        this.setTabIndexBody(0, this.workspace);
        this.setTabIndexBody(1, this.ejvViewer);

        // Обработчик выбора раздела
        this.addSelectedObserver(index => {
            if (index === 1) {
                if (this.workspace.getSubViews()[0])
                    this.ejvViewer.value(JSON.stringify(this.workspace.getSubViews()[0].serialize(), null, 2));
                else this.ejvViewer.value("{ /* Nothing is here */ }");
            }
        });
        this.selectedTabIndex(0);
    }

}

BuilderWorkspacePanel.default = new BuilderWorkspacePanel();