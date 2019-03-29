import {BoxView, GridLayoutView, GridViewController, ImageView, TextView} from "../../../products/ely.flat";
import {createHeaderText} from "./IndexController";

export default class MusicController extends GridViewController{

    viewDidLoad() {
        super.viewDidLoad();

        this.view.add(createHeaderText("MUSIC"));

        this.view.add(createMusicBox(
            "Lifeline",
            "./resources/artwork/Lifeline.jpg",
            "Diego Ling",
            "01.08.2018"));
    }


}

export function createMusicBox(title, file, author, release) {
    const box = new BoxView();
    const subGrid = new GridLayoutView();

    const image = new ImageView({url: file});
    image.getStyle().width = "100%";
    box.getContainerView().add(image, subGrid);
    box.getContainerView().rowAt(0).columnAt(0).getStyle().width = "20%";

    subGrid.add(String(title).headerTextView({headerLevel: 1}));
    subGrid.add(new TextView({text: `*Исполнитель:* ${author}`}));
    subGrid.add(new TextView({text: `*Публикация:* ${release}`}));
    return box;
}