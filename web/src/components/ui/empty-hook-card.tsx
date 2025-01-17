import { SearchX } from "lucide-react";
import Button from "./button";

const EmptyHookCard = () => {
  return (
    <div className="px-8 py-12 flex justify-center items-center flex-col bg-zinc-900/50 border-t border-zinc-800/60">
      <div className="w-11 min-w-11 aspect-square rounded-full bg-zinc-800 flex justify-center items-center">
        <SearchX size={24} strokeWidth={1.75} className="text-rose-400" />
      </div>
      <h2 className="text-2xl text-center mt-4 font-semibold text-zinc-300">Need Another Hook?</h2>
      <Button size="small" variant="primary" shape="pill" href="https://github.com/azlibdar/hoocs/issues" className="mt-4">
        Contribute on GitHub
      </Button>
    </div>
  );
};

export default EmptyHookCard;
