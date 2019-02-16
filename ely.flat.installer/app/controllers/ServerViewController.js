import {
    efButton,
    efPanelView,
    efSwitchField,
    elyControl,
    elySimplePageViewController,
} from "../../build/ely.flat";
import {addHomeButton, serverWindow} from "../utils/utils";
import {isServerRunning, runServerCommand, stopServerCommand} from "../utils/commands";

/**
 * Контроллер отображения: Запуск сервера
 */
export class ServerViewController extends elySimplePageViewController {


    viewDidLoad() {
        super.viewDidLoad();

        this.title("ely.flat *{* Installer *}*");
        this.description("Live Update Server");

        addHomeButton(this.view);
        this.view.add(new elyControl({tag: "br"}));

        let infoPanel = new efPanelView({panelTitle: "Информация"});

        let isRunning = false;

        let stateServer = new efSwitchField({title: "Состояние сервера"});
        infoPanel.getContentView().add(stateServer);

        let button = new efButton({text: "Открыть приложение", fill: true});
        infoPanel.getContentView().add(button);
        infoPanel.getContentView().rowAt(1).hidden(true);
        button.click(() => {
            serverWindow.win = window.open("http://127.0.0.1:1580", "ely.flat", "width=1000,height=700");
        });

        stateServer.change((value) => {
            stateServer.editable(false);
            if (value && !isRunning) {
                runServerCommand(() => {
                    update();
                });
            } else if (!value && isRunning) {
                stopServerCommand(() => {
                    update();
                });
            }
        });

        stateServer.editable(false);
        this.view.add(infoPanel);

        function update() {
            stateServer.editable(false);
            isServerRunning((s, r) => {
                isRunning = r.state;
                stateServer.value(isRunning);
                infoPanel.getContentView().rowAt(1).hidden(!isRunning);
                stateServer.editable(true);
            });
        }

        update();

    }

}