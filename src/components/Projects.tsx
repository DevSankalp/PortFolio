"use client";

import React, { useRef } from "react";
import data from "@/data/portfolioData.json";
import { Github, ExternalLink } from "lucide-react";
import { useActiveProjectIndex, useSlideInOnVisible } from "@/helpers";

export default function SlickVerticalCarousel() {
  // Active project index and refs for scroll tracking
  const [activeIndex, setActiveIndex] = useActiveProjectIndex();
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelRef = useRef<HTMLElement>(null);
  // Slide-in animation on scroll
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
      className="min-h-screen w-full p-0 md:px-16 md:pt-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 relative overflow-clip gradient-bg"
    >
      {/* Left panel: title + dynamic project info */}
      <div className="w-full h-[45vh] md:h-[75vh] p-4 md:p-0 sticky top-0 md:top-[25vh] before:hidden sm:before:block before:absolute before:w-1/2 before:h-4 before:bg-white before:right-0 before:bottom-12 z-1 gradient-bg md:!bg-none">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-12 uppercase">
          Projects
        </h1>
        <div
          className="fade-in transition-opacity duration-500"
          key={activeIndex}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-nowrap">
            {data.projects[activeIndex].title}
          </h2>
          <p className="mb-4 sm:mb-6 text-justify text-xs sm:text-lg">
            {data.projects[activeIndex].description}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 text-xs sm:text-lg">
            {[
              {
                label: "Code",
                url: data.projects[activeIndex].repo,
                icon: <Github size={18} />,
              },
              {
                label: "Live Demo",
                url: data.projects[activeIndex].demo,
                icon: <ExternalLink size={18} />,
              },
            ].map(({ label, url, icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                className="flex items-center gap-1 text-blue-300 underline hover:no-underline"
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: scrollable iframe previews */}
      <section
        ref={rightPanelRef}
        className="w-full flex flex-col gap-16 sm:gap-24 md:gap-32 col-start-1 md:col-start-2 opacity-0 transform relative mb-16 md:mb-32"
      >
        {data.projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="active:scale-95 duration-300 w-full flex justify-center md:block relative"
          >
            <div className="h-screen">
              <div className="sticky top-[38vh] md:top-[35vh]">
                <a
                  href={project.demo}
                  target="_blank"
                  className="relative flex items-center justify-center md:block w-full max-w-[800px] h-[450px] scale-100 inset-0 duration-300 transition-all hover:inset-[-12px_16px] hover:scale-105 before:hidden sm:before:block before:absolute before:w-4 before:h-1/3 before:bg-white before:-left-8 before:top-0 before:duration-300 hover:before:opacity-0 after:hidden sm:after:block after:absolute after:w-1/3 after:h-4 after:bg-white after:-top-12 after:right-2 after:border-1 after:border-black hover:after:opacity-0 after:duration-300 before:pointer-events-none after:pointer-events-none"
                >
                  <iframe
                    src={project.demo}
                    className="responsiveIframe"
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
