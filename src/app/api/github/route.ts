import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo");
  const GITHUB_USERNAME = "DevSankalp";

  let url = `https://api.github.com/users/${GITHUB_USERNAME}`;
  if (repo) {
    url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
