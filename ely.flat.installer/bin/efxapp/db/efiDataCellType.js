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
 + Файл: efiDataCellType.ts                                                   +
 + Файл изменен: 26.02.2019 00:19:06                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.__esModule = true;
/**
 * Типы ячеек
 */
var efiDataCellType;
(function (efiDataCellType) {
    efiDataCellType["boolean"] = "boolean";
    efiDataCellType["number"] = "number";
    efiDataCellType["string"] = "string";
    efiDataCellType["array"] = "array";
    efiDataCellType["object"] = "object";
    efiDataCellType["id"] = "id";
})(efiDataCellType = exports.efiDataCellType || (exports.efiDataCellType = {}));
