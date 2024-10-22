import { prisma } from "@/prisma";
import { TenantRole } from "@prisma/client";
import NextLink from "next/link";
import { ReactNode } from "react";

import { getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

function PaddingTemplate({
  pad,
  children,
}: {
  pad?: string;
  children: ReactNode;
}) {
  return (
    <span>
      {pad && (
        <span className={cn("text-neutral-300", "dark:text-neutral-600")}>
          {pad}
        </span>
      )}
      {children}
    </span>
  );
}

function digitPadding(num: number) {
  const sNumber = num.toString();
  return sNumber.length <= 1 ? (
    <PaddingTemplate pad="000">{sNumber}</PaddingTemplate>
  ) : sNumber.length < 3 ? (
    <PaddingTemplate pad="00">{sNumber}</PaddingTemplate>
  ) : sNumber.length < 4 ? (
    <PaddingTemplate pad="0">{sNumber}</PaddingTemplate>
  ) : (
    <PaddingTemplate>{sNumber}</PaddingTemplate>
  );
}

export default async function Page() {
  const [disciplines, cities, companies, persons] = await Promise.all([
    getDisciplines(),
    getCities(),
    await prisma.tenant.count({
      where: { type: TenantRole.COMPANY, status: "PUBLISH" },
    }),
    await prisma.tenant.count({
      where: { type: TenantRole.PERSONAL, status: "PUBLISH" },
    }),
  ]);
  return (
    <div data-container className={cn("min-h-[25vh]", "z-30", "relative")}>
      <div
        style={{ fontFeatureSettings: `"tnum" 1` }}
        className={cn(
          "text-5xl",
          "lg:text-7xl",
          "max-lg:px-1",
          "!leading-[0.8]",
          "uppercase",
        )}
      >
        {digitPadding(cities.length - 1)} Cities
        <br />
        {digitPadding(disciplines.length - 1)} Disciplines
        <br />
        {digitPadding(companies)} Companies
        <br />
        {digitPadding(persons)} Persons
      </div>
      <p className={cn("px-2", "my-6")}>
        Desain Direktori is inisiative project by{" "}
        <a
          href="https://unforma.club"
          target="_blank"
          rel="noopener noreferrer"
        >
          Taufik Oktama.
        </a>
        <br />
        <NextLink href="/about">Read More...</NextLink>
      </p>
    </div>
  );
}
