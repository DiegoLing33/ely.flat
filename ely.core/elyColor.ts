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
 + Файл: elyColor.ts                                                          +
 + Файл изменен: 31.01.2019 02:40:23                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {elyColorHSV, elyColorRGB, elyColorUtils} from "@core/elyColorUtils";
import elyMath from "@core/elyMath";
import {serializable} from "@core/elySerializable";
import efSerializableProtocol from "@protocols/efSerializableProtocol";

@serializable()
/**
 * Цвет
 * @class elyColor
 */
export default class elyColor implements efSerializableProtocol<elyColor> {

    /**
     * Возвращает черный цвет
     * @return {elyColor}
     */
    public static black(): elyColor {
        return new elyColor({hex: "#000000"});
    }

    /**
     * Возвращает белый цвет
     * @return {elyColor}
     */
    public static white(): elyColor {
        return new elyColor({hex: "#ffffff"});
    }

    /**
     * Возвращает красный цвет
     * @return {elyColor}
     */
    public static red(): elyColor {
        return new elyColor({hex: "#ff0000"});
    }

    /**
     * Возвращает зеленый цвет
     * @return {elyColor}
     */
    public static green(): elyColor {
        return new elyColor({hex: "#00ff00"});
    }

    /**
     * Возвращает синий цвет
     * @return {elyColor}
     */
    public static blue(): elyColor {
        return new elyColor({hex: "#0000ff"});
    }

    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {elyColor}
     */
    public static deserialize(raw: string): elyColor | null {
        return new elyColor({hex: raw});
    }

    /**
     * 16 код цвета
     * @protected
     * @type {string}
     */
    protected __hex: string = "000000";

    /**
     * Конструктор
     * @param {{ __hex?: string, rgb?: elyColorRGB, hsv?: elyColorHSV }} props - параметры
     */
    public constructor(props: { hex?: string, rgb?: elyColorRGB, hsv?: elyColorHSV } = {}) {
        if (props.hex)
            this.__hex = props.hex.startsWith("#") ? props.hex.substr(1) : props.hex;
        else if (props.rgb)
            this.__hex = elyColorUtils.rgb2hex(props.rgb);
        else if (props.hsv)
            this.__hex = elyColorUtils.hsv2hex(props.hsv);
        else
            this.__hex = elyColor.black().getHexString().substr(1);
    }

    /**
     * Возвращает число цвета
     * @return {number}
     */
    public getByte(): number {
        return parseInt(this.__hex, 16);
    }

    /**
     * Возвращает true, если цвет темный
     * @return {boolean}
     */
    public isDarker(): boolean {
        return this.getByte() < (elyColorUtils.whiteNumber / 1.8);
    }

    /**
     * Возвращает байты цветов
     * @return {elyColorRGB}
     */
    public getRGBBytes(): elyColorRGB {
        return {
            blue: parseInt(this.__hex.substr(4, 2), 16),
            green: parseInt(this.__hex.substr(2, 2), 16),
            red: parseInt(this.__hex.substr(0, 2), 16),
        };
    }

    /**
     * Устанавливает RGB цвета
     *
     * @param {{elyColorRGB}} props
     */
    public setRGBBytes(props: { rgb: elyColorRGB }) {

        if (props.rgb.red > 255) props.rgb.red = 255;
        if (props.rgb.green > 255) props.rgb.green = 255;
        if (props.rgb.blue > 255) props.rgb.blue = 255;
        if (props.rgb.red < 0) props.rgb.red = 0;
        if (props.rgb.green < 0) props.rgb.green = 0;
        if (props.rgb.blue < 0) props.rgb.blue = 0;

        this.__hex = props.rgb.red.toString(16) +
            props.rgb.green.toString(16) +
            props.rgb.blue.toString(16);
    }

    /**
     * Возвращает цвет светлее
     * @param {number} percentage
     * @return {elyColor}
     */
    public getLighterColor(percentage: number): elyColor {
        const rgb = this.getRGBBytes();
        percentage = 1 - percentage;
        const val = Math.round(255 - (255 * percentage));

        rgb.red = Math.round(elyMath.map(val, 0, 255, rgb.red, 255));
        rgb.green = Math.round(elyMath.map(val, 0, 255, rgb.green, 255));
        rgb.blue = Math.round(elyMath.map(val, 0, 255, rgb.blue, 255));
        return new elyColor({hex: "#" + elyColorUtils.rgb2hex(rgb)});
    }

    /**
     * Возвращает цвет тмнее
     * @param {number} percentage
     * @return {elyColor}
     */
    public getDarkerColor(percentage: number): elyColor {
        const rgb = this.getRGBBytes();
        percentage = 1 - percentage;
        const val = Math.round(255 - (255 * percentage));

        rgb.red = Math.round(elyMath.map(val, 0, 255, rgb.red, 0));
        rgb.green = Math.round(elyMath.map(val, 0, 255, rgb.green, 0));
        rgb.blue = Math.round(elyMath.map(val, 0, 255, rgb.blue, 0));
        return new elyColor({hex: "#" + elyColorUtils.rgb2hex(rgb)});
    }

    /**
     * Возвращает HEX с символом # в начале
     * @return {string}
     */
    public getHexString(): string {
        return `#${this.__hex}`;
    }

    /**
     * Возвращает HEX с символом # в начале
     * @return {string}
     */
    public toString(): string {
        return this.getHexString();
    }

    /**
     * Сериализует объект
     * @return {string}
     */
    public serialize(): string {
        return this.getHexString();
    }

}
