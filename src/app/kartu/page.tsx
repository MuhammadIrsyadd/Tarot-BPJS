"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { getAllCards } from "@/lib/utils";
import { getTarotImageUrl } from "@/components/TarotCard";
import { useSettings } from "@/context/SettingsContext";

export default function EncyclopediaPage() {
  const { lang } = useSettings();
  const allCards = getAllCards();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArcana, setFilterArcana] = useState<string>("all");

  const t = {
    back: lang === "id" ? "Kembali" : "Back",
    badge: lang === "id" ? "Arsip 78 Arcana" : "78 Arcana Codex",
    title: lang === "id" ? "Ensiklopedia Kartu" : "Card Encyclopedia",
    desc:
      lang === "id"
        ? "Temukan arti tersembunyi dari setiap kartu tarot dengan nuansa visual esoteris yang hidup dan modern."
        : "Discover the hidden meaning of each tarot card with a vivid, modern esoteric touch.",
    search_placeholder:
      lang === "id"
        ? "Cari nama kartu atau kata kunci..."
        : "Search card name or keyword...",
    filter_all: lang === "id" ? "Semua" : "All",
    filter_major: "Major",
    filter_minor: "Minor",
    no_results:
      lang === "id"
        ? "Tidak ada kartu yang ditemukan."
        : "No cards found.",
  };

  const filters = [
    { id: "all", label: t.filter_all },
    { id: "major", label: t.filter_major },
    { id: "minor", label: t.filter_minor },
    { id: "wands", label: "🜂 Wands" },
    { id: "cups", label: "🜄 Cups" },
    { id: "swords", label: "🜁 Swords" },
    { id: "pentacles", label: "🜃 Pentacles" },
  ];

  const filteredCards = Object.entries(allCards).filter(([, card]) => {
    const name = lang === "en" && card.name_en ? card.name_en : card.name;
    const keywords =
      lang === "en" && card.keywords_en ? card.keywords_en : card.keywords;

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      keywords.some((kw) =>
        kw.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      filterArcana === "all" ||
      card.arcana === filterArcana ||
      card.suit === filterArcana;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen px-6 py-8 md:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* Top Grimoire Header */}
        <div className="glass-panel mb-10 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Link
                href="/"
                className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-secondary transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t.back}</span>
              </Link>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                  {t.badge}
                </span>
              </div>
              <h1 className="mt-1 font-serif text-4xl font-bold leading-tight text-on-background md:text-5xl">
                {t.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
                {t.desc}
              </p>
            </div>

            <div className="relative w-full lg:w-[340px]">
              <Search className=" absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder={t.search_placeholder}
                className="w-full rounded-2xl border border-primary/25 bg-surface-container-lowest/70 py-3 pl-11 pr-4 text-sm text-on-background outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-primary/15 pt-5">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilterArcana(item.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    filterArcana === item.id
                      ? "gold-gradient text-on-primary"
                      : "border border-primary/15 bg-white/5 text-on-background/75 hover:border-primary/40 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-on-surface-variant">
              {filteredCards.length} / 78{" "}
              {lang === "id" ? "Kartu" : "Cards"}
            </span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredCards.map(([slug, card]) => {
            const name =
              lang === "en" && card.name_en ? card.name_en : card.name;
            const imgUrl = getTarotImageUrl(slug);

            return (
              <Link key={slug} href={`/kartu/${slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-panel-interactive group flex h-full flex-col justify-between overflow-hidden rounded-[24px] p-3"
                >
                  <div className="relative aspect-[3/5] w-full overflow-hidden rounded-2xl border border-primary/25 bg-surface-dim">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                        <span className="font-serif text-3xl text-primary">
                          #{card.number}
                        </span>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    <span className="absolute left-2.5 top-2 rounded-md border border-white/15 bg-black/60 px-2 py-0.5 text-[10px] font-bold text-secondary backdrop-blur-md">
                      #{card.number}
                    </span>
                  </div>

                  <div className="mt-3 px-1 text-center">
                    <h3 className="line-clamp-1 font-serif text-sm font-bold text-on-background transition-colors group-hover:text-primary">
                      {name}
                    </h3>
                    <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-on-surface-variant/75">
                      {card.arcana === "major"
                        ? "Major Arcana"
                        : card.suit || "Minor"}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="glass-panel py-20 text-center rounded-3xl">
            <p className="text-on-surface-variant">{t.no_results}</p>
          </div>
        )}
      </div>
    </main>
  );
}
