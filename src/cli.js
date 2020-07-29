"use strict";
var Command = require("commander").Command;
var trans = require("./trans").trans;
var version = require("../package.json").version;
var program = new Command();
program
    .version(version)
    .name("fy")
    .usage("<english>")
    .arguments("<english>")
    .action(function (english) {
    trans(english);
});
program.parse(process.argv);
