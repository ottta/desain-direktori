import ControlTenant2, { ControlTenantAttr } from "./_ControlTenant";

import { auth } from "@/auth";

import { fetcher } from "@/libs/fetch";

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

export default async function Page() {
  const [session, tenants] = await Promise.all([
    auth(),
    await fetcher<{ data: ControlTenantAttr[] }>(
      `${NEXT_PUBLIC_HOST}/api/tenants`,
    ),
  ]);

  if (!session) return;
  return <ControlTenant2 fallback={tenants} />;
}
