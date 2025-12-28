'use client';

import { Users, Mail, Shield, MoreHorizontal, UserPlus } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { name: 'Admin Speads', email: 'admin@speads.id', role: 'Super Admin', status: 'Active' },
    { name: 'John Doe', email: 'john@speads.id', role: 'Editor', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@speads.id', role: 'Viewer', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm">Manage administrative access to the CMS.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium transition-all">
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.map((user, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-bold text-indigo-400 border border-slate-700">
                {user.name[0]}
              </div>
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  {user.name}
                  {user.role === 'Super Admin' && (
                    <Shield className="w-3 h-3 text-indigo-400" />
                  )}
                </h3>
                <p className="text-slate-400 text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Role</p>
                <p className="text-sm text-slate-200">{user.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Status</p>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  user.status === 'Active' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                }`}>
                  {user.status}
                </span>
              </div>
              <button className="p-2 text-slate-500 hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
