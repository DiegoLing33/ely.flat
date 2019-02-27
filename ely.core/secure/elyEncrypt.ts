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
 + Файл: elyEncrypt.ts                                                        +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

export default class elyEncrypt {

    /**
     * Ключ шифрования общего назначения.
     *
     * Ключ используется как стандартное значение для elyEncrypt.encodeString
     */
    public static sharedKey: string = "el292ySHa28r5edK5ey2XX2ToEn6cr22e4qyp5t";

    /**
     * Кодирует строку ключем или общим ключем elyEncrypt.sharedKey
     *
     * @param str
     * @param decodeKey
     */
    public static encodeString(str: string, decodeKey?: string): string {
        decodeKey = decodeKey || elyEncrypt.sharedKey;
        let enc = "";
        for (let i = 0; i < str.length; i++) {
            const a = str.charCodeAt(i);
            const b = a ^ (decodeKey.charAt(i % decodeKey.length) as any);
            enc = enc + String.fromCharCode(b);
        }
        return elyEncrypt.b64EncodeUnicode(enc);
    }

    /**
     * Декодирует строку ключем или общим ключем elyEncrypt.sharedKey
     *
     * @param str
     * @param decodeKey
     */
    public static decodeString(str: string, decodeKey?: string): string | null {
        decodeKey = decodeKey || elyEncrypt.sharedKey;
        const decode = elyEncrypt.b64DecodeUnicode(str);
        if (decode === null) return null;
        str = decode;
        // str = elyEncrypt.b64DecodeUnicode(str);
        let dec = "";
        for (let i = 0; i < str.length; i++) {
            const a = str.charCodeAt(i);
            const b = a ^ (decodeKey.charAt(i % decodeKey.length) as any);
            dec = dec + String.fromCharCode(b);
        }
        return dec;
    }

    /**
     * Кодирует строку в base64
     * @param str
     */
    public static b64EncodeUnicode(str: string): string {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                // @ts-ignore
                return String.fromCharCode("0x" + p1);
            }));
    }

    /**
     * Декодирует base64 строку или возвращает null при неудаче
     * @param str
     */
    public static b64DecodeUnicode(str: string): string | null {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        try {
            return decodeURIComponent(atob(str).split("").map(c =>
                "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
        } catch (e) {
            return null;
        }
    }
}
