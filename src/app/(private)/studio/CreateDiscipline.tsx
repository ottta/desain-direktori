"use client";

import { createDiscipline } from "./actions";

import { useFormState } from "react-dom";

const initState = {
  message: "",
};

export default function CreateDiscipline() {
  const [state, formAction] = useFormState(createDiscipline, initState);
  return (
    <form action={formAction}>
      <input name="name" type="text" />
      <button type="submit">Add</button>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </form>
  );
}
