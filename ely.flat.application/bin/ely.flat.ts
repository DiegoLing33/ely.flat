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

import efApplication from "@app/app/efApplication";
import elyFileWatcher from "@app/app/elyFileWatcher";
import {efAppDevelopConsole} from "@app/develop/efAppDevelopConsole";
import efCanvas from "@cnv/efCanvas";
import efCanvasLayer from "@cnv/efCanvasLayer";
import efSize from "@cnv/objs/efSize";
import elyGridViewController from "@controllers/elyGridViewController";
import elyScreenController from "@controllers/elyScreenController";
import elySimplePageViewController from "@controllers/elySimplePageViewController";
import elyViewController from "@controllers/elyViewController";
import {efButton} from "@controls/action/efButton";
import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elyProgressView from "@controls/action/elyProgressView";
import {efPanelView} from "@controls/content/efPanelView";
import {elyDataGridView} from "@controls/data/elyDataGridView";
import elyStylesheet from "@controls/elyStylesheet";
import "@controls/elyUIExt";
import elyGridView from "@controls/flex/elyGridView";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import {efField} from "@controls/input/efField";
import {efSwitchField} from "@controls/input/efSwitchField";
import {efTextField} from "@controls/input/efTextField";
import {efGridLayoutView} from "@controls/layout/efGridLayoutView";
import {efRowLayoutView} from "@controls/layout/efRowLayoutView";
import {efListView} from "@controls/list/efListView";
import {efNavigationView} from "@controls/navigation/efNavigationView";
import {efNotificationView} from "@controls/notification/efNotificationView";
import elyProgressNotificationView from "@controls/notification/elyProgressNotificationView";
import {efHeaderTextView} from "@controls/text/efHeaderTextView";
import {efIconView} from "@controls/text/efIconView";
import {efLinkTextView} from "@controls/text/efLinkTextView";
import {efTextView} from "@controls/text/efTextView";
import elyIconView from "@controls/text/elyIconView";
import elyTextView from "@controls/text/elyTextView";
import elyTextViewEditable from "@controls/text/elyTextViewEditable";
import {efImageView} from "@controls/view/efImageView";
import {efModalView} from "@controls/view/efModalView";
import {efPreloaderView} from "@controls/view/efPreloaderView";
import {elyFormView} from "@controls/view/elyFormView";
import elyScrollView from "@controls/view/elyScrollView";
import elyTableView from "@controls/view/elyTableView";
import elyView from "@core/controls/elyView";
import elyColor from "@core/elyColor";
import {elyColorUtils} from "@core/elyColorUtils";
import elyCookie from "@core/elyCookie";
import elyDeviceDetector from "@core/elyDeviceDetector";
import elyGuard from "@core/elyGuard";
import elySimpleJSONParser from "@core/elySimpleJSONParser";
import {elyTime} from "@core/elyTime";
import elyTimer from "@core/elyTimer";
import elyUtils from "@core/elyUtils";
import elyXLogger from "@core/utils/elyXLogger";
import elyGetRequest from "@core/web/request/elyGetRequest";
import elyPostRequest from "@core/web/request/elyPostRequest";
import elyURL from "@core/web/url/elyURL";
import elyColorPickerField from "@devMods/elyColorPicker.elymod/elyColorPickerField";
import elyAxis from "@enums/elyAxis";
import elyDirection from "@enums/elyDirection";
import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";
import Size from "@enums/Size";
import Style from "@enums/Style";
import TextFieldType from "@enums/textFieldType";
import Weight from "@enums/Weight";
import {elyDataPickerField} from "@fields/elyDataPickerField";
import {elyTextField} from "@fields/elyTextField";
import ef2DVector from "@math/ef2DVector";
import ef2DVectorValues from "@math/ef2DVectorValues";
import {TefSingleInit} from "@app/efSingleApp";
import {efSingleApp} from "../app/efSingleApp";
import {efxApp} from "@efxApp/efxApp";

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
    efApplication.default.addReadyObserver(result);
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
 * Возвращает приложение
 * @return {efApplication}
 */
const app = (): efApplication => {
    return efApplication.default;
};

/**
 * Возвращает навигацию
 * @return {efNavigationView}
 */
const navigation = (): efNavigationView => {
    return app().getApplicationNavigationView();
};

window.onload = () => {

    elyXLogger.default.clear = true;
    if (efSingleApp.isUsesSingle()) {
        efSingleApp.applicationInitFunction = window.efSingleInit!;
        Object.keys(window.elyflatobjects).forEach(value => {
            window[value] = window.elyflatobjects[value];
        });
    }
    efApplication.loadApplication(() => {
    });
};
declare global {
    interface Window {
        elyflatobjects: any;
        efSingleInit?: TefSingleInit;

        [key: string]: any;
    }
}

/**
 * @param {*} config
 * @return {function(vc: elySimplePageViewController)}
 */
window.efSingleInit = window.efSingleInit || undefined;

window.elyflatobjects = {
    app,
    navigation,
    elyOnReady,
    addController,

    efxApp,

    elyStylesheet,
    efApplication,

    elyTime,
    elyDeviceDetector,
    elyColor,
    elyGuard,
    elyTimer,
    elyCookie,

    elyXLogger,
    elySimpleJSONParser,
    elyUtils,
    elyColorUtils,
    elyFileWatcher,

    elyURL,
    elyGetRequest,
    elyPostRequest,

    elyView,

    elyControl,

    elyIconView,
    elyTextViewEditable,

    elyProgressView,
    elyTextView,
    elyGridView,
    elyStaticGridView,
    efImageView,
    elyFormView,
    elyDataGridView,
    efNotificationView,
    elyProgressNotificationView,

    efModalView,
    elyScrollView,
    elyTableView,

    elyInput,
    elyTextField,
    elyDataPickerField,
    elyColorPickerField,

    elyScreenController,
    elyViewController,
    elySimplePageViewController,
    elyGridViewController,

    Style,
    Size,
    Weight,
    TextFieldType,

    elySize,
    elyStyle,
    efSize,
    elyAxis,
    elyDirection,

    ef2DVector,
    ef2DVectorValues,
    efCanvas,
    efCanvasLayer,

    efTextView,
    efLinkTextView,
    efIconView,
    efHeaderTextView,

    efButton,

    efListView,

    efField,
    efTextField,
    efSwitchField,

    efRowLayoutView,
    efGridLayoutView,

    efPanelView,

    efNavigationView,

    efPreloaderView,

    efAppDevelopConsole,
};

// @ts-ignore
/** exporting */
export {
    app,
    navigation,
    elyOnReady,
    addController,

    efxApp,

    elyStylesheet,
    efApplication,

    elyTime,
    elyDeviceDetector,
    elyColor,
    elyGuard,
    elyTimer,
    elyCookie,

    elyXLogger,
    elySimpleJSONParser,
    elyUtils,
    elyColorUtils,
    elyFileWatcher,

    elyURL,
    elyGetRequest,
    elyPostRequest,

    elyView,

    elyControl,

    elyIconView,
    elyTextViewEditable,

    elyProgressView,
    elyTextView,
    elyGridView,
    elyStaticGridView,
    efImageView,
    elyFormView,
    elyDataGridView,
    efNotificationView,
    elyProgressNotificationView,

    efModalView,
    elyScrollView,
    elyTableView,

    elyInput,
    elyTextField,
    elyDataPickerField,
    elyColorPickerField,

    elyScreenController,
    elyViewController,
    elySimplePageViewController,
    elyGridViewController,

    Style,
    Size,
    Weight,
    TextFieldType,

    elySize,
    elyStyle,
    efSize,
    elyAxis,
    elyDirection,

    ef2DVector,
    ef2DVectorValues,
    efCanvas,
    efCanvasLayer,

    efTextView,
    efLinkTextView,
    efIconView,
    efHeaderTextView,

    efButton,

    efListView,

    efField,
    efTextField,
    efSwitchField,

    efRowLayoutView,
    efGridLayoutView,

    efPanelView,

    efNavigationView,

    efPreloaderView,
};