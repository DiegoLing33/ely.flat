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
 + Файл: Time.ts                                                              +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/**
 * Разница времени
 */
export interface TimeDifferences {

    /**
     * Количество дней
     */
    days: number;

    /**
     * Количство часов
     */
    hours: number;

    /**
     * Количество минут
     */
    minutes: number;

    /**
     * Количество секунд
     */
    seconds: number;

    /**
     * Исходное значение разницы
     */
    source: number;
}

/**
 * Модуль elyFlat для работы со временем
 * @class Time
 */
export default class Time {

    /**
     * Список дней ндели
     *
     * - "Понедельник"
     * - "Вторник"
     * - "Среда"
     * - "Четверг"
     * - "Пятница"
     * - "Суббота"
     * - "Воскресение"
     *
     * @type {string[]}
     */
    public static weekDaysList: string[] = [
        "Понедельник", "Вторник", "Среда",
        "Четверг", "Пятница", "Суббота", "Воскресение",
    ];

    /**
     * Список коротких названий дней недели
     *
     * - "Пн"
     * - "Вт"
     * - "Ср"
     * - "Чт"
     * - "Пт"
     * - "Сб"
     * - "Вс"
     *
     * @type {string[]}
     */
    public static weekDaysShortList: string[] = [
        "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",
    ];

    /**
     * Список названий мясяцев
     * @type {string[]}
     */
    public static monthsList: string[] = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ];

    /**
     * Список названий коротких названий мясяцев
     * @type {string[]}
     */
    public static monthsShortList: string[] = [
        "Янв", "Фев", "Мрт", "Апр", "Май", "Июн",
        "Июл", "Авг", "Сен", "Окт", "Ноб", "Дек",
    ];

    /**
     * Создает объект времени по дате
     * @param {number} [day] - день
     * @param {number} [month] - месяц
     * @param {number} [year] - год
     * @param {number} [hour] - час
     * @param {number} [minute] - минута
     * @param {number} [second] - секунда
     *
     * @return {Time}
     */
    public static byDate(day: number = 0, month: number = 0, year: number = 0,
                         hour: number = 0, minute: number = 0, second: number = 0): Time {
        return new Time({date: new Date(year, month - 1, day, hour, minute, second)});
    }

    /**
     * Возвращает объект текущего времени
     * @return {Time}
     */
    public static now(): Time {
        return new Time({date: new Date()});
    }

    /**
     * Возвращает количество часов со склонением
     *
     * ```typescript
     *
     * Time.hoursString(5); // 5 часов
     * Time.hoursString(2); // 2 часа
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     */
    public static hoursString(value: number, isUpperFirstChar: boolean = false): string {
        return Time.__stringByLastNumber(value, [
            "часов",
            "час",
            "часа",
        ], isUpperFirstChar);
    }

    /**
     * Возвращает количество минут со склонением
     *
     * ```typescript
     *
     * Time.minutesString(5); // 5 минут
     * Time.minutesString(2); // 2 минуты
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     */
    public static minutesString(value: number, isUpperFirstChar: boolean = false): string {
        return Time.__stringByLastNumber(value, [
            "минут",
            "минута",
            "минуты",
        ], isUpperFirstChar);
    }

    /**
     * Возвращает количество секунд со склонением
     *
     * ```typescript
     *
     * Time.secondsString(5); // 5 секунд
     * Time.secondsString(2); // 2 секунды
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     *
     * @return {string}
     *
     */
    public static secondsString(value: number, isUpperFirstChar: boolean = false): string {
        return Time.__stringByLastNumber(value, [
            "секунд",
            "секунда",
            "секунды",
        ], isUpperFirstChar);
    }

    /**
     * Возвращает количество дней со склонением
     *
     * ```typescript
     *
     * Time.daysString(5); // 5 дней
     * Time.daysString(2); // 2 дня
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     *
     */
    public static daysString(value: number, isUpperFirstChar: boolean = false): string {
        return Time.__stringByLastNumber(value, [
            "дней",
            "день",
            "дня",
        ], isUpperFirstChar);
    }

    /**
     * Возвращает количество месяцев со склонением
     *
     * ```typescript
     *
     * Time.monthsString(5); // 5 месяцев
     * Time.monthsString(2); // 2 месяца
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     *
     * @return {string}
     */
    public static monthsString(value: number, isUpperFirstChar: boolean = false): string {
        return Time.__stringByLastNumber(value, [
            "месяцев",
            "месяц",
            "месяца",
        ], isUpperFirstChar);
    }

    /**
     * Возвращает количество лет со склонением
     *
     * ```typescript
     *
     * Time.yearsString(5); // 5 лет
     * Time.yearsString(2); // 2 года
     * ```
     *
     * @param {number} value - значение
     * @param {boolean} [isUpperFirstChar = false] - делает первую букву
     * величины закловной
     *
     * @return {string}
     */
    public static yearsString(value: number, isUpperFirstChar: boolean = false): string {
        return Time.__stringByLastNumber(value, [
            "лет",
            "год",
            "года",
        ], isUpperFirstChar);
    }

    /**
     * Преобразует временной код в части: дни, часы, минуты, секунды.
     * Такая технология может быть полезна для создания таймеров.
     *
     * Использование:
     * - Сначала необходимо получить разницу веремни, например, используя вычитание;
     * - Полученное значение может быть трансформировано через этот метод.
     *
     * @param {number }timeCode - врменной код
     * @return {TimeDifferences}
     */
    public static timeCodeToVars(timeCode: number): TimeDifferences {
        const source = timeCode;
        timeCode /= 1000;
        const _days = Math.floor(timeCode / 86400);
        timeCode -= _days * 86400;
        const _hours = Math.floor(timeCode / 3600) % 24;
        timeCode -= _hours * 3600;
        const _minutes = Math.floor(timeCode / 60) % 60;
        timeCode -= _minutes * 60;
        const _seconds = Math.floor(timeCode % 60);
        return {days: _days, hours: _hours, minutes: _minutes, seconds: _seconds, source};
    }

    private static __stringByLastNumber(num: number, list: string[], isUpperFirstChar: boolean): string {
        const str = list[Time.__lastNumberChar(num)];
        return num + " " + (isUpperFirstChar ? (str[0].toUpperCase() + str.substr(1)) : str);
    }

    private static __lastNumberChar(num: number): number {
        const d100 = num % 100;
        if (d100 > 10 && d100 < 15) return 0;

        const d10 = num % 10;

        if (d10 === 0 || d10 > 4) return 0;
        if (d10 === 1) return 1;
        if (d10 > 1 && d10 < 5) return 2;
        return 0;
    }

    /**
     * Дата
     */
    private date: Date;

    /**
     * Конструткор
     * @param {{date?: Date}} options - опции
     */
    constructor(options: { date: Date } = {date: new Date()}) {
        this.date = options.date;
    }

    /**
     * Возвращает timestamp
     * @return {number}
     */
    public getTime(): number {
        return this.date.getTime();
    }

    /**
     * Возвращает количество дней в месяце для
     * даты, указанной в Time.
     *
     * @return {number}
     */
    public getDaysInMonth(): number {
        return 32 - new Date(this.date.getFullYear(), this.date.getMonth(), 32).getDate();
    }

    /**
     * Возвращает разницу времени
     * @param {Time} time - время сравнения
     *
     * @return {TimeDifferences}
     *
     *
     * ```ts
     *
     * const d1 = Time.byDate(10, 1, 2019);
     * const d2 = Time.byDate(15, 1, 2019);
     *
     * const diff = d1.getDifference(d2);
     * const daysString = Time.daysString(diff.days); // 5 дней
     * ```
     */
    public getDifference(time: Time): TimeDifferences {
        return Time.timeCodeToVars(Math.abs(this.getTime() - time.getTime()));
    }

    /**
     * Возвращает разницу времени
     *
     * @return {TimeDifferences}
     */
    public getDifferenceNow(): TimeDifferences {
        return this.getDifference(Time.now());
    }

    /**
     * Возвращает true, елси текущее время позже, чем время,
     * указанное в аршументе.
     * @param {Time} time - время сравнения
     *
     * @return {boolean}
     */
    public isLaterThen(time: Time): boolean {
        return this.getDifference(time).source > 0;
    }

    /**
     * Возвращает строку времени
     * @param {boolean} withTime - если установлено true, в строке будет отображено
     * время в формате HH:MM:SS
     *
     * @return {string}
     */
    public getString(withTime: boolean = false): string {
        const dateString = this.formatZero(this.date.getDate()) + "." +
            this.formatZero(this.date.getMonth() + 1) + "." + this.date.getFullYear();
        if (!withTime) return dateString;
        const timeString = this.formatZero(this.date.getHours()) + ":" +
            this.formatZero(this.date.getMinutes()) + ":" + this.formatZero(this.date.getSeconds());
        return `${dateString} ${timeString}`;
    }

    /**
     * Возвращает строку времени
     * @param withSeconds - флаг секунд. Добавляет или убирает SS из формата.
     *
     * @return {string}
     */
    public getTimeString(withSeconds: boolean = true): string {
        let ts = this.formatZero(this.date.getHours()) + ":" +
            this.formatZero(this.date.getMinutes());
        if (withSeconds) ts += ":" + this.formatZero(this.date.getSeconds());
        return ts;
    }

    /**
     * Возвращает дату
     * @return {{date: number, month: number, year: number}}
     */
    public getDate(): { date: number, month: number, year: number } {
        return {date: this.date.getDate(), month: this.date.getMonth() + 1, year: this.date.getFullYear()};
    }

    /**
     * Возвращает время
     * @return {{hours: number, milliseconds: number, minutes: number, seconds: number}}
     */
    public getDateTime(): { hours: number, minutes: number, seconds: number, milliseconds: number } {
        return {
            hours: this.date.getHours(),
            milliseconds: this.date.getMilliseconds(),
            minutes: this.date.getMinutes(),
            seconds: this.date.getSeconds(),
        };
    }

    /**
     * Возвращает индекс дня недели
     * @return {number}
     */
    public getWeekDayIndex(): number {
        switch (this.date.getDay()) {
            case 0:
                return 6;
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            case 6:
                return 5;
            default:
                return 0;
        }
    }

    /**
     * Возвращает название дня недели
     * @param {boolean} isShort
     * @return {string}
     */
    public getWeekDayName(isShort: boolean = false): string {
        return isShort ? Time.weekDaysShortList[this.getWeekDayIndex()] :
            Time.weekDaysList[this.getWeekDayIndex()];
    }

    /**
     * Возвращает строку времени
     * @return {string}
     */
    public toString(): string {
        return this.getString(true);
    }

    private formatZero(str: number): string {
        if (str % 10 === str) {
            return "0" + str;
        }
        return String(str);
    }
}

/**
 * @typedef {Object} TimeDifferences
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} source
 */
