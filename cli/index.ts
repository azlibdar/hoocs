#!/usr/bin/env node

import { program } from "commander";
import { readJsonSync, writeJsonSync, existsSync, mkdirsSync, copySync, readdirSync } from "fs-extra";
import { resolve, join, relative } from "path";
import chalk from "chalk";
import inquirer from "inquirer";

// Initialize config file
async function handleInit() {
  const configPath = resolve(process.cwd(), "hoocs.json");
  if (existsSync(configPath)) {
    console.log(chalk.yellow("Config file already exists. No changes made."));
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "destination",
      message: "Set default installation path for hooks:",
      default: "src/hooks/",
    },
  ]);

  writeJsonSync(configPath, answers, { spaces: 2 });
  console.log(chalk.green(`Configuration saved to ${configPath}`));
}

// Add a hook
async function handleAdd(hookName: string) {
  const configPath = resolve(process.cwd(), "hoocs.json");

  if (!existsSync(configPath)) {
    console.log(chalk.yellow(`Configuration file not found. Initializing with default path.`));
    writeJsonSync(configPath, { destination: "src/hooks/" }, { spaces: 2 });
  }

  const { destination } = readJsonSync(configPath);

  // Validate the destination and hookName
  if (typeof destination !== "string" || typeof hookName !== "string") {
    console.log(chalk.red("Invalid configuration or hook name. Please check your input."));
    return;
  }

  const hookSourcePath = resolve(__dirname, "hooks", `${hookName}.ts`);
  const hookDestPath = resolve(process.cwd(), destination, `${hookName}.ts`);

  if (!existsSync(hookSourcePath)) {
    console.log(chalk.red(`Hook "${hookName}" is not available. Use 'hoocs list' to see available hooks.`));
    return;
  }

  if (!existsSync(destination)) {
    mkdirsSync(destination);
  }

  if (existsSync(hookDestPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `Hook "${hookName}.ts" already exists. Overwrite?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.yellow(`Skipped overwriting "${hookName}.ts".`));
      return;
    }
  }

  copySync(hookSourcePath, hookDestPath);
  const relativePath = relative(process.cwd(), hookDestPath);
  console.log(chalk.green(`Hook "${hookName}" copied successfully to ${relativePath}.`));
}

// List all hooks
function handleList() {
  const libraryHooksPath = resolve(__dirname, "hooks");

  let hooks: string[] = [];
  try {
    hooks = readdirSync(libraryHooksPath)
      .filter((file) => file.endsWith(".ts"))
      .map((file) => file.replace(".ts", ""))
      .sort();
  } catch (error) {
    console.error(chalk.red("Unable to read hooks directory from library."));
    return;
  }

  const configPath = resolve(process.cwd(), "hoocs.json");
  if (!existsSync(configPath)) {
    console.log(chalk.yellow(`Configuration file not found. Initializing with default path.`));
    writeJsonSync(configPath, { destination: "src/hooks/" }, { spaces: 2 });
  }

  const { destination } = readJsonSync(configPath);

  // Validate the destination
  if (typeof destination !== "string") {
    console.log(chalk.red("Invalid installation path in configuration. Please check your config file."));
    return;
  }

  const userHookFolder = resolve(process.cwd(), destination);

  console.log(chalk.blue("Available Hooks:"));
  hooks.forEach((hookName) => {
    const userHookPath = join(userHookFolder, `${hookName}.ts`);
    if (existsSync(userHookPath)) {
      console.log(chalk.green(`- ${hookName} (Installed)`));
    } else {
      console.log(chalk.white(`- ${hookName}`));
    }
  });
}

// Set up CLI commands
program.name("hoocs").description("A CLI for copying React hooks into your project");

program.command("init").description("Initialize config file for your hooks").action(handleInit);

program.command("add <hookName>").description("Add a specific hook to your project").action(handleAdd);

program.command("list").description("List all available hooks, highlighting installed ones").action(handleList);

program.parse(process.argv);
