type PageProps = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page(props: PageProps) {
  const { handle } = await props.params;
  return <div>Inspiration Handle {handle}</div>;
}
