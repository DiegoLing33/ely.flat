import {View} from "../../build/ely.flat";
import {BuilderViewElements} from "./BuilderViewElements";

/**
 * Фабрика элементов
 */
export default class BuilderViewFactory {

    /**
     * Обрабатывает опции
     * @param defaults
     * @return {*}
     */
    static processDefaults(defaults) {
        Object.keys(defaults).forEach(value => {
            const obj = defaults[value];
            if (obj instanceof Array && obj.length === 2 && obj[0] === "s") {
                defaults[value] = View.fromObject(obj[1]);
            }
        });
        return defaults;
    }

    /**
     * Создает превью элемент
     * @param name
     * @return {null}
     */
    static createPoorView(name) {
        const classObject = window.elyflatobjects[name];
        const opts = BuilderViewElements[name];
        if (!(classObject && opts)) return null;

        const defaults = BuilderViewFactory.processDefaults(opts.defaults || {});
        return new classObject(defaults);
    }
}