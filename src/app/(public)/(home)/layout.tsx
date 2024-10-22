import HeaderProfile from "./HeaderProfile";

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
        <div className={cn("col-span-6")}>{children}</div>

        <div className={cn("col-span-6")}>
          <div className={cn("sticky", "top-0", "pt-16", "lg:pt-14", "-mt-14")}>
            <HeaderProfile />
            {profile}
          </div>
        </div>
      </div>
    </>
  );
}
