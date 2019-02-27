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
 + Файл: efiDataTablee.ts                                                       +
 + Файл изменен: 25.02.2019 22:55:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as fs from "fs";
import * as md5 from "md5";
import {
    TDataCellFilter,
    TDataCells,
    TDataRow,
    TDataRowFilterClosure,
    TDataRows,
    TDataTableCell,
    TErrorCallback,
    TResultCallback,
} from "../../efiTypes";
import {efiDataCellType} from "./efiDataCellType";
import {efiDataRow} from "./efiDataRow";

/**
 * Интерфейс таблицы данныз
 */
export interface IEFIDataTable {
    /**
     * Имя таблицы
     */
    name: string;

    /**
     * Колонки таблицы
     */
    columns: { [name: string]: TDataTableCell };

    /**
     * Строки в таблице
     */
    rows: efiDataRow[];
}

/**
 * Таблица базы данных efiDatabase
 * @class
 */
export class efiDataTable {

    /**
     * Расширение db файлов
     */
    public static DB_FILES_EXTENSION = "db.json";

    /**
     * Красивое оформление db файлов внутри
     *
     * Данный флаг снижает производительность!
     */
    public static DB_PRETTY_SAVE = true;

    /**
     * Возвращает true, если база данных существует
     * @param name
     * @param path
     */
    public static isDataTableExists(name: string, path: string): boolean {
        return fs.existsSync(`${path}/${name}.${efiDataTable.DB_FILES_EXTENSION}`);
    }

    /**
     * Создает новую таблицу
     * @param name
     * @param path - расположение таблицы (путь до хранилища)
     * @param cells
     * @param callback
     */
    public static create(name: string, path: string, cells: TDataCells, callback: TErrorCallback): efiDataTable {
        return new efiDataTable({name, load: false, path, cells, callback});
    }

    /**
     * Загружает таблицу
     * @param name
     * @param path - расположение таблицы (путь до хранилища)
     * @param callback
     */
    public static load(name: string, path: string, callback: (err?: string) => void): efiDataTable {
        return new efiDataTable({name, load: true, path, callback});
    }

    /**
     * Таблица
     */
    protected __data: IEFIDataTable;

    /**
     * Путь до db файла
     */
    protected readonly __path: string;

    /**
     * Имя таблицы
     */
    protected __name: string;

    /**
     * Конструктор
     * @param props
     *
     * @throws Error
     */
    protected constructor(props: {
        name: string, load: boolean, path: string, cells?: TDataCells,
        callback: TErrorCallback,
    }) {
        this.__path = `${props.path}/${props.name}.${efiDataTable.DB_FILES_EXTENSION}`;
        this.__name = props.name;

        if (props.load) {
            if (!efiDataTable.isDataTableExists(this.getName(), props.path)) {
                props.callback(`Таблица [${this.getName()}] не существует!`);
                return;
            }

            fs.readFile(this.getPath(), (err, content) => {
                if (err) return props.callback(err.message);
                try {
                    this.__data = JSON.parse(String(content));
                    props.callback();
                    return;
                } catch (e) {
                    props.callback(e.message);
                    return;
                }
            });
        } else {
            if (efiDataTable.isDataTableExists(this.getName(), props.path)) {
                props.callback(`Таблица [${this.getName()}] уже существует!`);
                return;
            } else {
                if (props.cells) {
                    Object.keys(props.cells).forEach(column => {
                        if (props.cells[column].nullable === undefined)
                            props.cells[column].nullable = true;
                        if (props.cells[column].default === undefined)
                            props.cells[column].default = null;
                    });
                    props.cells.id = {type: efiDataCellType.id};
                } else {
                    props.callback(`Для создания таблицы необходимо передать колонки!`);
                    return;
                }
                this.__data = {name: this.__name, columns: props.cells, rows: []};
                this.save(props.callback);
            }
        }
    }

    /**
     * Возвращает путь до db файла
     */
    public getPath(): string {
        return this.__path;
    }

    /**
     * Возвращает имя таблицы
     */
    public getName(): string {
        return this.__name;
    }

    /**
     * Возвращает колонки таблицы
     */
    public getColumns(): { [name: string]: TDataTableCell } {
        return this.__data.columns;
    }

    /**
     * Возвращает строки таблицы
     */
    public getRows(): TDataRows {
        return this.__data.rows.map(value => {
            this.__assignRow(value);
            return value;
        });
    }

    /**
     * Удаляет конкретную строку по переданному объекту
     *
     * @param row
     * @param callback
     */
    public removeRow(row: TDataRow, callback?: TErrorCallback): efiDataTable {
        const index = this.__data.rows.indexOf(row as efiDataRow);
        if (index > -1) this.__data.rows.splice(index, 1);
        return this;
    }

    /**
     * Удаляет строку
     * @param filter
     * @param callback
     */
    public remove(filter: TDataRowFilterClosure | TDataCellFilter, callback?: TErrorCallback): efiDataTable {
        if (typeof filter === "function") {
            this.getRows().forEach((value, index) => {
                if ((filter as TDataRowFilterClosure)(value)) {
                    this.__data.rows.splice(index, 1);
                }
            });
            this.save(callback);
            return this;
        }
        return this.remove(row => Object.keys(filter).every(cell => row[cell] === filter[cell]),
            callback);
    }

    /**
     * Делает выборку строк
     * @param filter
     * @param result
     */
    public select(filter: TDataRowFilterClosure | TDataCellFilter, result: TResultCallback<TDataRows>): efiDataTable {
        if (typeof filter === "function") {
            result(this.getRows().filter(value => (filter as TDataRowFilterClosure)(value)));
            return this;
        }
        return this.select(row => Object.keys(filter).every(cell => row[cell] === filter[cell]), result);
    }

    /**
     * Позволяет обрабатывать выборку
     *
     * @param filter
     * @param closure
     * @param callback
     */
    public handle(filter: TDataRowFilterClosure | TDataCellFilter, closure: (row: TDataRow) => void,
                  callback?: TErrorCallback): efiDataTable {
        if (typeof filter === "function") {
            this.getRows().forEach((value) => {
                if ((filter as TDataRowFilterClosure)(value)) closure(value);
            });
            this.save(callback);
            return this;
        }
        return this.handle(row => Object.keys(filter).every(cell => row[cell] === filter[cell]),
            closure, callback);
    }

    /**
     * Возвращает количество элементов
     *
     * @param filter
     * @param result
     */
    public count(filter: TDataRowFilterClosure | TDataCellFilter, result: TResultCallback<number>): efiDataTable {
        if (typeof filter === "function") {
            result(this.getRows().filter(value => (filter as TDataRowFilterClosure)(value)).length);
            return this;
        }
        return this.count(row => Object.keys(filter).every(cell => row[cell] === filter[cell]), result);
    }

    /**
     * Возвращает количество элементов
     *
     * @param filter
     * @param result
     */
    public exists(filter: TDataRowFilterClosure | TDataCellFilter, result: TResultCallback<boolean>): efiDataTable {
        if (typeof filter === "function") {
            result(this.getRows().some(row => (filter as TDataRowFilterClosure)(row)));
            return this;
        }
        return this.exists(row => Object.keys(filter).every(cell => row[cell] === filter[cell]), result);
    }

    /**
     * Добавляет строку в таблицу
     * @param objects
     */
    public add(...objects: any[]): efiDataTable {
        objects.forEach(object => {
            if (!(object instanceof efiDataRow)) {
                object = new efiDataRow(object);
            }
            this.__assignRow(object as efiDataRow);
            this.__data.rows.push(object as efiDataRow);
        });
        return this;
    }

    /**
     * Очищает базу данных
     * @param callback
     */
    public clear(callback?: TErrorCallback): efiDataTable {
        this.__data.rows = [];
        this.save(callback);
        return this;
    }

    /**
     * Сохраняет таблицу
     */
    public save(callback?: TErrorCallback): void {
        let error = false;
        this.__data.rows.map(value => {
            if (error) return;

            Object.keys(value).filter(key => !this.getColumns().hasOwnProperty(key)).forEach(key => {
                if (key !== "remove") delete value[key];
            });

            for (const cellName in this.getColumns()) {
                if (!this.getColumns().hasOwnProperty(cellName)) continue;
                const cell = this.getColumns()[cellName];
                if (!value.hasOwnProperty(cellName)) {
                    value[cellName] = cell.default === undefined ? null : cell.default;
                    if (value[cellName] === null && !cell.nullable) {
                        if (callback) callback(`Ячейка [${cellName}] не может быть null!`);
                        error = true;
                    }
                }
                value[cellName] = value.hasOwnProperty(cellName) ? value[cellName] : null;
            }
            return value;
        });
        if (error) return;
        fs.writeFile(this.getPath(), efiDataTable.DB_PRETTY_SAVE ? JSON.stringify(this.__data, null, 2) :
            JSON.stringify(this.__data), err => {
            if (err) return callback ? callback("Ошибка записи таблицы: " + err.message) : null;
            else {
                if (callback) callback();
            }
        });
        return;
    }

    protected __assignRow(row: efiDataRow, methods: boolean = true) {
        if (methods) {
            row.remove = callback => {
                this.removeRow(row, callback);
                return;
            };
        }
        if (!(row as object).hasOwnProperty("id"))
            (row as any).id = md5(this.getName() + new Date().getTime());
    }
}
