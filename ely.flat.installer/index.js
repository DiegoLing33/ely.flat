#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var child_process = require("child_process");
var path = require("path");
var process = require("process");
var cli_1 = require("./cli/cli");
var elyXLogger_1 = require("./core/elyXLogger");
var logger = new elyXLogger_1["default"]({ mainPrefix: "Builder" });
//
//  CLI Performing
//
var cliArgs = process.argv.slice(2);
if (cliArgs.length > 0) {
    cli_1.cli(logger, cliArgs);
}
else {
    child_process.exec(path.resolve(__dirname + "/node_modules/.bin/electron") + " " +
        path.resolve(__dirname + "/gui.js"));
}
