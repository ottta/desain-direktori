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
      address: true,
      discipline: true,
      established_at: true,
      created_at: true,
      updated_at: true,
    },
  });
  return Response.json({ data: tenant });
}
