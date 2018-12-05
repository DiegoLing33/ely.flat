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
 + Проект: ely.flat.application                                               +
 +                                                                            +
 + Файл: elyTabBarView.ts                                                     +
 + Файл изменен: 23.11.2018 23:52:08                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

import elyRebuildableViewProtocol from "@controls/protocols/elyRebuildableViewProtocol";
import elyTextView from "@controls/text/elyTextView";
import elyPanelView from "@controls/view/elyPanelView";
import elyView from "@core/controls/elyView";
import elyObservableDictionary from "@core/observable/properties/elyObservableDictionary";
import elyObservableProperty from "@core/observable/properties/elyObservableProperty";
import elyStyle from "@enums/elyStyle";
import elyTabBarOptions from "@options/navigation/elyTabBarOptions";

/**
 * Элемент таб бара
 */
interface elyTabBarViewItem {
    text: string;
    iconName?: string;
    content?: elyView;
    selected?: boolean;
}

/**
 * Элемент отображения: Панель с табами
 *
 * @version 1.0
 */
export default class elyTabBarView extends elyRebuildableViewProtocol {

    /**
     * Табы
     */
    public readonly tabsProperty: elyObservableDictionary<elyTabBarViewItem>;

    /**
     * Свойство: стиль бара
     * @ignore
     */
    protected readonly tabBarStyleProperty: elyObservableProperty<elyStyle>;

    /**
     * Отображение контента
     */
    protected readonly contentView: elyPanelView;

    /**
     * Свойство: значение текущей вкладки
     * @ignore
     */
    protected readonly tabBarCurrentTabNameProperty: elyObservableProperty<string>;

    /**
     * Конструктор
     * @param props
     */
    public constructor(props: elyTabBarOptions = {}) {
        super(props);
        this.addClass("ef-tabs");
        this.tabsProperty = new elyObservableDictionary<elyTabBarViewItem>();
        this.contentView = new elyPanelView({hidden: true});
        this.tabsProperty.change(() => this.rebuild());

        this.tabBarStyleProperty = new elyObservableProperty<elyStyle>(elyStyle.default);
        this.tabBarStyleProperty.change((newValue, oldValue) => {
            if (oldValue) this.removeClass(`bg-${oldValue.value}`);
            this.addClass(`bg-${newValue.value}`);
        });

        this.tabBarCurrentTabNameProperty = new elyObservableProperty<string>("");
        this.tabBarCurrentTabNameProperty.change((value, old) => {
            this.contentView.hidden(true);
            this.tabsProperty.forEach((key, tab) => {
                tab.selected = key === value;
                if (tab.selected) {
                    this.contentView.titleView.text(tab.text);
                    this.contentView.titleView.iconName(tab.iconName);
                    this.contentView.hidden(false);
                    if (tab.content) {
                        this.contentView.contentView.removeViewContent();
                        this.contentView.contentView.addSubView(tab.content);
                    }
                }
            });
            this.rebuild();
        });

        this.tabBarStyle(props.tabBarStyle || elyStyle.primary);
        if (props.tabBarSticky) this.addClass("sticky");

        this.contentView.descriptionView.removeFromSuperview();
        this.contentView.titleView.getStyle().border = "none";
        this.contentView.contentView.getStyle().margin = "-10px";
        this.contentView.getStyle().position = "fixed";
        this.contentView.getStyle().width = "340px";
        this.contentView.getStyle().backgroundColor = "#29353E";
        this.contentView.getStyle().right = "0";
        this.contentView.getStyle().zIndex = (parseInt(this.getStyle().zIndex || "1000", 10) - 10).toString();
    }

    /**
     * Возвращает значение текущей вкладки
     */
    public tabBarCurrentTabName(): string;

    /**
     * Устанавливает значение текущей вкладки
     */
    public tabBarCurrentTabName(value: string): elyTabBarView;

    /**
     * Возвращает и устанавливает значение текущей вкладки
     */
    public tabBarCurrentTabName(value?: string): string | null | elyTabBarView {
        return elyObservableProperty.simplePropertyAccess(this, value, this.tabBarCurrentTabNameProperty);
    }

    /**
     * Возвращает стиль бара
     */
    public tabBarStyle(): elyStyle;

    /**
     * Устанавливает стиль бара
     */
    public tabBarStyle(value: elyStyle | string): elyTabBarView;

    /**
     * Возвращает и устанавливает стиль бара
     */
    public tabBarStyle(value?: elyStyle | string): elyStyle | null | elyTabBarView {
        if (typeof value === "string") value = elyStyle.byName(value);
        return elyObservableProperty.simplePropertyAccess(this, value, this.tabBarStyleProperty);
    }

    /**
     * Добавляет объект
     * @param name - системное имя
     * @param tab - сущность
     */
    public add(name: string, tab: elyTabBarViewItem): elyTabBarView {
        this.tabsProperty.add(name, tab);
        return this;
    }

    /**
     * Выполняет перестроение
     * @private
     */
    protected __rebuild(): elyTabBarView {
        this.removeViewContent();
        this.getDocument().append(this.contentView.getDocument());
        this.tabsProperty.forEach((key, value) => {
            const view = new elyTextView({text: value.text, iconName: value.iconName});
            if (value.selected) view.addClass("active");
            view.addClass("ef-tabs-item");
            view.addObserver("click", () => {
                if (this.tabBarCurrentTabName() === key) this.tabBarCurrentTabName("");
                else this.tabBarCurrentTabName(key);
            });
            this.getDocument().append(view.getDocument());
        });
        this.contentView.getStyle().top = this.getRect().top + "px";
        this.contentView.getStyle().right = this.width() + "px";
        this.contentView.getStyle().height = (window.innerHeight - this.getRect().top) + "px";
        this.contentView.panelStyle(this.tabBarStyle());
        return this;
    }
}
