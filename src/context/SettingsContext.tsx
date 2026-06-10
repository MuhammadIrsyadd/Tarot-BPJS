"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, setTheme, getLang, setLang } from '@/lib/storage';

type Theme = 'cosmic' | 'emerald' | 'royal';
type Lang = 'id' | 'en';

interface SettingsContextType {
  theme: Theme;
  lang: Lang;
  updateTheme: (theme: Theme) => void;
  updateLang: (lang: Lang) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setInternalTheme] = useState<Theme>('cosmic');
  const [lang, setInternalLang] = useState<Lang>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setInternalTheme(getTheme() as Theme);
    setInternalLang(getLang() as Lang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const updateTheme = (newTheme: Theme) => {
    setInternalTheme(newTheme);
    setTheme(newTheme);
  };

  const updateLang = (newLang: Lang) => {
    setInternalLang(newLang);
    setLang(newLang);
  };

  return (
    <SettingsContext.Provider value={{ theme, lang, updateTheme, updateLang }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
