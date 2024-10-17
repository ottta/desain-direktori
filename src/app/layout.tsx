import Providers from "./Providers";
import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "@/libs/utils";

export const metadata: Metadata = {
  title: "+62 | Desain Directori",
  description: "Desain Direktori in Indonesia",
};

const sans = localFont({
  display: "block",
  variable: "--font-nouva",
  src: [
    {
      path: "./fonts/Nouva-VF.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sans.variable, "antialiased")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
