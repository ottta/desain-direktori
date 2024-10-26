import Navigation from "./Navigation";

import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import { Toaster } from "@/components/ui/toaster";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />

      <div data-container>
        <div className={cn("text-4xl", "font-bold", "px-3", "mb-12")}>
          Studio
        </div>
      </div>

      <Navigation />

      <div data-container>{children}</div>
    </>
  );
}
