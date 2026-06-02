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
  critical: 'text-destructive bg-destructive/10 border-destructive/20',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  medium: 'text-[#FFC857] bg-[#FFC857]/10 border-[#FFC857]/20',
  low: 'text-[#00E5A8] bg-[#00E5A8]/10 border-[#00E5A8]/20',
};

const FILTER_ORDER = ['Market Confusion Cases', 'Misinformation Analysis', 'Stock Analysis', 'Investor Education', 'Corporate Profiles', 'Market Psychology'];

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  const displayCategories = FILTER_ORDER.filter((c) => categories.includes(c));

  return (
    <div className="flex flex-col gap-8 max-w-[720px] mx-auto">
      <section className="relative flex flex-col gap-4 pb-10 border-b border-border">
        <div className="relative w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
          <Star className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Research <span className="text-muted-foreground">Hub</span></h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">AI-generated investigations and educational content on market confusion, brand identity risks, and investor protection strategies.</p>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setActiveCat(null)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${activeCat === null ? 'bg-foreground text-background' : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-muted-foreground/30'}`}>All</button>
          {displayCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(activeCat === cat ? null : cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${activeCat === cat ? 'bg-foreground text-background' : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-muted-foreground/30'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')} className="bg-transparent text-xs font-semibold text-foreground outline-none cursor-pointer">
              <option value="latest" className="bg-card">Latest</option>
              <option value="popular" className="bg-card">Most Read</option>
            </select>
          </div>
          <span className={`flex items-center gap-1.5 text-xs font-semibold ${sortBy === 'popular' ? 'text-foreground' : 'text-muted-foreground'}`}>Sorted by {sortBy === 'popular' ? 'Most Read' : 'Latest'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {sortedPosts.map((post, i) => (
          <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-0 h-full rounded-2xl bg-card border border-border hover:border-muted-foreground/20 transition-all">
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{post.category}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${severityStyles[post.riskRating]}`}>{post.riskRating}</span>
              </div>
              <div className="flex flex-col gap-3 px-5 pb-4 flex-1">
                <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-foreground/80 transition-colors">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>
              </div>
              <div className="flex items-center justify-between px-5 py-3 border-t border-border group-hover:border-muted-foreground/20 transition-colors">
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" />{post.readingTime} min read</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="text-[11px] font-bold text-foreground group-hover:gap-2 transition-all inline-flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-sm font-semibold text-foreground">More investigations coming soon</p>
            <p className="text-xs text-muted-foreground">New reports are generated weekly.</p>
          </div>
          <button onClick={() => { setActiveCat(null); }} className="text-xs font-bold text-foreground hover:underline mt-4">Clear filters</button>
        </div>
      )}
    </div>
  );
}
