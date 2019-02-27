import {
    TextField,
    elyProgressNotificationView,
    screenController,
    Style, URLRequest
} from "../../build/ely.flat";

export function addHomeButton(view) {
    view.add("Назад".button({buttonStyle: Style.info}).fill().click(() => {
        screenController().present("index");
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
    URLRequest.sendGET("http://127.0.0.1:1583/" + command, data, (response, status) => {
       response(status, response);
       if(loadingText) prog.dismiss(true);
    });
}

export const workingDirectoryField = new TextField({placeholder: "Рабочая директория"});

/**
 * @type {{win: Window}}
 */
export let serverWindow = {
    /**
     * @type {Window}
     */
    win: null,
};

