#!/usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("init [dest]", "init a package in dest dir")
  .command("clean", "clean package")
  .command("update [dest]", "update a package in dest dir")
  .command("build", "build package")
  .command("lint [dest]", "use eslint to check js language")
  .command("start [entry]", "start development")
  .command("test [pattern]", "test package")
  .parse(process.argv);
