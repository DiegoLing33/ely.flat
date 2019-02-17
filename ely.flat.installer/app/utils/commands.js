import {execRequest, processes, workingDirectoryField} from "./utils";
import {efNotificationView, elyGetRequest, elyProgressNotificationView} from "../../build/ely.flat";

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
    new elyGetRequest({url: "http://127.0.0.1:1583/" + method}).send(data, (resp) => {
        requestsInProcess.splice(requestsInProcess.indexOf(method), 1);
        if (props.info) prog.dismiss(true);
        if (props.ok && resp.response) new efNotificationView({title: "Готово", message: props.ok}).present();
        if (resp.error) new efNotificationView({title: "Ошибка", message: resp.error}).present();
        callback(resp);
    });
}

/**
 * Выполняет команду построения приложения
 * @param callback
 */
export function buildApplicationCommand(callback) {
    makeAppRequest("compile", {}, (resp) => {
        callback(resp.response, resp);
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
    makeAppRequest("init", {}, (resp) => {
        callback(resp.response, resp);
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
    makeAppRequest("getWorkingDirectory", {}, (resp) => {
        callback(resp.response, resp);
    }, {title: "Получение рабочей директории", info: true});
}

/**
 * Выполняет команду получения рабочей директории
 * @param directory
 * @param callback
 */
export function setWorkingDirectoryCommand(directory, callback) {
    makeAppRequest("setWorkingDirectory", {directory}, (resp) => {
        callback(resp.response, resp);
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
    makeAppRequest("isLiveUpdateServerRunning", {}, (resp) => {
        callback(resp.response, resp);
    });
}

/**
 * Выполняет команду запуска live update server
 * @param callback
 */
export function runLiveUpdateServer(callback) {
    makeAppRequest("runLiveUpdateServer", {}, (resp) => {
        callback(resp.response, resp);
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
    makeAppRequest("stopLiveUpdateServer", {}, (resp) => {
        callback(resp.response, resp);
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
    req.send({}, (resp) => {
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