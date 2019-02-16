import {
    efTextField,
    elyGetRequest,
    elyProgressNotificationView,
    elyScreenController,
    Style
} from "../../build/ely.flat";

export function addHomeButton(view) {
    view.add("Назад".button({buttonStyle: Style.info}).fill().click(() => {
        elyScreenController.default.present("index");
    }));
}

export const processes = {
    changeWorkingDirectory: false,
    initApplication: false,
    buildApplication: false,
    runServer: false,
};

export function execRequest(command, loadingText, data, response) {
    let prog = new elyProgressNotificationView({
        title: loadingText,
        progressTitle: "Идёт выполнение команды..."
    });
    if (loadingText) {
        prog.present();
    }
    new elyGetRequest({url: "http://127.0.0.1:1583/" + command}).send(data, (resp) => {
        response(resp.response === "ok", resp);
        if (loadingText) prog.dismiss(true);
    });
}

export const workingDirectoryField = new efTextField({placeholder: "Рабочая директория"});

/**
 * @type {{win: Window}}
 */
export let serverWindow = {
    /**
     * @type {Window}
     */
    win: null,
};

