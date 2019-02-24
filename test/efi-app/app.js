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
    efButton, efTextField, efxApp,
    elyOnReady,
    elySimplePageViewController,
} from "./ely.flat";

//
// Режим разработчика. Раскоментируйте
// строку ниже для его активации.
//
// После активации, запустите в консоли: ely.flat.builder --live
// для включения режима "живого обновления".
//
// developMode(true);

/**
 * Класс контроллера отображения Index (главного экрана)
 *
 * @controller IndexViewController
 * @controllerName Index
 */

class IndexViewController extends elySimplePageViewController {

    /**
     * Данный метод выполняется после загрузки экрана
     *
     * + В данном методе рекомендуется выполнять элементарную отрисовку,
     *   а также программную логику контроллера элемента отображения.
     * + Данный метод выполняется один раз.
     *
     * Внимание! Рекомендуется изучить делегат elyViewWillDraw для полного
     * понимания отрисовки элементов elyView.
     */
    viewDidLoad() {
        // Вызов рдительского метода
        super.viewDidLoad();

        // Установка заголовка и описания
        // для контроллера типа elySimplePageViewController
        this.title("ely.Flat *{* *}*");
        this.description("Приложение разработано на основе ely.flat framework");

        let name = new efTextField({placeholder: "Введите название"});
        let count = new efTextField({placeholder: "Введите количество"});
        // Создание первого элемента!
        let button = new efButton({text: "Добавить", fill: true});
        button.click(() => {
            if(name.isEmpty()) return name.error(true);
            if(count.isEmpty()) return count.error(true);
            new efxApp().sendRaw("addTableRow", {table: "global", name: name.value(), value: count.value()}, (a, b)=>{
               console.log(a, b);
                name.clearValue();
                count.clearValue();
            });
        });

        // Отображение элемента в макете контроллера
        this.view.add(name, count);
        this.view.add("<br>".textView());
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

