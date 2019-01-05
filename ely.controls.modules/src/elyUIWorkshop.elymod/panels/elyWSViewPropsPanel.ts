/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyWSViewPropsPanel.ts                                               +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyControl from "@controls/action/elyControl";
import elyComboField from "@controls/fields/elyComboField";
import elySwitchField from "@controls/fields/elySwitchField";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
import elyTextField from "@controls/fields/elyTextField";
import elyGridRowView from "@controls/flex/elyGridRowView";
import elyGridView from "@controls/flex/elyGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyTextView from "@controls/text/elyTextView";
import elyModalView from "@controls/view/elyModalView";
import elyPanelView from "@controls/view/elyPanelView";
import elyView from "@core/controls/elyView";
import {elyDesignableAutoFieldItem, elyDesignableCore, elyDesignableFieldState} from "@core/elyDesignable";
import elyUtils from "@core/elyUtils";
import elyWorkshop from "@devMods/elyUIWorkshop.elymod/elyWorkshop";
import elyWSRus from "@devMods/elyUIWorkshop.elymod/lang/elyWSRus";
import elyUIWorkshopElementsPanel from "@devMods/elyUIWorkshop.elymod/panels/elyUIWorkshopElementsPanel";
import elyUIWSMeta from "@devMods/elyUIWorkshop.elymod/src/elyUIWSMeta";
import elyUIWSWorkspace from "@devMods/elyUIWorkshop.elymod/src/elyUIWSWorkspace";
import elyWSRegex from "@devMods/elyUIWorkshop.elymod/src/elyWSRegex";
import elyFieldType from "@enums/elyFieldType";
import elySize from "@enums/elySize";

/**
 * Панеь настройки элемента
 */
export default class elyWSViewPropsPanel extends elyPanelView {

    public static readonly main = new elyWSViewPropsPanel();

    /**
     * Таблица свойств
     */
    public readonly gridView: elyGridView;

    /**
     * Текущее имя в редакторе
     */
    protected currentName: string | null = null;

    public constructor() {
        super({title: "Элемент", hidden: true});
        this.gridView = new elyGridView({margin: {bottom: 10}});

        this.contentView.addSubView(this.gridView);

        this.descriptionView.addSubView(new elyButton({text: "Код"}).fill().click(() => {
            if (this.currentName) {
                const text = JSON.stringify(
                    elyDesignableCore.freeze(elyWSRegex.main.views.item(this.currentName)),
                    null, 4);
                new elyModalView({modalTitle: "Код элемента"})
                    .modalContent(new elyTextAreaField({rowsNumber: 12}).value(text))
                    .present();
            }
        }));
        this.titleView.hidden(true);
    }

    /**
     * Применяет панель настроек
     * @param name
     */
    public applySettingsPanel(name: string): void {
        elyWorkshop.tabBar.tabBarCurrentTabName("props");
        const view = elyWSRegex.main.views.item(name);
        if (!view) return;
        this.currentName = name;

        this.title(name);
        this.hidden(false);
        this.gridView.removeViewContent();

        const ed = elyTextView.editable(name.textView());
        ed.textViewEditableShouldSaveValue((value, result) => {
            if (ed.value() === "workspace") {
                new elyNotificationView({message: "Нельзя переименовать рабочую область!"}).present();
                result(false);
            } else {
                const res = elyWSRegex.main.rename(ed.value(), value);
                if (typeof res === "string") new elyNotificationView({message: res, title: "Ошибка!"}).present();
                const bool = typeof res === "boolean" && res === true;
                if (bool) {
                    elyUIWorkshopElementsPanel.main.update();
                    elyUIWSWorkspace.main.update();
                }
                result(bool);
            }
        });

        const v = new elyControl();
        v.addSubView("Элемент".textView().textSize(elySize.small).opacity(0.7));
        v.addSubView(ed);
        this.gridView.add(v);

        const data = elyUIWSMeta.metas[name].autoData;
        if (!data || !data.fields) return;
        const autofields = elyUtils.sortAlphabetic(data.fields);
        elyUtils.forEach(autofields, (index, value) => {
            const ims = this.__create(view, value);
            if (ims) {
                const view = new elyControl();
                view.addSubView(ims[0].textSize(elySize.small).opacity(0.7));
                view.addSubView(ims[1]);
                this.gridView.add(view);
            }
        });

    }

    protected __create(view: elyView | any, afItem: elyDesignableAutoFieldItem): [elyTextView, elyView] | null {
        const titleTextView = new elyTextView({text: (elyWSRus.props[afItem.name] || afItem.name) + ":"});
        let field: any = null;
        if (afItem.state === elyDesignableFieldState.GETSET || afItem.state === elyDesignableFieldState.SET) {
            if (afItem.values && typeof afItem.values === "object") {
                field = new elyComboField({placeholder: afItem.name});
                elyUtils.forEach(afItem.values, (index, value) => {
                    (field as elyComboField).add(index, value);
                });
                const preVal = typeof view[afItem.name] === "function" ? view[afItem.name]() : null;
                if (preVal) {
                    if (preVal.value) {
                        (field as elyComboField).tryToSetValue(preVal.value);
                    } else {
                        (field as elyComboField).tryToSetValue(preVal);
                    }
                }
                (field as elyComboField).change((newValue) => {
                    view[afItem.name](newValue.value);
                    // this.data.add(afItem.name, newValue.key);
                });
            } else if (afItem.values === null && (afItem.type === "string" || afItem.type === "number")) {
                field = new elyTextField({
                    filedType: afItem.type === "string" ? elyFieldType.text : elyFieldType.number,
                    placeholder: afItem.name,
                });
                (field as elyTextField).addInputObserver((value) => {
                    view[afItem.name](value);
                    // this.data.add(afItem.name, value);
                });
            } else if (afItem.values === null && afItem.type === "text") {
                field = new elyTextAreaField({
                    placeholder: afItem.name,
                });
                (field as elyTextAreaField).addInputObserver((value) => {
                    view[afItem.name](value);
                    // this.data.add(afItem.name, value);
                });
            } else if (afItem.values === null && afItem.type === "boolean") {
                field = new elySwitchField();
                (field as elySwitchField).change((newValue) => {
                    view[afItem.name](newValue);
                    // this.data.add(afItem.name, newValue);
                });
            } else if (afItem.values === null && afItem.type === "[string]") {
                field = new elyGridRowView();
                const count = view[afItem.name + "Count"]();
                for (let i = 0; i < count; i++) {
                    const tv = new elyTextField({placeholder: afItem.name});
                    (field as elyGridRowView).add(tv);
                    tv.addInputObserver((value) => {
                        view[afItem.name](i, value);
                    });
                    if (i > 0) tv.getStyle().paddingLeft = "5px";
                    const testValue = view[afItem.name](i);
                    if (testValue) {
                        tv.value(testValue);
                    }

                }
            }

        }
        if ([elyDesignableFieldState.GET, elyDesignableFieldState.GETSET].indexOf(afItem.state) > -1 && field) {
            const testValue = view[afItem.name]();
            if (testValue) {
                if (field instanceof elyComboField) {
                    field.tryToSetValue(testValue.value);
                } else {
                    if (typeof field.value === "function") field.value(testValue);
                }
            }
        }
        if (field) {
            return [titleTextView, field];

        }
        return null;
    }
}
