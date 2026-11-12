"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  Compass,
  Globe,
  Library,
  Menu,
  Palette,
  ScrollText,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useSettings, type Theme } from "@/context/SettingsContext";
import { UI_STRINGS } from "@/lib/translations";

const THEME_ORDER: Theme[] = ["cosmic", "emerald", "royal"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, theme, updateLang, updateTheme } = useSettings();
  const t = UI_STRINGS[lang].nav;

  const navItems = [
    { href: "/spread", label: t.spread, icon: Sparkles },
    { href: "/daily-reading", label: t.daily, icon: CalendarDays },
    { href: "/kartu", label: t.kartu, icon: Library },
    { href: "/jurnal", label: t.jurnal, icon: ScrollText },
    { href: "/belajar", label: t.belajar, icon: BookOpen },
    { href: "/setting", label: t.setting, icon: Settings },
  ];

  const cycleTheme = () => {
    const nextIndex = (THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length;
    updateTheme(THEME_ORDER[nextIndex]);
  };

  const toggleLang = () => {
    updateLang(lang === "id" ? "en" : "id");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel relative flex h-16 items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300">
          {/* Subtle top highlight line */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3.5 focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 shadow-[0_0_25px_rgba(193,142,255,0.25)] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Arcana Mystica"
                width={30}
                height={30}
                className="drop-shadow-[0_0_12px_rgba(193,142,255,0.65)] transition-transform duration-500 group-hover:rotate-12"
                priority
              />
              <span className="pointer-events-none absolute -inset-0.5 rounded-xl border border-secondary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-[0.12em] text-on-background transition-colors group-hover:text-primary">
                  ARCANA MYSTICA
                </span>
                <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary xl:inline-block">
                  BPJS
                </span>
              </div>
              <p className="text-[11px] tracking-[0.06em] text-on-surface-variant/80">
                {lang === "id"
                  ? "Bacaan Petunjuk Jiwa Sejati"
                  : "Sanctuary of Digital Divination"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? "text-on-primary"
                      : "text-on-background/75 hover:text-on-background"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="astral-nav-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="gold-gradient absolute inset-0 -z-10 rounded-xl"
                    />
                  )}
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Alchemy Controls (Theme & Language) + Mobile Trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleTheme}
              title={
                lang === "id"
                  ? `Ganti Tema (${theme.toUpperCase()})`
                  : `Switch Theme (${theme.toUpperCase()})`
              }
              className="flex h-9 items-center gap-1.5 rounded-xl border border-primary/25 bg-white/5 px-3 text-xs font-semibold text-on-background/85 transition hover:border-primary/50 hover:bg-primary/15 hover:text-primary"
            >
              <Palette className="h-3.5 w-3.5 text-primary" />
              <span className="hidden capitalize sm:inline">{theme}</span>
            </button>

            <button
              type="button"
              onClick={toggleLang}
              title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-secondary/25 bg-white/5 px-2.5 text-xs font-bold uppercase tracking-wider text-on-background/85 transition hover:border-secondary/50 hover:bg-secondary/15 hover:text-secondary"
            >
              <Globe className="h-3.5 w-3.5 text-secondary" />
              <span>{lang}</span>
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-white/5 text-on-background transition hover:border-primary/50 hover:bg-primary/15 lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-panel mt-2 grid grid-cols-2 gap-2 rounded-2xl p-3 sm:grid-cols-3 lg:hidden"
            >
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                  pathname === "/"
                    ? "gold-gradient text-on-primary"
                    : "bg-white/5 text-on-background/80 hover:bg-white/10"
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>{lang === "id" ? "Beranda" : "Sanctuary"}</span>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                      isActive
                        ? "gold-gradient text-on-primary"
                        : "bg-white/5 text-on-background/80 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
