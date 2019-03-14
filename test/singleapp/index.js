// devlog ...

function ef(config) {

    config({});

    return vc => {
        setTimeout(() => {
            navigationBar().getProgressView().value(100);
        }, 1000);

        const sf = new SelectField({
            items: [
                "Male", "Female", "Middle", "Not known",
            ]
        });
        vc.view.add(sf);

    };
}
