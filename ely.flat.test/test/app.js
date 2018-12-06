require("/ely.build.js/products/ely.flat.application/src/ely.flat.application");
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

        this.title("Open.test *{* *}*");
        this.description("Приложение разработано на основе ely.flat framework");
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

