'use client';

import { Settings, Globe, Bell, Lock, Database, Save } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { 
      title: 'General Settings', 
      icon: Globe, 
      description: 'Website title, language, and global configurations.',
      fields: ['Site Name', 'Default Language', 'Timezone']
    },
    { 
      title: 'Security', 
      icon: Lock, 
      description: 'Manage authentication methods and security protocols.',
      fields: ['Two-Factor Auth', 'Session Timeout', 'Password Policy']
    },
    { 
      title: 'Notifications', 
      icon: Bell, 
      description: 'Configure email and system notifications.',
      fields: ['Email Alerts', 'System Updates', 'New User Signups']
    },
    { 
      title: 'Database & Storage', 
      icon: Database, 
      description: 'Manage backups and asset storage settings.',
      fields: ['Backup Frequency', 'Storage Provider', 'Cache Duration']
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm">Configure your CMS and website preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700">
                <section.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <p className="text-slate-400 text-sm">{section.description}</p>
              </div>
            </div>
            <div className="p-6 bg-slate-950/30 space-y-4">
              {section.fields.map((field, j) => (
                <div key={j} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-medium">{field}</span>
                  <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer border border-slate-700">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button className="px-6 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium text-sm">
          Cancel
        </button>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
