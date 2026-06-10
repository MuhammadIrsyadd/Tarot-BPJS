"use client";

import { motion } from "framer-motion";
import { TarotCardData } from "@/lib/types";
import { Sparkles, Heart, Briefcase, Zap } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface InterpretationPanelProps {
  card: TarotCardData;
  isReversed: boolean;
  positionName: string;
  context?: 'general' | 'love' | 'career';
}

export default function InterpretationPanel({ card, isReversed, positionName }: InterpretationPanelProps) {
  const { lang } = useSettings();
  
  // Selection logic for language
  const name = (lang === 'en' && card.name_en) ? card.name_en : card.name;
  const element = (lang === 'en' && card.element_en) ? card.element_en : card.element;
  const keywords = (lang === 'en' && card.keywords_en) ? card.keywords_en : card.keywords;
  
  const interpretation = isReversed 
    ? (lang === 'en' && card.reversed_en ? card.reversed_en : card.reversed)
    : (lang === 'en' && card.upright_en ? card.upright_en : card.upright);

  const t = {
    reversed: lang === 'en' ? '(Reversed)' : '(Terbalik)',
    element_label: lang === 'en' ? 'Element' : 'Elemen',
    general: lang === 'en' ? 'General Meaning' : 'Makna Umum',
    love: lang === 'en' ? 'Love' : 'Asmara',
    career: lang === 'en' ? 'Career & Finance' : 'Karir & Keuangan',
    advice_label: lang === 'en' ? 'Card Advice' : 'Nasehat Kartu',
    advice_reversed: lang === 'en' ? 'Review your steps, there are obstacles to be aware of.' : 'Tinjau kembali langkahmu, ada hambatan yang perlu disadari.',
    advice_upright: lang === 'en' ? 'Trust your intuition and the steps you are taking.' : 'Percaya pada intuisi dan langkah yang sedang kamu ambil.'
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl border-primary/20 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-primary/10 pb-4">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary/60">{positionName}</h3>
          <h2 className="text-2xl font-serif text-primary">{name} {isReversed && <span className="text-mystic-accent text-lg">{t.reversed}</span>}</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-on-background/40 mb-1">{t.element_label}: {element}</div>
          <div className="flex gap-1">
            {keywords.slice(0, 3).map(kw => (
              <span key={kw} className="text-[10px] px-2 py-1 bg-primary/10 rounded-full text-primary uppercase">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="flex items-center gap-2 text-primary font-bold mb-2">
            <Zap className="w-4 h-4" /> {t.general}
          </h4>
          <p className="text-on-background/80 leading-relaxed italic">
            {interpretation.general}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white/5 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 text-pink-400 font-bold mb-2">
              <Heart className="w-4 h-4" /> {t.love}
            </h4>
            <p className="text-sm text-on-background/70 leading-relaxed">
              {interpretation.love}
            </p>
          </section>

          <section className="bg-white/5 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-2">
              <Briefcase className="w-4 h-4" /> {t.career}
            </h4>
            <p className="text-sm text-on-background/70 leading-relaxed">
              {interpretation.career}
            </p>
          </section>
        </div>
      </div>

      <div className="mt-4 p-4 border border-primary/10 rounded-xl bg-primary/5">
        <p className="text-xs text-primary/60 text-center uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" /> {t.advice_label}
        </p>
        <p className="text-center mt-2 font-serif text-primary/90 italic">
          &quot;{isReversed ? t.advice_reversed : t.advice_upright}&quot;
        </p>
      </div>
    </motion.div>
  );
}
