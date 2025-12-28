'use client';

import { FileText, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

export default function ContentPage() {
  const contentItems = [
    { title: 'Home Hero Section', type: 'Section', status: 'Published', lastUpdated: '2 hours ago' },
    { title: 'Speads AI Launch Post', type: 'Blog', status: 'Published', lastUpdated: 'Yesterday' },
    { title: 'Services Overview', type: 'Page', status: 'Draft', lastUpdated: '3 days ago' },
    { title: 'Contact Information', type: 'Global', status: 'Published', lastUpdated: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="text-slate-400 text-sm">Manage your website pages and sections.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium transition-all">
          <Plus className="w-4 h-4" />
          <span>New Content</span>
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search content..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-800 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900/80 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {contentItems.map((item, i) => (
              <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-200">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{item.type}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    item.status === 'Published' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.lastUpdated}</td>
                <td className="px-6 py-4 text-right text-slate-500">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
