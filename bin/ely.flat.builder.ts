/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 +                                                                            +
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: ely.flat.builder.ts                                                  +
 + Файл изменен: 05.12.2018 22:42:58                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// @ts-ignore
import boxen = require("boxen");
import child_process = require("child_process");
import figlet = require("figlet");
import fs = require("fs");
import path = require("path");
// @ts-ignore
import prompt = require("prompt");
import elyXLogger from "../ely.core/src/utils/elyXLogger";

const jsBuildPath = "ely.build.js";
const productsPath = "products";
const product_elyFlatAppPath = `${productsPath}/ely.flat.application`;
const logger = new elyXLogger({mainPrefix: "Builder"});

prompt.start();

welcome();

/**
 * Функция привествия
 */
function welcome(): void {
    console.clear();
    console.log(elyXLogger.styles.fgYellow + figlet.textSync(`e l y . f l a t`));
    console.log(elyXLogger.styles.reset);
    console.log();
    logger.log("Добро пожаловать в строитель ely.flat!");
    console.log();

    console.log(boxen(
        "1 - Выполнить сборку ely.flat application (develop)\n" +
        "2 - Выполнить сборку ely.flat application (release)\n" +
        "3 - Создать проект (JS)\n" +
        "4 - Обновить ресурсы проекта (JS)\n" +
        "0 - Выход", {padding: 1, borderColor: "cyan", align: "left"}));
    console.log();

    menu();
}

function menu(): void {
    prompt.get([{name: "cmd", description: "Номер команды"}], (err: any, result: any) => {
        execMenuCommand(result.cmd);
    });
}

/**
 * Выполнение меню
 * @param cmd
 */
function execMenuCommand(cmd: string): void {
    if (!(/[0-9]+/.test(cmd))) {
        welcome();
        return;
    }
    const cmdNum = parseInt(cmd, 10);
    if (cmdNum === 1) buildPaths();
    if (cmdNum === 3) commandCreateProject();
    if (cmdNum === 4) commandRebuildProject();
    if (cmdNum === 0) process.exit(0);
}

function commandCreateProjectStep(name: string, step: number, cb: () => void) {
    switch (step) {
        case 0:
            logger.log("Построение архитектуры...");
            child_process.exec("mkdir ely.flat.test", () => {
                cb();
            });
            break;
        case 1:
            logger.log("Построение директории проекта...");
            child_process.exec(`mkdir ely.flat.test/${name}`, () => {
                cb();
            });
            break;
        case 2:
            logger.log("Построение директории шрифтов...");
            child_process.exec(`mkdir ely.flat.test/${name}/fonts`, () => {
                cb();
            });
            break;
        case 3:
            logger.log("Построение директории ресурсов JS...");
            child_process.exec(`mkdir ely.flat.test/${name}/js`, () => {
                cb();
            });
            break;
        case 4:
            logger.log("Построение директории ресурсов CSS...");
            child_process.exec(`mkdir ely.flat.test/${name}/css`, () => {
                cb();
            });
            break;
        case 5:
            logger.log("Построение CSS файла ely.flat...");
            child_process.exec(`sass ${product_elyFlatAppPath}/scss/ely.flat.application.scss`, () => {
                logger.log("Копирование стилей...");
                child_process.exec(
                    `cp ${product_elyFlatAppPath}/scss/*.css* ` +
                    `ely.flat.test/${name}/css`, () => {
                        cb();
                    });

            });
            break;
        case 6:
            logger.log("Копирование стартовых файлов...");
            child_process.exec(`cp ely.application/startup/* ely.flat.test/${name}`, () => {
                cb();
            });
            break;
        case 7:
            logger.log("Копирование файлов JS...");
            child_process.exec(`cp dist/ely.flat.application/* ely.flat.test/${name}/js`, () => {
                cb();
            });
            break;
        case 8:
            logger.log("Копирование шрифтов...");
            child_process.exec(`cp ely.resources.fonts/* ely.flat.test/${name}/fonts`, () => {
                cb();
            });
            break;
    }
}

/**
 * Пошагово создает проект
 * @param name
 * @param cb
 * @param ex
 */
function commandCreateProjectStepByStep(name: string, cb: () => void, ex?: number[]): void {
    let i = 0;

    function req() {
        i++;
        if (i === 9) {
            cb();
        } else {
            if (ex && ex.indexOf(i) > -1)
                commandCreateProjectStep(name, i + 1, req);
            else
                commandCreateProjectStep(name, i, req);
        }
    }

    req();
}

function menuBack() {
    let i = 4;
    const th = setInterval(() => {
        i--;
        logger.log(`Выход в меню через ${i} сек...`);
        if (i === 0) {
            clearInterval(th);
            welcome();
        }
    }, 1000);
}

/**
 * Команда создания проекта
 */
function commandCreateProject(): void {
    prompt.get([{name: "name", description: "Системное имя проекта"}, {
        description: "Заголовок",
        name: "title",
    }], (err: any, result: any) => {
        const name = result.name;

        buildPaths(false, () => {
            commandCreateProjectStepByStep(name, () => {
                logger.log("Проект успешно создан!");
                menuBack();
            });
        });
    });
}

/**
 * Команда перестроения проекта
 */
function commandRebuildProject(): void {
    prompt.get([{name: "name", description: "Системное имя проекта"}], (err: any, result: any) => {
        const name = result.name;
        logger.log("Перестроение проекта...");
        buildPaths(false, () => {
            commandCreateProjectStepByStep(name, () => {
                logger.log("Проект успешно перестроен!");
                menuBack();
            }, [6]);
        });
    });
}

function buildPaths(back: boolean = true, cb?: () => void) {
    logger.log("Перестроение...");
    child_process.exec("tsc", () => {
        logger.log("Изменение путей в dist файле...");
        fs.readFile("tsconfig.json", (err, data) => {
            const json = JSON.parse(String(data || ""));
            const paths = json.compilerOptions.paths;

            const walkSync = (dir: string) => {
                const files = fs.readdirSync(dir);
                files.forEach(file => {
                    if (fs.statSync(dir + "/" + file).isDirectory()) {
                        walkSync(dir + "/" + file);
                    } else {
                        logger.log(`Обработка файла ${dir}/${file}...`);

                        const data1 = fs.readFileSync(dir + "/" + file);
                        let res = String(data1);
                        res = res.replace(/require\(\"(@[A-z]+\/)(.+)\"\)/g,
                            (substring, p, r) => {
                                p += "*";
                                let rep = substring;
                                if (paths[p]) {
                                    let np = String(paths[p][0]).replace("\*", "");
                                    np = np.replace(/^.\//, path.relative(dir, "ely.build.js")
                                        .replace("/ely.build.js", "/") + "/");
                                    rep = `require("${np}${r}")`;
                                }

                                logger.log(elyXLogger.styles.fgCyan + `Найдено ${substring} -> ${rep}` +
                                    elyXLogger.styles.reset);
                                // if (paths[p])
                                // return `require("${String(paths[p][0]).replace("\*", "")}${r}")`;
                                // else return substring;
                                return rep;
                            });
                        fs.writeFileSync(dir + "/" + file, res);
                    }
                });
            };
            walkSync("ely.build.js");
            logger.log("Построение...");
            child_process.exec("./node_modules/.bin/rollup -c", () => {
                /*logger.log("Постпроцессинг файла...");
                let outFile = String(fs.readFileSync("dist/ely.flat.application/ely.flat.application.js") || "");
                outFile = outFile.replace(/unwrapExports\((.+)_1\);/g, (str, a) => {
                    logger.log(`Найден объект ${elyXLogger.styles.fgYellow}${a}${elyXLogger.styles.reset}`);
                    return `let ${a} = ${str}`;
                });
                fs.writeFileSync("dist/ely.flat.application/ely.flat.application.js", outFile);*/
                logger.log("Фреймворк ely.flat application успешно построен!");
                if (back) menuBack();
                else {
                    if (cb) cb();
                }
            });
        });
    });
}
