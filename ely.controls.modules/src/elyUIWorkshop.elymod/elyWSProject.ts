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
 + Файл: elyWSProject.ts                                                      +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "@core/observable/elyObservable";

/**
 * Проект ely workshop
 */
export default class elyWSProject extends elyObservable {

    /**
     * Текущий проект
     */
    public static current: elyWSProject | null = new elyWSProject({name: "MyFirstProject"});

    /**
     * Имя проекта
     */
    public readonly name: string;

    /**
     * Данные проекта
     */
    public data: any;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { name: string, data?: any }) {
        super();
        this.name = name;
        this.data = props.data || {};

        this.notificate("loaded");
    }
}
