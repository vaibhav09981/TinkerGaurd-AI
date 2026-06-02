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
  },
  openGraph: {
    title: "TickerGuard AI — Detect Market Confusion & Brand Mismatches",
    description: "Advanced AI-powered financial intelligence. Detect stock market misinformation, listed vs unlisted confusion, ticker-symbol mistakes, and social sentiment pumps in real-time.",
    url: "https://tickerguard.ai",
    siteName: "TickerGuard AI",
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full bg-background text-foreground flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
