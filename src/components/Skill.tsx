"use client";
import data from "@/data/portfolioData.json";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function FooterSection() {
  return (
    <div
      id="skills"
      className="pt-12 pb-32 w-full text-center border-t-primary border-t-1"
    >
      <h2 className="text-4xl font-semibold mb-8 text-primary">Skills</h2>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {Object.entries(data.skills).map(([key, label], i) => (
          <span
            key={i}
            className="group relative text-lg border border-primary flex items-center rounded-full p-3 overflow-hidden"
          >
            <div
              className="bg-contain bg-center bg-no-repeat w-8 h-8 p-1"
              style={{
                backgroundImage: `url(/ico/${key}_ico.png)`,
              }}
            ></div>
            <span
              className={`inline-block whitespace-nowrap pl-0 group-hover:pl-2 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[8rem] transition-all duration-300 ease-in-out`}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
