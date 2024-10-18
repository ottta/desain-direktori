import Providers from "./Providers";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
