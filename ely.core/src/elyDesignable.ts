/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyDesignable.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyControl from "@controls/action/elyControl";

export const elyDesignableAutoFieldsData: { [className: string]: elyDesignableAutoFields } = {};

/**
 * Состояния авто полян
 */

export enum elyDesignableFieldState {
    VIEW = 4,
    GETSET = 3,
    GET = 1,
    SET = 2,
    DENY = 0,
}

/**
 * Дескриптор класса elyDesignableAutoFields
 */
export interface elyDesignableAutoFields {
    fields: { [name: string]: elyDesignableAutoFieldItem };
}

/**
 * Элемент автоматического поля
 */
export interface elyDesignableAutoFieldItem {
    name: string;
    state: elyDesignableFieldState;
    type: string;
    values: any;
}

function createAutoFieldBase(target: any) {
    if (!elyDesignableAutoFieldsData.hasOwnProperty(target.name)) elyDesignableAutoFieldsData[target.name] = {
        fields: {},
    };
}

/**
 * Ядро Designable функционала
 */
export class elyDesignableCore {

    /**
     * Замораживает элемент
     * @param view
     */
    public static freeze(view: elyView | any): any {
        const obj: any = {};
        const name = view.constructor.name;
        if (name && elyDesignableAutoFieldsData.hasOwnProperty(name)) {
            const fields = elyDesignableAutoFieldsData[name].fields;
            obj.item = name;
            for (const fieldName in fields) {
                if (!fields.hasOwnProperty(fieldName)) continue;
                const field = fields[fieldName] as elyDesignableAutoFieldItem;
                if (field.state === elyDesignableFieldState.GET || field.state === elyDesignableFieldState.GETSET) {
                    obj[field.name] = view[field.name]();
                    if (field.values) {
                        if (obj[field.name] && obj[field.name].value) {
                            obj[field.name] = obj[field.name].value;
                        }
                    }
                }
                if (field.state === elyDesignableFieldState.VIEW) {
                    const afv = (view as any)[field.name] as elyControl;
                    if (afv && afv instanceof elyControl) {
                        obj[field.name] = [];
                        for (const o of afv.getSubViews())
                            obj[field.name].push(elyDesignableCore.freeze(o));
                    }
                }
            }
        }
        return obj;
    }

}

/**
 * Декоратор автоматического поля для UI Builder
 * @param name
 * @param state
 * @param type
 * @param values
 */
export function designable(name: string, state: elyDesignableFieldState, type = "string", values: any = null):
    ClassDecorator {
    return (target: any) => {
        if (state === elyDesignableFieldState.DENY) {
            if (elyDesignableAutoFieldsData[target.name]) {
                delete elyDesignableAutoFieldsData[target.name].fields[name];
            }
        }
        createAutoFieldBase(target);
        const superName = Object.getPrototypeOf(target).name;
        if (superName && elyDesignableAutoFieldsData[superName])
            elyUtils.forEach(elyDesignableAutoFieldsData[superName].fields,
                (index, value) => elyDesignableAutoFieldsData[target.name].fields[index] = value);
        elyDesignableAutoFieldsData[target.name].fields[name] = {
            name,
            state,
            type,
            values,
        } as elyDesignableAutoFieldItem;
    };
}
