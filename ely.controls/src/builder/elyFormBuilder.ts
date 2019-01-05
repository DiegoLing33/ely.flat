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
 + Файл: elyFormBuilder.ts                                                    +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyButton from "@controls/action/elyButton";
import elyControl from "@controls/action/elyControl";
import elyField from "@controls/fields/elyField";
import elyTextField from "@controls/fields/elyTextField";
import elyGridView from "@controls/flex/elyGridView";
import elyNotificationView from "@controls/notification/elyNotificationView";
import elyViewEntityProtocol from "@controls/protocols/elyViewEntityProtocol";
import elyTextView from "@controls/text/elyTextView";
import elyView from "@core/controls/elyView";
import elyUtils from "@core/elyUtils";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyEncrypt from "@core/secure/elyEncrypt";
import elyURL from "@core/web/url/elyURL";
import elySize from "@enums/elySize";
import elyFlexGridViewOptions from "@options/elyFlexGridViewOptions";

type elyFormBuilderErrorObserver = (error: string, field: elyField<any>) => void;
type elyFormBuilderSuccessObserver = (values: { [key: string]: any }) => void;

/**
 * Опции строителя форм
 */
interface elyFormBuilderOptions extends elyFlexGridViewOptions {

    /**
     * Заголовок формы
     */
    title?: string;

    /**
     * Описание формы
     */
    description?: string;

    /**
     * Автоматическое распознавание кнопки с идентификатором
     * submit, как подтвержающий элемент.
     */
    autoDetectSubmit?: boolean;

    /**
     * Флекс карта элементов формы
     */
    flex?: any;

    /**
     * Запрещает ререндеринг формы
     */
    denyRebuild?: boolean;
}

/**
 * Заголовок формы
 */
interface elyFormBuilderHeader {

    /**
     * Отображение заголовка формы
     */
    titleTextView: elyTextView;

    /**
     * Отображение описания формы
     */
    descriptionTextView: elyTextView;
}

/**
 * Сущность объекта формы elyFormBuilder. Необходим для метода
 * {@link elyFormBuilder.fromObject}.
 *
 * Так же, здесь описывается представление JSON объектов
 */
interface elyFormBuilderObjectEntity extends elyFormBuilderOptions {

    /**
     * Элементы формы
     */
    items?: { [id: string]: elyViewEntityProtocol };
}

/**
 * Строитель форм
 *
 * Строитель форм работает максимально простым и понятным способом. Пример простой
 * формы с логином, паролем и flex картой.
 *
 *
 *     // Создаем пустой строитель
 *     let form = new ely.builder.form();
 *
 *     // Создание полей для формы
 *     let loginInput = new ely.textField({placeholder: "Введите логин"});
 *     let passwordInput = new ely.textField({placeholder: "Введите пароль", type: "password"});
 *     let submitButton = new ely.button({text: "Регистрация", size: "block"});
 *
 *     // Добавлять объекты можно по одному, изспользуя метод `add( id, view )`, но
 *     // можно добавить все разом, через метод `addButch`.
 *     form.addButch({
 *         login: loginInput,
 *         password: passwordInput,
 *         submit: submitButton
 *     });
 *
 *     // Отлично, теперь добавим флекс карту
 *     form.setFlex([
 *         [ "login", "password" ],
 *         [ "submit" ]
 *     ]);
 *
 *
 * Готово. Для того, чтобы добавить форму, просто используйте объект form, в методах
 * `addSubView`, `addRow` и тд, так как объект {@link elyFormBuilder} является {@link elyView}.
 *
 * Добавленная кнопка будет активировать форму, потому что она имеет идентификатор `submit`.
 * Для отключения автоопределения кнопко, используйте опцию autoDetectSubmit ({@link elyFormBuilderOptions}).
 *
 * Указанная флекс карта передает отображение формы. Используйте ключевое значение `line`, чтобы
 * вставить полосу разделения.
 *
 * @version 1.0
 *
 */
export default class elyFormBuilder extends elyView {

    /**
     * Создает форму из JSON файла с правилом {@link elyFormBuilderObjectEntity}
     * @param path
     * @param callback
     */
    public static loadJSON(path: elyURL | string, callback: (fb: elyFormBuilder) => void) {
        if (typeof path === "string")
            path = new elyURL(path);

        // Запрос к JSON файлу
        path.request({}, (response) => {
            if (response) {
                callback(elyFormBuilder.fromObject(response));
                return;
            }
            callback(new elyFormBuilder());
        });

    }

    /**
     * Создает форму из JSON строки с правилом {@link elyFormBuilderObjectEntity}
     * @param jsonString
     */
    public static fromJSON(jsonString: string): elyFormBuilder {
        try {
            const obj = JSON.parse(jsonString);
            return elyFormBuilder.fromObject(obj);
        } catch (e) {
            return elyFormBuilder.fromObject({});
        }
    }

    /**
     * Создает форму из объекта {@link elyFormBuilderObjectEntity}
     *
     * @param object - объект
     */
    public static fromObject(object: elyFormBuilderObjectEntity): elyFormBuilder {
        object.denyRebuild = true;
        const fb = new elyFormBuilder(object);
        elyUtils.forEach(object.items, (id, view) => {
            fb.add(id, elyControl.fromObject(view));
        });
        object.denyRebuild = false;
        fb.rebuild();
        return fb;
    }

    /**
     * Заголовок формы
     */
    public readonly header: elyFormBuilderHeader;

    /**
     * Опции
     */
    public readonly options: elyFormBuilderOptions;

    /**
     * Свойство заголовка формы
     */
    public readonly titleProperty: elyObservableProperty<string>;

    /**
     * Свойство описания формы
     */
    public readonly descriptionProperty: elyObservableProperty<string>;

    /**
     * Элемент сетки
     */
    protected readonly gridView: elyGridView;

    /**
     * Элементы доступа
     * @ignore
     */
    protected readonly accessories: elyObservableDictionary<elyView>;

    /**
     * Флекс карта
     * @ignore
     */
    protected flex: any;

    /**
     * Запрещает перестроение формы
     * @ignore
     */
    protected denyRebuildFlag: boolean;

    /**
     * Идентификаторы опциональных полей
     * @ignore
     */
    protected readonly optionalFieldsIdentifiers: string[];

    /**
     * Конструктор
     * @param options - опции
     */
    public constructor(options: elyFormBuilderOptions = {}) {
        super();

        this.addClass("ef-form");
        this.gridView = new elyGridView(options);
        this.options = options;
        this.denyRebuildFlag = options.denyRebuild || false;
        this.accessories = new elyObservableDictionary<elyView>();
        this.accessories.change(() => this.rebuild());
        this.optionalFieldsIdentifiers = [];
        this.denyRebuildFlag = false;

        this.header = {
            descriptionTextView: new elyTextView(),
            titleTextView: new elyTextView(),
        };

        this.header.titleTextView
            .textSize(elySize.regular)
            .textCenter(true)
            .textSize(22);

        this.header.descriptionTextView
            .textSize(elySize.small)
            .textCenter(true);

        this.titleProperty = new elyObservableProperty<string>();
        this.titleProperty.change((newValue) => {
            this.header.titleTextView.text(newValue);
            this.rebuild();
        });

        this.descriptionProperty = new elyObservableProperty<string>();
        this.descriptionProperty.change((newValue) => {
            this.header.descriptionTextView.text(newValue);
            this.rebuild();
        });
        if (options.title) this.titleProperty.set(options.title);
        if (options.description) this.descriptionProperty.set(options.description);
        if (options.flex) this.setFlex(options.flex);
        this.getDocument().append(this.gridView.getDocument());
    }

    /**
     * Добавляет слушатель успешного завершения формы
     * @param observer
     */
    public addSuccessObserver(observer: elyFormBuilderSuccessObserver): elyFormBuilder {
        this.addObserver("success", observer);
        return this;
    }

    /**
     * Добавляет слушатель ошибки поля формы
     * @param observer
     */
    public addErrorObserver(observer: elyFormBuilderErrorObserver): elyFormBuilder {
        this.addObserver("error", observer);
        return this;
    }

    /**
     * Возвращает элемент формы
     * @param id
     */
    public getAccessoryView(id: string): elyView | null {
        return this.getAccessories()[id];
    }

    /**
     * Возвращает элементы доступа
     */
    public getAccessories(): { [id: string]: elyView } {
        return this.accessories.get();
    }

    /**
     * Устанавливает флекс карту
     * @param flex
     */
    public setFlex(flex: any): elyFormBuilder {
        this.flex = flex;
        return this.rebuild();
    }

    /**
     * Запрещает перестроение формы
     * @param flag
     */
    public denyRebuild(flag: boolean): elyFormBuilder {
        this.denyRebuildFlag = flag;
        return this;
    }

    /**
     * Добавляет необязательное поле
     * @param identifier
     */
    public addOptional(identifier: string): elyFormBuilder {
        if (this.optionalFieldsIdentifiers.indexOf(identifier) === -1)
            this.optionalFieldsIdentifiers.push(identifier);
        return this;
    }

    /**
     * Добавляет объект на форму
     * @param identifier
     * @param control
     */
    public add(identifier: string, control: elyView): elyFormBuilder {
        this.accessories.add(identifier, control);

        if (this.options.autoDetectSubmit !== false && control instanceof elyButton && identifier === "submit") {
            (control as elyButton).click(() => {
                this.submit();
            });
        }
        return this.rebuild();
    }

    /**
     * Добавляет набор объектов на форму
     * @param butch - набор объектов
     */
    public addButch(butch: { [identifier: string]: elyView }): elyFormBuilder {
        this.denyRebuild(true);
        elyUtils.forEach(butch, (id, field) => this.add(id, field));
        this.denyRebuild(false);
        return this.rebuild();
    }

    /**
     * Текущие значения данных формы
     */
    public values(): { [id: string]: any } {
        const values: any = {};
        this.forEachAccessoryField((id, field) => {
            values[id] = field.value();
            if (field instanceof elyTextField && field.encrypted)
                values[id] = elyEncrypt.encodeString(values[id]);
            if (values[id].value) values[id] = values[id].value;
        });
        return values;
    }

    /**
     * Создает и возвращает объект FormData
     */
    public createFormData(): FormData {
        const formData = new FormData();
        this.forEachAccessoryField((id, field) => {
            let value = field.value();
            if (typeof (value as any).length === "undefined") {
                if (field instanceof elyTextField && field.encrypted)
                    value = elyEncrypt.encodeString(value);
                formData.append(id, value);
            } else {
                (value as any[]).forEach((v, index) => {
                    formData.append(`${id}[${index}]`, v);
                });
            }
        });
        return formData;
    }

    /**
     * Цикл по всем полям формы
     * @param closure - обработчик
     */
    public forEachAccessoryField(closure: (id: string, field: elyField<any>) => void) {
        this.accessories.forEach((id, accessory) => {
            if (accessory instanceof elyField) closure(id, accessory);
        });
    }

    /**
     * Завершает форму
     * @param success - обработчик успешного завершения
     * @param err - обработчик ошибки
     */
    public submit(success?: elyFormBuilderSuccessObserver, err?: elyFormBuilderErrorObserver): elyFormBuilder {
        const values: any = {};
        let errorField: any = null;
        this.forEachAccessoryField((id, field) => {
            if (errorField) return;
            if (this.optionalFieldsIdentifiers.indexOf(id) === -1) {
                if (field.isEmpty() || !field.isValidData()) {
                    if (err) err("empty", field);
                    this.notificate("error", ["empty", field]);
                    field.error(true);
                    errorField = field;
                    if (field.isEmpty()) {
                        new elyNotificationView({
                            message: `Поле ${id} не может быть пустое!`,
                            title: "Ошибка заполнения формы",
                        }).present();
                        return;
                    }
                    if (!field.isValidData()) {
                       new elyNotificationView({
                           message: `Поле ${id} заполнено не верно!`,
                           title: "Ошибка заполнения формы",
                       }).present();
                       return;
                   }
                    return;
                }
            }
            values[id] = field.value();
            if (field instanceof elyTextField && field.encrypted) values[id] = elyEncrypt.encodeString(values[id]);
            if (values[id].value) values[id] = values[id].value;
        });

        if (errorField) return this;
        if (success) success(values);
        this.notificate("success", [values]);
        return this;
    }

    /**
     * Отправляет форму на URL
     * @param url - url для обработки формы
     * @param closure - обработчик ответа url
     */
    public send(url: elyURL, closure?: (response: any, status: any) => void): elyFormBuilder {
        url.request(this.values(), (response, status) => {
            if (closure) closure(response, status);
        });
        return this;
    }

    /**
     * Выполняет перестроение формы
     */
    public rebuild(): elyFormBuilder {
        if (this.denyRebuildFlag) return this;
        this.gridView.clearView();

        if (this.titleProperty.get() || this.descriptionProperty.get()) {
            const headerView = new elyControl();
            if (this.titleProperty.get()) headerView.addSubView(this.header.titleTextView);
            if (this.descriptionProperty.get()) headerView.addSubView(this.header.descriptionTextView);
            this.gridView.add(headerView);
        }

        if (this.flex) {
            this.flex.forEach((row: any) => this.gridView.add(...row.map((f: any) => {
                if (f === "line") return elyControl.line();
                return this.accessories.item(f) || elyControl.empty();
            })));
        } else {
            this.accessories.forEach((key, value) => {
                this.gridView.add(value);
            });
        }
        return this;
    }

    /**
     * Очищает поля
     */
    public reset(): elyFormBuilder {
        this.forEachAccessoryField((id, field) => {
            field.clearValue();
        });
        return this;
    }

    /**
     * Устанавливает или возвращает заголвоок
     * @param text
     */
    public title(text?: string): elyFormBuilder {
        return elyObservableProperty.simplePropertyAccess(this, text, this.titleProperty);
    }

    /**
     * Устанавливает или возвращает описание
     * @param text
     */
    public description(text?: string): elyFormBuilder {
        return elyObservableProperty.simplePropertyAccess(this, text, this.descriptionProperty);
    }
}
