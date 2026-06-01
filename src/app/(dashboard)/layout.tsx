'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  LayoutDashboard, 
  Radio, 
  FileSearch, 
  AlertTriangle, 
  Briefcase, 
  Search, 
  Bell, 
  MessageSquareCode, 
  UserCog, 
  Sliders, 
  ChevronLeft, 
  Menu,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [alertsCount, setAlertsCount] = useState(3);
  
  // Custom mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Identity Confusion: PARLEIND', body: 'Volume spiked +1,200% on unverified biscuit factory rumor.', type: 'critical', time: '5m ago' },
    { id: 2, title: 'Social Hype Alert: SIGL', body: 'r/wallstreetbets threads surged +450% quoting Elon Musk.', type: 'high', time: '2h ago' },
    { id: 3, title: 'Regulator Trading Halt: ZOOM', body: 'Trading temporarily suspended due to persistent retail spelling mistakes.', type: 'medium', time: '1d ago' }
  ]);

  // Handle sidebar collapse on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'News Intelligence', href: '/news', icon: Radio },
    { name: 'Confusion Detector', href: '/detector', icon: FileSearch },
    { name: 'Market Alerts', href: '/alerts', icon: AlertTriangle, badge: '3' },
    { name: 'Investigations', href: '/investigations', icon: Briefcase },
    { name: 'Companies Directory', href: '/companies', icon: TrendingUp },
    { name: 'AI Chat Assistant', href: '/assistant', icon: MessageSquareCode },
    { name: 'Research & Blog', href: '/blog', icon: BookOpen },
    { name: 'Admin Panel', href: '/admin', icon: UserCog, highlight: true },
    { name: 'System Settings', href: '/settings', icon: Sliders }
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden text-zinc-100 font-sans">
      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-[#111111] border-r border-[#1A1A1A] transition-all duration-300 ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
        }`}
      >
        {/* Sidebar Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1A1A1A] overflow-hidden">
          <Link href="/" className="flex items-center gap-2 select-none shrink-0">
            <div className="p-1 rounded-lg bg-white/5 border border-white/10">
              <Shield className="w-5 h-5 text-brand-green" />
            </div>
            {sidebarOpen && (
              <span className="font-semibold text-sm tracking-tight text-white">
                TickerGuard <span className="text-brand-green font-bold">AI</span>
              </span>
            )}
          </Link>
          {sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:flex hidden p-1 text-zinc-500 hover:text-white rounded hover:bg-zinc-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all group ${
                  isActive 
                    ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-brand-green' : 'text-zinc-400 group-hover:text-zinc-300'
                  }`} />
                  {sidebarOpen && <span>{item.name}</span>}
                </div>
                {sidebarOpen && item.badge && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-red-950 text-brand-red border border-brand-red/30">
                    {item.badge}
                  </span>
                )}
                {sidebarOpen && item.highlight && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] bg-brand-green/15 text-brand-green border border-brand-green/20 font-bold tracking-widest uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-brand-green fill-brand-green animate-pulse" />
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Info Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-[#1A1A1A] bg-[#0A0A0A]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Account Level</p>
                <p className="text-xs text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  Enterprise Tier
                </p>
              </div>
              <Link 
                href="/settings" 
                className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                title="Settings"
              >
                <Sliders className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Main Layout Area */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
      }`}>
        
        {/* Top Header Navbar */}
        <header className="h-16 border-b border-[#1A1A1A] bg-[#0A0A0A]/85 backdrop-blur-md z-20 flex items-center justify-between px-4 lg:px-8">
          {/* Collapse toggle / Mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Company Search Bar */}
            <form action="/companies" className="hidden md:flex items-center relative w-64 lg:w-80 group">
              <Search className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 absolute left-3 transition-colors" />
              <input
                type="text"
                name="symbol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stocks, brand names, tickers..."
                className="w-full bg-[#111111] border border-[#1A1A1A] rounded-lg pl-9 pr-8 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green/30 transition-all font-medium"
              />
              <span className="absolute right-2 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 font-mono select-none">
                /
              </span>
            </form>
          </div>

          {/* User Profile & Notifications bells */}
          <div className="flex items-center gap-4 relative">
            
            {/* Realtime Alert Health Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-[#FFC857]/5 border border-[#FFC857]/15 rounded-full px-3 py-1 text-[10px] text-[#FFC857] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#FF5A5A] animate-ping" />
              <span>3 Suspicious Movements Detected Today</span>
            </div>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-white/5 transition relative"
              >
                <Bell className="w-4 h-4" />
                {alertsCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-red ring-1 ring-[#0A0A0A]" />
                )}
              </button>

              {/* Notification Overlay Menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#111111] border border-zinc-800 shadow-2xl p-4 z-50 text-left animate-in fade-in duration-100">
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Security Alerts</span>
                    <button 
                      onClick={() => {
                        setAlertsCount(0);
                        setNotifications([]);
                      }} 
                      className="text-[10px] text-brand-green hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-zinc-500 font-medium">
                      No security alerts pending
                    </div>
                  ) : (
                    <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="text-xs group border-b border-zinc-900 pb-2 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between font-bold">
                            <span className={`inline-flex items-center gap-1.5 ${
                              notif.type === 'critical' ? 'text-brand-red' : notif.type === 'high' ? 'text-orange-400' : 'text-brand-yellow'
                            }`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {notif.title}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-medium">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
                            {notif.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="h-px bg-zinc-800/80 my-3" />
                  <Link 
                    href="/alerts" 
                    className="flex items-center justify-center gap-1 text-[10px] font-bold text-white hover:text-brand-green transition"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    View Alert Center <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Avatar Badge */}
            <Link 
              href="/settings"
              className="flex items-center gap-2 border border-zinc-800 rounded-lg p-1 pr-3 hover:bg-white/5 hover:border-zinc-700 transition"
            >
              <div className="w-6 h-6 rounded-md bg-brand-green/20 flex items-center justify-center font-bold text-[10px] text-brand-green border border-brand-green/30">
                TG
              </div>
              <span className="text-xs font-bold hidden sm:inline-block text-zinc-300">
                Developer Mode
              </span>
            </Link>

          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#0A0A0A] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
