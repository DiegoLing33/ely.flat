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
 + Файл: elyWSCreateViewWindow.ts                                             +
 + Файл изменен: 30.11.2018 03:59:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyControl from "@controls/action/elyControl";
import elyStyle from "@controls/enums/elyStyle";
import elyComboField from "@controls/fields/elyComboField";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
import elyGridView from "@controls/flex/elyGridView";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyModalView from "@controls/view/elyModalView";
import elyView from "@core/controls/elyView";
import {elyDesignableAutoFieldsData, elyDesignableCore} from "@core/elyDesignable";
import elyUtils from "@core/elyUtils";

/**
 * Окно создания элемента
 */
export default class elyWSCreateViewWindow {

    /**
     * Отображает окно создания элемента
     * @param callback
     */
    public static present(callback: (view: elyView) => void): void {
        const modalView = new elyModalView({modalTitle: "Создание элемента"});
        modalView.modalTitleView.iconName("cogs");
        const flexView = new elyGridView({margin: {left: 10, right: 10, top: 0, bottom: 0}});
        const textarea = new elyTextAreaField({placeholder: "...view code", rowsNumber: 10});
        flexView.add(elyWSCreateViewWindow.createSelectView(view => {
            textarea.value(JSON.stringify(elyDesignableCore.freeze(view), null, 4));
        }), textarea);

        flexView.add(elyControl.line());
        flexView.add(new elyButton({text: "Создать"})
            .fill().buttonStyle(elyStyle.primary).click(() => {
                try {
                    const obj = JSON.parse(textarea.value());
                    const view = elyControl.fromObject(obj);
                    if (!view) throw Error("Не получилось создать жлемент... " +
                        "Проверьте правильность парамтеров.");
                    modalView.dismiss(true);
                    callback(view);
                } catch (e) {
                    new elyNotificationView({
                        message: e.message,
                        title: "Ошибка создания элемента",
                    }).present();
                    textarea.error(true);
                }
            }));

        modalView.modalContent(flexView);
        modalView.present();
    }

    /**
     * Элмент выбора элементов
     */
    private static createSelectView(cb: (view: elyView) => void): elyGridView {
        const gridView = new elyGridView({margin: {top: 0, left: 0, right: 0, bottom: 10}});
        const objs: { views: string[], fields: string[], actions: string[] } & any
            = {views: [], fields: [], actions: []};
        const builder = new elyControl();
        const result = new elyControl();

        elyUtils.forEach(window, (index: string, value) => {
            if (index.endsWith("View")) objs.views.push(index);
            else if (index.endsWith("Field")) objs.fields.push(index);
            else objs.actions.push(index);
        });

        const catSelection = new elyComboField({placeholder: "Выберите категорию"});
        const viewSelection = new elyComboField({placeholder: "Выберите элемент"});
        viewSelection.editable(false);

        catSelection.add("Элементы отображения", "views");
        catSelection.add("Элементы управления", "actions");
        catSelection.add("Поля ввода данных", "fields");
        catSelection.addChangeValueObserver((oldValue, newValue) => {
            viewSelection.clearValue();
            viewSelection.items.clear();
            (objs[newValue.value] as elyView[]).forEach((value, index) => {
                const str = String(value);
                if (elyDesignableAutoFieldsData[str])
                    viewSelection.add(__fmt(String(value)), value);
            });
            viewSelection.editable(true);
        }, true);
        viewSelection.addChangeValueObserver((oldValue, newValue) => {
            builder.removeViewContent();
            result.removeViewContent();
            // @ts-ignore
            const element = new window[newValue.value]();
            if (typeof element.text === "function") element.text(newValue.value);
            cb(element);
            // builder.addSubView(new elyFlatUIViewBuilder(element, newValue.value.toString()));
            catSelection.clearValue();
            viewSelection.clearValue();
            viewSelection.editable(false);
        }, true);
        gridView.add(catSelection);
        gridView.add(viewSelection);

        gridView.add(elyControl.line());
        gridView.add(new elyButton({
            buttonStyle: elyStyle.secondary,
            iconName: "plus",
            text: "Сетка элементов",
        }).fill().click(() => {
            cb(new elyStaticGridView());
        }));
        return gridView;
    }
}

/**
 * Форматирует строку
 * @param ins
 * @private
 */
function __fmt(ins: string) {
    const s = ins.replace("ely", "").replace(/([A-z][a-z]+)/g, " $1").trim();
    return s.substr(0, 1).toUpperCase() + s.substr(1);
}
