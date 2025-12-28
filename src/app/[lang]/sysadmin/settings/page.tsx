'use client';

import { useState, useEffect } from 'react';
import { Settings, Globe, Bell, Lock, Database, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Speads',
    defaultLanguage: 'en',
    timezone: 'UTC',
    emailAlerts: true,
    backupFrequency: 'Daily'
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'general')
          .single();
        
        if (data) {
          setSettings(data.value);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'general', value: settings, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      toast.success('Settings saved successfully');
    } catch (err) {
      console.error('Error saving settings:', err);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">Configure your CMS and website preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* General Settings */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-100 transition-all">
          <div className="p-6 border-b border-slate-100 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">General Settings</h3>
              <p className="text-slate-500 text-sm">Website title, language, and global configurations.</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Site Name</label>
              <input 
                type="text" 
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Default Language</label>
              <select 
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="en">English</option>
                <option value="id">Indonesia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-100 transition-all">
          <div className="p-6 border-b border-slate-100 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
              <p className="text-slate-500 text-sm">Configure email and system notifications.</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <span className="text-sm text-slate-700 font-medium">Email Alerts</span>
              <button 
                onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}
                className={`w-12 h-6 rounded-full relative transition-colors border ${settings.emailAlerts ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-100 border-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.emailAlerts ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium text-sm"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}

