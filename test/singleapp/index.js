function efSingleInit(config) {
    config({
        manifest: {
            useDevelopMode: true,
        },
        navigationBar: {
            title: "The single",
        },
        develop: {
            appFile: "index.js"
        }
    });

    return vc => {
        const view = vc.view;

        const btn = new efButton({text: "Кликми", fill: true});
        view.add(btn);
        btn.addMouseEnterObserver(()=>{
           btn.animateCss("pulse");
        });
        btn.click(()=>{
            btn.animateCss("bounceOut", ()=>{

            });
        })
    };
}