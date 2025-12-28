'use client';

import { useAuth } from '@/hooks/use-auth';
import { 
  Users, 
  FileText, 
  Eye, 
  TrendingUp,
  ArrowUpRight,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Visits', value: '12,482', change: '+12%', icon: Eye, color: 'text-blue-400' },
    { label: 'Content Items', value: '84', change: '+3', icon: FileText, color: 'text-indigo-400' },
    { label: 'Active Users', value: '1,204', change: '+18%', icon: Users, color: 'text-emerald-400' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: TrendingUp, color: 'text-amber-400' },
  ];

  const recentActivity = [
    { title: 'New service added', time: '2 hours ago', user: 'Admin' },
    { title: 'Homepage hero text updated', time: '5 hours ago', user: 'Editor' },
    { title: 'Project "Speads AI" published', time: 'Yesterday', user: 'Admin' },
    { title: 'Newsletter configuration changed', time: '2 days ago', user: 'Admin' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.email?.split('@')[0]}!</h1>
        <p className="text-slate-400 text-sm">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-slate-800/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Activity</h3>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View all</button>
          </div>
          <div className="divide-y divide-slate-800/50">
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-6 flex items-center gap-4 hover:bg-slate-800/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Clock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{activity.title}</p>
                  <p className="text-xs text-slate-500">by {activity.user} • {activity.time}</p>
                </div>
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Need help?</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Check out our documentation for guides on how to manage your content effectively.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-all shadow-xl">
              Documentation
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-indigo-400 rounded-full blur-2xl opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
          <Shield className="absolute top-8 right-8 w-16 h-16 text-indigo-500/20 rotate-12" />
        </div>
      </div>
    </div>
  );
}
