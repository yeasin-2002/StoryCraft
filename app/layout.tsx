import { Nav } from "@/components/global/Nav";
import { ProviderWrapper } from "@/components/global/ProviderWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Story Craft",
  description: "A simple blog built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="transition-all">
      <body className={inter.className}>
        <ProviderWrapper>
          <Nav />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
