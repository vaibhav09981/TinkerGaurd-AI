'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, FileText, TrendingUp, Eye } from 'lucide-react';
import { getAlerts, getInvestigations, getNews, getBlogPosts, getCompanies, getSocialMentions } from '@/app/actions';

interface Stats {
  totalIncidents: number;
  confusionCases: number;
  articlesGenerated: number;
  usersCount: number;
  alertsCount: number;
  companiesCount: number;
  investigationsCount: number;
  socialMentions: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [alerts, investigations, news, blogPosts, companies, socialMentions] = await Promise.all([
          getAlerts(),
          getInvestigations(),
          getNews(),
          getBlogPosts(),
          getCompanies(),
          getSocialMentions(),
        ]);

        let confusionCases = 0;
        let totalIncidents = 0;

        const scoreAlerts = (alerts || []).filter(a => a.isResolved === false).length;
        const resolvedAlerts = (alerts || []).filter(a => a.isResolved === true).length;
        totalIncidents = (alerts || []).length;

        setStats({
          totalIncidents,
          confusionCases: confusionCases || (investigations || []).length,
          articlesGenerated: (blogPosts || []).length,
          usersCount: 1,
          alertsCount: scoreAlerts,
          companiesCount: (companies || []).length,
          investigationsCount: (investigations || []).length,
          socialMentions: (socialMentions || []).length,
        });
      } catch (error) {
        console.error('Failed to load admin stats:', error);
        setStats({
          totalIncidents: 0,
          confusionCases: 0,
          articlesGenerated: 0,
          usersCount: 1,
          alertsCount: 0,
          companiesCount: 0,
          investigationsCount: 0,
          socialMentions: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
          <p className="mt-1 text-sm text-zinc-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Incidents', value: stats?.totalIncidents || 0, icon: AlertTriangle, color: 'text-[#FF5A5A]', bg: 'bg-[#FF5A5A]/10', border: 'border-[#FF5A5A]/20' },
    { label: 'Confusion Cases', value: stats?.confusionCases || 0, icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
    { label: 'Articles Generated', value: stats?.articlesGenerated || 0, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Companies Monitored', value: stats?.companiesCount || 0, icon: Eye, color: 'text-[#00E5A8]', bg: 'bg-[#00E5A8]/10', border: 'border-[#00E5A8]/20' },
    { label: 'Active Alerts', value: stats?.alertsCount || 0, icon: AlertTriangle, color: 'text-[#FFC857]', bg: 'bg-[#FFC857]/10', border: 'border-[#FFC857]/20' },
    { label: 'Investigations', value: stats?.investigationsCount || 0, icon: FileText, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { label: 'Users', value: stats?.usersCount || 0, icon: Users, color: 'text-[#00E5A8]', bg: 'bg-[#00E5A8]/10', border: 'border-[#00E5A8]/20' },
    { label: 'Social Mentions', value: stats?.socialMentions || 0, icon: TrendingUp, color: 'text-[#FF5A5A]', bg: 'bg-[#FF5A5A]/10', border: 'border-[#FF5A5A]/20' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
        <p className="mt-1 text-sm text-zinc-500">Platform analytics and content management.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`flex flex-col gap-3 p-4 rounded-2xl bg-[#111111] border ${card.border}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${card.bg} border ${card.border}`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{card.value}</p>
                <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">{card.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
          <h2 className="text-sm font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Manage Blog Posts', href: '/blog' },
              { label: 'View All Alerts', href: '/alerts' },
              { label: 'Run New Investigation', href: '/detector' },
              { label: 'AI Assistant Logs', href: '/assistant' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#262626] transition text-xs font-semibold text-zinc-300 hover:text-white"
              >
                {action.label}
                <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
          <h2 className="text-sm font-bold text-white mb-4">System Status</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'AI Engine', status: 'Operational', color: 'text-[#00E5A8]' },
              { label: 'Database', status: 'Local JSON', color: 'text-[#00E5A8]' },
              { label: 'Scoring Engine', status: 'Active', color: 'text-[#00E5A8]' },
              { label: 'API Services', status: 'Ready', color: 'text-[#00E5A8]' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <span className="text-xs font-semibold text-zinc-400">{item.label}</span>
                <span className={`text-[10px] font-bold ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
