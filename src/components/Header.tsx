"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link href="/">
            <Image src="/logo.svg" alt="Tarot BPJS" width={48} height={48} className="logo" priority />
          </Link>
          <div>
            <p className="app-name">Tarot BPJS</p>
            <p className="app-tagline">Tarot tarot an by syd</p>
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
            Jurnal
          </Link>
          <Link href="/belajar" className="nav-link" onClick={() => setMenuOpen(false)}>
            Belajar
          </Link>
          <Link href="/kartu" className="nav-link" onClick={() => setMenuOpen(false)}>
            Kartu
          </Link>
          <Link href="/daily-reading" className="nav-link" onClick={() => setMenuOpen(false)}>
            Daily Reading
          </Link>
          <Link href="/spread" className="nav-link" onClick={() => setMenuOpen(false)}>
            Spread
          </Link>
          <Link href="/setting" className="nav-link" onClick={() => setMenuOpen(false)}>
            Setting
          </Link>
        </nav>
      </div>
    </header>
  );
}
