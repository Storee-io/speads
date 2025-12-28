"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import id from '@/locales/id.json';
import { type Locale } from '@/i18n-config';
import { supabase } from '@/lib/supabase';

type Translations = typeof en;

interface SiteSettings {
  siteName: string;
  defaultLanguage: string;
  [key: string]: any;
}

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  settings: SiteSettings;
  loading: boolean;
}

const staticTranslations = { en, id };
const defaultSettings: SiteSettings = {
  siteName: 'Speads',
  defaultLanguage: 'en'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode, 
  initialLocale: Locale 
}) {
  const [t, setT] = useState<Translations>(staticTranslations[initialLocale]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch translations
        const { data: transData } = await supabase
          .from('translations')
          .select('content')
          .eq('lang', initialLocale)
          .single();
        
        if (transData && transData.content) {
          setT(prev => ({
            ...prev,
            ...transData.content
          }));
        }

        // Fetch settings
        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'general')
          .single();
        
        if (settingsData && settingsData.value) {
          setSettings(settingsData.value);
        }
      } catch (err) {
        console.error('Error fetching dynamic data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [initialLocale]);

  return (
    <LanguageContext.Provider value={{ locale: initialLocale, t, settings, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
