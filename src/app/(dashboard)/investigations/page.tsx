'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, FileText, TrendingUp } from 'lucide-react';

const INVESTIGATIONS = [
  { id: 'inv_001', title: 'Investigation #TG-2026-PARLE: Biscuit Fame Mismatch', summary: 'Full investigation into how viral confectionery rumors drove BSE listed Parle Industries (PARLEIND) to consecutive upper circuit rallies.', rootCause: 'Viral tweets about Melody chocolates led retail buyers to search "Parle" on brokers and purchase the wrong listed company.', affectedCompanies: 'PARLEPROD, PARLEIND', createdAt: 'Jun 1, 2026', marketImpact: '+20% for 3 consecutive sessions at 45× average volume', investorWarning: 'PARLEIND has ZERO connection to biscuits, Melody, or Parle-G.', severity: 'critical' },
  { id: 'inv_002', title: 'Investigation #TG-2026-SIGNAL: Elon Musk Social Amplification', summary: 'Comprehensive audit of the 11,000% ticker mismatch between private Signal Messenger LLC and medical device maker Signal Advance (SIGL).', rootCause: 'Billionaire social media recommendation of "Signal" triggered algorithms to bulk-buy OTC ticker SIGL due to word match.', affectedCompanies: 'SIGNALAPP, SIGL', createdAt: 'May 31, 2026', marketImpact: 'Market cap inflated by $2.9B in days, followed by -94% crash', investorWarning: 'Never buy OTC tickers on social word-association without verifying the SEC-CIK identifier.', severity: 'high' },
  { id: 'inv_003', title: 'Investigation #TG-2026-ZOOM: OTC Shell Name Disaster', summary: 'Sustained retail confusion between ZM (Zoom Video) and ZOOM (Zoom Technologies OTC) led to repeated SEC trading halts.', rootCause: 'Both companies share the word Zoom in their name, making broker keyword searches mislead retail investors.', affectedCompanies: 'ZM, ZOOM', createdAt: 'May 28, 2026', marketImpact: 'ZOOM OTC spiked +48% with no operational news, SEC halted trading twice', investorWarning: 'Always match CUSIP/ISIN identifiers before trading. Zoom Technologies has no relation to the video platform.', severity: 'medium' },
];

const sevStyle: Record<string, string> = {
  critical: 'text-[#FF5A5A] bg-[#FF5A5A]/10 border-[#FF5A5A]/25',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/25',
  medium: 'text-[#FFC857] bg-[#FFC857]/10 border-[#FFC857]/25',
};

export default function InvestigationsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Investigations</h1>
        <p className="mt-1 text-sm text-zinc-500">Forensic AI reports generated for each detected market confusion event.</p>
      </div>

      <div className="flex flex-col gap-5">
        {INVESTIGATIONS.map((inv, i) => (
          <motion.div key={inv.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="flex flex-col gap-4 p-6 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#262626] group transition">
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${sevStyle[inv.severity]}`}>{inv.severity}</span>
                  <span className="text-[10px] text-zinc-600 font-mono">{inv.id}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#00E5A8] transition-colors">{inv.title}</h3>
                <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">{inv.summary}</p>
              </div>
              <FileText className="w-5 h-5 text-zinc-700 shrink-0 group-hover:text-[#00E5A8] transition" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Root Cause</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{inv.rootCause}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Market Impact</p>
                <p className="text-xs text-[#FFC857] font-semibold leading-relaxed">{inv.marketImpact}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FF5A5A]/5 border border-[#FF5A5A]/15">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#FF5A5A] shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300 leading-relaxed"><span className="font-bold text-[#FF5A5A]">Investor Warning: </span>{inv.investorWarning}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap gap-2">
                {inv.affectedCompanies.split(', ').map(s => (
                  <span key={s} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1A1A1A] text-zinc-300 border border-[#262626]">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-zinc-600">{inv.createdAt}</span>
                <Link href="/blog" className="flex items-center gap-1 text-[10px] font-bold text-[#00E5A8] hover:gap-1.5 transition-all">
                  Read Full Report <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
