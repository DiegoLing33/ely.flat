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
 + Файл: Color.ts                                                       +
 + Файл изменен: 31.01.2019 02:40:23                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {ColorHSV, ColorRGB, ColorUtils} from "./ColorUtils";
import elyMath from "./elyMath";

/**
 * Цвет
 * @class Color
 */
export default class Color {

    /**
     * Возвращает черный цвет
     * @return {Color}
     */
    public static black(): Color {
        return new Color({hex: "#000000"});
    }

    /**
     * Возвращает белый цвет
     * @return {Color}
     */
    public static white(): Color {
        return new Color({hex: "#ffffff"});
    }

    /**
     * Возвращает красный цвет
     * @return {Color}
     */
    public static red(): Color {
        return new Color({hex: "#ff0000"});
    }

    /**
     * Возвращает зеленый цвет
     * @return {Color}
     */
    public static green(): Color {
        return new Color({hex: "#00ff00"});
    }

    /**
     * Возвращает синий цвет
     * @return {Color}
     */
    public static blue(): Color {
        return new Color({hex: "#0000ff"});
    }

    /**
     * Десериализует объект
     * @param {string} raw - сериализованный объект
     * @return {Color}
     */
    public static deserialize(raw: string): Color | null {
        return new Color({hex: raw});
    }

    /**
     * 16 код цвета
     * @protected
     * @type {string}
     */
    protected __hex: string = "000000";

    /**
     * Конструктор
     * @param {{ __hex?: string, rgb?: ColorRGB, hsv?: ColorHSV }} props - параметры
     */
    public constructor(props: { hex?: string, rgb?: ColorRGB, hsv?: ColorHSV } = {}) {
        if (props.hex)
            this.__hex = String(props.hex).startsWith("#") ? props.hex.substr(1) : props.hex;
        else if (props.rgb)
            this.__hex = ColorUtils.rgb2hex(props.rgb);
        else if (props.hsv)
            this.__hex = ColorUtils.hsv2hex(props.hsv);
        else
            this.__hex = Color.black().getHexString().substr(1);
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
        return this.getByte() < (ColorUtils.whiteNumber / 1.8);
    }

    /**
     * Возвращает байты цветов
     * @return {ColorRGB}
     */
    public getRGBBytes(): ColorRGB {
        return {
            blue: parseInt(this.__hex.substr(4, 2), 16),
            green: parseInt(this.__hex.substr(2, 2), 16),
            red: parseInt(this.__hex.substr(0, 2), 16),
        };
    }

    /**
     * Устанавливает RGB цвета
     *
     * @param {{ColorRGB}} props
     */
    public setRGBBytes(props: { rgb: ColorRGB }) {

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
     * @return {Color}
     */
    public getLighterColor(percentage: number): Color {
        const rgb = this.getRGBBytes();
        percentage = 1 - percentage;
        const val = Math.round(255 - (255 * percentage));

        rgb.red = Math.round(elyMath.map(val, 0, 255, rgb.red, 255));
        rgb.green = Math.round(elyMath.map(val, 0, 255, rgb.green, 255));
        rgb.blue = Math.round(elyMath.map(val, 0, 255, rgb.blue, 255));
        return new Color({hex: "#" + ColorUtils.rgb2hex(rgb)});
    }

    /**
     * Возвращает цвет тмнее
     * @param {number} percentage
     * @return {Color}
     */
    public getDarkerColor(percentage: number): Color {
        const rgb = this.getRGBBytes();
        percentage = 1 - percentage;
        const val = Math.round(255 - (255 * percentage));

        rgb.red = Math.round(elyMath.map(val, 0, 255, rgb.red, 0));
        rgb.green = Math.round(elyMath.map(val, 0, 255, rgb.green, 0));
        rgb.blue = Math.round(elyMath.map(val, 0, 255, rgb.blue, 0));
        return new Color({hex: "#" + ColorUtils.rgb2hex(rgb)});
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

}
