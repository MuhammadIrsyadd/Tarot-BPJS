"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { UI_STRINGS } from "@/lib/translations";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useSettings();
  const t = UI_STRINGS[lang].nav;

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link href="/">
            <Image src="/logo.svg" alt="Tarot BPJS" width={48} height={48} className="logo" priority />
          </Link>
          <div>
            <p className="app-name">Arcana Mystica</p>
            <p className="app-tagline">{lang === 'id' ? 'Platform ramalan modern' : 'Modern divination platform'}</p>
          </div>
        </div>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`site-nav${menuOpen ? " open" : ""}`}>
          <Link href="/jurnal" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.jurnal}
          </Link>
          <Link href="/belajar" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.belajar}
          </Link>
          <Link href="/kartu" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.kartu}
          </Link>
          <Link href="/daily-reading" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.daily}
          </Link>
          <Link href="/spread" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.spread}
          </Link>
          <Link href="/setting" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t.setting}
          </Link>
        </nav>
      </div>
    </header>
  );
}
