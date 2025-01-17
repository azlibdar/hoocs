import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "../components/ui/fonts";

export const metadata: Metadata = {
  title: {
    default: "Hoocs - A CLI-Driven React Hooks Library",
    template: "%s | Hoocs",
  },
  description:
    "A CLI-driven React hooks library offering a collection of ready-to-use hooks that you can easily copy, customize, and integrate into your projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased py-20 md:py-28`}>{children}</body>
    </html>
  );
}
