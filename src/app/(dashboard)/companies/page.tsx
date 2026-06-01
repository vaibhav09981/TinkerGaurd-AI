'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, ExternalLink, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Company {
  id: string;
  symbol: string;
  name: string;
  brandName?: string;
  isListed: boolean;
  industry?: string;
  parentCompany?: string;
  description?: string;
  riskHistory: { date: string; score: number }[];
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/companies/search');
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const latestRiskScore = selectedCompany?.riskHistory[selectedCompany.riskHistory.length - 1]?.score || 0;

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Companies Directory</h1>
        <p className="mt-1 text-sm text-zinc-500">Search and analyze any company for identity confusion risks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, tickers..."
              className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5A8]/30 transition"
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-xs text-zinc-500 font-medium">Loading...</div>
            ) : filteredCompanies.length === 0 ? (
              <div className="text-center py-8 text-xs text-zinc-500 font-medium">No companies found</div>
            ) : (
              filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className={`flex flex-col gap-1 p-3 rounded-xl border text-left transition ${
                    selectedCompany?.id === company.id
                      ? 'bg-[#00E5A8]/10 border-[#00E5A8]/25'
                      : 'bg-[#111111] border-[#1A1A1A] hover:border-[#262626]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{company.symbol}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      company.isListed ? 'bg-[#00E5A8]/10 text-[#00E5A8] border border-[#00E5A8]/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {company.isListed ? 'Listed' : 'Unlisted'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">{company.name}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {selectedCompany ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 flex flex-col gap-5 p-6 rounded-2xl bg-[#111111] border border-[#1A1A1A]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black ${
                  latestRiskScore > 70 ? 'bg-[#FF5A5A]/10 border border-[#FF5A5A]/20 text-[#FF5A5A]' :
                  latestRiskScore > 40 ? 'bg-[#FFC857]/10 border border-[#FFC857]/20 text-[#FFC857]' :
                  'bg-[#00E5A8]/10 border border-[#00E5A8]/20 text-[#00E5A8]'
                }`}>
                  {selectedCompany.symbol.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedCompany.symbol}</h2>
                  <p className="text-xs text-zinc-500">{selectedCompany.name}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                latestRiskScore > 70 ? 'text-[#FF5A5A] bg-[#FF5A5A]/10 border-[#FF5A5A]/25' :
                latestRiskScore > 40 ? 'text-[#FFC857] bg-[#FFC857]/10 border-[#FFC857]/25' :
                'text-[#00E5A8] bg-[#00E5A8]/10 border-[#00E5A8]/25'
              }`}>
                Score: {latestRiskScore}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Status</p>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  {selectedCompany.isListed ? <CheckCircle className="w-3 h-3 text-[#00E5A8]" /> : <XCircle className="w-3 h-3 text-[#FF5A5A]" />}
                  {selectedCompany.isListed ? 'Listed' : 'Unlisted'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Industry</p>
                <p className="text-xs font-bold text-white">{selectedCompany.industry || 'N/A'}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Parent</p>
                <p className="text-xs font-bold text-white">{selectedCompany.parentCompany || 'Independent'}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Risk Level</p>
                <p className={`text-xs font-bold ${
                  latestRiskScore > 70 ? 'text-[#FF5A5A]' :
                  latestRiskScore > 40 ? 'text-[#FFC857]' :
                  'text-[#00E5A8]'
                }`}>
                  {latestRiskScore > 70 ? 'High' : latestRiskScore > 40 ? 'Monitor' : 'Low'}
                </p>
              </div>
            </div>

            {selectedCompany.brandName && (
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Brand Names</p>
                <p className="text-xs text-zinc-300">{selectedCompany.brandName}</p>
              </div>
            )}

            {selectedCompany.description && (
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">Description</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{selectedCompany.description}</p>
              </div>
            )}

            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-3">Risk History</p>
              <div className="flex flex-col gap-2">
                {selectedCompany.riskHistory.slice(-5).reverse().map((entry) => (
                  <div key={entry.date} className="flex items-center justify-between p-2 rounded-lg bg-[#0A0A0A] border border-[#1A1A1A]">
                    <span className="text-[10px] text-zinc-500 font-mono">{entry.date}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            entry.score > 70 ? 'bg-[#FF5A5A]' :
                            entry.score > 40 ? 'bg-[#FFC857]' :
                            'bg-[#00E5A8]'
                          }`}
                          style={{ width: `${entry.score}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-300 w-8 text-right">{entry.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="lg:col-span-2 flex flex-col items-center justify-center p-12 rounded-2xl bg-[#111111] border border-[#1A1A1A] border-dashed">
            <Search className="w-8 h-8 text-zinc-700 mb-3" />
            <p className="text-sm text-zinc-500 font-medium">Select a company to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
