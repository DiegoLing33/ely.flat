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
 + Проект: ely.flat.application                                               +
 +                                                                            +
 + Файл: elyTabBarOptions.ts                                                  +
 + Файл изменен: 23.11.2018 23:53:01                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyStyle from "@enums/elyStyle";
import elyViewOptions from "@core/controls/elyViewOptions";

/**
 * Опции {@link elyTabBarView}
 */
export default interface elyTabBarOptions extends elyViewOptions {

    /**
     * Расположение
     */
    tabBarOrigin?: string;

    /**
     * Навесной
     */
    tabBarSticky?: boolean;

    /**
     * Стиль
     */
    tabBarStyle?: elyStyle | string;
}
