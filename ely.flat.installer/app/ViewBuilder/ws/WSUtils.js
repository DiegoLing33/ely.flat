/**
 * Утилиты efiWorkShop
 */
export default class WSUtils {

    /**
     * Возвращает имя класса view
     * @param {View} view
     * @return {string|null}
     */
    static getViewClassName(view) {
        return view.constructor.name || null;
    }

    /**
     * Возвращает имя сигнатуры
     * @param {View} view
     * @return {string}
     */
    static getViewSignatureClassName(view) {
        const name = (WSUtils.getViewClassName(view) || "view").toLowerCase();
        const template = {
            grid: "grid",
            layout: "layout",
            button: "button",
            field: "field",
            panel: "panel",
            box: "box",
        };
        for (const key of Object.keys(template)) {
            if (name.indexOf(key) > -1) return template[key];
        }
        return "view";
    }

}