import { readJsonSync, writeJsonSync, existsSync, mkdirsSync, copySync } from "fs-extra";
import { resolve, join, relative } from "path";
import chalk from "chalk";
import inquirer from "inquirer";

export async function handleAdd(hookName: string) {
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

  const hookSourcePath = resolve(__dirname, "../../hooks", `${hookName}.ts`);
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
