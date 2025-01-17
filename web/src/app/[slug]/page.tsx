import { Hook, hooks } from "#site/docs";
import CommandBlock from "@/components/ui/command-block";
import Separator from "@/components/ui/separator";
import { notFound } from "next/navigation";
import "@/styles/rehype.css";
import RenderMdx from "@/components/sections/render-mdx";
import { Metadata } from "next";
import Button from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

const getHookData = (slug: string): Hook => {
  const hook = hooks.find((hook) => hook.slug === slug);

  if (!hook) {
    throw new Error(`Hook not found for slug: ${slug}`);
  }

  return hook;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const hookData = getHookData(slug);
  return {
    title: hookData.title,
    description: hookData.seoDescription,
  };
}

export async function generateStaticParams() {
  return hooks.map((hook) => ({
    slug: hook.slug,
  }));
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const hookData = getHookData(slug);

  if (!hookData) {
    notFound();
  }

  return (
    <main className="w-full md:border-x border-zinc-800/60 max-w-4xl mx-auto">
      <article className="w-full border-b border-zinc-800/60">
        <Separator />
        <div className="px-4 md:px-8 py-8 md:py-12 flex flex-col">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-200">{hookData.title}</h1>
          <p className="text-lg md:text-xl mt-2 md:mt-3 text-zinc-400">{hookData.description}</p>
          <CommandBlock code={hookData.command} className="mt-4 md:mt-8 text-sm md:text-lg" />
        </div>
        <RenderMdx content={hookData.content} />
        <div className="py-6 px-4 md:px-8 border-t border-zinc-800/60 flex justify-between items-center gap-2">
          <Button variant="secondary" href="/" newTab={false}>
            Back home
          </Button>
          {hookData.nextHook && (
            <Button variant="secondary" href={hookData.nextHook} newTab={false}>
              {hookData.nextHook} -&gt;
            </Button>
          )}
        </div>
      </article>
    </main>
  );
}
