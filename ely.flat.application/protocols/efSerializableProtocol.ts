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
 + Файл: efSerializableProtocol.ts                                            +
 + Файл изменен: 07.01.2019 23:56:45                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import XLogger from "@core/utils/XLogger";
import {efProtocol} from "@protocols/efProtocol";

/**
 * Интерфейс сериализуемого типа
 */
export interface ISerializable<T> {

    /**
     * Десериализует объект
     * @param raw
     */
    deserialize(raw: string): T | null;

    /**
     * Сериализует объект
     */
    serialize(): string;
}

/**
 * Данные десериализации
 * @class DeserializeData
 */
export class DeserializeData {

    /**
     * Идентификаторы
     */
    protected __ids: { [id: string]: any };

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { ids: { [id: string]: any } }) {
        this.__ids = props.ids;
    }

    /**
     * Возвращает массив идетификаторов,
     * найденных при десериализации
     * @return {string[]}
     */
    public getIds(): string[] {
        return Object.keys(this.__ids);
    }

    /**
     * Возвращает объект по идентификатору
     * @param {string} id
     * @template T
     * @return {T}
     */
    public getById<T>(id: string): T | null {
        if (this.__ids.hasOwnProperty(id)) {
            return this.__ids[id];
        }
        return null;
    }

}

/**
 * Десериализует объект
 * @template T
 * @param {*} rawData
 * @return {T | null}
 */
export function deserializeWithData<T>(rawData: any): { object: T, data: DeserializeData } | null {
    const ids: any = {};
    const body = ((raw: { [name: string]: any; _item?: any; _id?: any; }) => {
        if (raw && typeof raw._item === "string") {
            const theObject = window.elyflatobjects[raw._item];
            if (theObject) {
                if (theObject.willBeDeserialized) theObject.willBeDeserialized(raw);
                // const name = theObject.prototype.constructor.name;
                const theId = raw._id;
                Object.keys(raw).forEach(key => {
                    if (key === "_item") return;
                    const val = raw[key];
                    if (val instanceof Array) {
                        val.forEach((a, i) => {
                            const res = body(a);
                            raw[key][i] = res ? res : a;
                        });
                    } else {
                        if (val._item) raw[key] = body(val);
                    }
                });
                const obj = new theObject.prototype.constructor(raw);
                if (theId) ids[theId] = obj;
                return obj;
            } else {
                XLogger.default.error(`[Serialization]: Не найден класс ${raw._item}!`);
            }
        }
        XLogger.default.error(`[Serialization]: Невозможно десериализовать объект! ${JSON.stringify(raw)}`);
    });
    const obj = body(rawData);
    if (obj) return {object: obj, data: new DeserializeData({ids})};
    return null;

}

/**
 * Десериализует объект
 * @template T
 * @param {*} raw
 * @param {*} raw
 * @return {T | null}
 */
export function deserialize<T>(raw: any): T | null {
    const result = deserializeWithData<T>(raw);
    if (result) return result.object;
    return null;
}

/**
 * Протокол сериализации
 * @class efSerializableProtocol
 * @augments {efProtocol}
 * @template <T>
 */
export default abstract class efSerializableProtocol<T> extends efProtocol {

    /**
     * Сериализует объект
     * @return {*}
     */
    public abstract serialize(): any;
}
