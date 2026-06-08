"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Compass, Menu, X } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-transparent text-on-background">
      <section className="relative w-full min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(193,142,255,0.26),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(75,159,255,0.18),transparent_28%),linear-gradient(180deg,rgba(15,9,40,0.96),rgba(8,10,35,0.99))]">
        <header className="absolute inset-x-0 top-0 z-20 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 rounded-[36px] border border-white/10 bg-[linear-gradient(130deg,rgba(113,70,255,0.36),rgba(75,148,255,0.18),rgba(178,113,255,0.22))] px-6 py-5 shadow-[0_30px_80px_-50px_rgba(64,32,145,0.65)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-on-background shadow-[0_12px_40px_-30px_rgba(15,23,42,0.8)] backdrop-blur-xl">
              <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
              Arcana Mystica
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-background shadow-[0_10px_30px_-20px_rgba(15,23,42,0.6)] transition hover:bg-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <nav className="hidden items-center gap-3 text-sm font-semibold md:flex">
              <Link href="/jurnal" className="rounded-full bg-gradient-to-r from-primary/25 via-secondary/15 to-tertiary/10 px-4 py-2 text-on-background transition hover:from-primary/40 hover:via-secondary/30 hover:to-tertiary/25">Jurnal</Link>
              <Link href="/belajar" className="rounded-full bg-gradient-to-r from-secondary/25 via-primary/15 to-tertiary/10 px-4 py-2 text-on-background transition hover:from-secondary/40 hover:via-primary/30 hover:to-tertiary/25">Belajar</Link>
              <Link href="/kartu" className="rounded-full bg-gradient-to-r from-tertiary/25 via-primary/15 to-secondary/10 px-4 py-2 text-on-background transition hover:from-tertiary/40 hover:via-primary/30 hover:to-secondary/25">Kartu</Link>
              <Link href="/spread" className="rounded-full bg-gradient-to-r from-primary/25 via-secondary/15 to-tertiary/10 px-4 py-2 text-on-background transition hover:from-primary/40 hover:via-secondary/30 hover:to-tertiary/25">Spread</Link>
              <Link href="/setting" className="rounded-full bg-gradient-to-r from-secondary/25 via-primary/15 to-tertiary/10 px-4 py-2 text-on-background transition hover:from-secondary/40 hover:via-primary/30 hover:to-tertiary/25">Setting</Link>
            </nav>
          </div>
          {menuOpen && (
            <div className="mt-4 rounded-[28px] border border-white/10 bg-[#090b1d]/95 p-4 shadow-[0_30px_90px_-70px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden">
              <div className="flex flex-col gap-3 text-sm font-semibold">
                <Link href="/jurnal" className="block rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/15 px-4 py-3 text-on-background transition hover:bg-primary/30">Jurnal</Link>
                <Link href="/belajar" className="block rounded-2xl bg-gradient-to-r from-secondary/20 to-primary/15 px-4 py-3 text-on-background transition hover:bg-secondary/30">Belajar</Link>
                <Link href="/kartu" className="block rounded-2xl bg-gradient-to-r from-tertiary/20 to-secondary/15 px-4 py-3 text-on-background transition hover:bg-tertiary/30">Kartu</Link>
                <Link href="/spread" className="block rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/15 px-4 py-3 text-on-background transition hover:bg-primary/30">Spread</Link>
                <Link href="/setting" className="block rounded-2xl bg-gradient-to-r from-secondary/20 to-primary/15 px-4 py-3 text-on-background transition hover:bg-secondary/30">Setting</Link>
              </div>
            </div>
          )}
        </header>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(148,163,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid h-full max-w-[1400px] items-center gap-12 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col items-start justify-center gap-6 text-left">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-primary">
              Digital Divination
            </span>

            <h1 className="max-w-3xl font-display-lg text-[4rem] leading-[0.95] text-primary drop-shadow-[0_0_30px_rgba(156,119,255,0.35)] sm:text-[5rem]">
              Unveil Your Destiny
            </h1>

            <p className="max-w-xl text-on-surface-variant text-lg leading-9 sm:text-xl">
              Connect with ancient wisdom through a modern lens. Discover what the stars and cards hold for your journey today.
            </p>

            <div className="space-y-3">
              <div className="text-sm uppercase tracking-[0.35em] text-on-surface-variant">
                Pilihan Cepat
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/spread">
                  <button className="inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-secondary to-primary px-9 py-4 text-sm font-semibold text-on-primary shadow-[0_24px_80px_-50px_rgba(118,224,255,0.75)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-40px_rgba(118,224,255,0.9)]">
                    <Sparkles className="w-5 h-5" />
                    Start Reading
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="relative h-[680px] w-full max-w-[520px]">
              <motion.div
                animate={{ rotate: [2, -2, 2], y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 mx-auto h-[640px] w-[420px] rounded-[44px] bg-gradient-to-br from-surface-container via-surface to-surface-container-high shadow-[0_48px_160px_-90px_rgba(156,119,255,0.45)]"
              />

              <motion.div
                animate={{ rotate: [-4, 4, -4], y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 6.6, ease: "easeInOut" }}
                className="absolute inset-x-0 top-10 mx-auto h-[600px] w-[380px] rounded-[40px] border border-white/10 bg-gradient-to-tr from-[#171c38] via-[#0e1529] to-[#0b1224] shadow-[0_36px_110px_-68px_rgba(110,231,255,0.2)]"
              />

              <motion.div
                animate={{ rotate: [0, 6, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }}
                className="relative mx-auto h-[620px] w-[400px] overflow-hidden rounded-[46px] border border-white/10 bg-[#101a37] shadow-[0_42px_120px_-60px_rgba(156,119,255,0.5)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(156,119,255,0.24),transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(110,231,255,0.18),transparent_34%)]" />
                <div className="absolute inset-12 rounded-[36px] bg-gradient-to-b from-surface-container-high/90 via-surface-container/75 to-transparent border border-white/5" />
                <div className="absolute left-10 top-10 space-y-2 text-left text-white/70">
                  <p className="text-[11px] uppercase tracking-[0.45em]">Arcana</p>
                  <p className="text-3xl font-semibold leading-tight">Mystic Orb</p>
                </div>
                <div className="absolute inset-x-0 top-24 flex justify-center">
                  <div className="relative h-[220px] w-[220px] rounded-full bg-gradient-to-br from-primary/80 via-transparent to-transparent shadow-[0_0_60px_rgba(156,119,255,0.35)]">
                    <div className="absolute inset-14 rounded-full bg-white/5 blur-2xl" />
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-16 flex justify-center text-center px-8 text-sm text-white/70">
                  <p>Explore a crafted tarot experience with modern magic and immersive atmosphere.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
