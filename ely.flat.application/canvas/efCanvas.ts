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
 + Файл: efCanvas.ts                                                          +
 + Файл изменен: 28.12.2018 01:10:10                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efCanvasLayer from "@cnv/efCanvasLayer";
import efSize from "@cnv/objs/efSize";
import View from "@core/controls/View";
import ObservableArray from "@core/observable/properties/ObservableArray";

/**
 * Холст
 */
export default class efCanvas extends View {

    /**
     * Размер холста
     */
    public readonly size: efSize = new efSize();

    /**
     * Слои
     */
    public readonly layers: ObservableArray<efCanvasLayer> = new ObservableArray<efCanvasLayer>();

    /**
     * Конструктор
     * @param {{size: efSize, layers?: efCanvasLayer[]}} props
     */
    public constructor(props: { size: efSize, layers?: efCanvasLayer[] }) {
        super();
        this.addClass("ef-cnv");

        this.size.heightProperty.change(value =>
            this.forEachLayer(layer => {
                layer.getDocument().height = value;
                layer.getStyle().height = value + "px";
                layer.size.height(value);
            }));

        this.size.widthProperty.change(value =>
            this.forEachLayer(layer => {
                layer.getDocument().width = value;
                layer.getStyle().width = value + "px";
                layer.size.width(value);
            }));

        this.size.width(props.size.width());
        this.size.height(props.size.height());

        this.layers.change(() => {
            this.removeViewContent();
            this.layers.get().forEach((layer, i) => {
                this.getDocument().append(layer.getDocument());
                layer.getStyle().zIndex = String(i + 1);
            });

            this.size.width(this.size.width());
            this.size.height(this.size.height());
        });
    }

    /**
     * Цикл по слоям
     * @param cb
     */
    public forEachLayer(cb: (layer: efCanvasLayer, index: number) => void): efCanvas {
        this.layers.get().forEach((value, index) => {
            cb(value, index);
        });
        return this;
    }
}
