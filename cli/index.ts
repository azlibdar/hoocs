#!/usr/bin/env tsx

import { program } from "commander";
import { handleInit } from "./commands/init";
import { handleAdd } from "./commands/add";

program.name("hoocs").description("A CLI for copying React hooks into your project");

// Initialize config file
program.command("init").description("Initialize config file for your hooks").action(handleInit);

// Add a hook
program
  .command("add <hookName>")
  .description("Add a specific hook to your project")
  .action((hookName) => {
    handleAdd(hookName);
  });

program.parse(process.argv);
