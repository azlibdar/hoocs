import { Search } from "lucide-react";

interface SearchInputProps {
  onQuery: (query: string) => void;
}

const SearchInput = ({ onQuery }: SearchInputProps) => {
  return (
    <div className="w-full relative">
      <div className="h-full min-w-12 md:min-w-16 absolute left-0 top-0 flex justify-center items-center text-zinc-400 pointer-events-none">
        <Search size={20} strokeWidth={1.75} />
      </div>
      <label htmlFor="search" className="sr-only">
        Search hook&apos;s title or description
      </label>
      <input
        type="text"
        id="search"
        onChange={(e) => onQuery(e.target.value)}
        className="w-full rounded-none py-6 px-6 md:px-10 pl-10 md:pl-14 transition text-base md:text-lg text-zinc-200 focus:outline-none  bg-zinc-900/50 focus:ring-1 focus:ring-inset focus:ring-zinc-800 placeholder:text-zinc-500"
        placeholder="Search hook's title or description.."
      />
    </div>
  );
};

export default SearchInput;
