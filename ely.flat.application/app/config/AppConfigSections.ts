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
 + Файл: efConfigSections.ts                                                  +
 + Файл изменен: 30.01.2019 00:26:47                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyViewEntityProtocol from "@controls/protocols/elyViewEntityProtocol";

/**
 * Секция конфигурации приложения: приложение
 */
export interface ConfigSection_app {
    /**
     * Заголовок - название приложения
     */
    title: string;

    /**
     * Автор приложения:
     *
     * По умолчанию: null
     */
    author?: string | null;
}

/**
 * Секция конфигурации приложения: манифест
 */
export interface ConfigSection_manifest {

    /**
     * Разрешает устанавливать приложение на домашний экран смартфона.
     * Используйте проверку {@link DeviceDetector}.
     * `DeviceDetector.default.isStandalone()`
     *
     * По умолчанию: true
     */
    allowStandaloneMode: boolean;

    /**
     * Использование мета тегов
     *
     * По умолчанию: true
     */
    useMeta: boolean;

    /**
     * Использование иконки приложения
     *
     * По умолчанию: true
     */
    useApplicationIcon: boolean;

    /**
     * Использование мета тэга viewport
     *
     * По умолчанию: true
     */
    useViewPort: boolean;

    /**
     * Использование основной навигации
     *
     * По умолчанию: true
     */
    useNavigationBar: boolean;

    /**
     * Использование контроллера контента
     *
     * По умолчанию: true
     */
    useContentController: boolean;

    /**
     * Использование роутинга контента
     *
     * По умолчанию: true
     */
    useContentRouter: boolean;

    /**
     * Использование режимы разработчика
     *
     * По умолчанию: false
     */
    useDevelopMode: boolean;

    /**
     * Использование корректирования экрана под iPhone X при standalone режиме
     *
     * По умолчанию: true
     */
    useIPhoneXStandaloneFix: boolean;

    /**
     * Индексы манифеста
     */
    [name: string]: boolean;
}

/**
 * Секция конфигурации приложения: шаблон -> подвал
 */
export interface ConfigSection_template_footer {
    /**
     * Основной текст подвала
     */
    title: string;

    /**
     * Подтекст подвала
     */
    subtitle: string;
}

/**
 * Секция конфигурации приложения: шаблон
 */
export interface ConfigSection_template {
    /**
     * Максимальная ширина контейнера
     *
     * По умолчанию: 700 (px)
     */
    maxContainerWidth: number | string;

    /**
     * Подвал
     */
    footer: ConfigSection_template_footer;

    /**
     * Основной цвет приложения (HEX)
     *
     * По умолчанию: #194d6d
     */
    color: string;
}

/**
 * Секция конфигурации приложения: контроллер контента
 */
export interface ConfigSection_contentController {

    /**
     * Стандартный идентификатор контроллера
     *
     * По умолчанию: index
     */
    defaultContentId: string;

    /**
     * Идентификатор контроллера с ошибкой
     *
     * По умолчанию: error
     */
    errorContentId: string;
}

/**
 * Секция конфигурации приложения: панель навигации
 */
export interface ConfigSection_navigationBar {

    /**
     * Текст на панели навигации
     *
     * По умолчанию: my.App{ }
     */
    title: string;

    /**
     * Подтекст панели навигации
     *
     * По умолчанию: null
     */
    subtitle?: string | null;

    /**
     * Расширенный стиль
     *
     * По умолчанию: false
     */
    extendedStyle: boolean;

    /**
     * Адрес картинки строки навигации
     */
    imageUrl?: string | null;

    /**
     * Цвет панели навигации
     */
    color?: string | null;

    /**
     * Массив элементов навигации
     */
    items: elyViewEntityProtocol[];
}

export interface ConfigSection_sideNavigationBar {
    /**
     * Разрешает отображение и скрытие боковой панели по наведению мыши.
     *
     * По умолчанию: true
     */
    allowMouseEvents: boolean;

    /**
     * Массив элементов навигации
     */
    items: elyViewEntityProtocol[];
}

/**
 * Секция конфигурации приложения: apple платформы
 */
export interface ConfigSection_meta_appleMobile {
    /**
     * Стиль статус бара.
     *
     * По умолчанию: black-translucent
     */
    statusBarStyle: string;
}

/**
 * Секция конфигурации: viewport
 */
export interface ConfigSection_meta_viewport {
    /**
     * Размер.
     *
     * По умолчанию: cover
     */
    fit: string;

    /**
     * Пользовательское масштабирование.
     *
     * По умолчанию: no
     */
    userScale: string;

    /**
     * Масштаб инциилизации.
     *
     * По умолчанию: 1.0
     */
    initialScale: number;

    /**
     * Максимальный масштаб.
     *
     * По умолчанию: 1.0
     */
    maximumScale: number;

    /**
     * Ширина.
     *
     * По умолчанию: device-width
     */
    width: string;
}

/**
 * Секция конфигурации: мета данные
 */
export interface ConfigSection_meta {
    /**
     * Кодировка
     *
     * По умолчанию: UTF-8
     */
    charset: string;

    /**
     * Путь до файлов иконок
     *
     * По умолчанию: resources/icon
     */
    iconPath: string;

    /**
     * Данные для webkit
     */
    appleMobile: ConfigSection_meta_appleMobile;

    /**
     * Данные viewport
     */
    viewport: ConfigSection_meta_viewport;
}

/**
 * Секция конфигурации: Разработка
 */
export interface ConfigSection_develop {
    /**
     * Главный скомпилированный файл приложения
     */
    appFile: string;
}

/**
 * Конфигурация приложения (интерфейс)
 */
export interface AppConfigInterface {

    /**
     * Секция: приложение
     * {@link ConfigSection_app}
     */
    app: ConfigSection_app;

    /**
     * Секция: манифест
     * {@link ConfigSection_manifest}
     */
    manifest: ConfigSection_manifest;

    /**
     * Секция: контроллер контента
     * {@link ConfigSection_contentController}
     */
    contentController: ConfigSection_contentController;

    /**
     * Секция: панель навигации
     * {@link ConfigSection_navigationBar}
     */
    navigationBar: ConfigSection_navigationBar;

    /**
     * Секция: боковая панель навигации
     * {@link ConfigSection_sideNavigationBar}
     */
    sideNavigationBar: ConfigSection_sideNavigationBar;

    /**
     * Секция: шаблон
     * {@link ConfigSection_template}
     */
    template: ConfigSection_template;

    /**
     * Секция: мета данные
     * {@link ConfigSection_meta}
     */
    meta: ConfigSection_meta;

    /**
     * Секция: разработка
     * {@link ConfigSection_develop}
     */
    develop: ConfigSection_develop;
}
