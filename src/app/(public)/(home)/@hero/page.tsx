import { prisma } from "@/prisma";
import { TenantRole, TenantStatus } from "@prisma/client";

import { cn } from "@/libs/utils";

function digitLength(num: number) {
  const length = (Math.log(num) * Math.LOG10E + 1) | 0;
  return length;
}

function Value({
  value,
  padLong,
  label,
}: {
  value: number;
  padLong: number;
  label: string;
}) {
  return (
    <div>
      <span className={cn("text-neutral-400", "dark:text-neutral-600")}>
        {Array.from({ length: padLong - digitLength(value) })
          .map(() => "0")
          .join("")}
      </span>
      <span>
        {value}{" "}
        <span className={cn("text-neutral-400", "dark:text-neutral-600")}>
          {label}
        </span>
      </span>
    </div>
  );
}

export default async function Page() {
  const [disciplines, cities, companies, persons] = await Promise.all([
    prisma.discipline.count(),
    prisma.city.count(),
    prisma.tenant.count({
      where: { type: TenantRole.COMPANY, status: TenantStatus.PUBLISH },
    }),
    prisma.tenant.count({
      where: { type: TenantRole.PERSONAL, status: TenantStatus.PUBLISH },
    }),
  ]);

  // Find the highest value
  const padLong = digitLength(
    Math.max(disciplines, cities, companies, persons),
  );
  return (
    <div
      data-container
      data-grid
      className={cn(
        "min-h-[50lvh]",
        "z-30",
        "relative",
        // "mb-16",
        // "lg:mb-14",
        // "bg-red-400",
      )}
    >
      <div
        className={cn(
          "col-span-full",
          "lg:col-span-6",
          "@container",
          "pb-16",
          // "bg-red-100",
        )}
      >
        <div
          className={cn(
            // "portrait:text-4xl",
            // "landscape:text-6xl",
            // "landscape:lg:text-7xl",
            "px-3",
            "lg:px-2",
            "text-[11cqw]",
            "leading-[0.9]!",
            "uppercase",
            "tabular-nums",
          )}
        >
          <Value label="Cities" value={cities} padLong={padLong} />
          <Value label="Disciplines" value={disciplines} padLong={padLong} />
          <Value label="Companies" value={companies} padLong={padLong} />
          <Value label="Persons" value={persons} padLong={padLong} />
        </div>
      </div>
    </div>
  );
}
