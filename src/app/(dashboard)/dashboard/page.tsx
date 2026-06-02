'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle, TrendingUp, FileText, Zap, ArrowUpRight,
  ArrowRight, Shield, Activity, Eye, Brain, CheckCircle,
  Clock, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { LineChart, Line } from 'recharts';

const MARKET_DATA = [
  { time: '9:30', PARLEIND: 42, social: 10, news: 5 },
  { time: '10:00', PARLEIND: 48, social: 18, news: 8 },
  { time: '10:30', PARLEIND: 55, social: 35, news: 20 },
  { time: '11:00', PARLEIND: 78, social: 82, news: 60 },
  { time: '11:30', PARLEIND: 95, social: 120, news: 88 },
  { time: '12:00', PARLEIND: 88, social: 145, news: 102 },
  { time: '12:30', PARLEIND: 76, social: 130, news: 95 },
  { time: '13:00', PARLEIND: 65, social: 110, news: 80 },
];

const CONFUSION_SCORE_HISTORY = [
  { day: 'Mon', score: 12 },
  { day: 'Tue', score: 28 },
  { day: 'Wed', score: 45 },
  { day: 'Thu', score: 68 },
  { day: 'Fri', score: 92 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 75 },
];

const RECENT_ALERTS = [
  { id: 1, severity: 'critical', title: 'PARLEIND — Identity confusion from PARLE-G viral trend', time: '5m ago' },
  { id: 2, severity: 'high', title: 'SIGL — Elon Musk Signal tweet amplified hype', time: '2h ago' },
  { id: 3, severity: 'medium', title: 'ZOOM OTC — Zoom Video launch drove name mismatch', time: '1d ago' },
  { id: 4, severity: 'low', title: 'RELI — False merger rumor with unrelated brand', time: '2d ago' },
];

const TOP_COMPANIES = [
  { symbol: 'PARLEIND', name: 'Parle Industries', score: 92, trend: '+1200%', risk: 'critical' },
  { symbol: 'SIGL', name: 'Signal Advance', score: 88, trend: '+340%', risk: 'high' },
  { symbol: 'ZOOM', name: 'Zoom Technologies', score: 64, trend: '+48%', risk: 'medium' },
  { symbol: 'HINDPETRO', name: 'Hindustan Petroleum', score: 28, trend: '+5%', risk: 'low' },
];

const sevColor: Record<string, string> = {
  critical: 'text-destructive',
  high: 'text-orange-400',
  medium: 'text-[#FFC857]',
  low: 'text-[#00E5A8]',
};
const sevBg: Record<string, string> = {
  critical: 'bg-destructive/10 border-destructive/20',
  high: 'bg-orange-400/10 border-orange-400/20',
  medium: 'bg-[#FFC857]/10 border-[#FFC857]/20',
  low: 'bg-[#00E5A8]/10 border-[#00E5A8]/20',
};
const sevDot: Record<string, string> = {
  critical: 'bg-destructive',
  high: 'bg-orange-400',
  medium: 'bg-[#FFC857]',
  low: 'bg-[#00E5A8]',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 text-xs shadow-2xl">
        <p className="text-muted-foreground font-semibold mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-bold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'stock' | 'confusion'>('stock');
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setChartLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeTab]);

  const statCards = [
    { label: 'Active Alerts', value: '3', sub: '2 critical', icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Confusion Score', value: '92', sub: 'PARLEIND today', icon: Brain, color: 'text-[#FFC857]' },
    { label: 'Companies Monitored', value: '18,400', sub: '+12 added today', icon: Eye, color: 'text-[#00E5A8]' },
    { label: 'Detection Rate', value: '94.7%', sub: '↑ 1.2% this week', icon: CheckCircle, color: 'text-muted-foreground' },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Market Intelligence Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Live overview of all confusion signals, alerts, and AI investigations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-muted text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Updated: Just now</span>
          </div>
          <Link href="/detector" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <Zap className="w-3.5 h-3.5" />
            Run Detector
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="h-24 p-4 rounded-2xl bg-card border border-border flex flex-col justify-between group transition hover:bg-muted">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-muted border border-border"><Icon className={`w-4 h-4 ${card.color}`} /></div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition" />
              </div>
              <div>
                <p className="text-xl font-black text-foreground tracking-tight leading-none">{card.value}</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">{card.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Main Chart Area ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="lg:col-span-2 flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-foreground">Market Movement vs. Social Hype</h2>
              <p className="text-xs text-muted-foreground mt-0.5">PARLEIND today — confusion-driven rally detection</p>
            </div>
            <div className="flex gap-2">
              {(['stock', 'confusion'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${activeTab === tab ? 'bg-primary/10 text-foreground border border-border' : 'text-muted-foreground hover:text-foreground border border-transparent'}`}>
                  {tab === 'stock' ? 'Price vs Hype' : 'Confusion Score'}
                </button>
              ))}
            </div>
          </div>

          <div className="h-56 w-full">
            {chartLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-end gap-2 h-32 w-full">
                    <div className="flex-1 bg-muted rounded animate-pulse" style={{ height: '40%' }} />
                    <div className="flex-1 bg-muted rounded animate-pulse" style={{ height: '60%' }} />
                    <div className="flex-1 bg-muted rounded animate-pulse" style={{ height: '80%' }} />
                    <div className="flex-1 bg-muted rounded animate-pulse" style={{ height: '50%' }} />
                    <div className="flex-1 bg-muted rounded animate-pulse" style={{ height: '70%' }} />
                    <div className="flex-1 bg-muted rounded animate-pulse" style={{ height: '45%' }} />
                  </div>
                  <div className="h-px bg-border w-full animate-pulse" />
                </div>
              </div>
            ) : activeTab === 'stock' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MARKET_DATA}>
                  <defs>
                    <linearGradient id="colorParle" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#71717A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#71717A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E5E5E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E5E5E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" />
                  <XAxis dataKey="time" stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 10, fill: 'currentColor' }} />
                  <YAxis stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 10, fill: 'currentColor' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="PARLEIND" name="Stock Price %" stroke="#71717A" strokeWidth={2} fill="url(#colorParle)" dot={false} />
                  <Area type="monotone" dataKey="social" name="Social Mentions" stroke="#E5E5E5" strokeWidth={2} fill="url(#colorSocial)" dot={false} strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CONFUSION_SCORE_HISTORY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" />
                  <XAxis dataKey="day" stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 10, fill: 'currentColor' }} />
                  <YAxis stroke="currentColor" className="text-muted-foreground" tick={{ fontSize: 10, fill: 'currentColor' }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" name="Confusion Score" fill="#00E5A8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex items-center gap-6 text-[10px] text-muted-foreground font-semibold">
            {activeTab === 'stock' ? (
              <>
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-muted-foreground" /> Stock Price Movement %</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-muted border border-dashed border-muted-foreground" /> Social Mention Volume</span>
              </>
            ) : (
              <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded bg-[#00E5A8]" /> Confusion Score (0–100)</span>
            )}
          </div>
        </motion.div>

        {/* Confusion score sidebar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Top Risk Stocks</h2>
            <Link href="/companies" className="text-[10px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 hover:gap-1.5 transition-all">All <ChevronRight className="w-3 h-3" /></Link>
          </div>

          <div className="flex flex-col gap-3">
            {TOP_COMPANIES.map((co, i) => (
              <motion.div key={co.symbol} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.07 }}>
                <Link href={`/companies`} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border hover:border-muted-foreground/20 group transition">
                  <div>
                    <p className="text-xs font-bold text-foreground font-mono">{co.symbol}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[80px]">{co.name}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-black ${sevColor[co.risk]}`}>{co.score}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">{co.trend}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link href="/detector" className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-xs text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition font-semibold">
            <Zap className="w-3.5 h-3.5" />
            Run New Confusion Check
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom Row ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Recent Alerts</h2>
            <Link href="/alerts" className="text-[10px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 hover:gap-1.5 transition-all">Alert Center <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="flex flex-col gap-3">
            {RECENT_ALERTS.map((alert, i) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.06 }} className={`flex items-start gap-3 p-3 rounded-xl border ${sevBg[alert.severity]} group`}>
                <span className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${sevDot[alert.severity]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-snug">{alert.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</p>
                </div>
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 ${sevColor[alert.severity]}`}>{alert.severity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border">
          <h2 className="text-sm font-bold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Activity, label: 'Check Identity', href: '/detector' },
              { icon: FileText, label: 'News Feed', href: '/news' },
              { icon: Brain, label: 'AI Chat', href: '/assistant' },
              { icon: Shield, label: 'Investigations', href: '/investigations' },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="flex flex-col gap-3 p-4 rounded-xl bg-muted border border-border hover:brightness-110 group transition">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <p className="text-xs font-semibold text-foreground leading-snug group-hover:text-foreground/80 transition-colors">{label}</p>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground self-end mt-auto" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FileSearch({ className }: { className?: string }) {
  return <Activity className={className} />;
}
