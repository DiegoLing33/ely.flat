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
 + Файл: test.ts                                                              +
 + Файл изменен: 25.02.2019 23:17:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {efiDatabase} from "./bin/efxapp/db/efiDatabase";
import {efiDataCellType} from "./bin/efxapp/db/efiDataCellType";
import {efiDataTable} from "./bin/efxapp/db/efiDataTable";

const db = new efiDatabase({path: __dirname + "/../test/efi-app/db"});

const table = db.loadOrCreate("test", {
    id: {type: efiDataCellType.id},
    name: {type: efiDataCellType.string},
    value: {type: efiDataCellType.object, nullable: false},
}, err => {
    if (err) console.error(err);
    else workWithTable(table);
});

function workWithTable(table: efiDataTable) {
    table.handle({name: "light-2"}, row => row.value[0] = 400);
}
