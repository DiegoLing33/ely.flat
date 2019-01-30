/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
 + Файл: elyURL.ts                                                            +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Класс ely.URL
 *
 * Класс, содержащий набор методов для работы с URL
 */
export default class elyURL {

    /**
     * Возвращает текущий URL
     */
    public static current(): elyURL {
        return new elyURL(window.location.href);
    }

    /**
     * Абсолютный URL
     */
    public readonly absoluteString: string;

    /**
     * Ответ обрабатывается как JSON
     */
    public jsonResponse: boolean = true;

    /**
     * Конструктор
     *
     * @param {string} url - URL строка
     * @param {*} props - опции
     */
    public constructor(url: string, props: any = []) {
        this.absoluteString = url;
    }

    /**
     * Возвращает очищенный URL
     */
    public getClearURL(): string {
        return new RegExp("(http[s]?:\\/\\/.+)\\/").exec(this.absoluteString)![1]!;
    }

    /**
     * Возвращает очищенный URL от GET запроса
     */
    public getClearOfRequestURL(): string {
        return new RegExp("(http[s]?:\\/\\/.+)\\?").exec(this.absoluteString)![1]!;
    }

}
