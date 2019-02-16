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
 + Файл: elyTimer.ts                                                          +
 + Файл изменен: 08.01.2019 01:11:46                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyObservable from "@core/observable/elyObservable";

/**
 * Таймер
 * @class {elyTimer}
 */
export default class elyTimer extends elyObservable {

    /**
     * Время таймера
     * @type {number}
     * @protected
     */
    protected __duration: number;

    /**
     * Циклический таймер
     * @type {boolean}
     * @protected
     */
    protected readonly __loop: boolean = false;

    /**
     * Поток
     * @protected
     */
    protected __thread: any;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { duration: number, loop?: boolean }) {
        super();
        /**
         * @protected
         */
        this.__duration = props.duration;
        /**
         * @protected
         */
        this.__loop = props.loop || false;
    }

    /**
     * Добавляет наблюдатель: окончание таймера
     *
     * Если таймер циклический, данный метод будет вызван каждый цикл
     *
     * Имя обсервера: addEndObserver
     *
     * @param o - наблюдатель
     */
    public addEndObserver(o: () => void): elyTimer {
        this.addObserver("endTimer", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: запускт таймера
     *
     * Имя обсервера: startTimer
     *
     * @param o - наблюдатель
     */
    public addStartObserver(o: () => void): elyTimer {
        this.addObserver("startTimer", o);
        return this;
    }

    /**
     * Запускает таймер
     */
    public start(): void {
        if (this.__thread !== null) return;
        this.notificate("startTimer");
        if (this.__loop) this.__thread = setInterval(() => {
            this.stop(true);
        }, this.__duration);
        else {
            this.__thread = setTimeout(() => {
                this.stop(true);
            }, this.__duration);
        }
    }

    /**
     * Перезапускает таймер
     */
    public restart(): void {
        this.stop(false);
        this.start();
    }

    /**
     * Останавливает таймер
     * @param {boolean} [notificate = true] - если установлено значение true,
     * после выполнения метода, будет вызвано событие `endTimer` {@link elyTimer.addEndObserver}
     */
    public stop(notificate: boolean = true): void {
        if (this.__loop) clearInterval(this.__thread);
        else clearTimeout(this.__thread);
        if (notificate) this.notificate("endTimer");
        this.__thread = null;
    }
}