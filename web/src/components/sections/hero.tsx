import { geistMono } from "@/components/ui/fonts";
import Logo from "../ui/logo";
import Button from "../ui/button";

const Hero = () => {
  return (
    <section>
      <Logo />
      <div className="py-16 px-4 md:p-12 flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-200 text-center">
          A <span className={`${geistMono.className}`}>CLI-Driven</span> React Hooks Library
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-center mt-3 text-zinc-400 font-[450]">
          Offering a collection of ready-to-use Typescript hooks that you can easily copy, customize, and integrate into your projects.
        </p>
        <div className="flex items-center gap-3 mt-8">
          <Button size="large" variant="primary" shape="pill" href="#installation" newTab={false}>
            Get Started
          </Button>
          <Button size="large" variant="secondary" shape="pill" href="https://github.com/azlibdar/hoocs">
            Star on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
