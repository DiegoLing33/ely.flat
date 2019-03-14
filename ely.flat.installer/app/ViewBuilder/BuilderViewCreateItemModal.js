import {ModalView} from "../../build/ely.flat";
import BuilderCreatorView from "./views/BuilderCreatorView";

export default class BuilderViewCreateItemModal extends ModalView {

    constructor(options = {}) {
        super({...options, title: "Создание элемента"});

        const view = new BuilderCreatorView();
        view.addObserver("created", (view, opt)=>{
           this.notificate("create", [view, opt]);
           this.dismiss(true);
        });

        this.getContainerView().width(550);
        this.content(view);
    }

    addCreateObserver(o) {
        this.addObserver("create", o);
    }

}