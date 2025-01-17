import CopyCode from "./copy-code";
import { cn } from "@/lib/utils";
import { geistMono } from "./fonts";

interface CommandBlockProps {
  code: string;
  className?: string;
}

const baseClass = "p-4 rounded-lg font-medium bg-zinc-900 relative group text-sm md:text-base";

const CommandBlock = ({ code, className }: CommandBlockProps) => {
  return (
    <pre className={cn(baseClass, className)}>
      <code className={`${geistMono.className} text-blue-400`}>{code}</code>
      <div className="absolute transition-opacity opacity-0 right-2 top-2 group-hover:opacity-100 focus-within:opacity-100">
        <CopyCode code={code} />
      </div>
    </pre>
  );
};

export default CommandBlock;
