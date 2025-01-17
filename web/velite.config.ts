import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import { getNextHook } from "@/lib/utils";

const computedFields = <T extends { title: string }>(data: T): T & { title: string } => ({
  ...data,
  slug: data.title,
  nextHook: getNextHook(data.title),
});

const hooks = defineCollection({
  name: "Hook",
  pattern: "hooks/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      description: s.string(),
      seoDescription: s.string(),
      command: s.string(),
      nextHook: s.string().optional(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "docs",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { hooks },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }]],
  },
});
