"use client";

import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center items-center flex-nowrap overflow-hidden border-y border-zinc-800/60">
      {Array.from({ length: 13 }).map((_, index) => (
        <div key={index} className="min-w-20 md:min-w-32 aspect-square border-r border-zinc-800/60 p-2 md:p-5">
          {index === 6 && <Image src="/hoocs.svg" alt="Hoocs Logo" width={128} height={128} className="opacity-90 animate-spin" />}
        </div>
      ))}
    </div>
  );
};

export default Logo;
