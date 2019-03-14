import {
    Button,
    PanelView,
    SwitchField,
    Control,
    SimplePageViewController,
} from "../../build/ely.flat";
import {addHomeButton, serverWindow} from "../utils/utils";
import {isLiveUpdateServerRunning, runLiveUpdateServer, stopLiveUpdateServer} from "../utils/commands";

/**
 * Контроллер отображения: Запуск сервера
 */
export class ServerViewController extends SimplePageViewController {


    viewDidLoad() {
        super.viewDidLoad();

        this.title("ely.flat *{* Installer *}*");
        this.description("Live Update Server");

        addHomeButton(this.view);
        this.view.add(new Control({tag: "br"}));

        this.infoPanel = new PanelView({panelTitle: "Информация"});
        this.stateServer = new SwitchField({title: "Состояние сервера"});

        this.infoPanel.getContentView().add(this.stateServer);

        let button = new Button({text: "Открыть приложение", fill: true});
        this.infoPanel.getContentView().add(button);
        this.infoPanel.getContentView().rowAt(1).hidden(true);

        button.click(() => {
            serverWindow.win = window.open("http://127.0.0.1:1580", "ely.flat", "width=1000,height=700");
        });

        this.stateServer.change((value) => {
            if(this.checking) return;
            if (value) {
                runLiveUpdateServer(() => {
                    this.update();
                });
            } else if (!value) {
                stopLiveUpdateServer(() => {
                    this.update();
                });
            }
        });

        this.stateServer.editable(false);
        this.view.add(this.infoPanel);
    }

    viewDidAppear() {
        this.update();
    }

    update(){
        this.checking = true;
        this.stateServer.editable(false);
        this.infoPanel.getContentView().rowAt(1).hidden(true);

        isLiveUpdateServerRunning((s, r) => {
            this.stateServer.value(r.server);
            this.infoPanel.getContentView().rowAt(1).hidden(!r.server);
            this.stateServer.editable(true);
            this.checking = false;
        });
    }
}