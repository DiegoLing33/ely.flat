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
 + Файл: efxAppDatabase.ts                                                    +
 + Файл изменен: 22.02.2019 22:11:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as fs from "fs";
import * as md5 from "md5";

/**
 * Таблица данных efX-app
 * @class efxAppDatabase
 */
export class efxAppDatabase {

    /**
     * Проверяет существование таблицы path
     * @param db_path
     */
    public static checkExists(db_path: string) {
        return fs.existsSync(db_path);
    }

    /**
     * Данные
     */
    public __data: any;

    /**
     * Путь до базы данных
     */
    public readonly path: string;

    /**
     * Конструктор
     * @param db_path
     * @param o
     */
    public constructor(db_path: string, o: (err?: string) => void) {
        this.path = db_path;
        if (!efxAppDatabase.checkExists(db_path)) o("База данных не найдена!");
        else this.update(o);
    }

    /**
     * Возвращает элементы таблицы
     * @param table
     */
    public getTableItems(table: string): any[] | null {
        if (this.__data.items.hasOwnProperty(table)) {
            return this.__data.db[table] || [];
        }
        return null;
    }

    /**
     * ВОзвращает true, если таблица существует
     * @param tableName
     */
    public hasTable(tableName: string): boolean {
        return this.__data.items.hasOwnProperty(tableName);
    }

    /**
     * Возвращает true, если таблица имеет колонку
     * @param tableName
     * @param columnName
     */
    public tableHasColumn(tableName: string, columnName: string): boolean {
        const cols = this.getTableColumns(tableName);
        return cols ? cols.indexOf(columnName) > -1 : false;
    }

    /**
     * Возвращает строку таблицы
     * @param tableName
     * @param rowIndex
     */
    public getTableRow(tableName: string, rowIndex: number): any {
        if (!this.hasTable(tableName)) return null;
        const items = this.getTableItems(tableName);
        if (items) return items;
        return null;
    }

    /**
     * Обновляет базу данных
     * @param o
     */
    public update(o: (err?: string) => void) {
        fs.readFile(this.path, (err, content) => {
            if (err) {
                o(err.message);
                return;
            }
            try {
                this.__data = JSON.parse(String(content));
                o();
            } catch (e) {
                o(e.message);
                this.__data = null;
            }
        });
    }

    /**
     * Сохраняет базу данных
     * @param callback
     */
    public save(callback: (err?: string) => void): void {
        fs.writeFile(this.path, JSON.stringify(this.__data, null, 2), err => {
            callback(err ? err.message : undefined);
        });
    }

    /**
     * ВОзвращает заголовки таблицы
     * @param tableName
     */
    public getTableColumns(tableName: string): string[] | null {
        if (!this.hasTable(tableName)) return null;
        return this.__data.items[tableName].items || null;
    }

    /**
     * Устанавливает элемент таблицы
     * @param table
     * @param rowIndex
     * @param column
     * @param value
     * @param callback
     */
    public setTableRowColumnItem(table: string, rowIndex: number, column: string,
                                 value: any, callback: (err?: string) => void) {
        if (!this.hasTable(table))
            return callback(`Таблица ${table} не найдена в базе данных!`);

        if (!this.tableHasColumn(table, column))
            return callback(`Таблица ${table} не имеет колонки ${column}!`);

        const row = this.getTableRow(table, rowIndex);
        if (!row) return callback(`В таблице ${table} не найдена строка index: ${rowIndex}!`);
        this.__data.db[table][rowIndex][this.getTableColumns(table).indexOf(column)] = value;
        this.save(callback);
    }

    /**
     * Добавляет строку в таблицу
     * @param tableName
     * @param data
     * @param callback
     */
    public addTableRow(tableName: string, data: any, callback: (err?: string) => void) {
        if (!this.hasTable(tableName)) return callback(`Таблица ${tableName} не найдена в базе данных!`);
        const values = [];
        this.getTableColumns(tableName).forEach(col => {
            if (col === "id") {
                values.push(md5(new Date().getTime() + tableName));
            } else {
                if (data.hasOwnProperty(col)) {
                    values.push(data[col]);
                } else {
                    values.push(null);
                }
            }
        });
        this.__data.db[tableName].push(values);
        this.save(callback);
    }

    /**
     * Возвращает строку таблицы по критерию
     * @param tableName
     * @param selector
     * @param callback
     */
    public getTableRows(tableName: string, selector: any, callback: (err?: string, rows?: any[]) => void): void {
        if (!this.hasTable(tableName)) return callback(`Таблица ${tableName} не найдена в базе данных!`);
        const columns = this.getTableColumns(tableName);
        selector = Object.keys(selector).map(value => {
            return {key: columns.indexOf(value), value: selector[value]};
        });
        const rows = [];
        this.getTableItems(tableName).forEach((row: any[]) => {
            if ((selector as any[]).every(value => row[value.key] === value.value)) {
                const obj = {};
                columns.forEach((value, index) => {
                    obj[value] = row[index];
                });
                rows.push(obj);
            }
        });
        callback(undefined, rows);
    }
}
