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
 + Файл: elyWSUtils.ts                                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyWSRegex from "@devMods/elyUIWorkshop.elymod/src/elyWSRegex";

export default class elyWSUtils {

    public static readonly WS_NAME_ATTRIBUTE = "ely-ws-view-name";

    /**
     * Возвращает WS имя элемента
     * @param view
     */
    public static getWSName(view: elyView): string | null {
        return view.attribute(elyWSUtils.WS_NAME_ATTRIBUTE);
    }

    /**
     * Возвращает элемент по имени
     * @param name
     */
    public static getWSViewByName(name: string): elyView | null{
        return elyWSRegex.main.views.item(name);
    }

}
