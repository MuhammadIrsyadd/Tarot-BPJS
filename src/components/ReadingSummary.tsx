"use client";

import { motion } from "framer-motion";
import { Sparkles, Info, Quote } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ReadingSummaryProps {
  vibe: string;
  summary: string;
  finalAdvice: string;
}

export default function ReadingSummary({ vibe, summary, finalAdvice }: ReadingSummaryProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-8 rounded-3xl border-2 border-mystic-gold/30 bg-white/50 space-y-8 shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-3xl font-serif text-mystic-gold mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6" />
          Kesimpulan Sesi Mendalam
        </h2>
        <div className="w-24 h-px bg-mystic-gold/30 mx-auto" />
      </div>

      <div className="bg-mystic-purple/5 p-6 rounded-2xl border border-mystic-gold/10 italic text-mystic-fg/90 leading-relaxed text-center text-lg">
        <Quote className="w-8 h-8 text-mystic-gold/20 mb-2 mx-auto" />
        {vibe}
      </div>

      <div className="space-y-4">
        <h3 className="text-mystic-gold font-bold flex items-center gap-2 uppercase tracking-widest text-xs border-b border-mystic-gold/10 pb-2">
          <Info className="w-4 h-4" /> Alur Pesan Semesta & Analisis Kartu
        </h3>
        <div className="prose prose-sm prose-violet max-w-none text-mystic-fg/80 leading-relaxed">
           <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>

      <div className="pt-8 border-t border-mystic-gold/10 text-center">
        <p className="text-mystic-gold font-serif italic text-lg max-w-2xl mx-auto">
          {finalAdvice}
        </p>
      </div>
    </motion.div>
  );
}
