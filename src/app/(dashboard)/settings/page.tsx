'use client';

import { motion } from 'framer-motion';
import { Sliders, Bell, Shield, User, Palette, Globe, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage your TickerGuard AI preferences.</p>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { icon: User, title: 'Profile', desc: 'Manage your account details and preferences', color: 'text-[#00E5A8]' },
          { icon: Bell, title: 'Notifications', desc: 'Configure alert delivery and notification channels', color: 'text-[#FFC857]' },
          { icon: Shield, title: 'Security', desc: 'API keys, authentication, and access controls', color: 'text-[#FF5A5A]' },
          { icon: Palette, title: 'Appearance', desc: 'Theme preferences and display settings', color: 'text-purple-400' },
          { icon: Globe, title: 'Data Sources', desc: 'Manage connected news, social, and market APIs', color: 'text-blue-400' },
        ].map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#262626] transition"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color} bg-[#0A0A0A] border border-[#1A1A1A]`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">{section.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{section.desc}</p>
                </div>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-[#00E5A8] bg-[#00E5A8]/10 border border-[#00E5A8]/25 hover:bg-[#00E5A8]/15 transition">
                  Configure
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
        <h3 className="text-sm font-bold text-white mb-4">System Configuration</h3>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Confusion Score Threshold', value: '70', desc: 'Minimum score to trigger alerts' },
            { label: 'Social Volume Sensitivity', value: 'High', desc: 'How sensitive the monitor is to social spikes' },
            { label: 'News Source Reliability', value: 'All Sources', desc: 'Trusted news feeds for analysis' },
          ].map((config) => (
            <div key={config.label} className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
              <div>
                <p className="text-xs font-bold text-white">{config.label}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{config.desc}</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#00E5A8]">{config.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
