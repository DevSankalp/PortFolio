import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useGitHubRepo } from "./useGitHubRepo";

// Hook: Show scroll-to-top button
export function useScrollTopVisibility(threshold: number = 300) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}

// Hook: Detect scroll state (e.g. for navbar effects)
export function useScrolled(offset: number = 10) {
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > offset);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return scrolled;
}

// Utility: Scroll to top
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Utility: Scroll to projects section using Lenis
export const scrollToProjects = (lenisRef: any) => {
  const target = document.getElementById("projects");
  if (target && lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset: 0, duration: 2 });
  }
};

export const scrollToContact = (lenisRef: any) => {
  const target = document.getElementById("contact");
  if (target && lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset: 0, duration: 2 });
  }
};

// Hook: Hide scroll button after scrolling
export function useHideScrollButton(threshold: number = 100) {
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideButton(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hideButton;
}

// Hook: Track active project index based on scroll
export function useActiveProjectIndex() {
  const [activeIndex, setActiveIndex] = useState(0);
  return [activeIndex, setActiveIndex] as const;
}

// Hook: Slide-in animation when element is in viewport
export function useSlideInOnVisible(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top, bottom } = ref.current.getBoundingClientRect();
        ref.current.classList.toggle(
          "slide-in-right",
          top < window.innerHeight && bottom > 0
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);
}

// Hook: GitHub Repository Carousel
export function useRepoCarousel(repoNames: string[]) {
  const repoHooks = repoNames.map((repo) => useGitHubRepo(repo));

  const validRepos = repoHooks
    .map((hook, idx) => ({ ...hook, idx }))
    .filter(({ repoData }) => repoData && repoData.full_name);

  const [currentRepo, setCurrentRepo] = useState(0);

  useEffect(() => {
    if (validRepos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentRepo((prev) => (prev + 1) % validRepos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [validRepos.length]);

  return { validRepos, currentRepo };
}
