import "./globals.css";

import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

import { cn } from "@/libs/utils";

export const metadata: Metadata = {
  title: "(+62) Foundry Directory",
  description: "Typefoundry directory in Indonesia",
};

const sans = Work_Sans({
  variable: "--font-sans",
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sans.variable, "antialiased")}>
      <body>
        <main className={cn("px-12")}>{children}</main>
      </body>
    </html>
  );
}
