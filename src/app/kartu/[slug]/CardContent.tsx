"use client";

import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import TarotCard from "@/components/TarotCard";
import InterpretationPanel from "@/components/InterpretationPanel";
import { TarotCardData } from "@/lib/types";
import { useSettings } from "@/context/SettingsContext";

interface CardContentProps {
  card: TarotCardData;
  slug: string;
}

export default function CardContent({ card, slug }: CardContentProps) {
  const { lang } = useSettings();

  const name = (lang === 'en' && card.name_en) ? card.name_en : card.name;
  const element = (lang === 'en' && card.element_en) ? card.element_en : card.element;
  const keywords = (lang === 'en' && card.keywords_en) ? card.keywords_en : card.keywords;
  const t = {
    back: lang === 'id' ? 'Kembali ke Ensiklopedia' : 'Back to Encyclopedia',
    upright: lang === 'id' ? 'Makna Tegak (Upright)' : 'Upright Meaning',
    reversed: lang === 'id' ? 'Makna Terbalik (Reversed)' : 'Reversed Meaning',
    shadow_interpretation: lang === 'id' ? 'Interpretasi Bayangan' : 'Shadow Interpretation',
    main_interpretation: lang === 'id' ? 'Interpretasi Utama' : 'Main Interpretation',
    element_label: lang === 'id' ? 'Elemen' : 'Element',
    number_label: lang === 'id' ? 'Nomor' : 'Number'
  };

  return (
    <div className="max-w-4xl mx-auto w-full glass-panel-interactive p-8 rounded-3xl border border-secondary/20 shadow-[0_30px_90px_-50px_rgba(139,92,255,0.45)]">
      {/* Header */}
      <Link href="/kartu" className="flex items-center gap-2 text-primary hover:text-tertiary transition-colors mb-12">
        <ArrowLeft className="w-5 h-5" />
        <span>{t.back}</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex justify-center">
          <TarotCard card={card} slug={slug} isRevealed={true} />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-primary/60 uppercase tracking-[0.3em] text-sm">{card.arcana} Arcana</span>
            <h1 className="text-5xl font-serif text-primary mt-2">{name}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {keywords.map(kw => (
                <span key={kw} className="px-3 py-1 glass text-xs text-primary rounded-full uppercase border-primary/20">{kw}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs text-on-background/40 uppercase mb-2">{t.element_label}</h4>
              <p className="text-primary font-bold">{element}</p>
            </div>
            <div>
              <h4 className="text-xs text-on-background/40 uppercase mb-2">{t.number_label}</h4>
              <p className="text-primary font-bold">{card.number}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-serif text-primary flex items-center gap-3">
            <Sun className="w-6 h-6" /> {t.upright}
          </h2>
          <InterpretationPanel card={card} isReversed={false} positionName={t.main_interpretation} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-serif text-secondary flex items-center gap-3">
            <Moon className="w-6 h-6" /> {t.reversed}
          </h2>
          <InterpretationPanel card={card} isReversed={true} positionName={t.shadow_interpretation} />
        </div>
      </div>
    </div>
  );
}
