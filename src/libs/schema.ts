import { TenantRole, TenantStatus } from "@prisma/client";
import { z } from "zod";

export const SchemaTenant = z.object({
  name: z.string().min(4, "Min. 4 characters").max(50, "Max. 50 characters"),
  discipline: z.string().min(4),
  website: z.string().trim().url(),
  role: z.nativeEnum(TenantRole),
  city: z.string().min(4),
  status: z.nativeEnum(TenantStatus).optional().default("PENDING"),
  instagram: z.string().optional(),
  behance: z.string().optional(),
});
