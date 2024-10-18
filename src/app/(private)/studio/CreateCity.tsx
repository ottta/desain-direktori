"use client";

import { createCity } from "./actions";

import { useFormState } from "react-dom";

const initState = {
  message: "",
};

export default function CreateCity() {
  const [state, formAction] = useFormState(createCity, initState);
  return (
    <form action={formAction}>
      <label>
        <div>City</div>
        <input name="name" type="text" placeholder="Bandung" required />
      </label>
      <button type="submit">Add</button>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </form>
  );
}
