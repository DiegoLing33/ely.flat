/*
 *
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *   ,--. o                   |    o
 *   |   |.,---.,---.,---.    |    .,---.,---.
 *   |   |||---'|   ||   |    |    ||   ||   |
 *   `--' ``---'`---|`---'    `---'``   '`---|
 *              `---'                    `---'
 *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
 * Mail: <diegoling33@gmail.com>
 *
 * Это программное обеспечение имеет лицензию, как это сказано в файле
 * COPYING, который Вы должны были получить в рамках распространения ПО.
 *
 * Использование, изменение, копирование, распространение, обмен/продажа
 * могут выполняться исключительно в согласии с условиями файла COPYING.
 *
 * Файл: elyObservableBoolean.ts
 * Файл создан: 28.11.2018 01:03:35
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import elyObservableProperty from "@core/observable/properties/elyObservableProperty";

/**
 * Прослушиваемый булевый тип
 */
export default class elyObservableBoolean extends elyObservableProperty<boolean> {

    /**
     * Конструктор
     * @param defaultValue
     */
    public constructor(defaultValue: boolean = false) {
        super(defaultValue);
    }

    /**
     * Переключает значение
     */
    public toggle(): elyObservableBoolean {
        this.set(!this.value);
        return this;
    }
}
