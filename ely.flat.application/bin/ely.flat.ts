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

import Application from "@app/app/Application";
import AppFileWatcher from "@app/app/AppFileWatcher";
import SingleApp, {TefSingleInit} from "@app/SingleApp";
import GridViewController from "@controllers/GridViewController";
import ScreenController from "@controllers/ScreenController";
import SimplePageViewController from "@controllers/SimplePageViewController";
import ViewController from "@controllers/ViewController";
import Button from "@controls/action/Button";
import Control from "@controls/action/Control";
import AppStylesheet from "@app/AppStylesheet";
import PanelView from "@controls/content/PanelView";
import "@controls/elyUIExt";
import Field from "@controls/input/Field";
import SwitchField from "@controls/input/SwitchField";
import TextField from "@controls/input/TextField";
import GridLayoutView from "@controls/layout/GridLayoutView";
import RowLayoutView from "@controls/layout/rowLayoutView";
import ListView from "@controls/list/ListView";
import NavigationView from "@controls/navigation/navigationView";
import HeaderTextView from "@controls/text/HeaderTextView";
import IconView from "@controls/text/IconView";
import LinkTextView from "@controls/text/LinkTextView";
import TextView from "@controls/text/TextView";
import ImageView from "@controls/view/ImageView";
import ModalView from "@controls/view/ModalView";
import PreloaderView from "@controls/view/PreloaderView";
import Color from "@core/Color";
import {ColorUtils} from "@core/ColorUtils";
import View from "@core/controls/View";
import Cookies from "@core/Cookies";
import DeviceDetector from "@core/DeviceDetector";
import {isNone, isSet, safeJsonParse, variable, variableAndSet} from "@core/Guard";
import Observable from "@core/observable/Observable";
import ObservableArray from "@core/observable/properties/ObservableArray";
import ObservableBoolean from "@core/observable/properties/ObservableBoolean";
import ObservableDictionary from "@core/observable/properties/ObservableDictionary";
import ObservableProperty from "@core/observable/properties/ObservableProperty";
import Time from "@core/Time";
import Timer from "@core/Timer";
import Utils from "@core/Utils";
import SendFileRequest from "@core/web/request/SendFileRequest";
import SendJsonRequest from "@core/web/request/sendJsonRequest";
import URLRequest, {URLRequestHeaderName, URLRequestMethod} from "@core/web/request/URLRequest";
import {efxApp} from "@efxApp/efxApp";
import Size from "@enums/Size";
import Style from "@enums/Style";
import TextFieldType from "@enums/TextFieldType";
import Weight from "@enums/Weight";
import XLogger from "@core/utils/XLogger";
import AppDevelopConsole from "@app/develop/appDevelopConsole";
import NotificationView from "@controls/notification/notificationView";

/**
 *
 * @param result
 */
const elyOnReady = (result: (next: (result: boolean, reason?: string) => void) => void): void => {
    Application.default.addReadyObserver(result);
};

/**
 *
 * @param name
 * @param viewController
 * @param canOverwrite
 */
const addController = (name: string, viewController: ViewController, canOverwrite: boolean = true): void => {
    Application.default.getApplicationScreenController().addControllerName(name, viewController, canOverwrite);
};

/**
 * Возвращает приложение
 * @return {Application}
 */
const app = (): Application => {
    return Application.default;
};

/**
 * Возвращает контроллер экранов
 * @return {ScreenController}
 */
const screenController = (): ScreenController => {
    return app().getApplicationScreenController();
}

/**
 * Возвращает навигацию
 * @return {NavigationView}
 */
const navigation = (): NavigationView => {
    return app().getApplicationNavigationView();
};

window.onload = () => {
    XLogger.default.clear = true;
    if (SingleApp.isUsesSingle()) {
        SingleApp.applicationInitFunction = window.efSingleInit!;
        Object.keys(window.elyflatobjects).forEach(value => {
            window[value] = window.elyflatobjects[value];
        });
    }
    Application.loadApplication(() => {
        //
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
 * @return {function(vc: SimplePageViewController)}
 */
window.efSingleInit = window.efSingleInit || (window.ef || null);

window.elyflatobjects = {
    addController,
    app,
    elyOnReady,
    navigation,
    screenController,

    AppDevelopConsole,
    efxApp,

    // elyGuard

    isNone,
    isSet,
    safeJsonParse,
    variable,
    variableAndSet,

    // elyObservable
    Observable,
    ObservableArray,
    ObservableBoolean,
    ObservableDictionary,
    ObservableProperty,

    // elyRequest
    URLRequest,
    URLRequestHeaderName,
    URLRequestMethod,

    SendFileRequest,
    SendJsonRequest,

    AppStylesheet,
    Application,

    DeviceDetector,
    Color,
    Time,
    Timer,
    Cookies,

    XLogger,
    Utils,
    ColorUtils,
    AppFileWatcher,

    View,

    Control,

    ScreenController,
    ViewController,
    SimplePageViewController,
    GridViewController,

    Style,
    Size,
    Weight,
    TextFieldType,

    TextView,
    LinkTextView,
    IconView,
    HeaderTextView,

    Button,

    ListView,

    Field,
    TextField,
    SwitchField,

    RowLayoutView,
    GridLayoutView,

    PanelView,
    ImageView,

    NavigationView,
    ModalView,
    NotificationView,

    PreloaderView,
};

// @ts-ignore
/** exporting */
export {
    // Types
    app,
    navigation,
    elyOnReady,
    addController,
    screenController,

    efxApp,
    AppDevelopConsole,

    // elyGuard
    variable,
    variableAndSet,
    isSet,
    isNone,
    safeJsonParse,

    // elyObservable
    Observable,
    ObservableProperty,
    ObservableArray,
    ObservableDictionary,
    ObservableBoolean,

    // elyRequest
    URLRequest,
    URLRequestMethod,
    URLRequestHeaderName,

    SendJsonRequest,
    SendFileRequest,

    AppStylesheet,
    Application,

    Time,
    DeviceDetector,
    Color,
    Timer,
    Cookies,

    XLogger,
    Utils,
    ColorUtils,
    AppFileWatcher,

    View,

    Control,

    ScreenController,
    ViewController,
    SimplePageViewController,
    GridViewController,

    Style,
    Size,
    Weight,
    TextFieldType,

    TextView,
    LinkTextView,
    IconView,
    HeaderTextView,

    Button,

    ListView,

    Field,
    TextField,
    SwitchField,

    RowLayoutView,
    GridLayoutView,

    PanelView,
    ImageView,

    NavigationView,
    ModalView,
    NotificationView,

    PreloaderView,
};
