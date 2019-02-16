import {execRequest, processes, workingDirectoryField} from "./utils";
import {elyGetRequest} from "../../build/ely.flat";

/**
 * Выполняет команду построения приложения
 * @param callback
 */
export function buildApplicationCommand(callback) {
    if (processes.buildApplication) return;
    processes.buildApplication = true;
    execRequest("build", "Сборка приложения", {}, (resp, data) => {
        processes.buildApplication = false;
        if (resp) {
            notifi("Приложение успешно собрано!", "Готово");
        }
        callback(resp, data);
    });
}

/**
 * Выполняет команду инициилизации приложения
 * @param callback
 */
export function initApplicationCommand(callback) {
    if (processes.initApplication) return;
    processes.initApplication = true;
    execRequest("init", "Инициилизация файлов приложения", {}, (resp, data) => {
        processes.initApplication = false;
        if (resp) {
            notifi("Приложение успешно инициилизировано!", "Готово");
        }
        callback(resp, data);
    });
}

/**
 * Выполняет команду получения рабочей директории
 * @param callback
 */
export function getWorkingDirectoryCommand(callback) {
    execRequest("getWorkingDirectory", null, {}, (resp, data) => {
        callback(resp, data);
    });
}

/**
 * Выполняет команду получения рабочей директории
 * @param workingDirectory
 * @param callback
 */
export function setWorkingDirectoryCommand(workingDirectory, callback) {
    if (processes.changeWorkingDirectory) return;
    processes.changeWorkingDirectory = true;
    execRequest("setWorkingDirectory", "Получение рабочей директории приложения",
        {directory: workingDirectory}, (resp, data) => {
            processes.changeWorkingDirectory = false;
            if (resp) notifi("Рабочая директория изменена!", "Готово", workingDirectoryField.value());
            callback(resp, data);
        });
}

/**
 * Выполняет команду получения состояния live update server
 * @param callback
 */
export function isServerRunning(callback) {
    execRequest("isServerRunning", null, {}, (resp, data) => {
        callback(resp, data);
    });
}

/**
 * Выполняет команду запуска live update server
 * @param callback
 */
export function runServerCommand(callback) {
    if (processes.runServer) return;
    processes.runServer = true;
    execRequest("runServer", "Запуск live update server", {}, (resp, data) => {
        processes.runServer = false;
        if (resp) {
            notifi("Сервер успешно запущен!", "Готово");
        }
        callback(resp, data);
    });
}

/**
 * Выполняет команду остановки live update server
 * @param callback
 */
export function stopServerCommand(callback) {
    if (processes.runServer) return;
    processes.runServer = true;
    execRequest("stopServer", "Остановка live update server", {}, (resp, data) => {
        processes.runServer = false;
        if (resp) {
            notifi("Сервер успешно остановлен!", "Готово");
        }
        callback(resp, data);
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
    const req = new elyGetRequest({url: "http://127.0.0.1:1583/setConfig"});
    req.send({path, value}, (resp) => {
        callback(resp.response === "ok");
    });
}