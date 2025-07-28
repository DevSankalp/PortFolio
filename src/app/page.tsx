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
import { useGitHubRepo } from "@/helpers/useGitHubRepo";

export default function Page() {
  const showTopBtn = useScrollTopVisibility();
  const { loading: profileLoading } = useGitHubProfile();
  const repoHooks = [
    useGitHubRepo("SIH2023"),
    useGitHubRepo("FusionX"),
    // useGitHubRepo(""),
  ];
  const { validRepos } = useRepoCarousel(repoHooks);
  const loading = profileLoading || validRepos.some((r) => r.loading);
  return (
    <main>
      <Preloader isLoading={loading} />
      <ParticlesBackground />
      <Home />
      <Projects />
      <Footer />
      <button
        onClick={scrollToTop}
        className={`p-2 md:p-3 fixed bottom-6 right-6 bg-black hover:bg-blue-500 text-white rounded-full shadow-[0_6px_6px_rgba(0,0,0,0.4)] transition duration-300 cursor-pointer active:scale-90 z-10 ${
          showTopBtn ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <ArrowBigUpDash className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </main>
  );
}
