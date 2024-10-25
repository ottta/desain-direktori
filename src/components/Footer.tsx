"use client";

import ThemeSelector from "./ThemeSelector";
import { Button } from "./ui/button";
import { DialogDescription, DialogTitle } from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "./ui/drawer";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { MEDIA_MAX_MD } from "@/libs/constants";
import { cn } from "@/libs/utils";

export default function Footer() {
  const [open, setOpen] = useState(false);
  // const d = new Date();
  // const year = d.getFullYear();
  const MAX_MD = useMediaQuery(MEDIA_MAX_MD, {
    defaultValue: false,
    initializeWithValue: false,
  });

  const pathname = usePathname();
  useEffect(() => {
    if (!MAX_MD) return;
    console.log(open, pathname, MAX_MD);
    if (open) {
      setOpen(false);
    }
  }, [MAX_MD, pathname]);
  if (!MAX_MD) return null;
  return (
    <footer
      className={cn(
        "fixed",
        "right-0",
        "bottom-0",
        "left-0",
        "z-50",
        // "bg-red-300",
        "flex",
        "items-center",
        "justify-center",
        "pb-8",
        "pointer-events-none",
      )}
    >
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          asChild
          className={cn("z-[9999]", "pointer-events-auto")}
        >
          <Button
            variant="outline"
            className={cn(
              "w-16",
              "h-16",
              "rounded-full",
              "shadow",
              "z-50",
              "bg-red-100",
            )}
          >
            {/* <HamburgerMenuIcon /> */}
            {/* <DoubleArrowUpIcon /> */}
            <DotsHorizontalIcon className={cn("!w-7", "!h-7")} />
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent
            data-container
            className={cn("h-fit", "min-h-[66.66svh]", "p-0")}
          >
            <div
              className={cn(
                "px-3",
                "pt-2",
                "pb-12",
                "relative",
                "flex",
                "flex-col",
                "space-y-4",
                // "divide-y",
              )}
            >
              <div>
                <DialogTitle
                  className={cn("text-2xl", "flex", "justify-between")}
                >
                  <div>+62 | Desain Direktori</div>
                  <ThemeSelector />
                </DialogTitle>
                <DialogDescription>
                  An online repository for creatives
                </DialogDescription>
              </div>
              <div className={cn("flex", "flex-col", "divide-y")}>
                <NextLink href="/" className={cn("text-6xl")}>
                  Index
                </NextLink>
                <NextLink href="/about" className={cn("text-6xl")}>
                  About
                </NextLink>
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
      {/* <div
        data-container
        data-grid
        className={cn("h-14", "items-center", "text-xs", "text-neutral-500")}
      >
        <div className={cn("col-span-3", "lg:col-span-2")}>
          Copyright &copy;2024{year !== 2024 && `–${year}`} Unforma Club.
        </div>
        <div className={cn("px-2", "col-span-3")}>
          Typeface{" "}
          <a
            href="https://unforma.club/font/nouva"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("underline")}
          >
            Nouva
          </a>{" "}
          by Unforma Club.
        </div>
      </div> */}
    </footer>
  );
}
