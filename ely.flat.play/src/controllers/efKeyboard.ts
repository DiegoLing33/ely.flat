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
 + Файл: efKeyboard.ts                                                        +
 + Файл изменен: 28.12.2018 03:02:25                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*
var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
 *
 */

import elyObservable from "../../../ely.core/src/observable/elyObservable";

/**
 * Клавиатура
 * @augments {elyObservable}
 */
export default class efKeyboard extends elyObservable {

    /**
     * Стандартная клавиатура
     * @type {efKeyboard}
     */
    public static default = new efKeyboard();

    /**
     * Состояния
     * @ignore
     */
    protected _pressed: { [code: string]: boolean } = {};

    /**
     * Возвращает true, если клавиша нажата
     * @param keyCode
     */
    public isDown(keyCode: string): boolean {
        return this._pressed[keyCode];
    }

    /**
     * Нажатие клавиши
     * @param event
     */
    public onKeyDown(event: KeyboardEvent): void {
        this.notificate("keydown", [event.code]);
        this._pressed[event.code] = true;
    }

    /**
     * Отпускание клавиши
     * @param event
     */
    public onKeyUp(event: KeyboardEvent): void {
        delete this._pressed[event.code];
    }

    /**
     * Запуск прослушивания команд
     */
    public startListening(): void {
        window.addEventListener("keyup", event => {
            this.onKeyUp(event);
        }, false);
        window.addEventListener("keydown", event => {
            this.onKeyDown(event);
        }, false);
    }

    /**
     * Добавляет наблюдатель: нажатие клавиши
     *
     * Имя обсервера: kewdown
     *
     * @param o - наблюдатель
     */
    public addKeyDownObserver(o: (code: number) => void): efKeyboard {
        this.addObserver("keydown", o);
        return this;
    }
}
