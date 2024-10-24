import { TenantRole } from "@prisma/client";

type TenantMedia = {
  title: string;
  url: string;
};

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  avatar_url: string;
  established_at: string;
  created_at: string;
  updated_at: string;
  address: { city: { id: string; name: string; slug: string } }[];
  discipline: { id: string; name: string; slug: string }[];
  type: TenantRole;
  cursor: number;
  media: TenantMedia[];
};

type BaseResponse = {
  success: boolean;
  errors?: unknown;
};

export type ResponseTenant = BaseResponse & {
  data: Tenant;
};

export type ResponseTenants = BaseResponse & {
  data: Tenant[];
};
