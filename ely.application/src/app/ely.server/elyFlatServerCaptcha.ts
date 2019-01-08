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
 + Файл: elyFlatServerCaptcha.ts                                              +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyFlatServer from "@app/app/ely.server/elyFlatServer";
import elyButton from "@controls/action/elyButton";
import elyControl from "@controls/action/elyControl";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyImageView from "@controls/view/elyImageView";
import elyModalView from "@controls/view/elyModalView";
import elyEncrypt from "@core/secure/elyEncrypt";
import elySize from "@enums/elySize";
import {elyTextField} from "@fields/elyTextField";

/**
 * Тест каптчи
 *
 * Существует два способа использования этого модуля
 *
 * **Классический способ**
 *
 * Создаем кнопку и обработчик нажатия для нее, в котором выполняем все необходимые действия
 *
 *
 *     let btn = new ely.button({text: "Click me"});
 *     btn.click( () => {
 *        new ely.server.captcha().run(result => {
 *              if(result){
 *                  // Do smt when all ok
 *              }
 *        });
 *     });
 *
 *
 *
 * Данный способ подходит для срочного решения поставленной задачи, он структурирован и понятен сразу.
 *
 * Второй способ использует удаленный обработчик и удаленное соединение. Он подойдет для выполнения
 * одинаковых (регулярных) процессов после вызова каптчи.
 *
 *
 *     // Создаем удаленный обработчик каптчи loginTest
 *     ely.server.captcha.addObserver( "loginTest", (result) => {
 *        if(result){
 *            // Do smt when ok
 *            // Например, отображаем страницу
 *        }
 *     });
 *
 *     // Где-то в друго части кода
 *     let btn = new ely.button({text: "Button"});
 *     btn.click( () => new ely.server.captcha( {name: "loginTest"} ).run() );
 *
 *
 *
 */
export default class elyFlatServerCaptcha {

    /**
     * Количество попыток
     */
    public static readonly MAX_ATTEMPTS: number = 10;

    /**
     * Добавляет слушатель
     * @param name
     * @param observer
     */
    public static addObserver(name: string, observer: (result: boolean) => void) {
        elyFlatServerCaptcha.observers[name] = observer;
    }

    /**
     * Генерирует и возвращает соль для проверки каптчи
     */
    public static generateSaltHash(): string {
        return elyEncrypt.encodeString(new Date().getTime().toString() + (Math.random() % 10).toString());
    }

    /**
     * Обработчики ввода каптчи по ее имени
     * @ignore
     */
    protected static readonly observers: { [name: string]: (result: boolean) => void } = {};

    /**
     * Модальное окно
     */
    protected readonly modal: elyModalView;

    /**
     * Поле изображения
     */
    protected readonly imageView: elyImageView;

    /**
     * Поле ввода
     */
    protected readonly textField: elyTextField;

    /**
     * Кнопка
     */
    protected readonly button: elyButton;

    /**
     * Соль
     */
    protected salt: string | undefined;

    /**
     * Обработчик
     */
    protected callback: ((result: boolean) => void) | undefined;

    /**
     * Попытки
     */
    protected attempts: number = 0;

    /**
     * Имя каптчи
     */
    protected name: string | null = null;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: { name?: string } = {}) {
        this.modal = new elyModalView({modalTitle: "Защита"});
        this.modal.modalTitleView.iconName("shield");
        this.imageView                   = new elyImageView();
        this.textField                   = new elyTextField({placeholder: "Введите символы с картинки"});
        this.textField.getStyle().margin = "10px 0";
        this.button                      = new elyButton({text: "Отправить", buttonSize: elySize.fill});
        const control                    = new elyControl({style: {"text-align": "center"}});
        control.addSubView(this.imageView);
        control.addSubView(this.textField);
        control.addSubView(this.button);
        this.modal.modalContent(control);

        this.button.click(() => {
            elyFlatServer.getRequest("core", "captcha", {
                hash:  this.salt,
                value: this.textField.value(),
            }, (response, status) => {

                const __sendCallback = (res: boolean) => {
                    if (this.callback) this.callback(res);
                    if (typeof this.name === "string" &&
                        typeof elyFlatServerCaptcha.observers[this.name] === "function")
                        elyFlatServerCaptcha.observers[this.name](res);
                };

                if (response.error && response.error.code === 1) this.textField.error(true);
                this.textField.clearValue();
                if (!response.response.result) {
                    this.refresh();
                    __sendCallback(false);
                    this.attempts++;
                    if (this.attempts > elyFlatServerCaptcha.MAX_ATTEMPTS) {
                        __sendCallback(false);
                        this.modal.dismiss(true);
                        new elyNotificationView({
                            message: "Попробуйте еще раз." +
                                         " У Вас это точно получится.",
                            title:   "Первышено число попыток",
                        }).present();
                    }
                } else {
                    __sendCallback(true);
                    this.modal.dismiss(true);
                }
            }, [1]);
        });
    }

    /**
     * Запускает проверку
     * @param callback
     */
    public run(callback?: (result: boolean) => void): elyFlatServerCaptcha {
        this.attempts = 0;
        this.callback = callback;
        this.refresh();
        this.modal.present();
        return this;
    }

    /**
     * Обновляет символы
     */
    public refresh(): void {
        this.salt = elyFlatServerCaptcha.generateSaltHash();
        this.imageView.url(elyFlatServer.url + "/captcha?hash=" + this.salt);
    }
}
