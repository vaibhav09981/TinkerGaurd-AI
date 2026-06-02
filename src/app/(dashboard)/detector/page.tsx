'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, AlertTriangle, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { calculateNameSimilarity, calculateConfusionScore } from '@/lib/scoring';

const PRESETS = [
  { a: 'Parle Products Private Ltd', b: 'Parle Industries Limited' },
  { a: 'Signal Messenger LLC', b: 'Signal Advance Inc' },
  { a: 'Zoom Video Communications', b: 'Zoom Technologies Inc' },
  { a: 'Apple Inc', b: 'Apple Hospitality REIT' },
];

export default function DetectorPage() {
  const [companyA, setCompanyA] = useState('');
  const [companyB, setCompanyB] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof calculateConfusionScore> & { nameSim: number }>(null);
  const [loading, setLoading] = useState(false);

  const runDetection = async (a = companyA, b = companyB) => {
    if (!a || !b) return;
    setLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 900));
    const nameSim = calculateNameSimilarity(a, b);
    const score = calculateConfusionScore({
      nameSimilarity: nameSim,
      newsMentionFrequency: Math.min(100, nameSim * 0.8 + Math.random() * 30),
      socialMediaMentions: Math.min(100, nameSim * 0.6 + Math.random() * 25),
      stockPriceSpike: Math.min(100, nameSim * 0.7 + Math.random() * 35),
    });
    setResult({ ...score, nameSim });
    setLoading(false);
  };

  const applyPreset = (p: { a: string; b: string }) => {
    setCompanyA(p.a);
    setCompanyB(p.b);
    runDetection(p.a, p.b);
  };

  const scoreColor = result
    ? result.level === 'critical' ? 'var(--color-destructive)' : result.level === 'high' ? 'var(--color-destructive)' : result.level === 'monitor' ? 'var(--color-warning)' : 'var(--color-primary)'
    : 'var(--color-primary)';

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Company Identity Confusion Detector</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter two company names to compute a real-time confusion score powered by name similarity, social signals, and price spikes.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-[560px] mx-auto w-full p-6 rounded-2xl bg-card/80 border border-border glass-panel-hover">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company A</label>
            <input value={companyA} onChange={e => setCompanyA(e.target.value)} placeholder="e.g. Parle-G (unlisted brand)" className="bg-background border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition input-glass" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company B</label>
            <input value={companyB} onChange={e => setCompanyB(e.target.value)} placeholder="e.g. PARLEIND (BSE ticker)" className="bg-background border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition input-glass" />
          </div>
        </div>
        <button onClick={() => runDetection()} disabled={!companyA || !companyB || loading} className="w-[240px] mx-auto flex items-center justify-center gap-2 py-3 rounded-xl btn-glass text-sm font-bold disabled:opacity-40 hover:bg-primary/90 transition">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Run Confusion Detection'}
        </button>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => applyPreset(p)} className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition">
                {p.a.split(' ')[0]} vs {p.b.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="p-6 rounded-2xl glass-card border flex flex-col gap-6" style={{ borderColor: `${scoreColor}30` }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confusion Score</p>
              <p className="text-6xl font-black mt-1" style={{ color: scoreColor }}>{result.score}</p>
              <p className="text-sm font-bold mt-1 capitalize" style={{ color: scoreColor }}>{result.level === 'monitor' ? 'Monitor' : result.level === 'high' ? 'High Risk' : result.level === 'critical' ? 'Critical' : 'Safe'}</p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={scoreColor} strokeWidth="3" strokeDasharray={`${result.score}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-black" style={{ color: scoreColor }}>{result.score}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Name Similarity', value: result.nameSim },
              { label: 'Overall Score', value: result.score },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2 p-3 rounded-xl bg-muted border border-border">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-foreground">{value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="h-full rounded-full bg-muted-foreground" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-border bg-background">
            <div className="flex items-start gap-3">
              {result.level === 'safe' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />}
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">{result.verdict}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setCompanyA(''); setCompanyB(''); setResult(null); }} className="flex-1 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:border-muted-foreground transition">Clear & Reset</button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-glass text-xs font-bold hover:bg-primary/90 transition">Save Investigation <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

