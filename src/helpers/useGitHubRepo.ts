"use client";

import { useEffect, useState } from "react";

export type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

// Only allow fetching repos for the current user
const GITHUB_USERNAME = "DevSankalp";

export function useGitHubRepo(repo: string) {
  const [repoData, setRepoData] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repo) return;
    const fetchRepo = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const headers: HeadersInit = token
          ? { Authorization: `Bearer ${token}` }
          : {};
        const res = await fetch(
          `/api/github?user=${GITHUB_USERNAME}&repo=${repo}`,
          { headers }
        );
        if (!res.ok) throw new Error("Failed to fetch GitHub repo");
        const data = await res.json();
        setRepoData(data);
      } catch (err) {
        console.error(err);
        setRepoData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, [repo]);

  return { repoData, loading };
}
