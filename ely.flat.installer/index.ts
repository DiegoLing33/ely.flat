#!/usr/bin/env node

import * as child_process from "child_process";
import * as path from "path";
import process = require("process");
import {cli} from "./cli/cli";
import elyXLogger from "./core/elyXLogger";

const logger = new elyXLogger({mainPrefix: "Builder"});

//
//  CLI Performing
//

const cliArgs = process.argv.slice(2);
if (cliArgs.length > 0) {
    cli(logger, cliArgs);
} else {
    child_process.exec(path.resolve(__dirname + "/node_modules/.bin/electron") + " " +
        path.resolve(__dirname + "/gui.js"));
}
