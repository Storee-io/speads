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
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">Configure your CMS and website preferences.</p>
        </div>
  
        <div className="grid grid-cols-1 gap-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-100 transition-all">
              <div className="p-6 border-b border-slate-100 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <p className="text-slate-500 text-sm">{section.description}</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {section.fields.map((field, j) => (
                  <div key={j} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <span className="text-sm text-slate-700 font-medium">{field}</span>
                    <div className="w-12 h-6 bg-slate-100 rounded-full relative cursor-pointer border border-slate-200">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm border border-slate-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium text-sm">
            Cancel
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-100">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    );
}

