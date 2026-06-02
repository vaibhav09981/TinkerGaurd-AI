'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, AlertTriangle, Zap, ExternalLink, Clock } from 'lucide-react';

const NEWS = [
  {
    id: '1', title: 'Melody Candy Goes Viral After Parle Products Announces Billion-Dollar Innovation',
    source: 'Financial Times India', sentiment: 0.85, riskScore: 88, publishedAt: '5 min ago',
    symbols: ['PARLEPROD', 'PARLEIND'], isConfusionEvent: true, isViral: true,
    content: 'Shares of Parle Industries Ltd surged 20% after viral tweets about Parle-G biscuits. Analysts warn these are separate entities.',
  },
  {
    id: '2', title: 'Elon Musk Tweets "Use Signal" — What Happened to Signal Advance Stock?',
    source: 'TechPulse Media', sentiment: 0.12, riskScore: 92, publishedAt: '2h ago',
    symbols: ['SIGNALAPP', 'SIGL'], isConfusionEvent: true, isViral: true,
    content: 'An 11,000% OTC ticker pump followed a simple two-word endorsement tweet, revealing deep flaws in retail trading practices.',
  },
  {
    id: '3', title: 'SEC Halts Trading on ZOOM OTC Stock Over Identity Confusion Concerns',
    source: 'SEC Intelligence', sentiment: -0.45, riskScore: 70, publishedAt: '1d ago',
    symbols: ['ZM', 'ZOOM'], isConfusionEvent: false, isViral: false,
    content: 'Regulatory action taken after persistent retail investors mistakenly purchased Zoom Technologies instead of Zoom Video.',
  },
  {
    id: '4', title: 'Hindustan Petroleum Reports Q4 Beat, Stock Rises 4.2%',
    source: 'Moneycontrol', sentiment: 0.6, riskScore: 15, publishedAt: '3h ago',
    symbols: ['HINDPETRO'], isConfusionEvent: false, isViral: false,
    content: 'Solid quarterly earnings driven by refinery margin expansion. No identity confusion risks detected.',
  },
  {
    id: '5', title: 'GameStop Forum Buzz Spills Into Unrelated Gaming Equipment Maker',
    source: 'Reddit Finance Desk', sentiment: 0.3, riskScore: 78, publishedAt: '6h ago',
    symbols: ['GME'], isConfusionEvent: true, isViral: true,
    content: 'Viral meme stock resurgence drives speculative capital into a completely separate OTC gaming peripheral manufacturer.',
  },
];

const sentimentLabel = (s: number) => s > 0.5 ? { label: 'Positive', color: 'text-[#00E5A8]' } : s < 0 ? { label: 'Negative', color: 'text-[#FF5A5A]' } : { label: 'Neutral', color: 'text-[#FFC857]' };
const riskColor = (r: number) => r >= 80 ? 'text-destructive bg-destructive/10 border-destructive/20' : r >= 60 ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' : r >= 40 ? 'text-[#FFC857] bg-[#FFC857]/10 border-[#FFC857]/20' : 'text-[#00E5A8] bg-[#00E5A8]/10 border-[#00E5A8]/20';
const riskLabel = (r: number) => r >= 80 ? 'Critical' : r >= 60 ? 'High' : r >= 40 ? 'Medium' : 'Low';

type FilterType = 'all' | 'confusion' | 'misinformation' | 'high-risk';

export default function NewsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQ, setSearchQ] = useState('');

  const filtered = NEWS.filter(n => {
    const matchesSearch = !searchQ || n.title.toLowerCase().includes(searchQ.toLowerCase()) || n.symbols.some(s => s.toLowerCase().includes(searchQ.toLowerCase()));
    if (!matchesSearch) return false;
    if (filter === 'confusion') return n.isConfusionEvent;
    if (filter === 'misinformation') return n.isViral;
    if (filter === 'high-risk') return n.riskScore >= 70;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">News Intelligence Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">Real-time financial news with AI-scored risk levels, sentiment, and confusion tags.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search news or ticker symbols..." className="w-full bg-card border border-input rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {([['all', 'All'], ['confusion', 'Confusion Event'], ['misinformation', 'Misinformation Analysis'], ['high-risk', 'High Risk']] as [FilterType, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition ${filter === key ? 'bg-foreground text-background' : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:border-muted-foreground/30'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((article, i) => {
          const sent = sentimentLabel(article.sentiment);
          return (
            <motion.article key={article.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }} className="flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border hover:border-muted-foreground/20 group transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {article.isConfusionEvent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 uppercase tracking-wider">Confusion Event</span>}
                    {article.isViral && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/20 uppercase tracking-wider">Viral</span>}
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-foreground/80 transition-colors">{article.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.content}</p>
                </div>
                <div className={`shrink-0 text-[10px] font-black px-2.5 py-1 rounded-xl border ${riskColor(article.riskScore)}`}>{riskLabel(article.riskScore)} {article.riskScore}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{article.source}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.publishedAt}</span>
                  <span className={`font-bold ${sent.color}`}>{sent.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {article.symbols.map(s => <span key={s} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">{s}</span>)}
                </div>
              </div>
            </motion.article>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground text-sm font-medium">No articles match your current filter.</div>
        )}
      </div>
    </div>
  );
}
