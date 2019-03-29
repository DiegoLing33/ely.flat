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
 + Файл: SingleApps                                                       +
 + Файл изменен: 19.02.2019 22:26:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {XLogger} from "ely.core";
import Observable from "ely.core/dist/observable/Observable";
import SimplePageViewController from "../controllers/SimplePageViewController";
import AppConfig from "./config/AppConfig";

export type TConfigFunction = (cfg: AppConfig) => void;
export type TResultFunction = (result: boolean) => void;
export type TRenderFunction = (vc: SimplePageViewController) => void;
export type TefSingleInit = (config: TConfigFunction) => TRenderFunction;

/**
 * Простое приложение ely.flat
 * @class SingleApp
 */
export default class SingleApp extends Observable {

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
        XLogger.default.log("[SingleApp] Инициилизация single app контроллера");
        const vc = new SimplePageViewController();
        vc.title("efSingle App");
        vc.description("Простейшее приложение ely.flat");
        callback(vc);
    }

}
