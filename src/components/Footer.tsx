"use client";

import data from "@/data/portfolioData.json";
import { Mail, Phone } from "lucide-react";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white text-black p-12 md:p-16 text-sm relative"
    >
      <h1 className="w-full text-2xl md:text-4xl font-bold uppercase mb-4 text-center md:text-start">
        Contact
      </h1>
      <div className="w-full border-t-2 md:border-y-2 border-gray-300 md:h-[20vh] flex pt-4 md:p-0">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-1 md:gap-2 text-xs md:text-sm ">
            <p className="flex items-center gap-2">
              <a
                href={`mailto:${data.email}`}
                className="flex gap-1 items-center hover:underline hover:text-gray-300 duration-300"
              >
                <Mail className="w-4 h-4" />
                {data.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {data.phone}
            </p>
          </div>

          {/* Copyright */}
          <div className="w-full pb-4 md:p-0 text-center text-base-content/60 border-b-2 md:border-0 border-gray-300 text-xs md:text-sm">
            © {new Date().getFullYear()}. All rights reserved.
          </div>

          {/* Resume Download Button */}
          <a
            href={data.resumeUrl}
            download
            className="flex items-center text-nowrap px-6 py-3 text-xs md:text-sm bg-gray-300 text-black hover:text-white hover:bg-blue-700 shadow-[0_0_4px_rgba(0,0,0,0.2)] rounded-md transition-all duration-300 active:scale-95"
          >
            <FileText className="w-5 h-5 mr-2" />
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
