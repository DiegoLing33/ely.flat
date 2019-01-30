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
export interface efConfigSection_app {
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
export interface efConfigSection_manifest {

    /**
     * Разрешает устанавливать приложение на домашний экран смартфона.
     * Используйте проверку {@link elyDeviceDetector}.
     * `elyDeviceDetector.default.isStandalone()`
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
     * Использование боковой навигации
     *
     * По умолчанию: false
     */
    useSideNavigationBar: boolean;

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
export interface efConfigSection_template_footer {
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
export interface efConfigSection_template {
    /**
     * Максимальная ширина контейнера
     *
     * По умолчанию: 700 (px)
     */
    maxContainerWidth: number | string;

    /**
     * Подвал
     */
    footer: efConfigSection_template_footer;

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
export interface efConfigSection_contentController {

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
export interface efConfigSection_navigationBar {

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

export interface efConfigSection_sideNavigationBar {
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
export interface efConfigSection_meta_appleMobile {
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
export interface efConfigSection_meta_viewport {
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
export interface efConfigSection_meta {
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
    appleMobile: efConfigSection_meta_appleMobile;

    /**
     * Данные viewport
     */
    viewport: efConfigSection_meta_viewport;
}

/**
 * Конфигурация приложения (интерфейс)
 */
export interface efAppConfigInterface {

    /**
     * Секция: приложение
     * {@link efConfigSection_app}
     */
    app: efConfigSection_app;

    /**
     * Секция: манифест
     * {@link efConfigSection_manifest}
     */
    manifest: efConfigSection_manifest;

    /**
     * Секция: контроллер контента
     * {@link efConfigSection_contentController}
     */
    contentController: efConfigSection_contentController;

    /**
     * Секция: панель навигации
     * {@link efConfigSection_navigationBar}
     */
    navigationBar: efConfigSection_navigationBar;

    /**
     * Секция: боковая панель навигации
     * {@link efConfigSection_sideNavigationBar}
     */
    sideNavigationBar: efConfigSection_sideNavigationBar;

    /**
     * Секция: шаблон
     * {@link efConfigSection_template}
     */
    template: efConfigSection_template;

    /**
     * Секция: мета данные
     * {@link efConfigSection_meta}
     */
    meta: efConfigSection_meta;
}
