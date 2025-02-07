import { ReactNode } from "react";

import { cn } from "@/libs/utils";

export default function Layout({
  children,
  profile,
  hero,
}: {
  children: ReactNode;
  profile: ReactNode;
  hero: ReactNode;
}) {
  return (
    <>
      {hero}

      <div data-container data-grid>
        <div
          className={cn(
            "col-span-6",
            "md:col-span-8",
            "sticky",
            "top-0",
            // "pt-3",
            "lg:relative",
            "lg:top-0",
            "lg:pt-0",
            "z-20",
            "lg:order-last",
          )}
        >
          <div
            className={cn(
              "@container",
              "sticky",
              "top-0",
              // "pt-16",
              "lg:pt-14",
              // "-mt-16",
              "lg:-mt-14",
            )}
          >
            {profile}
          </div>
        </div>

        <div
          className={cn(
            "col-span-full",
            "lg:col-span-4",
            // "bg-red-100",
            // "md:bg-blue-100",
            // "lg:bg-yellow-100",
            // "xl:bg-green-100",
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
