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
 + Файл: efGameWorld.ts                                                       +
 + Файл изменен: 28.12.2018 05:04:39                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efSize from "@cnv/objs/efSize";
import elyUtils from "@core/elyUtils";
import elyObservable from "@core/observable/elyObservable";
import elyXLogger from "@core/utils/elyXLogger";
import elyGetRequest from "@core/web/request/elyGetRequest";
import ef2DVector from "@math/ef2DVector";
import ef2DVectorValues from "@math/ef2DVectorValues";
import ef2DGridButch from "@play/ef2DGridButch";
import efGame from "@play/efGame";
import efPathfinder from "@play/efPathfinder";
import efCharacter from "@play/entities/efCharacter";
import efEntity from "@play/entities/efEntity";

interface efGameWorld_worldData {
    name: string;
    size: { width: number, height: number };
    map: number[][];
    collision: number[][];
    sprites: string[];
}

/**
 * Игровой мир
 */
export default class efGameWorld extends elyObservable {

    /**
     * Размер мира в тайлах
     */
    public size: efSize = efSize.zero();

    /**
     * Данные мира
     */
    public worldData: efGameWorld_worldData | null = null;

    /**
     * Имя мира
     */
    public readonly name: string;

    /**
     * Сетка существ
     */
    public entitiesGrid?: ef2DGridButch<efEntity>;

    /**
     * Сетка путей
     */
    public pathingGrid: number[][] = [];

    /**
     * Сетка отрисовки
     */
    public renderingGrid?: ef2DGridButch<efEntity>;

    /**
     * Массив сущностей в ире
     * @type {{efEntity}}
     */
    public entities: { [id: number]: efEntity } = {};

    /**
     * Интсрумент поиска пути
     */
    public pathfinder: efPathfinder | null = null;

    /**
     * Объект игры
     */
    public readonly game: efGame;

    /**
     * Статус загрузки
     */
    protected __isLoaded: boolean = false;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { name: string, game: efGame }) {
        super();
        this.name = props.name;
        this.reload();
        this.entities = {};
        this.game = props.game;
    }

    /**
     * Возвращает объект по точке
     * @param {ef2DVector | ef2DVectorValues} point
     * @param {number[]} ignore
     */
    public getEntityAt(point: ef2DVector | ef2DVectorValues, ignore: number[] = []): efEntity | null {
        if (point instanceof ef2DVector) point = point.getValues();
        if (this.entitiesGrid && !this.isOutOfBounds(point)) {
            const entities = this.entitiesGrid.get(point);
            if (entities) {
                for (const id in entities) {
                    if (entities.hasOwnProperty(id)) {
                        if (ignore.indexOf(entities[id]!.id) === -1) return entities[id];
                    }
                }
            }
        }
        return null;
    }

    /**
     * Возвращает true, если по координатам есть сущность
     * @param {ef2DVector | ef2DVectorValues} point
     */
    public isEntityAt(point: ef2DVector | ef2DVectorValues): boolean {
        return this.getEntityAt(point) !== null;
    }

    /**
     * Добавляет сущность
     * @param entity
     */
    public addEntity(entity: efEntity): void {
        if (!this.entities[entity.id]) {
            this.entities[entity.id] = entity;
            this.registerEntityPosition(entity);
            entity.entityDidAddToGame(this);

            if (entity instanceof efCharacter) {
                entity.addBeforeStepObserver(() => {
                    this.unregisterEntityPosition(entity);
                });
                entity.addStartPathingObserver(path => {
                    // Nothing
                });
                entity.addStepObserver(() => {
                    this.registerEntityDualPosition(entity);
                });
                entity.addStopPathingObserver((grid) => {
                    this.unregisterEntityPosition(entity);
                    this.registerEntityPosition(entity);
                });
                entity.setRequestPathDelegate(point => {
                    const ignored = [entity];
                    return this.findPath(entity, point, ignored);
                });
            }

        } else {
            elyXLogger.default.error("Сущность с id [" + entity.id + "] уже добавлена!");
        }
    }

    /**
     * Удаляет сущность
     * @param entity
     */
    public removeEntity(entity: efEntity): void {
        if (entity.id in this.entities) {
            this.unregisterEntityPosition(entity);
            delete this.entities[entity.id];
            entity.entityDidRemoveFromGame(this);
        } else {
            elyXLogger.default.error("Сущность с id [" + entity.id + "] не найдена!");
        }
    }

    /**
     * Регистрирует позицию сущности
     * @param entity
     */
    public registerEntityPosition(entity: efEntity): void {
        // elyXLogger.default.log(`Установка регистрации позиции для ${entity} (${entity.getGridPosition()})`);
        this.entitiesGrid!.add(entity.getGridPosition(), entity);
        this.renderingGrid!.add(entity.getGridPosition(), entity);
        this.pathingGrid[entity.getGridPosition().y][entity.getGridPosition().x] = 0;
    }

    /**
     * Резистрирует двойную позицию сущности.
     * Данный метод необходим при регистрации движения.
     *
     * @param entity
     */
    public registerEntityDualPosition(entity: efEntity): void {
        // elyXLogger.default.log(`Удаление регистрации позиции для ${entity} (${entity.getGridPosition()})`);
        this.entitiesGrid!.add(entity.getGridPosition(), entity);
        this.renderingGrid!.add(entity.getGridPosition(), entity);

        if (entity.nextPosition && entity.nextPosition.x >= 0 && entity.nextPosition.y >= 0) {
            this.entitiesGrid!.add(entity.nextPosition, entity);
            this.pathingGrid[entity.nextPosition.y][entity.nextPosition.x] = 0;
        }
    }

    /**
     * Удаляет из сетки перемещения
     * @param {ef2DVector | ef2DVectorValues} point
     */
    public removeFromPathingGrid(point: ef2DVector | ef2DVectorValues): void {
        if (point instanceof ef2DVector) point = point.getValues();
        this.pathingGrid[point.y][point.x] = this.worldData!.collision[point.y][point.x];
    }

    /**
     * Отменяет регистрацию позиции
     * @param entity
     */
    public unregisterEntityPosition(entity: efEntity): void {
        this.entitiesGrid!.remove(entity.getGridPosition(), entity);
        this.removeFromPathingGrid(entity.getGridPosition());
        this.renderingGrid!.remove(entity.getGridPosition(), entity);

        if (entity.nextPosition && entity.nextPosition.x >= 0 && entity.nextPosition.y >= 0) {
            this.entitiesGrid!.remove(entity.nextPosition, entity);
            this.removeFromPathingGrid(entity.nextPosition);
        }
    }

    /**
     * Возвращает true, если точка за пределами мира
     * @param {ef2DVector | ef2DVectorValues} point
     */
    public isOutOfBounds(point: ef2DVector | ef2DVectorValues): boolean {
        if (point instanceof ef2DVector) point = point.getValues();
        const maxX = this.size.width();
        const maxY = this.size.height();
        const pX = point.x;
        const pY = point.y;

        return !(0 <= pX && pX <= 0 + maxX && 0 <= pY && pY <= 0 + maxY);
    }

    public reload(): void {
        elyXLogger.default.log(`Загрузка мира [${this.name}]...`);
        this.gameWorldShouldLoad(res => {
            elyXLogger.default.log(`Загрузка мира [${this.name}]. Статус: [ ${res ? "OK" : "NO"} ]`);
            this.__isLoaded = res;
            this.notificate("loaded", [this]);
        });
    }

    /**
     * Делегат загрузки мира
     * @param next
     */
    public gameWorldShouldLoad(next: (res: boolean) => void): void {
        new elyGetRequest({url: `worlds/${this.name}.json`}).send({}, response => {
            if (response.name && response.name === this.name) {
                this.worldData = response;
                console.log(this.worldData);
                this.game.spritesManager.addList(this.worldData!.sprites);
                this.size.width(this.worldData!.size.width);
                this.size.height(this.worldData!.size.height);
                elyXLogger.default.log(`Размер мира: ${this.size.toString()}`);

                this.__initPathingGrid({size: this.size, worldCollision: this.worldData!.collision});
                this.__initEntitiesGrid({size: this.size});
                this.__initRenderingGrid({size: this.size});

                this.pathfinder = new efPathfinder({world: this});
                next(true);
            } else {
                next(false);
            }
        });
    }

    /**
     * Возвращает true, если идентификатор существует
     * @param id
     */
    public isEntityIdExists(id: number): boolean {
        return id in this.entities;
    }

    /**
     * Возвращает сущность по идентификатору
     * @param id
     */
    public getEntityById(id: number): efEntity | null {
        if (this.isEntityIdExists(id)) return this.entities[id] || null;
        return null;
    }

    /**
     * Добавляет наблюдатель: окончание загрузки
     *
     * Имя обсервера: loaded
     *
     * @param o - наблюдатель
     */
    public addLoadedObserver(o: (w: efGameWorld) => void): efGameWorld {
        this.addObserver("loaded", o);
        return this;
    }

    /**
     * Возвращает true, если мир загружен
     */
    public loaded(): boolean {
        return this.__isLoaded;
    }

    /**
     * Перемещает персонажа
     * @param {efCharacter} ch
     * @param {ef2DVector | ef2DVectorValues} point
     */
    public makeCharacterGoTo(ch: efCharacter, point: ef2DVector | ef2DVectorValues): void {
        if (point instanceof ef2DVector) point = point.getValues();
        if (!this.isOutOfBounds(point)) {
            ch.go(point);
        }
    }

    /**
     * Телепортирует персонажа
     * @param {efCharacter} ch
     * @param {ef2DVector | ef2DVectorValues} point
     */
    public makeCharacterTeleportTo(ch: efCharacter, point: ef2DVector | ef2DVectorValues): void {
        if (point instanceof ef2DVector) point = point.getValues();
        if (!this.isOutOfBounds(point)) {
            this.unregisterEntityPosition(ch);
            ch.setGridPosition(point);
            this.registerEntityPosition(ch);
        }
    }

    /**
     * Цикл по сущностям
     * @param {{function(entity: efEntity, id: number)}} callback
     */
    public forEachEntity(callback: (entity: efEntity, id: number) => void): void {
        elyUtils.forEach(this.entities, (index, value) => {
            callback(value, index);
        });
    }

    /**
     * Цикл по игровым объектам в камере по глубине
     * @param {{function(entity: efEntity, id: number)}} callback
     */
    public forEachVisibleByDepth(callback: (entity: efEntity, id: number) => void): void {
        this.game.camera.forEachVisiblePosition(grid => {
            if (!this.isOutOfBounds(grid)) {
                const render = this.renderingGrid!.get(grid);
                if (render) {
                    elyUtils.forEach(render, (index, value) => {
                        callback(value, index);
                    });
                }
            }
        });
    }

    /**
     * Цикл по всем видимым тайлам
     * @param {{function(grid: ef2DVectorValues, t: *)}} callback
     * @param {number} extra
     */
    public forEachVisibleTile(callback: (grid: ef2DVectorValues, t: any[]) => void, extra?: number) {
        if (this.loaded()) {
            this.game.camera.forEachVisiblePosition(grid => {
                let val: any = this.worldData!.map[grid.y][grid.x];
                if (!(val instanceof Array)) val = [val];
                callback(grid, val);
            }, extra);
        }
    }

    /**
     * Возвращает true, если возможен путь на клетке
     * @param point
     */
    public isPathing(point: ef2DVector | ef2DVectorValues): boolean {
        if (point instanceof ef2DVector) point = point.getValues();
        if (this.isOutOfBounds(point)) return false;
        return ((this.pathingGrid[point.y] || [])[point.x] || 0) > 0;
    }

    /**
     * Возвращает true, если может возникнуть коллизия
     * @param point
     */
    public isColliding(point: ef2DVector | ef2DVectorValues): boolean {
        if (point instanceof ef2DVector) point = point.getValues();
        if (this.isOutOfBounds(point)) return true;
        return this.worldData!.collision[point.y][point.x] === 0 || this.isEntityAt(point);
    }

    /**
     * Возвращает путь
     * @param ch
     * @param point
     * @param ignore
     */
    public findPath(ch: efCharacter, point: ef2DVector | ef2DVectorValues, ignore?: efEntity[]): ef2DVectorValues[] {
        if (point instanceof ef2DVector) point = point.getValues();
        let path: ef2DVectorValues[] = [];
        if (this.isColliding(point)) return path;

        if (this.pathfinder) {
            if (ignore) ignore.forEach(value => this.pathfinder!.ignore(value));
            path = this.pathfinder.findPath(this.pathingGrid, ch, point, false);
            this.pathfinder.reset();
        }
        return path;
    }

    /**
     * Инициилизирует сетку перемещения
     * @param props
     */
    protected __initPathingGrid(props: { size: efSize, worldCollision: number[][] }) {
        for (let i = 0; i < props.size.height(); i++) {
            this.pathingGrid[i] = [];
            for (let j = 0; j < props.size.width(); j++) {
                this.pathingGrid[i][j] = props.worldCollision[i][j];
            }
        }
        elyXLogger.default.log(`Сетка перещемещения инициилизирована: ${props.size.toString()}`);
    }

    /**
     * Инициилизирует сетку сущностей
     * @param props
     */
    protected __initEntitiesGrid(props: { size: efSize }) {
        this.entitiesGrid = new ef2DGridButch<efEntity>({size: props.size});
        elyXLogger.default.log(`Сетка сущностей инициилизирована: ${props.size.toString()}`);
    }

    /**
     * Инициилизирует сетку сущностей
     * @param props
     */
    protected __initRenderingGrid(props: { size: efSize }) {
        this.renderingGrid = new ef2DGridButch<efEntity>({size: props.size});
        elyXLogger.default.log(`Сетка отрисовки инициилизирована: ${props.size.toString()}`);
    }
}
