import { prisma } from "@/prisma";
import NextLink from "next/link";

import { cn, toSlug } from "@/libs/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Page() {
  const data = await prisma.user.findMany();
  return (
    <ul className={cn("space-y-3", "p-3")}>
      {data.concat(data, data).map((item, i) => (
        <li key={i} className={cn("flex", "gap-3", "items-start")}>
          <NextLink
            href={`/studio/user/${item.id}`}
            className={cn("flex", "gap-3", "items-start")}
          >
            <div>
              <Avatar>
                <AvatarImage alt="Avatar" src={item.image || "/favicon.png"} />
                <AvatarFallback className={cn("uppercase")}>
                  {toSlug(String(item.name))
                    .split("-")
                    .map((item) => item[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className={cn("leading-none")}>
              <div className={cn("text-xl")}>{item.name}</div>
              <div>{item.email}</div>
            </div>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
