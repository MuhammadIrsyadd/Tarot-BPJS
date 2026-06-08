"use client";

import { motion } from "framer-motion";
import { TarotCardData } from "@/lib/types";
import { Sparkles, Heart, Briefcase, Zap } from "lucide-react";

interface InterpretationPanelProps {
  card: TarotCardData;
  isReversed: boolean;
  positionName: string;
  context?: 'general' | 'love' | 'career';
}

export default function InterpretationPanel({ card, isReversed, positionName }: InterpretationPanelProps) {
  const interpretation = isReversed ? card.reversed : card.upright;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl border-mystic-gold/20 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-mystic-gold/10 pb-4">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-mystic-gold/60">{positionName}</h3>
          <h2 className="text-2xl font-serif text-mystic-gold">{card.name} {isReversed && <span className="text-mystic-accent text-lg">(Terbalik)</span>}</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-mystic-fg/40 mb-1">Elemen: {card.element}</div>
          <div className="flex gap-1">
            {card.keywords.slice(0, 3).map(kw => (
              <span key={kw} className="text-[10px] px-2 py-1 bg-mystic-gold/10 rounded-full text-mystic-gold uppercase">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="flex items-center gap-2 text-mystic-gold font-bold mb-2">
            <Zap className="w-4 h-4" /> Makna Umum
          </h4>
          <p className="text-mystic-fg/80 leading-relaxed italic">
            {interpretation.general}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white/5 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 text-pink-400 font-bold mb-2">
              <Heart className="w-4 h-4" /> Asmara
            </h4>
            <p className="text-sm text-mystic-fg/70 leading-relaxed">
              {interpretation.love}
            </p>
          </section>

          <section className="bg-white/5 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-2">
              <Briefcase className="w-4 h-4" /> Karir & Keuangan
            </h4>
            <p className="text-sm text-mystic-fg/70 leading-relaxed">
              {interpretation.career}
            </p>
          </section>
        </div>
      </div>

      <div className="mt-4 p-4 border border-mystic-gold/10 rounded-xl bg-mystic-gold/5">
        <p className="text-xs text-mystic-gold/60 text-center uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" /> Nasehat Kartu
        </p>
        <p className="text-center mt-2 font-serif text-mystic-gold/90 italic">
          &quot;{isReversed ? "Tinjau kembali langkahmu, ada hambatan yang perlu disadari." : "Percaya pada intuisi dan langkah yang sedang kamu ambil."}&quot;
        </p>
      </div>
    </motion.div>
  );
}
