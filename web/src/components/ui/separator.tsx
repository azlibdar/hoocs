const Separator = () => {
  return (
    <div className="flex justify-center items-center flex-nowrap overflow-hidden border-t border-zinc-800/60">
      {Array.from({ length: 13 }).map((_, index) => (
        <div key={index} className="min-w-16 md:min-w-24 rounded-full aspect-square border border-zinc-800/60 p-5" />
      ))}
    </div>
  );
};

export default Separator;
