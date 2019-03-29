import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript3";
import path from "path";
import nodeResolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";

export default {
    input: "bin/ely.flat.ts",
    output: {
        file: "../products/ely.flat.js", format: "es", sourcemap: true,
    },
    plugins: [
        nodeResolve({
            browser: true,
            jsnext: true,
            main: true,
            preferBuiltins: false,
        }),
        cjs(),
        json(),
        typescript({tsConfigDirectory: path.resolve("./")}),
    ],
};
