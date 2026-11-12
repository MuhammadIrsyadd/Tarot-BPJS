"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft, RefreshCw, Eye, BookMarked } from "lucide-react";
import Link from "next/link";
import { SPREADS, SpreadType } from "@/lib/spreads";
import { getRandomCard } from "@/lib/utils";
import { TarotCardData } from "@/lib/types";
import TarotCard from "@/components/TarotCard";
import InterpretationPanel from "@/components/InterpretationPanel";
import ReadingSummary from "@/components/ReadingSummary";
import { saveReading } from "@/lib/storage";
import { generateConclusion } from "@/lib/interpretation";
import { UI_STRINGS } from "@/lib/translations";
import { useSettings } from "@/context/SettingsContext";

function SpreadGeometryPreview({ spreadId }: { spreadId: string }) {
  switch (spreadId) {
    case "one-card":
      return (
        <svg viewBox="0 0 120 70" className="h-16 w-28 text-primary">
          <circle cx="60" cy="35" r="28" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.5" />
          <rect x="49" y="15" width="22" height="38" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="60" cy="34" r="3" fill="currentColor" />
        </svg>
      );
    case "three-cards":
      return (
        <svg viewBox="0 0 120 70" className="h-16 w-28 text-primary">
          <line x1="25" y1="35" x2="95" y2="35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
          {[22, 50, 78].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={17}
              width="20"
              height="34"
              rx="3.5"
              fill="currentColor"
              fillOpacity={i === 1 ? "0.25" : "0.12"}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      );
    case "love-spread":
      return (
        <svg viewBox="0 0 120 70" className="h-16 w-28 text-tertiary">
          <polygon points="32,42 88,42 60,18" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
          <rect x="20" y="24" width="18" height="30" rx="3" transform="rotate(-10 29 39)" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
          <rect x="82" y="24" width="18" height="30" rx="3" transform="rotate(10 91 39)" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
          <rect x="51" y="10" width="18" height="30" rx="3" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 70" className="h-16 w-28 text-secondary">
          <polygon points="60,6 104,35 60,64 16,35" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.5" />
          <rect x="53" y="4" width="14" height="20" rx="2" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1" />
          {[22, 43, 64, 85].map((x, i) => (
            <rect key={i} x={x} y="25" width="13" height="20" rx="2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1" />
          ))}
          <rect x="53" y="46" width="14" height="20" rx="2" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
  }
}

export default function SpreadPage() {
  const { lang } = useSettings();
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [reading, setReading] = useState<{
    cards: {
      slug: string;
      card: TarotCardData;
      isReversed: boolean;
      revealed: boolean;
    }[];
    isShuffling: boolean;
  } | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [isSaved, setIsSaved] = useState(false);

  const t = {
    back: lang === "id" ? "Kembali" : "Back",
    choose_badge: lang === "id" ? "Altar Ramalan" : "Divination Altar",
    choose: lang === "id" ? "Pilih Tebaran Tarot" : "Choose Tarot Spread",
    choose_desc:
      lang === "id"
        ? "Setiap pola tebaran membuka sudut pandang berbeda terhadap perjalanan jiwamu."
        : "Each sacred geometry layout illuminates a distinct facet of your journey.",
    shuffling:
      lang === "id"
        ? "Menyelaraskan Energi & Mengocok Kartu..."
        : "Aligning Energy & Shuffling the Arcana...",
    save: lang === "id" ? "Simpan ke Jurnal Bacaan" : "Save to Reading Journal",
    saved: lang === "id" ? "Sesi tersimpan di Jurnal!" : "Session saved to Journal!",
    view_journal: lang === "id" ? "Lihat Jurnal" : "View Journal",
    cards_label: lang === "id" ? "Kartu" : "Cards",
    reveal_all: lang === "id" ? "Buka Semua Kartu" : "Reveal All Cards",
    tap_hint:
      lang === "id"
        ? "Klik kartu untuk membuka tabir atau melihat tafsirnya"
        : "Click a card to reveal or inspect its oracle",
    reset: lang === "id" ? "Ganti Tebaran" : "Change Spread",
  };

  const allRevealed = useMemo(() => {
    return (
      !!reading &&
      reading.cards.length > 0 &&
      reading.cards.every((c) => c.revealed)
    );
  }, [reading]);

  const revealedCount = useMemo(() => {
    return reading ? reading.cards.filter((c) => c.revealed).length : 0;
  }, [reading]);

  const conclusion = useMemo(() => {
    if (!allRevealed || !reading || !selectedSpread) {
      return null;
    }
    const cardsForConclusion = reading.cards.map((c, i) => ({
      card: c.card,
      isReversed: c.isReversed,
      positionName: selectedSpread.positions[i],
    }));
    return generateConclusion(cardsForConclusion, lang);
  }, [allRevealed, reading, selectedSpread, lang]);

  const handleSelectSpread = (spread: SpreadType) => {
    setSelectedSpread(spread);
    setSelectedCardIndex(null);
    setIsSaved(false);
    setReading({
      cards: [],
      isShuffling: true,
    });

    setTimeout(() => {
      const drawnCards = [];
      for (let i = 0; i < spread.cardsCount; i++) {
        drawnCards.push({ ...getRandomCard(), revealed: false });
      }
      setReading({
        cards: drawnCards,
        isShuffling: false,
      });
    }, 1800);
  };

  const handleSave = () => {
    if (!reading || !selectedSpread) return;

    const spreadName =
      (UI_STRINGS[lang].spreads as unknown as Record<string, string>)[
        selectedSpread.name
      ] || selectedSpread.name;
    const positions = selectedSpread.positions.map(
      (p) =>
        (
          UI_STRINGS[lang].spreads.positions as unknown as Record<
            string,
            string
          >
        )[p] || p
    );

    saveReading({
      spreadName: spreadName,
      cards: reading.cards.map((c, i) => ({
        slug: c.slug,
        isReversed: c.isReversed,
        positionName: positions[i],
      })),
    });

    setIsSaved(true);
  };

  const handleRevealCard = (index: number) => {
    if (!reading) return;

    if (reading.cards[index].revealed) {
      setSelectedCardIndex(index);
      return;
    }

    const newCards = [...reading.cards];
    newCards[index].revealed = true;
    setReading({ ...reading, cards: newCards });
    setSelectedCardIndex(index);
  };

  const handleRevealAll = () => {
    if (!reading) return;
    const newCards = reading.cards.map((c) => ({ ...c, revealed: true }));
    setReading({ ...reading, cards: newCards });
    if (selectedCardIndex === null) setSelectedCardIndex(0);
  };

  const reset = () => {
    setSelectedSpread(null);
    setReading(null);
    setSelectedCardIndex(null);
    setIsSaved(false);
  };

  return (
    <main className="min-h-screen flex flex-col px-6 py-8 md:px-12 text-on-background">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Sanctuary Bar */}
        <div className="glass-panel mb-10 flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.back}</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-on-background sm:text-4xl">
              {selectedSpread
                ? (
                    UI_STRINGS[lang].spreads as unknown as Record<
                      string,
                      string
                    >
                  )[selectedSpread.name] || selectedSpread.name
                : t.choose}
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              {selectedSpread ? t.tap_hint : t.choose_desc}
            </p>
          </div>

          {selectedSpread && (
            <div className="flex flex-wrap items-center gap-3">
              {!reading?.isShuffling && !allRevealed && (
                <button
                  type="button"
                  onClick={handleRevealAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-secondary/35 bg-secondary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-secondary transition hover:bg-secondary/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t.reveal_all}</span>
                </button>
              )}
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-on-background/80 hover:border-primary/60 hover:text-on-background transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.reset}</span>
              </button>
            </div>
          )}
        </div>

        {!selectedSpread ? (
          /* Spread Selection Grid with Visual SVG Formations */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SPREADS.map((spread, idx) => {
              const displayName =
                (UI_STRINGS[lang].spreads as unknown as Record<string, string>)[
                  spread.name
                ] || spread.name;
              const displayDesc =
                (
                  UI_STRINGS[lang].spreads.descriptions as unknown as Record<
                    string,
                    string
                  >
                )[spread.id] || spread.description;
              return (
                <motion.button
                  key={spread.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectSpread(spread)}
                  className="glass-panel-interactive group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
                          {spread.cardsCount} {t.cards_label}
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-on-background group-hover:text-primary transition-colors">
                          {displayName}
                        </h3>
                      </div>
                    </div>

                    {/* Visual Spread Formation SVG */}
                    <div className="rounded-2xl border border-white/10 bg-surface-container-lowest/60 p-2">
                      <SpreadGeometryPreview spreadId={spread.id} />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-on-surface-variant">
                    {displayDesc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {spread.positions.map((pos, i) => {
                      const posName =
                        (
                          UI_STRINGS[lang].spreads.positions as unknown as Record<
                            string,
                            string
                          >
                        )[pos] || pos;
                      return (
                        <span
                          key={i}
                          className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] text-on-surface-variant"
                        >
                          {i + 1}. {posName}
                        </span>
                      );
                    })}
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* Ritual Altar Table */}
            <div className="glass-panel relative flex flex-col items-center overflow-hidden rounded-[36px] p-6 sm:p-10">
              {/* Progress Indicator */}
              {!reading?.isShuffling && reading && (
                <div className="mb-8 flex items-center gap-3 rounded-full border border-primary/25 bg-surface-container-lowest/80 px-5 py-1.5 text-xs">
                  <span className="font-bold text-primary">
                    {revealedCount} / {reading.cards.length}
                  </span>
                  <span className="text-on-surface-variant">
                    {lang === "id" ? "Kartu Terbuka" : "Cards Revealed"}
                  </span>
                </div>
              )}

              <div className="flex min-h-[400px] w-full flex-wrap items-center justify-center gap-8">
                {reading?.isShuffling ? (
                  /* 3D Vortex Shuffle Animation */
                  <div className="flex flex-col items-center gap-8 py-12">
                    <div className="relative flex h-80 w-64 items-center justify-center">
                      {/* Rotating Sacred Circle Under Deck */}
                      <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-dashed border-primary/40 animate-spin-slow" />
                      <div className="pointer-events-none absolute h-56 w-56 rounded-full border border-secondary/30 animate-spin-reverse-slow" />

                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            x: [0, (i % 2 === 0 ? -1 : 1) * 42, (i % 2 === 0 ? 1 : -1) * 28, 0],
                            y: [0, -18, 14, 0],
                            rotateZ: [0, (i % 2 === 0 ? -12 : 12), (i % 2 === 0 ? 8 : -8), 0],
                            scale: [1, 1.04, 0.98, 1],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.9,
                            delay: i * 0.08,
                            ease: "easeInOut",
                          }}
                          className="absolute h-72 w-44 rounded-3xl border border-primary/50 bg-gradient-to-b from-surface-container-high via-surface-dim to-surface-container shadow-[0_20px_50px_rgba(0,0,0,0.75)] flex items-center justify-center"
                          style={{ zIndex: 10 - i }}
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-secondary/40 bg-surface-dim/80">
                            <span className="text-3xl text-primary">✧</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="animate-pulse text-xs font-bold uppercase tracking-[0.35em] text-secondary">
                      {t.shuffling}
                    </p>
                  </div>
                ) : (
                  reading?.cards.map((cardState, index) => {
                    const positionLabel =
                      (
                        UI_STRINGS[lang].spreads.positions as unknown as Record<
                          string,
                          string
                        >
                      )[selectedSpread.positions[index]] ||
                      selectedSpread.positions[index];
                    const isSelected = selectedCardIndex === index;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex flex-col items-center gap-4 rounded-3xl p-4 transition-all ${
                          isSelected
                            ? "border border-primary/50 bg-primary/10 shadow-[0_0_40px_var(--bg-glow-1)]"
                            : "border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-[10px] font-bold text-primary">
                            {index + 1}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                            {positionLabel}
                          </span>
                        </div>

                        <TarotCard
                          card={cardState.card}
                          slug={cardState.slug}
                          isReversed={cardState.isReversed}
                          isRevealed={cardState.revealed}
                          onReveal={() => handleRevealCard(index)}
                        />
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Interpretation & Synthesis Area */}
            <div className="mx-auto w-full max-w-4xl space-y-12">
              <AnimatePresence mode="wait">
                {selectedCardIndex !== null &&
                  reading &&
                  reading.cards[selectedCardIndex]?.revealed && (
                    <motion.div
                      key={`card-${selectedCardIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <InterpretationPanel
                        card={reading.cards[selectedCardIndex].card}
                        isReversed={reading.cards[selectedCardIndex].isReversed}
                        positionName={
                          (
                            UI_STRINGS[lang].spreads
                              .positions as unknown as Record<string, string>
                          )[selectedSpread.positions[selectedCardIndex]] ||
                          selectedSpread.positions[selectedCardIndex]
                        }
                      />
                    </motion.div>
                  )}
              </AnimatePresence>

              <AnimatePresence>
                {allRevealed && conclusion && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <ReadingSummary
                      vibe={conclusion.vibe}
                      summary={conclusion.summary}
                      finalAdvice={conclusion.finalAdvice}
                    />

                    <div className="flex flex-col items-center gap-4 pb-12">
                      {!isSaved ? (
                        <button
                          type="button"
                          onClick={handleSave}
                          className="gold-gradient inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
                        >
                          <BookMarked className="w-4 h-4" />
                          <span>{t.save}</span>
                        </button>
                      ) : (
                        <div className="glass-panel flex flex-col items-center gap-4 rounded-2xl p-6">
                          <p className="flex items-center gap-2 font-bold text-primary">
                            <Sparkles className="w-5 h-5" /> {t.saved}
                          </p>
                          <Link
                            href="/jurnal"
                            className="rounded-full border border-primary/40 bg-primary/15 px-6 py-2 text-xs font-bold uppercase tracking-widest text-on-background transition hover:bg-primary/25"
                          >
                            {t.view_journal}
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
