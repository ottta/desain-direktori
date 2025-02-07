"use client";

import ThemeSelector from "./ThemeSelector";
import { AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { DialogDescription, DialogTitle } from "./ui/dialog";
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
import { useMediaQuery } from "usehooks-ts";

import { MEDIA_MAX_MD } from "@/libs/constants";
import { cn } from "@/libs/utils";

export default function Header() {
  const { data: session } = useSession();
  const MAX_MD = useMediaQuery(MEDIA_MAX_MD, {
    defaultValue: false,
    initializeWithValue: false,
  });

  if (MAX_MD) return null;
  return (
    <header
      className={cn(
        // "hidden",
        // "md:block",
        "fixed",
        "top-0",
        "right-0",
        "left-0",
        "z-50",
        "bg-neutral-100",
        "dark:bg-neutral-950",
        "overflow-hidden",
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
              // "dark:hover:bg-neutral-950",
              // "dark:hover:text-neutral-300",
              "px-3",
              "py-2",
              "whitespace-nowrap",
              "overflow-hidden",
              "text-ellipsis",
              // "bg-neutral-300",
              // "dark:bg-neutral-950",
              // "border",
              // "rounded-sm",
            )}
          >
            +62 |{" "}
            <span className={cn("uppercase", "font-semibold")}>Desain</span>{" "}
            Direktori
          </NextLink>
        </div>

        {/* <div
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
        </div> */}

        <div
          className={cn(
            "col-span-3",
            "lg:col-start-10",
            "flex",
            "items-center",
            "justify-end",
            "gap-2",
            "px-3",
            "lg:px-0",
          )}
        >
          <NextLink
            href="/inspiration"
            className={cn("px-3", "hover:underline")}
          >
            Inspiration
          </NextLink>
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
              <Button
                variant="outline"
                className={cn("w-9", "h-9", "rounded-full")}
              >
                <HamburgerMenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerContent
                data-container
                className={cn("h-fit", "min-h-[88.88svh]", "p-3")}
              >
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>This Description</DialogDescription>
                <NextLink href="/about" className={cn("text-6xl")}>
                  About
                </NextLink>
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
          className={cn("aspect-square", "p-0!", "rounded-full!")}
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
        <div className={cn("flex", "items-center", "justify-between", "py-2")}>
          <div>Theme:</div>
          <ThemeSelector />
        </div>
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
