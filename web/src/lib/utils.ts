import { hooks } from "#site/docs";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextHook(title: string): string {
  const hooksData = hooks;
  const index = hooksData.findIndex((hook) => hook.title === title);

  const nextIndex = (index + 1) % hooksData.length;
  return hooksData[nextIndex].title;
}
