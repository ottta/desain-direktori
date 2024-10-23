"use client";

import { SessionProvider as ProviderSession } from "next-auth/react";
import { ThemeProvider as ProviderTheme } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ProviderSession>
      <ProviderTheme
        enableSystem
        disableTransitionOnChange
        defaultTheme="system"
        themes={["dark", "light"]}
      >
        {children}
      </ProviderTheme>
    </ProviderSession>
  );
}
