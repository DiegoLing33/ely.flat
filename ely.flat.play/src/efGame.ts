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
 + Файл: efGame.ts                                                            +
 + Файл изменен: 28.12.2018 01:56:54                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efCanvas from "@cnv/efCanvas";
import ef2DVector from "@cnv/objs/ef2DVector";
import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";
import efSize from "@cnv/objs/efSize";
import elyControl from "@controls/action/elyControl";
import elyView from "@core/controls/elyView";
import elyObservable from "@core/observable/elyObservable";
import elyXLogger from "@core/utils/elyXLogger";
import efKeyboard from "@play/controllers/efKeyboard";
import efMouse from "@play/controllers/efMouse";
import efGameCanvas from "@play/efGameCanvas";
import efGameRenderer from "@play/efGameRenderer";
import efGameUpdater from "@play/efGameUpdater";
import efGameWorld from "@play/efGameWorld";
import efGameSettings from "@play/efGameSettings";
import efEntity from "@play/entities/efEntity";
import ef2DSpritesManager from "@play/managers/ef2DSpritesManager";
import ef2DCamera from "./ef2DCamera";

export default class efGame extends elyObservable {

    /**
     * Игровой фрейм
     * @type {elyView}
     */
    public frameView: elyView = new elyControl({class: "ef-game-frame"});

    /**
     * Холст
     * @type {efCanvas}
     */
    public readonly canvas: efGameCanvas;

    /**
     * Рендер
     * @type {efGameRenderer}
     */
    public readonly renderer: efGameRenderer;

    /**
     * Обновление игры
     * @type {efGameUpdater}
     */
    public readonly updater: efGameUpdater;

    /**
     * Игровой мир
     */
    public readonly world: efGameWorld;

    /**
     * Менеджер спрайтов
     */
    public readonly spritesManager: ef2DSpritesManager;

    /**
     * Камера
     */
    public readonly camera: ef2DCamera;

    /**
     * Таргет
     */
    public target?: efEntity;

    /**
     * Текущее время
     */
    public currentTime: number = 0;

    /**
     * Конструктор
     * @param {{size: efSize}} props
     */
    public constructor(props: { size: efSize }) {
        super();
        elyXLogger.default.log("Инициилизация игрового движка...");
        this.spritesManager = new ef2DSpritesManager();

        //
        //  Renderer gen
        //
        elyXLogger.default.log("Инициилизация игрового рендера...");
        elyXLogger.default.log(`Размер: ${props.size}`);
        this.canvas = new efGameCanvas({size: props.size});
        this.camera = new ef2DCamera({
            size: new efSize({
                height: Math.floor(props.size.height() / efGameSettings.tileSize),
                width: Math.floor(props.size.width() / efGameSettings.tileSize),
            }),
        });
        this.renderer = new efGameRenderer({game: this});
        this.frameView.getDocument().append(this.canvas.getDocument());

        this.world = new efGameWorld({name: "default", game: this});
        this.updater = new efGameUpdater({game: this});

        efKeyboard.default.startListening();
        efMouse.default.startListening();
    }

    /**
     * Запускает игровой цикл
     */
    public start(): void {
        const wait = setInterval(() => {
            if (this.world.loaded()) {
                if (this.spritesManager.isEverythingLoaded()) {
                    clearInterval(wait);

                    // Создание сетки
                    this.notificate("loaded", [this]);
                    this.renderer.renderBackground();
                    this.__tick();
                }
            }
        }, 100);
    }

    /**
     * Возвращает случайную свободную от сталкновений точку
     */
    public getRandomFreePoint(visible: boolean = true): ef2DVectorValues {
        let vec = ef2DVector.zero().getValues();
        do {
            const x = Math.floor(Math.random() * this.world.size.width());
            const y = Math.floor(Math.random() * this.world.size.height());
            vec = new ef2DVectorValues({x, y});
        } while (this.world.isColliding(vec) && (visible && this.camera.isVisiblePosition(vec)));
        return vec;
    }

    /**
     * Добавляет наблюдатель: отрисовка
     *
     * Имя обсервера: render
     *
     * @param o - наблюдатель
     */
    public addRenderObserver(o: (game: efGame) => void): efGame {
        this.addObserver("render", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: завершения загрузки
     *
     * Имя обсервера: loaded
     *
     * @param o - наблюдатель
     */
    public addLoadedObserver(o: (game: efGame) => void): efGame {
        this.addObserver("loaded", o);
        return this;
    }

    protected __tick(): void {
        this.currentTime = new Date().getTime();
        this.updater.update();
        this.renderer.renderFrame();
        this.renderer.renderForeground();
        this.notificate("render", []);
        requestAnimationFrame(() => this.__tick());
    }
}
