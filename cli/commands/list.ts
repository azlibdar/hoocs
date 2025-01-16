import { readdirSync, existsSync, readJsonSync, writeJsonSync } from "fs-extra";
import { resolve, join } from "path";
import chalk from "chalk";

export function handleList() {
  const libraryHooksPath = resolve(__dirname, "../../hooks");

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
    writeJsonSync(configPath, { installPath: "src/hooks/" }, { spaces: 2 });
  }

  const { installPath } = readJsonSync(configPath);

  // Validate the installPath
  if (typeof installPath !== "string") {
    console.log(chalk.red("Invalid installation path in configuration. Please check your config file."));
    return;
  }

  const userHookFolder = resolve(process.cwd(), installPath);

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
