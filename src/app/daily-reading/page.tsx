"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  RefreshCw,
  Save,
  Shuffle,
  Sparkles,
} from "lucide-react";
import TarotCard from "@/components/TarotCard";
import InterpretationPanel from "@/components/InterpretationPanel";
import ReadingSummary from "@/components/ReadingSummary";
import { generateConclusion } from "@/lib/interpretation";
import { saveReading } from "@/lib/storage";
import { SPREADS } from "@/lib/spreads";
import { getAllCards, getCardBySlug } from "@/lib/utils";
import { TarotCardData } from "@/lib/types";
import { UI_STRINGS } from "@/lib/translations";
import { useSettings } from "@/context/SettingsContext";

type DrawnCard = {
  slug: string;
  card: TarotCardData;
  isReversed: boolean;
};

const dailySpread = SPREADS.find((spread) => spread.id === "daily-six");

function createShuffledDeck() {
  const entries = Object.entries(getAllCards());
  const slugs = entries.map(([slug]) => slug);

  for (let i = slugs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slugs[i], slugs[j]] = [slugs[j], slugs[i]];
  }

  return slugs;
}

export default function DailyReadingPage() {
  const { lang } = useSettings();

  const DAILY_POSITIONS = useMemo(() => {
    const basePositions = [
      {
        id: "Atas - Fokus Hari Ini",
        compactLabel: lang === "id" ? "Atas · Fokus" : "Top · Focus",
        shortName: lang === "id" ? "Atas · Fokus" : "Top · Focus",
      },
      {
        id: "Utama 1 - Energi Pagi",
        compactLabel: lang === "id" ? "Utama 1 · Pagi" : "Main 1 · Morning",
        shortName: lang === "id" ? "Utama 1" : "Main 1",
      },
      {
        id: "Utama 2 - Tantangan",
        compactLabel: lang === "id" ? "Utama 2 · Tantangan" : "Main 2 · Challenge",
        shortName: lang === "id" ? "Utama 2" : "Main 2",
      },
      {
        id: "Utama 3 - Peluang",
        compactLabel: lang === "id" ? "Utama 3 · Peluang" : "Main 3 · Opportunity",
        shortName: lang === "id" ? "Utama 3" : "Main 3",
      },
      {
        id: "Utama 4 - Tindakan Terbaik",
        compactLabel: lang === "id" ? "Utama 4 · Aksi" : "Main 4 · Action",
        shortName: lang === "id" ? "Utama 4" : "Main 4",
      },
      {
        id: "Bawah - Pesan Tersembunyi",
        compactLabel: lang === "id" ? "Bawah · Bawah Sadar" : "Bottom · Subconscious",
        shortName: lang === "id" ? "Bawah · Refleksi" : "Bottom · Root",
      },
    ];

    return basePositions.map((pos) => ({
      ...pos,
      name:
        (UI_STRINGS[lang].spreads.positions as Record<string, string>)[
          pos.id
        ] || pos.id,
      meaning: lang === "id" ? getMeaningID(pos.id) : getMeaningEN(pos.id),
    }));
  }, [lang]);

  const [deck, setDeck] = useState<string[]>(() => createShuffledDeck());
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [isSaved, setIsSaved] = useState(false);

  const t = {
    back: lang === "id" ? "Kembali" : "Back",
    title: "Daily Reading",
    desc:
      lang === "id"
        ? "Enam kartu harian dengan susunan Atas, empat kartu Utama, dan Bawah yang saling terhubung dalam jaringan konstelasi."
        : "Six daily cards arranged in Top, four Main cards, and Bottom linked by an awakening constellation circuit.",
    shuffle: lang === "id" ? "Kocok Ulang" : "Reshuffle",
    deck_label: lang === "id" ? "Altar Deck Harian" : "Daily Altar Deck",
    cards_opened: lang === "id" ? "kartu terbuka" : "cards revealed",
    draw_card: lang === "id" ? "Ambil Kartu Berikutnya" : "Draw Next Card",
    shuffling: lang === "id" ? "Mengocok..." : "Shuffling...",
    all_drawn: lang === "id" ? "Konstelasi Lengkap" : "Constellation Complete",
    save: lang === "id" ? "Simpan ke Jurnal" : "Save to Journal",
    saved: lang === "id" ? "Tersimpan" : "Saved",
    shuffle_again: lang === "id" ? "Kocok Lagi" : "Reshuffle",
    save_reading: lang === "id" ? "Simpan Bacaan" : "Save Reading",
    already_saved: lang === "id" ? "Sudah Tersimpan" : "Already Saved",
  };

  const allDrawn = drawnCards.length === DAILY_POSITIONS.length;
  const selectedCard =
    selectedCardIndex !== null ? drawnCards[selectedCardIndex] : null;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsShuffling(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const conclusion = useMemo(() => {
    if (!allDrawn) return null;

    return generateConclusion(
      drawnCards.map((card, index) => ({
        card: card.card,
        isReversed: card.isReversed,
        positionName: DAILY_POSITIONS[index].name,
      })),
      lang
    );
  }, [allDrawn, drawnCards, lang, DAILY_POSITIONS]);

  const shuffleDeck = () => {
    setIsShuffling(true);
    setSelectedCardIndex(null);
    setIsSaved(false);
    setDrawnCards([]);
    setDeck(createShuffledDeck());

    window.setTimeout(() => {
      setIsShuffling(false);
    }, 1000);
  };

  const drawNextCard = () => {
    if (isShuffling || allDrawn || deck.length === 0) return;

    const [nextSlug, ...remainingDeck] = deck;
    const nextCard = getCardBySlug(nextSlug);
    if (!nextCard) return;

    const nextIndex = drawnCards.length;
    setDeck(remainingDeck);
    setDrawnCards((cards) => [
      ...cards,
      {
        slug: nextSlug,
        card: nextCard,
        isReversed: Math.random() > 0.7,
      },
    ]);
    setSelectedCardIndex(nextIndex);
    setIsSaved(false);
  };

  const saveDailyReading = () => {
    if (!allDrawn) return;

    saveReading({
      spreadName: dailySpread?.name ?? "Daily Reading",
      cards: drawnCards.map((card, index) => ({
        slug: card.slug,
        isReversed: card.isReversed,
        positionName: DAILY_POSITIONS[index].name,
      })),
    });

    setIsSaved(true);
  };

  const renderCardSlot = (index: number) => {
    const position = DAILY_POSITIONS[index];
    const card = drawnCards[index];
    const active = selectedCardIndex === index;
    const isNextToDraw = drawnCards.length === index;

    return (
      <motion.div
        key={position.name}
        layout
        onClick={() => {
          if (card) {
            setSelectedCardIndex(index);
          } else if (isNextToDraw && !isShuffling) {
            drawNextCard();
          }
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 flex min-h-[430px] flex-col items-center justify-between gap-4 rounded-3xl border p-4 text-center backdrop-blur-xl transition-all ${
          active
            ? "border-primary bg-primary/15 shadow-[0_0_50px_var(--bg-glow-1)]"
            : card
            ? "border-primary/25 bg-surface-container-low/70 hover:border-secondary/55 cursor-pointer"
            : isNextToDraw
            ? "border-secondary/45 bg-secondary/5 cursor-pointer hover:bg-secondary/10"
            : "border-white/10 bg-surface-container-lowest/50 opacity-65"
        }`}
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            <span>{index + 1}</span>
            <span>·</span>
            <span>{position.shortName}</span>
          </div>
          <p className="mx-auto max-w-[13rem] text-xs leading-5 text-on-surface-variant">
            {position.meaning}
          </p>
        </div>

        {card ? (
          <motion.div
            layoutId={card.slug}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="z-10"
          >
            <TarotCard
              key={`${card.slug}-${index}`}
              card={card.card}
              slug={card.slug}
              isReversed={card.isReversed}
              isRevealed
            />
          </motion.div>
        ) : (
          <div className="flex h-80 w-48 flex-col items-center justify-center gap-3 rounded-[26px] border border-dashed border-primary/30 bg-surface-dim/50 p-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                isNextToDraw
                  ? "border-secondary/50 bg-secondary/15 text-secondary animate-pulse"
                  : "border-primary/20 bg-primary/5 text-primary/35"
              }`}
            >
              <span className="font-serif text-xl">{index + 1}</span>
            </div>
            {isNextToDraw && (
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">
                {lang === "id" ? "Klik Ambil Kartu" : "Click to Draw"}
              </span>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen px-5 py-8 text-on-background md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Top Sanctuary Header */}
        <div className="glass-panel flex flex-col gap-5 rounded-3xl p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold leading-tight text-on-background md:text-4xl">
                  {t.title}
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-on-surface-variant">
                  {t.desc}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={shuffleDeck}
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-primary/35 bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-on-background transition hover:border-primary/60 hover:bg-primary/20"
          >
            <Shuffle className={`h-4 w-4 text-primary ${isShuffling ? "animate-spin" : ""}`} />
            {t.shuffle}
          </button>
        </div>

        <LayoutGroup id="daily-reading-spread">
          <section className="grid gap-8 lg:grid-cols-[310px_1fr]">
            {/* Left Pedestal: Interactive 3D Deck Stack */}
            <aside className="glass-panel flex h-fit flex-col gap-6 rounded-3xl p-6 lg:sticky lg:top-24">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-secondary">
                  {t.deck_label}
                </p>
                {/* Constellation Progress Bar */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((step) => (
                    <span
                      key={step}
                      className={`h-2 w-6 rounded-full transition-all duration-500 ${
                        step < drawnCards.length
                          ? "bg-gradient-to-r from-secondary to-primary shadow-[0_0_10px_var(--primary)]"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-on-surface-variant">
                  {drawnCards.length}/{DAILY_POSITIONS.length} {t.cards_opened}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={drawNextCard}
                disabled={isShuffling || allDrawn}
                whileTap={{ scale: isShuffling || allDrawn ? 1 : 0.97 }}
                className="relative mx-auto h-80 w-48 rounded-[26px] bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={
                  lang === "id"
                    ? "Ambil kartu dari deck"
                    : "Draw card from deck"
                }
              >
                {[0, 1, 2, 3, 4].map((layer) => {
                  const isTop = layer === 0;
                  const currentSlug = deck[0];
                  const layerKey =
                    isTop && currentSlug
                      ? `deck-top-${currentSlug}`
                      : `deck-layer-${layer}`;

                  return (
                    <motion.div
                      key={layerKey}
                      layoutId={isTop && currentSlug ? currentSlug : undefined}
                      animate={
                        isShuffling
                          ? {
                              x: [0, layer % 2 === 0 ? -18 : 18, 0],
                              y: [0, layer % 2 === 0 ? 10 : -8, 0],
                              rotate: [0, layer % 2 === 0 ? -8 : 8, 0],
                            }
                          : {
                              x: layer * 2.5,
                              y: layer * -2.5,
                              rotate: layer * 0.8,
                            }
                      }
                      transition={
                        isShuffling
                          ? {
                              repeat: Infinity,
                              duration: 0.55,
                              delay: layer * 0.04,
                            }
                          : { duration: 0.35 }
                      }
                      className="absolute inset-0 flex flex-col items-center justify-between rounded-[26px] border border-primary/45 bg-gradient-to-b from-surface-container-high via-surface-dim to-surface-container p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
                      style={{ zIndex: 10 - layer }}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-between rounded-[20px] border border-secondary/25 bg-[radial-gradient(circle_at_center,rgba(193,142,255,0.18),transparent_70%)] p-3">
                        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-secondary">
                          ARCANA
                        </span>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-surface-dim/90 shadow-[0_0_25px_var(--bg-glow-1)]">
                          <Sparkles className="h-7 w-7 text-primary" />
                        </div>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-primary/80">
                          MYSTICA
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.button>

              <button
                type="button"
                onClick={drawNextCard}
                disabled={isShuffling || allDrawn}
                className="gold-gradient inline-flex items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                {isShuffling
                  ? t.shuffling
                  : allDrawn
                  ? t.all_drawn
                  : t.draw_card}
              </button>

              {allDrawn && (
                <button
                  type="button"
                  onClick={saveDailyReading}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-primary/35 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-on-background transition hover:border-primary/60 hover:bg-white/10"
                >
                  <Save className="h-4 w-4 text-primary" />
                  {isSaved ? t.saved : t.save}
                </button>
              )}
            </aside>

            {/* Right Altar: 6-Card Constellation Circuit */}
            <section className="flex flex-col gap-8">
              <div className="glass-panel relative overflow-hidden rounded-[36px] p-5 md:p-8">
                {/* Dynamic Constellation Circuit Lines Behind the 6 Slots */}
                <svg
                  viewBox="0 0 800 900"
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
                  preserveAspectRatio="none"
                >
                  {/* Circuit lines that light up as cards are drawn */}
                  {[
                    { d: "M 400 180 L 120 450", minCards: 2 },
                    { d: "M 400 180 L 310 450", minCards: 3 },
                    { d: "M 400 180 L 490 450", minCards: 4 },
                    { d: "M 400 180 L 680 450", minCards: 5 },
                    { d: "M 120 450 L 680 450", minCards: 5 },
                    { d: "M 120 450 L 400 740", minCards: 6 },
                    { d: "M 310 450 L 400 740", minCards: 6 },
                    { d: "M 490 450 L 400 740", minCards: 6 },
                    { d: "M 680 450 L 400 740", minCards: 6 },
                  ].map((line, i) => {
                    const active = drawnCards.length >= line.minCards;
                    return (
                      <path
                        key={i}
                        d={line.d}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={active ? "2" : "1"}
                        strokeDasharray={active ? "none" : "6 6"}
                        className={
                          active
                            ? "text-secondary transition-all duration-700"
                            : "text-primary/20 transition-all duration-700"
                        }
                      />
                    );
                  })}
                </svg>

                {/* Top Card (Index 0) */}
                <div className="relative z-10 flex justify-center">
                  <div className="w-full max-w-[260px]">{renderCardSlot(0)}</div>
                </div>

                {/* 4 Main Cards (Indices 1, 2, 3, 4) */}
                <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[1, 2, 3, 4].map((index) => renderCardSlot(index))}
                </div>

                {/* Bottom Card (Index 5) */}
                <div className="relative z-10 mt-6 flex justify-center">
                  <div className="w-full max-w-[260px]">{renderCardSlot(5)}</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedCard && selectedCardIndex !== null && (
                  <motion.div
                    key={`${selectedCard.slug}-${selectedCardIndex}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                  >
                    <InterpretationPanel
                      card={selectedCard.card}
                      isReversed={selectedCard.isReversed}
                      positionName={DAILY_POSITIONS[selectedCardIndex].name}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {allDrawn && conclusion && (
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    className="space-y-6 pb-12"
                  >
                    <ReadingSummary
                      vibe={conclusion.vibe}
                      summary={conclusion.summary}
                      finalAdvice={conclusion.finalAdvice}
                    />

                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        type="button"
                        onClick={saveDailyReading}
                        className="gold-gradient inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition hover:scale-105"
                      >
                        <Save className="h-4 w-4" />
                        {isSaved ? t.already_saved : t.save_reading}
                      </button>
                      <button
                        type="button"
                        onClick={shuffleDeck}
                        className="inline-flex items-center justify-center gap-2.5 rounded-full border border-primary/35 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-on-background transition hover:border-primary/60 hover:bg-white/10"
                      >
                        <RefreshCw className="h-4 w-4" />
                        {t.shuffle_again}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </section>
        </LayoutGroup>
      </div>
    </main>
  );
}

function getMeaningID(id: string) {
  switch (id) {
    case "Atas - Fokus Hari Ini":
      return "Tema besar atau niat yang menaungi hari ini.";
    case "Utama 1 - Energi Pagi":
      return "Nada awal hari dan kondisi batin saat memulai.";
    case "Utama 2 - Tantangan":
      return "Gesekan, hambatan, atau hal yang perlu disadari.";
    case "Utama 3 - Peluang":
      return "Pintu yang bisa dibuka jika kamu peka melihat tanda.";
    case "Utama 4 - Tindakan Terbaik":
      return "Langkah praktis yang paling selaras untuk hari ini.";
    case "Bawah - Pesan Tersembunyi":
      return "Akar energi, pesan bawah sadar, atau refleksi penutup.";
    default:
      return "";
  }
}

function getMeaningEN(id: string) {
  switch (id) {
    case "Atas - Fokus Hari Ini":
      return "Major theme or intention overshadowing today.";
    case "Utama 1 - Energi Pagi":
      return "The initial tone of the day and inner state at the start.";
    case "Utama 2 - Tantangan":
      return "Friction, obstacles, or things to be aware of.";
    case "Utama 3 - Peluang":
      return "Doors that can be opened if you are sensitive to signs.";
    case "Utama 4 - Tindakan Terbaik":
      return "The most aligned practical steps for today.";
    case "Bawah - Pesan Tersembunyi":
      return "Energy roots, subconscious messages, or closing reflection.";
    default:
      return "";
  }
}
