"use strict";
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
 + Файл: efiDataRoww.ts                                                         +
 + Файл изменен: 25.02.2019 22:53:30                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
var elyUtils_1 = require("../../core/elyUtils");
/**
 * Строка данных
 */
var efiDataRow = /** @class */ (function () {
    function efiDataRow(data) {
        elyUtils_1["default"].mergeDeep(this, data);
    }
    /**
     * Сохраняет строку
     * @param callback
     */
    efiDataRow.prototype.save = function (callback) {
        return this;
    };
    /**
     * Удаляет строку
     * @param callback
     */
    efiDataRow.prototype.remove = function (callback) {
        return;
    };
    return efiDataRow;
}());
exports.efiDataRow = efiDataRow;
