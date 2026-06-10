"use client";

import { motion } from "framer-motion";
import { Sparkles, Info, Quote } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useSettings } from "@/context/SettingsContext";

interface ReadingSummaryProps {
  vibe: string;
  summary: string;
  finalAdvice: string;
}

export default function ReadingSummary({ vibe, summary, finalAdvice }: ReadingSummaryProps) {
  const { lang } = useSettings();

  const t = {
    title: lang === 'id' ? 'Kesimpulan Sesi Mendalam' : 'Deep Session Summary',
    analysis: lang === 'id' ? 'Alur Pesan Semesta & Analisis Kartu' : 'Universe Message & Card Analysis'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-8 rounded-3xl border-2 border-primary/30 bg-white/50 space-y-8 shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-3xl font-serif text-primary mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6" />
          {t.title}
        </h2>
        <div className="w-24 h-px bg-primary/30 mx-auto" />
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 italic text-on-background/90 leading-relaxed text-center text-lg">
        <Quote className="w-8 h-8 text-primary/20 mb-2 mx-auto" />
        {vibe}
      </div>

      <div className="space-y-4">
        <h3 className="text-primary font-bold flex items-center gap-2 uppercase tracking-widest text-xs border-b border-primary/10 pb-2">
          <Info className="w-4 h-4" /> {t.analysis}
        </h3>
        <div className="prose prose-sm prose-violet max-w-none text-on-background/80 leading-relaxed">
           <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>

      <div className="pt-8 border-t border-primary/10 text-center">
        <p className="text-primary font-serif italic text-lg max-w-2xl mx-auto">
          {finalAdvice}
        </p>
      </div>
    </motion.div>
  );
}
