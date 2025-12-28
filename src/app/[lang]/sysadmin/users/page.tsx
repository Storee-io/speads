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
            <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500 text-sm">Manage administrative access to the CMS.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-indigo-100">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
  
        <div className="grid grid-cols-1 gap-4">
          {users.map((user, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between hover:border-indigo-200 hover:shadow-md transition-all group shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100 group-hover:scale-105 transition-transform">
                  {user.name[0]}
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold flex items-center gap-2">
                    {user.name}
                    {user.role === 'Super Admin' && (
                      <Shield className="w-3 h-3 text-indigo-600" />
                    )}
                  </h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Role</p>
                  <p className="text-sm text-slate-700 font-medium">{user.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status</p>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${
                    user.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

