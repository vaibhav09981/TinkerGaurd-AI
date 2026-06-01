import Link from 'next/link';
import { Metadata } from 'next';
import { Check, ArrowRight, Zap, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — TickerGuard AI',
  description: 'Simple pricing tiers for individuals, professionals, and enterprise teams.',
};

const TIERS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'For curious investors exploring market intelligence.',
    features: ['20 alerts/month', 'Basic AI analysis', 'Company search', 'News feed access', 'Community support'],
    cta: 'Get Started',
    href: '/dashboard',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    desc: 'For active traders who need unlimited intelligence.',
    features: ['Unlimited alerts', 'AI investigations', 'Social media monitoring', 'Market movement charts', 'Priority support', 'Export reports'],
    cta: 'Start Pro Trial',
    href: '/dashboard',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For institutions, hedge funds, and research teams.',
    features: ['API access', 'Team dashboard', 'Compliance reports', 'Custom integrations', 'Dedicated support', 'SSO & audit logs'],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-grid-pattern">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#00E5A8]/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5 text-[#00E5A8]" />
            Pricing Plans
          </span>
          <h1 className="max-w-4xl text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
            Choose Your <span className="text-[#00E5A8]">Protection Level</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-zinc-400 leading-relaxed">
            From free market monitoring to enterprise-grade intelligence — pick the tier that fits your needs.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative flex flex-col gap-5 p-6 rounded-2xl border ${
                tier.highlighted
                  ? 'bg-[#111111] border-[#00E5A8]/30 shadow-[0_0_30px_rgba(0,229,168,0.1)]'
                  : 'bg-[#111111] border-[#1A1A1A]'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00E5A8] text-black text-[10px] font-black uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{tier.price}</span>
                  <span className="text-sm text-zinc-500 font-medium">{tier.period}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{tier.desc}</p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#00E5A8] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                  tier.highlighted
                    ? 'bg-[#00E5A8] text-black hover:bg-[#00E5A8]/90 shadow-[0_0_15px_rgba(0,229,168,0.2)]'
                    : 'bg-white/5 border border-[#262626] text-zinc-300 hover:text-white hover:border-zinc-600'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-600 font-medium">
            All plans include core confusion detection · No credit card required for Starter
          </p>
        </div>
      </section>
    </div>
  );
}
