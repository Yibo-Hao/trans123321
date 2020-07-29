const { Command } = require("commander");
const {trans} = require("./trans")
const version = require("../package.json").version;
const program = new Command();

program
    .version(version)
    .name("fy")
    .usage("<english>")
    .arguments("<english>")
    .action((english: string) => {
        trans(english)
    });

program.parse(process.argv);
