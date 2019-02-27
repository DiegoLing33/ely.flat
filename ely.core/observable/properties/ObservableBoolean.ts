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
 * Файл: ObservableBoolean
 * Файл создан: 28.11.2018 01:03:35
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */

import ObservableProperty from "./ObservableProperty";

/**
 * Прослушиваемый булевый тип
 * @class ObservableBoolean
 * @augments {ObservableProperty<boolean>}
 */
export default class ObservableBoolean extends ObservableProperty<boolean> {

    /**
     * Конструктор
     * @param {boolean} [defaultValue = false]
     */
    public constructor(defaultValue: boolean = false) {
        super(defaultValue);
    }

    /**
     * Переключает значение
     * @return {ObservableBoolean}
     */
    public toggle(): ObservableBoolean {
        this.set(!this.value);
        return this;
    }
}
