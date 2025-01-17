import { MDXContent } from "../ui/mdx-component";

interface RenderMdxProps {
  content: string;
}

const RenderMdx = ({ content }: RenderMdxProps) => {
  return (
    <div className="border-t border-zinc-800/60 p-4 py-8 md:p-8 prose prose-zinc prose-invert prose-lg custom-prose">
      <MDXContent code={content} />
    </div>
  );
};

export default RenderMdx;
