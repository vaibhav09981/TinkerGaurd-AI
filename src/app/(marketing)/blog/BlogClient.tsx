'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
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

export default function BlogClient({ posts, categories }: BlogClientProps) {
  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                false
                  ? 'bg-[#00E5A8]/10 text-[#00E5A8] border border-[#00E5A8]/25'
                  : 'bg-[#111111] text-zinc-400 border border-[#1A1A1A] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          {posts.length} articles
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 p-5 h-full rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#262626] transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  {post.category}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${severityStyles[post.riskRating]}`}>
                  {post.riskRating}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#00E5A8] transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{post.summary}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-medium">
                  <Star className="w-3 h-3 text-[#FFC857]" />
                  <span>{post.readingTime} min read</span>
                  <span>·</span>
                  <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#00E5A8] group-hover:gap-2 transition-all">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-20 text-center text-zinc-500 text-sm font-medium">
          No articles found. Check back soon for new investigations.
        </div>
      )}
    </div>
  );
}
