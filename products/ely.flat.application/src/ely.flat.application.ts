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
 + Файл: ely.flat.application.ts                                              +
 + Файл изменен: 30.11.2018 00:35:09                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatApplication from "../../../ely.application/src/app/elyFlatApplication";
import elyGridViewController from "../../../ely.controls.controllers/src/elyGridViewController";
import elyScreenController from "../../../ely.controls.controllers/src/elyScreenController";
import elySimplePageViewController from "../../../ely.controls.controllers/src/elySimplePageViewController";
import elyViewController from "../../../ely.controls.controllers/src/elyViewController";
import elyButton from "../../../ely.controls/src/action/elyButton";
import elyControl from "../../../ely.controls/src/action/elyControl";
import elyProgressView from "../../../ely.controls/src/action/elyProgressView";
import elyDataGridView from "../../../ely.controls/src/data/elyDataGridView";
import elyStylesheet from "../../../ely.controls/src/elyStylesheet";
import "../../../ely.controls/src/elyUIExt";
import elyComboField from "@controls/fields/elyComboField";
import elyField from "@controls/fields/elyField";
import elyFileChooseField from "@controls/fields/elyFileChooseField";
import elySwitchField from "@controls/fields/elySwitchField";
import elyTextAreaField from "@controls/fields/elyTextAreaField";
import elyTextField from "@controls/fields/elyTextField";
import elyGridRowView from "@controls/flex/elyGridRowView";
import elyGridView from "@controls/flex/elyGridView";
import elyStaticGridView from "@controls/flex/elyStaticGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyProgressNotificationView from "@controls/notification/elyProgressNotificationView";
import elyIconView from "@controls/text/elyIconView";
import elyLinkTextView from "@controls/text/elyLinkTextView";
import elyTextView from "@controls/text/elyTextView";
import elyTextViewEditable from "@controls/text/elyTextViewEditable";
import elyBodyView from "@controls/view/elyBodyView";
import elyImageView from "@controls/view/elyImageView";
import elyListView from "@controls/view/elyListView";
import elyModalView from "@controls/view/elyModalView";
import elyPanelView from "@controls/view/elyPanelView";
import elyScrollView from "@controls/view/elyScrollView";
import elyColor from "@core/elyColor";
import elyCookie from "@core/elyCookie";
import elyMath from "@core/elyMath";
import elyTime from "@core/elyTime";
import elyUtils from "@core/elyUtils";
import elyGetRequest from "@core/web/request/elyGetRequest";
import elyPostRequest from "@core/web/request/elyPostRequest";
import elyURL from "@core/web/url/elyURL";
import "@devMods/elyColorPicker.elymod/ely.module";
import "@devMods/elyUIWorkshop.elymod/ely.module";
import elyFieldType from "@enums/elyFieldType";
import elySize from "@enums/elySize";
import elyStyle from "@enums/elyStyle";
import elyWeight from "@enums/elyWeight";
//
//  Деклорации
//
declare global {

    interface Window {

        //
        //  Applicable
        //
        /**
         * Приложение
         */
        elyApplication: elyFlatApplication;

        /**
         * Таблица стилей
         */
        elyStylesheet: typeof elyStylesheet;

        /**
         * Контроллер экрана
         */
        elyScreen: elyScreenController;

        //
        //  Контроллеры
        //

        /**
         * Контроллер отображения
         */
        elyViewController: typeof elyViewController;

        /**
         * Контроллер отображения с сеткой
         */
        elyGridViewController: typeof elyGridViewController;

        /**
         * Контроллер отображения с сеткой
         */
        elySimplePageViewController: typeof elySimplePageViewController;

        //
        //  Элементы отображения
        //

        /**
         * Элемент отображения: Родительский элемент
         */
        elyView: typeof elyControl;

        /**
         * Элемент отображения: Кнопка
         */
        elyButton: typeof elyButton;

        /**
         * Элемент отображения: Текст
         */
        elyTextView: typeof elyTextView;

        /**
         * Элемент отображения: Текст с ссылкой
         */
        elyLinkTextView: typeof elyLinkTextView;

        /**
         * Элемент отображения: Иконка
         */
        elyIconView: typeof elyIconView;

        /**
         * Элемент отображения: Редактируемый текст
         */
        elyTextViewEditable: typeof elyTextViewEditable;

        /**
         * Элемент отображения: Тело документа
         */
        elyBodyView: elyBodyView;

        /**
         * Элемент отображения: Список
         */
        elyListView: typeof elyListView;

        /**
         * Элемент отображения: Картинка
         */
        elyImageView: typeof elyImageView;

        //
        //  Сложные элементы отображения
        //

        /**
         * Элемент отображения: Панель
         */
        elyPanelView: typeof elyPanelView;

        /**
         * Элемент отображения: Модальное окно
         */
        elyModalView: typeof elyModalView;

        /**
         * Элемент отображения: Динамическая сетка элементов
         */
        elyGridView: typeof elyGridView;

        /**
         * Элемент отображения: Динамическая строка элементов
         */
        elyGridRowView: typeof elyGridRowView;

        /**
         * Статичная сетка
         */
        elyStaticGridView: typeof elyStaticGridView;

        /**
         * Элемент отображения: Таблица данных
         */
        elyDataGridView: typeof elyDataGridView;

        /**
         * Элемент отображения: Полоса загрузки
         */
        elyProgressView: typeof elyProgressView;

        /**
         * Элемент отображения: Прокручивающийся элемент
         */
        elyScrollView: typeof elyScrollView;

        //
        //  Поля ввода
        //
        /**
         * Поле ввода (системное)
         */
        elyField: typeof elyField;

        /**
         * Поле ввода: Ввод текста
         */
        elyTextField: typeof elyTextField;

        /**
         * Поле ввода: Выбор элемента
         */
        elyComboField: typeof elyComboField;

        /**
         * Поле ввода: Переключатель
         */
        elySwitchField: typeof elySwitchField;

        /**
         * Поле ввода: Ввод многострочного текста
         */
        elyTextAreaField: typeof elyTextAreaField;

        /**
         * Поле ввода: Выбор файла
         */
        elyFileChooseField: typeof elyFileChooseField;

        //
        //  Оповещения
        //

        /**
         * Окно оповещения
         */
        elyNotificationView: typeof elyNotificationView;

        /**
         * Окно оповещения о процессе
         */
        elyProgressNotificationView: typeof elyProgressNotificationView;

        //
        //  Перечисления
        //

        /**
         * Размер
         */
        elySize: typeof elySize;

        /**
         * Стиль
         */
        elyStyle: typeof elyStyle;

        /**
         * Тип поля
         */
        elyFieldType: typeof elyFieldType;

        /**
         * Толщина
         */
        elyWeight: typeof elyWeight;

        //
        // Core
        //

        /**
         * Цвет
         */
        elyColor: typeof elyColor;

        /**
         * Математика
         */
        elyMath: typeof elyMath;

        /**
         * Куки данные
         */
        elyCookie: typeof elyCookie;

        /**
         * Время и дата
         */
        elyTime: typeof elyTime;

        /**
         * Утилиты
         */
        elyUtils: typeof elyUtils;

        /**
         * URL
         */
        elyURL: typeof elyURL;

        /**
         * GET запрос
         */
        elyGetRequest: typeof elyGetRequest;

        /**
         * POST запрос
         */
        elyPostRequest: typeof elyPostRequest;

        /**
         * Добавляет обработчик загрузки ely.flat
         * @param result
         */
        elyOnReady(result: (next: (result: boolean, reason?: string) => void) => void): void;

        /**
         * Отображает контроллер
         * @param viewController
         * @param completion
         */
        present(viewController: elyViewController, completion?: () => void): void;

        /**
         * Добавляет контроллер
         * @param name
         * @param viewController
         * @param canOverwrite
         */
        addController(name: string, viewController: elyViewController, canOverwrite: boolean): void;
    }
}

/*
window.elyApplication = elyFlatApplication.default;
window.elyStylesheet = elyStylesheet;
window.elyScreen = elyScreenController.default;

window.elyViewController = elyViewController;
window.elyGridViewController = elyGridViewController;
window.elySimplePageViewController = elySimplePageViewController;

window.elyView = elyControl;
window.elyButton = elyButton;
window.elyTextView = elyTextView;
window.elyLinkTextView = elyLinkTextView;
window.elyIconView = elyIconView;
window.elyTextViewEditable = elyTextViewEditable;
window.elyBodyView = elyBodyView.default;
window.elyImageView = elyImageView;
window.elyListView = elyListView;

window.elyPanelView = elyPanelView;
window.elyModalView = elyModalView;
window.elyGridView = elyGridView;
window.elyGridRowView = elyGridRowView;
window.elyDataGridView = elyDataGridView;
window.elyStaticGridView = elyStaticGridView;
window.elyProgressView = elyProgressView;
window.elyScrollView = elyScrollView;

window.elyField = elyField;
window.elyTextField = elyTextField;
window.elyComboField = elyComboField;
window.elySwitchField = elySwitchField;
window.elyTextAreaField = elyTextAreaField;
window.elyFileChooseField = elyFileChooseField;

window.elyNotificationView = elyNotificationView;
window.elyProgressNotificationView = elyProgressNotificationView;

window.elyWeight = elyWeight;
window.elySize = elySize;
window.elyStyle = elyStyle;

window.elyColor = elyColor;
window.elyCookie = elyCookie;
window.elyMath = elyMath;
window.elyTime = elyTime;
window.elyUtils = elyUtils;
window.elyURL = elyURL;
window.elyGetRequest = elyGetRequest;
window.elyPostRequest = elyPostRequest;*/

window.present = (viewController: elyViewController, completion?: () => void) => {
    elyScreenController.default.present(viewController, completion);
};

window.elyOnReady = (result: (next: (result: boolean, reason?: string) => void) => void): void => {
    elyFlatApplication.default.addReadyObserver(result);
};

window.addController = (name: string, viewController: elyViewController, canOverwrite: boolean = true): void => {
    elyScreenController.default.addControllerName(name, viewController, canOverwrite);
};

window.onload = () => {
    elyFlatApplication.loadApplication(() => {
        //
    });
};
