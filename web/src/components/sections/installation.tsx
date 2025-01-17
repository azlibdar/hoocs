import { installationData } from "@/constants";
import CommandBlock from "../ui/command-block";

const Installation = () => {
  return (
    <section id="installation" className="w-full border-t border-zinc-800/60 ">
      <div className="w-full grid grid-cols-1 max-w-2xl mx-auto md:border-x border-zinc-800/60">
        {installationData.map((data, index) => (
          <div key={index} className="w-full px-4 py-8 md:p-8 border-t first:border-t-0 border-zinc-800/60">
            <h2 className="text-base font-semibold text-zinc-200">{data.title}</h2>
            <p className="text-zinc-400 text-base leading-snug mt-1 mb-5">{data.description}</p>
            <CommandBlock code={data.command} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Installation;
