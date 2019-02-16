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
 + Файл: elyWSProjectFileProtocol.ts                                          +
 + Файл изменен: 08.12.2018 03:10:04                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewEntityProtocol from "@controls/protocols/elyViewEntityProtocol";

/**
 * Протокол файла elyWS
 */
export default interface elyWSProjectFileProtocol {

    /**
     * Имя проекта
     */
    projectName: string;

    /**
     * Элементы отображения
     */
    views: { [name: string]: elyViewEntityProtocol };

    /**
     * Соединения
     */
    svs: {[name: string]: {[connected: string]: string}};
}
