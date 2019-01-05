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
 + Файл: ely.flat.ts                                                          +
 + Файл изменен: 02.01.2019 14:04:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFileWatcher from "../ely.application/src/app/elyFileWatcher";
import elyFlatApplication from "../ely.application/src/app/elyFlatApplication";
import efCanvas from "../ely.flat.cnv/src/efCanvas";
import efCanvasLayer from "../ely.flat.cnv/src/efCanvasLayer";
import ef2DVector from "../ely.flat.cnv/src/objs/ef2DVector";
import ef2DVectorValues from "../ely.flat.cnv/src/objs/ef2DVectorValues";
import efOffset from "../ely.flat.cnv/src/objs/efOffset";
import efSize from "../ely.flat.cnv/src/objs/efSize";
import elyScreenController from "../ely.controls.controllers/src/elyScreenController";
import elySimplePageViewController from "../ely.controls.controllers/src/elySimplePageViewController";
import elyViewController from "../ely.controls.controllers/src/elyViewController";
import elyButton from "../ely.controls/src/action/elyButton";
import elyControl from "../ely.controls/src/action/elyControl";
import elyInput from "../ely.controls/src/action/elyInput";
import "../ely.controls/src/elyUIExt";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
import elyTextField from "@controls/fields/elyTextField";
import elyGridView from "@controls/flex/elyGridView";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import elyLinkTextView from "@controls/text/elyLinkTextView";
import elyTextView from "@controls/text/elyTextView";
import elyBodyView from "@controls/view/elyBodyView";
import elyImageView from "@controls/view/elyImageView";
import elyPanelView from "@controls/view/elyPanelView";
import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyXLogger from "@core/utils/elyXLogger";
import efDirection from "@enums/efDirection";
import efDirectionName from "@enums/efDirectionName";
import elyFieldType from "@enums/elyFieldType";
import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";
import elyColorPickerField from "@devMods/elyColorPicker.elymod/elyColorPickerField";
import elyStylesheet from "@controls/elyStylesheet";


/**
 * @interface elyViewOptions
 */

/**
 * @interface IPosition
 * @property {number|string} [top]
 * @property {number|string} [right]
 * @property {number|string} [bottom]
 * @property {number|string} [left]
 */

/**
 * @interface elyFlexGridViewOptions
 * @property {string?} title
 * @property {number[][]?} flex
 * @property {IPosition?} margin
 */

/**
 * @interface elySwitchFieldOptions
 * @augments {elyViewOptions}
 * @property {string?} title
 */


const elyOnReady = (result: (next: (result: boolean, reason?: string) => void) => void): void => {
    elyFlatApplication.default.addReadyObserver(result);
};

const addController = (name: string, viewController: elyViewController, canOverwrite: boolean = true): void => {
    elyScreenController.default.addControllerName(name, viewController, canOverwrite);
};

/**
 * Возвращает тело приложения
 */
const getBodyView = (): elyBodyView => {
    return elyBodyView.default;
};

const developMode = (bool: boolean) => {
    if (bool) {
        elyOnReady(next => {
            new elyFileWatcher({filePath: "js/index.js"}).start().addUpdateListener(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            });
            next(true);
        });
    }
};

window.onload = () => {
    elyXLogger.default.clear = true;
    elyFlatApplication.loadApplication(() => {
        //
    });
};

declare global {
    interface Window {
        elyflatobjects: any;
    }
}

window.elyflatobjects = {
    elyView,

    elyBodyView,
    elyButton,
    elyControl,

    elyLinkTextView,
    elyTextView,
    elyGridView,
    elyStaticGridView,
    elyPanelView,
    elyImageView,
    elyColorPickerField,

    elyInput,
    elyTextField,
    elyTextAreaField,

    elyScreenController,
    elyViewController,
    elySimplePageViewController,

    elyXLogger,
    elyUtils,
    elyFileWatcher,

    elySize,
    elyStyle,
    elyFieldType,
    efSize,
    efDirection,
    efDirectionName,

    ef2DVector,
    ef2DVectorValues,
    efOffset,
    efCanvas,
    efCanvasLayer,
};

export {
    getBodyView,
    elyOnReady,
    addController,
    developMode,

    elyStylesheet,
    elyFlatApplication,

    elyView,

    elyBodyView,
    elyControl,
    elyButton,
    elyColorPickerField,

    elyLinkTextView,
    elyTextView,
    elyGridView,
    elyStaticGridView,
    elyPanelView,
    elyImageView,

    elyInput,
    elyTextField,
    elyTextAreaField,

    elyScreenController,
    elyViewController,
    elySimplePageViewController,

    elyXLogger,
    elyUtils,
    elyFileWatcher,

    elySize,
    elyStyle,
    elyFieldType,
    efSize,
    efDirection,
    efDirectionName,

    ef2DVector,
    ef2DVectorValues,
    efOffset,
    efCanvas,
    efCanvasLayer,
};
