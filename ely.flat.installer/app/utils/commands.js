import {NotificationView, elyProgressNotificationView} from "../../build/ely.flat";

export let requestsInProcess = [];

/**
 * Выполняет запрос к приложению
 * @param method
 * @param data
 * @param callback
 * @param props
 */
export function makeAppRequest(method, data, callback, props = {}) {
    if (requestsInProcess.indexOf(method) > -1) return;
    requestsInProcess.push(method);
    let prog = new elyProgressNotificationView({
        title: props.title || "Выполнение команды",
        progressTitle: "Идёт выполнение команды..."
    });
    if (props.info) prog.present();
    new URLRequest({url: "http://127.0.0.1:1583/" + method, data}).send((resp, status) => {
        requestsInProcess.splice(requestsInProcess.indexOf(method), 1);
        if (props.info) prog.dismiss(true);
        if (props.ok && resp.response) new efNotificationView({title: "Готово", message: props.ok}).present();
        if (resp.error) new efNotificationView({title: "Ошибка", message: resp.error}).present();
        callback(resp, status);
    });
}

/**
 * Выполняет команду построения приложения
 * @param callback
 */
export function buildApplicationCommand(callback) {
    makeAppRequest("compile", {}, (resp, status) => {
        callback(status, resp);
    }, {
        title: "Компиляция приложения",
        info: true,
        ok: "Основные файлы приложения app.js и app.config.json собраны в директории /build/!"
    });
}

/**
 * Выполняет команду инициилизации приложения
 * @param callback
 */
export function initApplicationCommand(callback) {
    makeAppRequest("init", {}, (resp, status) => {
        callback(status, resp);
    }, {
        title: "Инициилизация приложения",
        info: true,
        ok: "Приложение успешно инициилизировано!"
    });
}

/**
 * Выполняет команду получения рабочей директории
 * @param callback
 */
export function getWorkingDirectoryCommand(callback) {
    makeAppRequest("getWorkingDirectory", {}, (resp, status) => {
        callback(status, resp);
    }, {title: "Получение рабочей директории", info: true});
}

/**
 * Выполняет команду получения рабочей директории
 * @param directory
 * @param callback
 */
export function setWorkingDirectoryCommand(directory, callback) {
    makeAppRequest("setWorkingDirectory", {directory}, (resp, status) => {
        callback(status, resp);
    }, {
        title: "Установка рабочей директории",
        info: true,
        ok: "Рабочая директория изменена!"
    });
}

/**
 * Выполняет команду получения состояния live update server
 * @param callback
 */
export function isLiveUpdateServerRunning(callback) {
    makeAppRequest("isLiveUpdateServerRunning", {}, (resp, status) => {
        callback(status, resp);
    });
}

/**
 * Выполняет команду запуска live update server
 * @param callback
 */
export function runLiveUpdateServer(callback) {
    makeAppRequest("runLiveUpdateServer", {}, (resp, status) => {
        callback(status, resp);
    }, {
        title: "Запуск Live Update Server",
        info: true,
        ok: "Сервер живого обновления успешно запущен!"
    });
}

/**
 * Выполняет команду остановки live update server
 * @param callback
 */
export function stopLiveUpdateServer(callback) {
    makeAppRequest("stopLiveUpdateServer", {}, (resp, status) => {
        callback(status, resp);
    }, {
        title: "Остановка Live Update Server",
        info: true,
        ok: "Сервер живого обновления остановлен!"
    });
}

/**
 * Выполняет команду получения конфигурации
 * @param callback
 */
export function getConfigCommand(callback) {
    const req = new elyGetRequest({url: "http://127.0.0.1:1583/getConfig"});
    req.useJson = false;
    req.send({}, (resp, status) => {
        callback(JSON.parse(resp));
    });
}

/**
 * Выполняет команду установки значения конфигурации
 * @param path
 * @param value
 * @param callback
 */
export function setConfigCommand(path, value, callback) {
    makeAppRequest("setConfigValue", {path, value}, resp => {
        callback(resp.response);
    });
}

/**
 * Выполняет команду получения базы данных
 * @param callback
 */
export function getDBDItemsCommand(callback) {
    makeAppRequest("r/getDBItems", {}, resp => {
        callback(status, resp);
    }, {
        title: "Получение данных базы",
        info: true
    });
}


/**
 * Выполняет команду установки значения
 * @param table
 * @param rowIndex
 * @param column
 * @param value
 * @param callback
 */
export function setDBDItemValueCommand(table, rowIndex, column, value, callback) {
    makeAppRequest("r/setDBItemValue", {table, rowIndex, column, value}, resp => {
        callback(status, resp);
    }, {
        title: "Получение данных базы",
        info: true
    });
}


/**
 * Выполняет команду установки значения
 * @param table
 * @param callback
 */
export function getTableItemsCommand(table, callback) {
    makeAppRequest("r/getTableItems", {table}, resp => {
        callback(status, resp);
    }, {
        title: "Получение данных таблицы " + table,
        info: true
    });
}
