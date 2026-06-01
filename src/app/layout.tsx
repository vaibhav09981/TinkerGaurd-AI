import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TickerGuard AI — Detect Market Confusion & Brand Mismatches",
  description: "Advanced AI-powered financial intelligence. Detect stock market misinformation, listed vs unlisted confusion, ticker-symbol mistakes, and social sentiment pumps in real-time.",
  keywords: ["financial intelligence", "stock market", "brand confusion", "ticker matching", "speculative alerts", "retail trading protection"],
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className={`${inter.className} min-h-full bg-[#0A0A0A] text-white flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
