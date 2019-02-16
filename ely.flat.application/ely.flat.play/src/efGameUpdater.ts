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
 + Файл: efGameUpdater.ts                                                     +
 + Файл изменен: 28.12.2018 03:41:31                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyDirection from "@enums/elyDirection";
import ef2DVectorValues from "@math/ef2DVectorValues";
import efGame from "@play/efGame";
import efGameSettings from "@play/efGameSettings";
import efCharacter from "@play/entities/efCharacter";

/**
 * Обновление элементов
 */
export default class efGameUpdater {

    /**
     * Смягчение движения
     * @type {number}
     */
    public static smoothDelta = 0.13;

    /**
     * Игра
     */
    public readonly game: efGame;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { game: efGame }) {
        this.game = props.game;
    }

    /**
     * Обновляет все игровые состояния
     */
    public update() {
        this.updateTransitions();
        this.updateEntities();
    }

    /**
     * Обновляет изменяемые значения
     */
    public updateTransitions() {

        this.game.world.forEachEntity((entity) => {
            const m = entity.movement;
            if (m) {
                if (m.isInProgress()) {
                    m.update(this.game.currentTime);
                }
            }
        });
    }

    public updateEntities(): void {
        this.game.world.forEachEntity(entity => {
            if (entity instanceof efCharacter) {
                this.updateCharacter(entity);
            }
        });
    }

    /**
     * Обновляет персонажа
     * @param character
     */
    public updateCharacter(character: efCharacter): void {
        const tick = Math.round(efGameSettings.tileSize / Math.round((character.speedValues.move /
            (1000 / this.game.renderer.FPS))));
        if (character.isMoving() && !character.movement.isInProgress()) {
            if (character.directionName === elyDirection.left) {
                character.movement.start(
                    this.game.currentTime,
                    (x: number) => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x, y: character.getAbsolutePosition().y,
                        }));
                        character.didMoved();
                    },
                    () => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x: character.movement.getEndValue(),
                            y: character.getAbsolutePosition().y,
                        }));
                        character.didMoved();
                        character.nextStep();
                    },
                    character.getAbsolutePosition().x - tick,
                    character.getAbsolutePosition().x - efGameSettings.tileSize,
                    character.speedValues.move,
                );
            } else if (character.directionName === elyDirection.right) {
                character.movement.start(
                    this.game.currentTime,
                    (x: number) => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x, y: character.getAbsolutePosition().y,
                        }));
                        character.didMoved();
                    },
                    () => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x: character.movement.getEndValue(),
                            y: character.getAbsolutePosition().y,
                        }));
                        character.didMoved();
                        character.nextStep();
                    },
                    character.getAbsolutePosition().x + tick,
                    character.getAbsolutePosition().x + efGameSettings.tileSize,
                    character.speedValues.move,
                );
            } else if (character.directionName === elyDirection.up) {
                character.movement.start(
                    this.game.currentTime,
                    (y: number) => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x: character.getAbsolutePosition().x, y,
                        }));
                        character.didMoved();
                    },
                    () => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x: character.getAbsolutePosition().x,
                            y: character.movement.getEndValue(),
                        }));
                        character.didMoved();
                        character.nextStep();
                    },
                    character.getAbsolutePosition().y - tick,
                    character.getAbsolutePosition().y - efGameSettings.tileSize,
                    character.speedValues.move,
                );
            } else if (character.directionName === elyDirection.down) {
                character.movement.start(
                    this.game.currentTime,
                    (y: number) => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x: character.getAbsolutePosition().x, y,
                        }));
                        character.didMoved();
                    },
                    () => {
                        character.setAbsolutePosition(new ef2DVectorValues({
                            x: character.getAbsolutePosition().x,
                            y: character.movement.getEndValue(),
                        }));
                        character.didMoved();
                        character.nextStep();
                    },
                    character.getAbsolutePosition().y + tick,
                    character.getAbsolutePosition().y + efGameSettings.tileSize,
                    character.speedValues.move,
                );
            }
        }
    }
}
