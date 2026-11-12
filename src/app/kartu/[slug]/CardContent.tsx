"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, RotateCw, Sun, Sparkles } from "lucide-react";
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
  const [previewReversed, setPreviewReversed] = useState(false);

  const name = lang === "en" && card.name_en ? card.name_en : card.name;
  const element =
    lang === "en" && card.element_en ? card.element_en : card.element;
  const keywords =
    lang === "en" && card.keywords_en ? card.keywords_en : card.keywords;

  const t = {
    back:
      lang === "id" ? "Kembali ke Ensiklopedia" : "Back to Encyclopedia",
    upright: lang === "id" ? "Makna Tegak (Upright)" : "Upright Meaning",
    reversed:
      lang === "id" ? "Makna Terbalik (Reversed)" : "Reversed Meaning",
    shadow_interpretation:
      lang === "id" ? "Interpretasi Bayangan" : "Shadow Interpretation",
    main_interpretation:
      lang === "id" ? "Interpretasi Utama" : "Main Interpretation",
    element_label: lang === "id" ? "Elemen" : "Element",
    number_label: lang === "id" ? "Nomor Arcana" : "Arcana Number",
    rotate_btn:
      lang === "id"
        ? previewReversed
          ? "Lihat Posisi Tegak"
          : "Putar ke Posisi Terbalik"
        : previewReversed
        ? "Switch to Upright"
        : "Rotate to Reversed",
  };

  return (
    <div className="glass-panel mx-auto w-full max-w-5xl rounded-3xl p-6 sm:p-10">
      {/* Header */}
      <Link
        href="/kartu"
        className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t.back}</span>
      </Link>

      <div className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        {/* Interactive 3D Card Showcase */}
        <div className="flex flex-col items-center gap-5">
          <TarotCard
            card={card}
            slug={slug}
            isReversed={previewReversed}
            isRevealed={true}
          />
          <button
            type="button"
            onClick={() => setPreviewReversed(!previewReversed)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary transition hover:bg-primary/20"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>{t.rotate_btn}</span>
          </button>
        </div>

        {/* Codex Metadata */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
              <Sparkles className="h-3 w-3" />
              {card.arcana} Arcana
            </span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-on-background sm:text-5xl">
              {name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-surface-container-lowest/60 p-4">
              <h4 className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
                {t.element_label}
              </h4>
              <p className="font-serif text-xl font-bold text-secondary">
                {element}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface-container-lowest/60 p-4">
              <h4 className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
                {t.number_label}
              </h4>
              <p className="font-serif text-xl font-bold text-primary">
                #{card.number}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Upright & Reversed Panels */}
      <div className="space-y-12">
        <div className="flex flex-col gap-5">
          <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-primary">
            <Sun className="h-6 w-6 text-secondary" /> {t.upright}
          </h2>
          <InterpretationPanel
            card={card}
            isReversed={false}
            positionName={t.main_interpretation}
          />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-tertiary">
            <Moon className="h-6 w-6 text-tertiary" /> {t.reversed}
          </h2>
          <InterpretationPanel
            card={card}
            isReversed={true}
            positionName={t.shadow_interpretation}
          />
        </div>
      </div>
    </div>
  );
}
