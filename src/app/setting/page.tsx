"use client";

import Link from "next/link";
import { ArrowLeft, Settings as SettingsIcon, Trash2, Globe, Palette, ShieldCheck, Check } from "lucide-react";
import { clearAllData } from "@/lib/storage";
import { useSettings, type Theme, type Lang } from "@/context/SettingsContext";
import { UI_STRINGS } from "@/lib/translations";

export default function SettingsPage() {
  const { theme, lang, updateTheme, updateLang } = useSettings();
  const t = UI_STRINGS[lang].settings;

  const handleReset = () => {
    if (confirm(t.reset_confirm)) {
      clearAllData();
      alert("Semua data telah dihapus.");
      window.location.reload();
    }
  };

  const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'cosmic', name: 'Cosmic', color: 'bg-[#15204f]' },
    { id: 'emerald', name: 'Emerald', color: 'bg-[#0a2e1f]' },
    { id: 'royal', name: 'Royal', color: 'bg-[#2d0a0a]' },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-2xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-12">
          <ArrowLeft className="w-5 h-5" />
          <span>{lang === 'id' ? 'Kembali' : 'Back'}</span>
        </Link>

        <h1 className="text-4xl font-serif text-primary mb-8 flex items-center gap-4">
          <SettingsIcon className="w-10 h-10" />
          {t.title}
        </h1>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-primary/10">
            <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5" /> {t.appearance}
            </h2>
            <div className="space-y-4">
              <span className="text-sm opacity-60">{t.deck_theme}</span>
              <div className="grid grid-cols-3 gap-4">
                {themes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateTheme(item.id)}
                    className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all ${
                      theme === item.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`mb-2 h-4 w-4 rounded-full ${item.color}`} />
                    <span className="text-sm font-bold">{item.name}</span>
                    {theme === item.id && <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-primary/10">
            <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" /> {t.language}
            </h2>
            <div className="space-y-4">
              <span className="text-sm opacity-60">{t.interpretation_lang}</span>
              <div className="grid grid-cols-2 gap-4">
                {([
                  { id: 'id', name: 'Bahasa Indonesia' },
                  { id: 'en', name: 'English' }
                ] as { id: Lang; name: string }[]).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateLang(item.id)}
                    className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                      lang === item.id ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-sm font-bold">{item.name}</span>
                    {lang === item.id && <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-red-500/20">
            <h2 className="text-xl font-serif text-red-400 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> {t.data_privacy}
            </h2>
            <p className="text-sm text-on-background/60 mb-6">
              {t.privacy_desc}
            </p>
            <button 
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 text-sm font-bold"
            >
              <Trash2 className="w-4 h-4" />
              {t.clear_data}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center opacity-30 text-xs uppercase tracking-[0.2em]">
          Arcana Mystica v2.0.0
        </div>
      </div>
    </main>
  );
}
