import { notFound } from "next/navigation";
import { Octokit } from "octokit";

const origin = process.env.NEXT_PUBLIC_HOST;
const githubToken = process.env.GITHUB_TOKEN;

type GitHubContributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

type Tenant = {
  id: string;
  name: string;
  slug: string;
  year: number;
  city: {
    id: string;
    name: string;
    slug: string;
  };
  discipline: {
    id: string;
    name: string;
    slug: string;
  };
};

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  try {
    const response = await fetch(input, {
      ...init,
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function getCities(slug?: string) {
  if (slug) {
  }
  const data = await fetcher<{
    data: { id: string; name: string; slug: string }[];
  }>(`${origin}/api/cities`, {
    next: { tags: ["cities"], revalidate: 5 },
  });
  return data;
}

export async function getDisciplines(slug?: string) {
  if (slug) {
  }
  const data = await fetcher<{
    data: { id: string; name: string; slug: string }[];
  }>(`${origin}/api/disciplines`, {
    next: { tags: ["disciplines"], revalidate: 5 },
  });
  return data;
}

export async function getTenants(slug?: string) {
  if (slug) {
    const data = await fetcher<{
      data: Tenant;
    }>(`${origin}/api/tenants/${slug}`, {
      next: { tags: ["tenant", slug] },
    });
    return data;
  }
}

export async function getGithubContributors() {
  const octokit = new Octokit({ auth: githubToken });
  const data = await octokit.request("GET /repos/ottta/ottta/contributors", {
    owner: "OWNER",
    repo: "REPO",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return data.data as GitHubContributor[];
}
