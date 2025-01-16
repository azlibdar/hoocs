import { writeJsonSync, existsSync } from "fs-extra";
import { resolve } from "path";
import chalk from "chalk";
import inquirer from "inquirer";

export async function handleInit() {
  const configPath = resolve(process.cwd(), "hoocs.json");
  if (existsSync(configPath)) {
    console.log(chalk.yellow("Config file already exists. No changes made."));
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "installPath",
      message: "Set default installation path for hooks:",
      default: "src/hooks/",
    },
  ]);

  writeJsonSync(configPath, answers, { spaces: 2 });
  console.log(chalk.green(`Configuration saved to ${configPath}`));
}
