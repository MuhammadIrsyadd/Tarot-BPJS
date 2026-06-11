"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, setTheme, getLang, setLang } from '@/lib/storage';

export type Theme = 'cosmic' | 'emerald' | 'royal';
export type Lang = 'id' | 'en';

interface SettingsContextType {
  theme: Theme;
  lang: Lang;
  updateTheme: (theme: Theme) => void;
  updateLang: (lang: Lang) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<{ theme: Theme; lang: Lang }>({
    theme: 'cosmic',
    lang: 'id',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSettings({
        theme: getTheme() as Theme,
        lang: getLang() as Lang,
      });
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
  }, [settings.theme, mounted]);

  const updateTheme = (newTheme: Theme) => {
    setSettings(prev => ({ ...prev, theme: newTheme }));
    setTheme(newTheme);
  };

  const updateLang = (newLang: Lang) => {
    setSettings(prev => ({ ...prev, lang: newLang }));
    setLang(newLang);
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        theme: settings.theme, 
        lang: settings.lang, 
        updateTheme, 
        updateLang 
      }}
    >
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
