/**
 *
 * My first application
 *
 * @author ...
 * @version ...
 */

//
//  Подключение необходимых модулей
//
import {
    addController,
    Button,
    elyOnReady,
    SimplePageViewController,
} from "./ely.flat";

/**
 * Класс контроллера отображения Index (главного экрана)
 *
 * @controller IndexViewController
 * @controllerName Index
 */

class IndexViewController extends SimplePageViewController {

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

        // Установка заголовка и описания
        // для контроллера типа SimplePageViewController
        this.title("ely.Flat *{* *}*");
        this.description("Приложение разработано на основе ely.flat framework");

        // Создание первого элемента!
        let button = new Button({text: "Нажми на меня", fill: true});

        button.click(() => {
            button.fadeOut();
        });

        // Отображение элемента в макете контроллера
        this.view.add(button);
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

