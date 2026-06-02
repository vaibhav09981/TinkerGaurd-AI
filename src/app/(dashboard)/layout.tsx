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
  X,
  Sun,
  Moon
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Identity Confusion: PARLEIND', body: 'Volume spiked +1,200% on unverified biscuit factory rumor.', type: 'critical', time: '5m ago' },
    { id: 2, title: 'Social Hype Alert: SIGL', body: 'r/wallstreetbets threads surged +450% quoting Elon Musk.', type: 'high', time: '2h ago' },
    { id: 3, title: 'Regulator Trading Halt: ZOOM', body: 'Trading temporarily suspended due to persistent retail spelling mistakes.', type: 'medium', time: '1d ago' }
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

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
    <div className="flex h-screen bg-background overflow-hidden text-foreground font-sans">
      <aside className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-card/80 border-r border-border glass transition-all duration-300 ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border overflow-hidden">
          <Link href="/" className="flex items-center gap-2 select-none shrink-0">
            <div className="p-1 rounded-lg bg-muted border border-border">
              <Shield className="w-5 h-5 text-foreground" />
            </div>
            {sidebarOpen && <span className="font-semibold text-sm tracking-tight text-foreground">TickerGuard <span className="text-foreground font-bold">AI</span></span>}
          </Link>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="lg:flex hidden p-1 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.href} className={`flex items-center justify-between px-3 py-2.5 text-xs font-semibold tracking-wide transition-all group ${isActive ? 'border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent'}`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  {sidebarOpen && <span>{item.name}</span>}
                </div>
                {sidebarOpen && item.badge && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] bg-destructive/10 text-destructive border border-destructive/20">{item.badge}</span>
                )}
                {sidebarOpen && item.highlight && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] bg-primary/10 text-foreground border border-border font-bold tracking-widest uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-foreground fill-foreground animate-pulse" />
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-border bg-background/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Account Level</p>
                <p className="text-xs text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  Enterprise Tier
                </p>
              </div>
              <Link href="/settings" className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition" title="Settings">
                <Sliders className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </aside>

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
        <header className="h-16 border-b border-border glass bg-background/85 backdrop-blur-md z-20 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition">
              <Menu className="w-5 h-5" />
            </button>

            <form action="/companies" className="hidden md:flex items-center relative w-64 lg:w-80 group">
              <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground absolute left-3 transition-colors" />
              <input type="text" name="symbol" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search stocks, brand names, tickers..." className="w-full bg-card border border-input rounded-lg pl-9 pr-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ring transition-all font-medium" />
              <span className="absolute right-2 px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] text-muted-foreground font-mono select-none">/</span>
            </form>
          </div>

          <div className="flex items-center gap-4 relative">
            <Link href="/alerts" className="hidden sm:flex items-center gap-2 bg-muted border border-border rounded-full px-3 py-1 text-[10px] text-foreground font-semibold">
              <span className="h-2 w-2 rounded-full bg-foreground animate-pulse" />
              <span>3 Suspicious Movements Detected Today</span>
            </Link>

            <div className="relative">
              <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition relative">
                <Bell className="w-4 h-4" />
                {alertsCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive ring-1 ring-background" />}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-2xl p-4 z-50 text-left animate-in fade-in duration-100">
                  <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">Security Alerts</span>
                    <button onClick={() => { setAlertsCount(0); setNotifications([]); }} className="text-[10px] text-muted-foreground hover:text-foreground">Clear all</button>
                  </div>

                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-muted-foreground font-medium">No security alerts pending</div>
                  ) : (
                    <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="text-xs group border-b border-border pb-2 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between font-bold">
                            <span className={`inline-flex items-center gap-1.5 ${notif.type === 'critical' ? 'text-destructive' : notif.type === 'high' ? 'text-orange-400' : 'text-warning'}`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />{notif.title}
                            </span>
                            <span className="text-[9px] text-muted-foreground font-medium">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 leading-normal">{notif.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="h-px bg-border my-3" />
                  <Link href="/alerts" className="flex items-center justify-center gap-1 text-[10px] font-bold text-foreground hover:text-foreground/80 transition" onClick={() => setNotificationsOpen(false)}>View Alert Center <ArrowRight className="w-3.5 h-3.5" /></Link>
                </div>
              )}
            </div>

            <button onClick={toggleTheme} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link href="/settings" className="flex items-center gap-2 border border-border rounded-lg p-1 pr-3 hover:bg-muted hover:border-muted-foreground/20 transition">
              <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center font-bold text-[10px] text-foreground border border-border">TG</div>
              <span className="text-xs font-bold hidden sm:inline-block text-foreground">Developer Mode</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

