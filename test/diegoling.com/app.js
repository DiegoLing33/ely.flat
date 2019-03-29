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
    elyOnReady,
} from "../../products/ely.flat";
import IndexController from "./src/IndexController";
import MusicController from "./src/MusicController";


//
//  Обработка завершения запуска приложения
//
elyOnReady(next => {


    // Регистрация контроллера в приложении по имени
    addController("index", new IndexController({}));
    addController("music", new MusicController({}));

    // Сообщает приложению, что все успешно запустилось.
    // Попробуйте раскомментировать строку ниже для примера и понимания.
    // next(false, "Необязательное описание ошибки");
    next(true);
});

/*
<iframe width="853" height="480" src="https://www.youtube.com/embed/Hc6bSG-egUk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 */