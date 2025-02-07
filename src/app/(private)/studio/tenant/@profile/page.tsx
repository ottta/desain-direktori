import { prisma } from "@/prisma";
import NextLink from "next/link";

import { cn } from "@/libs/utils";

import HeaderProfile from "@/components/HeaderProfile";

export default async function Page() {
  const [decline, pending, publish, suspend] = await Promise.all([
    prisma.tenant.count({ where: { status: "DECLINE" } }),
    prisma.tenant.count({ where: { status: "PENDING" } }),
    prisma.tenant.count({ where: { status: "PUBLISH" } }),
    prisma.tenant.count({ where: { status: "SUSPEND" } }),
  ]);
  const pathname = `/studio/tenant`;
  return (
    <>
      <HeaderProfile>Summary</HeaderProfile>
      <div
        className={cn(
          "text-5xl",
          "leading-[0.9]",
          "p-3",
          "text-neutral-400",
          "dark:text-neutral-600",
          "max-w-(--breakpoint-sm)",
        )}
      >
        There is{" "}
        <NextLink
          href={{ pathname, query: { status: "publish" } }}
          className={cn(
            "text-neutral-900",
            "dark:text-neutral-200",
            "hover:underline",
          )}
        >
          <strong>{publish} published</strong>
        </NextLink>{" "}
        tenants,{" "}
        <NextLink
          href={{ pathname, query: { status: "pending" } }}
          className={cn(
            "text-neutral-900",
            "dark:text-neutral-200",
            "hover:underline",
          )}
        >
          <strong>{pending} pending</strong>
        </NextLink>{" "}
        tenants awaiting for approval,{" "}
        <NextLink
          href={{ pathname, query: { status: "decline" } }}
          className={cn(
            "text-neutral-900",
            "dark:text-neutral-200",
            "hover:underline",
          )}
        >
          <strong>{decline} declined</strong>
        </NextLink>{" "}
        tenant, and{" "}
        <NextLink
          href={{ pathname, query: { status: "suspend" } }}
          className={cn(
            "text-neutral-900",
            "dark:text-neutral-200",
            "hover:underline",
          )}
        >
          <strong>{suspend} suspended</strong>
        </NextLink>{" "}
        tenants.
      </div>
    </>
  );
}
