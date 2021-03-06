import {
    GridLayoutView, HeaderTextView,
    PanelView,
    SwitchField,
    TextField,
    Control,
    Size,
    Color,
    // elyColorPickerField,
    SimplePageViewController, Style
} from "../../build/ely.flat";
import {addHomeButton, serverWindow} from "../utils/utils";
import {getConfigCommand, setConfigCommand} from "../utils/commands";

let __cfg;

/**
 * Контроллер отображения: Экран конфигурации
 */
export class ConfigViewController extends SimplePageViewController {
    viewDidLoad() {
        super.viewDidLoad();

        // Установка заголовка и описания
        // для контроллера типа SimplePageViewController
        this.title("ely.flat *{* Installer *}*");
        this.description("Настройка приложения");

        addHomeButton(this.view);
        this.view.add(new Control({tag: "br"}));

        getConfigCommand((cfg) => {
            __cfg = cfg;

            let appSettings = {
                name: "Приложение",
                options: [
                    [
                        "Название приложения",
                        "Название Вашего приложения будет отображено в title тэге, а также при добавлении на " +
                        "домашний экран смартфона.",
                        new TextField({value: cfg.app.title}),
                        "app.title"
                    ]
                ]
            };

            let navigationSettings = {
                name: "Панель навигации",
                options: [
                    [
                        "Текст на панели навигации",
                        "Название Вашего приложения. Отображается в левом углу навигации или в центре, если приложение " +
                        "запущено с мобильного устройства.",
                        new TextField({value: cfg.navigationBar.title}),
                        "navigationBar.title"
                    ],
                    [
                        "Цвет панели навигации",
                        "Основной цвет верхней панели навигации.",
                        new TextField({value: cfg.navigationBar.color}),
                        "navigationBar.Color"
                    ]
                ]
            };

            let templateSettings = {
                name: "Шаблон",
                options: [
                    [
                        "Максимальная ширина контейнера",
                        "Максимальная ширина контейнера приложения, которая возможна. Вы можете установить 100% " +
                        "или указать значение в пикислях.",
                        new TextField({value: cfg.template.maxContainerWidth}),
                        "template.maxContainerWidth"
                    ],
                    [
                        "Основной цвет приложения",
                        "Основной цвет приложения или primary Color. В соответсвии с ним будут установлены другие цвета.",
                        new TextField({value: cfg.navigationBar.color}),
                        "template.Color"
                    ],
                    ["Подвал"],
                    [
                        "Основной текст",
                        "Основной текст имеет более яркий окрас и большой размер.",
                        new TextField({value: cfg.template.footer.title}),
                        "template.footer.title"
                    ],
                    [
                        "Дополнительный текст",
                        "Дополнительный текст распологается под основным и менее заметен.",
                        new TextField({value: cfg.template.footer.subtitle}),
                        "template.footer.subtitle"
                    ],
                ]
            };


            let metaSettings = {
                name: "Мета данные",
                options: [
                    [
                        "Кодировка приложения",
                        "Кодировка символов в приложении. Устанавливается в мета заголовок.",
                        new TextField({value: cfg.meta.charset}),
                        "meta.charset"
                    ],
                    [
                        "Путь до иконок",
                        "Путь до иконок приложения. Необходимо для манифеста *useApplicationIcon*",
                        new TextField({value: cfg.meta.iconPath}),
                        "meta.iconPath"
                    ]
                ]
            };

            let manifestSettings = {
                name: "Манифесты",
                options: [
                    [
                        "Использование панели навигации",
                        "Панель навигации отображается в верху приложения.",
                        new SwitchField({value: cfg.manifest.useNavigationBar}),
                        "manifest.useNavigationBar"
                    ],
                    [
                        "Использование мета заголовков",
                        "В мета заголовков хранится название Вашего приложения и кодировка UTF-8.",
                        new SwitchField({value: cfg.manifest.useMeta}),
                        "manifest.useMeta"
                    ],
                    [
                        "Использование иконки приложения",
                        "Иконки приложения будут добавлены в мета заголовки.",
                        new SwitchField({value: cfg.manifest.useApplicationIcon}),
                        "manifest.useApplicationIcon"
                    ],
                    [
                        "Использование адаптации дисплея",
                        "В мета заголовки будет добавлен корректный тег viewport.",
                        new SwitchField({value: cfg.manifest.useViewPort}),
                        "manifest.useViewPort"
                    ],
                    [
                        "Разрешает использование standalone",
                        "Ваше приложение сможет быть добавлено на домашний экран смартфона, после чего " +
                        "оно будет работать как полноценное приложение.",
                        new SwitchField({value: cfg.manifest.allowStandaloneMode}),
                        "manifest.allowStandaloneMode"
                    ],
                    [
                        "Использование iPhone X view fix",
                        "Некоторые элементы приложения будут адаптированы под iPhone X. Например, полоса навигации.",
                        new SwitchField({value: cfg.manifest.useIPhoneXStandaloneFix}),
                        "manifest.useIPhoneXStandaloneFix"
                    ],
                    [
                        "Использование режима разработчика",
                        "Режим разработчика необходим для работы с Live update server в программе efi.",
                        new SwitchField({value: cfg.manifest.useDevelopMode}),
                        "manifest.useDevelopMode"
                    ]
                ]
            };


            this.view.add(this.settingsPanel(appSettings));
            this.view.add(this.settingsPanel(templateSettings));
            this.view.add(this.settingsPanel(navigationSettings));
            this.view.add(this.settingsPanel(metaSettings));
            this.view.add(this.settingsPanel(manifestSettings));
            this.view.add(new Control({tag: "br"}));
            addHomeButton(this.view);
        });

    }

    settingsPanel(data) {
        let efPanel = new PanelView({
            panelTitle: data.name
        });
        data.options.forEach(value =>
            efPanel.getContentView().add(this.optionsRow(value)));
        return efPanel;
    }

    optionsRow(data) {
        if (data.length === 1) {
            return String(data[0]).headerTextView({headerLevel: 1});
        } else {
            let grid = new GridLayoutView();
            let header = new HeaderTextView({text: data[0], headerLevel: 2});
            grid.add(header);
            grid.add(data[2]);
            data[2].placeholder(data[0]);
            data[2].change(value => {
                data[2].editable(false);
                if(typeof value === "number" || typeof value === "boolean"){
                    console.log(value, typeof value);
                }else{
                    value = value.toString();
                }
                setConfigCommand(data[3], value, () => {
                    data[2].editable(true);
                    if (serverWindow.win) {
                        serverWindow.win.location.href = "http://127.0.0.1:1580";
                    }
                });

            });
            grid.add(String(data[1]).textView({opacity: 0.5}));
            grid.add(String(data[3]).textView({opacity: 0.4, textStyle: Style.primary}));
            return grid;
        }
    }
}
