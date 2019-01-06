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
 + Файл: elyColorUtils.ts                                                     +
 + Файл изменен: 06.01.2019 05:32:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyColor from "@core/elyColor";
import elyMath from "@math/elyMath";

/**
 * @interface elyColorRGB
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/**
 * @interface elyColorHSV
 * @property {number} hue
 * @property {number} saturation
 * @property {number} value
 */

/**
 * Цвет RGB
 */
export interface elyColorRGB {
    red: number;
    green: number;
    blue: number;
}

/**
 * Цвет HSV
 */
export interface elyColorHSV {
    hue: number;
    saturation: number;
    value: number;
}

/**
 * Утилиты для работы с цветом
 */
export class elyColorUtils {

    /**
     * Код белого цвета
     */
    public static whiteNumber = 16777215;

    /**
     * Код черного цвета
     */
    public static blackNumber = 0;

    /**
     * Преобразует HSV цвет в RGB
     * @param hue
     * @param saturation
     * @param value
     */
    public static hsv2rgb(hue: number | elyColorHSV, saturation?: number, value?: number): elyColorRGB {
        if (typeof hue === "object") {
            saturation = hue.saturation;
            value = hue.value;
            hue = hue.hue;
        }
        let rgb = {red: 0, green: 0, blue: 0};

        const i = Math.floor(hue * 6) || 0;
        const f = hue * 6 - i;
        const p = value! * (1 - saturation!);
        const q = (value! * (1 - f * saturation!)) || 0;
        const t = (value! * (1 - (1 - f) * saturation!)) || 0;
        switch (i % 6) {
            case 0:
                rgb = {red: value!, green: t, blue: p};
                break;
            case 1:
                rgb = {red: q, green: value!, blue: p};
                break;
            case 2:
                rgb = {red: p, green: value!, blue: t};
                break;
            case 3:
                rgb = {red: p, green: q, blue: value!};
                break;
            case 4:
                rgb = {red: t, green: p, blue: value!};
                break;
            case 5:
                rgb = {red: value!, green: p, blue: q};
                break;
        }

        return {
            blue: Math.round(rgb.blue * 255),
            green: Math.round(rgb.green * 255),
            red: Math.round(rgb.red * 255),
        };
    }

    /**
     * Преобразует RGB цвет в HSV
     * @param red
     * @param green
     * @param blue
     */
    public static rgb2hsv(red: number | elyColorRGB, green?: number, blue?: number): elyColorHSV {
        if (typeof red === "object") {
            green = red.green;
            blue = red.blue;
            red = red.red;
        }

        const hsv: elyColorHSV = {hue: 0, saturation: 0, value: 0};

        const max = Math.max(red, green!, blue!);
        const min = Math.min(red, green!, blue!);
        const d = max - min;

        hsv.saturation = (max === 0 ? 0 : d / max);
        hsv.value = max / 255;

        switch (max) {
            case min:
                hsv.hue = 0;
                break;
            case red:
                hsv.hue = (green! - blue!) + d * (green! < blue! ? 6 : 0);
                hsv.hue /= 6 * d;
                break;
            case green:
                hsv.hue = (blue! - red) + d * 2;
                hsv.hue /= 6 * d;
                break;
            case blue:
                hsv.hue = (red - green!) + d * 4;
                hsv.hue /= 6 * d;
                break;
        }
        return hsv;
    }

    /**
     * Преобразует HSV в __hex
     * @param hue
     * @param saturation
     * @param value
     */
    public static hsv2hex(hue: number | elyColorHSV, saturation?: number, value?: number): string {
        return elyColorUtils.rgb2hex(elyColorUtils.hsv2rgb(hue, saturation, value));
    }

    /**
     * Преобразует HEX в RGB
     * @param hex
     */
    public static hex2rgb(hex: string): elyColorRGB {
        if (hex.length === 3) {
            hex = hex.replace(/./g, "$&$&");
        }
        return {
            blue: parseInt(hex[4] + hex[5], 16),
            green: parseInt(hex[2] + hex[3], 16),
            red: parseInt(hex[0] + hex[1], 16),
        };
    }

    /**
     * Преобразует __hex цвет в hsv
     * @param hex
     */
    public static hex2hsv(hex: string): elyColorHSV {
        return elyColorUtils.rgb2hsv(elyColorUtils.hex2rgb(hex));
    }

    /**
     * Преобразует RGB в __hex
     * @param red
     * @param green
     * @param blue
     */
    public static rgb2hex(red: number | elyColorRGB, green?: number, blue?: number): string {
        const rgbToHex = (rgb: any) => {
            let hex = Number(rgb).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };

        if (typeof red === "object") {
            blue = red.blue;
            green = red.green;
            red = red.red;
        }
        if (red > 255) red = 255;
        if (green! > 255) green = 255;
        if (blue! > 255) blue = 255;
        if (red < 0) red = 0;
        if (green! < 0) green = 0;

        if (blue! < 0) blue = 0;
        return rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
    }

    public static getFadeStepHex(step: number, from: elyColor, to: elyColor): elyColor {
        const f = from.getRGBBytes();
        const t = to.getRGBBytes();
        return new elyColor({
            hex: elyColorUtils.rgb2hex(
                Math.round(elyMath.map(step, 0, 255, f.red, t.red)),
                Math.round(elyMath.map(step, 0, 255, f.green, t.green)),
                Math.round(elyMath.map(step, 0, 255, f.blue, t.blue)),
            ),
        });
    }
}
