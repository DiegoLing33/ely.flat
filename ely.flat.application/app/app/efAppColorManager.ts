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
 + Файл: efAppColorManager.ts                                                 +
 + Файл изменен: 30.01.2019 01:44:27                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efApplication from "@app/app/efApplication";
import elyColor from "@core/elyColor";
import elyStylesheet from "@controls/elyStylesheet";

/**
 * Менеджер цветов приложения
 * @class efAppColorManager
 */
export default class efAppColorManager {

    /**
     * Приложение
     * @protected
     * @ignore
     */
    protected __app: efApplication;

    /**
     * Цвет приложения
     * @protected
     * @ignore
     */
    protected __appColor: elyColor = elyColor.black();

    /**
     * Цвет навигации
     * @protected
     * @ignore
     */
    protected __navigationBarColor: elyColor = elyColor.black();

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: { app: efApplication }) {
        this.__app = props.app;
    }

    /**
     * Изменяет цветовую гамму приложения
     * @param color
     */
    public applyApplicationColor(color: elyColor): void {
        const darker = color.getDarkerColor(0.1);
        const lighter = color.getLighterColor(0.18);
        // elyStylesheet.global.addClass("bg-primary", {
        //     backgroundColor: color.toString(),
        //     color: color.isDarker() ? "white" : "black",
        // });
        // elyStylesheet.global.addClass("brd-primary", {
        //     borderColor: color.toString(),
        // });
        //
        // elyStylesheet.global.addClass("text-primary", {
        //     color: color.toString(),
        // });
        //
        // elyStylesheet.global.addClass("bg-info", {
        //     backgroundColor: lighter.toString(),
        //     color: lighter.isDarker() ? "white" : "black",
        // });
        // elyStylesheet.global.addClass("brd-info", {
        //     borderColor: lighter.toString(),
        // });
        //
        // elyStylesheet.global.addClass("text-info", {
        //     color: lighter.toString(),
        // });

        elyStylesheet.global.add("::-webkit-scrollbar-track", {
            borderColor: "#c2c2c2",
        });

        elyStylesheet.global.add("::-webkit-scrollbar", {
            borderColor: "#c2c2c2",
            width: "5px",
        });

        elyStylesheet.global.add("::-webkit-scrollbar-thumb", {
            backgroundColor: darker.toString(),
        });
        this.__appColor = color;
    }

    /**
     * Изменяет цвет панели нацигации
     * @param color
     */
    public applyNavigationBarColor(color: elyColor): void {
        const isDarkerColor = color.isDarker();
        const borderColor = isDarkerColor ? color.getLighterColor(0.3) : color.getDarkerColor(0.05);
        const textColor = isDarkerColor ? elyColor.white() : new elyColor({hex: "#555555"});

        elyStylesheet.global.addClass("ef-navigation", {
            backgroundColor: color.toString(),
            borderBottomColor: borderColor.toString(),
        });

        elyStylesheet.global.addClass("ef-navigation li", {
            color: textColor.toString(),
        });
        this.__navigationBarColor = color;
    }

    /**
     * Возвращает текущий цвет приложения
     * @return {elyColor}
     */
    public getApplicationColor(): elyColor {
        return this.__appColor;
    }

    /**
     * Возвращает текущий цвет панели навигации
     * @return {elyColor}
     */
    public getNavigatonBarColor(): elyColor {
        return this.__navigationBarColor;
    }
}
