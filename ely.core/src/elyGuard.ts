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
 + Файл: elyGuard.ts                                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Безопасность значений
 */
export default class elyGuard {

    /**
     * Функция
     * @param func
     * @param args
     * @param callback
     * @param context
     */
    public static func<T>(func: Function, args: any[], callback: (value: T) => void, context?: any): void {
        const result = func.apply(context, args);
        if (result !== undefined && result !== null) callback(result);
    }

    /**
     * Значение
     * @param variable
     * @param callback
     */
    public static variable<T>(variable: any, callback: (value: T) => void): void {
        if (variable !== undefined && variable !== null) callback(variable);
    }

}
