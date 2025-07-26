"use client";

import React, { useRef } from "react";
import data from "@/data/portfolioData.json";
import { Github, ExternalLink } from "lucide-react";
import { useActiveProjectIndex, useSlideInOnVisible } from "@/helpers";

export default function SlickVerticalCarousel() {
  const [activeIndex, setActiveIndex] = useActiveProjectIndex();
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelRef = useRef<HTMLElement>(null);

  // Apply slide-in animation on scroll
  useSlideInOnVisible(rightPanelRef);

  // Track scroll to update active project index
  React.useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closest = 0,
        minDist = Infinity;

      imageRefs.current.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - centerY);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setActiveIndex]);

  return (
    <section
      id="projects"
      className="min-h-screen grid grid-cols-2 gap-24 px-16 pt-32 relative overflow-clip gradient-bg"
    >
      {/* Left panel: title + dynamic project info */}
      <div className="h-[75vh] sticky top-[25vh] before:absolute before:w-1/2 before:h-4 before:bg-white before:right-0 before:bottom-12">
        <h1 className="text-5xl font-bold mb-12 uppercase">Projects</h1>
        <div
          className="fade-in transition-opacity duration-500"
          key={activeIndex}
        >
          <h2 className="text-3xl font-bold mb-4">
            {data.projects[activeIndex].title}
          </h2>
          <p className="mb-6 text-justify">
            {data.projects[activeIndex].description}
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href={data.projects[activeIndex].repo}
              target="_blank"
              className="flex items-center gap-1 text-blue-300 underline hover:no-underline"
            >
              <Github size={18} /> Code
            </a>
            <a
              href={data.projects[activeIndex].demo}
              target="_blank"
              className="flex items-center gap-1 text-blue-300 underline hover:no-underline"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* Right panel: scrollable iframe previews */}
      <section
        ref={rightPanelRef}
        className="flex flex-col gap-32 col-start-2 opacity-0 transform relative mb-32"
      >
        {data.projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="active:scale-95 duration-300 w-max"
          >
            <div className="h-screen">
              <div className="sticky top-[35vh]">
                <a
                  href={project.demo}
                  target="_blank"
                  className="relative block h-[50vh] scale-100 inset-0 duration-300 transition-all hover:inset-[-12px_16px] hover:scale-110 before:absolute before:w-4 before:h-1/3 before:bg-white before:-left-8 before:top-0 before:duration-300 hover:before:opacity-0 after:absolute after:w-1/5 after:h-4 after:bg-white after:-top-12 after:right-1/2 after:border-1 after:border-black hover:after:opacity-0 after:duration-300 before:pointer-events-none after:pointer-events-none"
                >
                  <iframe
                    src={project.demo}
                    width="1280"
                    height="800"
                    style={{
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                      border: "none",
                      backgroundColor: "white",
                    }}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
