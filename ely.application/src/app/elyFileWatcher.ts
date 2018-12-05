
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
 + Файл: elyFileWatcher.ts                                                    +
 + Файл изменен: 23.11.2018 23:19:03                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyControl from "@controls/action/elyControl";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import elyObservable from "@core/observable/elyObservable";

/**
 * Отслеживание изменения файла
 */
export default class elyFileWatcher extends elyObservable {

    /**
     * Путь до файла
     */
    public filePath: string;

    /**
     * Последний размер файла
     */
    public lastFileSize: number = -1;

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

        const view = new elyControl();
        view.getStyle().backgroundColor = "rgb(110, 136, 73)";
        view.getStyle().textAlign = "center";
        view.getStyle().position = "fixed";
        view.getStyle().bottom = "0";
        view.getStyle().left = "0";
        view.getStyle().right = "0";
        view.getStyle().padding = "15px";
        const iconView = new elyIconView({iconName: "refresh"});
        iconView.iconSpinning(true);
        iconView.getStyle().marginLeft = "15px";
        const textView = new elyTextView({text: "Develop file watching"});
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
    public addListener(observer: (size: number) => void): elyFileWatcher {
        this.addObserver("changed", observer);
        return this;
    }

    /**
     * Запускает систему прослушивания
     */
    public start(): elyFileWatcher {
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
                }
            };
            xhr.send();
        }, 1000);
        return this;
    }

    public stop(): elyFileWatcher {
        if (this.thread) clearInterval(this.thread);
        return this;
    }
}
