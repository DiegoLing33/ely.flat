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

        let cp = new elyColorPickerField({editable: true, value: new elyColor({hex: "0000ff"})});
        cp.valueProperty.change(value => {
           console.log(value);
        });

        let field = new elyTextField({placeholder: "Username"});
        let pass = new elyTextField({placeholder: "Password", filedType: elyFieldType.password});

        let btn = new elyButton({text: "Click me"}).fill();

        this.view.setItemsMargin({top: 10, bottom: 10});

        this.view.add(field);
        this.view.add(pass);
        this.view.add(btn);

        this.view.add(elyControl.line());
        this.view.add(cp);
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

