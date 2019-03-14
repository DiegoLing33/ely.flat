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
 + Файл: efiDatabaseApi.ts                                                    +
 + Файл изменен: 26.02.2019 01:53:16                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyUtils from "../core/elyUtils";
import {efi} from "../efi";
import {TEfiServerApiMethod, TResponseApiCallback} from "../efiTypes";
import {efiDataTable} from "../efxapp/db/efiDataTable";

/**
 * Класс API методов для работы с базой данных
 * @class
 */
export class efiDatabaseApi {

    /**
     * Возвращает строки
     * @param path
     * @param next
     */
    public static select(path: string, next: TResponseApiCallback): TEfiServerApiMethod {
        return {
            args: ["table"],
            method: (args) => {
                efiDatabaseApi.__connect(args.table, next, table => {
                    efi.logger.log(`Выборка из таблицы [${args.table}]`);
                    table.select(row => {
                        const filter = elyUtils.filterObject(args, index => index !== "table");
                        return Object.keys(filter).every(key => {
                            const fv = String(filter[key]);
                            return (fv.indexOf("%") > -1) ?
                                new RegExp(fv.replace("%", ".+")).test(row[key]) :
                                row[key] === fv;
                        });
                    }, result => {
                        next(true, result);
                    });
                });
            },
        };
    }

    /**
     * Удаляет строки
     * @param path
     * @param next
     */
    public static remove(path: string, next: TResponseApiCallback): TEfiServerApiMethod {
        return {
            args: ["table"],
            method: (args) => {
                efiDatabaseApi.__connect(args.table, next, table => {
                    efi.logger.log(`Удаление строк из таблицы [${args.table}]`);
                    table.remove(row => {
                        const filter = elyUtils.filterObject(args, index => index !== "table");
                        return Object.keys(filter).every(key => {
                            const fv = String(filter[key]);
                            return (fv.indexOf("%") > -1) ?
                                new RegExp(fv.replace("%", ".+")).test(row[key]) :
                                row[key] === fv;
                        });
                    }, error => {
                        if (error) next(false, error);
                        else next(true, "ok");
                    });
                });
            },
        };
    }

    /**
     * Добавляет строку
     * @param path
     * @param next
     */
    public static add(path: string, next: TResponseApiCallback): TEfiServerApiMethod {
        return {
            args: ["table"],
            method: (args) => {
                efiDatabaseApi.__connect(args.table, next, table => {
                    efi.logger.log(`Запись в таблицу [${args.table}]`);
                    const filter = elyUtils.filterObject(args, index => index !== "table");
                    if (!Object.keys(table.getColumns())
                        .every(value => Object.keys(filter).indexOf(value) > -1 || value === "id")) {
                        next(false, "Ошибка в синтаксисе запроса");
                        return;
                    }
                    table.add(filter);
                    table.save(error => {
                        if (error) next(false, {error});
                        else next(true, "ok");
                    });
                });
            },
        };
    }

    /**
     * Добавляет строку
     * @param path
     * @param next
     */
    public static cells(path: string, next: TResponseApiCallback): TEfiServerApiMethod {
        return {
            args: ["table"],
            method: (args) => {
                efiDatabaseApi.__connect(args.table, next, table => {
                    next(true, table.getColumns());
                });
            },
        };
    }

    /**
     * Возвращает список таблиц
     * @param path
     * @param next
     */
    public static list(path: string, next: TResponseApiCallback): TEfiServerApiMethod {
        return {
            args: [],
            method: (args) => {
                if (!efi.db) return next(false, `База данных efi не найдена!`);
                next(true, efi.db.getList());
            },
        };
    }

    protected static __connect(tableName: string, next: TResponseApiCallback, go: (table: efiDataTable) => void) {
        if (!efi.db) return next(false, `База данных efi не найдена!`);
        efi.logger.log(`Подключение к таблице [${tableName}]`);
        const table = efi.db.load(tableName, err => {
            if (err) return next(false, err);
            go(table);
        });
    }

}
