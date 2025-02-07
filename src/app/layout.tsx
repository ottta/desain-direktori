import Providers from "./Providers";
import "./globals.css";

import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
// import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

import { cn } from "@/libs/utils";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_HOST!),
  title: {
    template: "%s | +62 Desain Direktori",
    default: "+62 | Desain Direktori",
  },
  description: "Desain Direktori in Indonesia",
  keywords: ["design", "archive", "indonesia", "designer", "creative"],
  openGraph: {
    siteName: "Desain Direktori",
    description: "Desain Direktori in Indonesia",
  },
};

// const sans = localFont({
//   display: "block",
//   variable: "--font-sans",
//   src: [
//     {
//       path: "./fonts/Nouva-VF.woff2",
//       weight: "100 900",
//       style: "normal",
//     },
//   ],
// });

const sans = Mona_Sans({
  display: "block",
  variable: "--font-sans",
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(sans.variable, "antialiased")}
    >
      <body>
        <Providers>
          <NextTopLoader color="#ec4899" showSpinner={false} />
          <Header />
          <main className={cn("pt-4", "lg:pt-14")}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
