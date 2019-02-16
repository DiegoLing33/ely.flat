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
 + Файл: elyOneActionEval.ts                                                  +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Выполнение синтаксиса elyOneAction
 */
export default class elyOneActionEval {

    /**
     * Стандартный обработчик
     */
    public static readonly default = new elyOneActionEval();

    /**
     * Правила обработки действий
     */
    public actionsRules: { [command: string]: (a: any) => void } = {};

    /**
     * Исполняет действие
     * @param action
     */
    public go(action: string): void {
        const args = action.match(/\#([A-z0-9]+)\((.+)\)/);
        if (args && args.length > 2) {
            if (this.actionsRules.hasOwnProperty(args[1])) {
                this.actionsRules[args[1]](args[2]);
            }
        }
    }
}
