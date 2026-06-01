'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, ArrowRight, Activity } from 'lucide-react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Realtime Alert Banner */}
      <div className="w-full bg-[#FF5A5A]/10 border-b border-[#FF5A5A]/15 py-2 px-4 text-center text-xs text-[#FF5A5A] font-medium flex items-center justify-center gap-2 z-50">
        <span className="inline-flex h-2 w-2 rounded-full bg-[#FF5A5A] animate-ping" />
        <span><strong>Live Market Alert:</strong> Brand displacement detected on BSE listed <strong>PARLEIND</strong>. Biscuit rumors driving +1,200% volume spikes.</span>
        <Link href="/dashboard" className="underline hover:text-white transition ml-1 flex items-center gap-0.5">
          Intercept Trade <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#1A1A1A] bg-[#0A0A0A]/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-green/30 transition">
                <Shield className="w-5 h-5 text-brand-green group-hover:scale-105 transition" />
              </div>
              <span className="font-semibold text-lg tracking-tight hover:opacity-90 transition">
                TickerGuard <span className="text-brand-green">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation Link Menu */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300 font-medium">
              <Link href="/features" className="hover:text-white transition">Features</Link>
              <Link href="/dashboard/investigations" className="hover:text-white transition flex items-center gap-1.5">
                Investigations 
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-zinc-800 text-brand-yellow border border-brand-yellow/20">Active</span>
              </Link>
              <Link href="/blog" className="hover:text-white transition">Research Blog</Link>
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Actions */}
            <Link 
              href="/dashboard" 
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition"
            >
              <Activity className="w-3.5 h-3.5 text-brand-green" />
              Live Feed
            </Link>
            <Link 
              href="/dashboard" 
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-green text-black hover:bg-brand-green/90 transition shadow-[0_0_15px_rgba(0,229,168,0.2)]"
            >
              Try Live Demo
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-white/5 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#1A1A1A] bg-[#0A0A0A] px-4 pt-2 pb-6 flex flex-col gap-4 text-sm font-medium">
            <Link href="/features" className="text-zinc-300 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="/dashboard/investigations" className="text-zinc-300 hover:text-white transition py-1 flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
              <span>Investigations</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-brand-yellow">Active</span>
            </Link>
            <Link href="/blog" className="text-zinc-300 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>Research Blog</Link>
            <Link href="/pricing" className="text-zinc-300 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/about" className="text-zinc-300 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="text-zinc-300 hover:text-white transition py-1" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="h-px bg-zinc-800/80 my-1" />
            <Link 
              href="/dashboard" 
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-zinc-800 text-zinc-200 font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Activity className="w-3.5 h-3.5 text-brand-green" />
              Live Dashboard
            </Link>
            <Link 
              href="/dashboard" 
              className="flex items-center justify-center w-full py-2.5 rounded-lg bg-brand-green text-black font-semibold text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try Live Demo
            </Link>
          </div>
        )}
      </header>

      {/* Main Page Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Marketing Footer */}
      <footer className="w-full border-t border-[#1A1A1A] bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 mt-auto z-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Pitch */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-green" />
              <span className="font-semibold text-lg tracking-tight">TickerGuard <span className="text-brand-green">AI</span></span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              Systematic validation of ticker symbols, corporate brands, and social trading rumors to protect retail and institutional capital from high-frequency market confusion.
            </p>
          </div>

          {/* Links 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Intelligence Toolset</h4>
            <Link href="/dashboard/detector" className="text-xs text-zinc-400 hover:text-white transition">Identity Matcher</Link>
            <Link href="/dashboard/news" className="text-xs text-zinc-400 hover:text-white transition">Social Media Monitor</Link>
            <Link href="/dashboard/news" className="text-xs text-zinc-400 hover:text-white transition">News Sentiment Analysis</Link>
            <Link href="/dashboard/alerts" className="text-xs text-zinc-400 hover:text-white transition">Market Anomalies</Link>
          </div>

          {/* Links 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Research Hub</h4>
            <Link href="/blog" className="text-xs text-zinc-400 hover:text-white transition">Investigation Reports</Link>
            <Link href="/blog" className="text-xs text-zinc-400 hover:text-white transition">Market Psychology</Link>
            <Link href="/blog" className="text-xs text-zinc-400 hover:text-white transition">Case Studies</Link>
            <Link href="/pricing" className="text-xs text-zinc-400 hover:text-white transition">Subscription Tiers</Link>
          </div>

          {/* Safety Warning */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">Disclaimer</h4>
            <p className="text-[10px] text-zinc-600 leading-normal">
              TickerGuard AI is a software provider and financial information service, not a registered investment advisor. Trading stocks involves high risk. Perform standard secondary validation before allocating actual capital.
            </p>
            <div className="text-[10px] text-zinc-600 mt-2">
              © {new Date().getFullYear()} TickerGuard AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
