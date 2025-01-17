import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "geist-mono": ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
    function ({ addVariant }: { addVariant: (name: string, css: string) => void }) {
      addVariant("prose-inline-code", '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))');
    },
  ],
} satisfies Config;
