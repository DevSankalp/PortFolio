import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ParallaxProviderWrapper from "./ParallaxProviderWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Sankalp Srivastava | Portfolio",
  description: "My personal portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="text-white antialiased scroll-smooth bg-transparent">
        <ParallaxProviderWrapper>{children}</ParallaxProviderWrapper>
      </body>
    </html>
  );
}
