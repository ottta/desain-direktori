"use client";

import { createTenant } from "./actions";

import { IDiscipline } from "@/types/discipline";

import { useFormState } from "react-dom";

const initState = {
  message: "",
};
export default function CreateTenant({
  disciplines,
  cities,
}: {
  disciplines: IDiscipline[];
  cities: IDiscipline[];
}) {
  const [state, formAction] = useFormState(createTenant, initState);
  const sortDicipline = disciplines.sort((a, b) =>
    a.slug.localeCompare(b.slug),
  );
  const sortCity = cities.sort((a, b) => a.slug.localeCompare(b.slug));
  return (
    <>
      <form action={formAction}>
        <label>
          <select name="city" defaultValue={sortCity[0].id}>
            {sortCity.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select name="discipline" defaultValue={sortDicipline[0].id}>
            {sortDicipline.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <div>Name</div>
          <input name="name" type="text" />
        </label>
        <label>
          <div>Year</div>
          <input name="year" type="text" />
        </label>
        <button type="submit">Add</button>
        <div>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </form>
    </>
  );
}
