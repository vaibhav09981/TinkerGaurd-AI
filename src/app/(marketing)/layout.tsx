'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-muted rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-muted rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full bg-destructive/15 border-b border-destructive/30 py-2 px-4 text-center text-xs text-destructive font-medium flex items-center justify-center gap-2 z-50 glass">
        <span className="inline-flex h-2 w-2 rounded-full bg-destructive animate-pulse" />
        <span><strong>Live Market Alert:</strong> Brand displacement detected on BSE listed <strong>PARLEIND</strong>. Biscuit rumors driving +1,200% volume spikes.</span>
        <Link href="/dashboard" className="underline hover:text-foreground transition ml-1 flex items-center gap-0.5 font-bold">
          Intercept Trade <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border glass bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-muted border border-border group-hover:border-foreground/30 transition">
                <Shield className="w-5 h-5 text-foreground group-hover:scale-105 transition" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-foreground hover:opacity-90 transition">TickerGuard <span className="text-foreground">AI</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-medium">
              <Link href="/features" className="hover:text-foreground transition">Features</Link>
              <Link href="/investigations" className="hover:text-foreground transition flex items-center gap-1.5">
                Investigations
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-muted text-foreground border border-border">Active</span>
              </Link>
              <Link href="/blog" className="hover:text-foreground transition">Research Blog</Link>
              <Link href="/pricing" className="hover:text-foreground transition">Pricing</Link>
              <Link href="/about" className="hover:text-foreground transition">About</Link>
              <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link href="/dashboard" className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-all">
              Try Live Demo
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 flex flex-col gap-4 text-sm font-medium">
            <Link href="/features" className="text-muted-foreground hover:text-foreground transition py-1" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="/investigations" className="text-muted-foreground hover:text-foreground transition py-1" onClick={() => setMobileMenuOpen(false)}>Investigations</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition py-1" onClick={() => setMobileMenuOpen(false)}>Research Blog</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition py-1" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition py-1" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition py-1" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="h-px bg-border my-1" />
            <Link href="/dashboard" className="flex items-center justify-center w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs" onClick={() => setMobileMenuOpen(false)}>Try Live Demo</Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="w-full border-t border-border bg-background py-12 px-4 sm:px-6 lg:px-8 mt-auto z-10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-foreground" />
              <span className="font-semibold text-lg tracking-tight text-foreground">TickerGuard <span className="text-foreground">AI</span></span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">Systematic validation of ticker symbols, corporate brands, and social trading rumors to protect retail and institutional capital from high-frequency market confusion.</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase">Intelligence Toolset</h4>
            <Link href="/detector" className="text-xs text-muted-foreground hover:text-foreground transition">Identity Matcher</Link>
            <Link href="/news" className="text-xs text-muted-foreground hover:text-foreground transition">Social Media Monitor</Link>
            <Link href="/news" className="text-xs text-muted-foreground hover:text-foreground transition">News Sentiment Analysis</Link>
            <Link href="/alerts" className="text-xs text-muted-foreground hover:text-foreground transition">Market Anomalies</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase">Research Hub</h4>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition">Investigation Reports</Link>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition">Market Psychology</Link>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition">Case Studies</Link>
            <Link href="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition">Subscription Tiers</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">Disclaimer</h4>
            <p className="text-[10px] text-muted-foreground leading-normal max-w-[240px]">TickerGuard AI is a software provider and financial information service, not a registered investment advisor. Trading stocks involves high risk. Perform standard secondary validation before allocating actual capital.</p>
            <div className="text-[10px] text-muted-foreground mt-2">© {new Date().getFullYear()} TickerGuard AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}



