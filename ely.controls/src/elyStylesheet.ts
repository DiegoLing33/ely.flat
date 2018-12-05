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
 + Файл: elyStylesheet.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";

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
 * Файл: elyStylesheet.ts
 * Файл создан: 19.11.2018 20:56:39
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *
 */

/**
 * Типы стиля
 */
enum elyStylesheetItemType {
    class, tag, id,
}

/**
 * Элемент таблицы стиля
 */
interface elyStylesheetItem {
    /**
     * Тип
     */
    type: elyStylesheetItemType;

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
export default class elyStylesheet {

    /**
     * Глобавльные стили
     */
    public static readonly global = new elyStylesheet();
    /**
     * Классы
     */
    public readonly classes: elyObservableDictionary<elyStylesheetItem>;

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

        this.classes = new elyObservableDictionary<elyStylesheetItem>();
    }

    /**
     * Возвращает документ
     */
    public getDocument(): HTMLStyleElement {
        return this.__view;
    }

    public addItem(name: string, type: elyStylesheetItemType, style: CSSStyleDeclaration |
        { [name: string]: string }): elyStylesheet {
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
    public addClass(className: string, style: CSSStyleDeclaration | { [name: string]: string }): elyStylesheet {
        return this.addItem(className, elyStylesheetItemType.class, style);
    }

    /**
     * Добавляет ID стилей
     * @param id
     * @param style
     */
    public addID(id: string, style: CSSStyleDeclaration | { [name: string]: string }): elyStylesheet {
        return this.addItem(id, elyStylesheetItemType.id, style);
    }

    /**
     * Добавляет стили
     * @param name
     * @param style
     */
    public add(name: string, style: CSSStyleDeclaration | { [name: string]: string }): elyStylesheet {
        return this.addItem(name, elyStylesheetItemType.tag, style);
    }

    /**
     * Перестроение таблицы стилей
     */
    public rebuild(): elyStylesheet {
        this.getDocument().innerHTML = "";
        this.classes.forEach((key, value) => {
            const tempNode = document.createElement("div");
            for (const name in value.style) if (value.style.hasOwnProperty(name))
                (tempNode.style as any)[name] = (value.style as any)[name];
            let name = value.name;
            switch (value.type) {
                case elyStylesheetItemType.class:
                    name = `.${name}`;
                    break;
                case elyStylesheetItemType.tag:
                    name = `${name}`;
                    break;
                case elyStylesheetItemType.id:
                    name = `#${name}`;
                    break;
            }
            this.getDocument().appendChild(
                document.createTextNode(`${name}{${tempNode.getAttribute("style")!.replace(";", " !important;")}}`));
        });
        return this;
    }
}
