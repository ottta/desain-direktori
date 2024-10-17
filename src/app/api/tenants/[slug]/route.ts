import { prisma } from "@/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      year: true,
      city: true,
      discipline: true,
    },
  });
  return Response.json({ data: tenant });
}
