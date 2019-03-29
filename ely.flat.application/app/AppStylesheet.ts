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
 + Файл: AppStylesheet.ts                                                     +
 + Файл изменен: 27.02.2019 01:47:53                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*
 *
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *   ,--. o                   |    o
 *   |   |.,---.,---.,---.    |    .,---.,---.
 *   |   |||---'|   ||   |    |    ||   ||   |
 *   `--' ``---'`---|`---'    `---'``   '`---|
 *              `---'                    `---'
 *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
 * Mail: <diegoling33@gmail.com>
 *
 * Это программное обеспечение имеет лицензию, как это сказано в файле
 * COPYING, который Вы должны были получить в рамках распространения ПО.
 *
 * Использование, изменение, копирование, распространение, обмен/продажа
 * могут выполняться исключительно в согласии с условиями файла COPYING.
 *
 * Файл: AppStylesheet.ts
 * Файл создан: 19.11.2018 20:56:39
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *
 */

/**
 * Типы стиля
 */
import ObservableDictionary from "ely.core/dist/observable/properties/ObservableDictionary";

enum StylesheetItemType {
    class, tag, id,
}

/**
 * Элемент таблицы стиля
 */
interface StylesheetItem {
    /**
     * Тип
     */
    type: StylesheetItemType;

    /**
     * Имя
     */
    name: string;

    /**
     * Стили
     */
    style: CSSStyleDeclaration | { [name: string]: string | null };
}

/**
 * Таблица стилей
 *
 */
export default class AppStylesheet {

    /**
     * Глобавльные стили
     */
    public static readonly global = new AppStylesheet();
    /**
     * Классы
     */
    public readonly classes: ObservableDictionary<StylesheetItem>;

    /**
     * Панель стилей
     */
    public stylesheet: StyleSheet;

    /**
     * Элемент таблицы стилей
     */
    protected __view: HTMLStyleElement;

    /**
     * Конструктор
     * @param sheet
     *
     */
    public constructor(sheet?: StyleSheet) {
        this.__view = document.createElement("style");
        this.stylesheet = sheet || (this.__view.sheet || {} as StyleSheet);

        this.classes = new ObservableDictionary<StylesheetItem>();
    }

    /**
     * Возвращает документ
     */
    public getDocument(): HTMLStyleElement {
        return this.__view;
    }

    public addItem(name: string, type: StylesheetItemType, style: CSSStyleDeclaration |
        { [name: string]: string }): AppStylesheet {
        if (this.classes.contains(name) && this.classes.item(name)!.type === type) {
            this.classes.item(name)!.style = {
                ...(this.classes.item(name)!.style || {}),
                ...(style as CSSStyleDeclaration),
            };
        } else {
            this.classes.add(name, {name, type, style});
        }
        return this.rebuild();
    }

    /**
     * Добавляет класс стилей
     * @param className
     * @param style
     */
    public addClass(className: string, style: CSSStyleDeclaration | { [name: string]: string }): AppStylesheet {
        return this.addItem(className, StylesheetItemType.class, style);
    }

    /**
     * Добавляет ID стилей
     * @param id
     * @param style
     */
    public addID(id: string, style: CSSStyleDeclaration | { [name: string]: string }): AppStylesheet {
        return this.addItem(id, StylesheetItemType.id, style);
    }

    /**
     * Добавляет стили
     * @param name
     * @param style
     */
    public add(name: string, style: CSSStyleDeclaration | { [name: string]: string }): AppStylesheet {
        return this.addItem(name, StylesheetItemType.tag, style);
    }

    /**
     * Перестроение таблицы стилей
     */
    public rebuild(): AppStylesheet {
        this.getDocument().innerHTML = "";
        this.classes.forEach((key: any, value: any) => {
            const tempNode = document.createElement("div");
            for (const name in value.style) if (value.style.hasOwnProperty(name))
                (tempNode.style as any)[name] = (value.style as any)[name];
            let name = value.name;
            switch (value.type) {
                case StylesheetItemType.class:
                    name = `.${name}`;
                    break;
                case StylesheetItemType.tag:
                    name = `${name}`;
                    break;
                case StylesheetItemType.id:
                    name = `#${name}`;
                    break;
            }
            this.getDocument().appendChild(
                document.createTextNode(`${name}{${tempNode.getAttribute("style")!.replace(/;/g, " !important;")}}`));
        });
        return this;
    }
}
