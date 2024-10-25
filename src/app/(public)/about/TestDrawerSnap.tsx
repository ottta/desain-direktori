"use client";

import NextLink from "next/link";
import { useState } from "react";

import { cn } from "@/libs/utils";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";

const snapPoints = ["64px", "512px", 1];

export default function VaulDrawer() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
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
            "border-b-none rounded-t-3xl bottom-0 left-0 right-0 h-full max-h-svh",
            "-mx-px",
          )}
        >
          <div className={cn("gap-y-4", "flex", "flex-col")}>
            <div className={cn("h-16", "px-3")}>
              <DrawerTitle>+62 | Desain Direktori</DrawerTitle>
              <DrawerDescription>
                Archiving Indonesia&apos;s creatives.
              </DrawerDescription>
            </div>
            <div className={cn("flex", "flex-col", "divide-y")}>
              <NextLink href="/" className={cn("text-4xl", "px-3")}>
                Index
              </NextLink>
              <NextLink href="/about" className={cn("text-4xl", "px-3")}>
                About
              </NextLink>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
