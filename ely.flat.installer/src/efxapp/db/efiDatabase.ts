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
 + Файл: efiDatabase.tss                                                        +
 + Файл изменен: 25.02.2019 22:58:54                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import * as fs from "fs";
import {TDataCells, TErrorCallback} from "../../efiTypes";
import {efiDataTable} from "./efiDataTable";

/**
 * База данных efi
 * @class
 */
export class efiDatabase {

    /**
     * Путь до хранилища
     */
    protected readonly __path: string;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { path: string }) {
        this.__path = props.path;
    }

    /**
     * Загружает таблицу
     *
     * @param name
     * @param callback
     */
    public load(name: string, callback: TErrorCallback): efiDataTable {
        return efiDataTable.load(name, this.getPath(), callback);
    }

    /**
     * Загружает таблицу
     *
     * @param name
     * @param cells
     * @param callback
     */
    public create(name: string, cells: TDataCells, callback: TErrorCallback): efiDataTable {
        return efiDataTable.create(name, this.getPath(), cells, callback);
    }

    /**
     * Загружает таблицу или создаёт её
     *
     * @param name
     * @param cells
     * @param callback
     */
    public loadOrCreate(name: string, cells: TDataCells, callback: TErrorCallback): efiDataTable {
        if (efiDataTable.isDataTableExists(name, this.getPath())) {
            return this.load(name, callback);
        } else {
            return this.create(name, cells, callback);
        }
    }

    /**
     * Возвращает путь до хранилища
     */
    public getPath(): string {
        return this.__path;
    }

    /**
     * Возвращает список таблиц
     */
    public getList(): string[] {
        const stats = fs.readdirSync(this.getPath());
        return stats ? stats.filter(value => value.endsWith(efiDataTable.DB_FILES_EXTENSION))
            .map(value => value.replace("." + efiDataTable.DB_FILES_EXTENSION, "")) : [];
    }

}
