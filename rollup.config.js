import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript3';
import alias from 'rollup-plugin-alias';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';


export default {
    input: 'products/ely.flat.ts',
    output: {
        file: 'dist/ely.flat.js', format: 'es', sourcemap: true
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
            "@app": path.resolve('./ely.application/src'),
            "@core": path.resolve('./ely.core/src'),
            "@controls": path.resolve('./ely.controls/src'),
            "@options": path.resolve('./ely.controls/src/options'),
            "@controllers": path.resolve('./ely.controls.controllers/src'),
            "@devMods": path.resolve('./ely.controls.modules/src'),
            "@enums": path.resolve('./ely.flat.enums/src'),
            "@cnv": path.resolve('./ely.flat.cnv/src'),
            "@play": path.resolve('./ely.flat.play/src'),
            "@math": path.resolve('./ely.flat.math/src'),
            "@protocols": path.resolve('./ely.flat.protocols'),
            "@fields": path.resolve('./ely.flat.fields/src'),
        }),
        typescript({tsConfigDirectory: path.resolve('./')}),
    ]
}
