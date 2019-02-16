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
 + Файл: elyFlatApplicationConfig.ts                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplicationConfig_Application from "@app/app/options/elyFlatApplication/app";
import elyFlatApplicationConfig_Navigation from "@app/app/options/elyFlatApplication/navigation";
import elyFlatApplicationConfig_Sideavigation from "@app/app/options/elyFlatApplication/sidenavigation";
import elyFlatApplicationConfig_Template from "@app/app/options/elyFlatApplication/template";

/**
 * Конфигурация приложения
 */
export default interface elyFlatApplicationConfig {

    /**
     * Шаблон
     */
    template?: elyFlatApplicationConfig_Template;

    /**
     * Приложение
     */
    app?: elyFlatApplicationConfig_Application;

    /**
     * Опции навигации
     */
    navigation?: elyFlatApplicationConfig_Navigation;

    /**
     * Опции боковой навигации
     */
    sidenavigation?: elyFlatApplicationConfig_Sideavigation;

}
