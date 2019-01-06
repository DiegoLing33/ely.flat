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
 + Файл: efPathfinder.ts                                                      +
 + Файл изменен: 28.12.2018 21:17:28                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "@core/observable/elyObservable";
import ef2DVectorValues from "@math/ef2DVectorValues";
import efGameWorld from "@play/efGameWorld";
import efCharacter from "@play/entities/efCharacter";
import efEntity from "@play/entities/efEntity";
import {astar, Graph} from "@play/utils/astar";

/**
 * Поиск кратчайшего пути
 */
export default class efPathfinder extends elyObservable {

    /**
     * Объект игры
     */
    public readonly world: efGameWorld;

    /**
     * Игнорированные клетки
     * @protected
     * @ignore
     */
    protected __ignored: efEntity[] = [];

    /**
     * Сетка
     */
    protected __grid: number[][] = [];

    /**
     * Пустая сетка
     */
    protected __blankGrid: number[][] = [];

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { world: efGameWorld }) {
        super();
        this.world = props.world;

        for (let i = 0; i < props.world.size.height(); i++) {
            this.__blankGrid[i] = [];
            for (let j = 0; j < props.world.size.width(); j++) {
                this.__blankGrid[i][j] = 0;
            }
        }
    }

    public ignore(entity: efEntity): void {
        this.__ignored.push(entity);
    }

    /**
     * Сбрасывает поиск пути
     */
    public reset(): void {
        this.__applyIgnoreList(false);
        this.__ignored = [];
    }

    /**
     * Выполняет поиск пути
     * @param pathingGrid
     * @param ch
     * @param point
     * @param incom
     */
    public findPath(pathingGrid: number[][], ch: efCharacter, point: ef2DVectorValues, incom: boolean)
        : ef2DVectorValues[] {
        this.__grid = pathingGrid;
        this.__applyIgnoreList(true);
        // @ts-ignore
        const graph = new Graph(this.__grid, { diagonal: false });

        let start = ch.getGridPosition();
        start = graph.grid[start.y][start.x];

        let end = point;
        end = graph.grid[end.y][end.x];

        let path = astar.search(graph, start, end);
        if (path.length === 0 && incom) {
            path = this.__findIncompletePath(graph, start, end);
        }
        path = path.map(value => new ef2DVectorValues({x: value.y, y: value.x}));
        return [ch.getGridPosition(), ...path];
    }

    /**
     * Применяет список игнорирования
     * @param ignored
     * @private
     */
    protected __applyIgnoreList(ignored: boolean = true) {
        this.__ignored.forEach((entity) => {
            const pos = entity instanceof efCharacter && entity.isMoving() ?
                entity.nextPosition! : entity.getGridPosition();
            if (pos.x >= 0 && pos.y >= 0) {
                this.__grid[pos.y][pos.x] = ignored ? 1 : 0;
            }
        });
    }

    private __findIncompletePath(graph: any, start: ef2DVectorValues, end: ef2DVectorValues): ef2DVectorValues[] {
        let point = {x: 0, y: 0};
        let incomplete = [];

        const perfect = astar.search(this.__blankGrid, start, end);

        for (let i = perfect.length - 1; i > 0; i -= 1) {
            point = perfect[i];

            if (this.__grid[point.y][point.x] === 0) {
                incomplete = astar.search(this.__grid, start, graph.grid[point.x][point.y]);
                break;
            }
        }
        return incomplete;
    }
}
