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
 * Файл: elyXLogger* Файл создан: 04.12.2018 07:03:21
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

/**
 * elyXLogger - логгер уровня X
 */
export default class elyXLogger {

    /**
     * Стандартный логгер
     */
    public static default = new elyXLogger({mainPrefix: "Default"});

    /**
     * Уровни логирования
     */
    public static loggerLevels = {
        DEBUG: 2,
        LOG: 1,
        NONE: 0,
    };

    /**
     * Текущий уровень логирования
     */
    public static loggerLevel = elyXLogger.loggerLevels.DEBUG;

    /**
     * Стили
     */
    public static styles = {

        /**
         * Сбрасывает любой примененный эффект
         * @type {string}
         */
        reset: "\x1b[0m",

        /**
         * Делает цвет ярче
         * @type {string}
         */
        bright: "\x1b[1m",

        dim: "\x1b[2m",

        /**
         * Подчернутый текст
         * @type {string}
         */
        underscore: "\x1b[4m",

        /**
         * Мигающий текст
         * @type {string}
         */
        blink: "\x1b[5m",

        /**
         * Скрытый текст
         */
        hidden: "\x1b[8m",

        /**
         * Развернутый текст
         */
        reverse: "\x1b[7m",

        /**
         * Font color: Black
         * @type {string}
         */
        fgBlack: "\x1b[30m",

        /**
         * Font color: Red
         * @type {string}
         */
        fgRed: "\x1b[31m",

        /**
         * Font color: Green
         * @type {string}
         */
        fgGreen: "\x1b[32m",

        /**
         * Font color: Yellow
         * @type {string}
         */
        fgYellow: "\x1b[33m",

        /**
         * Font color: Blue
         * @type {string}
         */
        fgBlue: "\x1b[34m",

        /**
         * Font color: Magenta
         * @type {string}
         */
        fgMagenta: "\x1b[35m",

        /**
         * Font color: Cyan
         * @type {string}
         */
        fgCyan: "\x1b[36m",

        /**
         * Font color: White
         * @type {string}
         */
        fgWhite: "\x1b[37m",

        /**
         * Font color: Grey
         * @type {string}
         */
        fgGrey: "\x1b[37m",

        /**
         * Background color: Black
         * @type {string}
         */
        bgBlack: "\x1b[40m",

        /**
         * Background color: Red
         * @type {string}
         */
        bgRed: "\x1b[41m",

        /**
         * Background color: Green
         * @type {string}
         */
        bgGreen: "\x1b[42m",

        /**
         * Background color: Yellow
         * @type {string}
         */
        bgYellow: "\x1b[43m",

        /**
         * Background color: Blue
         * @type {string}
         */
        bgBlue: "\x1b[44m",

        /**
         * Background color: Magenta
         * @type {string}
         */
        bgMagenta: "\x1b[45m",

        /**
         * Background color: Cyan
         * @type {string}
         */
        bgCyan: "\x1b[46m",

        /**
         * Background color: White
         * @type {string}
         */
        bgWhite: "\x1b[47m",
    };

    /**
     * Filters the logger message
     *
     * @param {string} msg - the message
     * @param {boolean} [clearfix = false] - if true: color tags will remove
     *                                       else it will be evaluated
     *
     * @return {string} - evaluated of cleared message
     * @private
     */
    protected static __loggerFilter(msg: string, clearfix = false) {
        msg = msg.replace(/&rst/g, clearfix ? "" : elyXLogger.styles.reset);
        msg = msg.replace(/&red/g, clearfix ? "" : elyXLogger.styles.fgRed);
        msg = msg.replace(/&grn/g, clearfix ? "" : elyXLogger.styles.fgGreen);
        msg = msg.replace(/&cyn/g, clearfix ? "" : elyXLogger.styles.fgCyan);
        msg = msg.replace(/&gre/g, clearfix ? "" : elyXLogger.styles.fgGrey);
        msg = msg.replace(/&blu/g, clearfix ? "" : elyXLogger.styles.fgBlue);
        msg = msg.replace(/&ywl/g, clearfix ? "" : elyXLogger.styles.fgYellow);
        msg = msg.replace(/&mgn/g, clearfix ? "" : elyXLogger.styles.fgMagenta);

        msg = msg.replace(/&uns/g, clearfix ? "" : elyXLogger.styles.underscore);

        return msg;
    }

    /**
     * Запись логов в файл
     */
    public writeLogs: boolean = false;

    /**
     * Чистый лог
     */
    public clear: boolean;

    /**
     * Главный префикс
     */
    protected mainPrefix: string = "";

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { mainPrefix?: string, writeLogs?: boolean, clear?: boolean } = {}) {
        this.mainPrefix = props.mainPrefix || "ely";
        this.writeLogs = props.writeLogs || false;
        this.clear = props.clear || false;
    }

    /**
     * Отображает сообщение в консоль
     * @param {String} msg
     */
    public log(msg: string) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Log"]);
    }

    /**
     * Отображает сообщение в консоль от имени модуля module
     *
     * @param {String} module - модуль
     * @param {String} msg - сообщение
     */
    public mod(module: string, msg: string) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Module", [elyXLogger.styles.fgMagenta, module]]);
    }

    /**
     * Отображает сообщение об ошибке
     * @param {String} msg
     */
    public error(msg: string) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[elyXLogger.styles.fgRed, "Error"]]);
    }

    /**
     * Отображает предупреждение
     * @param {String} msg
     */
    public warning(msg: string) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[elyXLogger.styles.fgMagenta, "Warning"]]);
    }

    /**
     * Выводит LOG информацию
     *
     * @param {string} message  - the message
     * @param {Array} prefixes - the array with the prefixes
     *
     * "prefixes" could be like:
     *
     *  1. [ "Log" ]                                - Simple
     *  2. [ "Module", "Test" ]                     - Tree
     *  3. [ "Module", [ "\x1b[32m", "Test" ] ]     - Tree with the color
     *
     *  @private
     */
    protected _sendToConsole(message: string, prefixes: any) {
        if (this.mainPrefix !== "") {
            const _temp = [[elyXLogger.styles.fgCyan, this.mainPrefix]];
            for (const _prefix of prefixes) _temp.push(_prefix);
            prefixes = _temp;
        }

        const dateString = new Date().toISOString().replace(/T/, " ").// replace T with a space
        replace(/\..+/, "");

        let _prefixToDisplay = "";
        let _clearPrefix = "";

        for (let _prefix of prefixes) {
            let _color = this.clear ? "" : elyXLogger.styles.fgGreen;
            if (_prefix instanceof Array) {
                _color = _prefix[0];
                _prefix = _prefix[1];
            }

            _prefixToDisplay += "[" + (!this.clear ? _color : "") + _prefix +
                (!this.clear ? elyXLogger.styles.reset : "") + "]";
            _clearPrefix += "[" + _prefix + "]";
        }

        const str = "[" + dateString + "]" + _clearPrefix + ": " + elyXLogger.__loggerFilter(message, true);
        const strToDisplay = "["
            + (!this.clear ? elyXLogger.styles.fgGrey : "")
            + dateString
            + (!this.clear ? elyXLogger.styles.reset : "")
            + "]"
            + _prefixToDisplay
            + (!this.clear ? elyXLogger.styles.reset : "")
            + ": " + elyXLogger.__loggerFilter(message) + (this.clear ? "" : elyXLogger.styles.reset);

        this._saveLogString(str);
        if (this.clear)
            console.log(elyXLogger.__loggerFilter(strToDisplay, true));
        else
            console.log(strToDisplay);
    }

    /**
     * Записывает данные в файл
     *
     * @param {string} str
     * @private
     */
    protected _saveLogString(str: string) {
        // if (this.writeLogs)
        //     require("fs").appendFile("./logs/logger0.log", str + "\n", () => { /* Nothing is done. */
        //     });
    }
}
