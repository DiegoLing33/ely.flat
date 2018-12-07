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
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files

            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            extensions: [ '.js'],  // Default: [ '.js' ]

            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false

            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: true,  // Default: true,
            customNamedExports: true,

        })
    ]
}
