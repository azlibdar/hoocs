export const installationData = [
  {
    title: "Install the CLI Globally",
    description: "Install the hoocs CLI globally to access its commands.",
    command: `npm install -g hoocs`,
  },
  {
    title: "Initialize the CLI",
    description: "This will create `hoocs.json` in the root of your project and help you set destination paths for hooks.",
    command: `npx hoocs init`,
  },
  {
    title: "Add Hooks to Your Project",
    description: "Use the add command to integrate hooks into your project.",
    command: `npx hoocs add useTheme`,
  },
  {
    title: "List Available Hooks",
    description: "Run the list command to see all available hooks.",
    command: `npx hoocs list`,
  },
];
