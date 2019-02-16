/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyObservable.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Прослушиваемый протокол
 * @class elyObservable
 */
export default class elyObservable {

    /**
     * @protected
     */
    protected observers: { [event: string]: Array<() => void> } = {};

    /**
     * Добавляет наблюдатель
     * @param {String} event - событие
     * @param {Function} observer - наблюдатель
     */
    public addObserver(event: string, observer: any): elyObservable {
        if (!this.observers.hasOwnProperty(event)) this.observers[event] = [];
        this.observers[event].push(observer);
        return this;
    }

    /**
     * Удаляет обработчик
     * @param event
     * @param observer
     */
    public removeObserver(event: string, observer: any): elyObservable {
        if (this.observers.hasOwnProperty(event)) {
            this.observers[event].splice(this.observers[event].indexOf(observer), 1);
        }
        return this;
    }

    /**
     * Удаляет все обработчики события или событий
     * @param {String} [event] - Событие
     */
    public removeAllObservers(event?: string): elyObservable {
        if (event !== undefined) {
            if (this.observers.hasOwnProperty(event)) {
                this.observers[event] = [];
            }
        } else {
            this.observers = {};
        }
        return this;
    }

    /**
     * Сообщает о событие всех наблюдателей
     * @param {String} event
     * @param {*} args
     */
    protected notificate(event: string, args?: any) {
        if (this.observers.hasOwnProperty(event)) {
            for (const observer of this.observers[event]) observer.apply(this, args);
        }
    }
}
