"use client";

import data from "@/data/portfolioData.json";
import { Mail, FileText, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white text-black px-12 md:px-16 pt-10 md:pt-16 text-sm relative"
    >
      <h1 className="w-full text-3xl md:text-4xl font-bold uppercase mb-4 text-center md:text-start">
        Contact
      </h1>
      <div className="w-full border-y-2 border-gray-200 md:min-h-[20vh] flex py-4 md:p-0">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:px-12">
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-1 md:gap-2 text-xs md:text-sm ">
            <a
              href={`mailto:${data.email}`}
              className="flex gap-1 items-center hover:underline text-blue-700"
            >
              <Mail className="w-4 h-4 text-black" />
              e-Mail
            </a>
            <a
              href={data.socials.linkedin}
              target="_blank"
              className="flex gap-1 items-center hover:underline text-blue-700"
            >
              <Linkedin className="w-4 h-4 text-black mb-[3px]" />
              linkedIn
            </a>
            <a
              href={data.socials.github}
              target="_blank"
              className="flex gap-1 items-center hover:underline text-blue-700"
            >
              <Github className="w-4 h-4 text-black mb-[2px]" />
              GitHub
            </a>
          </div>

          {/* Resume View Button */}
          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 text-nowrap px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm bg-gray-300 text-black hover:text-white hover:bg-blue-700 shadow-[0_0_4px_rgba(0,0,0,0.7)] rounded-full transition-all duration-300 active:scale-95"
          >
            <FileText className="w-5 h-5" />
            View Resume
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-between w-full p-6 text-center md:text-left text-xs md:text-sm">
        © {new Date().getFullYear()}. All rights reserved.
        <div className="py-2 text-center text-xs md:text-sm text-gray-500">
          Made with ❤️ by Sankalp Srivastava
          <span className="hidden md:inline">
            . Connect with me on social media!
          </span>
        </div>
      </div>
    </footer>
  );
}
