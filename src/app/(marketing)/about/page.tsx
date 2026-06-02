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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            <Shield className="w-3.5 h-3.5 text-muted-foreground" />
            About Us
          </span>
          <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-foreground">
            Defending Investors from <span className="text-muted-foreground">Market Confusion</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            TickerGuard AI was built with a simple mission: stop investors from buying the wrong company because of a name similarity. Every day, thousands of retail traders lose money because they confuse an unlisted brand with a listed ticker — or buy an OTC shell thinking it's a major corporation.
          </p>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-6">
          Why We Built TickerGuard AI
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-4">
          Every day, thousands of investors lose money not because of bad analysis, but because of simple mistakes—buying the wrong company due to confusing ticker symbols or brand names. We built TickerGuard AI to eliminate these costly errors at the source, giving retail investors the same powerful tools once reserved for institutional traders.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Our proprietary scoring engine analyzes name similarity, social media mentions, news sentiment, and price movement patterns to detect potential confusion before it impacts your portfolio. By combining real-time data with advanced AI algorithms, we provide early warnings that help investors make informed decisions and avoid costly mistakes.
        </p>
      </section>

      {/* Values Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="max-w-800px mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="flex flex-col gap-4 p-6 rounded-2xl bg-card/80 border border-border glass-panel-hover text-center items-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted border border-border"><Icon className="w-5 h-5 text-muted-foreground" /></div>
                <h3 className="text-sm font-bold text-foreground">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Block */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mx-auto">
          <div className="w-full h-px bg-border my-6" />
          <div className="p-8 rounded-2xl bg-card/80 border border-border glass-panel-hover text-center">
            <h2 className="text-xl font-bold text-foreground mb-3">Ready to Protect Your Trades?</h2>
            <p className="text-xs text-muted-foreground max-w-lg mx-auto mb-6">
              Join thousands of investors who use TickerGuard AI to validate every trade before confusion costs them money.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition">
                Open Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground text-sm font-semibold hover:text-foreground hover:border-muted-foreground transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
