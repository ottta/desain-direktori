"use client";

import { ScrollInfoProvider as ProviderScroll } from "@faceless-ui/scroll-info";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ProviderScroll>{children}</ProviderScroll>;
}
