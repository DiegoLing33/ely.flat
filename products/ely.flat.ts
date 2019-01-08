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
import ef2DVector from "../ely.flat.math/src/ef2DVector";
import ef2DVectorValues from "../ely.flat.math/src/ef2DVectorValues";
import efSize from "../ely.flat.cnv/src/objs/efSize";
import elyScreenController from "../ely.controls.controllers/src/elyScreenController";
import elySimplePageViewController from "../ely.controls.controllers/src/elySimplePageViewController";
import elyViewController from "../ely.controls.controllers/src/elyViewController";
import elyButton from "../ely.controls/src/action/elyButton";
import elyControl from "../ely.controls/src/action/elyControl";
import elyInput from "../ely.controls/src/action/elyInput";
import "../ely.controls/src/elyUIExt";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
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
import elyAxis from "@enums/elyAxis";
import elyDirection from "@enums/elyDirection";
import elyFieldType from "@enums/elyFieldType";
import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";
import elyColorPickerField from "@devMods/elyColorPicker.elymod/elyColorPickerField";
import elyStylesheet from "@controls/elyStylesheet";
import {elyFormView} from "@controls/view/elyFormView";
import {elyTextField} from "@fields/elyTextField";
import {elyDataPickerField} from "@fields/elyDataPickerField";
import {elySwitchField} from "@fields/elySwitchField";


/**
 * @interface elyViewOptions
 */

/**
 * @typedef {Object} IPosition
 * @property {number|string} [top]
 * @property {number|string} [right]
 * @property {number|string} [bottom]
 * @property {number|string} [left]
 */

/**
 * @typedef {Object} elyFlexGridViewOptions
 * @property {number[][]} [flex]
 * @property {IPosition} [margin]
 */

/**
 * @typedef {elyFlexGridViewOptions} elyFormViewOptions
 * @property {boolean} [checkEmpty = true] - проверка на пустоту
 * @property {boolean} [detectSubmitButton = true] - автоопределение кнопки submit
 * @property {boolean} [checkValidation = true] - проверка валидации
 */

/**
 * @typedef {Object} elyFieldViewOptions
 * @property {string} [placeholder]
 * @property {boolean} [editable]
 * @property {string} [hint]
 */

/**
 * @typedef {elyFieldViewOptions} elySwitchFieldOptions
 * @property {string} [title]
 * @property {boolean} [value]
 */

/**
 * @typedef {elyFieldOptions} elyDataPickerFieldOptions
 * @property {number} [maxTipsCount]
 * @property {Object|string[]} [items]
 * @property {*} [value]
 */

/**
 * @typedef {elyFieldOptions} elyTextFieldOptions
 * @property {elyFieldType} [fieldType]
 * @property {boolean} [encrypted]
 * @property {string} [fieldIcon]
 * @property {string} [value]
 */

/**
 *
 * @param result
 */
const elyOnReady = (result: (next: (result: boolean, reason?: string) => void) => void): void => {
    elyFlatApplication.default.addReadyObserver(result);
};

/**
 *
 * @param name
 * @param viewController
 * @param canOverwrite
 */
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
    elyAxis,
    elyDirection,

    ef2DVector,
    ef2DVectorValues,
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
    elyFormView,

    elyInput,
    elyTextField,
    elySwitchField,
    elyDataPickerField,

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
    elyAxis,
    elyDirection,

    ef2DVector,
    ef2DVectorValues,
    efCanvas,
    efCanvasLayer,
};
