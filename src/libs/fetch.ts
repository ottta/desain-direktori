import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { Octokit } from "octokit";

const githubToken = process.env.GITHUB_TOKEN;

type GitHubContributor = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
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

export async function getCities() {
  const data = await prisma.city.findMany();
  return data;
}

export async function getDisciplines() {
  const data = await prisma.discipline.findMany();
  return data;
}

export async function getTenants(slug?: string) {
  if (slug) {
    const t = await prisma.tenant.findUniqueOrThrow({
      where: { slug },
      include: {
        discipline: true,
        address: { select: { city: true } },
      },
    });
    return t;
  }
}

export async function getGithubContributors() {
  const octokit = new Octokit({ auth: githubToken });
  const data = await octokit.request(
    "GET /repos/ottta/plus-sixtytwo/contributors",
    {
      owner: "OWNER",
      repo: "REPO",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  return data.data as GitHubContributor[];
}
