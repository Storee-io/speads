'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Search, Filter, MoreHorizontal, Save, Loader2, ArrowLeft, Languages } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import en from '@/locales/en.json';
import id from '@/locales/id.json';

const staticTranslations = { en, id };

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'id'>('en');
  const [content, setContent] = useState(staticTranslations.en);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchTranslations() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('translations')
          .select('content')
          .eq('lang', selectedLang)
          .single();
        
        if (data && data.content) {
          // Merge with static translations to ensure all keys exist
          setContent({
            ...staticTranslations[selectedLang],
            ...data.content
          });
        } else {
          setContent(staticTranslations[selectedLang]);
        }
      } catch (err) {
        console.error('Error fetching translations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTranslations();
  }, [selectedLang]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('translations')
        .upsert({ 
          lang: selectedLang, 
          content: content, 
          updated_at: new Date().toISOString() 
        });
      
      if (error) throw error;
      toast.success('Content saved successfully');
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving content:', err);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Editing {selectedLang === 'en' ? 'English' : 'Indonesia'} Content</h1>
              <p className="text-slate-500 text-sm">Update the website text for this language.</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-indigo-100"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {/* Hero Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-500 rounded-full" />
              Hero Section
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Badge</label>
                <input 
                  type="text" 
                  value={content.hero.badge}
                  onChange={(e) => setContent({...content, hero: {...content.hero, badge: e.target.value}})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Title</label>
                <input 
                  type="text" 
                  value={content.hero.title}
                  onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Highlight Text</label>
                <input 
                  type="text" 
                  value={content.hero.highlight}
                  onChange={(e) => setContent({...content, hero: {...content.hero, highlight: e.target.value}})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea 
                  rows={3}
                  value={content.hero.description}
                  onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>
            </div>
          </div>
          
          {/* Add more sections as needed */}
          <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
            <p className="text-slate-400 text-sm italic">More sections coming soon...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
          <p className="text-slate-500 text-sm">Manage your website content across different languages.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Available Languages</span>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {[
            { id: 'en', name: 'English', flag: '🇺🇸', items: 12 },
            { id: 'id', name: 'Indonesia', flag: '🇮🇩', items: 12 },
          ].map((lang) => (
            <div key={lang.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner border border-white">
                  {lang.flag}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{lang.name}</h3>
                  <p className="text-slate-500 text-sm">{lang.items} sections available to edit</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedLang(lang.id as 'en' | 'id');
                  setIsEditing(true);
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm hover:shadow-indigo-50/50"
              >
                Edit Content
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

