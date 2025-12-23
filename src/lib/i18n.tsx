"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import id from '@/locales/id.json';
import { type Locale } from '@/i18n-config';

type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
}

const translations = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode, 
  initialLocale: Locale 
}) {
  // Use initialLocale as the source of truth from the server/URL
  const [locale] = useState<Locale>(initialLocale);

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale] }}>
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
