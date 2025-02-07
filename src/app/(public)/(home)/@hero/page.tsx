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
    <span>
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
    </span>
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
      className={cn("min-h-[33.33vh]", "z-30", "relative", "mb-16", "lg:mb-14")}
    >
      <div
        style={{ fontFeatureSettings: `"tnum" 1` }}
        className={cn(
          "portrait:text-4xl",
          "landscape:text-6xl",
          "landscape:lg:text-7xl",
          "px-3",
          "lg:px-2",
          "leading-[0.8]!",
          "uppercase",
        )}
      >
        <Value label="Cities" value={cities} padLong={padLong} />
        <br />
        <Value label="Disciplines" value={disciplines} padLong={padLong} />
        <br />
        <Value label="Companies" value={companies} padLong={padLong} />
        <br />
        <Value label="Persons" value={persons} padLong={padLong} />
      </div>
    </div>
  );
}
