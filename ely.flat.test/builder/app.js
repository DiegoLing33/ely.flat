/**
 * Класс контроллера отображения Index (главной страницы)
 */
class IndexViewController extends elySimplePageViewController {

    /**
     * После загрущки
     *
     * + В данном методе рекомендуется выполнять отрисовку, а также программную логику
     *   контроллера элемента отображения.
     * + Данный метод выполняет один раз.
     */
    viewDidLoad() {
        super.viewDidLoad();

        this.title("ely.flat *{* Application *}*");
        this.description("Приложение разработано на основе ely.flat framework");


        this.view.getStyle().maxWidth = 1200 + "px";
        this.view.getStyle().margin = "0 auto";

        this.title("ely <b>{</b> <span style='color: #797979;'>Workshop</span> <b>}</b>");
        this.description("Строитель приложений ely.flat");
        this.view.removeClass("ef-simple-page");
        this.titleView.getStyle().paddingTop = "45px";
        this.view.add(new elyImageView({url: "img/ely-workshop.jpg", style: {height: "200px"}}));

        let grid = new elyGridView({flex: [[60, 40], [45, 10, 45], [100], [45, 10, 45], [60, 40]]});


        let panel = new elyPanelView({title: "Создание проекта", panelStyle: elyStyle.default});
        let panelGrid = new elyGridView();
        panelGrid.add("Создайте проект для начала работы с ely { workshop }".textView({textCenter: true}));
        let nameField = new elyTextField({placeholder: "Название вашего проекта", fieldIcon: "cog"});
        panelGrid.add(nameField);

        panelGrid.add("Создать".button({fill: true, buttonStyle: elyStyle.primary}).click(() => {

        }));

        panel.contentView.addSubView(panelGrid);


        let uploadPanel = new elyPanelView({title: "Загрузка проекта", panelStyle: elyStyle.default});
        let uploadPanelGrid = new elyGridView();
        uploadPanel.contentView.addSubView(uploadPanelGrid);
        let file = new elyFileChooseField({title: "Выберите файл проекта (.elyws)"});
        file.addAcceptExtension(".elyws").maxFilesCount(1);
        file.addOverflowObserver(() => {
            if (file.value()[0]) {

            }
        });
        uploadPanelGrid.add(file);

        grid.add(
            new elyView().addSubView("*Создайте*{nl}новый проект,".textView({
                textSize: elySize.large,
                textWeight: elyWeight.thin
            }))
                .addSubView(("ely <b>{</b> <span style='color: #797979;'>Workshop</span> <b>}</b> - инструмент для максимально быстрой разработки webGUI, а также standalone приложений." +
                    " Вам не стоит задумываться о дизайне внешнего вида - сосредоточьтесь на результате.{nl}" +
                    "Встроенный фреймворк *application* после разработки макета позволит также быстро наполнить Ваше приложение функицоналом - " +
                    "ведь всё уже почти реализовано...").textView({opacity: 0.8})), panel);
        grid.add(elyView.line(), elyView.empty(), elyView.line());
        grid.add(elyView.empty(), "или просто".textView({
            textSize: elySize.middle,
            textWeight: elyWeight.thin,
            textCenter: true,
            opacity: 0.8
        }), elyView.empty());
        grid.add(elyView.line(), elyView.empty(), elyView.line());
        grid.add("...*продолжите*{nl}уже созданный.".textView({
            textSize: elySize.large,
            textWeight: elyWeight.thin
        }), uploadPanel);

        this.view.add(grid);
    }
}

class BuilderViewController extends elyViewController{
    viewDidLoad() {
        super.viewDidLoad();

        let panelView = new elyPanelView({title: "Workspace"});
        this.view.addSubView(panelView);
        elyWorkshop.create(panelView.contentView);
        elyWorkshop.startAutoSaver();
    }
}

//
//  Обработка завершения запуска приложения
//
elyOnReady(next => {

    elyStylesheet.global.add("body", {
        background: "url('img/bg.jpg') center center",
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#dfdfdf",
        minHeight: window.innerHeight + "px"
    });

    // Регистрация контроллера в приложении по имени
    addController("index", new IndexViewController());
    addController("builder", new BuilderViewController());

    elyApplication.navigationView.imageView.getStyle().marginBottom = "-4px";
    elyApplication.navigationView.titleView.resize((view, maxWidth) => {
        view.hidden(maxWidth < 500);
    });

    elyApplication.navigationView.itemsView.clearView();
    elyApplication.navigationView.itemsView.hidden(false);
    elyApplication.navigationView.itemsView.add(
        new elyTextView({text: "Строитель"}).addClass("clickable").actionString("#content(builder)"),
    );

    // Сообщает приложению, что все успешно запустилось.
    // Попробуйте раскомментировать строку ниже для примера и понимания.
    // next(false, "Необязательное описание ошибки");
    next(true);
});

