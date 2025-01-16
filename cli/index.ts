#!/usr/bin/env tsx

import { program } from "commander";
import { handleInit } from "./commands/init";

program.name("hoocs").description("A CLI for copying React hooks into your project");

program.command("init").description("Initialize config file for your hooks").action(handleInit);

program.parse(process.argv);
