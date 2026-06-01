'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  riskRating: string;
  readingTime: number;
  publishDate: string;
  viewsCount: number;
}

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
}

const severityStyles: Record<string, string> = {
  critical: 'text-[#FF5A5A] bg-[#FF5A5A]/10 border border-[#FF5A5A]/25',
  high: 'text-orange-400 bg-orange-400/10 border border-orange-400/25',
  medium: 'text-[#FFC857] bg-[#FFC857]/10 border border-[#FFC857]/25',
  low: 'text-[#00E5A8] bg-[#00E5A8]/10 border border-[#00E5A8]/25',
};

const FILTER_ORDER = ['Market Confusion Cases', 'Fake News Detection', 'Stock Analysis', 'Investor Education', 'Corporate Profiles', 'Market Psychology'];

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  const displayCategories = FILTER_ORDER.filter((c) => categories.includes(c));

  return (
    <div className="flex flex-col gap-8">
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col gap-4 pb-10 border-b border-[#1A1A1A]">
        <div className="relative w-10 h-10 rounded-xl bg-[#FFC857]/10 border border-[#FFC857]/20 flex items-center justify-center">
          <Star className="w-5 h-5 text-[#FFC857]" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Research <span className="text-[#FFC857]">Hub</span>
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
            AI-generated investigations and educational content on market confusion, brand identity risks, and investor protection strategies.
          </p>
        </div>
      </section>

      {/* ── Toolbar ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCat(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeCat === null
                ? 'bg-white text-black'
                : 'bg-[#111111] text-zinc-400 border border-[#1A1A1A] hover:text-white hover:border-[#262626]'
            }`}
          >
            All
          </button>
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(activeCat === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeCat === cat
                  ? 'bg-[#00E5A8] text-black'
                  : 'bg-[#111111] text-zinc-400 border border-[#1A1A1A] hover:text-white hover:border-[#262626]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#1A1A1A]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
              className="bg-transparent text-xs font-semibold text-zinc-300 outline-none cursor-pointer"
            >
              <option value="latest" className="bg-[#111111]">Latest</option>
              <option value="popular" className="bg-[#111111]">Most Read</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            {posts.length} articles
          </div>
        </div>
      </div>

      {/* ── Card Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-0 h-full rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#262626] transition-all"
            >
              {/* Card Top: Category + Risk */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  {post.category}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${severityStyles[post.riskRating]}`}>
                  {post.riskRating}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-col gap-3 px-5 pb-4 flex-1">
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#FFC857] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              {/* Card Footer: Meta + Link */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-[#1A1A1A] group-hover:border-[#262626] transition-colors">
                <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#FFC857]" />
                    {post.readingTime} min read
                  </span>
                  <span className="text-zinc-700">·</span>
                  <span>
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#FFC857] group-hover:gap-2 transition-all inline-flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-center">
            <Star className="w-6 h-6 text-zinc-700" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-sm font-semibold text-white">No articles found</p>
            <p className="text-xs text-zinc-500">Check back soon for new investigations.</p>
          </div>
          <button
            onClick={() => setActiveCat(null)}
            className="text-xs font-bold text-[#FFC857] hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
