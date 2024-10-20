"use client";

import { signOut, useSession } from "next-auth/react";
import NextImage from "next/image";
import NextLink from "next/link";

import { cn } from "@/libs/utils";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header
      // ref={ref}
      className={cn(
        "fixed",
        "top-0",
        "right-0",
        "left-0",
        "z-50",
        "bg-neutral-100",
        "transition",
        "duration-500",
      )}
    >
      <nav
        data-container
        data-grid
        className={cn("h-16", "lg:h-14", "items-center")}
      >
        <div className={cn("col-span-3")}>
          <NextLink
            href="/"
            style={{ fontFeatureSettings: `"tnum" 1, "case" 1` }}
            className={cn(
              "hover:bg-neutral-900",
              "hover:text-neutral-100",
              "px-2",
              "py-2",
              "py-1",
              // "bg-neutral-300",
            )}
          >
            +62 | <span className={cn("uppercase", "font-normal")}>Desain</span>{" "}
            Direktori
          </NextLink>
        </div>

        <div
          className={cn(
            "col-span-3",
            "col-start-10",
            "flex",
            "items-center",
            "justify-end",
            "gap-2",
          )}
        >
          {session && session.user ? (
            <>
              <button onClick={() => signOut()}>Sign Out</button>
              {session.user.image ? (
                <NextLink
                  href={
                    session.user.role
                      ? session.user.role !== "USER"
                        ? "/studio"
                        : "/submission"
                      : "/"
                  }
                  className={cn(
                    "inline-block",
                    "relative",
                    "h-7",
                    "aspect-square",
                    "overflow-hidden",
                    "rounded-full",
                  )}
                >
                  <NextImage
                    fill
                    priority
                    alt={session.user.name ?? "Avatar"}
                    src={session.user.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </NextLink>
              ) : (
                <div>Ava</div>
              )}
            </>
          ) : (
            <div>
              <NextLink href="/login">Sign In</NextLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
