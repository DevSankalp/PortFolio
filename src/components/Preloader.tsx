"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

/**
 * Preloader component with fade-out animation.
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether the preloader should be visible.
 */
export default function Preloader({
  isLoading = true,
}: {
  isLoading?: boolean;
}) {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFade(true);
      const timeout = setTimeout(() => setShow(false), 400); // match transition duration
      return () => clearTimeout(timeout);
    } else {
      setShow(true);
      setFade(false);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-400 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Lottie loading animation */}
        <div className="w-100 md:w-150 h-100 md:h-150 mb-4">
          <DotLottieReact
            src="https://lottie.host/bd1c5ed7-2b4a-4b2a-b139-e660bd8e7863/PQinRptImL.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
