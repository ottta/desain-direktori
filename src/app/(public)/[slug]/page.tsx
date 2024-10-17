import { getTenants } from "@/libs/fetch";

export default async function Page(props: { params: { slug: string } }) {
  const {
    params: { slug },
  } = props;
  const data = await getTenants(slug);
  return (
    <div data-container>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
