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
 + Файл: ef2DSprite.ts                                                        +
 + Файл изменен: 28.12.2018 17:16:14                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {safeJsonParse} from "@core/Guard";
import Observable from "@core/observable/Observable";
import XLogger from "@core/utils/XLogger";
import {URLRequest} from "@core/web/request/URLRequest";

/**
 * 2D Спрайт
 */
export default class ef2DSprite extends Observable {

    /**
     * Путь до спрайтов
     */
    public static spritesPath = "sprites";

    /**
     * Имя спрайта
     */
    public readonly name: string;

    /**
     * Данные спрайта из JSON
     * @ignore
     */
    protected __raw: any | null = null;

    /**
     * Изображение
     * @ignore
     */
    protected __image: HTMLImageElement | null = null;

    /**
     * Конструктор
     * @param {{ name: string }} props
     */
    public constructor(props: { name: string }) {
        super();
        this.name = props.name;
        this.reload();
    }

    /**
     * Вызывает перезагрузку спрайта
     */
    public reload(): void {
        XLogger.default.log(`Загрузка спрайта: [${this.name}]`);
        this.__loadImage(() => {
            XLogger.default.log(`Спрайт [${this.name}] загружен: ${XLogger.getOkNoString(this.loaded())}`);
            this.notificate("loaded", [this.loaded()]);
        });
    }

    /**
     * Возвращает true, если спрайт загружен
     */
    public loaded(): boolean {
        return this.__image !== null;
    }

    /**
     * Возвращает изображение
     */
    public getImage(): HTMLImageElement | null {
        return this.__image;
    }

    /**
     * Добавляет наблюдатель: загрузка
     *
     * Имя обсервера: loaded
     *
     * @param o - наблюдатель
     */
    public addLoadedObserver(o: () => void): ef2DSprite {
        this.addObserver("loaded", o);
        return this;
    }

    /**
     * Загружает JSON данные
     * @param cb
     * @private
     */
    protected __loadJSON(cb: () => void): void {
        URLRequest.sendGET(`${ef2DSprite.spritesPath}/${this.name}.json`, (response) => {
            this.__raw = safeJsonParse(response);
            cb();
        });
    }

    /**
     * Загружает изображение
     * @param cb
     * @private
     */
    protected __loadImage(cb: () => void): void {
        this.__image = new Image();
        this.__image.src = `${ef2DSprite.spritesPath}/${this.name}.png`;
        this.__image.onload = () => {
            cb();
        };
    }

}
