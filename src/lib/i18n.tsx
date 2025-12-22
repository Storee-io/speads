"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import id from '@/locales/id.json';

type Locale = 'en' | 'id';
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const translations = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Detect from cookie or browser
    const savedLocale = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1] as Locale;
    
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'id')) {
      setLocaleState(savedLocale);
    } else {
      // Auto-detect from browser/location (simplification: browser language)
      const browserLang = navigator.language.split('-')[0];
      const detectedLocale: Locale = browserLang === 'id' ? 'id' : 'en';
      setLocaleState(detectedLocale);
      document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
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
