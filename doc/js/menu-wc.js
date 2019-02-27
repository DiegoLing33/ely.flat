'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ely.flat { doc }</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Ввидети для поиска..."></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Быстрый старт</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Просмотр
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Завсимости
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Классы</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/__elyScreenIndexViewController.html" data-type="entity-link">__elyScreenIndexViewController</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppColorManager.html" data-type="entity-link">AppColorManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppConfig.html" data-type="entity-link">AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppDevelopConsole.html" data-type="entity-link">AppDevelopConsole</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppDocument.html" data-type="entity-link">AppDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppDocumentBody.html" data-type="entity-link">AppDocumentBody</a>
                            </li>
                            <li class="link">
                                <a href="classes/appDocumentHead.html" data-type="entity-link">appDocumentHead</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppFileWatcher.html" data-type="entity-link">AppFileWatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/Application.html" data-type="entity-link">Application</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPreloaderView.html" data-type="entity-link">AppPreloaderView</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppStylesheet.html" data-type="entity-link">AppStylesheet</a>
                            </li>
                            <li class="link">
                                <a href="classes/Button.html" data-type="entity-link">Button</a>
                            </li>
                            <li class="link">
                                <a href="classes/Color.html" data-type="entity-link">Color</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorUtils.html" data-type="entity-link">ColorUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContainerView.html" data-type="entity-link">ContainerView</a>
                            </li>
                            <li class="link">
                                <a href="classes/Control.html" data-type="entity-link">Control</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cookies.html" data-type="entity-link">Cookies</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceDetector.html" data-type="entity-link">DeviceDetector</a>
                            </li>
                            <li class="link">
                                <a href="classes/ef2DRect.html" data-type="entity-link">ef2DRect</a>
                            </li>
                            <li class="link">
                                <a href="classes/ef2DVector.html" data-type="entity-link">ef2DVector</a>
                            </li>
                            <li class="link">
                                <a href="classes/ef2DVectorValues.html" data-type="entity-link">ef2DVectorValues</a>
                            </li>
                            <li class="link">
                                <a href="classes/efCanvas.html" data-type="entity-link">efCanvas</a>
                            </li>
                            <li class="link">
                                <a href="classes/efCanvasLayer.html" data-type="entity-link">efCanvasLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/efContextElement.html" data-type="entity-link">efContextElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/efContextImage.html" data-type="entity-link">efContextImage</a>
                            </li>
                            <li class="link">
                                <a href="classes/efContextRect.html" data-type="entity-link">efContextRect</a>
                            </li>
                            <li class="link">
                                <a href="classes/efContextText.html" data-type="entity-link">efContextText</a>
                            </li>
                            <li class="link">
                                <a href="classes/efEditableProtocol.html" data-type="entity-link">efEditableProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efErrorDisplayProtocol.html" data-type="entity-link">efErrorDisplayProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efiDatabaseClient.html" data-type="entity-link">efiDatabaseClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/efiDatabaseClientTable.html" data-type="entity-link">efiDatabaseClientTable</a>
                            </li>
                            <li class="link">
                                <a href="classes/efProtocol.html" data-type="entity-link">efProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efSerializableProtocol.html" data-type="entity-link">efSerializableProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efSize.html" data-type="entity-link">efSize</a>
                            </li>
                            <li class="link">
                                <a href="classes/efUpdatableProtocol.html" data-type="entity-link">efUpdatableProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efValidatableProtocol.html" data-type="entity-link">efValidatableProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efValueProtocol.html" data-type="entity-link">efValueProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/efxApp.html" data-type="entity-link">efxApp</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyAxis.html" data-type="entity-link">elyAxis</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyChartView.html" data-type="entity-link">elyChartView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyColorPickerField.html" data-type="entity-link">elyColorPickerField</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyDataGridView.html" data-type="entity-link">elyDataGridView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyDirection.html" data-type="entity-link">elyDirection</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyEncrypt.html" data-type="entity-link">elyEncrypt</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyEnum.html" data-type="entity-link">elyEnum</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyFlatServer.html" data-type="entity-link">elyFlatServer</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyFlatServerCaptcha.html" data-type="entity-link">elyFlatServerCaptcha</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyFlatServerFiles.html" data-type="entity-link">elyFlatServerFiles</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyFooterView.html" data-type="entity-link">elyFooterView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyMath.html" data-type="entity-link">elyMath</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyObject.html" data-type="entity-link">elyObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyOneActionEval.html" data-type="entity-link">elyOneActionEval</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyProgressNotificationView.html" data-type="entity-link">elyProgressNotificationView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyRebuildableViewProtocol.html" data-type="entity-link">elyRebuildableViewProtocol</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyTabBarView.html" data-type="entity-link">elyTabBarView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyUIWorkshopElementsPanel.html" data-type="entity-link">elyUIWorkshopElementsPanel</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyUIWSContextMenu.html" data-type="entity-link">elyUIWSContextMenu</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyUIWSMeta.html" data-type="entity-link">elyUIWSMeta</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyUIWSViewsFactory.html" data-type="entity-link">elyUIWSViewsFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyUIWSWorkspace.html" data-type="entity-link">elyUIWSWorkspace</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWorkshop.html" data-type="entity-link">elyWorkshop</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSCreateViewWindow.html" data-type="entity-link">elyWSCreateViewWindow</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSDependencies.html" data-type="entity-link">elyWSDependencies</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSOpenProjectWindow.html" data-type="entity-link">elyWSOpenProjectWindow</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSPlaceableView.html" data-type="entity-link">elyWSPlaceableView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSPlaceholderView.html" data-type="entity-link">elyWSPlaceholderView</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSRegex.html" data-type="entity-link">elyWSRegex</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSRus.html" data-type="entity-link">elyWSRus</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSSettingsPanel.html" data-type="entity-link">elyWSSettingsPanel</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSUtils.html" data-type="entity-link">elyWSUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/elyWSViewPropsPanel.html" data-type="entity-link">elyWSViewPropsPanel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Field.html" data-type="entity-link">Field</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridLayoutView.html" data-type="entity-link">GridLayoutView</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridViewController.html" data-type="entity-link">GridViewController</a>
                            </li>
                            <li class="link">
                                <a href="classes/HeaderTextView.html" data-type="entity-link">HeaderTextView</a>
                            </li>
                            <li class="link">
                                <a href="classes/IconView.html" data-type="entity-link">IconView</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageView.html" data-type="entity-link">ImageView</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinkTextView.html" data-type="entity-link">LinkTextView</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListView.html" data-type="entity-link">ListView</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModalView.html" data-type="entity-link">ModalView</a>
                            </li>
                            <li class="link">
                                <a href="classes/NavigationView.html" data-type="entity-link">NavigationView</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationView.html" data-type="entity-link">NotificationView</a>
                            </li>
                            <li class="link">
                                <a href="classes/Observable.html" data-type="entity-link">Observable</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObservableArray.html" data-type="entity-link">ObservableArray</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObservableBoolean.html" data-type="entity-link">ObservableBoolean</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObservableDictionary.html" data-type="entity-link">ObservableDictionary</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObservableProperty.html" data-type="entity-link">ObservableProperty</a>
                            </li>
                            <li class="link">
                                <a href="classes/PanelView.html" data-type="entity-link">PanelView</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreloaderView.html" data-type="entity-link">PreloaderView</a>
                            </li>
                            <li class="link">
                                <a href="classes/RowLayoutView.html" data-type="entity-link">RowLayoutView</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScreenController.html" data-type="entity-link">ScreenController</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendFileRequest.html" data-type="entity-link">SendFileRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendJsonRequest.html" data-type="entity-link">SendJsonRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimplePageViewController.html" data-type="entity-link">SimplePageViewController</a>
                            </li>
                            <li class="link">
                                <a href="classes/SingleApp.html" data-type="entity-link">SingleApp</a>
                            </li>
                            <li class="link">
                                <a href="classes/Size.html" data-type="entity-link">Size</a>
                            </li>
                            <li class="link">
                                <a href="classes/Style.html" data-type="entity-link">Style</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwitchField.html" data-type="entity-link">SwitchField</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextArea.html" data-type="entity-link">TextArea</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextField.html" data-type="entity-link">TextField</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextFieldType.html" data-type="entity-link">TextFieldType</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextView.html" data-type="entity-link">TextView</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextViewContainer.html" data-type="entity-link">TextViewContainer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Time.html" data-type="entity-link">Time</a>
                            </li>
                            <li class="link">
                                <a href="classes/Timer.html" data-type="entity-link">Timer</a>
                            </li>
                            <li class="link">
                                <a href="classes/URLRequest.html" data-type="entity-link">URLRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utils.html" data-type="entity-link">Utils</a>
                            </li>
                            <li class="link">
                                <a href="classes/View.html" data-type="entity-link">View</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewController.html" data-type="entity-link">ViewController</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewCounter.html" data-type="entity-link">ViewCounter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Weight.html" data-type="entity-link">Weight</a>
                            </li>
                            <li class="link">
                                <a href="classes/XLogger.html" data-type="entity-link">XLogger</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Интерфейсы</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppConfigInterface.html" data-type="entity-link">AppConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Array.html" data-type="entity-link">Array</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Array-1.html" data-type="entity-link">Array</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonOptions.html" data-type="entity-link">ButtonOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorHSV.html" data-type="entity-link">ColorHSV</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorRGB.html" data-type="entity-link">ColorRGB</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_app.html" data-type="entity-link">ConfigSection_app</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_contentController.html" data-type="entity-link">ConfigSection_contentController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_develop.html" data-type="entity-link">ConfigSection_develop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_manifest.html" data-type="entity-link">ConfigSection_manifest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_meta.html" data-type="entity-link">ConfigSection_meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_meta_appleMobile.html" data-type="entity-link">ConfigSection_meta_appleMobile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_meta_viewport.html" data-type="entity-link">ConfigSection_meta_viewport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_navigationBar.html" data-type="entity-link">ConfigSection_navigationBar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_sideNavigationBar.html" data-type="entity-link">ConfigSection_sideNavigationBar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_template.html" data-type="entity-link">ConfigSection_template</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigSection_template_footer.html" data-type="entity-link">ConfigSection_template_footer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControlOptions.html" data-type="entity-link">ControlOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/efiDatabaseClientOptions.html" data-type="entity-link">efiDatabaseClientOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyChartViewData.html" data-type="entity-link">elyChartViewData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyChartViewOptions.html" data-type="entity-link">elyChartViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyDataGridViewOptions.html" data-type="entity-link">elyDataGridViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyObservableDictionaryItem.html" data-type="entity-link">elyObservableDictionaryItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyProgressNotificationOptions.html" data-type="entity-link">elyProgressNotificationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyTabBarViewItem.html" data-type="entity-link">elyTabBarViewItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/elyViewEntityProtocol.html" data-type="entity-link">elyViewEntityProtocol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldOptions.html" data-type="entity-link">FieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridLayoutViewOptions.html" data-type="entity-link">GridLayoutViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderTextViewOptions.html" data-type="entity-link">HeaderTextViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconViewOptions.html" data-type="entity-link">IconViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageViewOptions.html" data-type="entity-link">ImageViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LinkTextViewOptions.html" data-type="entity-link">LinkTextViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListViewOptions.html" data-type="entity-link">ListViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModalViewOptions.html" data-type="entity-link">ModalViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationViewOptions.html" data-type="entity-link">NavigationViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationViewOptions.html" data-type="entity-link">NotificationViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PanelViewOptions.html" data-type="entity-link">PanelViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreloaderViewOptions.html" data-type="entity-link">PreloaderViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RowLayoutViewOptions.html" data-type="entity-link">RowLayoutViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendFileRequestOptions.html" data-type="entity-link">SendFileRequestOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendJsonRequestOptions.html" data-type="entity-link">SendJsonRequestOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/String.html" data-type="entity-link">String</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StylesheetItem.html" data-type="entity-link">StylesheetItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SwitchFieldOptions.html" data-type="entity-link">SwitchFieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextAreaOptions.html" data-type="entity-link">TextAreaOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextFieldOptions.html" data-type="entity-link">TextFieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextViewOptions.html" data-type="entity-link">TextViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimeDifferences.html" data-type="entity-link">TimeDifferences</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimerOptions.html" data-type="entity-link">TimerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TRequestData.html" data-type="entity-link">TRequestData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/URL.html" data-type="entity-link">URL</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/URLRequestOptions.html" data-type="entity-link">URLRequestOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewOptions.html" data-type="entity-link">ViewOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Window.html" data-type="entity-link">Window</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Window-1.html" data-type="entity-link">Window</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Window-2.html" data-type="entity-link">Window</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Window-3.html" data-type="entity-link">Window</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Window-4.html" data-type="entity-link">Window</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Прочее</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Перечисления</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Функции</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Алиас типа</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Переменные</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Дополнительно</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});