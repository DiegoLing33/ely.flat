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
 + Проект: ely.flat.application                                               +
 +                                                                            +
 + Файл: AppFileWatcher.ts                                                    +
 + Файл изменен: 23.11.2018 23:19:03                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import {Observers} from "ely.core";
import Control from "../../controls/action/Control";
import IconView from "../../controls/text/IconView";
import TextView from "../../controls/text/TextView";

/**
 * Отслеживание изменения файла
 */
export default class AppFileWatcher extends Observers.Observable {

    /**
     * Путь до файла
     */
    public filePath: string;

    /**
     * Последний размер файла
     */
    public lastFileSize: number = -1;

    /**
     * Стартовое значение на первой итерации
     */
    public startValue: number | null = null;

    /**
     * Поток
     */
    protected thread: any | null = null;

    /**
     * Конструктор
     * @param options
     */
    constructor(options: { filePath: string }) {
        super();
        this.filePath = options.filePath;

        const view = new Control();
        view.getStyle().backgroundColor = "rgb(110, 136, 73)";
        view.getStyle().textAlign = "center";
        view.getStyle().position = "fixed";
        view.getStyle().bottom = "0";
        view.getStyle().left = "0";
        view.getStyle().right = "0";
        view.getStyle().zIndex = "1000";
        view.getStyle().padding = "15px";
        const iconView = new IconView({iconName: "refresh"});
        iconView.spinning(true);
        iconView.getStyle().marginLeft = "15px";
        const textView = new TextView({text: "Develop file watching"});
        textView.getStyle().display = "inline-block";
        view.addSubView(textView);
        view.addSubView(iconView);
        document.body.append(view.getDocument());
        this.addListener((size) => {
            textView.text(`Develop file watching. Size: *${size}* bytes`);
        });
    }

    /**
     * Добавляет слушатель изменения файла
     * @param observer
     */
    public addListener(observer: (size: number) => void): AppFileWatcher {
        this.addObserver("changed", observer);
        return this;
    }

    /**
     * Добавляет слушатель изменения файла по отношению к первоначальной стадии
     * @param observer
     */
    public addUpdateListener(observer: (size: number) => void): AppFileWatcher {
        this.addObserver("updated", observer);
        return this;
    }

    /**
     * Запускает систему прослушивания
     */
    public start(): AppFileWatcher {
        this.thread = setInterval(() => {
            const xhr = new XMLHttpRequest();
            xhr.open("HEAD", this.filePath, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === xhr.DONE) {
                    const size = Math.round(parseInt(xhr.getResponseHeader("Content-Length") || "0", 10)
                        / (1024) * 100) / 100;
                    if (this.lastFileSize === -1) this.lastFileSize = size;
                    if (size !== this.lastFileSize) this.notificate("changed", [size]);
                    this.lastFileSize = size;
                    if (this.startValue === null) this.startValue = size;
                    if (this.startValue !== size) this.notificate("updated", [size]);
                }
            };
            xhr.send();
        }, 1000);
        return this;
    }

    public stop(): AppFileWatcher {
        if (this.thread) clearInterval(this.thread);
        return this;
    }
}
