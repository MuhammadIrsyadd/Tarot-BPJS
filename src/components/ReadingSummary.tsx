"use client";

import { motion } from "framer-motion";
import { Sparkles, Info, Quote } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useSettings } from "@/context/SettingsContext";

interface ReadingSummaryProps {
  vibe: string;
  summary: string;
  finalAdvice: string;
}

export default function ReadingSummary({
  vibe,
  summary,
  finalAdvice,
}: ReadingSummaryProps) {
  const { lang } = useSettings();

  const t = {
    badge: lang === "id" ? "Sintesis Kosmik" : "Cosmic Synthesis",
    title:
      lang === "id" ? "Kesimpulan Sesi Mendalam" : "Deep Session Synthesis",
    analysis:
      lang === "id"
        ? "Alur Pesan Semesta & Analisis Kartu"
        : "Universe Message & Card Analysis",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel relative overflow-hidden rounded-3xl border border-primary/35 p-6 sm:p-10 space-y-8"
    >
      {/* Top & Bottom Decorative Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
          <Sparkles className="h-3 w-3" />
          {t.badge}
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-on-background sm:text-4xl">
          {t.title}
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-xs text-secondary">✧</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </div>

      {/* Vibe Banner */}
      <div className="relative rounded-2xl border border-secondary/25 bg-surface-container-lowest/75 p-6 text-center shadow-inner">
        <Quote className="mx-auto mb-2 h-7 w-7 text-primary/40" />
        <p className="font-serif text-lg leading-relaxed italic text-on-background/95">
          {vibe}
        </p>
      </div>

      {/* Detailed Markdown Synthesis */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 border-b border-primary/15 pb-3 text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          <Info className="h-4 w-4 text-primary" /> {t.analysis}
        </h3>
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-on-background/85 leading-relaxed prose-strong:text-primary prose-headings:text-on-background">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>

      {/* Final Advice Seal */}
      <div className="rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-surface-container/60 to-secondary/10 p-6 text-center">
        <p className="mx-auto max-w-2xl font-serif text-lg italic text-primary">
          &ldquo;{finalAdvice}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
