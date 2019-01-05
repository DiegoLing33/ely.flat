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
 + Файл: efGameRenderer.ts                                                    +
 + Файл изменен: 28.12.2018 02:04:05                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efContextImage from "@cnv/context/efContextImage";
import efContextRect from "@cnv/context/efContextRect";
import efContextText from "@cnv/context/efContextText";
import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";
import efSize from "@cnv/objs/efSize";
import efMouse from "@play/controllers/efMouse";
import efGame from "@play/efGame";
import efGameCanvas from "@play/efGameCanvas";
import efGameSettings from "@play/efGameSettings";
import efCharacter from "@play/entities/efCharacter";
import efEntity from "@play/entities/efEntity";

/**
 * Рендер
 */
export default class efGameRenderer {

    /**
     * Игра
     * @type {efGame}
     */
    public readonly game: efGame;

    /**
     * Хост
     * @type {efGameCanvas}
     */
    public readonly canvas: efGameCanvas;

    /**
     * Отрисовка отладочной информации
     */
    public renderDebug: boolean = true;

    /**
     * Последнее время обновления
     */
    public lastTime = new Date().getTime();

    /**
     * Кол-во фреймов
     */
    public frameCount = 0;

    /**
     * Максимальный FPS
     */
    public maxFPS = 50;

    /**
     * Текущий FPS
     */
    public realFPS = 0;

    /**
     * Текущий FPS
     */
    public FPS = 50;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { game: efGame }) {
        this.game = props.game;
        this.canvas = props.game.canvas;
    }

    /**
     * Отрисовывает задний план
     */
    public renderBackground(): void {
        this.canvas.backgroundLayer.clear();
        this.canvas.backgroundLayer.draw(new efContextRect({
            fillColor: "black",
            size: this.canvas.size,
            vector: new ef2DVectorValues({x: 0, y: 0}),
        }));
        this.game.world.worldData!.map.forEach((row, rowIndex) => {
            row.forEach((col: any, colIndex) => {
                if (col === 0) {
                    this.canvas.backgroundLayer.draw(new efContextRect({
                        fillColor: "#000",
                        size: efGameSettings.getTileSize(),
                        vector: new ef2DVectorValues({
                            x: colIndex * efGameSettings.tileSize,
                            y: rowIndex * efGameSettings.tileSize,
                        }),
                    }));
                } else if (typeof col === "object" && typeof col.n === "string") {
                    const sprite = this.game.spritesManager.sprites[col.n];
                    if (!sprite.loaded()) return;
                    this.canvas.backgroundLayer.draw(new efContextImage({
                        angle: col.a || undefined,
                        image: sprite.getImage()!,
                        size: efGameSettings.getTileSize(),
                        vector: new ef2DVectorValues({
                            x: colIndex, y: rowIndex,
                        }).getMultiplied({xy: efGameSettings.tileSize}),
                    }));
                }
            });
        });
    }

    /**
     * Отрисовывает задний план
     */
    public renderForeground(): void {
        this.canvas.foregroundLayer.clear();
        if (this.renderDebug) {
            this.calculateFPS();
            const data: string[] = [`FPS: ${this.realFPS} / ${this.maxFPS}`];
            if (this.game.target) {
                data.push(`> ${this.game.target}:`);
                data.push(`Grid X: ${this.game.target.getGridPosition().x}`);
                data.push(`Grid Y: ${this.game.target.getGridPosition().y}`);
                data.push(`Abs  X: ${this.game.target.getAbsolutePosition().x}`);
                data.push(`Abs  Y: ${this.game.target.getAbsolutePosition().y}`);
                data.push(`Direct: ${this.game.target.directionName}`);
            }
            this.canvas.foregroundLayer.draw(new efContextText({
                fillColor: "#fff",
                text: data.join("\n"),
                vector: new ef2DVectorValues({x: 10, y: 10}),
            }));
        }

        let mc = "#ccc";
        if (this.game.world.isEntityAt(efMouse.default.getGridPosition())) mc = "#fdc784";
        if (!this.game.world.isPathing(efMouse.default.getGridPosition())) mc = "#fd3439";
        this.canvas.foregroundLayer.draw(new efContextRect({
            size: new efSize({d: efGameSettings.tileSize}),
            strokeColor: mc,
            vector: efMouse.default.getGridPosition().getMultiplied({xy: efGameSettings.tileSize}),
        }));
    }

    /**
     * Отрисовывает сущность
     * @param entity
     */
    public renderEntity(entity: efEntity): void {
        const sprite = entity.getSprite();
        if (sprite && sprite.getImage() && entity.visible()) {
            this.canvas.entityLayer.draw(new efContextImage({
                angle: entity.angle,
                image: sprite.getImage()!,
                size: efGameSettings.getTileSize(),
                vector: entity.getAbsolutePosition(),
            }));
            this.canvas.entityLayer.draw(new efContextRect({
                angle: entity.angle,
                size: efGameSettings.getTileSize(),
                strokeColor: (entity instanceof efCharacter && entity.isMotionPaused) ? "red" : "green",
                vector: entity.getAbsolutePosition(),
            }));
        }
    }

    /**
     * Отрисовывает сущности
     */
    public renderEntities(): void {
        this.canvas.entityLayer.clear();
        this.game.world.forEachVisibleByDepth(entity => {
            this.renderEntity(entity);
        });
    }

    /**
     * Отрисовывает кадр
     */
    public renderFrame(): void {
        this.renderEntities();
    }

    /**
     * Расчитывает FPS
     */
    protected calculateFPS() {
        const now = new Date().getTime();
        const dt = now - this.lastTime;

        if (dt >= 1000) {
            this.realFPS = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }
        this.frameCount++;
    }
}
