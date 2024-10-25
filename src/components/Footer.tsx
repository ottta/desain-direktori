"use client";

import ThemeSelector from "./ThemeSelector";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerPortal,
  DrawerTitle,
} from "./ui/drawer";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { LINK_PUBLIC, MEDIA_MAX_MD } from "@/libs/constants";
import { cn } from "@/libs/utils";

// const snapPoints = ["64px", "512px", 1];
const snapPoints: (string | number)[] = [0.065, 0.5, 1];

export default function Footer() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const d = new Date();
  const year = d.getFullYear();
  const MAX_MD = useMediaQuery(MEDIA_MAX_MD, {
    defaultValue: false,
    initializeWithValue: false,
  });

  const pathname = usePathname();
  const freezePathname = useRef(pathname);
  useEffect(() => {
    if (!MAX_MD) return;
    if (freezePathname.current === pathname) return;
    const handler = () => {
      if (snap && snapPoints.indexOf(snap) !== 0) {
        setSnap(snapPoints[0]);
        freezePathname.current = pathname;
      }
    };

    handler();
  }, [MAX_MD, pathname, snap, freezePathname]);

  if (!MAX_MD) return null;
  return (
    <footer
      className={cn(
        "fixed",
        "right-0",
        "bottom-0",
        "left-0",
        "z-50",
        "grid",
        "grid-cols-3",
        "pb-14",
        "pointer-events-none",
      )}
    >
      <Drawer
        shouldScaleBackground={true}
        snapPoints={snapPoints}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        modal={false}
        open={true}
      >
        <DrawerPortal>
          <DrawerContent
            data-testid="content"
            className={cn(
              "border-b-none rounded-t-3xl bottom-0 left-0 right-0 h-full",
              "max-h-vh",
              "-mx-px",
              "!shadow-[0rem_-0.5rem_2rem_-1.25rem_#737373]",
            )}
          >
            <div className={cn("gap-y-4", "flex", "flex-col", "relative")}>
              <div
                className={cn(
                  "h-16",
                  "px-3",
                  "flex",
                  "justify-between",
                  "items-start",
                )}
              >
                <div>
                  <DrawerTitle>+62 | Desain Direktori</DrawerTitle>
                  <DrawerDescription>
                    Archiving Indonesia&apos;s creatives.
                  </DrawerDescription>
                </div>
                <ThemeSelector />
              </div>
              <ul className={cn("flex", "flex-col", "divide-y")}>
                {LINK_PUBLIC.map((item, i) => (
                  <li key={i}>
                    <NextLink {...item} className={cn("text-4xl", "px-3")}>
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-container
              data-grid
              className={cn(
                "h-14",
                "items-center",
                "text-xs",
                "text-neutral-500",
                "absolute",
                "bottom-0",
              )}
            >
              <div className={cn("col-span-3", "lg:col-span-2", "px-3")}>
                Copyright &copy;2024{year !== 2024 && `–${year}`} Unforma Club.
              </div>
              <div className={cn("col-span-3", "px-3")}>
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
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </footer>
  );
}
