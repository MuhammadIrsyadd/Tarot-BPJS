"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { TarotCardData } from "@/lib/types";

interface TarotCardProps {
  card?: TarotCardData;
  slug?: string;
  isReversed?: boolean;
  isRevealed?: boolean;
  onReveal?: () => void;
}

export default function TarotCard({ card, slug, isReversed, isRevealed = false, onReveal }: TarotCardProps) {
  const [revealed, setRevealed] = useState(isRevealed);
  const [imageError, setImageError] = useState(false);

  const handleFlip = () => {
    if (!revealed) {
      setRevealed(true);
      if (onReveal) onReveal();
    }
  };

  const imageUrl = (() => {
    if (!slug || imageError) return null;

    const mapping: Record<string, string> = {
      "the-fool": "m00", "the-magician": "m01", "the-high-priestess": "m02", "the-empress": "m03",
      "the-emperor": "m04", "the-hierophant": "m05", "the-lovers": "m06", "the-chariot": "m07",
      "strength": "m08", "the-hermit": "m09", "wheel-of-fortune": "m10", "justice": "m11",
      "the-hanged-man": "m12", "death": "m13", "temperance": "m14", "the-devil": "m15",
      "the-tower": "m16", "the-star": "m17", "the-moon": "m18", "the-sun": "m19",
      "judgement": "m20", "the-world": "m21",
      "ace-of-wands": "w01", "two-of-wands": "w02", "three-of-wands": "w03", "four-of-wands": "w04",
      "five-of-wands": "w05", "six-of-wands": "w06", "seven-of-wands": "w07", "eight-of-wands": "w08",
      "nine-of-wands": "w09", "ten-of-wands": "w10", "page-of-wands": "w11", "knight-of-wands": "w12",
      "queen-of-wands": "w13", "king-of-wands": "w14",
      "ace-of-cups": "c01", "two-of-cups": "c02", "three-of-cups": "c03", "four-of-cups": "c04",
      "five-of-cups": "c05", "six-of-cups": "c06", "seven-of-cups": "c07", "eight-of-cups": "c08",
      "nine-of-cups": "c09", "ten-of-cups": "c10", "page-of-cups": "c11", "knight-of-cups": "c12",
      "queen-of-cups": "c13", "king-of-cups": "c14",
      "ace-of-swords": "s01", "two-of-swords": "s02", "three-of-swords": "s03", "four-of-swords": "s04",
      "five-of-swords": "s05", "six-of-swords": "s06", "seven-of-swords": "s07", "eight-of-swords": "s08",
      "nine-of-swords": "s09", "ten-of-swords": "s10", "page-of-swords": "s11", "knight-of-swords": "s12",
      "queen-of-swords": "s13", "king-of-swords": "s14",
      "ace-of-pentacles": "p01", "two-of-pentacles": "p02", "three-of-pentacles": "p03", "four-of-pentacles": "p04",
      "five-of-pentacles": "p05", "six-of-pentacles": "p06", "seven-of-pentacles": "p07", "eight-of-pentacles": "p08",
      "nine-of-pentacles": "p09", "ten-of-pentacles": "p10", "page-of-pentacles": "p11", "knight-of-pentacles": "p12",
      "queen-of-pentacles": "p13", "king-of-pentacles": "p14"
    };

    const code = mapping[slug];
    return code ? `https://raw.githubusercontent.com/lambiengcode/flutter-tarot-card/master/images/${code}.jpg` : null;
  })();

  const getSuitColor = () => {
    if (!card?.suit) return 'text-primary';
    switch (card.suit) {
      case 'cups': return 'text-secondary';
      case 'swords': return 'text-indigo-400';
      case 'wands': return 'text-tertiary';
      case 'pentacles': return 'text-emerald-500';
      default: return 'text-primary';
    }
  };

  return (
    <div 
      className="relative w-48 h-80 cursor-pointer group"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative transition-transform duration-500"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface rounded-3xl border border-secondary/25 flex items-center justify-center shadow-[0_20px_60px_-30px_rgba(139,92,255,0.7)]"
             style={{ backfaceVisibility: "hidden" }}>
          <span className="text-primary text-5xl opacity-90">✧</span>
        </div>
        
        {/* Card Front */}
        <div 
          className="absolute inset-0 bg-surface-container rounded-3xl border border-secondary/20 flex flex-col items-center p-3 shadow-[0_20px_70px_-30px_rgba(13,107,255,0.35)]"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {card ? (
            <div className={`w-full h-full flex flex-col overflow-hidden ${isReversed ? 'rotate-180' : ''}`}>
              <div className="relative w-full h-4/5 rounded-3xl overflow-hidden border border-secondary/15 shadow-inner shadow-secondary/5 bg-surface-bright">
              {imageUrl ? (
              <Image 
                src={imageUrl}
                alt={card.name}
                fill
                className="object-cover transition-opacity duration-500"
                onError={() => setImageError(true)}
              />
              ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-surface/70 to-surface-container">
                    <div className={`text-5xl mb-4 ${getSuitColor()} opacity-70 font-serif`}>
                      {card.arcana === 'major' ? '✧' : (card.suit === 'cups' ? '❣' : card.suit === 'swords' ? '⚔' : card.suit === 'wands' ? '🪄' : '🪙')}
                    </div>
                    <div className="text-on-background font-serif text-lg font-semibold leading-tight">
                      {card.name}
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 top-0 p-3 bg-gradient-to-b from-black/80 to-transparent">
                  <div className="text-center text-[10px] font-semibold text-on-background uppercase tracking-[0.38em]">
                    {card.name}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full flex flex-col items-center justify-center p-3 border-t border-secondary/15 bg-surface-container">
                <div className="text-primary font-serif font-bold text-xl leading-none tracking-wide">
                  {card.number}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-on-background/50 flex items-center justify-center h-full">Loading...</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
