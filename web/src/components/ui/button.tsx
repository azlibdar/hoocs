import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "small" | "regular" | "large";
  shape?: "rounded" | "pill";
  children: React.ReactNode;
  className?: string;
  clickEffect?: boolean;
  href?: string;
  newTab?: boolean;
}

const baseStyle =
  "w-min text-nowrap leading-normal transition h-min font-medium flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-blue-500";
const sizeStyle = {
  small: "px-3.5 py-[0.45rem] text-sm",
  regular: "px-[1.10rem] py-2.5 text-sm",
  large: "px-6 py-3 text-base",
};
const variantStyle = {
  primary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-[550]",
  secondary: "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-800/50 focus-visible:bg-zinc-800/50",
};
const clickEffectStyle = "active:translate-y-px";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    type = "button",
    variant = "primary",
    size = "regular",
    shape = "rounded",
    clickEffect = true,
    className,
    href,
    newTab = true,
  } = props;

  // Shape styles
  const shapeStyle = {
    rounded: `${size === "large" ? "rounded-lg" : "rounded-md"}`,
    pill: "rounded-full",
  };

  const combinedClassName = `${baseStyle} ${shapeStyle[shape]} ${sizeStyle[size]} ${variantStyle[variant]} ${className} ${
    clickEffect ? clickEffectStyle : ""
  }`;

  if (href) {
    return (
      <Link href={href} className={cn(combinedClassName)} target={`${newTab ? "_blank" : "_self"}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(combinedClassName)}>
      {children}
    </button>
  );
};

export default Button;
