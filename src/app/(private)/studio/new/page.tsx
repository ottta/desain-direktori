import NewTenant from "../NewTenant";

import { auth } from "@/auth";

import { getCities, getDisciplines } from "@/libs/fetch";
import { cn } from "@/libs/utils";

export default async function Page() {
  const [cities, disciplines, session] = await Promise.all([
    getCities(),
    getDisciplines(),
    auth(),
  ]);

  if (!session) return;
  return (
    <div className={cn("col-span-4")}>
      <NewTenant session={session} cities={cities} disciplines={disciplines} />
    </div>
  );
}
