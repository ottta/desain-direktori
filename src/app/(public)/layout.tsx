import Providers from "./Providers";

import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import Header from "@/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <Header />
      <main className={cn("pt-16", "lg:pt-14")}>{children}</main>
    </Providers>
  );
}
