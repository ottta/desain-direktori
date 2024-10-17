"use client";

import { SessionProvider as ProviderSession } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ProviderSession>{children}</ProviderSession>;
}
