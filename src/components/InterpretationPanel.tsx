"use client";

import { motion } from "framer-motion";
import { TarotCardData } from "@/lib/types";
import { Sparkles, Heart, Briefcase, Zap, Compass } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface InterpretationPanelProps {
  card: TarotCardData;
  isReversed: boolean;
  positionName: string;
  context?: "general" | "love" | "career";
}

export default function InterpretationPanel({
  card,
  isReversed,
  positionName,
}: InterpretationPanelProps) {
  const { lang } = useSettings();

  const name = lang === "en" && card.name_en ? card.name_en : card.name;
  const element =
    lang === "en" && card.element_en ? card.element_en : card.element;
  const keywords =
    lang === "en" && card.keywords_en ? card.keywords_en : card.keywords;

  const interpretation = isReversed
    ? lang === "en" && card.reversed_en
      ? card.reversed_en
      : card.reversed
    : lang === "en" && card.upright_en
    ? card.upright_en
    : card.upright;

  const t = {
    reversed: lang === "en" ? "Reversed" : "Terbalik",
    upright: lang === "en" ? "Upright" : "Tegak",
    element_label: lang === "en" ? "Element" : "Elemen",
    general: lang === "en" ? "General Oracle" : "Makna Umum",
    love: lang === "en" ? "Love & Bonds" : "Asmara & Hubungan",
    career: lang === "en" ? "Career & Wealth" : "Karir & Keuangan",
    advice_label: lang === "en" ? "Whisper of the Arcana" : "Nasehat Kartu",
    advice_reversed:
      lang === "en"
        ? "Review your steps mindfully; hidden friction asks for gentle awareness."
        : "Tinjau kembali langkahmu dengan tenang, ada hambatan batin yang perlu disadari.",
    advice_upright:
      lang === "en"
        ? "Trust your intuition and the sacred momentum of the steps you are taking."
        : "Percaya pada intuisi dan keselarasan langkah yang sedang kamu ambil.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      {/* Top Filigree Highlight */}
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-primary/15 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
            <Compass className="h-3 w-3" />
            <span>{positionName}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-on-background sm:text-3xl">
              {name}
            </h2>
            <span
              className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                isReversed
                  ? "border-tertiary/40 bg-tertiary/15 text-tertiary"
                  : "border-primary/40 bg-primary/15 text-primary"
              }`}
            >
              {isReversed ? t.reversed : t.upright}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">
            {t.element_label}:{" "}
            <span className="font-bold text-secondary">{element}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keywords.slice(0, 4).map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 space-y-6">
        <section className="rounded-2xl border border-primary/20 bg-surface-container-lowest/60 p-5">
          <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            <Zap className="h-4 w-4 text-secondary" /> {t.general}
          </h4>
          <p className="font-serif text-base leading-relaxed italic text-on-background/90">
            &ldquo;{interpretation.general}&rdquo;
          </p>
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-500/[0.07] to-transparent p-5">
            <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-300">
              <Heart className="h-4 w-4 text-pink-400" /> {t.love}
            </h4>
            <p className="text-sm leading-relaxed text-on-background/80">
              {interpretation.love}
            </p>
          </section>

          <section className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.07] to-transparent p-5">
            <h4 className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              <Briefcase className="h-4 w-4 text-cyan-400" /> {t.career}
            </h4>
            <p className="text-sm leading-relaxed text-on-background/80">
              {interpretation.career}
            </p>
          </section>
        </div>
      </div>

      {/* Illuminated Scroll Advice */}
      <div className="mt-6 rounded-2xl border border-secondary/25 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-4 text-center">
        <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-secondary">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> {t.advice_label}
        </p>
        <p className="mt-1.5 font-serif text-sm italic text-on-background/95 sm:text-base">
          &ldquo;{isReversed ? t.advice_reversed : t.advice_upright}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
