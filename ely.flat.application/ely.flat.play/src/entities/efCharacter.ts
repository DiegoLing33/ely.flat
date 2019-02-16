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
 + Файл: efCharacter.ts                                                       +
 + Файл изменен: 28.12.2018 16:57:02                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyXLogger from "@core/utils/elyXLogger";
import elyDirection from "@enums/elyDirection";
import ef2DVector from "@math/ef2DVector";
import ef2DVectorValues from "@math/ef2DVectorValues";
import ef2DSprite from "@play/ef2DSprite";
import efEntity from "@play/entities/efEntity";

export default class efCharacter extends efEntity {

    /**
     * Значения скорости
     */
    public speedValues = {
        move: 200,
    };

    /**
     * Флаг: движение в паузе
     */
    public isMotionPaused: boolean = false;

    /**
     * Таргет
     */
    public target: efEntity | null = null;

    public __nextStepDelegate: (cb: (res: boolean) => void) => void = (cb => {
        cb(true);
    });

    /**
     * Путь
     * @ignore
     */
    protected __path: ef2DVectorValues[] | null = null;

    /**
     * Новая точка достижения
     * @ignore
     */
    protected __newDestination: ef2DVectorValues | null = null;

    /**
     * Точка назначения
     * @ignore
     */
    protected __destination: ef2DVectorValues | null = null;

    /**
     * Запрос пути
     */
    protected __requestPathDelegate: ((point: ef2DVectorValues) => ef2DVectorValues[]) | null = null;

    /**
     * Режим приследования
     */
    protected __followingMode: boolean = false;

    /**
     * Шаг
     */
    protected __step: number = 0;

    /**
     * Прерывание движения
     */
    private __interrupted: boolean = false;

    /**
     * Конструктор
     * @param {{ position?: ef2DVector, maxSpeed?: number, sprite: ef2DSprite}} props
     */
    public constructor(props: { position?: ef2DVector, id: number }) {
        super(props);
    }

    /**
     * Поворачивает объект
     * @param direction
     */
    public turnTo(direction: elyDirection): void {
        this.directionName = direction;
        switch (direction) {
            case elyDirection.up:
                this.angle = 0;
                break;
            case elyDirection.down:
                this.angle = 180;
                break;
            case elyDirection.left:
                this.angle = -90;
                break;
            case elyDirection.right:
                this.angle = 90;
                break;
        }
    }

    /**
     * Перемещает сущность
     * @param point
     */
    public go(point: ef2DVector | ef2DVectorValues): void {
        if (point instanceof ef2DVector) point = point.getValues();
        if (this.__followingMode) {
            this.__followingMode = false;
            this.target = null;
        }
        this.moveTo_(point);
    }

    /**
     * Запрашивает путь до точки
     * @param point
     */
    public requestPathfindingTo(point: ef2DVectorValues): ef2DVectorValues[] {
        if (this.__requestPathDelegate) {
            return this.__requestPathDelegate(point);
        } else {
            elyXLogger.default.error(`Ошибка построения пути для ${this} в точку ${point}`);
            return [];
        }
    }

    /**
     * Устанавливает делегат запроса пути
     * @param {{function(point: ef2DVectorValues): ef2DVectorValues[]}} delegate
     */
    public setRequestPathDelegate(delegate: (point: ef2DVectorValues) => ef2DVectorValues[]): void {
        this.__requestPathDelegate = delegate;
    }

    /**
     * Возвращает true, если персонаж находится в движении
     */
    public isMoving(): boolean {
        return this.__path !== null;
    }

    /**
     * Продолжает движение в point
     * @param point
     */
    public continueTo(point: ef2DVectorValues): void {
        this.__newDestination = point;
    }

    /**
     * Сделует по пути
     * @param {{ef2DVectorValues[]}} path
     */
    public followPath(path: ef2DVectorValues[]) {
        if (path.length > 1) {
            this.__path = path;
            this.__step = 0;

            if (this.__followingMode) {
                path.pop();
            }
            this.notificate("startPathing", [path]);
            this.nextStep();
        }
    }

    /**
     * Следование до объекта
     * @param entity
     */
    public follow(entity: efEntity): void {
        this.__followingMode = true;
        this.moveTo_(entity.getGridPosition());
    }

    /**
     * Прерывает следование
     */
    public stop() {
        if (this.isMoving()) {
            this.__interrupted = true;
        }
    }

    /**
     * Добавляет наблюдатель: начало пути
     *
     * Имя обсервера: startPathing
     *
     * @param o - наблюдатель
     */
    public addStartPathingObserver(o: (path: ef2DVectorValues[]) => void): efCharacter {
        this.addObserver("startPathing", o);
        return this;
    }

    /**
     * Добавляет наблюдатель:  конец пути
     *
     * Имя обсервера: stopPathing
     *
     * @param {function(point: ef2DVectorValues)} o - наблюдатель
     */
    public addStopPathingObserver(o: (point: ef2DVectorValues) => void): efCharacter {
        this.addObserver("stopPathing", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: до начала шага
     *
     * Имя обсервера: beforeStep
     *
     * @param {{function(ch: efCharacter)}} o - наблюдатель
     */
    public addBeforeStepObserver(o: (ch: efCharacter) => void): efCharacter {
        this.addObserver("beforeStep", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: выполнение шага
     *
     * Имя обсервера: step
     *
     * @param o - наблюдатель
     */
    public addStepObserver(o: () => void): efCharacter {
        this.addObserver("step", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: персонаж передвинулся
     *
     * Имя обсервера: didMoved
     *
     * @param o - наблюдатель
     */
    public addDidMovedObserver(o: (ch: efCharacter) => void): efCharacter {
        this.addObserver("didMoved", o);
        return this;
    }

    /**
     * Обновляет движения
     */
    public updateMovement(): void {
        if (this.__path) {
            const p = this.__path;
            const i = this.__step;
            if (p[i].x < p[i - 1].x) {
                this.turnTo(elyDirection.left);
            }
            if (p[i].x > p[i - 1].x) {
                this.turnTo(elyDirection.right);
            }
            if (p[i].y < p[i - 1].y) {
                this.turnTo(elyDirection.up);
            }
            if (p[i].y > p[i - 1].y) {
                this.turnTo(elyDirection.down);
            }
        }
    }

    /**
     * Обновляет позицию на сетке
     */
    public updatePositionOnGrid(): void {
        if (this.__path) {
            this.setGridPosition(new ef2DVectorValues({
                x: this.__path![this.__step].x,
                y: this.__path![this.__step].y,
            }));
        }
    }

    /**
     * Следующий шаг
     */
    public nextStep(): void {
        let stop = false;
        let pos = null;
        let path = null;
        if (this.isMoving()) {
            // В движении
            this.notificate("beforeStep", [this]);
            this.updatePositionOnGrid();

            if (this.__interrupted) {
                stop = true;
                this.__interrupted = false;
            } else {
                if (this.hasNextStep()) {
                    this.nextPosition = this.__path![this.__step + 1];
                }
                this.notificate("step");

                if (this.hasChangedItsPath()) {
                    pos = this.__newDestination;
                    path = this.requestPathfindingTo(pos!);
                    this.__newDestination = null;
                    if (path.length < 2) {
                        stop = true;
                    } else {
                        this.followPath(path);
                    }
                } else if (this.hasNextStep()) {
                    this.__step++;
                    this.updateMovement();
                } else {
                    stop = true;
                }
            }

            if (stop) {
                this.__path = null;
                this.idle();
                this.notificate("stopPathing", [this.getGridPosition()]);
            }
        }
    }

    public idle(): void {
        // Nothing
    }

    public didMoved(): void {
        this.notificate("didMove", [this]);
    }

    /**
     * Выполняет перемещение
     * @param point
     * @private
     */
    protected moveTo_(point: ef2DVectorValues) {
        this.__destination = point;

        if (this.isMoving()) {
            this.continueTo(point);
        } else {
            const path = this.requestPathfindingTo(point);
            this.followPath(path);
        }
    }

    /**
     * Возвращает true, если есть следующий шаг
     */
    private hasNextStep(): boolean {
        let res = this.__path !== null && this.__path.length - 1 > this.__step;
        this.__nextStepDelegate((b) => {
            res = res && b;
        });
        return res;
    }

    private hasChangedItsPath(): boolean {
        return this.__newDestination !== null;
    }
}
