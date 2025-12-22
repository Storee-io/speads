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

export function LanguageProvider({ children, initialLocale }: { children: React.ReactNode, initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'en');

  useEffect(() => {
    if (!initialLocale) {
      // Only detect if initialLocale wasn't provided by server
      const savedLocale = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1] as Locale;
      
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'id')) {
        setLocaleState(savedLocale);
      } else {
        const browserLang = navigator.language.split('-')[0];
        const detectedLocale: Locale = browserLang === 'id' ? 'id' : 'en';
        setLocaleState(detectedLocale);
        document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;
      }
    }
  }, [initialLocale]);

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
