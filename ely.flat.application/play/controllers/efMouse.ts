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
 + Файл: efMouse.ts                                                           +
 + Файл изменен: 28.12.2018 18:44:50                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import ef2DVectorValues from "@math/ef2DVectorValues";
import ef2DMovableEntityProtocol from "@play/protocols/ef2DMovableEntityProtocol";

/**
 * Мышь
 */
export default class efMouse extends ef2DMovableEntityProtocol {

    /**
     * Стандартный контроллеры мыши
     * @type {efMouse}
     */
    public static default = new efMouse();

    /**
     * Конструктор
     */
    public constructor() {
        super();
        // Nothing is done
    }

    /**
     * Запускает прослушивание событий
     */
    public startListening(): void {
        window.onmousemove = (e: MouseEvent) => {
            if (e.offsetX) {
                this.setAbsolutePosition(new ef2DVectorValues({x: e.offsetX, y: e.offsetY}));
            } else if (e.layerX) {
                this.setAbsolutePosition(new ef2DVectorValues({x: e.layerX, y: e.layerY}));
            }
        };
        window.onclick = () => {
            this.notificate("click", [this.getAbsolutePosition(), this.getGridPosition()]);
        };
    }

    /**
     * Добавляет наблюдатель: клик
     *
     * Имя обсервера: click
     *
     * @param {{function(abs: ef2DVectorValues, grid: ef2DVectorValues)}} o - наблюдатель
     */
    public addClickObserver(o: (abs: ef2DVectorValues, grid: ef2DVectorValues) => void): efMouse {
        this.addObserver("click", o);
        return this;
    }

}
