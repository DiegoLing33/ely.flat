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
 + Файл: efCanvasLayer.ts                                                     +
 + Файл изменен: 28.12.2018 01:10:41                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import efContextElement from "@cnv/context/efContextElement";
import efContextImage from "@cnv/context/efContextImage";
import efContextRect from "@cnv/context/efContextRect";
import efContextText from "@cnv/context/efContextText";
import efSize from "@cnv/objs/efSize";
import View from "@core/controls/View";
import ef2DVectorValues from "@math/ef2DVectorValues";

export default class efCanvasLayer extends View {

    /**
     * Размеры
     */
    public readonly size: efSize = efSize.zero();

    /**
     * Контекст
     * @ignore
     */
    protected readonly _ctx: CanvasRenderingContext2D;

    /**
     * Конструктор
     */
    public constructor() {
        super({tag: "canvas"});
        this.addClass("ef-cnv-layer");
        this._ctx = this.getDocument().getContext("2d")!;
    }

    /**
     * Возвращает контекст
     * @return {CanvasRenderingContext2D}
     */
    public getContext(): CanvasRenderingContext2D {
        return this._ctx;
    }

    /**
     * Возвращает DOM объект
     */
    public getDocument(): HTMLCanvasElement {
        return super.getDocument() as HTMLCanvasElement;
    }

    /**
     * Отрисовывает объект {@link efContextElement}
     * @param {efContextElement|efContextRect|efContextImage} e
     */
    public draw(e: efContextElement): void {
        this.getContext().save();
        if (e.angle) this.rotateCanvas({vector: e.rect.position, size: e.rect.size, angle: e.angle});
        if (e.filter) this.getContext().filter = e.filter;
        if (e instanceof efContextRect) {
            if (e.fillColor) {
                this.getContext().fillStyle = e.fillColor.getHexString();
                this.getContext().fillRect(
                    e.rect.position.x,
                    e.rect.position.y,
                    e.rect.size.width(),
                    e.rect.size.height(),
                );
            }
            if (e.strokeColor) {
                this.getContext().strokeStyle = e.strokeColor.getHexString();
                this.getContext().lineWidth = e.strokeWidth;
                this.getContext().strokeRect(
                    e.rect.position.x,
                    e.rect.position.y,
                    e.rect.size.width(),
                    e.rect.size.height(),
                );
            }
        } else if (e instanceof efContextImage) {
            if (e.subImage) {
                this.getContext().drawImage(
                    e.image,
                    e.rect.position.x,
                    e.rect.position.y,
                    e.rect.size.width(),
                    e.rect.size.height(),
                    e.subImage.position.x,
                    e.subImage.position.y,
                    e.subImage.size.width(),
                    e.subImage.size.height(),
                );
            } else {
                this.getContext().drawImage(
                    e.image,
                    e.rect.position.x,
                    e.rect.position.y,
                    e.rect.size.width(),
                    e.rect.size.height(),
                );
            }
        } else if (e instanceof efContextText) {
            if (e.font) this.getContext().font = `${e.font.size}px ${e.font.fontName}`;
            if (e.alignCenter) this.getContext().textAlign = "center";
            if (e.strokeWidth) this.getContext().lineWidth = e.strokeWidth;
            const pieces = e.text.split("\n");
            let y = e.font.size;
            for (const str of pieces) {
                if (e.fillColor) {
                    this.getContext().fillStyle = e.fillColor.getHexString();
                    this.getContext().fillText(str, e.rect.position.x, e.rect.position.y + y, e.maxWidth);
                }
                if (e.strokeColor) {
                    this.getContext().strokeStyle = e.strokeColor.getHexString();
                    this.getContext().strokeText(str, e.rect.position.x, e.rect.position.y + y, e.maxWidth);
                }
                y += (e.font.size + e.lineSpacing);
            }

        }
        this.getContext().restore();
    }

    /**
     * Поворачивает холст относительно координаты и размера
     * @param {{ vector: ef2DVectorValues, size: efSize, angle: number }} props - параметры
     */
    public rotateCanvas(props: { vector: ef2DVectorValues, size: efSize, angle: number }): void {
        const pos = props.vector;
        const size = props.size;
        const angle = props.angle;
        this.getContext().translate(pos.x + (size.width() / 2), pos.y + (size.height() / 2));
        this.getContext().rotate(angle * Math.PI / 180);
        this.getContext().translate(-(pos.x + (size.width() / 2)), -(pos.y + (size.height() / 2)));
    }

    /**
     * Очищает слой
     */
    public clear(): efCanvasLayer {
        const size = this.size;
        this.getContext().clearRect(0, 0, size.width(), size.height());
        return this;
    }
}
