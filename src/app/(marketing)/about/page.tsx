import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Target, Users, Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — TickerGuard AI',
  description: 'Learn about TickerGuard AI — the financial intelligence platform protecting investors from market confusion.',
};

const VALUES = [
  { icon: Shield, title: 'Investor Protection', desc: 'We exist to prevent retail investors from losing money due to simple ticker-symbol mistakes and brand confusion.' },
  { icon: Target, title: 'Precision Intelligence', desc: 'Our AI scoring engine combines name similarity, social signals, news sentiment, and price movement for accurate detection.' },
  { icon: Users, title: 'Built for Everyone', desc: 'From first-time traders to institutional analysts, TickerGuard AI scales to your intelligence needs.' },
  { icon: Globe, title: 'Global Coverage', desc: 'Monitoring exchanges worldwide — NSE, BSE, NASDAQ, NYSE, LSE, and OTC markets.' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-grid-pattern">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-6">
            <Shield className="w-3.5 h-3.5 text-[#00E5A8]" />
            About Us
          </span>
          <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
            Defending Investors from <span className="text-[#00E5A8]">Market Confusion</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-400 leading-relaxed">
            TickerGuard AI was built with a simple mission: stop investors from buying the wrong company because of a name similarity. Every day, thousands of retail traders lose money because they confuse an unlisted brand with a listed ticker — or buy an OTC shell thinking it's a major corporation.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#262626] transition"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#00E5A8]/10 border border-[#00E5A8]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#00E5A8]" />
                </div>
                <h3 className="text-sm font-bold text-white">{v.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-[#111111] border border-[#1A1A1A] text-center">
          <h2 className="text-xl font-bold text-white mb-3">Ready to Protect Your Trades?</h2>
          <p className="text-xs text-zinc-500 max-w-lg mx-auto mb-6">
            Join thousands of investors who use TickerGuard AI to validate every trade before confusion costs them money.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E5A8] text-black text-sm font-bold hover:bg-[#00E5A8]/90 transition shadow-[0_0_15px_rgba(0,229,168,0.2)]">
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#262626] text-zinc-300 text-sm font-semibold hover:text-white hover:border-zinc-600 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
