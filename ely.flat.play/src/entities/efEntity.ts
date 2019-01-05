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
 + Файл: efEntity.ts                                                          +
 + Файл изменен: 28.12.2018 02:48:56                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ef2DVector from "@cnv/objs/ef2DVector";
import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import efDirectionName from "@enums/efDirectionName";
import ef2DSprite from "@play/ef2DSprite";
import efEntityTransition from "@play/efEntityTransition";
import efGameWorld from "@play/efGameWorld";
import ef2DMovableEntityProtocol from "@play/protocols/ef2DMovableEntityProtocol";

/**
 * Существо
 */
export default class efEntity extends ef2DMovableEntityProtocol {

    /**
     * Следующая позиция
     */
    public nextPosition?: ef2DVectorValues = new ef2DVectorValues({x: -1, y: -1});

    /**
     * Имя направления персонажа
     */
    public directionName: efDirectionName = efDirectionName.down;

    /**
     * Значение движения
     */
    public movement: efEntityTransition = new efEntityTransition();

    /**
     * Идентификатор
     */
    public readonly id: number;

    /**
     * Угол
     */
    public angle: number = 0;

    /**
     * Спрайт
     * @ignore
     */
    protected __sprite: ef2DSprite | null = null;

    /**
     * Свойство: видимость сущности
     * @ignore
     */
    protected readonly visibleProperty: elyObservableProperty<boolean>
        = new elyObservableProperty<boolean>(true);

    //
    //  States
    //

    /**
     * Флаг загруки
     * @ignore
     */
    protected __isLoaded: boolean = false;

    /**
     * Состояние появления
     * @ignore
     */
    protected __isFading: boolean = false;

    /**
     * Время появления (начало)
     */
    protected __fadingStartTime: number = -1;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { position?: ef2DVector, maxSpeed?: number, angle?: number, id: number }) {
        super();
        this.id = props.id;
        this.angle = props.angle || 0;
        props.position = props.position || ef2DVector.zero();
        this.setGridPosition(props.position);
    }

    /**
     * Устанавливает абсолютную позицию для отрисовки
     * @param point
     */
    public setAbsolutePosition(point: ef2DVectorValues | ef2DVector): void {
        if (point instanceof ef2DVector) point = point.getValues();
        this.__absolutePosition.x(point.x);
        this.__absolutePosition.y(point.y);
    }

    /**
     * Устанавливает спрайт
     * @param sprite
     */
    public setSprite(sprite: ef2DSprite): void {
        if (this.__sprite && this.__sprite.name === sprite.name) return;
        this.__sprite = sprite;
        this.__isLoaded = true;
        this.notificate("loaded", [this]);
    }

    /**
     * Возвращает текущй спрайт сущности
     */
    public getSprite(): ef2DSprite | null {
        return this.__sprite;
    }

    /**
     * Возвращает видимость сущности
     * @returns {boolean}
     */
    public visible(): boolean;

    /**
     * Устанавливает видимость сущности
     * @param {boolean} value - значение
     * @returns {this}
     */
    public visible(value: boolean): efEntity;

    /**
     * Возвращает и устанавливает видимость сущности
     * @param {boolean} [value] - значение
     * @returns {boolean|this|null}
     */
    public visible(value?: boolean): boolean | null | efEntity {
        return elyObservableProperty.simplePropertyAccess(this, value, this.visibleProperty);
    }

    /**
     * Возвращает состояние загруки сущности
     * @return {boolean}
     */
    public isLoaded(): boolean {
        return this.__isLoaded;
    }

    /**
     * Возвраащает расстояние до сущности
     * @param entity
     */
    public getDistanceToEntity(entity: efEntity): number {
        const dx = Math.abs(entity.getGridPosition().x - this.getGridPosition().x);
        const dy = Math.abs(entity.getGridPosition().y - this.getGridPosition().y);
        return (dy > dx) ? dy : dx;
    }

    /**
     * Возвращает true, если возможен контакт
     * @param {efEntity} entity
     */
    public isAdjacentToEntity(entity: efEntity): boolean {
        return this.getDistanceToEntity(entity) <= 1;
    }

    /**
     * Появление
     * @param currentTime
     */
    public fadeIn(currentTime: number): void {
        this.__isFading = true;
        this.__fadingStartTime = currentTime;
    }

    /**
     * Добавляет наблюдатель: загрузка
     *
     * Имя обсервера: loaded
     *
     * @param o - наблюдатель
     */
    public addLoadedObserver(o: (entity: efEntity) => void): efEntity {
        this.addObserver("loaded", o);
        return this;
    }

    /**
     * Возвращает следующую позицию по направлению
     * @param val
     */
    public getNextPointByDirection(val: number = 1): ef2DVectorValues {
        switch (this.directionName) {
            case efDirectionName.up:
                return this.getGridPosition().getAdd({x: 0, y: -val});
            case efDirectionName.down:
                return this.getGridPosition().getAdd({x: 0, y: val});
            case efDirectionName.left:
                return this.getGridPosition().getAdd({x: val, y: 0});
            case efDirectionName.right:
                return this.getGridPosition().getAdd({x: -val, y: 0});
        }
        return this.getGridPosition();
    }

    /**
     * Возвращает обратное направление
     */
    public getMirrorDirectionName(): efDirectionName {
        switch (this.directionName.value) {
            case efDirectionName.up.value:
                return efDirectionName.down;
            case efDirectionName.down.value:
                return efDirectionName.up;
            case efDirectionName.left.value:
                return efDirectionName.right;
            case efDirectionName.right.value:
                return efDirectionName.left;
        }
        return this.directionName;
    }

    /**
     * Сущность добавлена в игру
     * @param world
     */
    public entityDidAddToGame(world: efGameWorld): void {
        // Nothing is done
    }

    /**
     * Сущность убрана из игры
     * @param world
     */
    public entityDidRemoveFromGame(world: efGameWorld): void {
        // Nothing is done
    }

    /**
     * Преобразует сущность в string
     */
    public toString(): string {
        return `entity#${this.id}`;
    }
}
