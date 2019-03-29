import {
    BoxView,
    GridViewController,
    VideoPlayer,
    Weight,
    Size,
    GridLayoutView,
    ImageView, TextView
} from "../../../products/ely.flat";

export default class IndexController extends GridViewController {
    /**
     * Данный метод выполняется после загрузки экрана
     *
     * + В данном методе рекомендуется выполнять элементарную отрисовку,
     *   а также программную логику контроллера элемента отображения.
     * + Данный метод выполняется один раз.
     *
     * Внимание! Рекомендуется изучить делегат elyViewWillDraw для полного
     * понимания отрисовки элементов View.
     */
    viewDidLoad() {
        // Вызов рдительского метода
        super.viewDidLoad();

        this.view.add(createHeaderText("LATEST VIDEO").css({marginBottom: "-15px"}));
        this.view.add("Последнее опубликованное видео".textView({opacity: 0.45, textCenter: true}));

        const promoVideo = new VideoPlayer({url: "./resources/videos/promo.mp4"});
        promoVideo.css({
            width: "853px",
            height: "380px",
            maxWidth: "100%",
            margin: "0 auto",
            display: "block",
        });
        promoVideo.resize((obj, width) => {
            if(width < 600){
               obj.css({height: "190px"});
           }
        });

        const box = new BoxView();
        box.getContainerView().add(promoVideo);
        this.view.add(box);

        this.view.add(createHeaderText("MUSIC SERVICES").css({marginBottom: "-15px", marginTop: "45px"}));
        this.view.add("Музыкальные площадки и сервисы".textView({opacity: 0.45, textCenter: true}));

        const listenOnGrid = new GridLayoutView({style: {width: "80%", margin: "0 auto"}});
        listenOnGrid.add(
            createListenOnImage("./resources/img/lo_applemusic.png",
                "https://itunes.apple.com/ru/artist/diego-ling/1434980772"),
            createListenOnImage("./resources/img/lo_yandex.png",
                "https://music.yandex.ru/artist/6130302"),
            createListenOnImage("./resources/img/lo_amazon.png",
                "https://music.amazon.com/artists/B07GL4VF3P"),
        );
        this.view.add(listenOnGrid);
        this.view.add(("Вы можете найти музыку исполнителя Diego Ling на остальных площадках: iTunes, Apple Music, Google Play, Shazam, Amazon, " +
            "Deezer, Saavn, Boom, ВКонтакте и тд.")
            .textView({textCenter: true, opacity: 0.45, textSize: Size.custom(13)}));

        this.view.add(createHeaderText("SOCIAL NETWORKS").css({marginBottom: "-15px", marginTop: "45px"}));
        this.view.add("Социальные сети".textView({opacity: 0.45, textCenter: true}));
        const socialGrid = new GridLayoutView();
        socialGrid.add(
            createSocialBox("Diego Ling", "VK"),
            createSocialBox("The Ling Records", "VK"),
            createSocialBox("Diego Ling", "Instagram"),
        );
        this.view.add(socialGrid);

    }
}

export function createSocialBox(title, desc, link) {
    const box = new BoxView();
    const titleView = new TextView({text: title});
    box.styleNoSelect(true);
    box.styleClickable(true);
    box.getContainerView().add(titleView);
    box.getContainerView().add(desc.textView({opacity: 0.4}));
    return box;
}

/**
 * Создает текстовой заголовок
 * @param text
 * @return {HeaderTextView|HeaderTextView|*}
 */
export function createHeaderText(text) {
    return text.headerTextView({
        headerLevel: 1,
        textWeight: Weight.normal,
        textCenter: true,
        textSize: Size.large,
        styleNoSelect: true
    });
}

export function createListenOnImage(img, url) {
    const image = new ImageView({url: img});
    image.styleClickable(true);
    image.width("100%");
    image.getStyle().margin = "10px auto";
    image.getStyle().display = "block";
    image.addClickObserver(()=>{
       window.location.href = url;
    });
    return image;
}