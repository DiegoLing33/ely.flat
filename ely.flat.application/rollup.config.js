import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript3';
import alias from 'rollup-plugin-alias';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';


export default {
    input: 'products/ely.flat.ts',
    output: {
        file: '../products/ely.flat.js', format: 'es', sourcemap: true
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        json(),
        alias({
            resolve: ['.ts'],
            "@app": path.resolve('./app'),
            "@core": path.resolve('../ely.core'),
            "@controls": path.resolve('./controls'),
            "@options": path.resolve('./controls/options'),
            "@controllers": path.resolve('./controllers'),
            "@devMods": path.resolve('./modules'),
            "@enums": path.resolve('./enums'),
            "@cnv": path.resolve('./canvas'),
            "@play": path.resolve('./play'),
            "@math": path.resolve('../ely.core/math'),
            "@protocols": path.resolve('./protocols'),
            "@fields": path.resolve('./ely.flat.fields/src'),
        }),
        typescript({tsConfigDirectory: path.resolve('./')}),
    ]
}
