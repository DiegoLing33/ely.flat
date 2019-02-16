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
 + Файл: elyLogger.ts                                                         +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// import figlet from "figlet";

/**
 * Logger
 * @deprecated
 */
export default class elyLogger {

    /**
     * Уровни логирования
     */
    public static logLevels: { no: number, debug: number, warning: number, error: number } = {
        debug: 10,
        error: 3,
        no: 0,
        warning: 2,
    };

    /**
     * Уровень логирования
     */
    public static logLevel = elyLogger.logLevels.debug;

    /**
     * Логирование отладки
     * @param message
     */
    public static debug(message: any) {
        if (elyLogger.logLevel >= elyLogger.logLevels.debug)
            if (console) console.log("[{ " + "Debug" + " }]: " + message.toString());
    }

    /**
     * Логирование предупрждений
     * @param message
     */
    public static warning(message: any) {
        if (elyLogger.logLevel >= elyLogger.logLevels.warning)
            if (console) console.trace("@- [{ " + "Warning" + " }]: " + message.toString());
    }

    /**
     * Логирование ошибок
     * @param message
     */
    public static error(message: any) {
        if (elyLogger.logLevel >= elyLogger.logLevels.error)
            if (console) console.trace("!- [{ " + "ERROR" + " }]: " +
                message.toString());
    }

    /**
     * Логирование отладки -- вывод объекта
     * @param obj
     */
    public static debugObject(obj: any) {
        if (elyLogger.logLevel >= elyLogger.logLevels.debug)
            if (console) console.log(obj);
    }

    /**
     * Выводит сообщение
     * @param message
     */
    public static print(message: any) {
        if (console) console.log("[{ " + "Log" + " }]: " + message.toString());
    }

    /**
     * Выводит текстовое лого желтого цвета
     * @param text
     * @deprecated
     */
    public static logoTextYellow(text: string): void {
        console!.log(
            // figlet.textSync(text, {horizontalLayout: "full"}),
        );
    }

    /**
     * Выводит текстовое лого цианового цвета
     * @param text
     * @deprecated
     */
    public static logoTextCyan(text: string): void {
        console!.log(
            // figlet.textSync(text, {horizontalLayout: "full"}),
        );
    }

    /**
     * Очищает консоль
     */
    public static clear(): void {
        console!.clear();
    }

}
