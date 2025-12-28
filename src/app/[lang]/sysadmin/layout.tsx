'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, LayoutDashboard, Settings, Users, FileText, LogOut, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !pathname.endsWith('/login')) {
      router.push('/sysadmin/login');
    }
  }, [user, loading, router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.push('/sysadmin/login');
  };

  if (loading && !pathname.endsWith('/login')) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (pathname.endsWith('/login')) {
    return <>{children}</>;
  }

  if (!user) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/sysadmin' },
    { icon: FileText, label: 'Content', href: '/sysadmin/content' },
    { icon: Users, label: 'Users', href: '/sysadmin/users' },
    { icon: Settings, label: 'Settings', href: '/sysadmin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/sysadmin" className="flex items-center gap-3 text-white font-bold text-xl">
            <Shield className="w-6 h-6 text-indigo-500" />
            <span>Speads CMS</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="px-4 py-3 mb-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Signed in as</p>
            <p className="text-sm font-medium truncate text-white">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-white">
            {menuItems.find(item => item.href === pathname)?.label || 'Admin'}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
