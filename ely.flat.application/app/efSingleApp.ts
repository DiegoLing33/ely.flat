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
 + Файл: efSingleApp.ts                                                       +
 + Файл изменен: 19.02.2019 22:26:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efAppConfig from "@app/config/efAppConfig";
import elySimplePageViewController from "@controllers/elySimplePageViewController";
import elyObservable from "@core/observable/elyObservable";

export type TConfigFunction = (cfg: efAppConfig) => void;
export type TResultFunction = (result: boolean) => void;
export type TRenderFunction = (vc: elySimplePageViewController) => void;
export type TefSingleInit = (config: TConfigFunction) => TRenderFunction;

/**
 * Простое приложение ely.flat
 * @class efSingleApp
 */
export class efSingleApp extends elyObservable {

    /**
     * Функция инициилизации
     */
    public static applicationInitFunction: TefSingleInit;

    /**
     * Приложение, испольщзующее single
     */
    public static isUsesSingle() {
        return window.hasOwnProperty("efSingleInit") && window.efSingleInit;
    }

    public static initApplication(callback: TRenderFunction) {
        const vc = new elySimplePageViewController();
        vc.title("efSingle App");
        vc.description("Простейшее приложение ely.flat");
        callback(vc);
    }

}
