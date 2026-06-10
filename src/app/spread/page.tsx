"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { SPREADS, SpreadType } from "@/lib/spreads";
import { getRandomCard } from "@/lib/utils";
import { TarotCardData } from "@/lib/types";
import TarotCard from "@/components/TarotCard";
import InterpretationPanel from "@/components/InterpretationPanel";
import ReadingSummary from "@/components/ReadingSummary";
import { saveReading } from "@/lib/storage";
import { generateConclusion } from "@/lib/interpretation";

export default function SpreadPage() {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [reading, setReading] = useState<{
    cards: { slug: string; card: TarotCardData; isReversed: boolean; revealed: boolean }[];
    isShuffling: boolean;
  } | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const allRevealed = useMemo(() => {
    return !!reading && reading.cards.length > 0 && reading.cards.every((c) => c.revealed);
  }, [reading]);

  const conclusion = useMemo(() => {
    if (!allRevealed || !reading || !selectedSpread) {
      return null;
    }
    const cardsForConclusion = reading.cards.map((c, i) => ({
      card: c.card,
      isReversed: c.isReversed,
      positionName: selectedSpread.positions[i]
    }));
    return generateConclusion(cardsForConclusion);
  }, [allRevealed, reading, selectedSpread]);

  const handleSelectSpread = (spread: SpreadType) => {
    setSelectedSpread(spread);
    setIsSaved(false);
    setReading({
      cards: [],
      isShuffling: true
    });

    // Simulate shuffling
    setTimeout(() => {
      const drawnCards = [];
      for (let i = 0; i < spread.cardsCount; i++) {
        drawnCards.push({ ...getRandomCard(), revealed: false });
      }
      setReading({
        cards: drawnCards,
        isShuffling: false
      });
    }, 2000);
  };

  const handleSave = () => {
    if (!reading || !selectedSpread) return;
    
    saveReading({
      spreadName: selectedSpread.name,
      cards: reading.cards.map((c, i) => ({
        slug: c.slug,
        isReversed: c.isReversed,
        positionName: selectedSpread.positions[i]
      }))
    });
    
    setIsSaved(true);
  };

  const handleRevealCard = (index: number) => {
    if (!reading) return;
    
    // If card already revealed, just select it to show interpretation
    if (reading.cards[index].revealed) {
      setSelectedCardIndex(index);
      return;
    }

    const newCards = [...reading.cards];
    newCards[index].revealed = true;
    setReading({ ...reading, cards: newCards });
    setSelectedCardIndex(index);
  };

  const reset = () => {
    setSelectedSpread(null);
    setReading(null);
    setSelectedCardIndex(null);
    setIsSaved(false);
  };

  return (
    <main className="min-h-screen flex flex-col p-6 md:p-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 text-mystic-gold hover:text-mystic-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </Link>
          <h1 className="text-3xl font-serif text-mystic-gold">Pilih Spread Tarot</h1>
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-mystic-fg/40 hover:text-mystic-fg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {!selectedSpread ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPREADS.map((spread) => (
              <motion.button
                key={spread.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSpread(spread)}
                className="glass p-6 rounded-2xl border-mystic-gold/10 hover:border-mystic-gold/40 text-left transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-mystic-gold/10 p-3 rounded-lg group-hover:bg-mystic-gold/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-mystic-gold" />
                  </div>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-mystic-fg/60 uppercase tracking-widest">
                    {spread.cardsCount} Kartu
                  </span>
                </div>
                <h3 className="text-xl font-bold text-mystic-gold mb-2">{spread.name}</h3>
                <p className="text-sm text-mystic-fg/60">{spread.description}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* Reading Table */}
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-serif text-mystic-gold mb-8">{selectedSpread.name}</h2>
              
              <div className="flex flex-wrap justify-center gap-8 min-h-[400px] items-center">
                {reading?.isShuffling ? (
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative w-48 h-80">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            x: [0, -20, 20, 0],
                            rotate: [0, -5, 5, 0],
                            y: [0, i * -2, 0]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.5, 
                            delay: i * 0.1 
                          }}
                          className="absolute inset-0 rounded-xl border-4 border-mystic-gold/30 bg-mystic-purple/50"
                          style={{ zIndex: -i }}
                        />
                      ))}
                    </div>
                    <p className="text-mystic-gold animate-pulse uppercase tracking-[0.3em] text-sm">Sedang Mengocok Kartu...</p>
                  </div>
                ) : (
                  reading?.cards.map((cardState, index) => (
                    <div key={index} className="flex flex-col items-center gap-4">
                      <div className="text-xs uppercase tracking-widest text-mystic-gold/60">
                        {selectedSpread.positions[index]}
                      </div>
                      <TarotCard 
                        card={cardState.card} 
                        slug={cardState.slug}
                        isReversed={cardState.isReversed} 
                        isRevealed={cardState.revealed}
                        onReveal={() => handleRevealCard(index)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="max-w-4xl mx-auto w-full space-y-12">
              {/* Selected Card Interpretation */}
              <AnimatePresence mode="wait">
                {selectedCardIndex !== null && reading && reading.cards[selectedCardIndex].revealed && (
                  <motion.div
                    key={`card-${selectedCardIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <InterpretationPanel 
                      card={reading.cards[selectedCardIndex].card}
                      isReversed={reading.cards[selectedCardIndex].isReversed}
                      positionName={selectedSpread.positions[selectedCardIndex]}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Final Conclusion */}
              <AnimatePresence>
                {allRevealed && conclusion && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
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
                          onClick={handleSave}
                          className="gold-gradient border border-mystic-gold/30 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                        >
                          Simpan ke Jurnal Bacaan
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-4 bg-mystic-gold/10 p-6 rounded-2xl border border-mystic-gold/20">
                          <p className="text-mystic-gold font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5" /> Sesi tersimpan di Jurnal!
                          </p>
                          <Link href="/jurnal">
                            <button className="glass px-6 py-2 rounded-full text-sm hover:border-mystic-gold/40 transition-all font-bold">
                              Lihat Jurnal
                            </button>
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
