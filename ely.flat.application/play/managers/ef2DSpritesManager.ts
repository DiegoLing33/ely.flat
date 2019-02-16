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
 + Файл: ef2DSpritesManager                                                   +
 + Файл изменен: 28.12.2018 22:27:17                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyUtils from "@core/elyUtils";
import elyObservable from "@core/observable/elyObservable";
import ef2DSprite from "@play/ef2DSprite";

/**
 * Менеджер спрайтов
 */
export default class ef2DSpritesManager extends elyObservable {

    /**
     * Стандартный менеджер спрайтов
     */
    public static default = new ef2DSpritesManager();

    /**
     * Спрайты
     */
    public sprites: { [name: string]: ef2DSprite } = {};

    /**
     * Загружено спрайтов
     */
    protected __loaded: number = 0;

    /**
     * Добавляет спрайт
     * @param name
     */
    public add(name: string): void {
        if (!(name in this.sprites)) {
            this.sprites[name] = new ef2DSprite({name});
            this.sprites[name].addLoadedObserver(() => {
                this.__loaded++;
            });
        }
    }

    /**
     * Добавляет список спрайтов
     * @param names
     */
    public addList(names: string[]): void {
        for (const name of names) {
            this.add(name);
        }
    }

    /**
     * Возвращает true, если все спрайты загружены
     */
    public isEverythingLoaded(): boolean {
        return this.__loaded === elyUtils.count(this.sprites);
    }

}
