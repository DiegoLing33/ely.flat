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
 + Файл: DeviceDetector.ts                                              +
 + Файл изменен: 31.01.2019 00:49:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efSize from "@cnv/objs/efSize";
import elyObservable from "./observable/Observable";

/**
 * Детектор устройств и системы
 */
export default class DeviceDetector extends elyObservable {

    /**
     * Стандартный детектор
     */
    public static default: DeviceDetector = new DeviceDetector();

    /**
     * Имена операционных систем
     * @protected
     * @ignore
     */
    protected static __osNames = [
        {name: "Windows Phone", value: "Windows Phone", version: "OS"},
        {name: "Windows", value: "Win", version: "NT"},
        {name: "iPhone", value: "iPhone", version: "OS"},
        {name: "iPad", value: "iPad", version: "OS"},
        {name: "iPod", value: "iPod", version: "OS"},
        {name: "Kindle", value: "Silk", version: "Silk"},
        {name: "Android", value: "Android", version: "Android"},
        {name: "PlayBook", value: "PlayBook", version: "OS"},
        {name: "BlackBerry", value: "BlackBerry", version: "/"},
        {name: "MacOS", value: "Mac", version: "OS X"},
        {name: "Linux", value: "Linux", version: "rv"},
        {name: "Palm", value: "Palm", version: "PalmOS"},
    ];

    /**
     * Браузеры
     * @protected
     * @ignore
     */
    protected static __browsers = [
        {name: "Chrome", value: "Chrome", version: "Chrome"},
        {name: "Firefox", value: "Firefox", version: "Firefox"},
        {name: "Safari", value: "Safari", version: "Version"},
        {name: "Internet Explorer", value: "MSIE", version: "MSIE"},
        {name: "Opera", value: "Opera", version: "Opera"},
        {name: "BlackBerry", value: "CLDC", version: "CLDC"},
        {name: "Mozilla", value: "Mozilla", version: "Mozilla"},
    ];

    /**
     * Заголовки
     * @protected
     * @ignore
     */
    protected static __headers = [
        navigator.platform,
        navigator.userAgent,
        navigator.appVersion,
        navigator.vendor,
    ];

    /**
     * Данные
     * @ignore
     * @protected
     */
    protected __data: { [key: string]: any } = {
        browser: null,
        os: null,
    };

    /**
     * Конструктор
     */
    public constructor() {
        super();
    }

    /**
     * Добавляет наблюдатель: распознавание закончено
     *
     * Имя обсервера: detected
     *
     * @param o - наблюдатель
     */
    public addDetectedObserver(o: () => void): DeviceDetector {
        this.addObserver("detected", o);
        return this;
    }

    /**
     * Выполняет детектинг
     */
    public detect(): void {
        for (const os of DeviceDetector.__osNames)
            if (navigator.userAgent.indexOf(os.value) > -1) {
                this.__data.os = os.name;
                break;
            }
        for (const browser of DeviceDetector.__browsers)
            if (navigator.userAgent.indexOf(browser.value) > -1) {
                this.__data.browser = browser.name;
                break;
            }
        this.notificate("detected");
    }

    /**
     * Возвращает имя системы
     * @return {string}
     */
    public getOSName(): string {
        return this.__data.os || "Undetected";
    }

    /**
     * Возвращает имя браузера
     * @return {string}
     */
    public getBrowserName(): string {
        return this.__data.browser || "Undefined";
    }

    /**
     * Возвращает true, если приложение запущено отдельным приложением**
     * @return {boolean}
     */
    public isStandalone(): boolean {
        // @ts-ignore
        return window.navigator.standalone || false;
    }

    /**
     * Возвращает true, если система iOS
     * @return {boolean}
     */
    public isIOS(): boolean {
        return /iPad|iPhone|iPod/.test(this.__data.os);
    }

    /**
     * Возвращает соотнощение сторон
     * @return {number}
     */
    public getRatio(): number {
        return window.devicePixelRatio || 1;
    }

    /**
     * Возвращает реальный размер жкрана
     * @return {efSize}
     */
    public getScreenSize(): efSize {
        return new efSize({
            height: window.screen.height * this.getRatio(),
            width: window.screen.width * this.getRatio(),
        });
    }

    /**
     * Возвращает true, если устройство - iPhone X
     * @return {boolean}
     */
    public isIPhoneX(): boolean {
        const size = this.getScreenSize();
        return this.isIOS() && size.width() === 1125 && size.height() === 2436;
    }
}
