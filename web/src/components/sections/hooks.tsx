"use client";

import { Hook } from "#site/docs";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import Separator from "../ui/separator";
import SearchInput from "../ui/search-input";
import HookCard from "../ui/hookCard";
import EmptyHookCard from "../ui/empty-hook-card";

interface HooksProps {
  data: Hook[];
}

const Hooks = ({ data }: HooksProps) => {
  const [query, setQuery] = useState("");
  const deboundedValue = useDebounce(query, 500);

  const handleSetQuery = (value: string) => {
    setQuery(value);
  };

  const filteredData = data.filter(
    (hook) =>
      hook.title.toLowerCase().includes(deboundedValue.toLowerCase()) ||
      hook.description.toLowerCase().includes(deboundedValue.toLowerCase())
  );

  return (
    <section id="hooks" className="w-full">
      <Separator />
      <SearchInput onQuery={handleSetQuery} />
      <div className="w-full p-4 text-sm">
        <p className="text-zinc-400 text-right w-full">
          {deboundedValue ? `${filteredData.length} results found` : "Hooks available: " + data.length}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {filteredData.map((hook, index) => (
          <HookCard hook={hook} index={index} key={index} />
        ))}
        <EmptyHookCard />
      </div>
    </section>
  );
};

export default Hooks;
