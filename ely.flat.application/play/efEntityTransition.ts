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
 + Файл: efEntityTransition.tsion.ts                                          +
 + Файл изменен: 28.12.2018 21:19:45                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Observable from "@core/observable/Observable";
import XLogger from "@core/utils/XLogger";

/**
 * Изменение значения за время
 *
 * Данная утилита позволяет изменять состояния за период времени.
 *
 * @class efEntityTransition
 * @augments {Observable}
 */
export default class efEntityTransition extends Observable {

    /**
     * Начальное значение
     * @ignore
     */
    protected __startValue: number = 0;

    /**
     * Завершающее значение
     * @ignore
     */
    protected __endValue: number = 0;

    /**
     * Процесс
     * @ignore
     */
    protected __duration: number = 0;

    /**
     * Функция обновления
     * @ignore
     */
    protected __updateFunction: any = null;

    /**
     * Функция завершения
     * @ignore
     */
    protected __stopFunction: any = null;

    /**
     * Состояние в процессе
     * @ignore
     */
    protected __inProgress: boolean = false;

    /**
     * Время начала
     * @ignore
     */
    protected __startTime: number = -1;

    /**
     * Кол-во повторений
     * @ignore
     */
    protected __count: number = -1;

    /**
     * Запуск выполнения
     * @param currentTime
     * @param updateFunction
     * @param stopFunction
     * @param startValue
     * @param endValue
     * @param duration
     */
    public start(currentTime: number, updateFunction: any, stopFunction: any,
                 startValue: number, endValue: number, duration: number) {
        this.__startTime = currentTime;
        this.__updateFunction = updateFunction;
        this.__stopFunction = stopFunction;
        this.__startValue = startValue;
        this.__endValue = endValue;
        this.__duration = duration;
        this.__inProgress = true;
        this.__count = 0;
    }

    /**
     * Шаг выполнения
     * @param currentTime
     */
    public update(currentTime: number): void {
        if (this.__inProgress) {
            if (this.__count > 0) {
                this.__count -= 1;
                XLogger.default.log(currentTime + ": пропущенный фрейм");
            } else {
                // Остаток времени до завршения
                let dt = currentTime - this.__startTime!;
                if (dt > this.__duration) dt = this.__duration;

                const dv = this.__endValue - this.__startValue;
                let i = this.__startValue + ((dv / this.__duration) * dt);

                i = Math.round(i);

                if (dt === this.__duration || i === this.__endValue) {
                    this.stop();
                    if (this.__stopFunction) {
                        this.__stopFunction();
                    }
                } else if (this.__updateFunction) {
                    this.__updateFunction(i);
                }
            }
        }
    }

    /**
     * Останавливает выполнение
     */
    public stop(): void {
        this.__inProgress = false;
    }

    /**
     * Перезапускает выполнение
     * @param currentTime
     * @param startValue
     * @param endValue
     */
    public restart(currentTime: number, startValue: number, endValue: number) {
        this.start(currentTime, this.__updateFunction, this.__stopFunction, startValue, endValue, this.__duration);
        this.update(currentTime);
    }

    /**
     * Возвращает true, если обновление находится в процессе
     */
    public isInProgress(): boolean {
        return this.__inProgress;
    }

    /**
     * Возвращает конечное значение
     */
    public getEndValue() {
        return this.__endValue;
    }
}
