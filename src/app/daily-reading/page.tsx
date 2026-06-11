"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CalendarDays, RefreshCw, Save, Shuffle, Sparkles } from "lucide-react";
import TarotCard from "@/components/TarotCard";
import InterpretationPanel from "@/components/InterpretationPanel";
import ReadingSummary from "@/components/ReadingSummary";
import { generateConclusion } from "@/lib/interpretation";
import { saveReading } from "@/lib/storage";
import { SPREADS } from "@/lib/spreads";
import { getAllCards, getCardBySlug } from "@/lib/utils";
import { TarotCardData } from "@/lib/types";

import { useSettings } from "@/context/SettingsContext";

type DrawnCard = {
  slug: string;
  card: TarotCardData;
  isReversed: boolean;
};

const DAILY_POSITIONS_DATA = {
  id: [
    { name: "Atas - Fokus Hari Ini", compactLabel: "Top / Atas", shortName: "Atas", meaning: "Tema besar atau niat yang menaungi hari ini." },
    { name: "Utama 1 - Energi Pagi", compactLabel: "Main 1 / Pagi", shortName: "Utama 1", meaning: "Nada awal hari dan kondisi batin saat memulai." },
    { name: "Utama 2 - Tantangan", compactLabel: "Main 2 / Tantangan", shortName: "Utama 2", meaning: "Gesekan, hambatan, atau hal yang perlu disadari." },
    { name: "Utama 3 - Peluang", compactLabel: "Main 3 / Peluang", shortName: "Utama 3", meaning: "Pintu yang bisa dibuka jika kamu peka melihat tanda." },
    { name: "Utama 4 - Tindakan Terbaik", compactLabel: "Main 4 / Aksi", shortName: "Utama 4", meaning: "Langkah praktis yang paling selaras untuk hari ini." },
    { name: "Bawah - Pesan Tersembunyi", compactLabel: "Bottom / Bawah", shortName: "Bawah", meaning: "Akar energi, pesan bawah sadar, atau refleksi penutup." }
  ],
  en: [
    { name: "Top - Today's Focus", compactLabel: "Top", shortName: "Top", meaning: "Major theme or intention overshadowing today." },
    { name: "Main 1 - Morning Energy", compactLabel: "Main 1 / morning", shortName: "Main 1", meaning: "The initial tone of the day and inner state at the start." },
    { name: "Main 2 - Challenge", compactLabel: "Main 2 / Challenge", shortName: "Main 2", meaning: "Friction, obstacles, or things to be aware of." },
    { name: "Main 3 - Opportunity", compactLabel: "Main 3 / Opp", shortName: "Main 3", meaning: "Doors that can be opened if you are sensitive to signs." },
    { name: "Main 4 - Best Action", compactLabel: "Main 4 / Action", shortName: "Main 4", meaning: "The most aligned practical steps for today." },
    { name: "Bottom - Hidden Message", compactLabel: "Bottom", shortName: "Bottom", meaning: "Energy roots, subconscious messages, or closing reflection." }
  ]
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
  const DAILY_POSITIONS = DAILY_POSITIONS_DATA[lang];

  const [deck, setDeck] = useState<string[]>(() => createShuffledDeck());
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const t = {
    back: lang === 'id' ? 'Kembali' : 'Back',
    title: 'Daily Reading',
    desc: lang === 'id' ? 'Enam kartu harian dengan susunan Atas, empat kartu Utama, dan Bawah.' : 'Six daily cards arranged in Top, four Main cards, and Bottom.',
    shuffle: lang === 'id' ? 'Kocok Ulang' : 'Reshuffle',
    deck_label: lang === 'id' ? 'Deck Harian' : 'Daily Deck',
    cards_opened: lang === 'id' ? 'kartu terbuka' : 'cards revealed',
    draw_card: lang === 'id' ? 'Ambil Kartu' : 'Draw Card',
    shuffling: lang === 'id' ? 'Mengocok...' : 'Shuffling...',
    all_drawn: lang === 'id' ? 'Semua Kartu Terbuka' : 'All Cards Revealed',
    save: lang === 'id' ? 'Simpan ke Jurnal' : 'Save to Journal',
    saved: lang === 'id' ? 'Tersimpan' : 'Saved',
    shuffle_again: lang === 'id' ? 'Kocok Lagi' : 'Reshuffle',
    save_reading: lang === 'id' ? 'Simpan Bacaan' : 'Save Reading',
    already_saved: lang === 'id' ? 'Sudah Tersimpan' : 'Already Saved'
  };

  const allDrawn = drawnCards.length === DAILY_POSITIONS.length;

  const selectedCard = selectedCardIndex !== null ? drawnCards[selectedCardIndex] : null;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsShuffling(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const conclusion = useMemo(() => {
    if (!allDrawn) return null;

    return generateConclusion(
      drawnCards.map((card, index) => ({
        card: card.card,
        isReversed: card.isReversed,
        positionName: DAILY_POSITIONS[index].name
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
    }, 1200);
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
        isReversed: Math.random() > 0.7
      }
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
        positionName: DAILY_POSITIONS[index].name
      }))
    });

    setIsSaved(true);
  };

  const renderCardSlot = (index: number) => {
    const position = DAILY_POSITIONS[index];
    const card = drawnCards[index];
    const active = selectedCardIndex === index;

    return (
      <motion.button
        key={position.name}
        layout
        type="button"
        onClick={() => card && setSelectedCardIndex(index)}
        disabled={!card}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex min-h-[420px] flex-col items-center gap-4 rounded-lg border p-4 text-center transition ${
          active
            ? "border-primary bg-white/10 shadow-[0_24px_80px_-50px_rgba(193,142,255,0.65)]"
            : "border-white/10 bg-white/5"
        } ${card ? "cursor-pointer hover:border-secondary/55" : "cursor-default opacity-65"}`}
      >
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-primary sm:hidden">
            {position.compactLabel}
          </p>
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.32em] text-primary sm:block">
            {position.shortName}
          </p>
          <p className="mx-auto max-w-[13rem] text-xs leading-5 text-on-background/64">
            {position.meaning}
          </p>
        </div>

        {card ? (
          <motion.div 
            layoutId={card.slug} 
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
          <div className="flex h-80 w-48 items-center justify-center rounded-lg border border-dashed border-primary/22 bg-background/70">
            <span className="text-3xl text-primary/35">#</span>
          </div>
        )}
      </motion.button>
    );
  };

  return (
    <main className="min-h-screen px-5 py-8 text-on-background md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 rounded-lg border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.75)] md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-secondary transition hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
            <div className="flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-serif text-4xl leading-tight text-on-background md:text-5xl">{t.title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-on-background/68">
                  {t.desc}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={shuffleDeck}
            className="inline-flex items-center justify-center gap-3 rounded-lg border border-primary/30 bg-primary/12 px-5 py-3 text-sm font-bold text-on-background transition hover:border-primary/60 hover:bg-primary/20"
          >
            <Shuffle className={`h-5 w-5 ${isShuffling ? "animate-spin" : ""}`} />
            {t.shuffle}
          </button>
        </div>

        <LayoutGroup id="daily-reading-spread">
          <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="flex flex-col gap-5 rounded-lg border border-white/10 bg-background/80 p-5 shadow-[0_28px_80px_-62px_rgba(118,224,255,0.55)]">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-secondary/80">
                  {t.deck_label}
                </p>
                <p className="mt-2 text-sm text-on-background/62">
                  {drawnCards.length}/{DAILY_POSITIONS.length} {t.cards_opened}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={drawNextCard}
                disabled={isShuffling || allDrawn}
                whileTap={{ scale: isShuffling || allDrawn ? 1 : 0.98 }}
                className="relative mx-auto h-80 w-52 rounded-lg border border-[#76e0ff]/24 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-70"
                aria-label={lang === 'id' ? "Ambil kartu dari deck" : "Draw card from deck"}
              >
                {[0, 1, 2, 3, 4, 5].map((layer) => {
                  const isTop = layer === 0;
                  const currentSlug = deck[0];
                  // Use the current slug as the key for the top layer to ensure it unmounts/remounts
                  // correctly when a card is drawn, triggering the shared layout animation.
                  const layerKey = isTop && currentSlug ? `deck-top-${currentSlug}` : `deck-layer-${layer}`;
                  
                  return (
                    <motion.div
                      key={layerKey}
                      layoutId={isTop && currentSlug ? currentSlug : undefined}
                      animate={
                        isShuffling
                          ? {
                              x: [0, layer % 2 === 0 ? -18 : 18, 0],
                              y: [0, layer % 2 === 0 ? 10 : -8, 0],
                              rotate: [0, layer % 2 === 0 ? -8 : 8, 0]
                            }
                          : {
                              x: layer * 2,
                              y: layer * -2,
                              rotate: layer * 0.7
                            }
                      }
                      transition={
                        isShuffling
                          ? { repeat: Infinity, duration: 0.55, delay: layer * 0.04 }
                          : { duration: 0.35 }
                      }
                      className="absolute inset-0 rounded-lg border border-primary/30 bg-[radial-gradient(circle_at_top,rgba(245,160,255,0.2),transparent_38%),linear-gradient(145deg,var(--bg-gradient-1),var(--bg-gradient-2))] shadow-[0_24px_70px_-48px_rgba(193,142,255,0.85)]"
                      style={{ zIndex: 10 - layer }}
                    >
                      <div className="absolute inset-5 rounded-lg border border-white/10" />
                      <div className="absolute inset-x-0 top-12 text-center text-xs font-semibold uppercase tracking-[0.36em] text-on-background/70">
                        Arcana
                      </div>
                      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
                        <Sparkles className="h-14 w-14 text-primary/72" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.button>

              <button
                type="button"
                onClick={drawNextCard}
                disabled={isShuffling || allDrawn}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-secondary to-primary px-5 py-3 text-sm font-bold text-on-primary transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-55"
              >
                <Sparkles className="h-5 w-5" />
                {isShuffling ? t.shuffling : allDrawn ? t.all_drawn : t.draw_card}
              </button>

              {allDrawn && (
                <button
                  type="button"
                  onClick={saveDailyReading}
                  className="inline-flex items-center justify-center gap-3 rounded-lg border border-primary/30 bg-white/10 px-5 py-3 text-sm font-bold text-on-background transition hover:border-primary/55 hover:bg-white/15"
                >
                  <Save className="h-5 w-5" />
                  {isSaved ? t.saved : t.save}
                </button>
              )}
            </aside>

            <section className="flex flex-col gap-8">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="flex justify-center">
                  <div className="w-full max-w-[260px]">{renderCardSlot(0)}</div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[1, 2, 3, 4].map((index) => renderCardSlot(index))}
                </div>

                <div className="mt-6 flex justify-center">
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
                    className="space-y-5 pb-12"
                  >
                    <ReadingSummary
                      vibe={conclusion.vibe}
                      summary={conclusion.summary}
                      finalAdvice={conclusion.finalAdvice}
                    />

                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={saveDailyReading}
                        className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-secondary to-primary px-6 py-3 text-sm font-bold text-on-primary transition hover:-translate-y-0.5"
                      >
                        <Save className="h-5 w-5" />
                        {isSaved ? t.already_saved : t.save_reading}
                      </button>
                      <button
                        type="button"
                        onClick={shuffleDeck}
                        className="inline-flex items-center justify-center gap-3 rounded-lg border border-primary/30 bg-white/10 px-6 py-3 text-sm font-bold text-on-background transition hover:border-primary/55 hover:bg-white/15"
                      >
                        <RefreshCw className="h-5 w-5" />
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
