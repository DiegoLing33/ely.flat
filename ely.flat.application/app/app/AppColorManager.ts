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
 + Файл: AppColorManagers                                                 +
 + Файл изменен: 30.01.2019 01:44:27                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import Application from "@app/app/Application";
import AppStylesheet from "@app/AppStylesheet";
import Color from "@core/Color";

/**
 * Менеджер цветов приложения
 * @class AppColorManager
 */
export default class AppColorManager {

    /**
     * Приложение
     * @protected
     * @ignore
     */
    protected __app: Application;

    /**
     * Цвет приложения
     * @protected
     * @ignore
     */
    protected __appColor: Color = Color.black();

    /**
     * Цвет навигации
     * @protected
     * @ignore
     */
    protected __navigationBarColor: Color = Color.black();

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { app: Application }) {
        this.__app = props.app;
    }

    /**
     * Изменяет цветовую гамму приложения
     * @param color
     */
    public applyApplicationColor(color: Color): void {
        const darker = color.getDarkerColor(0.1);
        const lighter = color.getLighterColor(0.18);
        // AppStylesheet.global.addClass("bg-primary", {
        //     backgroundColor: color.toString(),
        //     color: color.isDarker() ? "white" : "black",
        // });
        // AppStylesheet.global.addClass("brd-primary", {
        //     borderColor: color.toString(),
        // });
        //
        // AppStylesheet.global.addClass("text-primary", {
        //     color: color.toString(),
        // });
        //
        // AppStylesheet.global.addClass("bg-info", {
        //     backgroundColor: lighter.toString(),
        //     color: lighter.isDarker() ? "white" : "black",
        // });
        // AppStylesheet.global.addClass("brd-info", {
        //     borderColor: lighter.toString(),
        // });
        //
        // AppStylesheet.global.addClass("text-info", {
        //     color: lighter.toString(),
        // });

        AppStylesheet.global.add("::-webkit-scrollbar-track", {
            borderColor: "#c2c2c2",
        });

        AppStylesheet.global.add("::-webkit-scrollbar", {
            borderColor: "#c2c2c2",
            width: "5px",
        });

        AppStylesheet.global.add("::-webkit-scrollbar-thumb", {
            backgroundColor: darker.toString(),
        });
        this.__appColor = color;
    }

    /**
     * Изменяет цвет панели нацигации
     * @param color
     */
    public applyNavigationBarColor(color: Color): void {
        const isDarkerColor = color.isDarker();
        const borderColor = isDarkerColor ? color.getLighterColor(0.3) : color.getDarkerColor(0.05);
        const textColor = isDarkerColor ? Color.white() : new Color({hex: "#555555"});

        AppStylesheet.global.addClass("ef-navigation", {
            backgroundColor: color.toString(),
            borderBottomColor: borderColor.toString(),
        });

        AppStylesheet.global.addClass("ef-navigation li", {
            color: textColor.toString(),
        });
        this.__navigationBarColor = color;
    }

    /**
     * Возвращает текущий цвет приложения
     * @return {Color}
     */
    public getApplicationColor(): Color {
        return this.__appColor;
    }

    /**
     * Возвращает текущий цвет панели навигации
     * @return {Color}
     */
    public getNavigatonBarColor(): Color {
        return this.__navigationBarColor;
    }
}
