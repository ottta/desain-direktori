import { LinkProps } from "next/link";

export const PAGE_SIZE = 24;
export const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
export const API_TENANTS = "/api/tenants";

export const MEDIA_MD = "(min-width: 768px)";
export const MEDIA_MAX_MD = "not all and (min-width: 768px)";

type StaticLink = { label: string } & LinkProps;

export const LINK_PRIVATE: StaticLink[] = [
  { label: "Studio", href: "/studio" },
  { label: "Tenant", href: "/studio/tenant" },
  { label: "User", href: "/studio/user" },
];

export const LINK_PUBLIC: StaticLink[] = [
  { label: "Index", href: "/" },
  { label: "About", href: "/about" },
  { label: "Submission", href: "/submission" },
  { label: "Term of Use", href: "/policy/term-of-use" },
];

export const SITE_DATA = {
  name: "Directus Emeritus",
  name_html: "<b>Directus</b> Emeritus",
  // name: "+62 | Desain Direktori",
  // name_html: "+62 | <b>Desain</b> Direktori",
  logo: null,
  description: {
    text: "Directus Emeritus is an online repository of South East Asia creative people and companies",
    html: `<strong>Directus Emeritus</strong> is an online repository of <strong>%DATA_CREATIVES%</strong> creatives within <strong>%DATA_DISCIPLINES%</strong> disciplines across <strong>%DATA_CITIES%</strong> cities and growing.`,
  },
  established_at: "2024-08-30T00:00:00.000Z",
};
