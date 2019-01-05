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

import elyObservable from "@core/observable/elyObservable";
import elyXLogger from "@core/utils/elyXLogger";
import elyGetRequest from "@core/web/request/elyGetRequest";

/**
 * 2D Спрайт
 */
export default class ef2DSprite extends elyObservable {

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
        elyXLogger.default.log(`Загрузка спрайта: [${this.name}]`);
        this.__loadImage(() => {
            elyXLogger.default.log(`Спрайт [${this.name}] загружен: ${elyXLogger.getOkNoString(this.loaded())}`);
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
        new elyGetRequest({url: `${ef2DSprite.spritesPath}/${this.name}.json`}).send({}, (res) => {
            this.__raw = res;
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
