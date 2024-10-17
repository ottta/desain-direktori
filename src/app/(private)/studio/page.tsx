import CreateDiscipline from "./CreateDiscipline";
import CreateTenant from "./CreateTenant";

import { auth } from "@/auth";

import { getCities, getDisciplines } from "@/libs/fetch";

export default async function Page() {
  const [cities, disciplines, session] = await Promise.all([
    getCities(),
    getDisciplines(),
    auth(),
  ]);

  return (
    <div data-container>
      <div>Page Studio</div>
      <CreateTenant cities={cities.data} disciplines={disciplines.data} />
      <CreateDiscipline />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
