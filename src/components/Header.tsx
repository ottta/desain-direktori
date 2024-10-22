"use client";

import { AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { DialogTitle } from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "./ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

import { cn } from "@/libs/utils";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "fixed",
        "top-0",
        "right-0",
        "left-0",
        "z-40",
        "bg-neutral-100",
        "dark:bg-neutral-900",
        // "transition",
        // "duration-500",
      )}
    >
      <nav
        data-container
        data-grid
        className={cn("h-16", "lg:h-14", "items-center")}
      >
        <div className={cn("col-span-3", "lg:col-span-6")}>
          <NextLink
            href="/"
            style={{ fontFeatureSettings: `"tnum" 1, "case" 1` }}
            className={cn(
              // "hover:bg-neutral-300/80",
              // "hover:text-neutral-100",
              // "hover:dark:bg-neutral-950",
              // "hover:dark:text-neutral-300",
              "px-3",
              "py-2",
              "whitespace-nowrap",
              "overflow-hidden",
              "text-ellipsis",
              // "bg-neutral-300",
              // "dark:bg-neutral-900",
              // "border",
              // "rounded",
            )}
          >
            +62 |{" "}
            <span className={cn("uppercase", "font-semibold")}>Desain</span>{" "}
            Direktori
          </NextLink>
        </div>

        <div
          className={cn(
            "col-span-3",
            "flex",
            "gap-2",
            "items-center",
            "max-lg:hidden",
          )}
        >
          <NextLink
            href="/submission"
            className={cn("px-3", "hover:underline")}
          >
            Submission
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
          <NextLink href="/about" className={cn("px-3", "hover:underline")}>
            About
          </NextLink>

          {session && session.user ? (
            <User session={session} />
          ) : (
            <div>
              <NextLink href="/login" className={cn("px-3", "hover:underline")}>
                Sign In
              </NextLink>
            </div>
          )}

          <Drawer>
            <DrawerTrigger asChild className={cn("lg:hidden")}>
              <Button variant="outline" className={cn("aspect-square")}>
                <HamburgerMenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerContent
                data-container
                className={cn("h-fit", "min-h-[88.88svh]")}
              >
                <div>
                  <DialogTitle>Title</DialogTitle>
                  This Content
                </div>
                <NextLink href="/about">About</NextLink>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}

function User({ session }: { session: Session }) {
  return (
    <Popover>
      <PopoverTrigger asChild className={cn("max-lg:hidden")}>
        <Button
          variant="ghost"
          className={cn("aspect-square", "!p-0", "!rounded-none")}
        >
          <Avatar
            className={cn(
              "h-7",
              "overflow-hidden",
              "aspect-square",
              "rounded-full",
              "border",
            )}
          >
            <AvatarImage src={String(session.user.image)} alt="Avatar" />
            <AvatarFallback>
              {session.user.name
                ?.split(" ")
                .slice(0, 2)
                .map((item) => item[0])}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn("flex", "flex-col", "divide-y", "text-sm", "w-52")}
      >
        <div className={cn("pb-2")}>
          <div className={cn("font-bold")}>{session.user.name}</div>
          <div className={cn("text-neutral-600", "dark:text-neutral-500")}>
            {session.user.email}
          </div>
        </div>
        <ul className={cn("py-2")}>
          <li>
            {session && session.user.role === "USER" ? (
              <NextLink href="/submission">Your Submission</NextLink>
            ) : (
              <NextLink href="/studio">Studio</NextLink>
            )}
          </li>
        </ul>
        <div className={cn("pt-2")}>
          <Button
            variant="secondary"
            className={cn("w-full")}
            onClick={() => signOut()}
          >
            Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
