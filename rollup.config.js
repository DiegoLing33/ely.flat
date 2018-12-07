import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import tsConfigPaths from 'rollup-plugin-ts-paths';
import json from 'rollup-plugin-json';

export default {
    input: 'ely.build.js/products/ely.flat.application/src/ely.flat.application.js',
    output:{
        file: 'dist/ely.flat.application/ely.flat.application.js',
        name: 'ely',
        format: 'iife'
    },
    plugins: [
        json(),
        tsConfigPaths(),
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs({
            extensions: [ '.js'],  // Default: [ '.js' ]
            ignoreGlobal: false,  // Default: false
            sourceMap: true,
            customNamedExports: true,
        })
    ]
}
