"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  Trash2,
  Globe,
  Palette,
  ShieldCheck,
  Check,
  Sparkles,
} from "lucide-react";
import { clearAllData } from "@/lib/storage";
import { useSettings, type Theme, type Lang } from "@/context/SettingsContext";
import { UI_STRINGS } from "@/lib/translations";

export default function SettingsPage() {
  const { theme, lang, updateTheme, updateLang } = useSettings();
  const t = UI_STRINGS[lang].settings;

  const handleReset = () => {
    if (confirm(t.reset_confirm)) {
      clearAllData();
      alert(
        lang === "id"
          ? "Semua data telah dihapus."
          : "All local data has been cleared."
      );
      window.location.reload();
    }
  };

  const themes: {
    id: Theme;
    name: string;
    subtitle: string;
    bgHex: string;
    primaryHex: string;
    secondaryHex: string;
  }[] = [
    {
      id: "cosmic",
      name: "Cosmic",
      subtitle: lang === "id" ? "Nebula Ungu & Sian" : "Violet & Astral Cyan",
      bgHex: "#0c1433",
      primaryHex: "#c18eff",
      secondaryHex: "#76e0ff",
    },
    {
      id: "emerald",
      name: "Emerald",
      subtitle: lang === "id" ? "Giok & Emas Alkimia" : "Jade & Alchemical Gold",
      bgHex: "#061a13",
      primaryHex: "#34d399",
      secondaryHex: "#fbbf24",
    },
    {
      id: "royal",
      name: "Royal",
      subtitle: lang === "id" ? "Merah Delima & Emas" : "Crimson & Imperial Gold",
      bgHex: "#19060b",
      primaryHex: "#fb7185",
      secondaryHex: "#fcd34d",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-8 md:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="glass-panel mb-10 rounded-3xl p-6 sm:p-8">
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{lang === "id" ? "Kembali" : "Back"}</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <SettingsIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-on-background sm:text-4xl">
                {t.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Theme Alchemy Selection */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-primary">
              <Palette className="h-5 w-5 text-secondary" /> {t.appearance}
            </h2>
            <p className="mb-6 text-xs text-on-surface-variant">
              {t.deck_theme}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {themes.map((item) => {
                const isSelected = theme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateTheme(item.id)}
                    className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/15 shadow-[0_0_30px_var(--bg-glow-1)]"
                        : "border-white/10 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    {/* Swatch Preview */}
                    <div className="mb-4 flex items-center gap-2">
                      <span
                        className="h-7 w-7 rounded-full border border-white/20 shadow-md"
                        style={{ backgroundColor: item.bgHex }}
                      />
                      <span
                        className="h-7 w-7 -ml-3 rounded-full border border-white/20 shadow-md"
                        style={{ backgroundColor: item.primaryHex }}
                      />
                      <span
                        className="h-7 w-7 -ml-3 rounded-full border border-white/20 shadow-md"
                        style={{ backgroundColor: item.secondaryHex }}
                      />
                    </div>

                    <div>
                      <span className="block font-serif text-lg font-bold text-on-background">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-on-surface-variant">
                        {item.subtitle}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selection */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-primary">
              <Globe className="h-5 w-5 text-secondary" /> {t.language}
            </h2>
            <p className="mb-6 text-xs text-on-surface-variant">
              {t.interpretation_lang}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(
                [
                  {
                    id: "id",
                    name: "Bahasa Indonesia",
                    desc: "Tafsir & antarmuka dalam Bahasa Indonesia",
                  },
                  {
                    id: "en",
                    name: "English",
                    desc: "Oracle interpretations & UI in English",
                  },
                ] as { id: Lang; name: string; desc: string }[]
              ).map((item) => {
                const isSelected = lang === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateLang(item.id)}
                    className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/15 shadow-[0_0_30px_var(--bg-glow-1)]"
                        : "border-white/10 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    <span className="block font-serif text-lg font-bold text-on-background">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-xs text-on-surface-variant">
                      {item.desc}
                    </span>
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Data Privacy */}
          <div className="glass-panel rounded-3xl border border-red-500/25 p-6 sm:p-8">
            <h2 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-red-400">
              <ShieldCheck className="h-5 w-5" /> {t.data_privacy}
            </h2>
            <p className="mb-6 text-sm text-on-surface-variant">
              {t.privacy_desc}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/35 bg-red-500/10 py-3.5 text-xs font-bold uppercase tracking-widest text-red-300 transition hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              {t.clear_data}
            </button>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-center text-xs uppercase tracking-[0.28em] text-on-surface-variant/50">
          <Sparkles className="h-3.5 w-3.5 text-primary/50" />
          <span>Arcana Mystica — Astral Grimoire Edition</span>
        </div>
      </div>
    </main>
  );
}
