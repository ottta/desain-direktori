import { prisma } from "@/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "72";

  const qDiscipline = searchParams.get("discipline");
  const qCity = searchParams.get("city");

  const data = await prisma.tenant.findMany({
    where: {
      discipline: {
        slug:
          qDiscipline && qDiscipline !== "all"
            ? String(qDiscipline)
            : undefined,
      },
      city: {
        slug: qCity && qCity !== "all" ? String(qCity) : undefined,
      },
    },
    include: { discipline: true, city: true },
    take: Number(limit),
    skip: 0,
  });

  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const tenant = await prisma.tenant.create({
    data: {
      name: body.name,
      slug: body.slug,
      year: body.year,
      disciplineId: body.disciplineId,
      cityId: body.cityId,
    },
  });
  return Response.json({ success: true, data: tenant });
}
