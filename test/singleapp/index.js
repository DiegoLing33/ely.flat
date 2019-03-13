// devlog ...

function ef(config) {

    config({});

    return vc => {
        setTimeout(()=>{
            navigationBar().getProgressView().value(100);
        }, 1000);

        const prog = new CircularProgressBarView();
        prog.value(20);
        vc.view.add(prog);

    };
}
