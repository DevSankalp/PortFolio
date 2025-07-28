"use client";

import { useLenis } from "@/hooks/useLenis";
import {
  useHideScrollButton,
  scrollToProjects,
  scrollToContact,
  useRepoCarousel,
} from "@/helpers";
import { useGitHubRepo } from "@/helpers/useGitHubRepo";
import { useGitHubProfile } from "@/helpers/useGitHubProfile";
import Typewriter from "typewriter-effect";
import { ArrowDown, Layers2 } from "lucide-react";
import data from "@/data/portfolioData.json";
import Image from "next/image";

export default function HomeSection() {
  const lenisRef = useLenis();
  const hideButton = useHideScrollButton();
  const { profile } = useGitHubProfile();
  const repoNames = ["SIH2023", "FusionX", "SIH2024"];
  const repoHooks = repoNames.map(useGitHubRepo);
  // Get valid repos and current index for carousel
  const { validRepos, currentRepo } = useRepoCarousel(repoHooks);

  return (
    <section className="min-h-screen w-full px-6 py-10 md:px-16 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 relative">
      {/* Left Column: Introduction and bio */}
      <div
        id="home"
        className="h-2/3 md:h-max flex md:block flex-col items-center justify-center max-w-2xl px-4 md:p-0 m-0 md:mt-32 col-start-1"
      >
        {/* Gradient animated typewriter heading */}
        <h1 className="text-transparent bg-[linear-gradient(270deg,rgba(186,69,222,1)0%,rgba(93,24,204,1)52%,rgba(0,255,225,1)100%)] bg-clip-text text-5xl md:text-6xl font-bold mb-8">
          <Typewriter
            options={{
              strings: [
                "Hello, I'm Sankalp",
                "Web Developer",
                "Cloud Enthusiast",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify text-base sm:text-lg">
          {data.bio}
        </p>
      </div>

      {/* Right Column: GitHub profile and repo carousel (hidden on mobile) */}
      <div className="w-full hidden md:flex flex-col items-end gap-8 mt-10">
        {/* GitHub Profile Card */}
        {profile && (
          <div className="flex flex-col p-8 rounded-xl bg-gray-300/10 backdrop-blur-sm shadow-md">
            <div className="flex flex-col items-center">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  width={200}
                  height={200}
                  className="border-2 border-slate-400 rounded-full mb-4"
                />
              </a>
              <h2 className="w-full text-2xl sm:text-3xl font-semibold">
                {profile.name}
              </h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-slate-300"
              >
                <p>{profile.login}</p>
              </a>
            </div>
            <p className="mt-1 text-sm">{profile.location}</p>
            <div className="text-gray-400 mt-4 flex gap-2 flex-wrap">
              <a
                href={`${profile.html_url}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                <p className="flex gap-2">
                  <Layers2 /> Public Repositories
                </p>
              </a>
              <p>- {profile.public_repos}</p>
            </div>
          </div>
        )}

        {/* GitHub Repository Carousel */}
        <div className="w-full flex flex-col items-end gap-4">
          {validRepos.map(({ repoData }, i) =>
            repoData ? (
              <div
                key={repoData.full_name}
                className={`flex flex-col p-6 rounded-xl bg-gray-300/10 backdrop-blur-sm shadow-md w-full max-w-md transition-opacity duration-700 ${
                  i === currentRepo
                    ? "opacity-100 relative z-10"
                    : "opacity-0 pointer-events-none absolute z-0"
                }`}
              >
                <a
                  href={repoData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-blue-500 hover:underline mb-2"
                >
                  {repoData.full_name}
                </a>
                <p className="text-gray-400 mb-2 text-base">
                  {repoData.description}
                </p>
                <div className="flex gap-4 text-sm text-gray-500 mb-2 flex-wrap">
                  <span>⭐ {repoData.stargazers_count} stars</span>
                  <span>🍴 {repoData.forks_count} forks</span>
                  <span>🐞 {repoData.open_issues_count} issues</span>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {repoData.owner && (
                    <>
                      <Image
                        src={repoData.owner.avatar_url}
                        alt={repoData.owner.login}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <a
                        href={repoData.owner.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:underline"
                      >
                        {repoData.owner.login}
                      </a>
                    </>
                  )}
                  {repoData.language && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded text-xs text-gray-700">
                      {repoData.language}
                    </span>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Scroll Buttons: Projects & Contact */}
      <div className="uppercase text-gray-400 md:text-3xl absolute bottom-4 md:bottom-16 left-1/5 md:left-24 flex items-center gap-4 duration-300">
        {/* Map over scroll actions for Projects and Contact */}
        {[
          { label: "Projects", action: scrollToProjects },
          { label: "Contact", action: scrollToContact },
        ].map(({ label, action }, idx) => (
          <div
            key={label}
            onClick={() => action(lenisRef)}
            className={`flex items-center gap-2 group hover:opacity-70 cursor-pointer transition-transform duration-500${
              idx === 1 ? " delay-300" : ""
            } ${
              hideButton
                ? idx === 0
                  ? "-translate-x-72"
                  : "-translate-x-144"
                : "translate-x-0"
            }`}
          >
            <p className="relative before:absolute before:w-0 group-hover:before:w-full before:h-[1px] before:bottom-0 before:bg-gray-400 before:duration-300">
              {label}
            </p>
            <ArrowDown className="animate-bounce" />
          </div>
        ))}
      </div>
    </section>
  );
}
