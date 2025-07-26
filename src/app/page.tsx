"use client";

import { scrollToTop, useScrollTopVisibility } from "@/helpers";
import ParticlesBackground from "@/components/Particles/ParticlesBackground";
import { ArrowBigUpDash } from "lucide-react";

import Home from "@/components/Home";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { useGitHubProfile } from "@/helpers/useGitHubProfile";
import { useRepoCarousel } from "@/helpers";

export default function Page() {
  const showTopBtn = useScrollTopVisibility();
  // --- Preloader logic: wait for GitHub profile and repos to load ---
  const { loading: profileLoading } = useGitHubProfile();
  const repoNames = ["SIH2023", "FusionX", ""];
  const { validRepos } = useRepoCarousel(repoNames);
  // If any repo is still loading, keep preloader
  const reposLoading = validRepos.some((r) => r.loading);
  const loading = profileLoading || reposLoading;

  return (
    <main>
      <Preloader isLoading={loading} />
      <ParticlesBackground />
      <div>
        <Home />
        <Projects />
        <Footer />
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 bg-black hover:bg-blue-500 text-white p-3 rounded-full shadow-[0_6px_6px_rgba(0,0,0,0.4)] transition duration-300 cursor-pointer active:scale-90 z-10 ${
            showTopBtn
              ? "translate-y-0 opacity-100"
              : "translate-y-24 opacity-0"
          }`}
        >
          <ArrowBigUpDash />
        </button>
      </div>
    </main>
  );
}
