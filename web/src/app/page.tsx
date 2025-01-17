import Hero from "@/components/sections/hero";
import HeroImage from "@/components/sections/heroImage";
import Hooks from "@/components/sections/hooks";
import Installation from "@/components/sections/installation";
import { hooks } from "#site/docs";
import Footer from "@/components/sections/footer";

const Home = () => {
  const displayedHooks = hooks;

  return (
    <main className="w-full md:border-x border-zinc-800/60 max-w-5xl mx-auto">
      <Hero />
      <HeroImage />
      <Installation />
      <Hooks data={displayedHooks} />
      <Footer />
    </main>
  );
};

export default Home;
