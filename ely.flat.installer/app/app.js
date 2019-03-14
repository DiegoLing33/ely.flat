/**
 * Класс контроллера отображения Index (главного экрана)
 *
 * @controller IndexViewController
 * @controllerName Index
 */
import {
    addController,
    elyOnReady, screenController,
} from "../build/ely.flat";
import {ConfigViewController} from "./controllers/ConfigViewController";
import {IndexViewController} from "./controllers/IndexViewController";
import {workingDirectoryField} from "./utils/utils";
import {getWorkingDirectoryCommand} from "./utils/commands";
import {ServerViewController} from "./controllers/ServerViewController";
import {DatabaseViewController} from "./controllers/efxapp/DatabaseViewController";
import BuilderViewController from "./ViewBuilder/BuilderViewController";


//
//  Обработка завершения запуска приложения
//
elyOnReady(next => {

    // Регистрация контроллера в приложении по имени
    addController("index", new IndexViewController());
    addController("config", new ConfigViewController());
    addController("server", new ServerViewController());

    //efx-app
    addController("dbview", new DatabaseViewController());

    // View Builder
    addController("index", new BuilderViewController());

    // Сообщает приложению, что все успешно запустилось.
    // Попробуйте раскомментировать строку ниже для примера и понимания.
    // next(false, "Необязательное описание ошибки");
    getWorkingDirectoryCommand((s, res) => {
        if (res.directory) {
            workingDirectoryField.value(res.directory);
            next(true);
        } else {
            next(false, "Не удалось соединиться с efi.cli =(");
        }
    });
});

