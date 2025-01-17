import { Hook } from "#site/docs";
import { CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

interface HookCardProps {
  index: number;
  hook: Hook;
}

const HookCard = ({ hook, index }: HookCardProps) => {
  return (
    <Link
      href={hook.slug}
      key={index}
      className={`w-full transition border-zinc-800/60 border-t group ${index % 2 === 0 ? "md:border-r" : ""} hover:bg-zinc-900`}
    >
      <div className="px-8 py-12 flex justify-center items-center flex-col">
        <div className="w-11 min-w-11 aspect-square rounded-full bg-zinc-800 flex justify-center items-center">
          <CircleArrowOutUpRight size={20} strokeWidth={1.75} className="text-amber-400 mt-[2px] ml-[-1px]" />
        </div>
        <h3 className="text-2xl font-semibold text-zinc-200 mt-4 text-center">{hook.title}</h3>
        <p className="text-zinc-400 text-base max-w-sm text-center font-[450] leading-normal mt-2">{hook.description}</p>
      </div>
    </Link>
  );
};

export default HookCard;
