import NextLink from "next/link";

export default function Page() {
  return (
    <div>
      <ul>
        {Array.from({ length: 100 }).map((_, i) => (
          <li key={i}>
            <NextLink href={`/inspiration/${i + 1}`}>
              Inspiration {i + 1}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
