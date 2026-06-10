"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllCards } from "@/lib/utils";

import { useSettings } from "@/context/SettingsContext";

export default function EncyclopediaPage() {
  const { lang } = useSettings();
  const allCards = getAllCards();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArcana, setFilterArcana] = useState<string>("all");

  const t = {
    back: lang === 'id' ? 'Kembali' : 'Back',
    title: lang === 'id' ? 'Ensiklopedia Kartu' : 'Card Encyclopedia',
    desc: lang === 'id' ? 'Temukan arti tersembunyi dari setiap kartu tarot dengan nuansa visual yang lebih hidup dan modern.' : 'Discover the hidden meaning of each tarot card with a more vivid and modern visual touch.',
    search_placeholder: lang === 'id' ? 'Cari kartu...' : 'Search cards...',
    filter_all: lang === 'id' ? 'Semua' : 'All',
    filter_major: 'Major',
    filter_minor: 'Minor',
    no_results: lang === 'id' ? 'Tidak ada kartu yang ditemukan.' : 'No cards found.'
  };

  const filteredCards = Object.entries(allCards).filter(([ , card]) => {
    const name = (lang === 'en' && card.name_en) ? card.name_en : card.name;
    const keywords = (lang === 'en' && card.keywords_en) ? card.keywords_en : card.keywords;
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesArcana = filterArcana === "all" || card.arcana === filterArcana;
    return matchesSearch && matchesArcana;
  });

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="glass-panel-interactive p-8 rounded-3xl border border-secondary/20 shadow-[0_26px_80px_-40px_rgba(139,92,255,0.35)] mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-tertiary transition-colors mb-4">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm uppercase tracking-[0.35em]">{t.back}</span>
              </Link>
              <h1 className="text-5xl md:text-6xl font-serif text-on-background/95 leading-tight">{t.title}</h1>
              <p className="mt-3 max-w-2xl text-on-background/70">{t.desc}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-background/50" />
                <input 
                  type="text"
                  placeholder={t.search_placeholder}
                  className="w-full rounded-2xl border border-secondary/20 bg-white/5 px-12 py-3 text-on-background outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['all', 'major', 'minor'].map((value) => (
                  <button
                    key={value}
                    onClick={() => setFilterArcana(value)}
                    className={`rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${filterArcana === value ? 'bg-primary text-on-primary shadow-[0_10px_30px_-20px_rgba(139,92,255,0.55)]' : 'bg-white/5 text-on-background/70 hover:bg-white/10'}`}
                  >
                    {value === 'all' ? t.filter_all : value === 'major' ? t.filter_major : t.filter_minor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredCards.map(([slug, card]) => {
            const name = (lang === 'en' && card.name_en) ? card.name_en : card.name;
            return (
              <Link key={slug} href={`/kartu/${slug}`}> 
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group rounded-[28px] border border-secondary/15 bg-white/5 p-4 shadow-[0_20px_50px_-30px_rgba(17,24,39,0.8)] transition-all duration-300 hover:border-primary/40 hover:bg-white/10"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-secondary/15 bg-gradient-to-br from-surface-container to-surface-container-high p-6 shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,255,0.24),transparent_40%)]" />
                    <div className="relative flex h-[180px] flex-col items-center justify-center gap-3 text-center">
                      <span className="text-primary text-4xl font-serif opacity-90">#{card.number}</span>
                      <h3 className="text-on-background font-semibold text-base leading-tight group-hover:text-primary transition-colors">{name}</h3>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-on-background/50">{card.arcana}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-24 opacity-60">
            <p className="text-on-background/80">{t.no_results}</p>
          </div>
        )}
      </div>
    </main>
  );
}
