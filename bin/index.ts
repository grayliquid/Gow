#!/usr/bin/env node

import { Config, Gow } from "../lib/gow";
import * as fs from "fs";

function getCommandLineOption(option) {
    const everythingReplacedBeforeOption = process.argv.join(" ").replace(new RegExp(`(.*)(?=${option} )`), "").replace(/ -(.*)/, "");

    return everythingReplacedBeforeOption.startsWith(option)
        ? everythingReplacedBeforeOption.replace(new RegExp(`(.*)${option} `), "")
        : null;
}

function isCommandOptionSet(option) {
    return process.argv.includes(option);
}

if (fs.existsSync(process.cwd() + "/gow.config.js")) {
    import(process.cwd() + "/gow.config.js").then(config => {
        if (config.default) {
            new Gow(config.default);
            return;
        }

        new Gow(config);
    });
}else {
    const commandLineConfig: Config = {
        command: getCommandLineOption("-c") || getCommandLineOption("--command"),
        files: getCommandLineOption("-f") || getCommandLineOption("--files"),
        silent: isCommandOptionSet("-s") || isCommandOptionSet("--silent"),
        delay: parseInt(getCommandLineOption("-d") || getCommandLineOption("--delay"))
    };

    new Gow(commandLineConfig);
}
