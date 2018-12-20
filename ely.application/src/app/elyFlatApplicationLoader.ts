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
 + Файл: elyFlatApplicationLoader.ts                                          +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplicationConfig from "@app/app/options/elyFlatApplicationConfig";
import elyUtils from "@core/elyUtils";
import elyObservable from "@core/observable/elyObservable";
import elyXLogger from "@core/utils/elyXLogger";
import elyURL from "@core/web/url/elyURL";

export default class elyFlatApplicationLoader extends elyObservable {

    /**
     * Путь до файла конфигуарции
     * По умолчанию: app.config.json
     */
    public static configurationPath: string = "app.config.json";

    /**
     * Создает элемент стандартной конфигурации
     */
    public static defaultConfiguration(): elyFlatApplicationConfig {
        return {
            app: {
                mainScript: "app.js",
                title: "ely.Flat{ }",
                useContentController: true,
            },
            sidenavigation: {
                allowMouseEvents: true,
                enabled: false,
            },
            template: {
                color: "#194d6d",
                maxContainerWidth: 700,

                footer: {
                    subtitle: "My application",
                    title: "Works with ely.Flat Application Engine",
                },
            },
        };
    }

    /**
     * Загружает конфигурацию приложения
     * @param closure - обработчик конфигурации
     */
    public static loadApplicationConfiguration(closure: (config: elyFlatApplicationConfig) => void): void {
        elyXLogger.default.log("Получение файла конфигурации: " + elyFlatApplicationLoader.configurationPath);
        new elyURL(elyFlatApplicationLoader.configurationPath).request({}, (response, status) => {
            if (status === 200) {
                elyXLogger.default.log("Файл конфигурации получен");
                closure(elyUtils.mergeDeep(elyFlatApplicationLoader.defaultConfiguration(), (response || {})));
            } else {
                elyXLogger.default.log("Использована стандартная конфигурация");
                closure(elyFlatApplicationLoader.defaultConfiguration());
            }
        });
    }

}
