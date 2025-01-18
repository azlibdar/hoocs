#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs-extra";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize config file
async function handleInit() {
  const configPath = path.resolve(process.cwd(), "hoocs.json");
  if (fs.existsSync(configPath)) {
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

  fs.writeJsonSync(configPath, answers, { spaces: 2 });
  console.log(chalk.green(`Configuration saved to ${configPath}`));
}

// Add a hook
async function handleAdd(hookName: string) {
  const configPath = path.resolve(process.cwd(), "hoocs.json");

  if (!fs.existsSync(configPath)) {
    console.log(chalk.yellow(`Configuration file not found. Initializing with default path.`));
    fs.writeJsonSync(configPath, { destination: "src/hooks/" }, { spaces: 2 });
  }

  const { destination } = fs.readJsonSync(configPath);

  // Validate the destination and hookName
  if (typeof destination !== "string" || typeof hookName !== "string") {
    console.log(chalk.red("Invalid configuration or hook name. Please check your input."));
    return;
  }

  const hookSourcePath = path.resolve(__dirname, "../hooks", `${hookName}.ts`);
  const hookDestPath = path.resolve(process.cwd(), destination, `${hookName}.ts`);

  if (!fs.existsSync(hookSourcePath)) {
    console.log(chalk.red(`Hook "${hookName}" is not available. Use 'hoocs list' to see available hooks.`));
    return;
  }

  if (!fs.existsSync(destination)) {
    fs.mkdirsSync(destination);
  }

  if (fs.existsSync(hookDestPath)) {
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

  fs.copySync(hookSourcePath, hookDestPath);
  const relativePath = path.relative(process.cwd(), hookDestPath);
  console.log(chalk.green(`Hook "${hookName}" copied successfully to ${relativePath}.`));
}

// List all hooks
function handleList() {
  const libraryHooksPath = path.resolve(__dirname, "../hooks");

  let hooks: string[] = [];
  try {
    hooks = fs
      .readdirSync(libraryHooksPath)
      .filter((file) => file.endsWith(".ts"))
      .map((file) => file.replace(".ts", ""))
      .sort();
  } catch (error) {
    console.error(chalk.red("Unable to read hooks directory from library."));
    return;
  }

  const configPath = path.resolve(process.cwd(), "hoocs.json");
  if (!fs.existsSync(configPath)) {
    console.log(chalk.yellow(`Configuration file not found. Initializing with default path.`));
    fs.writeJsonSync(configPath, { destination: "src/hooks/" }, { spaces: 2 });
  }

  const { destination } = fs.readJsonSync(configPath);

  // Validate the destination
  if (typeof destination !== "string") {
    console.log(chalk.red("Invalid installation path in configuration. Please check your config file."));
    return;
  }

  const userHookFolder = path.resolve(process.cwd(), destination);

  console.log(chalk.blue("Available Hooks:"));
  hooks.forEach((hookName) => {
    const userHookPath = path.join(userHookFolder, `${hookName}.ts`);
    if (fs.existsSync(userHookPath)) {
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
