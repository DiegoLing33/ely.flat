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

import "../controls/elyUIExt"
import {Time, Guard, XLogger, DeviceDetector, Color, Timer, Utils, ColorUtils} from "ely.core";
import Application from "../app/app/Application";
import ViewController from "../controllers/ViewController";
import ScreenController from "../controllers/ScreenController";
import NavigationView from "../controls/navigation/NavigationView";
import SingleApp, {TefSingleInit} from "../app/SingleApp";
import {deserialize} from "../protocols/efSerializableProtocol";
import {efxApp} from "../efxApp/efxApp";
import AppDevelopConsole from "../app/develop/AppDevelopConsole";
import {isNone, isSet, safeJsonParse, variableAndSet, variable} from "ely.core/dist/utils/Guard";
import Observable from "ely.core/dist/observable/Observable";
import ObservableArray from "ely.core/dist/observable/properties/ObservableArray";
import ObservableBoolean from "ely.core/dist/observable/properties/ObservableBoolean";
import ObservableDictionary from "ely.core/dist/observable/properties/ObservableDictionary";
import ObservableProperty from "ely.core/dist/observable/properties/ObservableProperty";
import URLRequest, {URLRequestHeaderName, URLRequestMethod} from "ely.core/dist/web/request/URLRequest";
import SendFileRequest from "ely.core/dist/web/request/SendFileRequest";
import SendJsonRequest from "ely.core/dist/web/request/SendJsonRequest";
import AppStylesheet from "../app/AppStylesheet";
import LocalStorage from "ely.core/dist/user/LocalStorage";
import AppFileWatcher from "../app/app/AppFileWatcher";
import Control from "../controls/action/Control";
import View from "../core/controls/View";
import SimplePageViewController from "../controllers/SimplePageViewController";
import GridViewController from "../controllers/GridViewController";
import Style from "../enums/Style";
import Size from "../enums/Size";
import Weight from "../enums/Weight";
import TextFieldType from "../enums/TextFieldType";
import TextView from "../controls/text/TextView";
import LinkTextView from "../controls/text/LinkTextView";
import IconView from "../controls/text/IconView";
import HeaderTextView from "../controls/text/HeaderTextView";
import Button from "../controls/action/Button";
import ListView from "../controls/list/ListView";
import Field from "../controls/input/Field";
import TextField from "../controls/input/TextField";
import TextAreaField from "../controls/input/TextAreaField";
import SwitchField from "../controls/input/SwitchField";
import GroupedDataField from "../controls/input/data/GroupedDataField";
import SelectField from "../controls/input/SelectField";
import DictionaryDataField from "../controls/input/data/DictionaryDataField";
import RowLayoutView from "../controls/layout/RowLayoutView";
import GridLayoutView from "../controls/layout/GridLayoutView";
import StaticGridLayoutView from "../controls/layout/StaticGridLayoutView";
import BoxView from "../controls/content/BoxView";
import BoxHeaderView from "../controls/content/BoxHeaderView";
import PanelView from "../controls/content/PanelView";
import TabsPanelView from "../controls/content/TabsPanelView";
import ImageView from "../controls/view/ImageView";
import ModalView from "../controls/view/ModalView";
import NotificationView from "../controls/notification/NotificationView";
import elyProgressNotificationView from "../controls/notification/elyProgressNotificationView";
import ProgressBarView from "../controls/action/ProgressBarView";
import CircularProgressBarView from "../controls/action/CircularProgressBarView";
import PreloaderView from "../controls/view/PreloaderView";
import YouTubePlayer from "../controls/media/YouTubePlayer";
import VideoPlayer from "../controls/media/VideoPlayer";

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
const navigationBar = (): NavigationView => {
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
    navigationBar,
    screenController,

    deserialize,
    AppDevelopConsole,
    efxApp,

    // elyGuard
    Guard,

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

    LocalStorage,

    XLogger,
    Utils,
    ColorUtils,
    AppFileWatcher,

    Control,

    View,

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
    TextAreaField,
    SwitchField,
    SelectField,

    GroupedDataField,
    DictionaryDataField,

    RowLayoutView,
    GridLayoutView,
    StaticGridLayoutView,

    BoxView,
    BoxHeaderView,

    PanelView,
    TabsPanelView,
    ImageView,

    NavigationView,
    ModalView,
    NotificationView,
    elyProgressNotificationView,
    ProgressBarView,
    CircularProgressBarView,

    PreloaderView,

    YouTubePlayer,
    VideoPlayer,
};

// @ts-ignore
/** exporting */
export {
    // Types
    app,
    navigationBar,
    elyOnReady,
    addController,
    screenController,

    deserialize,

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
    TextAreaField,
    SwitchField,
    SelectField,

    GroupedDataField,
    DictionaryDataField,

    RowLayoutView,
    GridLayoutView,
    StaticGridLayoutView,

    BoxView,
    BoxHeaderView,

    PanelView,
    TabsPanelView,
    ImageView,

    NavigationView,
    ModalView,
    NotificationView,
    elyProgressNotificationView,
    ProgressBarView,
    CircularProgressBarView,

    PreloaderView,

    YouTubePlayer,
    VideoPlayer,
};
