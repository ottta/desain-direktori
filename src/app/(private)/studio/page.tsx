import ControlTenant2, { ControlTenantAttr } from "./_ControlTenant";

import { fetcher } from "@/libs/fetch";

const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;

export default async function Page() {
  const [tenants] = await Promise.all([
    fetcher<{ data: ControlTenantAttr[] }>(`${NEXT_PUBLIC_HOST}/api/tenants`),
  ]);

  return <ControlTenant2 fallback={tenants} />;
}
