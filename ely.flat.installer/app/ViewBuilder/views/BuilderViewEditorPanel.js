import {
    Button,
    GridLayoutView,
    PanelView,
    Style,
    Size,
    Weight,
    TextFieldType, isSet,
} from "../../../build/ely.flat";
import {BuilderViewElementsFieldsLang, getFieldsMap, getGroupLang} from "../BuilderViewElements";
import BuilderViewsFactory from "../factory/BuilderViewsFactory";
import WSFieldsFactory from "../factory/WSFieldsFactory";
import WSManager from "../ws/WSManager";

/**
 * Панель редактирования элемента
 * @class
 * @augments {PanelView}
 */
export default class BuilderViewEditorPanel extends GridLayoutView {

    /**
     * Конструктор
     */
    constructor() {
        super();
        this.hidden(true);
    }

    /**
     * Отображает элемент
     * @param {View} view
     */
    present(view) {
        this.getRows().clear();
        if (view === null) {
            return;
        }

        const name = view.constructor.name;
        const fields = getFieldsMap(name);

        this.innerBox.boxTitle(name + ` (${WSManager.getViewIdentifier(view) || "null"})`);

        const box = BuilderViewsFactory.createEditorViewSectionBox("Свойства");
        box.getContainerView().add(this.__createThisGrid(view, fields));
        this.add(box);

        Object.keys((fields.__groups || [])).forEach((groupName, index) => {
            const group = fields.__groups[groupName];
            const box = BuilderViewsFactory.createEditorViewSectionBox(getGroupLang(groupName));
            box.getContainerView().add(this.__createFieldsGrid(group, view));
            this.add(box);
        });

        this.hidden(false);
    }

    __createThisGrid(view, fields) {
        const grid = new GridLayoutView();
        this.__createFieldsGrid(fields, view).getRows().items().forEach(value => {
            grid.add(value);
        });
        grid.add(new Button({text: "Удалить", buttonStyle: Style.danger}).click(() => {
            WSManager.default.removeView(view);
        }).fill());
        return grid;
    }


    /**
     * Создаёт сетку полей
     * @param fields
     * @param view
     * @private
     */
    __createFieldsGrid(fields, view) {
        const grid = new GridLayoutView();
        Object.keys(fields).sort((a, b) => a < b ? -1 : 1).forEach(fieldName => {
            if (fieldName === "__groups") return;
            if (!isSet(view[fieldName])) return;
            const currentValue = view[fieldName]();
            const fieldType = fields[fieldName];
            const field = this.createEditableField(view, fieldType, currentValue, fieldName);
            const title = (BuilderViewElementsFieldsLang[fieldName] ?
                BuilderViewElementsFieldsLang[fieldName] : fieldName) + ":";
            field.change(value => {
                if (fieldType === "number") value = parseInt(value);
                if (fieldType === "float") value = parseFloat(value);

                view[fieldName](value);
            });
            grid.add(BuilderViewsFactory.createGridViewWithTitleAndView(title, field));
        });
        return grid;
    }

    /**
     * Создает редактируемое поле
     * @param item
     * @param type
     * @param value
     * @param name
     */
    createEditableField(item, type, value, name) {
        switch (type) {
            case "dictionary":
                const df = WSFieldsFactory.createDictionaryInputField(name, value);
                df.addInputObserver(v => item[name](v));
                return df;
            case "boolean":
                return WSFieldsFactory.createBooleanField(name, value);
            case "string":
                const field = WSFieldsFactory.createStringField(name, value);
                field.addInputObserver((v) => item[name](v));
                return field;
            case "number":
            case "float":
                return WSFieldsFactory.createStringField(name, value);
            case "styles":
                return WSFieldsFactory.createDictionaryField(name, value, Style.list());
            case "sizes":
                return WSFieldsFactory.createDictionaryField(name, value, Size.list());
            case "wights":
                return WSFieldsFactory.createDictionaryField(name, value, Weight.list());
            case "textFieldTypes":
                return WSFieldsFactory.createDictionaryField(name, value, TextFieldType.list());
            default:
                return WSFieldsFactory.createStringField(name, value);
        }
    }
}

/**
 * Стандартный редактор элементов
 * @type {BuilderViewEditorPanel}
 */
BuilderViewEditorPanel.default = new BuilderViewEditorPanel();

/**
 * Отображает редактирование в стандартном редакторе
 * @param {View} view
 */
BuilderViewEditorPanel.presentViewInDefaultEditor = (view) => {
    BuilderViewEditorPanel.default.present(view);
};