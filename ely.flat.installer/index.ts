#!/usr/bin/env node

import * as child_process from "child_process";
import * as path from "path";
import process = require("process");
import {cli} from "./bin/cli";
import {efi} from "./bin/efi";

//
//  CLI Performing
//

efi.workingDirectory = path.resolve("./");

const cliArgs = process.argv.slice(2);
if (cliArgs.length > 0) {
    cli(cliArgs);
} else {
    child_process.exec(path.resolve(__dirname + "/node_modules/.bin/electron") + " " +
        path.resolve(__dirname + "/gui.js"));
}
