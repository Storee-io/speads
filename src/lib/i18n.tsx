"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import id from '@/locales/id.json';
import { type Locale } from '@/i18n-config';
import { supabase } from '@/lib/supabase';

type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  loading: boolean;
}

const staticTranslations = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode, 
  initialLocale: Locale 
}) {
  const [t, setT] = useState<Translations>(staticTranslations[initialLocale]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOverrides() {
      try {
        const { data, error } = await supabase
          .from('translations')
          .select('content')
          .eq('lang', initialLocale)
          .single();
        
        if (data && data.content) {
          // Deep merge static and dynamic translations
          setT(prev => ({
            ...prev,
            ...data.content
          }));
        }
      } catch (err) {
        console.error('Error fetching dynamic translations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOverrides();
  }, [initialLocale]);

  return (
    <LanguageContext.Provider value={{ locale: initialLocale, t, loading }}>
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
