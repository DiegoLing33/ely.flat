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
 + Файл: elyWSOpenProjectWindow.ts                                            +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyFileChooseField from "@controls/fields/elyFileChooseField";
import elyGridView from "@controls/flex/elyGridView";
import elyModalView from "@controls/view/elyModalView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyFlatApplicationPreloader from "../../../../ely.application/src/app/content/elyFlatApplicationPreloader";
import elyWorkshop from "../elyWorkshop";

/**
 * Окно выбора файла
 */
export default class elyWSOpenProjectWindow {

    /**
     * Открывает окно
     * @param cb
     */
    public static present(cb: (obj: any) => void): void {
        const modalView = new elyModalView({modalTitle: "Открыть проект"});
        const grid = new elyGridView();
        const file = new elyFileChooseField({title: "Файл проекта (.elyws)"});
        file.addAcceptExtension(".elyws");
        file.maxFilesCount(1);
        grid.add(file);
        grid.add(new elyButton({text: "Открыть", fill: true}).click(() => {
            modalView.dismiss(true);
            elyFlatApplicationPreloader.default.showScreen("Загрузка проекта...{nl}Пожалуйста подождите!");
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    if (reader.result) {
                        const obj = JSON.parse(String(reader.result));
                        elyWorkshop.restoreSessionFromObject(obj, () => {
                            elyFlatApplicationPreloader.default.hideScreen();
                        });

                    } else {
                        throw Error("Не удалось прочитать файл...");
                    }
                } catch (e) {
                    elyFlatApplicationPreloader.default.hideScreen();
                    new elyNotificationView({title: "Ошибка открытия проекта", message: e.message}).present();
                }
            };
            reader.readAsText(file.value()[0]);
        }));
        modalView.modalContent(grid);
        modalView.present();

    }
}