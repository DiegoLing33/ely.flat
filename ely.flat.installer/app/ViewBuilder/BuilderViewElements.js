import {Utils} from "../../build/ely.flat";

export const BuilderViewElements = {

    View: {
        fields: {
            __groups: {
                View: {
                    hidden: "boolean",
                    opacity: "float",
                },
                Style: {
                    styleClickable: "boolean",
                    styleNoSelect: "boolean",
                }
            }
        }
    },

    BoxView: {
        type: "Content",
        description: "Элемент отображения: контейнер. Простой контейнер с эффектом наведения и рамкой.",
        extends: ["View"],
        fields: {
            boxHover: "boolean",
        },
        grid: ["__containerView"],
        defaults: {
            containerView: ["s", {
                "_item": "StaticGridLayoutView",
                "columns": 1,
                "rows": 1,
                "items": []
            }]
        },
    },

    BoxHeaderView: {
        type: "Content",
        description: "Элемент отображения: контейнер с заголовком. " +
            "Контейнер с эффектом наведения, рамкой и заголовком",
        extends: ["BoxView"],
        fields: {
            boxTitle: "string"
        },
        grid: ["__containerView"],
        defaults: {
            boxTitle: "Box",
            containerView: ["s", {
                "_item": "StaticGridLayoutView",
                "columns": 1,
                "rows": 1,
                "items": []
            }]
        },
    },

    Button: {
        type: "Action",
        description: "Элемент отображения: кнопка.",
        extends: ["View"],
        fields: {
            text: "string",
            buttonRounded: "boolean",
            buttonStyle: "styles",
            buttonSize: "sizes",
        },
        defaults: {
            text: "Button"
        }
    },

    ProgressBarView: {
        type: "View",
        description: "Элемент отображения: полоса загрузки.",
        extends: ["View"],
        fields: {
            progressBarStyle: "styles",
            minValue: "float",
            maxValue: "float",
            value: "float",
        },
        defaults: {
            minValue: 0,
            maxValue: 100,
            value: 30,
        }
    },

    ImageView: {
        extends: ["View"],
        type: "View",
        description: "Элемент отображения: картинка",
        fields: {
            url: "string",
        },
    },

    IconView: {
        extends: ["View"],
        type: "Text",
        description: "Элемент отображения: иконка.",
        fields: {
            iconName: "string",
            spinning: "boolean",
            iconStyle: "styles",
            iconSize: "sizes",
            iconWights: "weights",
        },
        defaults: {
            iconName: "refresh",
        }
    },

    TextView: {
        type: "Text",
        description: "Элемент отображения: текст.",
        extends: ["View"],
        fields: {
            textStyle: "styles",
            testSize: "sizes",
            testWights: "weights",
            text: "string",
            textCenter: "boolean",
        },
        defaults: {
            text: "Text View"
        }
    },

    PanelView: {
        extends: ["View"],
        type: "Content",
        description: "Элемент отображения: панель. Панель может содержать заголовок и кнопку активации.",
        fields: {
            panelTitle: "string",
            panelActionText: "string",
            panelHover: "boolean"
        },
        grid: ["__contentView"],
        defaults: {
            panelTitle: "Panel",
            panelActionText: null,
            panelContainer: ["s", {
                "_item": "StaticGridLayoutView",
                "columns": 1,
                "rows": 1,
                "items": []
            }]
        }
    },

    Field: {
        extends: ["View"],
        fields: {
            placeholder: "string",
            editable: "boolean",
        }
    },

    TextField: {
        type: "Field",
        description: "Поле ввода текста.",
        extends: ["Field"],
        fields: {
            fieldType: "textFieldTypes",
            value: "string",
            __groups: {
                Icons: {
                    rightIconName: "string",
                    leftIconName: "string",
                }
            }
        },
        defaults: {
            placeholder: "Text Field"
        }
    },

    SwitchField: {
        type: "Field",
        description: "Поле ввода: переключатель.",
        extends: ["Field"],
        fields: {
            switchStyle: "styles",
            value: "boolean",
            leftLabel: "string",
            rightLabel: "string",
        },
        defaults: {
            leftLabel: "Switch field",
        }
    },

    TextAreaField: {
        type: "Field",
        description: "Поле ввода многострочного текста.",
        extends: ["Field"],
        fields: {
            rowsCount: "number",
            readonly: "boolean",
        }
    },

    StaticGridLayoutView: {
        type: "Layout",
        description: "Разметка. Элементы расположены на фиксированной сетке.",
        extends: ["View"],
        fields: {
            columns: "number",
            rows: "number"
        },
        defaults: {
            columns: 3,
            rows: 3,
        }
    },
};

export const BuilderViewElementsFieldsLang = {
    text: "Текст",
    hidden: "Скрыть",
    opacity: "Прозрачность",

    buttonSize: "Размер кнопки",
    buttonStyle: "Стиль кнопки",

    textSize: "Размер текста",
    textStyle: "Стиль текста",
    textWights: "Толщина текста",

    iconSize: "Размер иконки",
    iconStyle: "Стиль иконки",
    iconWights: "Толщина иконки",

    value: "Значение",
    editable: "Редактирование",
    placeholder: "Плейсхолдер",

    panelTitle: "Заголовок панели",
    panelActionText: "Текст активации",
    panelHover: "Эффект наведения",

    columns: "Количество столбцов",
    rows: "Количество строк",

    rightIconName: "Имя иконки справа",
    leftIconName: "Имя иконки слева",

    styleClickable: "Стиль активного для нажатия элемента",
    styleNoSelect: "Стиль запрещающий выделение элемента",

    boxHover: "Эффект наведения",
    boxTitle: "Заголовок",

    leftLabel: "Левый заголовок",
    rightLabel: "Правый заголовок",

    switchStyle: "Стиль переключателя",
    progressBarStyle: "Стиль полосы прогресса",

    __groups: {
        View: "Отображение",
        Style: "Стили",
        Icons: "Иконки",
    }
};

/**
 * Возвращает перевод группы
 * @param group
 * @return {*}
 */
export function getGroupLang(group) {
    return BuilderViewElementsFieldsLang.__groups[group] ?
        BuilderViewElementsFieldsLang.__groups[group] : group;
}

export function getFieldsMap(name) {
    const val = BuilderViewElements[name];
    let opts = {};
    if (val.extends) {
        val.extends.forEach(ext => {
            opts = Utils.mergeDeep(opts, getFieldsMap(ext));
        });
    }
    return Utils.mergeDeep(opts, val.fields);
}
