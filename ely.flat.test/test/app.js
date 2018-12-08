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

        /*this.title("ely.flat *{* Application *}*");
        this.description("Приложение разработано на основе ely.flat framework");

        let cp = new elyColorPickerField({editable: true, value: new elyColor({hex: "00ff00"})});
        cp.valueProperty.change(value => {
           console.log(value);
        });
        this.view.add(cp);*/
        elyWSProject.loadUrl("res1.elyws", project => {
            this.view.add(project.getWorkspace());
            project.getViewByName("elyButton-view-40").click(()=>{
               new elyNotificationView({title: "lol"}).present();
            });
        });
    }
}

//
//  Обработка завершения запуска приложения
//
elyOnReady(next => {
    // Регистрация контроллера в приложении по имени
    addController("index", new IndexViewController());

    // Сообщает приложению, что все успешно запустилось.
    // Попробуйте раскомментировать строку ниже для примера и понимания.
    // next(false, "Необязательное описание ошибки");
    next(true);
});

