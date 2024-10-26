import { prisma } from "@/prisma";

import { cn } from "@/libs/utils";

import Boundary from "@/components/Boundary";
import HeaderProfile from "@/components/HeaderProfile";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await prisma.user.findUnique({ where: { id: slug } });
  return (
    <div>
      <HeaderProfile>User Data</HeaderProfile>
      <Boundary className={cn("-mt-px")}>
        <pre className={cn("overflow-hidden")}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Boundary>
    </div>
  );
}
