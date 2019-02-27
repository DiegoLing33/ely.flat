// devlog ...

function ef(config) {

    config({
        navigationBar: {
            title: "Single app"
        },
        manifest:{
            useDevelopMode: true,
        },
        develop:{
            appFile: "index.js",
        }
    });

    return vc => {

    };
}