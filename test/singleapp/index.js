// devlog ...

function ef(config) {

    config({});

    return vc => {
        setTimeout(() => {
            navigationBar().getProgressView().value(100);
        }, 1000);

        const ddf = new DictionaryDataField();

        ddf.addInputObserver(obj => console.log(obj));

        vc.view.add(ddf);
    };
}
