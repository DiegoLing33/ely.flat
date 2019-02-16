import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript3';
import alias from 'rollup-plugin-alias';
import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';


export default {
    input: 'bin/ely.flat.play.ts',
    output: {
        file: '../products/ely.flat.play.js', format: 'es', sourcemap: true
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
            "@core": path.resolve('../ely.core'),
            "@enums": path.resolve('./enums'),
            "@math": path.resolve('../ely.core/math'),
            "@protocols": path.resolve('./protocols'),
        }),
        typescript({tsConfigDirectory: path.resolve('./')}),
    ]
}
