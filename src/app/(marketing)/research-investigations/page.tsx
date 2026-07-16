'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, FileText, TrendingUp } from 'lucide-react';

const INVESTIGATIONS = [
  { id: 'inv_001', title: 'Investigation #TG-2026-PARLE: Biscuit Fame Mismatch', summary: 'Full investigation into how viral confectionery rumors drove BSE listed Parle Industries (PARLEIND) to consecutive upper circuit rallies.', rootCause: 'Viral tweets about Melody chocolates led retail buyers to search "Parle" on brokers and purchase the wrong listed company.', affectedCompanies: 'PARLEPROD, PARLEIND', createdAt: 'Jun 1, 2026', marketImpact: '+20% for 3 consecutive sessions at 45× average volume', investorWarning: 'PARLEIND has ZERO connection to biscuits, Melody, or Parle-G.', severity: 'critical' },
  { id: 'inv_002', title: 'Investigation #TG-2026-SIGNAL: Elon Musk Social Amplification', summary: 'Comprehensive audit of the 11,000% ticker mismatch between private Signal Messenger LLC and medical device maker Signal Advance (SIGL).', rootCause: 'Billionaire social media recommendation of "Signal" triggered algorithms to bulk-buy OTC ticker SIGL due to word match.', affectedCompanies: 'SIGNALAPP, SIGL', createdAt: 'May 31, 2026', marketImpact: 'Market cap inflated by $2.9B in days, followed by -94% crash', investorWarning: 'Never buy OTC tickers on social word-association without verifying the SEC-CIK identifier.', severity: 'high' },
  { id: 'inv_003', title: 'Investigation #TG-2026-ZOOM: OTC Shell Name Disaster', summary: 'Sustained retail confusion between ZM (Zoom Video) and ZOOM (Zoom Technologies OTC) led to repeated SEC trading halts.', rootCause: 'Both companies share the word Zoom in their name, making broker keyword searches mislead retail investors.', affectedCompanies: 'ZM, ZOOM', createdAt: 'May 28, 2026', marketImpact: 'ZOOM OTC spiked +48% with no operational news, SEC halted trading twice', investorWarning: 'Always match CUSIP/ISIN identifiers before trading. Zoom Technologies has no relation to the video platform.', severity: 'medium' },
];

const sevStyle: Record<string, string> = {
  critical: 'text-destructive bg-destructive/10 border border-destructive/25',
  high: 'text-orange-400 bg-orange-400/10 border border-orange-400/25',
  medium: 'text-warning bg-warning/10 border border-warning/25',
};

export default function InvestigationsPage() {
  return (
    <div className="relative flex flex-col">
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-grid-pattern">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-muted rounded-full blur-[120px] pointer-events-none" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            Public Investigations
          </span>
          <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-foreground">
            AI-Generated <span className="text-muted-foreground">Forensic Reports</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            Deep-dive investigations into real market confusion events, generated automatically by TickerGuard AI.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          {INVESTIGATIONS.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-card/80 border border-border glass-panel-hover group transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${sevStyle[inv.severity]}`}>
                      {inv.severity}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{inv.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-muted-foreground transition-colors">
                    {inv.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{inv.summary}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-background border border-border">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Root Cause</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{inv.rootCause}</p>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Market Impact</p>
                  <p className="text-xs text-warning font-semibold leading-relaxed">{inv.marketImpact}</p>
                </div>
                <div className="p-3 rounded-xl bg-destructive/5 border border-destructive/15">
                  <p className="text-[10px] font-bold text-destructive uppercase tracking-wider mb-1">Investor Warning</p>
                  <p className="text-xs text-foreground leading-relaxed">{inv.investorWarning}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-2">
                  {inv.affectedCompanies.split(', ').map((s) => (
                    <span key={s} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-accent text-muted-foreground border border-border">
                      {s}
                    </span>
                  ))}
                </div>
                <Link
                  href="/dashboard/investigations"
                  className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:gap-2 transition-all"
                >
                  Full Report <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
