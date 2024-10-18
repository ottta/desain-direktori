import { prisma } from "@/prisma";
import { TenantRole } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "72";

  const qDiscipline = searchParams.get("discipline");
  const qCity = searchParams.get("city");
  const qCategory = searchParams.get("category");

  const data = await prisma.tenant.findMany({
    orderBy: { created_at: "desc" },
    include: {
      discipline: true,
      address: {
        include: { city: true },
      },
    },
    take: Number(limit) || 72, // Page size
    where: {
      address: {
        some: { city: { slug: qCity && qCity !== "all" ? qCity : undefined } },
      },
      discipline: {
        some: {
          slug: qDiscipline && qDiscipline !== "all" ? qDiscipline : undefined,
        },
      },
      type: (qCategory?.toUpperCase() as keyof typeof TenantRole) ?? undefined,
    },
  });

  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const tenant = await prisma.tenant.create({
    data: {
      name: body.name,
      slug: body.slug,
      discipline: { connect: { id: body.disciplineId } },
      address: { create: { city_id: body.cityId } },
    },
    include: { discipline: true, address: true },
  });
  return Response.json({ success: true, data: tenant });
}
