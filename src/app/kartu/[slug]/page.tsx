"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { getCardBySlug } from "@/lib/utils";
import TarotCard from "@/components/TarotCard";
import InterpretationPanel from "@/components/InterpretationPanel";

export default function CardDetailPage() {
  const { slug } = useParams();
  const card = getCardBySlug(slug as string);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-mystic-gold mb-4">Kartu Tidak Ditemukan</h1>
          <Link href="/kartu" className="text-mystic-fg/60 hover:text-mystic-gold underline">Kembali ke Ensiklopedia</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12 cosmic-bg">
      <div className="max-w-4xl mx-auto w-full glass-panel-interactive p-8 rounded-3xl border border-secondary/20 shadow-[0_30px_90px_-50px_rgba(139,92,255,0.45)]">
        {/* Header */}
        <Link href="/kartu" className="flex items-center gap-2 text-primary hover:text-tertiary transition-colors mb-12">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Ensiklopedia</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex justify-center">
            <TarotCard card={card} slug={slug as string} isRevealed={true} />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-mystic-gold/60 uppercase tracking-[0.3em] text-sm">{card.arcana} Arcana</span>
              <h1 className="text-5xl font-serif text-mystic-gold mt-2">{card.name}</h1>
              <div className="flex flex-wrap gap-2 mt-4">
                {card.keywords.map(kw => (
                  <span key={kw} className="px-3 py-1 glass text-xs text-mystic-gold rounded-full uppercase border-mystic-gold/20">{kw}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs text-mystic-fg/40 uppercase mb-2">Elemen</h4>
                <p className="text-mystic-gold font-bold">{card.element}</p>
              </div>
              <div>
                <h4 className="text-xs text-mystic-fg/40 uppercase mb-2">Nomor</h4>
                <p className="text-mystic-gold font-bold">{card.number}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif text-mystic-gold flex items-center gap-3">
              <Sun className="w-6 h-6" /> Makna Tegak (Upright)
            </h2>
            <InterpretationPanel card={card} isReversed={false} positionName="Interpretasi Utama" />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif text-mystic-accent flex items-center gap-3">
              <Moon className="w-6 h-6" /> Makna Terbalik (Reversed)
            </h2>
            <InterpretationPanel card={card} isReversed={true} positionName="Interpretasi Bayangan" />
          </div>
        </div>
      </div>
    </main>
  );
}
