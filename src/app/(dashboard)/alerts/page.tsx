'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Filter, Clock, Shield } from 'lucide-react';

const ALERTS = [
  { id: '1', severity: 'critical', type: 'confusion', title: 'Critical Identity Confusion: PARLEIND', message: 'Retail volumes on BSE listed PARLEIND have spiked +1,200% following a viral tweet about Parle-G biscuits. Parle Products (the biscuit maker) is entirely unlisted.', symbol: 'PARLEIND', createdAt: '5 min ago', isResolved: false },
  { id: '2', severity: 'high', type: 'social_hype', title: 'Social Hype Spike: SIGL (Signal Advance)', message: "r/wallstreetbets discussions exploded +450% citing 'Use Signal'. Signal Advance (SIGL) is a medical device company — unrelated to Signal Messenger.", symbol: 'SIGL', createdAt: '2h ago', isResolved: false },
  { id: '3', severity: 'medium', type: 'abnormal_movement', title: 'Volatility Divergence: ZOOM OTC', message: 'ZOOM (Zoom Technologies OTC) rose +48% with no company news. Correlated to ZM (Zoom Video) product announcement.', symbol: 'ZOOM', createdAt: '1d ago', isResolved: false },
  { id: '4', severity: 'low', type: 'news_spike', title: 'News Mention Spike: HINDPETRO', message: 'Elevated news mentions following budget petroleum subsidy discussion. No confusion event detected. Normal trading.', symbol: 'HINDPETRO', createdAt: '2d ago', isResolved: true },
];

const sevStyles: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  critical: { text: 'text-[#FF5A5A]', bg: 'bg-[#FF5A5A]/8', border: 'border-[#FF5A5A]/20', dot: 'bg-[#FF5A5A]' },
  high:     { text: 'text-orange-400', bg: 'bg-orange-400/8', border: 'border-orange-400/20', dot: 'bg-orange-400' },
  medium:   { text: 'text-[#FFC857]', bg: 'bg-[#FFC857]/8', border: 'border-[#FFC857]/20', dot: 'bg-[#FFC857]' },
  low:      { text: 'text-[#00E5A8]', bg: 'bg-[#00E5A8]/8', border: 'border-[#00E5A8]/20', dot: 'bg-[#00E5A8]' },
};

const typeLabel: Record<string, string> = {
  confusion: 'Confusion',
  social_hype: 'Social Hype',
  abnormal_movement: 'Price Anomaly',
  news_spike: 'News Spike',
};

type SevFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';

export default function AlertsPage() {
  const [filter, setFilter] = useState<SevFilter>('all');
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const filtered = ALERTS.filter(a => filter === 'all' || a.severity === filter);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alert Center</h1>
          <p className="mt-1 text-sm text-zinc-500">All triggered confusion, hype, and anomaly alerts sorted by severity.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FF5A5A]/10 border border-[#FF5A5A]/20 text-xs font-bold text-[#FF5A5A]">
          <span className="h-2 w-2 rounded-full bg-[#FF5A5A] animate-ping" />
          {ALERTS.filter(a => !a.isResolved && !resolved.has(a.id)).length} Active
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'critical', 'high', 'medium', 'low'] as SevFilter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${filter === f ? 'bg-white/10 text-white border border-white/15' : 'bg-[#111111] text-zinc-400 border border-[#1A1A1A] hover:text-white'}`}>
            {f === 'all' ? 'All Alerts' : f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((alert, i) => {
          const s = sevStyles[alert.severity];
          const isResolved_ = alert.isResolved || resolved.has(alert.id);
          return (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`relative flex gap-4 p-5 rounded-2xl border transition ${isResolved_ ? 'bg-[#0A0A0A] border-[#1A1A1A] opacity-50' : `${s.bg} ${s.border} bg-[#111111]`}`}>
              <div className={`mt-0.5 h-2.5 w-2.5 rounded-full shrink-0 ${s.dot} ${!isResolved_ ? 'animate-pulse' : ''}`} />
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.text}`}>{alert.severity} · {typeLabel[alert.type]}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{alert.title}</h3>
                  </div>
                  <span className={`shrink-0 text-[10px] font-mono font-black px-2 py-0.5 rounded-lg ${s.bg} ${s.border} ${s.text} border`}>{alert.symbol}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{alert.message}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-medium"><Clock className="w-3 h-3" />{alert.createdAt}</span>
                  {!isResolved_ ? (
                    <button onClick={() => setResolved(prev => new Set([...prev, alert.id]))}
                      className="flex items-center gap-1 text-[10px] font-bold text-[#00E5A8] hover:underline">
                      <CheckCircle className="w-3.5 h-3.5" /> Mark Resolved
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-600"><CheckCircle className="w-3.5 h-3.5" /> Resolved</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
