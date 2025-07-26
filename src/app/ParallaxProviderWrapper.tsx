"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ParallaxProviderWrapper({ children }: Props) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
