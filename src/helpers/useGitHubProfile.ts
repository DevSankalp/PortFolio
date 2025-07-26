"use client";

import { useEffect, useState } from "react";

export type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  html_url: string;
  location: string;
  public_repos: number;
};

export function useGitHubProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch GitHub profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}
