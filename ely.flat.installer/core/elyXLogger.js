"use strict";
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
exports.__esModule = true;
/**
 * elyXLogger - логгер уровня X
 */
var elyXLogger = /** @class */ (function () {
    /**
     * Конструктор
     * @param props
     */
    function elyXLogger(props) {
        if (props === void 0) { props = {}; }
        /**
         * Запись логов в файл
         */
        this.writeLogs = false;
        /**
         * Главный префикс
         */
        this.mainPrefix = "";
        this.mainPrefix = props.mainPrefix || "ely";
        this.writeLogs = props.writeLogs || false;
        this.clear = props.clear || false;
    }
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
    elyXLogger.__loggerFilter = function (msg, clearfix) {
        if (clearfix === void 0) { clearfix = false; }
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
    };
    /**
     * Отображает сообщение в консоль
     * @param {String} msg
     */
    elyXLogger.prototype.log = function (msg) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Log"]);
    };
    /**
     * Отображает сообщение в консоль от имени модуля module
     *
     * @param {String} module - модуль
     * @param {String} msg - сообщение
     */
    elyXLogger.prototype.mod = function (module, msg) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.LOG)
            this._sendToConsole(msg, ["Module", [elyXLogger.styles.fgMagenta, module]]);
    };
    /**
     * Отображает сообщение об ошибке
     * @param {String} msg
     */
    elyXLogger.prototype.error = function (msg) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[elyXLogger.styles.fgRed, "Error"]]);
    };
    /**
     * Отображает предупреждение
     * @param {String} msg
     */
    elyXLogger.prototype.warning = function (msg) {
        if (elyXLogger.loggerLevel >= elyXLogger.loggerLevels.DEBUG)
            this._sendToConsole(msg, [[elyXLogger.styles.fgMagenta, "Warning"]]);
    };
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
    elyXLogger.prototype._sendToConsole = function (message, prefixes) {
        if (this.mainPrefix !== "") {
            var _temp = [[elyXLogger.styles.fgCyan, this.mainPrefix]];
            for (var _i = 0, prefixes_1 = prefixes; _i < prefixes_1.length; _i++) {
                var _prefix = prefixes_1[_i];
                _temp.push(_prefix);
            }
            prefixes = _temp;
        }
        var dateString = new Date().toISOString().replace(/T/, " "). // replace T with a space
            replace(/\..+/, "");
        var _prefixToDisplay = "";
        var _clearPrefix = "";
        for (var _a = 0, prefixes_2 = prefixes; _a < prefixes_2.length; _a++) {
            var _prefix = prefixes_2[_a];
            var _color = this.clear ? "" : elyXLogger.styles.fgGreen;
            if (_prefix instanceof Array) {
                _color = _prefix[0];
                _prefix = _prefix[1];
            }
            _prefixToDisplay += "[" + (!this.clear ? _color : "") + _prefix +
                (!this.clear ? elyXLogger.styles.reset : "") + "]";
            _clearPrefix += "[" + _prefix + "]";
        }
        var str = "[" + dateString + "]" + _clearPrefix + ": " + elyXLogger.__loggerFilter(message, true);
        var strToDisplay = "["
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
    };
    /**
     * Записывает данные в файл
     *
     * @param {string} str
     * @private
     */
    elyXLogger.prototype._saveLogString = function (str) {
        // if (this.writeLogs)
        //     require("fs").appendFile("./logs/logger0.log", str + "\n", () => { /* Nothing is done. */
        //     });
    };
    /**
     * Стандартный логгер
     */
    elyXLogger["default"] = new elyXLogger({ mainPrefix: "Default" });
    /**
     * Уровни логирования
     */
    elyXLogger.loggerLevels = {
        DEBUG: 2,
        LOG: 1,
        NONE: 0
    };
    /**
     * Текущий уровень логирования
     */
    elyXLogger.loggerLevel = elyXLogger.loggerLevels.DEBUG;
    /**
     * Стили
     */
    elyXLogger.styles = {
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
        bgWhite: "\x1b[47m"
    };
    return elyXLogger;
}());
exports["default"] = elyXLogger;
