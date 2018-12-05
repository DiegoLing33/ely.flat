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

    console.log(boxen("1 - Выполнить сборку (Develop)\n2 - Выполнит сборку (release)\n" +
        "3 - Создать проект (JS)\n" +
        "4 - Создать проект (TS)\n" +
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
            if (!fs.existsSync("bundle/scss/ely.flat.css")) {
                let flag = false;
                logger.warning("Построение CSS файла ely.flat...");
                child_process.exec("scss bundle/scss/ely.flat.sass", () => {
                    flag = true;
                });
                while (true) {
                    if (flag) break;
                }
            }
            logger.log("Копирование шрифтов...");
            child_process.exec(`cp ely.resources.fonts/* ely.flat.test/${name}/fonts`, () => {
                cb();
            });
            break;
        case 6:
            logger.log("Копирование стартовых файлов...");
            child_process.exec(`cp ely.application/startup/* ely.flat.test/${name}`, () => {
                cb();
            });
            break;
    }
}

/**
 * Пошагово создает проект
 * @param name
 * @param cb
 */
function commandCreateProjectStepByStep(name: string, cb: () => void): void {
    let i = 0;

    function req() {
        i++;
        if (i === 6) {
            cb();
        } else {
            commandCreateProjectStep(name, i, req);
        }
    }

    req();
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
        commandCreateProjectStepByStep(name, () => {
            logger.log("Проект успешно создан!");
            let i = 6;
            const th = setInterval(() => {
                i--;
                logger.log(`Выход в меню через ${i} сек...`);
                if (i === 0) {
                    clearInterval(th);
                    welcome();
                }
            }, 1000);
        });
    });
}

function buildPaths(cb?: () => void) {
    logger.log("Перестроение...");
    child_process.exec("tsc", ()=> {
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
                        res = res.replace(/require\(\"(@[A-z]+\/)(.+)\"\);/g,
                            (substring, p, r) => {
                                p += "*";
                                let rep = substring;
                                if (paths[p]) {
                                    let np = String(paths[p][0]).replace("\*", "");
                                    np = np.replace(/^.\//, path.relative(dir, "dist")
                                        .replace("/dist", "/") + "/");
                                    rep = `require("${np}${r}");`;
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
            walkSync("dist");
        });
    });
}
