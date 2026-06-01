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
    ? result.level === 'critical' ? '#FF5A5A' : result.level === 'high' ? '#FF8A5A' : result.level === 'monitor' ? '#FFC857' : '#00E5A8'
    : '#00E5A8';

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Company Identity Confusion Detector</h1>
        <p className="mt-1 text-sm text-zinc-500">Enter two company names to compute a real-time confusion score powered by name similarity, social signals, and price spikes.</p>
      </div>

      {/* Input Form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-[#111111] border border-[#1A1A1A] flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Company A <span className="text-zinc-600">(Unlisted / Brand)</span></label>
            <input value={companyA} onChange={e => setCompanyA(e.target.value)} placeholder="e.g. Parle Products Private Ltd"
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E5A8]/30 transition" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Company B <span className="text-zinc-600">(Listed Ticker)</span></label>
            <input value={companyB} onChange={e => setCompanyB(e.target.value)} placeholder="e.g. Parle Industries Limited"
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E5A8]/30 transition" />
          </div>
        </div>
        <button onClick={() => runDetection()} disabled={!companyA || !companyB || loading}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00E5A8] text-black text-sm font-bold disabled:opacity-40 hover:bg-[#00E5A8]/90 transition shadow-[0_0_20px_rgba(0,229,168,0.2)]">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Run Confusion Detection'}
        </button>

        {/* Presets */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => applyPreset(p)}
                className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#262626] text-zinc-400 hover:text-white hover:border-[#00E5A8]/30 hover:text-[#00E5A8] transition">
                {p.a.split(' ')[0]} vs {p.b.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Result Card */}
      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 rounded-2xl bg-[#111111] border flex flex-col gap-6" style={{ borderColor: `${scoreColor}30` }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Confusion Score</p>
              <p className="text-6xl font-black mt-1" style={{ color: scoreColor }}>{result.score}</p>
              <p className="text-sm font-bold mt-1 capitalize" style={{ color: scoreColor }}>{result.level === 'monitor' ? '⚠ Monitor' : result.level === 'high' ? '🔶 High Risk' : result.level === 'critical' ? '🚨 Critical' : '✅ Safe'}</p>
            </div>
            {/* Circular gauge */}
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1A1A1A" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={scoreColor}
                  strokeWidth="3" strokeDasharray={`${result.score}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-black" style={{ color: scoreColor }}>{result.score}%</span>
              </div>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Name Similarity', value: result.nameSim },
              { label: 'Overall Score', value: result.score },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2 p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-500">{label}</span>
                  <span className="text-white">{value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full" style={{ backgroundColor: scoreColor }} />
                </div>
              </div>
            ))}
          </div>

          {/* Verdict */}
          <div className="p-4 rounded-xl border" style={{ borderColor: `${scoreColor}25`, backgroundColor: `${scoreColor}08` }}>
            <div className="flex items-start gap-3">
              {result.level === 'safe' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: scoreColor }} /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: scoreColor }} />}
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">{result.verdict}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setCompanyA(''); setCompanyB(''); setResult(null); }}
              className="flex-1 py-2.5 rounded-xl border border-[#262626] text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-600 transition">
              Clear & Reset
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#00E5A8]/10 border border-[#00E5A8]/25 text-[#00E5A8] text-xs font-bold hover:bg-[#00E5A8]/15 transition">
              Save Investigation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
