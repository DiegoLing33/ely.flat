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
 + Файл: ef2DCamera.ts                                                        +
 + Файл изменен: 02.01.2019 05:00:21                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ef2DVectorValues from "@cnv/objs/ef2DVectorValues";
import efSize from "@cnv/objs/efSize";
import elyXLogger from "@core/utils/elyXLogger";
import efEntity from "@play/entities/efEntity";
import ef2DMovableEntityProtocol from "@play/protocols/ef2DMovableEntityProtocol";

/**
 * Камера
 * @class ef2DCamera
 */
export default class ef2DCamera extends ef2DMovableEntityProtocol {

    /**
     * Размер камеры
     */
    public readonly size: efSize;

    /**
     * Конструктор
     * @param {{ size: efSize }} props
     */
    public constructor(props: { size: efSize }) {
        super();
        this.size = props.size;
        elyXLogger.default.log(`Инициилизирована камера: ${props.size.toString()}`);
    }

    /**
     * Цикл по видимым позициям
     * @param callback
     * @param extra
     */
    public forEachVisiblePosition(callback: (grid: ef2DVectorValues) => void, extra: number = 0) {
        const grid = this.getGridPosition();
        for (let y = grid.y - extra, maxY = grid.y + this.size.height() + (extra * 2); y < maxY; y++) {
            for (let x = grid.x - extra, maxX = grid.x + this.size.width() + (extra * 2); x < maxX; x++) {
                callback(new ef2DVectorValues({x, y}));
            }
        }
    }

    /**
     * Возвращает true, если позиция видимая
     * @param point
     */
    public isVisiblePosition(point: ef2DVectorValues): boolean {
        const x = point.x;
        const y = point.y;
        const grid = this.getGridPosition();

        return y >= grid.y && y < grid.y + this.size.height()
            && x >= grid.x && x < grid.x + this.size.width();
    }

    public isVisible(entity: efEntity): boolean {
        return this.isVisiblePosition(entity.getGridPosition());
    }

    /**
     * Фокусируется на объекте
     * @param entity
     */
    public focusEntity(entity: efEntity): void {
        const w = this.size.width() - 2;
        const h = this.size.height() - 2;
        const x = Math.floor(entity.getGridPosition().x - 1 / w) * w;
        const y = Math.floor(entity.getGridPosition().y - 1 / h) * h;

        this.setGridPosition(new ef2DVectorValues({x, y}));
    }
}
