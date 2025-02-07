import { prisma } from "@/prisma";
import NextLink from "next/link";

import { SITE_DATA } from "@/libs/constants";
import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";

export default async function Page() {
  const [tenants, disciplines, cities] = await Promise.all([
    prisma.tenant.count(),
    prisma.discipline.count(),
    prisma.city.count(),
  ]);

  const establishedDate = new Date(SITE_DATA.established_at);
  const currentDate = new Date();

  const establishedYear = establishedDate.getFullYear();
  const currentYear = currentDate.getFullYear();

  return (
    <div
      className={cn(
        "h-[33.33svh]",
        "lg:h-[calc(100svh-7rem)]",
        "bg-neutral-100",
        "dark:bg-neutral-950",
        "max-md:border-b",
      )}
    >
      <HeaderProfile>{SITE_DATA.name}</HeaderProfile>

      <div
        className={cn(
          "pt-2",
          "pb-4",
          "flex",
          "flex-col",
          "justify-between",
          // "h-[33.33svh]",
          // "lg:h-[calc(100svh-7rem)]",
          "overflow-hidden",
          "lg:min-h-[calc(100lvh-7rem)]",
          // "bg-red-200",
        )}
      >
        <article className={cn("px-3", "lg:px-2")}>
          <p
            dangerouslySetInnerHTML={{
              __html: SITE_DATA.description.html
                .replace("%DATA_CREATIVES%", tenants.toString())
                .replace("%DATA_DISCIPLINES%", disciplines.toString())
                .replace("%DATA_CITIES%", cities.toString()),
            }}
            className={cn(
              "text-[6.666cqw]",
              "lg:text-[5.5cqw]",
              // "lg:text-6xl",
              "leading-[0.9]",
              "text-neutral-400",
              "dark:text-neutral-600",
              "[&_strong]:text-neutral-900",
              "mb-3",
            )}
          ></p>
          <NextLink
            href="/about"
            className={cn("hover:underline", "font-normal")}
          >
            Read More...
          </NextLink>
        </article>

        <div
          className={cn(
            "px-3",
            "text-xs",
            "leading-[1.2]",
            "max-lg:hidden",
            "text-neutral-500",
          )}
        >
          <div>
            Copyright &copy;
            {currentYear - establishedYear > 0
              ? `${establishedYear}—${currentYear}`
              : currentYear}{" "}
            Unforma Club. Typeface use{" "}
            <NextLink
              href="https://unforma.club/font/nouva"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline")}
            >
              Nouva.
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
