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

import "@controls/elyUIExt";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
import elyGridView from "@controls/flex/elyGridView";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyXLogger from "@core/utils/elyXLogger";
import elyAxis from "@enums/elyAxis";
import elyDirection from "@enums/elyDirection";
import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";
import elyColorPickerField from "@devMods/elyColorPicker.elymod/elyColorPickerField";
import elyStylesheet from "@controls/elyStylesheet";
import {elyFormView} from "@controls/view/elyFormView";
import {elyTextField} from "@fields/elyTextField";
import {elyDataPickerField} from "@fields/elyDataPickerField";
import elyScreenController from "@controllers/elyScreenController";
import elyViewController from "@controllers/elyViewController";
import elyFileWatcher from "@app/app/elyFileWatcher";
import elyControl from "@controls/action/elyControl";
import elyInput from "@controls/action/elyInput";
import elySimplePageViewController from "@controllers/elySimplePageViewController";
import efSize from "@cnv/objs/efSize";
import ef2DVector from "@math/ef2DVector";
import ef2DVectorValues from "@math/ef2DVectorValues";
import efCanvasLayer from "@cnv/efCanvasLayer";
import efCanvas from "@cnv/efCanvas";
import elyGridViewController from "@controllers/elyGridViewController";
import elyProgressView from "@controls/action/elyProgressView";
import {elyDataGridView} from "@controls/data/elyDataGridView";
import elyProgressNotificationView from "@controls/notification/elyProgressNotificationView";
import elyIconView from "@controls/text/elyIconView";
import elyTextViewEditable from "@controls/text/elyTextViewEditable";
import elyScrollView from "@controls/view/elyScrollView";
import elyTableView from "@controls/view/elyTableView";
import elyDeviceDetector from "@core/elyDeviceDetector";
import {elyTime} from "@core/elyTime";
import elyColor from "@core/elyColor";
import elyGuard from "@core/elyGuard";
import elyTimer from "@core/elyTimer";
import elyCookie from "@core/elyCookie";
import {elyColorUtils} from "@core/elyColorUtils";
import elySimpleJSONParser from "@core/elySimpleJSONParser";
import elyPostRequest from "@core/web/request/elyPostRequest";
import elyGetRequest from "@core/web/request/elyGetRequest";
import elyURL from "@core/web/url/elyURL";
import efApplication from "@app/app/efApplication";
import {efTextView} from "@controls/text/efTextView";
import {efListView} from "@controls/list/efListView";
import {efNavigationView} from "@controls/navigation/efNavigationView";
import {efLinkTextView} from "@controls/text/efLinkTextView";
import {efButton} from "@controls/action/efButton";
import Style from "@enums/Style";
import Size from "@enums/Size";
import Weight from "@enums/Weight";
import {efIconView} from "@controls/text/efIconView";
import {efTextField} from "@controls/input/efTextField";
import TextFieldType from "@enums/textFieldType";
import {efField} from "@controls/input/efField";
import {efHeaderTextView} from "@controls/text/efHeaderTextView";
import {efSwitchField} from "@controls/input/efSwitchField";
import {efRowLayoutView} from "@controls/layout/efRowLayoutView";
import {efGridLayoutView} from "@controls/layout/efGridLayoutView";
import {efPanelView} from "@controls/content/efPanelView";
import {efAppDevelopConsole} from "@app/develop/efAppDevelopConsole";
import {efPreloaderView} from "@controls/view/efPreloaderView";
import {efModalView} from "@controls/view/efModalView";
import {efImageView} from "@controls/view/efImageView";
import {efNotificationView} from "@controls/notification/efNotificationView";


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
    efApplication.loadApplication(() => {
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
    elyColor,

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

    efTextView,
    efLinkTextView,
    efIconView,
    efButton,

    efListView,

    efNavigationView,

    efAppDevelopConsole,
};

// @ts-ignore
export {
    app,
    navigation,
    elyOnReady,
    addController,
    developMode,

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
